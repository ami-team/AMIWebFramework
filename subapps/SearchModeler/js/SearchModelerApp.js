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
    if ('constraints' in more && more.constraints !== null && more.constraints.toUpperCase() !== '@NULL') {
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

    if ('init_value' in more && more.init_value !== null && more.init_value.toUpperCase() !== '@NULL') {
      $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(more.init_value.join($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val()));
      $('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked', true);
    } else {
      $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val(
      /*--------------------------*/
      '@NULL'
      /*--------------------------*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImY0IiwiZnJhZ21lbnRJbnRlcmZhY2UiLCJmcmFnbWVudElucHV0Iiwic2VhcmNoSW50ZXJmYWNlcyIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25Mb2dpbiIsImh0bWwiLCJ0cmltIiwiZ2V0SW50ZXJmYWNlTGlzdCIsImdldENhdGFsb2dzIiwiX3RyaW0iLCJzIiwieCIsIkpTT04iLCJwYXJzZSIsImUiLCJzdHJpbmdpZnkiLCJkc3QiLCJsb2NrIiwiYW1pQ29tbWFuZCIsImV4ZWN1dGUiLCJyb3dzIiwianNwYXRoIiwiZGljdCIsImZvckVhY2giLCJyb3ciLCJpZCIsImdyb3VwIiwibmFtZSIsImpzb24iLCJhcmNoaXZlZCIsInNlYXJjaEludGVyZmFjZSIsInB1c2giLCJ1bmxvY2siLCJtZXNzYWdlIiwiZXJyb3IiLCJkZWZhdWx0Q2F0YWxvZyIsImVtcHR5IiwiY2F0YWxvZyIsInRvTG93ZXJDYXNlIiwidGV4dFRvSHRtbCIsImpvaW4iLCJwcm9taXNlIiwiZ2V0RW50aXRpZXMiLCJkZWZhdWx0RW50aXR5IiwidGV4dFRvU3RyaW5nIiwiZW50aXR5IiwiZ2V0RmllbGRzIiwiZGVmYXVsdEZpZWxkIiwiZmllbGQiLCJjbnQiLCJzZWxlY3QiLCJwcm9wIiwiZGVmYXVsdFByaW1hcnlGaWVsZCIsImNyaXRlcmlhIiwiY3JpdGVyaW9uIiwidHlwZSIsImtleV9maWVsZCIsImFkZENyaXRlcmlvbiIsImlzS2V5VmFsIiwiYXBwZW5kSFRNTCIsImpzb25Ub0Zvcm0xIiwiZGlzdGluY3QiLCJtb2RhbCIsInNldE9wdGlvbnMxIiwianNvblRvRm9ybTIiLCJjb25zdHJhaW50cyIsInRvVXBwZXJDYXNlIiwiaW5pdF92YWx1ZSIsIm1pbiIsIm1heCIsIm9mZiIsImF1dG9fb3BlbiIsImluY2x1c2l2ZSIsInNpbXBsZV9zZWFyY2giLCJvcmRlciIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwiaXRlbSIsInBhcnRzIiwia2V5MSIsImtleTIiLCJwYXJzZUludCIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FB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QXRCOztBQUVBNUMsVUFBQUEsU0FBUyxDQUFDMEgsT0FBVixDQUFrQnBELE9BQWxCLEVBQTJCLElBQTNCO0FBRUEsU0FORCxFQU1HL0IsSUFOSCxDQU1RLFVBQUNwQyxJQUFELEVBQU9tRSxPQUFQLEVBQW1CO0FBRTFCLFVBQUEsTUFBSSxDQUFDMUIsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBNUMsVUFBQUEsU0FBUyxDQUFDdUUsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxTQVhEO0FBYUEsT0FmRCxFQWVHL0IsSUFmSCxDQWVRLFVBQUNwQyxJQUFELEVBQU9tRSxPQUFQLEVBQW1CO0FBRTFCLFFBQUEsTUFBSSxDQUFDMUIsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBNUMsUUFBQUEsU0FBUyxDQUFDdUUsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxPQXBCRDtBQXFCQTtBQUVEOztBQUNBO0FBRUQ7O0FBMytCNkIsQ0FBckIsQ0FBVDtBQTgrQkE7O0FBQ0E7O0FBQ0E7O0FBRUFxRSxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBSixFQUFuQjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTZWFyY2hNb2RlbGVyQXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL1NlYXJjaE1vZGVsZXJBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvaW50ZXJmYWNlLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2lucHV0LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0XHRcdCdzdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvYWRkb24vZWRpdC9tYXRjaGJyYWNrZXRzLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQuanMnLFxuXHRcdFx0XHRdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5zb3J0YWJsZSgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjEpO1xuXG5cdFx0XHRcdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMS5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IyID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMik7XG5cblx0XHRcdFx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IyLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMTc4NkRFN19CQ0Q2X0YzMzZfRDgxMV85Q0JCNkVDQjU4M0YnKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZWRpdE9wdGlvbnMxKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMSA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5jaGFuZ2UoZjEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjIgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1Jykua2V5dXAgKGYyKTtcblxuXHRcdFx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS5rZXl1cCAoZjIpO1xuXG5cdFx0XHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLmtleXVwIChmMik7XG5cblx0XHRcdFx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykuY2hhbmdlKGYyKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYzID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykuYXR0cignc2l6ZScsICQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3Jykua2V5dXAoZjMpO1xuXG5cdFx0XHRcdFx0JCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjMoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGY0ID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykuYXR0cignc2l6ZScsICQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykua2V5dXAoZjQpO1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjQoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5mcmFnbWVudEludGVyZmFjZSA9IGRhdGFbMV07XG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnB1dCA9IGRhdGFbMl07XG5cblx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighJCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpLmh0bWwoKS50cmltKCkpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdHJpbTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHMpIHtcblx0XHRcdHJldHVybiBzLnRyaW0oKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5wYXJzZSh4IHx8ICd7fScpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSB7LyotLS0tLS0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoeCB8fCB7fSwgbnVsbCwgMik7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IC8qLS0tLS0tLS0tKi8gJ3t9JyAvKi0tLS0tLS0tLSovO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRJbnRlcmZhY2VMaXN0OiBmdW5jdGlvbihkc3QpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc3FsPVwiU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYGpzb25gLCBgYXJjaGl2ZWRgIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBPUkRFUiBCWSBgZ3JvdXBgIEFTQywgYG5hbWVgIEFTQ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCByb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0c2VhcmNoSW50ZXJmYWNlczogW10sXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImlkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBncm91cCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYW1lXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBqc29uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGFyY2hpdmVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFyY2hpdmVkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0ge1xuXHRcdFx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRcdFx0Z3JvdXA6IGdyb3VwLFxuXHRcdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRcdGpzb246IHRoaXMuX3BhcnNlSnNvbihqc29uKSxcblx0XHRcdFx0XHRcdGFyY2hpdmVkOiAoYXJjaGl2ZWQgIT09ICcwJyksXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGRpY3Quc2VhcmNoSW50ZXJmYWNlcy5wdXNoKHNlYXJjaEludGVyZmFjZSk7XG5cblx0XHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdID0gc2VhcmNoSW50ZXJmYWNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTChkc3QsIHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldENhdGFsb2dzOiBmdW5jdGlvbihkc3QsIGRlZmF1bHRDYXRhbG9nKVxuXHR7XG5cdFx0ZGVmYXVsdENhdGFsb2cgPSBkZWZhdWx0Q2F0YWxvZyB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdENhdGFsb2dzJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBjYXRhbG9nIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBjYXRhbG9nID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihjYXRhbG9nLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRDYXRhbG9nLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RW50aXRpZXM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZGVmYXVsdEVudGl0eSlcblx0e1xuXHRcdGlmKCFjYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RW50aXR5ID0gZGVmYXVsdEVudGl0eSB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEVudGl0aWVzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhbiBlbnRpdHkgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGVudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJlbnRpdHlcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZW50aXR5LnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRFbnRpdHkudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEZpZWxkczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBlbnRpdHksIGRlZmF1bHRGaWVsZClcblx0e1xuXHRcdGlmKCFjYXRhbG9nXG5cdFx0ICAgfHxcblx0XHQgICAhZW50aXR5XG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRGaWVsZCA9IGRlZmF1bHRGaWVsZCB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEZpZWxkcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBmaWVsZCAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZmllbGQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmllbGRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZmllbGQudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEZpZWxkLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNudDogMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlbGVjdDogZnVuY3Rpb24oaWQpXG5cdHtcblx0XHRpZighKGlkID0gaWQudHJpbSgpKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF07XG5cblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKHNlYXJjaEludGVyZmFjZS5ncm91cCk7XG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKHNlYXJjaEludGVyZmFjZS5uYW1lKTtcblxuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJywgc2VhcmNoSW50ZXJmYWNlLmFyY2hpdmVkKTtcblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihzZWFyY2hJbnRlcmZhY2UubW9yZSkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSk7XG5cblx0XHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHksIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRQcmltYXJ5RmllbGQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IHNlYXJjaEludGVyZmFjZS5qc29uLmNyaXRlcmlhLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjcml0ZXJpb24uY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihjcml0ZXJpb24uZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5maWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmtleV9maWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhZGRDcml0ZXJpb246IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQsIGNyaXRlcmlhLCBpc0tleVZhbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBjcml0ZXJpYSB8fCBbe3R5cGU6IGlzS2V5VmFsID8gNyA6IDB9XSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmRpc3RpbmN0KTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRtb3JlLmRpc3RpbmN0ID0gJCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnKTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMShcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdoaWRlJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCdjb25zdHJhaW50cycgaW4gbW9yZVxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5jb25zdHJhaW50cyAhPT0gbnVsbFxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5jb25zdHJhaW50cy50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnXG5cdFx0ICkge1xuXHRcdFx0JCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbChtb3JlLmNvbnN0cmFpbnRzLmpvaW4oJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1JykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y5OTMxMDkxXzMxRERfQTk2MF8yQUQwX0MwODQxN0ZFODQ4NCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0aWYoJ2luaXRfdmFsdWUnIGluIG1vcmVcblx0XHQgICAmJlxuXHRcdCAgIG1vcmUuaW5pdF92YWx1ZSAhPT0gbnVsbFxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5pbml0X3ZhbHVlLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCdcblx0XHQgKSB7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKG1vcmUuaW5pdF92YWx1ZS5qb2luKCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8pO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9XG5cblx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKG1vcmUubWluICE9PSBudWxsID8gbW9yZS5taW4gOiAnQE5VTEwnKTtcblx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykudmFsKG1vcmUubWF4ICE9PSBudWxsID8gbW9yZS5tYXggOiAnQE5VTEwnKTtcblx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKG1vcmUub2ZmICE9PSBudWxsID8gbW9yZS5vZmYgOiAnQE5VTEwnKTtcblx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKG1vcmUub24gICE9PSBudWxsID8gbW9yZS5vbiAgOiAnQE5VTEwnKTtcblxuXHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmF1dG9fb3Blbik7XG5cdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuaW5jbHVzaXZlKTtcblx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5zaW1wbGVfc2VhcmNoKTtcblxuXHRcdC8qLS0qLyBpZihtb3JlLm9yZGVyID09PSAnQVNDJykge1xuXHRcdFx0JCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2UgaWYobW9yZS5vcmRlciA9PT0gJ0RFU0MnKSB7XG5cdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjI6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRpZigkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykucHJvcCgnY2hlY2tlZCcpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGNvbnN0cmFpbnRzID0gJCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbCgpO1xuXG5cdFx0XHRpZihjb25zdHJhaW50cy50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKVxuXHRcdFx0e1xuXHRcdFx0XHRtb3JlLmNvbnN0cmFpbnRzID0gY29uc3RyYWludHMuc3BsaXQoJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0ZGVsZXRlIG1vcmUuY29uc3RyYWludHM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRkZWxldGUgbW9yZS5jb25zdHJhaW50cztcblx0XHR9XG5cblx0XHRpZigkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGluaXRfdmFsdWUgPSAkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKCk7XG5cblx0XHRcdGlmKGluaXRfdmFsdWUudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJylcblx0XHRcdHtcblx0XHRcdFx0bW9yZS5pbml0X3ZhbHVlID0gaW5pdF92YWx1ZS5zcGxpdCgkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBtaW4gPSAkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKCk7XG5cdFx0aWYobWluICYmIG1pbi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm1pbiA9IG1pbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUubWluO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1heCA9ICQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwoKTtcblx0XHRpZihtYXggJiYgbWF4LnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWF4ID0gbWF4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5tYXg7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2ZmID0gJCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbCgpO1xuXHRcdGlmKG9mZiAmJiBvZmYudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5vZmYgPSBvZmY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9mZjtcblx0XHR9XG5cblx0XHRjb25zdCBvbiA9ICQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwoKTtcblx0XHRpZihvbiAmJiBvbi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9uID0gb247XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9uO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGF1dG9fb3BlbiAgID0gJCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGF1dG9fb3BlbiAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGluY2x1c2l2ZSAgID0gJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGluY2x1c2l2ZSAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS5zaW1wbGVfc2VhcmNoID0gJCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5zaW1wbGVfc2VhcmNoO1xuXHRcdH1cblxuXHRcdC8qLS0qLyBpZigkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRtb3JlLm9yZGVyID0gJ0FTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnREVTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9yZGVyO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudCwgaW5wdXRUeXBlKVxuXHR7XG5cdFx0aWYoaW5wdXRUeXBlID09PSAyIHx8IGlucHV0VHlwZSA9PT0gMykge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXRUeXBlID09PSA0KSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMihcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0yKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IGlucHV0Q250O1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IGlucHV0VHlwZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudClcblx0e1xuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IDB4RkZGRkZGRkY7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gMHhGRkZGRkZGRjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCcnKTtcblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCcnKTtcblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykudmFsKCcnKTtcblxuXHRcdCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoJycpO1xuXHRcdCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoJycpO1xuXHRcdCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoJycpO1xuXG5cdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLmVtcHR5KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2F2ZTogZnVuY3Rpb24obW9kZSkgLy8gMDogU1RELCAxOiBDTE9ORSwgMjogU0hPV1xuXHR7XG5cdFx0aWYobW9kZSAhPT0gMilcblx0XHR7XG5cdFx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdENhdGFsb2cgPSB0aGlzLl90cmltKCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdEVudGl0eSA9IHRoaXMuX3RyaW0oJCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0UHJpbWFyeUZpZWxkID0gdGhpcy5fdHJpbSgkKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJykudmFsKCkpO1xuXHRcdGNvbnN0IGFyY2hpdmVkID0gJCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnKSA/ICcxJyA6ICcwJztcblx0XHRjb25zdCBtb3JlID0gJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCk7XG5cblx0XHRjb25zdCBkZWZhdWx0Q0FUQUxPRyA9IHRoaXMuX3RyaW0obW9kZSA9PT0gMSA/IHdpbmRvdy5wcm9tcHQoJ05ldyBkZWZhdWx0IGNhdGFsb2cnLCBkZWZhdWx0Q2F0YWxvZykgOiBkZWZhdWx0Q2F0YWxvZyk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdENhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q0FUQUxPR1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRFbnRpdHlcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0UHJpbWFyeUZpZWxkXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBrZXlzID0gW107XG5cdFx0Y29uc3QgY3JpdGVyaWEgPSB7fTtcblxuXHRcdCQoJyNGRUMzNjBGQV9FQzFEXzkwRENfRkZENV84QTQ5OENGNjAzMDUnKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0Y29uc3QgcGFydHMgPSBpdGVtLm5hbWUuc3BsaXQoJzo6Jyk7XG5cblx0XHRcdGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qga2V5MSA9IHBhcnRzWzFdO1xuXHRcdFx0XHRjb25zdCBrZXkyID0gcGFydHNbMF07XG5cblx0XHRcdFx0aWYoIShrZXkxIGluIGNyaXRlcmlhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkxKTtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqLyBpZihrZXkyID09PSAndHlwZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHBhcnNlSW50KGl0ZW0udmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoa2V5MiA9PT0gJ21vcmUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSB0aGlzLl9wYXJzZUpzb24oaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSAobW9kZSA9PT0gMSAmJiBrZXkyID09PSAnY2F0YWxvZycgJiYgaXRlbS52YWx1ZSA9PT0gZGVmYXVsdENhdGFsb2cpID8gZGVmYXVsdENBVEFMT0dcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKGl0ZW0udmFsdWUpKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IE1PUkU7XG5cblx0XHR0cnkge1xuXHRcdFx0TU9SRSA9IEpTT04ucGFyc2UobW9yZSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdE1PUkUgPSB7LyotLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGpzb24gPSB7XG5cdFx0XHRkZWZhdWx0Q2F0YWxvZzogZGVmYXVsdENBVEFMT0csXG5cdFx0XHRkZWZhdWx0RW50aXR5OiBkZWZhdWx0RW50aXR5LFxuXHRcdFx0ZGVmYXVsdFByaW1hcnlGaWVsZDogZGVmYXVsdFByaW1hcnlGaWVsZCxcblx0XHRcdG1vcmU6IE1PUkUsXG5cdFx0XHRjcml0ZXJpYToga2V5cy5tYXAoa2V5ID0+IGNyaXRlcmlhW2tleV0pLFxuXHRcdH07XG5cblx0XHRpZihtb2RlID09PSAyKVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKG51bGwsIG51bGwsICd0ZXh0Qm94JywgW3RoaXMuX2R1bXBKc29uKGpzb24pXSwge30pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoLyotLS0tLS0tLS0qLykgPT4ge1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkRWxlbWVudCAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAtZmllbGRzPVwiZ3JvdXDCo25hbWXCo2pzb27Co2FyY2hpdmVkXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoanNvbikpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoYXJjaGl2ZWQpICsgJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnNlYXJjaE1vZGVsZXJBcHAgPSBuZXcgU2VhcmNoTW9kZWxlckFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
