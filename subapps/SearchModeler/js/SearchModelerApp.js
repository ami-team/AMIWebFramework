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
          $('#CFB6CA12_2D42_3111_3183_EC1006F7E039').sortable({
            start: function start(event, ui) {
              ui.item.startPos = ui.item.index();
            },
            update: function update(event, ui) {
              ui.item.stopPos = ui.item.index();
              console.log($('#CFB6CA12_2D42_3111_3183_EC1006F7E039 > div').eq(ui.item.startPos).attr('data-id'));
              console.log($('#CFB6CA12_2D42_3111_3183_EC1006F7E039 > div').eq(ui.item.stopPos).attr('data-id'));
            }
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJzdGFydCIsImV2ZW50IiwidWkiLCJpdGVtIiwic3RhcnRQb3MiLCJpbmRleCIsInVwZGF0ZSIsInN0b3BQb3MiLCJjb25zb2xlIiwibG9nIiwiZXEiLCJhdHRyIiwiZWRpdG9yMSIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsImVkaXRvcjIiLCJjbGljayIsImVkaXRPcHRpb25zMSIsImYxIiwibW9yZSIsIl9wYXJzZUpzb24iLCJnZXRWYWx1ZSIsImZvcm1Ub0pzb24xIiwic2V0VmFsdWUiLCJfZHVtcEpzb24iLCJjaGFuZ2UiLCJmMiIsImZvcm1Ub0pzb24yIiwia2V5dXAiLCJmMyIsInZhbCIsImxlbmd0aCIsImY0IiwiZnJhZ21lbnRJbnRlcmZhY2UiLCJmcmFnbWVudElucHV0Iiwic2VhcmNoSW50ZXJmYWNlcyIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25Mb2dpbiIsImh0bWwiLCJ0cmltIiwiZ2V0SW50ZXJmYWNlTGlzdCIsImdldENhdGFsb2dzIiwiX3RyaW0iLCJzIiwieCIsIkpTT04iLCJwYXJzZSIsImUiLCJzdHJpbmdpZnkiLCJkc3QiLCJsb2NrIiwiYW1pQ29tbWFuZCIsImV4ZWN1dGUiLCJyb3dzIiwianNwYXRoIiwiZGljdCIsImZvckVhY2giLCJyb3ciLCJpZCIsImdyb3VwIiwibmFtZSIsImpzb24iLCJhcmNoaXZlZCIsInNlYXJjaEludGVyZmFjZSIsInB1c2giLCJ1bmxvY2siLCJtZXNzYWdlIiwiZXJyb3IiLCJkZWZhdWx0Q2F0YWxvZyIsImVtcHR5IiwiY2F0YWxvZyIsInRvTG93ZXJDYXNlIiwidGV4dFRvSHRtbCIsImpvaW4iLCJwcm9taXNlIiwiZ2V0RW50aXRpZXMiLCJkZWZhdWx0RW50aXR5IiwidGV4dFRvU3RyaW5nIiwiZW50aXR5IiwiZ2V0RmllbGRzIiwiZGVmYXVsdEZpZWxkIiwiZmllbGQiLCJjbnQiLCJzZWxlY3QiLCJwcm9wIiwiZGVmYXVsdFByaW1hcnlGaWVsZCIsImNyaXRlcmlhIiwiY3JpdGVyaW9uIiwidHlwZSIsImtleV9maWVsZCIsImFkZENyaXRlcmlvbiIsImlzS2V5VmFsIiwiYXBwZW5kSFRNTCIsImpzb25Ub0Zvcm0xIiwiZGlzdGluY3QiLCJtb2RhbCIsInNldE9wdGlvbnMxIiwianNvblRvRm9ybTIiLCJjb25zdHJhaW50cyIsImluaXRfdmFsdWUiLCJtaW4iLCJtYXgiLCJvZmYiLCJhdXRvX29wZW4iLCJpbmNsdXNpdmUiLCJzaW1wbGVfc2VhcmNoIiwib3JkZXIiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwicGFydHMiLCJrZXkxIiwia2V5MiIsInBhcnNlSW50IiwidmFsdWUiLCJNT1JFIiwibWFwIiwia2V5IiwiY3JlYXRlQ29udHJvbCIsInNlYXJjaE1vZGVsZXJBcHAiLCJTZWFyY2hNb2RlbGVyQXBwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUVBQSxTQUFTLENBQUMsa0JBQUQsRUFBcUI7QUFDN0I7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENB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QixRQUFBLE1BQUksQ0FBQzFCLGdCQUFMLENBQXNCLHVDQUF0Qjs7QUFFQXZELFFBQUFBLFNBQVMsQ0FBQ2tGLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsT0FwQkQ7QUFxQkE7QUFFRDs7QUFDQTtBQUVEOztBQW4vQjZCLENBQXJCLENBQVQ7QUFzL0JBOztBQUNBOztBQUNBOztBQUVBb0UsZ0JBQWdCLEdBQUcsSUFBSUMsZ0JBQUosRUFBbkI7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2VhcmNoTW9kZWxlckFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9TZWFyY2hNb2RlbGVyQXBwLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2ludGVyZmFjZS50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9pbnB1dC50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2pzL2pxdWVyeS11aS5taW4uanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3MnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0LmpzJyxcblx0XHRcdFx0XSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jykuc29ydGFibGUoe1xuXHRcdFx0XHRcdFx0c3RhcnQ6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuXHRcdFx0XHRcdFx0XHR1aS5pdGVtLnN0YXJ0UG9zID0gdWkuaXRlbS5pbmRleCgpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHVwZGF0ZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG5cdFx0XHRcdFx0XHRcdHVpLml0ZW0uc3RvcFBvcyA9IHVpLml0ZW0uaW5kZXgoKTtcblxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5ID4gZGl2JykuZXEodWkuaXRlbS5zdGFydFBvcykuYXR0cignZGF0YS1pZCcpKVxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5ID4gZGl2JykuZXEodWkuaXRlbS5zdG9wUG9zKS5hdHRyKCdkYXRhLWlkJykpXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLnNvcnRhYmxlKCk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IxID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMSk7XG5cblx0XHRcdFx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5Jykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IxLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVkaXRvcjIgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJyksIHtcblx0XHRcdFx0XHRcdGxpbmVOdW1iZXJzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0XHRcdFx0XHRcdG1vZGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InLCBlZGl0b3IyKTtcblxuXHRcdFx0XHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVkaXRvcjIucmVmcmVzaCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0IxNzg2REU3X0JDRDZfRjMzNl9EODExXzlDQkI2RUNCNTgzRicpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0dGhpcy5lZGl0T3B0aW9uczEoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYxID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBtb3JlID0gdGhpcy5fcGFyc2VKc29uKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShtb3JlKTtcblxuXHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKG1vcmUpKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLmNoYW5nZShmMSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMiA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjIobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS5rZXl1cCAoZjIpO1xuXG5cdFx0XHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLmtleXVwIChmMik7XG5cblx0XHRcdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2Jykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykua2V5dXAgKGYyKTtcblxuXHRcdFx0XHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5jaGFuZ2UoZjIpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjMgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS5hdHRyKCdzaXplJywgJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpLmxlbmd0aCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS5rZXl1cChmMyk7XG5cblx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykudmFsKCcsJyk7XG5cblx0XHRcdFx0XHRmMygpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5hdHRyKCdzaXplJywgJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpLmxlbmd0aCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5rZXl1cChmNCk7XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCcsJyk7XG5cblx0XHRcdFx0XHRmNCgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLmZyYWdtZW50SW50ZXJmYWNlID0gZGF0YVsxXTtcblx0XHRcdFx0dGhpcy5mcmFnbWVudElucHV0ID0gZGF0YVsyXTtcblxuXHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXMgPSB7fTtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKCgpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdCgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCEkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5JykuaHRtbCgpLnRyaW0oKSlcblx0XHR7XG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90cmltOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYocykge1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnBhcnNlKHggfHwgJ3t9Jyk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IHsvKi0tLS0tLS0tLS0tLS0tLSovfTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXBKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh4IHx8IHt9LCBudWxsLCAyKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0cmVzdWx0ID0gLyotLS0tLS0tLS0qLyAne30nIC8qLS0tLS0tLS0tKi87XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKGRzdClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1NlYXJjaFF1ZXJ5IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zcWw9XCJTRUxFQ1QgYGlkYCwgYGdyb3VwYCwgYG5hbWVgLCBganNvbmAsIGBhcmNoaXZlZGAgRlJPTSBgcm91dGVyX3NlYXJjaF9pbnRlcmZhY2VgIE9SREVSIEJZIGBncm91cGAgQVNDLCBgbmFtZWAgQVNDXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHJvd3MgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpO1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRzZWFyY2hJbnRlcmZhY2VzOiBbXSxcblx0XHRcdH07XG5cblx0XHRcdHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgaWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGdyb3VwID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImdyb3VwXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBuYW1lID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm5hbWVcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGpzb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgYXJjaGl2ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYXJjaGl2ZWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB7XG5cdFx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0XHRncm91cDogZ3JvdXAsXG5cdFx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdFx0anNvbjogdGhpcy5fcGFyc2VKc29uKGpzb24pLFxuXHRcdFx0XHRcdFx0YXJjaGl2ZWQ6IChhcmNoaXZlZCAhPT0gJzAnKSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0ZGljdC5zZWFyY2hJbnRlcmZhY2VzLnB1c2goc2VhcmNoSW50ZXJmYWNlKTtcblxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF0gPSBzZWFyY2hJbnRlcmZhY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKGRzdCwgdGhpcy5mcmFnbWVudEludGVyZmFjZSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0Q2F0YWxvZ3M6IGZ1bmN0aW9uKGRzdCwgZGVmYXVsdENhdGFsb2cpXG5cdHtcblx0XHRkZWZhdWx0Q2F0YWxvZyA9IGRlZmF1bHRDYXRhbG9nIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0Q2F0YWxvZ3MnKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhIGNhdGFsb2cgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGNhdGFsb2cgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZXh0ZXJuYWxDYXRhbG9nXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdENhdGFsb2cudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRFbnRpdGllczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBkZWZhdWx0RW50aXR5KVxuXHR7XG5cdFx0aWYoIWNhdGFsb2cpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRFbnRpdHkgPSBkZWZhdWx0RW50aXR5IHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0RW50aXRpZXMgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGFuIGVudGl0eSAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZW50aXR5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImVudGl0eVwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihlbnRpdHkudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEVudGl0eS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RmllbGRzOiBmdW5jdGlvbihkc3QsIGNhdGFsb2csIGVudGl0eSwgZGVmYXVsdEZpZWxkKVxuXHR7XG5cdFx0aWYoIWNhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFlbnRpdHlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdEZpZWxkID0gZGVmYXVsdEZpZWxkIHx8ICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdCQoZHN0KS5lbXB0eSgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0RmllbGRzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhIGZpZWxkIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBmaWVsZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJmaWVsZFwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihmaWVsZC50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0RmllbGQudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y250OiAwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VsZWN0OiBmdW5jdGlvbihpZClcblx0e1xuXHRcdGlmKCEoaWQgPSBpZC50cmltKCkpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0gdGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXTtcblxuXHRcdCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoc2VhcmNoSW50ZXJmYWNlLmdyb3VwKTtcblxuXHRcdCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoc2VhcmNoSW50ZXJmYWNlLm5hbWUpO1xuXG5cdFx0JCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnLCBzZWFyY2hJbnRlcmZhY2UuYXJjaGl2ZWQpO1xuXG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKHNlYXJjaEludGVyZmFjZS5tb3JlKSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdldENhdGFsb2dzKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpO1xuXG5cdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5KTtcblxuXHRcdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSwgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdFByaW1hcnlGaWVsZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNudDogdGhpcy5jbnQsXG5cdFx0XHRjcml0ZXJpYTogc2VhcmNoSW50ZXJmYWNlLmpzb24uY3JpdGVyaWEsXG5cdFx0fTtcblxuXHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNyaXRlcmlvbi5jYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0E0RDJGRDcyX0ZGMEFfM0M4N19CMUNGXzRBMzEzMzFEM0Y4Ql8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGNyaXRlcmlvbi5lbnRpdHkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNBNDVGMDIxNl82QzM1XzE5RjNfMkNFQ18xMDNBODUzNjkxNEZfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmZpZWxkKTtcblxuXHRcdFx0XHRcdFx0aWYoY3JpdGVyaW9uLnR5cGUgPiA2KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0Y4M0NFNEJCXzM4NTFfM0M0MF8yNDJFX0Y3Mzg0QzY4QTFBNV8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5LCBjcml0ZXJpb24ua2V5X2ZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFkZENyaXRlcmlvbjogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZCwgY3JpdGVyaWEsIGlzS2V5VmFsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IGNyaXRlcmlhIHx8IFt7dHlwZTogaXNLZXlWYWwgPyA3IDogMH1dLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY2F0YWxvZyk7XG5cblx0XHRcdFx0aWYoY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHkpO1xuXG5cdFx0XHRcdFx0aWYoZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0xOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuZGlzdGluY3QpO1xuXG5cdFx0LyogVE9ETyAqL1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdG1vcmUuZGlzdGluY3QgPSAkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0LyogVE9ETyAqL1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0xKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPcHRpb25zMTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5JykubW9kYWwoJ2hpZGUnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJ2NvbnN0cmFpbnRzJyBpbiBtb3JlXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmNvbnN0cmFpbnRzICE9PSBudWxsXG5cdFx0ICkge1xuXHRcdFx0JCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbChtb3JlLmNvbnN0cmFpbnRzLmpvaW4oJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1JykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y5OTMxMDkxXzMxRERfQTk2MF8yQUQwX0MwODQxN0ZFODQ4NCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0aWYoJ2luaXRfdmFsdWUnIGluIG1vcmVcblx0XHQgICAmJlxuXHRcdCAgIG1vcmUuaW5pdF92YWx1ZSAhPT0gbnVsbFxuXHRcdCApIHtcblx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwobW9yZS5pbml0X3ZhbHVlLmpvaW4oJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbChtb3JlLm1pbiAhPT0gbnVsbCA/IG1vcmUubWluIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbChtb3JlLm1heCAhPT0gbnVsbCA/IG1vcmUubWF4IDogJ0BOVUxMJyk7XG5cdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbChtb3JlLm9mZiAhPT0gbnVsbCA/IG1vcmUub2ZmIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbChtb3JlLm9uICAhPT0gbnVsbCA/IG1vcmUub24gIDogJ0BOVUxMJyk7XG5cblx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5hdXRvX29wZW4pO1xuXHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmluY2x1c2l2ZSk7XG5cdFx0JCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuc2ltcGxlX3NlYXJjaCk7XG5cblx0XHQvKi0tKi8gaWYobW9yZS5vcmRlciA9PT0gJ0FTQycpIHtcblx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIGlmKG1vcmUub3JkZXIgPT09ICdERVNDJykge1xuXHRcdFx0JCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1Ub0pzb24yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJCgnI0Y5OTMxMDkxXzMxRERfQTk2MF8yQUQwX0MwODQxN0ZFODQ4NCcpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHRjb25zdCBjb25zdHJhaW50cyA9ICQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS52YWwoKTtcblxuXHRcdFx0aWYoY29uc3RyYWludHMudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJylcblx0XHRcdHtcblx0XHRcdFx0bW9yZS5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzLnNwbGl0KCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGRlbGV0ZSBtb3JlLmNvbnN0cmFpbnRzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG1vcmUuY29uc3RyYWludHM7XG5cdFx0fVxuXG5cdFx0aWYoJCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHRjb25zdCBpbml0X3ZhbHVlID0gJCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgpO1xuXG5cdFx0XHRpZihpbml0X3ZhbHVlLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpXG5cdFx0XHR7XG5cdFx0XHRcdG1vcmUuaW5pdF92YWx1ZSA9IGluaXRfdmFsdWUuc3BsaXQoJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWluID0gJCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbCgpO1xuXHRcdGlmKG1pbiAmJiBtaW4udG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5taW4gPSBtaW47XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm1pbjtcblx0XHR9XG5cblx0XHRjb25zdCBtYXggPSAkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykudmFsKCk7XG5cdFx0aWYobWF4ICYmIG1heC50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm1heCA9IG1heDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUubWF4O1xuXHRcdH1cblxuXHRcdGNvbnN0IG9mZiA9ICQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS52YWwoKTtcblx0XHRpZihvZmYgJiYgb2ZmLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub2ZmID0gb2ZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vZmY7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb24gPSAkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykudmFsKCk7XG5cdFx0aWYob24gJiYgb24udG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5vbiA9IG9uO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vbjtcblx0XHR9XG5cblx0XHRpZighJCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2Rpc2FibGVkJykpIHtcblx0XHRcdG1vcmUuICBhdXRvX29wZW4gICA9ICQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdjaGVja2VkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUuICBhdXRvX29wZW4gIDtcblx0XHR9XG5cblx0XHRpZighJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2Rpc2FibGVkJykpIHtcblx0XHRcdG1vcmUuICBpbmNsdXNpdmUgICA9ICQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdjaGVja2VkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUuICBpbmNsdXNpdmUgIDtcblx0XHR9XG5cblx0XHRpZighJCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2Rpc2FibGVkJykpIHtcblx0XHRcdG1vcmUuc2ltcGxlX3NlYXJjaCA9ICQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdjaGVja2VkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUuc2ltcGxlX3NlYXJjaDtcblx0XHR9XG5cblx0XHQvKi0tKi8gaWYoJCgnI0MxRjVENDNCXzAwMEVfRjg2N19BQkE1XzEzRUE1MTlGNTVDQScpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdBU0MnO1xuXHRcdH0gZWxzZSBpZigkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRtb3JlLm9yZGVyID0gJ0RFU0MnO1xuXHRcdH0gZWxzZSBpZigkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRkZWxldGUgbW9yZS5vcmRlcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVkaXRPcHRpb25zMjogZnVuY3Rpb24oaW5wdXRDbnQsIGlucHV0VHlwZSlcblx0e1xuXHRcdGlmKGlucHV0VHlwZSA9PT0gMiB8fCBpbnB1dFR5cGUgPT09IDMpIHtcblx0XHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdGlmKGlucHV0VHlwZSA9PT0gNCkge1xuXHRcdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjIoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMihcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgpKTtcblxuXHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0dGhpcy5jdXJyZW50SW5wdXRDbnQgPSBpbnB1dENudDtcblx0XHR0aGlzLmN1cnJlbnRJbnB1dFR5cGUgPSBpbnB1dFR5cGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPcHRpb25zMjogZnVuY3Rpb24oaW5wdXRDbnQpXG5cdHtcblx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0dGhpcy5jdXJyZW50SW5wdXRDbnQgPSAweEZGRkZGRkZGO1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IDB4RkZGRkZGRkY7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbGVhcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSA9PSBmYWxzZSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgnJyk7XG5cdFx0JCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgnJyk7XG5cdFx0JCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnZhbCgnJyk7XG5cblx0XHQkKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJykudmFsKCcnKTtcblx0XHQkKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJykudmFsKCcnKTtcblx0XHQkKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJykudmFsKCcnKTtcblxuXHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5lbXB0eSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVtb3ZlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSB0aGlzLl90cmltKCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoKSk7XG5cdFx0Y29uc3QgbmFtZSA9IHRoaXMuX3RyaW0oJCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgpKTtcblxuXHRcdGlmKCFncm91cFxuXHRcdCAgIHx8XG5cdFx0ICAgIW5hbWVcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWtleUZpZWxkcz1cImdyb3VwwqNuYW1lXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNhdmU6IGZ1bmN0aW9uKG1vZGUpIC8vIDA6IFNURCwgMTogQ0xPTkUsIDI6IFNIT1dcblx0e1xuXHRcdGlmKG1vZGUgIT09IDIpXG5cdFx0e1xuXHRcdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRDYXRhbG9nID0gdGhpcy5fdHJpbSgkKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRFbnRpdHkgPSB0aGlzLl90cmltKCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdFByaW1hcnlGaWVsZCA9IHRoaXMuX3RyaW0oJCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgpKTtcblx0XHRjb25zdCBhcmNoaXZlZCA9ICQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCc7XG5cdFx0Y29uc3QgbW9yZSA9ICQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpO1xuXG5cdFx0Y29uc3QgZGVmYXVsdENBVEFMT0cgPSB0aGlzLl90cmltKG1vZGUgPT09IDEgPyB3aW5kb3cucHJvbXB0KCdOZXcgZGVmYXVsdCBjYXRhbG9nJywgZGVmYXVsdENhdGFsb2cpIDogZGVmYXVsdENhdGFsb2cpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRDYXRhbG9nXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdENBVEFMT0dcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0RW50aXR5XG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdFByaW1hcnlGaWVsZFxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qga2V5cyA9IFtdO1xuXHRcdGNvbnN0IGNyaXRlcmlhID0ge307XG5cblx0XHQkKCcjRkVDMzYwRkFfRUMxRF85MERDX0ZGRDVfOEE0OThDRjYwMzA1Jykuc2VyaWFsaXplQXJyYXkoKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cblx0XHRcdGNvbnN0IHBhcnRzID0gaXRlbS5uYW1lLnNwbGl0KCc6OicpO1xuXG5cdFx0XHRpZihwYXJ0cy5sZW5ndGggPT09IDIpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGtleTEgPSBwYXJ0c1sxXTtcblx0XHRcdFx0Y29uc3Qga2V5MiA9IHBhcnRzWzBdO1xuXG5cdFx0XHRcdGlmKCEoa2V5MSBpbiBjcml0ZXJpYSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRrZXlzLnB1c2goa2V5MSk7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV0gPSB7fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qKi8gaWYoa2V5MiA9PT0gJ3R5cGUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSBwYXJzZUludChpdGVtLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKGtleTIgPT09ICdtb3JlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gdGhpcy5fcGFyc2VKc29uKGl0ZW0udmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gKG1vZGUgPT09IDEgJiYga2V5MiA9PT0gJ2NhdGFsb2cnICYmIGl0ZW0udmFsdWUgPT09IGRlZmF1bHRDYXRhbG9nKSA/IGRlZmF1bHRDQVRBTE9HXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKChpdGVtLnZhbHVlKSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBNT1JFO1xuXG5cdFx0dHJ5IHtcblx0XHRcdE1PUkUgPSBKU09OLnBhcnNlKG1vcmUpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRNT1JFID0gey8qLS0tLS0tLS0tLSovfTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBqc29uID0ge1xuXHRcdFx0ZGVmYXVsdENhdGFsb2c6IGRlZmF1bHRDQVRBTE9HLFxuXHRcdFx0ZGVmYXVsdEVudGl0eTogZGVmYXVsdEVudGl0eSxcblx0XHRcdGRlZmF1bHRQcmltYXJ5RmllbGQ6IGRlZmF1bHRQcmltYXJ5RmllbGQsXG5cdFx0XHRtb3JlOiBNT1JFLFxuXHRcdFx0Y3JpdGVyaWE6IGtleXMubWFwKGtleSA9PiBjcml0ZXJpYVtrZXldKSxcblx0XHR9O1xuXG5cdFx0aWYobW9kZSA9PT0gMilcblx0XHR7XG5cdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbChudWxsLCBudWxsLCAndGV4dEJveCcsIFt0aGlzLl9kdW1wSnNvbihqc29uKV0sIHt9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKC8qLS0tLS0tLS0tKi8pID0+IHtcblxuXHRcdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0FkZEVsZW1lbnQgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWZpZWxkcz1cImdyb3VwwqNuYW1lwqNqc29uwqNhcmNoaXZlZFwiIC12YWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KGpzb24pKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGFyY2hpdmVkKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBHTE9CQUwgSU5TVEFOQ0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5zZWFyY2hNb2RlbGVyQXBwID0gbmV3IFNlYXJjaE1vZGVsZXJBcHAoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
