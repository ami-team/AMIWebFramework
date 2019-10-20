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

    more.auto_open = $('#E3951FA5_8B76_3C9E_CFC2_EC3749451226').prop('checked');
    more.inclusive = $('#D6089F83_363A_F322_1E92_25567D89BD3B').prop('checked');
    more.simple_search = $('#B6671716_EA4E_E4A6_454B_79140FFC1532').prop('checked');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImZyYWdtZW50SW50ZXJmYWNlIiwiZnJhZ21lbnRJbnB1dCIsInNlYXJjaEludGVyZmFjZXMiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsIm9uTG9naW4iLCJodG1sIiwidHJpbSIsImdldEludGVyZmFjZUxpc3QiLCJnZXRDYXRhbG9ncyIsIl90cmltIiwicyIsIngiLCJKU09OIiwicGFyc2UiLCJlIiwic3RyaW5naWZ5IiwiZHN0IiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJmb3JFYWNoIiwicm93IiwiaWQiLCJncm91cCIsIm5hbWUiLCJqc29uIiwiYXJjaGl2ZWQiLCJzZWFyY2hJbnRlcmZhY2UiLCJwdXNoIiwidW5sb2NrIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdENhdGFsb2ciLCJlbXB0eSIsImNhdGFsb2ciLCJ0b0xvd2VyQ2FzZSIsInRleHRUb0h0bWwiLCJqb2luIiwicHJvbWlzZSIsImdldEVudGl0aWVzIiwiZGVmYXVsdEVudGl0eSIsInRleHRUb1N0cmluZyIsImVudGl0eSIsImdldEZpZWxkcyIsImRlZmF1bHRGaWVsZCIsImZpZWxkIiwiY250Iiwic2VsZWN0IiwicHJvcCIsImRlZmF1bHRQcmltYXJ5RmllbGQiLCJjcml0ZXJpYSIsImNyaXRlcmlvbiIsInR5cGUiLCJrZXlfZmllbGQiLCJhZGRDcml0ZXJpb24iLCJpc0tleVZhbCIsImFwcGVuZEhUTUwiLCJqc29uVG9Gb3JtMSIsImRpc3RpbmN0IiwibW9kYWwiLCJzZXRPcHRpb25zMSIsImpzb25Ub0Zvcm0yIiwiaW5pdF92YWx1ZSIsIm1pbiIsIm1heCIsIm9mZiIsImF1dG9fb3BlbiIsImluY2x1c2l2ZSIsInNpbXBsZV9zZWFyY2giLCJvcmRlciIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwiaXRlbSIsInBhcnRzIiwia2V5MSIsImtleTIiLCJwYXJzZUludCIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmO0FBRUFDLElBQUFBLFNBQVMsQ0FB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dUNBQXRCOztBQUVBM0MsVUFBQUEsU0FBUyxDQUFDdUgsT0FBVixDQUFrQmxELE9BQWxCLEVBQTJCLElBQTNCO0FBRUEsU0FORCxFQU1HL0IsSUFOSCxDQU1RLFVBQUNuQyxJQUFELEVBQU9rRSxPQUFQLEVBQW1CO0FBRTFCLFVBQUEsTUFBSSxDQUFDMUIsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBM0MsVUFBQUEsU0FBUyxDQUFDc0UsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxTQVhEO0FBYUEsT0FmRCxFQWVHL0IsSUFmSCxDQWVRLFVBQUNuQyxJQUFELEVBQU9rRSxPQUFQLEVBQW1CO0FBRTFCLFFBQUEsTUFBSSxDQUFDMUIsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBM0MsUUFBQUEsU0FBUyxDQUFDc0UsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxPQXBCRDtBQXFCQTtBQUVEOztBQUNBO0FBRUQ7O0FBcjZCNkIsQ0FBckIsQ0FBVDtBQXc2QkE7O0FBQ0E7O0FBQ0E7O0FBRUFtRSxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBSixFQUFuQjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTZWFyY2hNb2RlbGVyQXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL1NlYXJjaE1vZGVsZXJBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvaW50ZXJmYWNlLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2lucHV0LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0XHRcdCdzdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvYWRkb24vZWRpdC9tYXRjaGJyYWNrZXRzLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQuanMnLFxuXHRcdFx0XHRdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5zb3J0YWJsZSgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjEpO1xuXG5cdFx0XHRcdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMS5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IyID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMik7XG5cblx0XHRcdFx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IyLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMTc4NkRFN19CQ0Q2X0YzMzZfRDgxMV85Q0JCNkVDQjU4M0YnKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZWRpdE9wdGlvbnMxKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMSA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5jaGFuZ2UoZjEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjIgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2Jykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykuY2hhbmdlKGYyKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYzID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykuYXR0cignc2l6ZScsICQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykua2V5dXAoZjMpO1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjMoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5mcmFnbWVudEludGVyZmFjZSA9IGRhdGFbMV07XG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnB1dCA9IGRhdGFbMl07XG5cblx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighJCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpLmh0bWwoKS50cmltKCkpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdHJpbTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHMpIHtcblx0XHRcdHJldHVybiBzLnRyaW0oKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5wYXJzZSh4IHx8ICd7fScpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSB7LyotLS0tLS0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoeCB8fCB7fSwgbnVsbCwgMik7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IC8qLS0tLS0tLS0tKi8gJ3t9JyAvKi0tLS0tLS0tLSovO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRJbnRlcmZhY2VMaXN0OiBmdW5jdGlvbihkc3QpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc3FsPVwiU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYGpzb25gLCBgYXJjaGl2ZWRgIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBPUkRFUiBCWSBgZ3JvdXBgLCBgbmFtZWBcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3Qgcm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSk7XG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHNlYXJjaEludGVyZmFjZXM6IFtdLFxuXHRcdFx0fTtcblxuXHRcdFx0cm93cy5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBpZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJpZFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZ3JvdXBcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibmFtZVwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QganNvbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBhcmNoaXZlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJhcmNoaXZlZFwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHtcblx0XHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHRcdGdyb3VwOiBncm91cCxcblx0XHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0XHRqc29uOiB0aGlzLl9wYXJzZUpzb24oanNvbiksXG5cdFx0XHRcdFx0XHRhcmNoaXZlZDogKGFyY2hpdmVkICE9PSAnMCcpLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkaWN0LnNlYXJjaEludGVyZmFjZXMucHVzaChzZWFyY2hJbnRlcmZhY2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXSA9IHNlYXJjaEludGVyZmFjZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoZHN0LCB0aGlzLmZyYWdtZW50SW50ZXJmYWNlLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRDYXRhbG9nczogZnVuY3Rpb24oZHN0LCBkZWZhdWx0Q2F0YWxvZylcblx0e1xuXHRcdGRlZmF1bHRDYXRhbG9nID0gZGVmYXVsdENhdGFsb2cgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RDYXRhbG9ncycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgY2F0YWxvZyAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgY2F0YWxvZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJleHRlcm5hbENhdGFsb2dcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoY2F0YWxvZy50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0Q2F0YWxvZy50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEVudGl0aWVzOiBmdW5jdGlvbihkc3QsIGNhdGFsb2csIGRlZmF1bHRFbnRpdHkpXG5cdHtcblx0XHRpZighY2F0YWxvZylcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdEVudGl0eSA9IGRlZmF1bHRFbnRpdHkgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RFbnRpdGllcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYW4gZW50aXR5IC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBlbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZW50aXR5XCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGVudGl0eS50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0RW50aXR5LnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRGaWVsZHM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZW50aXR5LCBkZWZhdWx0RmllbGQpXG5cdHtcblx0XHRpZighY2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWVudGl0eVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RmllbGQgPSBkZWZhdWx0RmllbGQgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RGaWVsZHMgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgZmllbGQgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZpZWxkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGZpZWxkLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRGaWVsZC50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbnQ6IDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZWxlY3Q6IGZ1bmN0aW9uKGlkKVxuXHR7XG5cdFx0aWYoIShpZCA9IGlkLnRyaW0oKSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdO1xuXG5cdFx0JCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbChzZWFyY2hJbnRlcmZhY2UuZ3JvdXApO1xuXG5cdFx0JCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbChzZWFyY2hJbnRlcmZhY2UubmFtZSk7XG5cblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykucHJvcCgnY2hlY2tlZCcsIHNlYXJjaEludGVyZmFjZS5hcmNoaXZlZCk7XG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24oc2VhcmNoSW50ZXJmYWNlLm1vcmUpKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZyk7XG5cblx0XHRpZihzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZylcblx0XHR7XG5cdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpO1xuXG5cdFx0XHRpZihzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5KVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5LCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0UHJpbWFyeUZpZWxkKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBzZWFyY2hJbnRlcmZhY2UuanNvbi5jcml0ZXJpYSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JywgdGhpcy5mcmFnbWVudElucHV0LCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRkaWN0LmNyaXRlcmlhLmZvckVhY2goKGNyaXRlcmlvbikgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFM0FDQkJBQ19ENDUyXzVCOUFfNDkyNl9EOEZFRTM1NkNENjNfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZyk7XG5cblx0XHRcdFx0aWYoY3JpdGVyaW9uLmNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHkpO1xuXG5cdFx0XHRcdFx0aWYoY3JpdGVyaW9uLmVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5LCBjcml0ZXJpb24uZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5rZXlfZmllbGQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY250Kys7XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YWRkQ3JpdGVyaW9uOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkLCBjcml0ZXJpYSwgaXNLZXlWYWwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNudDogdGhpcy5jbnQsXG5cdFx0XHRjcml0ZXJpYTogY3JpdGVyaWEgfHwgW3t0eXBlOiBpc0tleVZhbCA/IDcgOiAwfV0sXG5cdFx0fTtcblxuXHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JywgdGhpcy5mcmFnbWVudElucHV0LCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRkaWN0LmNyaXRlcmlhLmZvckVhY2goKGNyaXRlcmlvbikgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFM0FDQkJBQ19ENDUyXzVCOUFfNDkyNl9EOEZFRTM1NkNENjNfJyArIHRoaXMuY250LCBjYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0E0RDJGRDcyX0ZGMEFfM0M4N19CMUNGXzRBMzEzMzFEM0Y4Ql8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihlbnRpdHkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNBNDVGMDIxNl82QzM1XzE5RjNfMkNFQ18xMDNBODUzNjkxNEZfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkKTtcblxuXHRcdFx0XHRcdFx0aWYoY3JpdGVyaW9uLnR5cGUgPiA2KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0Y4M0NFNEJCXzM4NTFfM0M0MF8yNDJFX0Y3Mzg0QzY4QTFBNV8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY250Kys7XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0anNvblRvRm9ybTE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHQkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5kaXN0aW5jdCk7XG5cblx0XHQvKiBUT0RPICovXG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1Ub0pzb24xOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0bW9yZS5kaXN0aW5jdCA9ICQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJyk7XG5cblx0XHQvKiBUT0RPICovXG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVkaXRPcHRpb25zMTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbChcblx0XHRcdHRoaXMuX2R1bXBKc29uKFxuXHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24xKFxuXHRcdFx0XHRcdHRoaXMuanNvblRvRm9ybTEoXG5cdFx0XHRcdFx0XHR0aGlzLl9wYXJzZUpzb24oXG5cdFx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cbiBcdFx0LyoqL1xuXG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoKSk7XG5cblx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5JykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnaGlkZScpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0anNvblRvRm9ybTI6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRpZignaW5pdF92YWx1ZScgaW4gbW9yZVxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5pbml0X3ZhbHVlICE9PSBudWxsXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmluaXRfdmFsdWUgIT09ICdATlVMTCdcblx0XHQgKSB7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKG1vcmUuaW5pdF92YWx1ZS5qb2luKCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8pO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9XG5cblx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKG1vcmUubWluICE9PSBudWxsID8gbW9yZS5taW4gOiAnQE5VTEwnKTtcblx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykudmFsKG1vcmUubWF4ICE9PSBudWxsID8gbW9yZS5tYXggOiAnQE5VTEwnKTtcblx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKG1vcmUub2ZmICE9PSBudWxsID8gbW9yZS5vZmYgOiAnQE5VTEwnKTtcblx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKG1vcmUub24gICE9PSBudWxsID8gbW9yZS5vbiAgOiAnQE5VTEwnKTtcblxuXHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmF1dG9fb3Blbik7XG5cdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuaW5jbHVzaXZlKTtcblx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5zaW1wbGVfc2VhcmNoKTtcblxuXHRcdC8qLS0qLyBpZihtb3JlLm9yZGVyID09PSAnQVNDJykge1xuXHRcdFx0JCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2UgaWYobW9yZS5vcmRlciA9PT0gJ0RFU0MnKSB7XG5cdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjI6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRpZigkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGluaXRfdmFsdWUgPSAkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKCk7XG5cblx0XHRcdGlmKGluaXRfdmFsdWUgIT09ICdATlVMTCcpXG5cdFx0XHR7XG5cdFx0XHRcdG1vcmUuaW5pdF92YWx1ZSA9IGluaXRfdmFsdWUuc3BsaXQoJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWluID0gJCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbCgpO1xuXHRcdGlmKG1pbiAmJiBtaW4gIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWluID0gbWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5taW47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF4ID0gJCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbCgpO1xuXHRcdGlmKG1heCAmJiBtYXggIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWF4ID0gbWF4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5tYXg7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2ZmID0gJCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbCgpO1xuXHRcdGlmKG9mZiAmJiBvZmYgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub2ZmID0gb2ZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vZmY7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb24gPSAkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKCk7XG5cdFx0aWYob24gJiYgb24gIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub24gPSBvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub247XG5cdFx0fVxuXG5cdFx0bW9yZS5hdXRvX29wZW4gPSAkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdG1vcmUuaW5jbHVzaXZlID0gJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHRtb3JlLnNpbXBsZV9zZWFyY2ggPSAkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0LyotLSovIGlmKCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnQVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdERVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0ZGVsZXRlIG1vcmUub3JkZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250LCBpbnB1dFR5cGUpXG5cdHtcblx0XHRpZihpbnB1dFR5cGUgPT09IDIgfHwgaW5wdXRUeXBlID09PSAzKSB7XG5cdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dFR5cGUgPT09IDQpIHtcblx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbChcblx0XHRcdHRoaXMuX2R1bXBKc29uKFxuXHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKFxuXHRcdFx0XHRcdHRoaXMuanNvblRvRm9ybTIoXG5cdFx0XHRcdFx0XHR0aGlzLl9wYXJzZUpzb24oXG5cdFx0XHRcdFx0XHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cbiBcdFx0LyoqL1xuXG5cdFx0JCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gaW5wdXRDbnQ7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gaW5wdXRUeXBlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250KVxuXHR7XG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gMHhGRkZGRkZGRjtcblx0XHR0aGlzLmN1cnJlbnRJbnB1dFR5cGUgPSAweEZGRkZGRkZGO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y2xlYXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykgPT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoJycpO1xuXHRcdCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoJycpO1xuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS52YWwoJycpO1xuXG5cdFx0JCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgnJyk7XG5cdFx0JCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgnJyk7XG5cdFx0JCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgnJyk7XG5cblx0XHQkKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JykuZW1wdHkoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzYXZlOiBmdW5jdGlvbihtb2RlKSAvLyAwOiBTVEQsIDE6IENMT05FLCAyOiBTSE9XXG5cdHtcblx0XHRpZihtb2RlICE9PSAyKVxuXHRcdHtcblx0XHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSB0aGlzLl90cmltKCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoKSk7XG5cdFx0Y29uc3QgbmFtZSA9IHRoaXMuX3RyaW0oJCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0Q2F0YWxvZyA9IHRoaXMuX3RyaW0oJCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0RW50aXR5ID0gdGhpcy5fdHJpbSgkKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRQcmltYXJ5RmllbGQgPSB0aGlzLl90cmltKCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoKSk7XG5cdFx0Y29uc3QgYXJjaGl2ZWQgPSAkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykucHJvcCgnY2hlY2tlZCcpID8gJzEnIDogJzAnO1xuXHRcdGNvbnN0IG1vcmUgPSAkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKTtcblxuXHRcdGNvbnN0IGRlZmF1bHRDQVRBTE9HID0gdGhpcy5fdHJpbShtb2RlID09PSAxID8gd2luZG93LnByb21wdCgnTmV3IGRlZmF1bHQgY2F0YWxvZycsIGRlZmF1bHRDYXRhbG9nKSA6IGRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKCFncm91cFxuXHRcdCAgIHx8XG5cdFx0ICAgIW5hbWVcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRDQVRBTE9HXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdEVudGl0eVxuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRQcmltYXJ5RmllbGRcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGtleXMgPSBbXTtcblx0XHRjb25zdCBjcml0ZXJpYSA9IHt9O1xuXG5cdFx0JCgnI0ZFQzM2MEZBX0VDMURfOTBEQ19GRkQ1XzhBNDk4Q0Y2MDMwNScpLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0ubmFtZS5zcGxpdCgnOjonKTtcblxuXHRcdFx0aWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBrZXkxID0gcGFydHNbMV07XG5cdFx0XHRcdGNvbnN0IGtleTIgPSBwYXJ0c1swXTtcblxuXHRcdFx0XHRpZighKGtleTEgaW4gY3JpdGVyaWEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleTEpO1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiovIGlmKGtleTIgPT09ICd0eXBlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gcGFyc2VJbnQoaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihrZXkyID09PSAnbW9yZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHRoaXMuX3BhcnNlSnNvbihpdGVtLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IChtb2RlID09PSAxICYmIGtleTIgPT09ICdjYXRhbG9nJyAmJiBpdGVtLnZhbHVlID09PSBkZWZhdWx0Q2F0YWxvZykgPyBkZWZhdWx0Q0FUQUxPR1xuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoaXRlbS52YWx1ZSkpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgTU9SRTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNT1JFID0gSlNPTi5wYXJzZShtb3JlKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0TU9SRSA9IHsvKi0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QganNvbiA9IHtcblx0XHRcdGRlZmF1bHRDYXRhbG9nOiBkZWZhdWx0Q0FUQUxPRyxcblx0XHRcdGRlZmF1bHRFbnRpdHk6IGRlZmF1bHRFbnRpdHksXG5cdFx0XHRkZWZhdWx0UHJpbWFyeUZpZWxkOiBkZWZhdWx0UHJpbWFyeUZpZWxkLFxuXHRcdFx0bW9yZTogTU9SRSxcblx0XHRcdGNyaXRlcmlhOiBrZXlzLm1hcChrZXkgPT4gY3JpdGVyaWFba2V5XSksXG5cdFx0fTtcblxuXHRcdGlmKG1vZGUgPT09IDIpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wobnVsbCwgbnVsbCwgJ3RleHRCb3gnLCBbdGhpcy5fZHVtcEpzb24oanNvbildLCB7fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWtleUZpZWxkcz1cImdyb3VwwqNuYW1lXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsnXCInKS5kb25lKCgvKi0tLS0tLS0tLSovKSA9PiB7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdBZGRFbGVtZW50IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1maWVsZHM9XCJncm91cMKjbmFtZcKjanNvbsKjYXJjaGl2ZWRcIiAtdmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhhcmNoaXZlZCkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogR0xPQkFMIElOU1RBTkNFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuc2VhcmNoTW9kZWxlckFwcCA9IG5ldyBTZWFyY2hNb2RlbGVyQXBwKCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
