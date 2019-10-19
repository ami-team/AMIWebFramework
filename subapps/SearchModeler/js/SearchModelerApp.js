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

    if (confirm('Please confirm...') == false) {
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
  save: function save(clone) {
    var _this6 = this;

    if (confirm('Please confirm...') == false) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    var group = this._trim($('#B08B0D55_227C_8AB2_DD3F_B9E783E606F8').val());

    var name = this._trim($('#BC4ABCC1_39F9_2020_4B64_0BC86DDA6B16').val());

    var defaultCatalog = this._trim($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val());

    var defaultEntity = this._trim($('#F71D1452_8613_5FB5_27D3_C1540573F450').val());

    var defaultPrimaryField = this._trim($('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val());

    var archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';
    var more = $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue();

    var defaultCATALOG = this._trim(clone ? window.prompt('New default catalog', defaultCatalog) : defaultCatalog);

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
          criteria[key1][key2] = clone && key2 == 'catalog' && item.value === defaultCatalog ? defaultCATALOG : item.value;
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
    /*------------------------------------------------------------------------------------------------------------*/
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

searchModelerApp = new SearchModelerApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJlZGl0b3IxIiwiQ29kZU1pcnJvciIsImZyb21UZXh0QXJlYSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsaW5lTnVtYmVycyIsIm1hdGNoQnJhY2tldHMiLCJtb2RlIiwib24iLCJyZWZyZXNoIiwiZWRpdG9yMiIsImNsaWNrIiwiZWRpdE9wdGlvbnMxIiwiZjEiLCJtb3JlIiwiX3BhcnNlSnNvbiIsImdldFZhbHVlIiwiZm9ybVRvSnNvbjEiLCJzZXRWYWx1ZSIsIl9kdW1wSnNvbiIsImNoYW5nZSIsImYyIiwiZm9ybVRvSnNvbjIiLCJrZXl1cCIsImYzIiwiYXR0ciIsInZhbCIsImxlbmd0aCIsImZyYWdtZW50SW50ZXJmYWNlIiwiZnJhZ21lbnRJbnB1dCIsInNlYXJjaEludGVyZmFjZXMiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsIm9uTG9naW4iLCJodG1sIiwidHJpbSIsImdldEludGVyZmFjZUxpc3QiLCJnZXRDYXRhbG9ncyIsIl90cmltIiwicyIsIngiLCJKU09OIiwicGFyc2UiLCJlIiwic3RyaW5naWZ5IiwiZHN0IiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJmb3JFYWNoIiwicm93IiwiaWQiLCJncm91cCIsIm5hbWUiLCJqc29uIiwiYXJjaGl2ZWQiLCJzZWFyY2hJbnRlcmZhY2UiLCJwdXNoIiwidW5sb2NrIiwibWVzc2FnZSIsImVycm9yIiwiZGVmYXVsdENhdGFsb2ciLCJlbXB0eSIsImNhdGFsb2ciLCJ0b0xvd2VyQ2FzZSIsInRleHRUb0h0bWwiLCJqb2luIiwicHJvbWlzZSIsImdldEVudGl0aWVzIiwiZGVmYXVsdEVudGl0eSIsInRleHRUb1N0cmluZyIsImVudGl0eSIsImdldEZpZWxkcyIsImRlZmF1bHRGaWVsZCIsImZpZWxkIiwiY250Iiwic2VsZWN0IiwicHJvcCIsImRlZmF1bHRQcmltYXJ5RmllbGQiLCJjcml0ZXJpYSIsImNyaXRlcmlvbiIsInR5cGUiLCJrZXlfZmllbGQiLCJhZGRDcml0ZXJpb24iLCJpc0tleVZhbCIsImFwcGVuZEhUTUwiLCJqc29uVG9Gb3JtMSIsImRpc3RpbmN0IiwibW9kYWwiLCJzZXRPcHRpb25zMSIsImpzb25Ub0Zvcm0yIiwiaW5pdF92YWx1ZSIsIm1pbiIsIm1heCIsIm9mZiIsImF1dG9fb3BlbiIsImluY2x1c2l2ZSIsInNpbXBsZV9zZWFyY2giLCJvcmRlciIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImNsb25lIiwiZGVmYXVsdENBVEFMT0ciLCJ3aW5kb3ciLCJwcm9tcHQiLCJrZXlzIiwic2VyaWFsaXplQXJyYXkiLCJpdGVtIiwicGFydHMiLCJrZXkxIiwia2V5MiIsInBhcnNlSW50IiwidmFsdWUiLCJNT1JFIiwibWFwIiwia2V5Iiwic2VhcmNoTW9kZWxlckFwcCIsIlNlYXJjaE1vZGVsZXJBcHAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUFBLFNBQVMsQ0FBQyxrQkFBRCxFQUFxQjtBQUM3QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsTUFIZTs7QUFLN0I7QUFFQUMsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsUUFBTUMsTUFBTSxHQUFHQyxDQUFDLENBQUNDLFFBQUYsRUFBZjtBQUVBQyxJQUFBQSxTQUFTLENBQUNDLGFBQVYs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SCxDQWVRLFVBQUNuQyxJQUFELEVBQU9rRSxPQUFQLEVBQW1CO0FBRTFCLE1BQUEsTUFBSSxDQUFDMUIsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBM0MsTUFBQUEsU0FBUyxDQUFDc0UsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxLQXBCRDtBQXNCQTtBQUNBO0FBRUQ7O0FBcDRCNkIsQ0FBckIsQ0FBVDtBQXU0QkE7O0FBQ0E7O0FBQ0E7O0FBRUFtRSxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBSixFQUFuQjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTZWFyY2hNb2RlbGVyQXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL1NlYXJjaE1vZGVsZXJBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvaW50ZXJmYWNlLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2lucHV0LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0XHRcdCdzdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvYWRkb24vZWRpdC9tYXRjaGJyYWNrZXRzLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQuanMnLFxuXHRcdFx0XHRdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5zb3J0YWJsZSgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjEpO1xuXG5cdFx0XHRcdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMS5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IyID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMik7XG5cblx0XHRcdFx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IyLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMTc4NkRFN19CQ0Q2X0YzMzZfRDgxMV85Q0JCNkVDQjU4M0YnKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZWRpdE9wdGlvbnMxKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMSA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5jaGFuZ2UoZjEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjIgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2Jykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykuY2hhbmdlKGYyKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYzID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykuYXR0cignc2l6ZScsICQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykua2V5dXAoZjMpO1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjMoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5mcmFnbWVudEludGVyZmFjZSA9IGRhdGFbMV07XG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnB1dCA9IGRhdGFbMl07XG5cblx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighJCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpLmh0bWwoKS50cmltKCkpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfdHJpbTogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHMpIHtcblx0XHRcdHJldHVybiBzLnRyaW0oKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5wYXJzZSh4IHx8ICd7fScpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSB7LyotLS0tLS0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wSnNvbjogZnVuY3Rpb24oeClcblx0e1xuXHRcdGxldCByZXN1bHQ7XG5cblx0XHR0cnkge1xuXHRcdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkoeCB8fCB7fSwgbnVsbCwgMik7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IC8qLS0tLS0tLS0tKi8gJ3t9JyAvKi0tLS0tLS0tLSovO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRJbnRlcmZhY2VMaXN0OiBmdW5jdGlvbihkc3QpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc3FsPVwiU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYGpzb25gLCBgYXJjaGl2ZWRgIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBPUkRFUiBCWSBgZ3JvdXBgLCBgbmFtZWBcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3Qgcm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSk7XG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHNlYXJjaEludGVyZmFjZXM6IFtdLFxuXHRcdFx0fTtcblxuXHRcdFx0cm93cy5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBpZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJpZFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZ3JvdXBcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibmFtZVwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QganNvbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBhcmNoaXZlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJhcmNoaXZlZFwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHtcblx0XHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHRcdGdyb3VwOiBncm91cCxcblx0XHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0XHRqc29uOiB0aGlzLl9wYXJzZUpzb24oanNvbiksXG5cdFx0XHRcdFx0XHRhcmNoaXZlZDogKGFyY2hpdmVkICE9PSAnMCcpLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkaWN0LnNlYXJjaEludGVyZmFjZXMucHVzaChzZWFyY2hJbnRlcmZhY2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXSA9IHNlYXJjaEludGVyZmFjZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoZHN0LCB0aGlzLmZyYWdtZW50SW50ZXJmYWNlLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRDYXRhbG9nczogZnVuY3Rpb24oZHN0LCBkZWZhdWx0Q2F0YWxvZylcblx0e1xuXHRcdGRlZmF1bHRDYXRhbG9nID0gZGVmYXVsdENhdGFsb2cgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RDYXRhbG9ncycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgY2F0YWxvZyAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgY2F0YWxvZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJleHRlcm5hbENhdGFsb2dcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoY2F0YWxvZy50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0Q2F0YWxvZy50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEVudGl0aWVzOiBmdW5jdGlvbihkc3QsIGNhdGFsb2csIGRlZmF1bHRFbnRpdHkpXG5cdHtcblx0XHRpZighY2F0YWxvZylcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdEVudGl0eSA9IGRlZmF1bHRFbnRpdHkgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RFbnRpdGllcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYW4gZW50aXR5IC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBlbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZW50aXR5XCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGVudGl0eS50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0RW50aXR5LnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRGaWVsZHM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZW50aXR5LCBkZWZhdWx0RmllbGQpXG5cdHtcblx0XHRpZighY2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWVudGl0eVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RmllbGQgPSBkZWZhdWx0RmllbGQgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RGaWVsZHMgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgZmllbGQgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZpZWxkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGZpZWxkLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRGaWVsZC50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbnQ6IDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZWxlY3Q6IGZ1bmN0aW9uKGlkKVxuXHR7XG5cdFx0aWYoIShpZCA9IGlkLnRyaW0oKSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdO1xuXG5cdFx0JCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbChzZWFyY2hJbnRlcmZhY2UuZ3JvdXApO1xuXG5cdFx0JCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbChzZWFyY2hJbnRlcmZhY2UubmFtZSk7XG5cblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykucHJvcCgnY2hlY2tlZCcsIHNlYXJjaEludGVyZmFjZS5hcmNoaXZlZCk7XG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24oc2VhcmNoSW50ZXJmYWNlLm1vcmUpKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZyk7XG5cblx0XHRpZihzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZylcblx0XHR7XG5cdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpO1xuXG5cdFx0XHRpZihzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5KVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5LCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0UHJpbWFyeUZpZWxkKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBzZWFyY2hJbnRlcmZhY2UuanNvbi5jcml0ZXJpYSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JywgdGhpcy5mcmFnbWVudElucHV0LCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRkaWN0LmNyaXRlcmlhLmZvckVhY2goKGNyaXRlcmlvbikgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFM0FDQkJBQ19ENDUyXzVCOUFfNDkyNl9EOEZFRTM1NkNENjNfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZyk7XG5cblx0XHRcdFx0aWYoY3JpdGVyaW9uLmNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHkpO1xuXG5cdFx0XHRcdFx0aWYoY3JpdGVyaW9uLmVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5LCBjcml0ZXJpb24uZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5rZXlfZmllbGQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY250Kys7XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YWRkQ3JpdGVyaW9uOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkLCBjcml0ZXJpYSwgaXNLZXlWYWwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNudDogdGhpcy5jbnQsXG5cdFx0XHRjcml0ZXJpYTogY3JpdGVyaWEgfHwgW3t0eXBlOiBpc0tleVZhbCA/IDcgOiAwfV0sXG5cdFx0fTtcblxuXHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JywgdGhpcy5mcmFnbWVudElucHV0LCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRkaWN0LmNyaXRlcmlhLmZvckVhY2goKGNyaXRlcmlvbikgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFM0FDQkJBQ19ENDUyXzVCOUFfNDkyNl9EOEZFRTM1NkNENjNfJyArIHRoaXMuY250LCBjYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0E0RDJGRDcyX0ZGMEFfM0M4N19CMUNGXzRBMzEzMzFEM0Y4Ql8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihlbnRpdHkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNBNDVGMDIxNl82QzM1XzE5RjNfMkNFQ18xMDNBODUzNjkxNEZfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkKTtcblxuXHRcdFx0XHRcdFx0aWYoY3JpdGVyaW9uLnR5cGUgPiA2KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0Y4M0NFNEJCXzM4NTFfM0M0MF8yNDJFX0Y3Mzg0QzY4QTFBNV8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY250Kys7XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0anNvblRvRm9ybTE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHQkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5kaXN0aW5jdCk7XG5cblx0XHQvKiBUT0RPICovXG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1Ub0pzb24xOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0bW9yZS5kaXN0aW5jdCA9ICQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJyk7XG5cblx0XHQvKiBUT0RPICovXG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVkaXRPcHRpb25zMTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbChcblx0XHRcdHRoaXMuX2R1bXBKc29uKFxuXHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24xKFxuXHRcdFx0XHRcdHRoaXMuanNvblRvRm9ybTEoXG5cdFx0XHRcdFx0XHR0aGlzLl9wYXJzZUpzb24oXG5cdFx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cbiBcdFx0LyoqL1xuXG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoKSk7XG5cblx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5JykubW9kYWwoJ3Nob3cnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnaGlkZScpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0anNvblRvRm9ybTI6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRpZignaW5pdF92YWx1ZScgaW4gbW9yZVxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5pbml0X3ZhbHVlICE9PSBudWxsXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmluaXRfdmFsdWUgIT09ICdATlVMTCdcblx0XHQgKSB7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKG1vcmUuaW5pdF92YWx1ZS5qb2luKCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8pO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9XG5cblx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKG1vcmUubWluICE9PSBudWxsID8gbW9yZS5taW4gOiAnQE5VTEwnKTtcblx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykudmFsKG1vcmUubWF4ICE9PSBudWxsID8gbW9yZS5tYXggOiAnQE5VTEwnKTtcblx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKG1vcmUub2ZmICE9PSBudWxsID8gbW9yZS5vZmYgOiAnQE5VTEwnKTtcblx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKG1vcmUub24gICE9PSBudWxsID8gbW9yZS5vbiAgOiAnQE5VTEwnKTtcblxuXHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmF1dG9fb3Blbik7XG5cdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuaW5jbHVzaXZlKTtcblx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5zaW1wbGVfc2VhcmNoKTtcblxuXHRcdC8qLS0qLyBpZihtb3JlLm9yZGVyID09PSAnQVNDJykge1xuXHRcdFx0JCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2UgaWYobW9yZS5vcmRlciA9PT0gJ0RFU0MnKSB7XG5cdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjI6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRpZigkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGluaXRfdmFsdWUgPSAkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKCk7XG5cblx0XHRcdGlmKGluaXRfdmFsdWUgIT09ICdATlVMTCcpXG5cdFx0XHR7XG5cdFx0XHRcdG1vcmUuaW5pdF92YWx1ZSA9IGluaXRfdmFsdWUuc3BsaXQoJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWluID0gJCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbCgpO1xuXHRcdGlmKG1pbiAmJiBtaW4gIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWluID0gbWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5taW47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF4ID0gJCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbCgpO1xuXHRcdGlmKG1heCAmJiBtYXggIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWF4ID0gbWF4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5tYXg7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2ZmID0gJCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbCgpO1xuXHRcdGlmKG9mZiAmJiBvZmYgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub2ZmID0gb2ZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vZmY7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb24gPSAkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKCk7XG5cdFx0aWYob24gJiYgb24gIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub24gPSBvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub247XG5cdFx0fVxuXG5cdFx0bW9yZS5hdXRvX29wZW4gPSAkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdG1vcmUuaW5jbHVzaXZlID0gJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHRtb3JlLnNpbXBsZV9zZWFyY2ggPSAkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0LyotLSovIGlmKCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnQVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdERVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0ZGVsZXRlIG1vcmUub3JkZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250LCBpbnB1dFR5cGUpXG5cdHtcblx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjIoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMihcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgpKTtcblxuXHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0dGhpcy5jdXJyZW50SW5wdXRDbnQgPSBpbnB1dENudDtcblx0XHR0aGlzLmN1cnJlbnRJbnB1dFR5cGUgPSBpbnB1dFR5cGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPcHRpb25zMjogZnVuY3Rpb24oaW5wdXRDbnQpXG5cdHtcblx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0dGhpcy5jdXJyZW50SW5wdXRDbnQgPSAweEZGRkZGRkZGO1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IDB4RkZGRkZGRkY7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbGVhcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSA9PSBmYWxzZSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgnJyk7XG5cdFx0JCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgnJyk7XG5cdFx0JCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnZhbCgnJyk7XG5cblx0XHQkKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJykudmFsKCcnKTtcblx0XHQkKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJykudmFsKCcnKTtcblx0XHQkKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJykudmFsKCcnKTtcblxuXHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5lbXB0eSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVtb3ZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2F2ZTogZnVuY3Rpb24oY2xvbmUpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRDYXRhbG9nID0gdGhpcy5fdHJpbSgkKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRFbnRpdHkgPSB0aGlzLl90cmltKCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdFByaW1hcnlGaWVsZCA9IHRoaXMuX3RyaW0oJCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgpKTtcblx0XHRjb25zdCBhcmNoaXZlZCA9ICQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCc7XG5cdFx0Y29uc3QgbW9yZSA9ICQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpO1xuXG5cdFx0Y29uc3QgZGVmYXVsdENBVEFMT0cgPSB0aGlzLl90cmltKGNsb25lID8gd2luZG93LnByb21wdCgnTmV3IGRlZmF1bHQgY2F0YWxvZycsIGRlZmF1bHRDYXRhbG9nKSA6IGRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKCFncm91cFxuXHRcdCAgIHx8XG5cdFx0ICAgIW5hbWVcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRDQVRBTE9HXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdEVudGl0eVxuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRQcmltYXJ5RmllbGRcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGtleXMgPSBbXTtcblx0XHRjb25zdCBjcml0ZXJpYSA9IHt9O1xuXG5cdFx0JCgnI0ZFQzM2MEZBX0VDMURfOTBEQ19GRkQ1XzhBNDk4Q0Y2MDMwNScpLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0ubmFtZS5zcGxpdCgnOjonKTtcblxuXHRcdFx0aWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBrZXkxID0gcGFydHNbMV07XG5cdFx0XHRcdGNvbnN0IGtleTIgPSBwYXJ0c1swXTtcblxuXHRcdFx0XHRpZighKGtleTEgaW4gY3JpdGVyaWEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleTEpO1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiovIGlmKGtleTIgPT09ICd0eXBlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gcGFyc2VJbnQoaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihrZXkyID09PSAnbW9yZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHRoaXMuX3BhcnNlSnNvbihpdGVtLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IChjbG9uZSAmJiBrZXkyICA9PSAnY2F0YWxvZycgJiYgaXRlbS52YWx1ZSA9PT0gZGVmYXVsdENhdGFsb2cpID8gZGVmYXVsdENBVEFMT0dcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoaXRlbS52YWx1ZSkpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgTU9SRTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNT1JFID0gSlNPTi5wYXJzZShtb3JlKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0TU9SRSA9IHsvKi0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QganNvbiA9IHtcblx0XHRcdGRlZmF1bHRDYXRhbG9nOiBkZWZhdWx0Q0FUQUxPRyxcblx0XHRcdGRlZmF1bHRFbnRpdHk6IGRlZmF1bHRFbnRpdHksXG5cdFx0XHRkZWZhdWx0UHJpbWFyeUZpZWxkOiBkZWZhdWx0UHJpbWFyeUZpZWxkLFxuXHRcdFx0bW9yZTogTU9SRSxcblx0XHRcdGNyaXRlcmlhOiBrZXlzLm1hcChrZXkgPT4gY3JpdGVyaWFba2V5XSksXG5cdFx0fTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWtleUZpZWxkcz1cImdyb3VwwqNuYW1lXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsnXCInKS5kb25lKCgvKi0tLS0tLS0tLSovKSA9PiB7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkRWxlbWVudCAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAtZmllbGRzPVwiZ3JvdXDCo25hbWXCo2pzb27Co2FyY2hpdmVkXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoanNvbikpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoYXJjaGl2ZWQpICsgJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnNlYXJjaE1vZGVsZXJBcHAgPSBuZXcgU2VhcmNoTW9kZWxlckFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
