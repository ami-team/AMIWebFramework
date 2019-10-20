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
            $('#B06166B2_2DE1_255D_7350_9C21370DB32F').attr('size', $('#B06166B2_2DE1_255D_7350_9C21370DB32F').val().length);
          };

          $('#B06166B2_2DE1_255D_7350_9C21370DB32F').keyup(f3);
          $('#B06166B2_2DE1_255D_7350_9C21370DB32F').val(',');
          f3();
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
    amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="SELECT `id`, `group`, `name`, `json`, `archived` FROM `router_search_interface` ORDER BY `group`, `name`"').done(function (data) {
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
    if ('init_value' in more && more.init_value !== null && more.init_value !== '@NULL') {
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
    if ($('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked')) {
      var init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();

      if (init_value !== '@NULL') {
        more.init_value = init_value.split($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val());
      } else {
        delete more.init_value;
      }
    } else {
      delete more.init_value;
    }

    var min = $('#C1788970_4C94_D98F_4199_5A185B4D97A3').val();

    if (min && min !== '@NULL') {
      more.min = min;
    } else {
      delete more.min;
    }

    var max = $('#D580EF7E_AD6A_BC51_FFAB_41782CC3F2CF').val();

    if (max && max !== '@NULL') {
      more.max = max;
    } else {
      delete more.max;
    }

    var off = $('#ED6493B8_63FC_96F1_48AA_F2D670E63836').val();

    if (off && off !== '@NULL') {
      more.off = off;
    } else {
      delete more.off;
    }

    var on = $('#A6D9F53B_DCBF_96D2_8DCE_4EFAB0F46E33').val();

    if (on && on !== '@NULL') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImZyYWdtZW50SW50ZXJmYWNlIiwiZnJhZ21lbnRJbnB1dCIsInNlYXJjaEludGVyZmFjZXMiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsIm9uTG9naW4iLCJodG1sIiwidHJpbSIsImdldEludGVyZmFjZUxpc3QiLCJnZXRDYXRhbG9ncyIsIl90cmltIiwicyIsIngiLCJKU09OIiwicGFyc2UiLCJlIiwic3RyaW5naWZ5IiwiZHN0IiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJmb3JFYWNoIiwicm93IiwiaWQiLCJncm91cCIsIm5hbWUiLCJqc29uIiwiYXJjaGl2ZWQiLCJzZWFyY2hJbnRlcmZhY2UiLCJwdXNoIiwidW5sb2NrIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdENhdGFsb2ciLCJlbXB0eSIsImNhdGFsb2ciLCJ0b0xvd2VyQ2FzZSIsInRleHRUb0h0bWwiLCJqb2luIiwicHJvbWlzZSIsImdldEVudGl0aWVzIiwiZGVmYXVsdEVudGl0eSIsInRleHRUb1N0cmluZyIsImVudGl0eSIsImdldEZpZWxkcyIsImRlZmF1bHRGaWVsZCIsImZpZWxkIiwiY250Iiwic2VsZWN0IiwicHJvcCIsImRlZmF1bHRQcmltYXJ5RmllbGQiLCJjcml0ZXJpYSIsImNyaXRlcmlvbiIsInR5cGUiLCJrZXlfZmllbGQiLCJhZGRDcml0ZXJpb24iLCJpc0tleVZhbCIsImFwcGVuZEhUTUwiLCJqc29uVG9Gb3JtMSIsImRpc3RpbmN0IiwibW9kYWwiLCJzZXRPcHRpb25zMSIsImpzb25Ub0Zvcm0yIiwiaW5pdF92YWx1ZSIsIm1pbiIsIm1heCIsIm9mZiIsImF1dG9fb3BlbiIsImluY2x1c2l2ZSIsInNpbXBsZV9zZWFyY2giLCJvcmRlciIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwiaXRlbSIsInBhcnRzIiwia2V5MSIsImtleTIiLCJwYXJzZUludCIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmO0FBRUFDLElBQUFBLFNBQVMsQ0FB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IVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2VhcmNoTW9kZWxlckFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9TZWFyY2hNb2RlbGVyQXBwLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2ludGVyZmFjZS50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9pbnB1dC50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2pzL2pxdWVyeS11aS5taW4uanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3MnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0LmpzJyxcblx0XHRcdFx0XSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4Jykuc29ydGFibGUoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVkaXRvcjEgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JyksIHtcblx0XHRcdFx0XHRcdGxpbmVOdW1iZXJzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0XHRcdFx0XHRcdG1vZGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InLCBlZGl0b3IxKTtcblxuXHRcdFx0XHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVkaXRvcjEucmVmcmVzaCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMiA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjIpO1xuXG5cdFx0XHRcdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMi5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjQjE3ODZERTdfQkNENl9GMzM2X0Q4MTFfOUNCQjZFQ0I1ODNGJykuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHR0aGlzLmVkaXRPcHRpb25zMSgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjEgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24xKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykuY2hhbmdlKGYxKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYyID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBtb3JlID0gdGhpcy5fcGFyc2VKc29uKCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMihtb3JlKTtcblxuXHRcdFx0XHRcdFx0JCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKG1vcmUpKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLmNoYW5nZShmMik7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMyA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLmF0dHIoJ3NpemUnLCAkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCkubGVuZ3RoKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLmtleXVwKGYzKTtcblxuXHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoJywnKTtcblxuXHRcdFx0XHRcdGYzKCk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UgPSBkYXRhWzFdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50SW5wdXQgPSBkYXRhWzJdO1xuXG5cdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlcyA9IHt9O1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKCkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoISQoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKS5odG1sKCkudHJpbSgpKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJyk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RyaW06IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZihzKSB7XG5cdFx0XHRyZXR1cm4gcy50cmltKCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZUpzb246IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJlc3VsdCA9IEpTT04ucGFyc2UoeCB8fCAne30nKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0cmVzdWx0ID0gey8qLS0tLS0tLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcEpzb246IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHggfHwge30sIG51bGwsIDIpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSAvKi0tLS0tLS0tLSovICd7fScgLyotLS0tLS0tLS0qLztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SW50ZXJmYWNlTGlzdDogZnVuY3Rpb24oZHN0KVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnU2VhcmNoUXVlcnkgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNxbD1cIlNFTEVDVCBgaWRgLCBgZ3JvdXBgLCBgbmFtZWAsIGBqc29uYCwgYGFyY2hpdmVkYCBGUk9NIGByb3V0ZXJfc2VhcmNoX2ludGVyZmFjZWAgT1JERVIgQlkgYGdyb3VwYCwgYG5hbWVgXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHJvd3MgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpO1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRzZWFyY2hJbnRlcmZhY2VzOiBbXSxcblx0XHRcdH07XG5cblx0XHRcdHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgaWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGdyb3VwID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImdyb3VwXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBuYW1lID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm5hbWVcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGpzb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgYXJjaGl2ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYXJjaGl2ZWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB7XG5cdFx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0XHRncm91cDogZ3JvdXAsXG5cdFx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdFx0anNvbjogdGhpcy5fcGFyc2VKc29uKGpzb24pLFxuXHRcdFx0XHRcdFx0YXJjaGl2ZWQ6IChhcmNoaXZlZCAhPT0gJzAnKSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0ZGljdC5zZWFyY2hJbnRlcmZhY2VzLnB1c2goc2VhcmNoSW50ZXJmYWNlKTtcblxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF0gPSBzZWFyY2hJbnRlcmZhY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKGRzdCwgdGhpcy5mcmFnbWVudEludGVyZmFjZSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0Q2F0YWxvZ3M6IGZ1bmN0aW9uKGRzdCwgZGVmYXVsdENhdGFsb2cpXG5cdHtcblx0XHRkZWZhdWx0Q2F0YWxvZyA9IGRlZmF1bHRDYXRhbG9nIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0Q2F0YWxvZ3MnKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhIGNhdGFsb2cgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGNhdGFsb2cgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZXh0ZXJuYWxDYXRhbG9nXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdENhdGFsb2cudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRFbnRpdGllczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBkZWZhdWx0RW50aXR5KVxuXHR7XG5cdFx0aWYoIWNhdGFsb2cpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRFbnRpdHkgPSBkZWZhdWx0RW50aXR5IHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0RW50aXRpZXMgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGFuIGVudGl0eSAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZW50aXR5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImVudGl0eVwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihlbnRpdHkudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEVudGl0eS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RmllbGRzOiBmdW5jdGlvbihkc3QsIGNhdGFsb2csIGVudGl0eSwgZGVmYXVsdEZpZWxkKVxuXHR7XG5cdFx0aWYoIWNhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFlbnRpdHlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdEZpZWxkID0gZGVmYXVsdEZpZWxkIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0RmllbGRzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhIGZpZWxkIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBmaWVsZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJmaWVsZFwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihmaWVsZC50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0RmllbGQudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y250OiAwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VsZWN0OiBmdW5jdGlvbihpZClcblx0e1xuXHRcdGlmKCEoaWQgPSBpZC50cmltKCkpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0gdGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXTtcblxuXHRcdCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoc2VhcmNoSW50ZXJmYWNlLmdyb3VwKTtcblxuXHRcdCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoc2VhcmNoSW50ZXJmYWNlLm5hbWUpO1xuXG5cdFx0JCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnLCBzZWFyY2hJbnRlcmZhY2UuYXJjaGl2ZWQpO1xuXG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKHNlYXJjaEludGVyZmFjZS5tb3JlKSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdldENhdGFsb2dzKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpO1xuXG5cdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5KTtcblxuXHRcdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSwgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdFByaW1hcnlGaWVsZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNudDogdGhpcy5jbnQsXG5cdFx0XHRjcml0ZXJpYTogc2VhcmNoSW50ZXJmYWNlLmpzb24uY3JpdGVyaWEsXG5cdFx0fTtcblxuXHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNyaXRlcmlvbi5jYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0E0RDJGRDcyX0ZGMEFfM0M4N19CMUNGXzRBMzEzMzFEM0Y4Ql8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGNyaXRlcmlvbi5lbnRpdHkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNBNDVGMDIxNl82QzM1XzE5RjNfMkNFQ18xMDNBODUzNjkxNEZfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmZpZWxkKTtcblxuXHRcdFx0XHRcdFx0aWYoY3JpdGVyaW9uLnR5cGUgPiA2KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0Y4M0NFNEJCXzM4NTFfM0M0MF8yNDJFX0Y3Mzg0QzY4QTFBNV8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5LCBjcml0ZXJpb24ua2V5X2ZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFkZENyaXRlcmlvbjogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZCwgY3JpdGVyaWEsIGlzS2V5VmFsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IGNyaXRlcmlhIHx8IFt7dHlwZTogaXNLZXlWYWwgPyA3IDogMH1dLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY2F0YWxvZyk7XG5cblx0XHRcdFx0aWYoY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHkpO1xuXG5cdFx0XHRcdFx0aWYoZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0xOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuZGlzdGluY3QpO1xuXG5cdFx0LyogVE9ETyAqL1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdG1vcmUuZGlzdGluY3QgPSAkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0LyogVE9ETyAqL1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0xKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPcHRpb25zMTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5JykubW9kYWwoJ2hpZGUnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJ2luaXRfdmFsdWUnIGluIG1vcmVcblx0XHQgICAmJlxuXHRcdCAgIG1vcmUuaW5pdF92YWx1ZSAhPT0gbnVsbFxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5pbml0X3ZhbHVlICE9PSAnQE5VTEwnXG5cdFx0ICkge1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbChtb3JlLmluaXRfdmFsdWUuam9pbigkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCkpKTtcblxuXHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwoLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovICdATlVMTCcgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbChtb3JlLm1pbiAhPT0gbnVsbCA/IG1vcmUubWluIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbChtb3JlLm1heCAhPT0gbnVsbCA/IG1vcmUubWF4IDogJ0BOVUxMJyk7XG5cdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbChtb3JlLm9mZiAhPT0gbnVsbCA/IG1vcmUub2ZmIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbChtb3JlLm9uICAhPT0gbnVsbCA/IG1vcmUub24gIDogJ0BOVUxMJyk7XG5cblx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5hdXRvX29wZW4pO1xuXHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmluY2x1c2l2ZSk7XG5cdFx0JCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuc2ltcGxlX3NlYXJjaCk7XG5cblx0XHQvKi0tKi8gaWYobW9yZS5vcmRlciA9PT0gJ0FTQycpIHtcblx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIGlmKG1vcmUub3JkZXIgPT09ICdERVNDJykge1xuXHRcdFx0JCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1Ub0pzb24yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHRjb25zdCBpbml0X3ZhbHVlID0gJCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgpO1xuXG5cdFx0XHRpZihpbml0X3ZhbHVlICE9PSAnQE5VTEwnKVxuXHRcdFx0e1xuXHRcdFx0XHRtb3JlLmluaXRfdmFsdWUgPSBpbml0X3ZhbHVlLnNwbGl0KCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1pbiA9ICQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwoKTtcblx0XHRpZihtaW4gJiYgbWluICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm1pbiA9IG1pbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUubWluO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1heCA9ICQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwoKTtcblx0XHRpZihtYXggJiYgbWF4ICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm1heCA9IG1heDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUubWF4O1xuXHRcdH1cblxuXHRcdGNvbnN0IG9mZiA9ICQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS52YWwoKTtcblx0XHRpZihvZmYgJiYgb2ZmICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9mZiA9IG9mZjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub2ZmO1xuXHRcdH1cblxuXHRcdGNvbnN0IG9uID0gJCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbCgpO1xuXHRcdGlmKG9uICYmIG9uICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9uID0gb247XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9uO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGF1dG9fb3BlbiAgID0gJCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGF1dG9fb3BlbiAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGluY2x1c2l2ZSAgID0gJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGluY2x1c2l2ZSAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS5zaW1wbGVfc2VhcmNoID0gJCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5zaW1wbGVfc2VhcmNoO1xuXHRcdH1cblxuXHRcdC8qLS0qLyBpZigkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRtb3JlLm9yZGVyID0gJ0FTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnREVTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9yZGVyO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudCwgaW5wdXRUeXBlKVxuXHR7XG5cdFx0aWYoaW5wdXRUeXBlID09PSAyIHx8IGlucHV0VHlwZSA9PT0gMykge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXRUeXBlID09PSA0KSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMihcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0yKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IGlucHV0Q250O1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IGlucHV0VHlwZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudClcblx0e1xuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IDB4RkZGRkZGRkY7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gMHhGRkZGRkZGRjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCcnKTtcblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCcnKTtcblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykudmFsKCcnKTtcblxuXHRcdCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoJycpO1xuXHRcdCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoJycpO1xuXHRcdCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoJycpO1xuXG5cdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLmVtcHR5KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2F2ZTogZnVuY3Rpb24obW9kZSkgLy8gMDogU1RELCAxOiBDTE9ORSwgMjogU0hPV1xuXHR7XG5cdFx0aWYobW9kZSAhPT0gMilcblx0XHR7XG5cdFx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdENhdGFsb2cgPSB0aGlzLl90cmltKCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdEVudGl0eSA9IHRoaXMuX3RyaW0oJCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0UHJpbWFyeUZpZWxkID0gdGhpcy5fdHJpbSgkKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJykudmFsKCkpO1xuXHRcdGNvbnN0IGFyY2hpdmVkID0gJCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnKSA/ICcxJyA6ICcwJztcblx0XHRjb25zdCBtb3JlID0gJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCk7XG5cblx0XHRjb25zdCBkZWZhdWx0Q0FUQUxPRyA9IHRoaXMuX3RyaW0obW9kZSA9PT0gMSA/IHdpbmRvdy5wcm9tcHQoJ05ldyBkZWZhdWx0IGNhdGFsb2cnLCBkZWZhdWx0Q2F0YWxvZykgOiBkZWZhdWx0Q2F0YWxvZyk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdENhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q0FUQUxPR1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRFbnRpdHlcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0UHJpbWFyeUZpZWxkXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBrZXlzID0gW107XG5cdFx0Y29uc3QgY3JpdGVyaWEgPSB7fTtcblxuXHRcdCQoJyNGRUMzNjBGQV9FQzFEXzkwRENfRkZENV84QTQ5OENGNjAzMDUnKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0Y29uc3QgcGFydHMgPSBpdGVtLm5hbWUuc3BsaXQoJzo6Jyk7XG5cblx0XHRcdGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qga2V5MSA9IHBhcnRzWzFdO1xuXHRcdFx0XHRjb25zdCBrZXkyID0gcGFydHNbMF07XG5cblx0XHRcdFx0aWYoIShrZXkxIGluIGNyaXRlcmlhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkxKTtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqLyBpZihrZXkyID09PSAndHlwZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHBhcnNlSW50KGl0ZW0udmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoa2V5MiA9PT0gJ21vcmUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSB0aGlzLl9wYXJzZUpzb24oaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSAobW9kZSA9PT0gMSAmJiBrZXkyID09PSAnY2F0YWxvZycgJiYgaXRlbS52YWx1ZSA9PT0gZGVmYXVsdENhdGFsb2cpID8gZGVmYXVsdENBVEFMT0dcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKGl0ZW0udmFsdWUpKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IE1PUkU7XG5cblx0XHR0cnkge1xuXHRcdFx0TU9SRSA9IEpTT04ucGFyc2UobW9yZSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdE1PUkUgPSB7LyotLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGpzb24gPSB7XG5cdFx0XHRkZWZhdWx0Q2F0YWxvZzogZGVmYXVsdENBVEFMT0csXG5cdFx0XHRkZWZhdWx0RW50aXR5OiBkZWZhdWx0RW50aXR5LFxuXHRcdFx0ZGVmYXVsdFByaW1hcnlGaWVsZDogZGVmYXVsdFByaW1hcnlGaWVsZCxcblx0XHRcdG1vcmU6IE1PUkUsXG5cdFx0XHRjcml0ZXJpYToga2V5cy5tYXAoa2V5ID0+IGNyaXRlcmlhW2tleV0pLFxuXHRcdH07XG5cblx0XHRpZihtb2RlID09PSAyKVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKG51bGwsIG51bGwsICd0ZXh0Qm94JywgW3RoaXMuX2R1bXBKc29uKGpzb24pXSwge30pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoLyotLS0tLS0tLS0qLykgPT4ge1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkRWxlbWVudCAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAtZmllbGRzPVwiZ3JvdXDCo25hbWXCo2pzb27Co2FyY2hpdmVkXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoanNvbikpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoYXJjaGl2ZWQpICsgJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnNlYXJjaE1vZGVsZXJBcHAgPSBuZXcgU2VhcmNoTW9kZWxlckFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
