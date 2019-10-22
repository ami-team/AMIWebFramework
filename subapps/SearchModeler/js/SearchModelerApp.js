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

/*--------------------------------------------------------------------------------------------------------------------*/
$AMIClass('SearchModelerApp', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    var result = $.Deferred();
    amiWebApp.loadResources(['subapps/SearchModeler/twig/SearchModelerApp.twig', 'subapps/SearchModeler/twig/interface.twig', 'subapps/SearchModeler/twig/input.twig']).done(function (data) {
      amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function () {
        /*----------------------------------------------------------------------------------------------------*/
        amiWebApp.loadResources(['subapps/UserDashboard/js/jquery-ui.min.js', 'js/3rd-party/codemirror/lib/codemirror.css', 'js/3rd-party/codemirror/lib/codemirror.js', 'js/3rd-party/codemirror/addon/edit/matchbrackets.js', 'js/3rd-party/codemirror/mode/javascript/javascript.js']).done(function () {
          /*------------------------------------------------------------------------------------------------*/
          $('#CFB6CA12_2D42_3111_3183_EC1006F7E039').sortable();
          $('#DD89D783_6F39_7B3B_3F3F_D875737A5E68').sortable();
          /*------------------------------------------------------------------------------------------------*/

          var editor1 = CodeMirror.fromTextArea(document.getElementById('A3D83B42_4FBF_5DAE_6A38_12F1F53493B5'), {
            lineNumbers: true,
            matchBrackets: true,
            mode: 'application/json'
          });
          $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor', editor1);
          $('#AAC55FA7_4919_DF1A_F194_30DF6435B539').on('shown.bs.modal', function () {
            editor1.refresh();
          });
          /*------------------------------------------------------------------------------------------------*/

          var editor2 = CodeMirror.fromTextArea(document.getElementById('A78C0694_128B_1AD8_2596_C321DAA4690B'), {
            lineNumbers: true,
            matchBrackets: true,
            mode: 'application/json'
          });
          $('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor', editor2);
          $('#E78A17C0_799E_8E34_4986_322B9EA80D9F').on('shown.bs.modal', function () {
            editor2.refresh();
          });
          /*------------------------------------------------------------------------------------------------*/

          $('#B1786DE7_BCD6_F336_D811_9CBB6ECB583F').click(function () {
            _this.editOptions1();
          });
          /*------------------------------------------------------------------------------------------------*/

          var f1 = function f1() {
            var more = _this._parseJson($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue());

            _this.formToJson1(more);

            $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue(_this._dumpJson(more));
          };

          $('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').change(f1);
          /*------------------------------------------------------------------------------------------------*/

          var f2 = function f2() {
            var more = _this._parseJson($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());

            _this.formToJson2(more);

            $('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue(_this._dumpJson(more));
          };

          $('#F9931091_31DD_A960_2AD0_C08417FE8484').change(f2);
          $('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').keyup(f2);
          $('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').change(f2);
          $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').keyup(f2);
          $('#C1788970_4C94_D98F_4199_5A185B4D97A3').keyup(f2);
          $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').keyup(f2);
          $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').keyup(f2);
          $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').keyup(f2);
          $('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').change(f2);
          $('#D6089F83_363A_F322_1E92_25567D89BD3B').change(f2);
          $('#B6671716_EA4E_E4A6_454B_79140FFC1532').change(f2);
          $('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').change(f2);
          $('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').change(f2);
          $('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').change(f2);
          /*------------------------------------------------------------------------------------------------*/

          var f3 = function f3() {
            $('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').attr('size', $('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val().length);
          };

          $('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').keyup(f3);
          $('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val(',');
          f3();
          /*------------------------------------------------------------------------------------------------*/

          var f4 = function f4() {
            $('#B06166B2_2DE1_255D_7350_9C21370DB32F').attr('size', $('#B06166B2_2DE1_255D_7350_9C21370DB32F').val().length);
          };

          $('#B06166B2_2DE1_255D_7350_9C21370DB32F').keyup(f4);
          $('#B06166B2_2DE1_255D_7350_9C21370DB32F').val(',');
          f4();
          /*------------------------------------------------------------------------------------------------*/
        });
        _this.fragmentInterface = data[1];
        _this.fragmentInput = data[2];
        _this.searchInterfaces = {};
        result.resolve();
      });
    }).fail(function () {
      result.reject();
    });
    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogin: function onLogin() {
    if (!$('#CFB6CA12_2D42_3111_3183_EC1006F7E039').html().trim()) {
      this.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');
      this.getCatalogs('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3');
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  _trim: function _trim(s) {
    if (s) {
      return s.trim();
    } else {
      return '';
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  _parseJson: function _parseJson(x) {
    var result;

    try {
      result = JSON.parse(x || '{}');
    } catch (e) {
      result = {
        /*---------------*/
      };
    }

    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  _dumpJson: function _dumpJson(x) {
    var result;

    try {
      result = JSON.stringify(x || {}, null, 2);
    } catch (e) {
      result =
      /*---------*/
      '{}'
      /*---------*/
      ;
    }

    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  getInterfaceList: function getInterfaceList(dst) {
    var _this2 = this;

    amiWebApp.lock();
    amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="SELECT `id`, `group`, `name`, `json`, `archived` FROM `router_search_interface` ORDER BY `group` ASC, `name` ASC"').done(function (data) {
      var rows = amiWebApp.jspath('..row', data);
      var dict = {
        searchInterfaces: []
      };
      rows.forEach(function (row) {
        var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
        var group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
        var name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
        var json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';
        var archived = amiWebApp.jspath('..field{.@name==="archived"}.$', row)[0] || '';

        try {
          var searchInterface = {
            id: id,
            group: group,
            name: name,
            json: _this2._parseJson(json),
            archived: archived !== '0'
          };
          dict.searchInterfaces.push(searchInterface);
          _this2.searchInterfaces[id] = searchInterface;
        } catch (e) {
          /* IGNORE */
        }
      });
      amiWebApp.replaceHTML(dst, _this2.fragmentInterface, {
        dict: dict
      }).done(function () {
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  getCatalogs: function getCatalogs(dst, defaultCatalog) {
    defaultCatalog = defaultCatalog || '';
    /*------------------------------------------------------------------------------------------------------------*/

    amiWebApp.lock();
    $(dst).empty();
    amiCommand.execute('ListCatalogs').done(function (data) {
      var s = ['<option value="" style="display: none;">-- select a catalog --</option>'];
      amiWebApp.jspath('..row', data).forEach(function (row) {
        var catalog = amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', row)[0] || '';

        if (catalog.toLowerCase() !== defaultCatalog.toLowerCase()) {
          s.push('<option value="' + amiWebApp.textToHtml(catalog) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(catalog) + '</option>');
        } else {
          s.push('<option value="' + amiWebApp.textToHtml(catalog) + '" selected="selected">' + amiWebApp.textToHtml(catalog) + '</option>');
        }
      });
      $(dst).html(s.join('')).promise().done(function () {
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  getEntities: function getEntities(dst, catalog, defaultEntity) {
    if (!catalog) {
      return;
    }

    defaultEntity = defaultEntity || '';
    /*------------------------------------------------------------------------------------------------------------*/

    amiWebApp.lock();
    $(dst).empty();
    amiCommand.execute('ListEntities -catalog="' + amiWebApp.textToString(catalog) + '"').done(function (data) {
      var s = ['<option value="" style="display: none;">-- select an entity --</option>'];
      amiWebApp.jspath('..row', data).forEach(function (row) {
        var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', row)[0] || '';

        if (entity.toLowerCase() !== defaultEntity.toLowerCase()) {
          s.push('<option value="' + amiWebApp.textToHtml(entity) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(entity) + '</option>');
        } else {
          s.push('<option value="' + amiWebApp.textToHtml(entity) + '" selected="selected">' + amiWebApp.textToHtml(entity) + '</option>');
        }
      });
      $(dst).html(s.join('')).promise().done(function () {
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  getFields: function getFields(dst, catalog, entity, defaultField) {
    if (!catalog || !entity) {
      return;
    }

    defaultField = defaultField || '';
    /*------------------------------------------------------------------------------------------------------------*/

    amiWebApp.lock();
    $(dst).empty();
    amiCommand.execute('ListFields -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '"').done(function (data) {
      var s = ['<option value="" style="display: none;">-- select a field --</option>'];
      amiWebApp.jspath('..row', data).forEach(function (row) {
        var field = amiWebApp.jspath('..field{.@name==="field"}.$', row)[0] || '';

        if (field.toLowerCase() !== defaultField.toLowerCase()) {
          s.push('<option value="' + amiWebApp.textToHtml(field) + '" xxxxxxxx="xxxxxxxx">' + amiWebApp.textToHtml(field) + '</option>');
        } else {
          s.push('<option value="' + amiWebApp.textToHtml(field) + '" selected="selected">' + amiWebApp.textToHtml(field) + '</option>');
        }
      });
      $(dst).html(s.join('')).promise().done(function () {
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  cnt: 0,

  /*----------------------------------------------------------------------------------------------------------------*/
  select: function select(id) {
    var _this3 = this;

    if (!(id = id.trim())) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    /*------------------------------------------------------------------------------------------------------------*/

    var searchInterface = this.searchInterfaces[id];
    $('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val(searchInterface.group);
    $('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val(searchInterface.name);
    $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked', searchInterface.archived);
    $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue(this._dumpJson(searchInterface.more));
    /*------------------------------------------------------------------------------------------------------------*/

    this.getCatalogs('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3', searchInterface.json.defaultCatalog);

    if (searchInterface.json.defaultCatalog) {
      this.getEntities('#F71D1452_8613_5FB5_27D3_C1540573F450', searchInterface.json.defaultCatalog, searchInterface.json.defaultEntity);

      if (searchInterface.json.defaultEntity) {
        this.getFields('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E', searchInterface.json.defaultCatalog, searchInterface.json.defaultEntity, searchInterface.json.defaultPrimaryField);
      }
    }
    /*------------------------------------------------------------------------------------------------------------*/


    var dict = {
      cnt: this.cnt,
      criteria: searchInterface.json.criteria
    };
    amiWebApp.replaceHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {
      dict: dict
    }).done(function () {
      dict.criteria.forEach(function (criterion) {
        _this3.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + _this3.cnt, criterion.catalog);

        if (criterion.catalog) {
          _this3.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + _this3.cnt, criterion.catalog, criterion.entity);

          if (criterion.entity) {
            _this3.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + _this3.cnt, criterion.catalog, criterion.entity, criterion.field);

            if (criterion.type > 6) {
              _this3.getFields('#F83CE4BB_3851_3C40_242E_F7384C68A1A5_' + _this3.cnt, criterion.catalog, criterion.entity, criterion.key_field);
            }
          }
        }

        _this3.cnt++;
      });
      amiWebApp.unlock();
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  addCriterion: function addCriterion(catalog, entity, field, criteria, isKeyVal) {
    var _this4 = this;

    /*------------------------------------------------------------------------------------------------------------*/
    amiWebApp.lock();
    /*------------------------------------------------------------------------------------------------------------*/

    var dict = {
      cnt: this.cnt,
      criteria: criteria || [{
        type: isKeyVal ? 7 : 0
      }]
    };
    amiWebApp.appendHTML('#DD89D783_6F39_7B3B_3F3F_D875737A5E68', this.fragmentInput, {
      dict: dict
    }).done(function () {
      dict.criteria.forEach(function (criterion) {
        _this4.getCatalogs('#E3ACBBAC_D452_5B9A_4926_D8FEE356CD63_' + _this4.cnt, catalog);

        if (catalog) {
          _this4.getEntities('#A4D2FD72_FF0A_3C87_B1CF_4A31331D3F8B_' + _this4.cnt, catalog, entity);

          if (entity) {
            _this4.getFields('#A45F0216_6C35_19F3_2CEC_103A8536914F_' + _this4.cnt, catalog, entity, field);

            if (criterion.type > 6) {
              _this4.getFields('#F83CE4BB_3851_3C40_242E_F7384C68A1A5_' + _this4.cnt, catalog, entity, field);
            }
          }
        }

        _this4.cnt++;
      });
      amiWebApp.unlock();
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  jsonToForm1: function jsonToForm1(more) {
    $('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked', !!more.distinct);
    /* TODO */

    return more;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  formToJson1: function formToJson1(more) {
    more.distinct = $('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked');
    /* TODO */

    return more;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  editOptions1: function editOptions1() {
    $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val(this._dumpJson(this.formToJson1(this.jsonToForm1(this._parseJson($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val())))));
    /**/

    $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').setValue($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val());
    $('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('show');
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  setOptions1: function setOptions1() {
    $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').val($('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue());
    $('#AAC55FA7_4919_DF1A_F194_30DF6435B539').modal('hide');
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  jsonToForm2: function jsonToForm2(more) {
    if ('constraints' in more && more.constraints !== null) {
      $('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val(more.constraints.join($('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val()));
      $('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked', true);
    } else {
      $('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val(
      /*---------------------------*/
      '@NULL'
      /*---------------------------*/
      );
      $('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked', false);
    }

    if ('init_value' in more && more.init_value !== null) {
      $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(more.init_value.join($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val()));
      $('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked', true);
    } else {
      $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(
      /*---------------------------*/
      '@NULL'
      /*---------------------------*/
      );
      $('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked', false);
    }

    $('#C1788970_4C94_D98F_4199_5A185B4D97A3').val(more.min !== null ? more.min : '@NULL');
    $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').val(more.max !== null ? more.max : '@NULL');
    $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').val(more.off !== null ? more.off : '@NULL');
    $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').val(more.on !== null ? more.on : '@NULL');
    $('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked', !!more.auto_open);
    $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked', !!more.inclusive);
    $('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked', !!more.simple_search);
    /*--*/

    if (more.order === 'ASC') {
      $('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked', true);
    } else if (more.order === 'DESC') {
      $('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked', true);
    } else {
      $('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').prop('checked', true);
    }

    return more;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  formToJson2: function formToJson2(more) {
    if ($('#F9931091_31DD_A960_2AD0_C08417FE8484').prop('checked')) {
      var constraints = $('#F87B8D4A_BE3E_6C93_B432_9195DD1E5A15').val();

      if (constraints.toUpperCase() !== '@NULL') {
        more.constraints = constraints.split($('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val());
      } else {
        delete more.constraints;
      }
    } else {
      delete more.constraints;
    }

    if ($('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked')) {
      var init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();

      if (init_value.toUpperCase() !== '@NULL') {
        more.init_value = init_value.split($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val());
      } else {
        delete more.init_value;
      }
    } else {
      delete more.init_value;
    }

    var min = $('#C1788970_4C94_D98F_4199_5A185B4D97A3').val();

    if (min && min.toUpperCase() !== '@NULL') {
      more.min = min;
    } else {
      delete more.min;
    }

    var max = $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').val();

    if (max && max.toUpperCase() !== '@NULL') {
      more.max = max;
    } else {
      delete more.max;
    }

    var off = $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').val();

    if (off && off.toUpperCase() !== '@NULL') {
      more.off = off;
    } else {
      delete more.off;
    }

    var on = $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').val();

    if (on && on.toUpperCase() !== '@NULL') {
      more.on = on;
    } else {
      delete more.on;
    }

    if (!$('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('disabled')) {
      more.auto_open = $('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked');
    } else {
      delete more.auto_open;
    }

    if (!$('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled')) {
      more.inclusive = $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked');
    } else {
      delete more.inclusive;
    }

    if (!$('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('disabled')) {
      more.simple_search = $('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked');
    } else {
      delete more.simple_search;
    }
    /*--*/


    if ($('#C1F5D43B_000E_F867_ABA5_13EA519F55CA').prop('checked')) {
      more.order = 'ASC';
    } else if ($('#A10FF5C5_4D17_36BB_A18F_4E2C4EB05A3B').prop('checked')) {
      more.order = 'DESC';
    } else if ($('#BB6ADE31_B629_DB15_9319_DAFAAD9999CF').prop('checked')) {
      delete more.order;
    }

    return more;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  editOptions2: function editOptions2(inputCnt, inputType) {
    if (inputType === 2 || inputType === 3) {
      $('#C1788970_4C94_D98F_4199_5A185B4D97A3').prop('disabled', false);
      $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').prop('disabled', false);
    } else {
      $('#C1788970_4C94_D98F_4199_5A185B4D97A3').prop('disabled', true);
      $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').prop('disabled', true);
    }

    if (inputType === 4) {
      $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled', false);
      $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').prop('disabled', false);
      $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').prop('disabled', false);
    } else {
      $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('disabled', true);
      $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').prop('disabled', true);
      $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').prop('disabled', true);
    }

    $('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val(this._dumpJson(this.formToJson2(this.jsonToForm2(this._parseJson($('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val())))));
    /**/

    $('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').setValue($('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val());
    $('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('show');
    this.currentInputCnt = inputCnt;
    this.currentInputType = inputType;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  setOptions2: function setOptions2(inputCnt) {
    $('#C4AAADBC_C3B5_6DDC_851B_F06430CB4F6E_' + inputCnt).val($('#A78C0694_128B_1AD8_2596_C321DAA4690B').data('editor').getValue());
    $('#E78A17C0_799E_8E34_4986_322B9EA80D9F').modal('hide');
    this.currentInputCnt = 0xFFFFFFFF;
    this.currentInputType = 0xFFFFFFFF;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  clear: function clear() {
    if (confirm('Please confirm...') == false) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    $('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val('');
    $('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val('');
    $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').val('');
    $('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val('');
    $('#F71D1452_8613_5FB5_27D3_C1540573F450').val('');
    $('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val('');
    $('#DD89D783_6F39_7B3B_3F3F_D875737A5E68').empty();
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  remove: function remove() {
    var _this5 = this;

    if (!confirm('Please confirm...')) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    var group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());

    var name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());

    if (!group || !name) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="group£name" -keyValues="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '"').done(function (data, message) {
      _this5.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

      amiWebApp.success(message, true);
    }).fail(function (data, message) {
      _this5.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  save: function save(mode) // 0: STD, 1: CLONE, 2: SHOW
  {
    var _this6 = this;

    if (mode !== 2) {
      if (!confirm('Please confirm...')) {
        return;
      }
    }
    /*------------------------------------------------------------------------------------------------------------*/


    var group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());

    var name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());

    var defaultCatalog = this._trim($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val());

    var defaultEntity = this._trim($('#F71D1452_8613_5FB5_27D3_C1540573F450').val());

    var defaultPrimaryField = this._trim($('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val());

    var archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';
    var more = $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue();

    var defaultCATALOG = this._trim(mode === 1 ? window.prompt('New default catalog', defaultCatalog) : defaultCatalog);

    if (!group || !name || !defaultCatalog || !defaultCATALOG || !defaultEntity || !defaultPrimaryField) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    /*------------------------------------------------------------------------------------------------------------*/

    var keys = [];
    var criteria = {};
    $('#FEC360FA_EC1D_90DC_FFD5_8A498CF60305').serializeArray().forEach(function (item) {
      var parts = item.name.split('::');

      if (parts.length === 2) {
        var key1 = parts[1];
        var key2 = parts[0];

        if (!(key1 in criteria)) {
          keys.push(key1);
          criteria[key1] = {};
        }
        /**/


        if (key2 === 'type') {
          criteria[key1][key2] = parseInt(item.value);
        } else if (key2 === 'more') {
          criteria[key1][key2] = _this6._parseJson(item.value);
        } else {
          criteria[key1][key2] = mode === 1 && key2 === 'catalog' && item.value === defaultCatalog ? defaultCATALOG : item.value;
        }
      }
    });
    /*------------------------------------------------------------------------------------------------------------*/

    var MORE;

    try {
      MORE = JSON.parse(more);
    } catch (e) {
      MORE = {
        /*----------*/
      };
    }
    /*------------------------------------------------------------------------------------------------------------*/


    var json = {
      defaultCatalog: defaultCATALOG,
      defaultEntity: defaultEntity,
      defaultPrimaryField: defaultPrimaryField,
      more: MORE,
      criteria: keys.map(function (key) {
        return criteria[key];
      })
    };

    if (mode === 2) {
      amiWebApp.createControl(null, null, 'textBox', [this._dumpJson(json)], {}).done(function () {
        amiWebApp.unlock();
      });
    } else {
      amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="group£name" -keyValues="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '"').done(function ()
      /*---------*/
      {
        amiCommand.execute('AddElement -catalog="self" -entity="router_search_interface" -separator="£" -fields="group£name£json£archived" -values="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '£' + amiWebApp.textToString(JSON.stringify(json)) + '£' + amiWebApp.textToString(archived) + '"').done(function (data, message) {
          _this6.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

          amiWebApp.success(message, true);
        }).fail(function (data, message) {
          _this6.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

          amiWebApp.error(message, true);
        });
      }).fail(function (data, message) {
        _this6.getInterfaceList('#CFB6CA12_2D42_3111_3183_EC1006F7E039');

        amiWebApp.error(message, true);
      });
    }
    /*------------------------------------------------------------------------------------------------------------*/

  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

searchModelerApp = new SearchModelerApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImY0IiwiZnJhZ21lbnRJbnRlcmZhY2UiLCJmcmFnbWVudElucHV0Iiwic2VhcmNoSW50ZXJmYWNlcyIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25Mb2dpbiIsImh0bWwiLCJ0cmltIiwiZ2V0SW50ZXJmYWNlTGlzdCIsImdldENhdGFsb2dzIiwiX3RyaW0iLCJzIiwieCIsIkpTT04iLCJwYXJzZSIsImUiLCJzdHJpbmdpZnkiLCJkc3QiLCJsb2NrIiwiYW1pQ29tbWFuZCIsImV4ZWN1dGUiLCJyb3dzIiwianNwYXRoIiwiZGljdCIsImZvckVhY2giLCJyb3ciLCJpZCIsImdyb3VwIiwibmFtZSIsImpzb24iLCJhcmNoaXZlZCIsInNlYXJjaEludGVyZmFjZSIsInB1c2giLCJ1bmxvY2siLCJtZXNzYWdlIiwiZXJyb3IiLCJkZWZhdWx0Q2F0YWxvZyIsImVtcHR5IiwiY2F0YWxvZyIsInRvTG93ZXJDYXNlIiwidGV4dFRvSHRtbCIsImpvaW4iLCJwcm9taXNlIiwiZ2V0RW50aXRpZXMiLCJkZWZhdWx0RW50aXR5IiwidGV4dFRvU3RyaW5nIiwiZW50aXR5IiwiZ2V0RmllbGRzIiwiZGVmYXVsdEZpZWxkIiwiZmllbGQiLCJjbnQiLCJzZWxlY3QiLCJwcm9wIiwiZGVmYXVsdFByaW1hcnlGaWVsZCIsImNyaXRlcmlhIiwiY3JpdGVyaW9uIiwidHlwZSIsImtleV9maWVsZCIsImFkZENyaXRlcmlvbiIsImlzS2V5VmFsIiwiYXBwZW5kSFRNTCIsImpzb25Ub0Zvcm0xIiwiZGlzdGluY3QiLCJtb2RhbCIsInNldE9wdGlvbnMxIiwianNvblRvRm9ybTIiLCJjb25zdHJhaW50cyIsImluaXRfdmFsdWUiLCJtaW4iLCJtYXgiLCJvZmYiLCJhdXRvX29wZW4iLCJpbmNsdXNpdmUiLCJzaW1wbGVfc2VhcmNoIiwib3JkZXIiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwiaXRlbSIsInBhcnRzIiwia2V5MSIsImtleTIiLCJwYXJzZUludCIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FB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QixJQUEzQjtBQUVBLFNBTkQsRUFNRy9CLElBTkgsQ0FNUSxVQUFDcEMsSUFBRCxFQUFPbUUsT0FBUCxFQUFtQjtBQUUxQixVQUFBLE1BQUksQ0FBQzFCLGdCQUFMLENBQXNCLHVDQUF0Qjs7QUFFQTVDLFVBQUFBLFNBQVMsQ0FBQ3VFLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsU0FYRDtBQWFBLE9BZkQsRUFlRy9CLElBZkgsQ0FlUSxVQUFDcEMsSUFBRCxFQUFPbUUsT0FBUCxFQUFtQjtBQUUxQixRQUFBLE1BQUksQ0FBQzFCLGdCQUFMLENBQXNCLHVDQUF0Qjs7QUFFQTVDLFFBQUFBLFNBQVMsQ0FBQ3VFLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsT0FwQkQ7QUFxQkE7QUFFRDs7QUFDQTtBQUVEOztBQXorQjZCLENBQXJCLENBQVQ7QUE0K0JBOztBQUNBOztBQUNBOztBQUVBcUUsZ0JBQWdCLEdBQUcsSUFBSUMsZ0JBQUosRUFBbkI7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2VhcmNoTW9kZWxlckFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9TZWFyY2hNb2RlbGVyQXBwLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2ludGVyZmFjZS50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9pbnB1dC50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2pzL2pxdWVyeS11aS5taW4uanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3MnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0LmpzJyxcblx0XHRcdFx0XSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jykuc29ydGFibGUoKTtcblxuXHRcdFx0XHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5zb3J0YWJsZSgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjEpO1xuXG5cdFx0XHRcdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMS5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IyID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMik7XG5cblx0XHRcdFx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IyLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMTc4NkRFN19CQ0Q2X0YzMzZfRDgxMV85Q0JCNkVDQjU4M0YnKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZWRpdE9wdGlvbnMxKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMSA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5jaGFuZ2UoZjEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjIgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1Jykua2V5dXAgKGYyKTtcblxuXHRcdFx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS5rZXl1cCAoZjIpO1xuXG5cdFx0XHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLmtleXVwIChmMik7XG5cblx0XHRcdFx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykuY2hhbmdlKGYyKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYzID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykuYXR0cignc2l6ZScsICQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3Jykua2V5dXAoZjMpO1xuXG5cdFx0XHRcdFx0JCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjMoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGY0ID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykuYXR0cignc2l6ZScsICQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykua2V5dXAoZjQpO1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjQoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5mcmFnbWVudEludGVyZmFjZSA9IGRhdGFbMV07XG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnB1dCA9IGRhdGFbMl07XG5cblx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighJCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpLmh0bWwoKS50cmltKCkpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdHJpbTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHMpIHtcblx0XHRcdHJldHVybiBzLnRyaW0oKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5wYXJzZSh4IHx8ICd7fScpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSB7LyotLS0tLS0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoeCB8fCB7fSwgbnVsbCwgMik7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IC8qLS0tLS0tLS0tKi8gJ3t9JyAvKi0tLS0tLS0tLSovO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRJbnRlcmZhY2VMaXN0OiBmdW5jdGlvbihkc3QpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc3FsPVwiU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYGpzb25gLCBgYXJjaGl2ZWRgIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBPUkRFUiBCWSBgZ3JvdXBgIEFTQywgYG5hbWVgIEFTQ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCByb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0c2VhcmNoSW50ZXJmYWNlczogW10sXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImlkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBncm91cCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYW1lXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBqc29uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGFyY2hpdmVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFyY2hpdmVkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0ge1xuXHRcdFx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRcdFx0Z3JvdXA6IGdyb3VwLFxuXHRcdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRcdGpzb246IHRoaXMuX3BhcnNlSnNvbihqc29uKSxcblx0XHRcdFx0XHRcdGFyY2hpdmVkOiAoYXJjaGl2ZWQgIT09ICcwJyksXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGRpY3Quc2VhcmNoSW50ZXJmYWNlcy5wdXNoKHNlYXJjaEludGVyZmFjZSk7XG5cblx0XHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdID0gc2VhcmNoSW50ZXJmYWNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTChkc3QsIHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldENhdGFsb2dzOiBmdW5jdGlvbihkc3QsIGRlZmF1bHRDYXRhbG9nKVxuXHR7XG5cdFx0ZGVmYXVsdENhdGFsb2cgPSBkZWZhdWx0Q2F0YWxvZyB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdENhdGFsb2dzJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBjYXRhbG9nIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBjYXRhbG9nID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihjYXRhbG9nLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRDYXRhbG9nLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RW50aXRpZXM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZGVmYXVsdEVudGl0eSlcblx0e1xuXHRcdGlmKCFjYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RW50aXR5ID0gZGVmYXVsdEVudGl0eSB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEVudGl0aWVzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhbiBlbnRpdHkgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGVudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJlbnRpdHlcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZW50aXR5LnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRFbnRpdHkudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEZpZWxkczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBlbnRpdHksIGRlZmF1bHRGaWVsZClcblx0e1xuXHRcdGlmKCFjYXRhbG9nXG5cdFx0ICAgfHxcblx0XHQgICAhZW50aXR5XG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRGaWVsZCA9IGRlZmF1bHRGaWVsZCB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEZpZWxkcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBmaWVsZCAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZmllbGQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmllbGRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZmllbGQudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEZpZWxkLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNudDogMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlbGVjdDogZnVuY3Rpb24oaWQpXG5cdHtcblx0XHRpZighKGlkID0gaWQudHJpbSgpKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF07XG5cblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKHNlYXJjaEludGVyZmFjZS5ncm91cCk7XG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKHNlYXJjaEludGVyZmFjZS5uYW1lKTtcblxuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJywgc2VhcmNoSW50ZXJmYWNlLmFyY2hpdmVkKTtcblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihzZWFyY2hJbnRlcmZhY2UubW9yZSkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSk7XG5cblx0XHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHksIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRQcmltYXJ5RmllbGQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IHNlYXJjaEludGVyZmFjZS5qc29uLmNyaXRlcmlhLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjcml0ZXJpb24uY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihjcml0ZXJpb24uZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5maWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmtleV9maWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhZGRDcml0ZXJpb246IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQsIGNyaXRlcmlhLCBpc0tleVZhbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBjcml0ZXJpYSB8fCBbe3R5cGU6IGlzS2V5VmFsID8gNyA6IDB9XSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmRpc3RpbmN0KTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRtb3JlLmRpc3RpbmN0ID0gJCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnKTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMShcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdoaWRlJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCdjb25zdHJhaW50cycgaW4gbW9yZVxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5jb25zdHJhaW50cyAhPT0gbnVsbFxuXHRcdCApIHtcblx0XHRcdCQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS52YWwobW9yZS5jb25zdHJhaW50cy5qb2luKCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovICdATlVMTCcgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyk7XG5cblx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdGlmKCdpbml0X3ZhbHVlJyBpbiBtb3JlXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmluaXRfdmFsdWUgIT09IG51bGxcblx0XHQgKSB7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKG1vcmUuaW5pdF92YWx1ZS5qb2luKCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovICdATlVMTCcgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwobW9yZS5taW4gIT09IG51bGwgPyBtb3JlLm1pbiA6ICdATlVMTCcpO1xuXHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwobW9yZS5tYXggIT09IG51bGwgPyBtb3JlLm1heCA6ICdATlVMTCcpO1xuXHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS52YWwobW9yZS5vZmYgIT09IG51bGwgPyBtb3JlLm9mZiA6ICdATlVMTCcpO1xuXHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwobW9yZS5vbiAgIT09IG51bGwgPyBtb3JlLm9uICA6ICdATlVMTCcpO1xuXG5cdFx0JCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuYXV0b19vcGVuKTtcblx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5pbmNsdXNpdmUpO1xuXHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLnNpbXBsZV9zZWFyY2gpO1xuXG5cdFx0LyotLSovIGlmKG1vcmUub3JkZXIgPT09ICdBU0MnKSB7XG5cdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSBpZihtb3JlLm9yZGVyID09PSAnREVTQycpIHtcblx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgY29uc3RyYWludHMgPSAkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1JykudmFsKCk7XG5cblx0XHRcdGlmKGNvbnN0cmFpbnRzLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpXG5cdFx0XHR7XG5cdFx0XHRcdG1vcmUuY29uc3RyYWludHMgPSBjb25zdHJhaW50cy5zcGxpdCgkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5jb25zdHJhaW50cztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmNvbnN0cmFpbnRzO1xuXHRcdH1cblxuXHRcdGlmKCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgaW5pdF92YWx1ZSA9ICQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwoKTtcblxuXHRcdFx0aWYoaW5pdF92YWx1ZS50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKVxuXHRcdFx0e1xuXHRcdFx0XHRtb3JlLmluaXRfdmFsdWUgPSBpbml0X3ZhbHVlLnNwbGl0KCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1pbiA9ICQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwoKTtcblx0XHRpZihtaW4gJiYgbWluLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWluID0gbWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5taW47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF4ID0gJCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbCgpO1xuXHRcdGlmKG1heCAmJiBtYXgudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5tYXggPSBtYXg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm1heDtcblx0XHR9XG5cblx0XHRjb25zdCBvZmYgPSAkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKCk7XG5cdFx0aWYob2ZmICYmIG9mZi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9mZiA9IG9mZjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub2ZmO1xuXHRcdH1cblxuXHRcdGNvbnN0IG9uID0gJCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbCgpO1xuXHRcdGlmKG9uICYmIG9uLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub24gPSBvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub247XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLiAgYXV0b19vcGVuICAgPSAkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLiAgYXV0b19vcGVuICA7XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLiAgaW5jbHVzaXZlICAgPSAkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLiAgaW5jbHVzaXZlICA7XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLnNpbXBsZV9zZWFyY2ggPSAkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLnNpbXBsZV9zZWFyY2g7XG5cdFx0fVxuXG5cdFx0LyotLSovIGlmKCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnQVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdERVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0ZGVsZXRlIG1vcmUub3JkZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250LCBpbnB1dFR5cGUpXG5cdHtcblx0XHRpZihpbnB1dFR5cGUgPT09IDIgfHwgaW5wdXRUeXBlID09PSAzKSB7XG5cdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dFR5cGUgPT09IDQpIHtcblx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbChcblx0XHRcdHRoaXMuX2R1bXBKc29uKFxuXHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKFxuXHRcdFx0XHRcdHRoaXMuanNvblRvRm9ybTIoXG5cdFx0XHRcdFx0XHR0aGlzLl9wYXJzZUpzb24oXG5cdFx0XHRcdFx0XHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cbiBcdFx0LyoqL1xuXG5cdFx0JCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gaW5wdXRDbnQ7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gaW5wdXRUeXBlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250KVxuXHR7XG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gMHhGRkZGRkZGRjtcblx0XHR0aGlzLmN1cnJlbnRJbnB1dFR5cGUgPSAweEZGRkZGRkZGO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y2xlYXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykgPT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoJycpO1xuXHRcdCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoJycpO1xuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS52YWwoJycpO1xuXG5cdFx0JCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgnJyk7XG5cdFx0JCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgnJyk7XG5cdFx0JCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgnJyk7XG5cblx0XHQkKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JykuZW1wdHkoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzYXZlOiBmdW5jdGlvbihtb2RlKSAvLyAwOiBTVEQsIDE6IENMT05FLCAyOiBTSE9XXG5cdHtcblx0XHRpZihtb2RlICE9PSAyKVxuXHRcdHtcblx0XHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSB0aGlzLl90cmltKCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoKSk7XG5cdFx0Y29uc3QgbmFtZSA9IHRoaXMuX3RyaW0oJCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0Q2F0YWxvZyA9IHRoaXMuX3RyaW0oJCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0RW50aXR5ID0gdGhpcy5fdHJpbSgkKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRQcmltYXJ5RmllbGQgPSB0aGlzLl90cmltKCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoKSk7XG5cdFx0Y29uc3QgYXJjaGl2ZWQgPSAkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykucHJvcCgnY2hlY2tlZCcpID8gJzEnIDogJzAnO1xuXHRcdGNvbnN0IG1vcmUgPSAkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKTtcblxuXHRcdGNvbnN0IGRlZmF1bHRDQVRBTE9HID0gdGhpcy5fdHJpbShtb2RlID09PSAxID8gd2luZG93LnByb21wdCgnTmV3IGRlZmF1bHQgY2F0YWxvZycsIGRlZmF1bHRDYXRhbG9nKSA6IGRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKCFncm91cFxuXHRcdCAgIHx8XG5cdFx0ICAgIW5hbWVcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRDQVRBTE9HXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdEVudGl0eVxuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRQcmltYXJ5RmllbGRcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGtleXMgPSBbXTtcblx0XHRjb25zdCBjcml0ZXJpYSA9IHt9O1xuXG5cdFx0JCgnI0ZFQzM2MEZBX0VDMURfOTBEQ19GRkQ1XzhBNDk4Q0Y2MDMwNScpLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0ubmFtZS5zcGxpdCgnOjonKTtcblxuXHRcdFx0aWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBrZXkxID0gcGFydHNbMV07XG5cdFx0XHRcdGNvbnN0IGtleTIgPSBwYXJ0c1swXTtcblxuXHRcdFx0XHRpZighKGtleTEgaW4gY3JpdGVyaWEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleTEpO1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiovIGlmKGtleTIgPT09ICd0eXBlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gcGFyc2VJbnQoaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihrZXkyID09PSAnbW9yZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHRoaXMuX3BhcnNlSnNvbihpdGVtLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IChtb2RlID09PSAxICYmIGtleTIgPT09ICdjYXRhbG9nJyAmJiBpdGVtLnZhbHVlID09PSBkZWZhdWx0Q2F0YWxvZykgPyBkZWZhdWx0Q0FUQUxPR1xuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoaXRlbS52YWx1ZSkpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgTU9SRTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNT1JFID0gSlNPTi5wYXJzZShtb3JlKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0TU9SRSA9IHsvKi0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QganNvbiA9IHtcblx0XHRcdGRlZmF1bHRDYXRhbG9nOiBkZWZhdWx0Q0FUQUxPRyxcblx0XHRcdGRlZmF1bHRFbnRpdHk6IGRlZmF1bHRFbnRpdHksXG5cdFx0XHRkZWZhdWx0UHJpbWFyeUZpZWxkOiBkZWZhdWx0UHJpbWFyeUZpZWxkLFxuXHRcdFx0bW9yZTogTU9SRSxcblx0XHRcdGNyaXRlcmlhOiBrZXlzLm1hcChrZXkgPT4gY3JpdGVyaWFba2V5XSksXG5cdFx0fTtcblxuXHRcdGlmKG1vZGUgPT09IDIpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wobnVsbCwgbnVsbCwgJ3RleHRCb3gnLCBbdGhpcy5fZHVtcEpzb24oanNvbildLCB7fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWtleUZpZWxkcz1cImdyb3VwwqNuYW1lXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsnXCInKS5kb25lKCgvKi0tLS0tLS0tLSovKSA9PiB7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdBZGRFbGVtZW50IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1maWVsZHM9XCJncm91cMKjbmFtZcKjanNvbsKjYXJjaGl2ZWRcIiAtdmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhhcmNoaXZlZCkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogR0xPQkFMIElOU1RBTkNFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuc2VhcmNoTW9kZWxlckFwcCA9IG5ldyBTZWFyY2hNb2RlbGVyQXBwKCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
