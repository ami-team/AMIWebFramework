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
      amiWebApp.createControl(null, null, 'textBox', [this._dumpJson(json, null, 2)], {}).done(function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImZyYWdtZW50SW50ZXJmYWNlIiwiZnJhZ21lbnRJbnB1dCIsInNlYXJjaEludGVyZmFjZXMiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsIm9uTG9naW4iLCJodG1sIiwidHJpbSIsImdldEludGVyZmFjZUxpc3QiLCJnZXRDYXRhbG9ncyIsIl90cmltIiwicyIsIngiLCJKU09OIiwicGFyc2UiLCJlIiwic3RyaW5naWZ5IiwiZHN0IiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJmb3JFYWNoIiwicm93IiwiaWQiLCJncm91cCIsIm5hbWUiLCJqc29uIiwiYXJjaGl2ZWQiLCJzZWFyY2hJbnRlcmZhY2UiLCJwdXNoIiwidW5sb2NrIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdENhdGFsb2ciLCJlbXB0eSIsImNhdGFsb2ciLCJ0b0xvd2VyQ2FzZSIsInRleHRUb0h0bWwiLCJqb2luIiwicHJvbWlzZSIsImdldEVudGl0aWVzIiwiZGVmYXVsdEVudGl0eSIsInRleHRUb1N0cmluZyIsImVudGl0eSIsImdldEZpZWxkcyIsImRlZmF1bHRGaWVsZCIsImZpZWxkIiwiY250Iiwic2VsZWN0IiwicHJvcCIsImRlZmF1bHRQcmltYXJ5RmllbGQiLCJjcml0ZXJpYSIsImNyaXRlcmlvbiIsInR5cGUiLCJrZXlfZmllbGQiLCJhZGRDcml0ZXJpb24iLCJpc0tleVZhbCIsImFwcGVuZEhUTUwiLCJqc29uVG9Gb3JtMSIsImRpc3RpbmN0IiwibW9kYWwiLCJzZXRPcHRpb25zMSIsImpzb25Ub0Zvcm0yIiwiaW5pdF92YWx1ZSIsIm1pbiIsIm1heCIsIm9mZiIsImF1dG9fb3BlbiIsImluY2x1c2l2ZSIsInNpbXBsZV9zZWFyY2giLCJvcmRlciIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwiaXRlbSIsInBhcnRzIiwia2V5MSIsImtleTIiLCJwYXJzZUludCIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmO0FBRUFDLElBQUFBLFNBQVMsQ0FB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LENBQTZULFVBQUNDLElBQUQsRUFBT2tFLE9BQVAsRUFBbUI7QUFFL1UsVUFBQSxNQUFJLENBQUMxQixnQkFBTCxDQUFzQix1Q0FBdEI7O0FBRUEzQyxVQUFBQSxTQUFTLENBQUN1SCxPQUFWLENBQWtCbEQsT0FBbEIsRUFBMkIsSUFBM0I7QUFFQSxTQU5ELEVBTUcvQixJQU5ILENBTVEsVUFBQ25DLElBQUQsRUFBT2tFLE9BQVAsRUFBbUI7QUFFMUIsVUFBQSxNQUFJLENBQUMxQixnQkFBTCxDQUFzQix1Q0FBdEI7O0FBRUEzQyxVQUFBQSxTQUFTLENBQUNzRSxLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLFNBWEQ7QUFhQSxPQWZELEVBZUcvQixJQWZILENBZVEsVUFBQ25DLElBQUQsRUFBT2tFLE9BQVAsRUFBbUI7QUFFMUIsUUFBQSxNQUFJLENBQUMxQixnQkFBTCxDQUFzQix1Q0FBdEI7O0FBRUEzQyxRQUFBQSxTQUFTLENBQUNzRSxLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLE9BcEJEO0FBcUJBO0FBRUQ7O0FBQ0E7QUFFRDs7QUFqNUI2QixDQUFyQixDQUFUO0FBbzVCQTs7QUFDQTs7QUFDQTs7QUFFQW1FLGdCQUFnQixHQUFHLElBQUlDLGdCQUFKLEVBQW5CO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1NlYXJjaE1vZGVsZXJBcHAnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5TdWJBcHAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvU2VhcmNoTW9kZWxlckFwcC50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9pbnRlcmZhY2UudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvaW5wdXQudHdpZycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbWFpbl9jb250ZW50JywgZGF0YVswXSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRcdFx0J3N1YmFwcHMvVXNlckRhc2hib2FyZC9qcy9qcXVlcnktdWkubWluLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9hZGRvbi9lZGl0L21hdGNoYnJhY2tldHMuanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9tb2RlL2phdmFzY3JpcHQvamF2YXNjcmlwdC5qcycsXG5cdFx0XHRcdF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLnNvcnRhYmxlKCk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IxID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMSk7XG5cblx0XHRcdFx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5Jykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IxLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVkaXRvcjIgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJyksIHtcblx0XHRcdFx0XHRcdGxpbmVOdW1iZXJzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0XHRcdFx0XHRcdG1vZGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InLCBlZGl0b3IyKTtcblxuXHRcdFx0XHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVkaXRvcjIucmVmcmVzaCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0IxNzg2REU3X0JDRDZfRjMzNl9EODExXzlDQkI2RUNCNTgzRicpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0dGhpcy5lZGl0T3B0aW9uczEoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYxID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBtb3JlID0gdGhpcy5fcGFyc2VKc29uKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShtb3JlKTtcblxuXHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKG1vcmUpKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLmNoYW5nZShmMSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMiA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjIobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS5rZXl1cCAoZjIpO1xuXHRcdFx0XHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS5rZXl1cCAoZjIpO1xuXHRcdFx0XHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS5rZXl1cCAoZjIpO1xuXHRcdFx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5rZXl1cCAoZjIpO1xuXHRcdFx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5rZXl1cCAoZjIpO1xuXHRcdFx0XHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5jaGFuZ2UoZjIpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjMgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5hdHRyKCdzaXplJywgJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpLmxlbmd0aCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5rZXl1cChmMyk7XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCcsJyk7XG5cblx0XHRcdFx0XHRmMygpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLmZyYWdtZW50SW50ZXJmYWNlID0gZGF0YVsxXTtcblx0XHRcdFx0dGhpcy5mcmFnbWVudElucHV0ID0gZGF0YVsyXTtcblxuXHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXMgPSB7fTtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKCgpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdCgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCEkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5JykuaHRtbCgpLnRyaW0oKSlcblx0XHR7XG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90cmltOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYocykge1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnBhcnNlKHggfHwgJ3t9Jyk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IHsvKi0tLS0tLS0tLS0tLS0tLSovfTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXBKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh4IHx8IHt9LCBudWxsLCAyKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0cmVzdWx0ID0gLyotLS0tLS0tLS0qLyAne30nIC8qLS0tLS0tLS0tKi87XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKGRzdClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1NlYXJjaFF1ZXJ5IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zcWw9XCJTRUxFQ1QgYGlkYCwgYGdyb3VwYCwgYG5hbWVgLCBganNvbmAsIGBhcmNoaXZlZGAgRlJPTSBgcm91dGVyX3NlYXJjaF9pbnRlcmZhY2VgIE9SREVSIEJZIGBncm91cGAsIGBuYW1lYFwiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCByb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0c2VhcmNoSW50ZXJmYWNlczogW10sXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImlkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBncm91cCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYW1lXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBqc29uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGFyY2hpdmVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFyY2hpdmVkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0ge1xuXHRcdFx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRcdFx0Z3JvdXA6IGdyb3VwLFxuXHRcdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRcdGpzb246IHRoaXMuX3BhcnNlSnNvbihqc29uKSxcblx0XHRcdFx0XHRcdGFyY2hpdmVkOiAoYXJjaGl2ZWQgIT09ICcwJyksXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGRpY3Quc2VhcmNoSW50ZXJmYWNlcy5wdXNoKHNlYXJjaEludGVyZmFjZSk7XG5cblx0XHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdID0gc2VhcmNoSW50ZXJmYWNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTChkc3QsIHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldENhdGFsb2dzOiBmdW5jdGlvbihkc3QsIGRlZmF1bHRDYXRhbG9nKVxuXHR7XG5cdFx0ZGVmYXVsdENhdGFsb2cgPSBkZWZhdWx0Q2F0YWxvZyB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdENhdGFsb2dzJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBjYXRhbG9nIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBjYXRhbG9nID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihjYXRhbG9nLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRDYXRhbG9nLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RW50aXRpZXM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZGVmYXVsdEVudGl0eSlcblx0e1xuXHRcdGlmKCFjYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RW50aXR5ID0gZGVmYXVsdEVudGl0eSB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEVudGl0aWVzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhbiBlbnRpdHkgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGVudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJlbnRpdHlcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZW50aXR5LnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRFbnRpdHkudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEZpZWxkczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBlbnRpdHksIGRlZmF1bHRGaWVsZClcblx0e1xuXHRcdGlmKCFjYXRhbG9nXG5cdFx0ICAgfHxcblx0XHQgICAhZW50aXR5XG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRGaWVsZCA9IGRlZmF1bHRGaWVsZCB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEZpZWxkcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBmaWVsZCAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZmllbGQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmllbGRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZmllbGQudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEZpZWxkLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNudDogMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlbGVjdDogZnVuY3Rpb24oaWQpXG5cdHtcblx0XHRpZighKGlkID0gaWQudHJpbSgpKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF07XG5cblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKHNlYXJjaEludGVyZmFjZS5ncm91cCk7XG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKHNlYXJjaEludGVyZmFjZS5uYW1lKTtcblxuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJywgc2VhcmNoSW50ZXJmYWNlLmFyY2hpdmVkKTtcblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihzZWFyY2hJbnRlcmZhY2UubW9yZSkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSk7XG5cblx0XHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHksIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRQcmltYXJ5RmllbGQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IHNlYXJjaEludGVyZmFjZS5qc29uLmNyaXRlcmlhLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjcml0ZXJpb24uY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihjcml0ZXJpb24uZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5maWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmtleV9maWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhZGRDcml0ZXJpb246IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQsIGNyaXRlcmlhLCBpc0tleVZhbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBjcml0ZXJpYSB8fCBbe3R5cGU6IGlzS2V5VmFsID8gNyA6IDB9XSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmRpc3RpbmN0KTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRtb3JlLmRpc3RpbmN0ID0gJCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnKTtcblxuXHRcdC8qIFRPRE8gKi9cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMShcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdoaWRlJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCdpbml0X3ZhbHVlJyBpbiBtb3JlXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmluaXRfdmFsdWUgIT09IG51bGxcblx0XHQgICAmJlxuXHRcdCAgIG1vcmUuaW5pdF92YWx1ZSAhPT0gJ0BOVUxMJ1xuXHRcdCApIHtcblx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwobW9yZS5pbml0X3ZhbHVlLmpvaW4oJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyAnQE5VTEwnIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwobW9yZS5taW4gIT09IG51bGwgPyBtb3JlLm1pbiA6ICdATlVMTCcpO1xuXHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwobW9yZS5tYXggIT09IG51bGwgPyBtb3JlLm1heCA6ICdATlVMTCcpO1xuXHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS52YWwobW9yZS5vZmYgIT09IG51bGwgPyBtb3JlLm9mZiA6ICdATlVMTCcpO1xuXHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwobW9yZS5vbiAgIT09IG51bGwgPyBtb3JlLm9uICA6ICdATlVMTCcpO1xuXG5cdFx0JCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuYXV0b19vcGVuKTtcblx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5pbmNsdXNpdmUpO1xuXHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLnNpbXBsZV9zZWFyY2gpO1xuXG5cdFx0LyotLSovIGlmKG1vcmUub3JkZXIgPT09ICdBU0MnKSB7XG5cdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSBpZihtb3JlLm9yZGVyID09PSAnREVTQycpIHtcblx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgaW5pdF92YWx1ZSA9ICQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwoKTtcblxuXHRcdFx0aWYoaW5pdF92YWx1ZSAhPT0gJ0BOVUxMJylcblx0XHRcdHtcblx0XHRcdFx0bW9yZS5pbml0X3ZhbHVlID0gaW5pdF92YWx1ZS5zcGxpdCgkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBtaW4gPSAkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKCk7XG5cdFx0aWYobWluICYmIG1pbiAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5taW4gPSBtaW47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm1pbjtcblx0XHR9XG5cblx0XHRjb25zdCBtYXggPSAkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykudmFsKCk7XG5cdFx0aWYobWF4ICYmIG1heCAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5tYXggPSBtYXg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm1heDtcblx0XHR9XG5cblx0XHRjb25zdCBvZmYgPSAkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKCk7XG5cdFx0aWYob2ZmICYmIG9mZiAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5vZmYgPSBvZmY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9mZjtcblx0XHR9XG5cblx0XHRjb25zdCBvbiA9ICQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwoKTtcblx0XHRpZihvbiAmJiBvbiAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5vbiA9IG9uO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vbjtcblx0XHR9XG5cblx0XHRtb3JlLmF1dG9fb3BlbiA9ICQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdjaGVja2VkJyk7XG5cdFx0bW9yZS5pbmNsdXNpdmUgPSAkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdG1vcmUuc2ltcGxlX3NlYXJjaCA9ICQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdjaGVja2VkJyk7XG5cblx0XHQvKi0tKi8gaWYoJCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdBU0MnO1xuXHRcdH0gZWxzZSBpZigkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRtb3JlLm9yZGVyID0gJ0RFU0MnO1xuXHRcdH0gZWxzZSBpZigkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vcmRlcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVkaXRPcHRpb25zMjogZnVuY3Rpb24oaW5wdXRDbnQsIGlucHV0VHlwZSlcblx0e1xuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMihcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0yKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IGlucHV0Q250O1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IGlucHV0VHlwZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudClcblx0e1xuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IDB4RkZGRkZGRkY7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gMHhGRkZGRkZGRjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCcnKTtcblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCcnKTtcblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykudmFsKCcnKTtcblxuXHRcdCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoJycpO1xuXHRcdCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoJycpO1xuXHRcdCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoJycpO1xuXG5cdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLmVtcHR5KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2F2ZTogZnVuY3Rpb24obW9kZSkgLy8gMDogU1RELCAxOiBDTE9ORSwgMjogU0hPV1xuXHR7XG5cdFx0aWYobW9kZSAhPT0gMilcblx0XHR7XG5cdFx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdENhdGFsb2cgPSB0aGlzLl90cmltKCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdEVudGl0eSA9IHRoaXMuX3RyaW0oJCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0UHJpbWFyeUZpZWxkID0gdGhpcy5fdHJpbSgkKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJykudmFsKCkpO1xuXHRcdGNvbnN0IGFyY2hpdmVkID0gJCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnKSA/ICcxJyA6ICcwJztcblx0XHRjb25zdCBtb3JlID0gJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCk7XG5cblx0XHRjb25zdCBkZWZhdWx0Q0FUQUxPRyA9IHRoaXMuX3RyaW0obW9kZSA9PT0gMSA/IHdpbmRvdy5wcm9tcHQoJ05ldyBkZWZhdWx0IGNhdGFsb2cnLCBkZWZhdWx0Q2F0YWxvZykgOiBkZWZhdWx0Q2F0YWxvZyk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdENhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q0FUQUxPR1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRFbnRpdHlcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0UHJpbWFyeUZpZWxkXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBrZXlzID0gW107XG5cdFx0Y29uc3QgY3JpdGVyaWEgPSB7fTtcblxuXHRcdCQoJyNGRUMzNjBGQV9FQzFEXzkwRENfRkZENV84QTQ5OENGNjAzMDUnKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0Y29uc3QgcGFydHMgPSBpdGVtLm5hbWUuc3BsaXQoJzo6Jyk7XG5cblx0XHRcdGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qga2V5MSA9IHBhcnRzWzFdO1xuXHRcdFx0XHRjb25zdCBrZXkyID0gcGFydHNbMF07XG5cblx0XHRcdFx0aWYoIShrZXkxIGluIGNyaXRlcmlhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkxKTtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqLyBpZihrZXkyID09PSAndHlwZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHBhcnNlSW50KGl0ZW0udmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoa2V5MiA9PT0gJ21vcmUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSB0aGlzLl9wYXJzZUpzb24oaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSAobW9kZSA9PT0gMSAmJiBrZXkyID09PSAnY2F0YWxvZycgJiYgaXRlbS52YWx1ZSA9PT0gZGVmYXVsdENhdGFsb2cpID8gZGVmYXVsdENBVEFMT0dcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKGl0ZW0udmFsdWUpKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IE1PUkU7XG5cblx0XHR0cnkge1xuXHRcdFx0TU9SRSA9IEpTT04ucGFyc2UobW9yZSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdE1PUkUgPSB7LyotLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGpzb24gPSB7XG5cdFx0XHRkZWZhdWx0Q2F0YWxvZzogZGVmYXVsdENBVEFMT0csXG5cdFx0XHRkZWZhdWx0RW50aXR5OiBkZWZhdWx0RW50aXR5LFxuXHRcdFx0ZGVmYXVsdFByaW1hcnlGaWVsZDogZGVmYXVsdFByaW1hcnlGaWVsZCxcblx0XHRcdG1vcmU6IE1PUkUsXG5cdFx0XHRjcml0ZXJpYToga2V5cy5tYXAoa2V5ID0+IGNyaXRlcmlhW2tleV0pLFxuXHRcdH07XG5cblx0XHRpZihtb2RlID09PSAyKVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKG51bGwsIG51bGwsICd0ZXh0Qm94JywgW3RoaXMuX2R1bXBKc29uKGpzb24sIG51bGwsIDIpXSwge30pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoLyotLS0tLS0tLS0qLykgPT4ge1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkRWxlbWVudCAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAtZmllbGRzPVwiZ3JvdXDCo25hbWXCo2pzb27Co2FyY2hpdmVkXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoanNvbikpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoYXJjaGl2ZWQpICsgJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnNlYXJjaE1vZGVsZXJBcHAgPSBuZXcgU2VhcmNoTW9kZWxlckFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
