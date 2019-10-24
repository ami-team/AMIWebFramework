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
            start: function start(e, ui) {
              /*----------------------------------------------------------------------------------------*/
              ui.item.ranks1 = {};
              $('#CFB6CA12_2D42_3111_3183_EC1006F7E039 > div[data-id]').each(function (indx, item) {
                ui.item.ranks1[$(item).attr('data-id')] = indx;
              });
              /*----------------------------------------------------------------------------------------*/
            },
            update: function update(e, ui) {
              /*----------------------------------------------------------------------------------------*/
              ui.item.ranks2 = {};
              $('#CFB6CA12_2D42_3111_3183_EC1006F7E039 > div[data-id]').each(function (indx, item) {
                ui.item.ranks2[$(item).attr('data-id')] = indx;
              });
              /*----------------------------------------------------------------------------------------*/

              _this.swap(ui.item.ranks1, ui.item.ranks2);
              /*----------------------------------------------------------------------------------------*/

            }
          });
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
    amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="SELECT `id`, `group`, `name`, `rank`, `json`, `archived` FROM `router_search_interface` ORDER BY `rank` ASC, `group` ASC, `name` ASC"').done(function (data) {
      var rows = amiWebApp.jspath('..row', data);
      var dict = {
        searchInterfaces: []
      };
      rows.forEach(function (row) {
        var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
        var group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
        var name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
        var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', row)[0] || '';
        var json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';
        var archived = amiWebApp.jspath('..field{.@name==="archived"}.$', row)[0] || '';

        try {
          var searchInterface = {
            id: id,
            group: group,
            name: name,
            rank:
            /*-*/
            parseInt(rank),
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
  swap: function swap(ranks1, ranks2) {
    for (var id in this.searchInterfaces) {
      if (ranks1[id] !== ranks2[id]) {
        /*----------------------------------------------------------------------------------------------------*/
        var command = 'UpdateElements -catalog="self" -entity="router_search_interface" -fields="rank" -values="' + ranks2[id] + '" -keyFields="id" -keyValues="' + id + '"';
        /*----------------------------------------------------------------------------------------------------*/

        amiWebApp.lock();
        amiCommand.execute(command).done(function () {
          amiWebApp.unlock();
        }).fail(function (data, message) {
          amiWebApp.error(message, true);
        });
        /*----------------------------------------------------------------------------------------------------*/
      }
    }
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
    $('#E7C7B106_876A_4B8A_2CE2_084A9E89BF3E').val(searchInterface.rank);
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
    return more;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  formToJson1: function formToJson1(more) {
    more.distinct = $('#CECEF559_7DC7_1AE7_AE83_81C19AFB8A06').prop('checked');
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
    $('#E7C7B106_876A_4B8A_2CE2_084A9E89BF3E').val('0');
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

    var rank = this._trim($('#E7C7B106_876A_4B8A_2CE2_084A9E89BF3E').val());

    var defaultCatalog = this._trim($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3').val());

    var defaultEntity = this._trim($('#F71D1452_8613_5FB5_27D3_C1540573F450').val());

    var defaultPrimaryField = this._trim($('#BB89A473_0842_CB8F_E146_A6CCD8D3F15E').val());

    var archived = $('#A2C54F33_AC45_3553_86D6_4A479D10CD54').prop('checked') ? '1' : '0';
    var more = $('#A3D83B42_4FBF_5DAE_6A38_12F1F53493B5').data('editor').getValue();

    var defaultCATALOG = this._trim(mode === 1 ? window.prompt('New default catalog', defaultCatalog) : defaultCatalog);

    if (!group || !name || !rank || !defaultCatalog || !defaultCATALOG || !defaultEntity || !defaultPrimaryField) {
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
        if (!criteria[key].name) criteria[key].name = criteria[key].field;
        return criteria[key];
      })
    };
    /*------------------------------------------------------------------------------------------------------------*/

    if (mode === 2) {
      amiWebApp.createControl(null, null, 'textBox', [this._dumpJson(json)], {}).done(function () {
        amiWebApp.unlock();
      });
    } else {
      amiCommand.execute('RemoveElements -catalog="self" -entity="router_search_interface" -separator="£" -keyFields="group£name" -keyValues="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '"').done(function ()
      /*---------*/
      {
        amiCommand.execute('AddElement -catalog="self" -entity="router_search_interface" -separator="£" -fields="group£name£rank£json£archived" -values="' + amiWebApp.textToString(group) + '£' + amiWebApp.textToString(name) + '£' + amiWebApp.textToString(rank) + '£' + amiWebApp.textToString(JSON.stringify(json)) + '£' + amiWebApp.textToString(archived) + '"').done(function (data, message) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJzdGFydCIsImUiLCJ1aSIsIml0ZW0iLCJyYW5rczEiLCJlYWNoIiwiaW5keCIsImF0dHIiLCJ1cGRhdGUiLCJyYW5rczIiLCJzd2FwIiwiZWRpdG9yMSIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsImVkaXRvcjIiLCJjbGljayIsImVkaXRPcHRpb25zMSIsImYxIiwibW9yZSIsIl9wYXJzZUpzb24iLCJnZXRWYWx1ZSIsImZvcm1Ub0pzb24xIiwic2V0VmFsdWUiLCJfZHVtcEpzb24iLCJjaGFuZ2UiLCJmMiIsImZvcm1Ub0pzb24yIiwia2V5dXAiLCJmMyIsInZhbCIsImxlbmd0aCIsImY0IiwiZnJhZ21lbnRJbnRlcmZhY2UiLCJmcmFnbWVudElucHV0Iiwic2VhcmNoSW50ZXJmYWNlcyIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25Mb2dpbiIsImh0bWwiLCJ0cmltIiwiZ2V0SW50ZXJmYWNlTGlzdCIsImdldENhdGFsb2dzIiwiX3RyaW0iLCJzIiwieCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImRzdCIsImxvY2siLCJhbWlDb21tYW5kIiwiZXhlY3V0ZSIsInJvd3MiLCJqc3BhdGgiLCJkaWN0IiwiZm9yRWFjaCIsInJvdyIsImlkIiwiZ3JvdXAiLCJuYW1lIiwicmFuayIsImpzb24iLCJhcmNoaXZlZCIsInNlYXJjaEludGVyZmFjZSIsInBhcnNlSW50IiwicHVzaCIsInVubG9jayIsIm1lc3NhZ2UiLCJlcnJvciIsImNvbW1hbmQiLCJkZWZhdWx0Q2F0YWxvZyIsImVtcHR5IiwiY2F0YWxvZyIsInRvTG93ZXJDYXNlIiwidGV4dFRvSHRtbCIsImpvaW4iLCJwcm9taXNlIiwiZ2V0RW50aXRpZXMiLCJkZWZhdWx0RW50aXR5IiwidGV4dFRvU3RyaW5nIiwiZW50aXR5IiwiZ2V0RmllbGRzIiwiZGVmYXVsdEZpZWxkIiwiZmllbGQiLCJjbnQiLCJzZWxlY3QiLCJwcm9wIiwiZGVmYXVsdFByaW1hcnlGaWVsZCIsImNyaXRlcmlhIiwiY3JpdGVyaW9uIiwidHlwZSIsImtleV9maWVsZCIsImFkZENyaXRlcmlvbiIsImlzS2V5VmFsIiwiYXBwZW5kSFRNTCIsImpzb25Ub0Zvcm0xIiwiZGlzdGluY3QiLCJtb2RhbCIsInNldE9wdGlvbnMxIiwianNvblRvRm9ybTIiLCJjb25zdHJhaW50cyIsImluaXRfdmFsdWUiLCJtaW4iLCJtYXgiLCJvZmYiLCJhdXRvX29wZW4iLCJpbmNsdXNpdmUiLCJzaW1wbGVfc2VhcmNoIiwib3JkZXIiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwicGFydHMiLCJrZXkxIiwia2V5MiIsInZhbHVlIiwiTU9SRSIsIm1hcCIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFELEVBQXFCO0FBQzdCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhlOztBQUs3QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxRQUFNQyxNQUFNLEdBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmO0FBRUFDLElBQUFBLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUN2QixrREFEdUIsRUFFdkIsMkNBRnVCLEVBR3ZCLHVDQUh1QixDQUF4QixFQUlHQyxJQUpILENBSVEsVUFBQ0MsSUFBRCxFQUFVO0FBRWpCSCxNQUFBQSxTQUFTLENBQUNJLFdBQVYsQ0FBc0IsbUJBQXRCLEVBQTJDRCxJQUFJLENBQUMsQ0FBRCxDQUEvQyxFQUFvREQsSUFBcEQsQ0FBeUQsWUFBTTtBQUU5RDtBQUVBRixRQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDdkIsMkNBRHVCLEVBRXZCLDRDQUZ1QixFQUd2QiwyQ0FIdUIsRUFJdkIscURBSnVCLEVBS3ZCLHVEQUx1QixDQUF4QixFQU1HQyxJQU5ILENBTVEsWUFBTTtBQUViO0FBRUFKLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDTyxRQUEzQyxDQUFvRDtBQUNuREMsWUFBQUEsS0FBSyxFQUFFLGVBQUNDLENBQUQsRUFBSUMsRUFBSixFQUFXO0FBRWpCO0FBRUFBLGNBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRQyxNQUFSLEdBQWlCLEVBQWpCO0FBRUFaLGNBQUFBLENBQUMsQ0FBQyxzREFBRCxDQUFELENBQTBEYSxJQUExRCxDQUErRCxVQUFDQyxJQUFELEVBQU9ILElBQVAsRUFBZ0I7QUFFOUVELGdCQUFBQSxFQUFFLENBQUNDLElBQUgsQ0FBUUMsTUFBUixDQUFlWixDQUFDLENBQUNXLElBQUQsQ0FBRCxDQUFRSSxJQUFSLENBQWEsU0FBYixDQUFmLElBQTBDRCxJQUExQztBQUNBLGVBSEQ7QUFLQTtBQUNBLGFBYmtEO0FBY25ERSxZQUFBQSxNQUFNLEVBQUUsZ0JBQUNQLENBQUQsRUFBSUMsRUFBSixFQUFXO0FBRWxCO0FBRUFBLGNBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRTSxNQUFSLEdBQWlCLEVBQWpCO0FBRUFqQixjQUFBQSxDQUFDLENBQUMsc0RBQUQsQ0FBRCxDQUEwRGEsSUFBMUQsQ0FBK0QsVUFBQ0MsSUFBRCxFQUFPSCxJQUFQLEVBQWdCO0FBRTlFRCxnQkFBQUEsRUFBRSxDQUFDQyxJQUFILENBQVFNLE1BQVIsQ0FBZWpCLENBQUMsQ0FBQ1csSUFBRCxDQUFELENBQVFJLElBQVIsQ0FBYSxTQUFiLENBQWYsSUFBMENELElBQTFDO0FBQ0EsZUFIRDtBQUtBOztBQUVBLGNBQUEsS0FBSSxDQUFDSSxJQUFMLENBQ0NSLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRQyxNQURULEVBRUNGLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRTSxNQUZUO0FBS0E7O0FBQ0E7QUFqQ2tELFdBQXBEO0FBb0NBOztBQUVBakIsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNPLFFBQTNDO0FBRUE7O0FBRUEsY0FBTVksT0FBTyxHQUFHQyxVQUFVLENBQUNDLFlBQVgsQ0FBd0JDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixzQ0FBeEIsQ0FBeEIsRUFBeUY7QUFDeEdDLFlBQUFBLFdBQVcsRUFBRSxJQUQyRjtBQUV4R0MsWUFBQUEsYUFBYSxFQUFFLElBRnlGO0FBR3hHQyxZQUFBQSxJQUFJLEVBQUU7QUFIa0csV0FBekYsQ0FBaEI7QUFNQTFCLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDSyxJQUEzQyxDQUFnRCxRQUFoRCxFQUEwRGMsT0FBMUQ7QUFFQW5CLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMkIsRUFBM0MsQ0FBOEMsZ0JBQTlDLEVBQWdFLFlBQU07QUFFckVSLFlBQUFBLE9BQU8sQ0FBQ1MsT0FBUjtBQUNBLFdBSEQ7QUFLQTs7QUFFQSxjQUFNQyxPQUFPLEdBQUdULFVBQVUsQ0FBQ0MsWUFBWCxDQUF3QkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLHNDQUF4QixDQUF4QixFQUF5RjtBQUN4R0MsWUFBQUEsV0FBVyxFQUFFLElBRDJGO0FBRXhHQyxZQUFBQSxhQUFhLEVBQUUsSUFGeUY7QUFHeEdDLFlBQUFBLElBQUksRUFBRTtBQUhrRyxXQUF6RixDQUFoQjtBQU1BMUIsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNLLElBQTNDLENBQWdELFFBQWhELEVBQTBEd0IsT0FBMUQ7QUFFQTdCLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMkIsRUFBM0MsQ0FBOEMsZ0JBQTlDLEVBQWdFLFlBQU07QUFFckVFLFlBQUFBLE9BQU8sQ0FBQ0QsT0FBUjtBQUNBLFdBSEQ7QUFLQTs7QUFFQTVCLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDOEIsS0FBM0MsQ0FBaUQsWUFBTTtBQUV0RCxZQUFBLEtBQUksQ0FBQ0MsWUFBTDtBQUNBLFdBSEQ7QUFLQTs7QUFFQSxjQUFNQyxFQUFFLEdBQUcsU0FBTEEsRUFBSyxHQUFNO0FBRWhCLGdCQUFNQyxJQUFJLEdBQUcsS0FBSSxDQUFDQyxVQUFMLENBQWdCbEMsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNLLElBQTNDLENBQWdELFFBQWhELEVBQTBEOEIsUUFBMUQsRUFBaEIsQ0FBYjs7QUFFQSxZQUFBLEtBQUksQ0FBQ0MsV0FBTCxDQUFpQkgsSUFBakI7O0FBRUFqQyxZQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ0ssSUFBM0MsQ0FBZ0QsUUFBaEQsRUFBMERnQyxRQUExRCxDQUFtRSxLQUFJLENBQUNDLFNBQUwsQ0FBZUwsSUFBZixDQUFuRTtBQUNBLFdBUEQ7O0FBU0FqQyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VDLE1BQTNDLENBQWtEUCxFQUFsRDtBQUVBOztBQUVBLGNBQU1RLEVBQUUsR0FBRyxTQUFMQSxFQUFLLEdBQU07QUFFaEIsZ0JBQU1QLElBQUksR0FBRyxLQUFJLENBQUNDLFVBQUwsQ0FBZ0JsQyxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ0ssSUFBM0MsQ0FBZ0QsUUFBaEQsRUFBMEQ4QixRQUExRCxFQUFoQixDQUFiOztBQUVBLFlBQUEsS0FBSSxDQUFDTSxXQUFMLENBQWlCUixJQUFqQjs7QUFFQWpDLFlBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDSyxJQUEzQyxDQUFnRCxRQUFoRCxFQUEwRGdDLFFBQTFELENBQW1FLEtBQUksQ0FBQ0MsU0FBTCxDQUFlTCxJQUFmLENBQW5FO0FBQ0EsV0FQRDs7QUFTQWpDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDdUMsTUFBM0MsQ0FBa0RDLEVBQWxEO0FBQ0F4QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzBDLEtBQTNDLENBQWtERixFQUFsRDtBQUVBeEMsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkN1QyxNQUEzQyxDQUFrREMsRUFBbEQ7QUFDQXhDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMEMsS0FBM0MsQ0FBa0RGLEVBQWxEO0FBRUF4QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzBDLEtBQTNDLENBQWtERixFQUFsRDtBQUNBeEMsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkMwQyxLQUEzQyxDQUFrREYsRUFBbEQ7QUFDQXhDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMEMsS0FBM0MsQ0FBa0RGLEVBQWxEO0FBQ0F4QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzBDLEtBQTNDLENBQWtERixFQUFsRDtBQUVBeEMsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkN1QyxNQUEzQyxDQUFrREMsRUFBbEQ7QUFDQXhDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDdUMsTUFBM0MsQ0FBa0RDLEVBQWxEO0FBQ0F4QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VDLE1BQTNDLENBQWtEQyxFQUFsRDtBQUNBeEMsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkN1QyxNQUEzQyxDQUFrREMsRUFBbEQ7QUFDQXhDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDdUMsTUFBM0MsQ0FBa0RDLEVBQWxEO0FBQ0F4QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VDLE1BQTNDLENBQWtEQyxFQUFsRDtBQUVBOztBQUVBLGNBQU1HLEVBQUUsR0FBRyxTQUFMQSxFQUFLLEdBQU07QUFFaEIzQyxZQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ2UsSUFBM0MsQ0FBZ0QsTUFBaEQsRUFBd0RmLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsR0FBaURDLE1BQXpHO0FBQ0EsV0FIRDs7QUFLQTdDLFVBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMEMsS0FBM0MsQ0FBaURDLEVBQWpEO0FBRUEzQyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEdBQS9DO0FBRUFELFVBQUFBLEVBQUU7QUFFRjs7QUFFQSxjQUFNRyxFQUFFLEdBQUcsU0FBTEEsRUFBSyxHQUFNO0FBRWhCOUMsWUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNlLElBQTNDLENBQWdELE1BQWhELEVBQXdEZixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEdBQWlEQyxNQUF6RztBQUNBLFdBSEQ7O0FBS0E3QyxVQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzBDLEtBQTNDLENBQWlESSxFQUFqRDtBQUVBOUMsVUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxDQUErQyxHQUEvQztBQUVBRSxVQUFBQSxFQUFFO0FBRUY7QUFDQSxTQTVKRDtBQThKQSxRQUFBLEtBQUksQ0FBQ0MsaUJBQUwsR0FBeUIxQyxJQUFJLENBQUMsQ0FBRCxDQUE3QjtBQUNBLFFBQUEsS0FBSSxDQUFDMkMsYUFBTCxHQUFxQjNDLElBQUksQ0FBQyxDQUFELENBQXpCO0FBRUEsUUFBQSxLQUFJLENBQUM0QyxnQkFBTCxHQUF3QixFQUF4QjtBQUVBbEQsUUFBQUEsTUFBTSxDQUFDbUQsT0FBUDtBQUNBLE9BeEtEO0FBMEtBLEtBaExELEVBZ0xHQyxJQWhMSCxDQWdMUSxZQUFNO0FBRWJwRCxNQUFBQSxNQUFNLENBQUNxRCxNQUFQO0FBQ0EsS0FuTEQ7QUFxTEEsV0FBT3JELE1BQVA7QUFDQSxHQWpNNEI7O0FBbU03QjtBQUVBc0QsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQ0MsUUFBRyxDQUFDckQsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRCxJQUEzQyxHQUFrREMsSUFBbEQsRUFBSixFQUNBO0FBQ0MsV0FBS0MsZ0JBQUwsQ0FBc0IsdUNBQXRCO0FBRUEsV0FBS0MsV0FBTCxDQUFpQix1Q0FBakI7QUFDQTtBQUNELEdBN000Qjs7QUErTTdCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxDQUFULEVBQ1A7QUFDQyxRQUFHQSxDQUFILEVBQU07QUFDTCxhQUFPQSxDQUFDLENBQUNKLElBQUYsRUFBUDtBQUNBLEtBRkQsTUFHSztBQUNKLGFBQU8sRUFBUDtBQUNBO0FBQ0QsR0F6TjRCOztBQTJON0I7QUFFQXJCLEVBQUFBLFVBQVUsRUFBRSxvQkFBUzBCLENBQVQsRUFDWjtBQUNDLFFBQUk3RCxNQUFKOztBQUVBLFFBQUk7QUFDSEEsTUFBQUEsTUFBTSxHQUFHOEQsSUFBSSxDQUFDQyxLQUFMLENBQVdGLENBQUMsSUFBSSxJQUFoQixDQUFUO0FBQ0EsS0FGRCxDQUdBLE9BQU1uRCxDQUFOLEVBQVM7QUFDUlYsTUFBQUEsTUFBTSxHQUFHO0FBQUM7QUFBRCxPQUFUO0FBQ0E7O0FBRUQsV0FBT0EsTUFBUDtBQUNBLEdBek80Qjs7QUEyTzdCO0FBRUF1QyxFQUFBQSxTQUFTLEVBQUUsbUJBQVNzQixDQUFULEVBQ1g7QUFDQyxRQUFJN0QsTUFBSjs7QUFFQSxRQUFJO0FBQ0hBLE1BQUFBLE1BQU0sR0FBRzhELElBQUksQ0FBQ0UsU0FBTCxDQUFlSCxDQUFDLElBQUksRUFBcEIsRUFBd0IsSUFBeEIsRUFBOEIsQ0FBOUIsQ0FBVDtBQUNBLEtBRkQsQ0FHQSxPQUFNbkQsQ0FBTixFQUFTO0FBQ1JWLE1BQUFBLE1BQU07QUFBRztBQUFjO0FBQUs7QUFBNUI7QUFDQTs7QUFFRCxXQUFPQSxNQUFQO0FBQ0EsR0F6UDRCOztBQTJQN0I7QUFFQXlELEVBQUFBLGdCQUFnQixFQUFFLDBCQUFTUSxHQUFULEVBQ2xCO0FBQUE7O0FBQ0M5RCxJQUFBQSxTQUFTLENBQUMrRCxJQUFWO0FBRUFDLElBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQiwyTUFBbkIsRUFBZ08vRCxJQUFoTyxDQUFxTyxVQUFDQyxJQUFELEVBQVU7QUFFOU8sVUFBTStELElBQUksR0FBR2xFLFNBQVMsQ0FBQ21FLE1BQVYsQ0FBaUIsT0FBakIsRUFBMEJoRSxJQUExQixDQUFiO0FBRUEsVUFBTWlFLElBQUksR0FBRztBQUNackIsUUFBQUEsZ0JBQWdCLEVBQUU7QUFETixPQUFiO0FBSUFtQixNQUFBQSxJQUFJLENBQUNHLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQVM7QUFFckIsWUFBTUMsRUFBRSxHQUFHdkUsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiwwQkFBakIsRUFBNkNHLEdBQTdDLEVBQWtELENBQWxELEtBQXdELEVBQW5FO0FBQ0EsWUFBTUUsS0FBSyxHQUFHeEUsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiw2QkFBakIsRUFBZ0RHLEdBQWhELEVBQXFELENBQXJELEtBQTJELEVBQXpFO0FBQ0EsWUFBTUcsSUFBSSxHQUFHekUsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiw0QkFBakIsRUFBK0NHLEdBQS9DLEVBQW9ELENBQXBELEtBQTBELEVBQXZFO0FBQ0EsWUFBTUksSUFBSSxHQUFHMUUsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiw0QkFBakIsRUFBK0NHLEdBQS9DLEVBQW9ELENBQXBELEtBQTBELEVBQXZFO0FBQ0EsWUFBTUssSUFBSSxHQUFHM0UsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiw0QkFBakIsRUFBK0NHLEdBQS9DLEVBQW9ELENBQXBELEtBQTBELEVBQXZFO0FBQ0EsWUFBTU0sUUFBUSxHQUFHNUUsU0FBUyxDQUFDbUUsTUFBVixDQUFpQixnQ0FBakIsRUFBbURHLEdBQW5ELEVBQXdELENBQXhELEtBQThELEVBQS9FOztBQUVBLFlBQ0E7QUFDQyxjQUFNTyxlQUFlLEdBQUc7QUFDdkJOLFlBQUFBLEVBQUUsRUFBRUEsRUFEbUI7QUFFdkJDLFlBQUFBLEtBQUssRUFBRUEsS0FGZ0I7QUFHdkJDLFlBQUFBLElBQUksRUFBRUEsSUFIaUI7QUFJdkJDLFlBQUFBLElBQUk7QUFBRTtBQUFNSSxZQUFBQSxRQUFRLENBQUNKLElBQUQsQ0FKRztBQUt2QkMsWUFBQUEsSUFBSSxFQUFFLE1BQUksQ0FBQzNDLFVBQUwsQ0FBZ0IyQyxJQUFoQixDQUxpQjtBQU12QkMsWUFBQUEsUUFBUSxFQUFHQSxRQUFRLEtBQUs7QUFORCxXQUF4QjtBQVNBUixVQUFBQSxJQUFJLENBQUNyQixnQkFBTCxDQUFzQmdDLElBQXRCLENBQTJCRixlQUEzQjtBQUVBLFVBQUEsTUFBSSxDQUFDOUIsZ0JBQUwsQ0FBc0J3QixFQUF0QixJQUE0Qk0sZUFBNUI7QUFDQSxTQWRELENBZUEsT0FBTXRFLENBQU4sRUFDQTtBQUNDO0FBQ0E7QUFDRCxPQTVCRDtBQThCQVAsTUFBQUEsU0FBUyxDQUFDSSxXQUFWLENBQXNCMEQsR0FBdEIsRUFBMkIsTUFBSSxDQUFDakIsaUJBQWhDLEVBQW1EO0FBQUN1QixRQUFBQSxJQUFJLEVBQUVBO0FBQVAsT0FBbkQsRUFBaUVsRSxJQUFqRSxDQUFzRSxZQUFNO0FBRTNFRixRQUFBQSxTQUFTLENBQUNnRixNQUFWO0FBQ0EsT0FIRDtBQUtBLEtBM0NELEVBMkNHL0IsSUEzQ0gsQ0EyQ1EsVUFBQzlDLElBQUQsRUFBTzhFLE9BQVAsRUFBbUI7QUFFMUJqRixNQUFBQSxTQUFTLENBQUNrRixLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLEtBOUNEO0FBK0NBLEdBaFQ0Qjs7QUFrVDdCO0FBRUFqRSxFQUFBQSxJQUFJLEVBQUUsY0FBU04sTUFBVCxFQUFpQkssTUFBakIsRUFDTjtBQUNDLFNBQUksSUFBTXdELEVBQVYsSUFBZ0IsS0FBS3hCLGdCQUFyQixFQUNBO0FBQ0MsVUFBR3JDLE1BQU0sQ0FBQzZELEVBQUQsQ0FBTixLQUFleEQsTUFBTSxDQUFDd0QsRUFBRCxDQUF4QixFQUNBO0FBQ0M7QUFFQSxZQUFNWSxPQUFPLEdBQUcsOEZBQThGcEUsTUFBTSxDQUFDd0QsRUFBRCxDQUFwRyxHQUEyRyxnQ0FBM0csR0FBOElBLEVBQTlJLEdBQW1KLEdBQW5LO0FBRUE7O0FBRUF2RSxRQUFBQSxTQUFTLENBQUMrRCxJQUFWO0FBRUFDLFFBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQmtCLE9BQW5CLEVBQTRCakYsSUFBNUIsQ0FBaUMsWUFBTTtBQUV0Q0YsVUFBQUEsU0FBUyxDQUFDZ0YsTUFBVjtBQUVBLFNBSkQsRUFJRy9CLElBSkgsQ0FJUSxVQUFDOUMsSUFBRCxFQUFPOEUsT0FBUCxFQUFtQjtBQUUxQmpGLFVBQUFBLFNBQVMsQ0FBQ2tGLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsU0FQRDtBQVNBO0FBQ0E7QUFDRDtBQUNELEdBOVU0Qjs7QUFnVjdCO0FBRUExQixFQUFBQSxXQUFXLEVBQUUscUJBQVNPLEdBQVQsRUFBY3NCLGNBQWQsRUFDYjtBQUNDQSxJQUFBQSxjQUFjLEdBQUdBLGNBQWMsSUFBSSxFQUFuQztBQUVBOztBQUVBcEYsSUFBQUEsU0FBUyxDQUFDK0QsSUFBVjtBQUVBakUsSUFBQUEsQ0FBQyxDQUFDZ0UsR0FBRCxDQUFELENBQU91QixLQUFQO0FBRUFyQixJQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIsY0FBbkIsRUFBbUMvRCxJQUFuQyxDQUF3QyxVQUFDQyxJQUFELEVBQVU7QUFFakQsVUFBTXNELENBQUMsR0FBRyxDQUNULHlFQURTLENBQVY7QUFJQXpELE1BQUFBLFNBQVMsQ0FBQ21FLE1BQVYsQ0FBaUIsT0FBakIsRUFBMEJoRSxJQUExQixFQUFnQ2tFLE9BQWhDLENBQXdDLFVBQUNDLEdBQUQsRUFBUztBQUVoRCxZQUFNZ0IsT0FBTyxHQUFHdEYsU0FBUyxDQUFDbUUsTUFBVixDQUFpQix1Q0FBakIsRUFBMERHLEdBQTFELEVBQStELENBQS9ELEtBQXFFLEVBQXJGOztBQUVBLFlBQUdnQixPQUFPLENBQUNDLFdBQVIsT0FBMEJILGNBQWMsQ0FBQ0csV0FBZixFQUE3QixFQUEyRDtBQUMxRDlCLFVBQUFBLENBQUMsQ0FBQ3NCLElBQUYsQ0FBTyxvQkFBb0IvRSxTQUFTLENBQUN3RixVQUFWLENBQXFCRixPQUFyQixDQUFwQixHQUFvRCx3QkFBcEQsR0FBK0V0RixTQUFTLENBQUN3RixVQUFWLENBQXFCRixPQUFyQixDQUEvRSxHQUErRyxXQUF0SDtBQUNBLFNBRkQsTUFHSztBQUNKN0IsVUFBQUEsQ0FBQyxDQUFDc0IsSUFBRixDQUFPLG9CQUFvQi9FLFNBQVMsQ0FBQ3dGLFVBQVYsQ0FBcUJGLE9BQXJCLENBQXBCLEdBQW9ELHdCQUFwRCxHQUErRXRGLFNBQVMsQ0FBQ3dGLFVBQVYsQ0FBcUJGLE9BQXJCLENBQS9FLEdBQStHLFdBQXRIO0FBQ0E7QUFDRCxPQVZEO0FBWUF4RixNQUFBQSxDQUFDLENBQUNnRSxHQUFELENBQUQsQ0FBT1YsSUFBUCxDQUFZSyxDQUFDLENBQUNnQyxJQUFGLENBQU8sRUFBUCxDQUFaLEVBQXdCQyxPQUF4QixHQUFrQ3hGLElBQWxDLENBQXVDLFlBQU07QUFFNUNGLFFBQUFBLFNBQVMsQ0FBQ2dGLE1BQVY7QUFDQSxPQUhEO0FBS0EsS0F2QkQsRUF1QkcvQixJQXZCSCxDQXVCUSxVQUFDOUMsSUFBRCxFQUFPOEUsT0FBUCxFQUFtQjtBQUUxQmpGLE1BQUFBLFNBQVMsQ0FBQ2tGLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsS0ExQkQ7QUE0QkE7QUFDQSxHQXpYNEI7O0FBMlg3QjtBQUVBVSxFQUFBQSxXQUFXLEVBQUUscUJBQVM3QixHQUFULEVBQWN3QixPQUFkLEVBQXVCTSxhQUF2QixFQUNiO0FBQ0MsUUFBRyxDQUFDTixPQUFKLEVBQ0E7QUFDQztBQUNBOztBQUVETSxJQUFBQSxhQUFhLEdBQUdBLGFBQWEsSUFBSSxFQUFqQztBQUVBOztBQUVBNUYsSUFBQUEsU0FBUyxDQUFDK0QsSUFBVjtBQUVBakUsSUFBQUEsQ0FBQyxDQUFDZ0UsR0FBRCxDQUFELENBQU91QixLQUFQO0FBRUFyQixJQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIsNEJBQTRCakUsU0FBUyxDQUFDNkYsWUFBVixDQUF1QlAsT0FBdkIsQ0FBNUIsR0FBOEQsR0FBakYsRUFBc0ZwRixJQUF0RixDQUEyRixVQUFDQyxJQUFELEVBQVU7QUFFcEcsVUFBTXNELENBQUMsR0FBRyxDQUNULHlFQURTLENBQVY7QUFJQXpELE1BQUFBLFNBQVMsQ0FBQ21FLE1BQVYsQ0FBaUIsT0FBakIsRUFBMEJoRSxJQUExQixFQUFnQ2tFLE9BQWhDLENBQXdDLFVBQUNDLEdBQUQsRUFBUztBQUVoRCxZQUFNd0IsTUFBTSxHQUFHOUYsU0FBUyxDQUFDbUUsTUFBVixDQUFpQiw4QkFBakIsRUFBaURHLEdBQWpELEVBQXNELENBQXRELEtBQTRELEVBQTNFOztBQUVBLFlBQUd3QixNQUFNLENBQUNQLFdBQVAsT0FBeUJLLGFBQWEsQ0FBQ0wsV0FBZCxFQUE1QixFQUF5RDtBQUN4RDlCLFVBQUFBLENBQUMsQ0FBQ3NCLElBQUYsQ0FBTyxvQkFBb0IvRSxTQUFTLENBQUN3RixVQUFWLENBQXFCTSxNQUFyQixDQUFwQixHQUFtRCx3QkFBbkQsR0FBOEU5RixTQUFTLENBQUN3RixVQUFWLENBQXFCTSxNQUFyQixDQUE5RSxHQUE2RyxXQUFwSDtBQUNBLFNBRkQsTUFHSztBQUNKckMsVUFBQUEsQ0FBQyxDQUFDc0IsSUFBRixDQUFPLG9CQUFvQi9FLFNBQVMsQ0FBQ3dGLFVBQVYsQ0FBcUJNLE1BQXJCLENBQXBCLEdBQW1ELHdCQUFuRCxHQUE4RTlGLFNBQVMsQ0FBQ3dGLFVBQVYsQ0FBcUJNLE1BQXJCLENBQTlFLEdBQTZHLFdBQXBIO0FBQ0E7QUFDRCxPQVZEO0FBWUFoRyxNQUFBQSxDQUFDLENBQUNnRSxHQUFELENBQUQsQ0FBT1YsSUFBUCxDQUFZSyxDQUFDLENBQUNnQyxJQUFGLENBQU8sRUFBUCxDQUFaLEVBQXdCQyxPQUF4QixHQUFrQ3hGLElBQWxDLENBQXVDLFlBQU07QUFFNUNGLFFBQUFBLFNBQVMsQ0FBQ2dGLE1BQVY7QUFDQSxPQUhEO0FBS0EsS0F2QkQsRUF1QkcvQixJQXZCSCxDQXVCUSxVQUFDOUMsSUFBRCxFQUFPOEUsT0FBUCxFQUFtQjtBQUUxQmpGLE1BQUFBLFNBQVMsQ0FBQ2tGLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsS0ExQkQ7QUE0QkE7QUFDQSxHQXphNEI7O0FBMmE3QjtBQUVBYyxFQUFBQSxTQUFTLEVBQUUsbUJBQVNqQyxHQUFULEVBQWN3QixPQUFkLEVBQXVCUSxNQUF2QixFQUErQkUsWUFBL0IsRUFDWDtBQUNDLFFBQUcsQ0FBQ1YsT0FBRCxJQUVBLENBQUNRLE1BRkosRUFHRztBQUNGO0FBQ0E7O0FBRURFLElBQUFBLFlBQVksR0FBR0EsWUFBWSxJQUFJLEVBQS9CO0FBRUE7O0FBRUFoRyxJQUFBQSxTQUFTLENBQUMrRCxJQUFWO0FBRUFqRSxJQUFBQSxDQUFDLENBQUNnRSxHQUFELENBQUQsQ0FBT3VCLEtBQVA7QUFFQXJCLElBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQiwwQkFBMEJqRSxTQUFTLENBQUM2RixZQUFWLENBQXVCUCxPQUF2QixDQUExQixHQUE0RCxhQUE1RCxHQUE0RXRGLFNBQVMsQ0FBQzZGLFlBQVYsQ0FBdUJDLE1BQXZCLENBQTVFLEdBQTZHLEdBQWhJLEVBQXFJNUYsSUFBckksQ0FBMEksVUFBQ0MsSUFBRCxFQUFVO0FBRW5KLFVBQU1zRCxDQUFDLEdBQUcsQ0FDVCx1RUFEUyxDQUFWO0FBSUF6RCxNQUFBQSxTQUFTLENBQUNtRSxNQUFWLENBQWlCLE9BQWpCLEVBQTBCaEUsSUFBMUIsRUFBZ0NrRSxPQUFoQyxDQUF3QyxVQUFDQyxHQUFELEVBQVM7QUFFaEQsWUFBTTJCLEtBQUssR0FBR2pHLFNBQVMsQ0FBQ21FLE1BQVYsQ0FBaUIsNkJBQWpCLEVBQWdERyxHQUFoRCxFQUFxRCxDQUFyRCxLQUEyRCxFQUF6RTs7QUFFQSxZQUFHMkIsS0FBSyxDQUFDVixXQUFOLE9BQXdCUyxZQUFZLENBQUNULFdBQWIsRUFBM0IsRUFBdUQ7QUFDdEQ5QixVQUFBQSxDQUFDLENBQUNzQixJQUFGLENBQU8sb0JBQW9CL0UsU0FBUyxDQUFDd0YsVUFBVixDQUFxQlMsS0FBckIsQ0FBcEIsR0FBa0Qsd0JBQWxELEdBQTZFakcsU0FBUyxDQUFDd0YsVUFBVixDQUFxQlMsS0FBckIsQ0FBN0UsR0FBMkcsV0FBbEg7QUFDQSxTQUZELE1BR0s7QUFDSnhDLFVBQUFBLENBQUMsQ0FBQ3NCLElBQUYsQ0FBTyxvQkFBb0IvRSxTQUFTLENBQUN3RixVQUFWLENBQXFCUyxLQUFyQixDQUFwQixHQUFrRCx3QkFBbEQsR0FBNkVqRyxTQUFTLENBQUN3RixVQUFWLENBQXFCUyxLQUFyQixDQUE3RSxHQUEyRyxXQUFsSDtBQUNBO0FBQ0QsT0FWRDtBQVlBbkcsTUFBQUEsQ0FBQyxDQUFDZ0UsR0FBRCxDQUFELENBQU9WLElBQVAsQ0FBWUssQ0FBQyxDQUFDZ0MsSUFBRixDQUFPLEVBQVAsQ0FBWixFQUF3QkMsT0FBeEIsR0FBa0N4RixJQUFsQyxDQUF1QyxZQUFNO0FBRTVDRixRQUFBQSxTQUFTLENBQUNnRixNQUFWO0FBQ0EsT0FIRDtBQUtBLEtBdkJELEVBdUJHL0IsSUF2QkgsQ0F1QlEsVUFBQzlDLElBQUQsRUFBTzhFLE9BQVAsRUFBbUI7QUFFMUJqRixNQUFBQSxTQUFTLENBQUNrRixLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLEtBMUJEO0FBNEJBO0FBQ0EsR0EzZDRCOztBQTZkN0I7QUFFQWlCLEVBQUFBLEdBQUcsRUFBRSxDQS9kd0I7O0FBaWU3QjtBQUVBQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVM1QixFQUFULEVBQ1I7QUFBQTs7QUFDQyxRQUFHLEVBQUVBLEVBQUUsR0FBR0EsRUFBRSxDQUFDbEIsSUFBSCxFQUFQLENBQUgsRUFDQTtBQUNDO0FBQ0E7QUFFRDs7O0FBRUFyRCxJQUFBQSxTQUFTLENBQUMrRCxJQUFWO0FBRUE7O0FBRUEsUUFBTWMsZUFBZSxHQUFHLEtBQUs5QixnQkFBTCxDQUFzQndCLEVBQXRCLENBQXhCO0FBRUF6RSxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDbUMsZUFBZSxDQUFDTCxLQUEvRDtBQUVBMUUsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxDQUErQ21DLGVBQWUsQ0FBQ0osSUFBL0Q7QUFFQTNFLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsQ0FBK0NtQyxlQUFlLENBQUNILElBQS9EO0FBRUE1RSxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJEdkIsZUFBZSxDQUFDRCxRQUEzRTtBQUVBOUUsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNLLElBQTNDLENBQWdELFFBQWhELEVBQTBEZ0MsUUFBMUQsQ0FBbUUsS0FBS0MsU0FBTCxDQUFleUMsZUFBZSxDQUFDOUMsSUFBL0IsQ0FBbkU7QUFFQTs7QUFFQSxTQUFLd0IsV0FBTCxDQUFpQix1Q0FBakIsRUFBMERzQixlQUFlLENBQUNGLElBQWhCLENBQXFCUyxjQUEvRTs7QUFFQSxRQUFHUCxlQUFlLENBQUNGLElBQWhCLENBQXFCUyxjQUF4QixFQUNBO0FBQ0MsV0FBS08sV0FBTCxDQUFpQix1Q0FBakIsRUFBMERkLGVBQWUsQ0FBQ0YsSUFBaEIsQ0FBcUJTLGNBQS9FLEVBQStGUCxlQUFlLENBQUNGLElBQWhCLENBQXFCaUIsYUFBcEg7O0FBRUEsVUFBR2YsZUFBZSxDQUFDRixJQUFoQixDQUFxQmlCLGFBQXhCLEVBQ0E7QUFDQyxhQUFLRyxTQUFMLENBQWUsdUNBQWYsRUFBd0RsQixlQUFlLENBQUNGLElBQWhCLENBQXFCUyxjQUE3RSxFQUE2RlAsZUFBZSxDQUFDRixJQUFoQixDQUFxQmlCLGFBQWxILEVBQWlJZixlQUFlLENBQUNGLElBQWhCLENBQXFCMEIsbUJBQXRKO0FBQ0E7QUFDRDtBQUVEOzs7QUFFQSxRQUFNakMsSUFBSSxHQUFHO0FBQ1o4QixNQUFBQSxHQUFHLEVBQUUsS0FBS0EsR0FERTtBQUVaSSxNQUFBQSxRQUFRLEVBQUV6QixlQUFlLENBQUNGLElBQWhCLENBQXFCMkI7QUFGbkIsS0FBYjtBQUtBdEcsSUFBQUEsU0FBUyxDQUFDSSxXQUFWLENBQXNCLHVDQUF0QixFQUErRCxLQUFLMEMsYUFBcEUsRUFBbUY7QUFBQ3NCLE1BQUFBLElBQUksRUFBRUE7QUFBUCxLQUFuRixFQUFpR2xFLElBQWpHLENBQXNHLFlBQU07QUFFM0drRSxNQUFBQSxJQUFJLENBQUNrQyxRQUFMLENBQWNqQyxPQUFkLENBQXNCLFVBQUNrQyxTQUFELEVBQWU7QUFFcEMsUUFBQSxNQUFJLENBQUNoRCxXQUFMLENBQWlCLDJDQUEyQyxNQUFJLENBQUMyQyxHQUFqRSxFQUFzRUssU0FBUyxDQUFDakIsT0FBaEY7O0FBRUEsWUFBR2lCLFNBQVMsQ0FBQ2pCLE9BQWIsRUFDQTtBQUNDLFVBQUEsTUFBSSxDQUFDSyxXQUFMLENBQWlCLDJDQUEyQyxNQUFJLENBQUNPLEdBQWpFLEVBQXNFSyxTQUFTLENBQUNqQixPQUFoRixFQUF5RmlCLFNBQVMsQ0FBQ1QsTUFBbkc7O0FBRUEsY0FBR1MsU0FBUyxDQUFDVCxNQUFiLEVBQ0E7QUFDQyxZQUFBLE1BQUksQ0FBQ0MsU0FBTCxDQUFlLDJDQUEyQyxNQUFJLENBQUNHLEdBQS9ELEVBQW9FSyxTQUFTLENBQUNqQixPQUE5RSxFQUF1RmlCLFNBQVMsQ0FBQ1QsTUFBakcsRUFBeUdTLFNBQVMsQ0FBQ04sS0FBbkg7O0FBRUEsZ0JBQUdNLFNBQVMsQ0FBQ0MsSUFBVixHQUFpQixDQUFwQixFQUNBO0FBQ0MsY0FBQSxNQUFJLENBQUNULFNBQUwsQ0FBZSwyQ0FBMkMsTUFBSSxDQUFDRyxHQUEvRCxFQUFvRUssU0FBUyxDQUFDakIsT0FBOUUsRUFBdUZpQixTQUFTLENBQUNULE1BQWpHLEVBQXlHUyxTQUFTLENBQUNFLFNBQW5IO0FBQ0E7QUFDRDtBQUNEOztBQUVELFFBQUEsTUFBSSxDQUFDUCxHQUFMO0FBQ0EsT0FwQkQ7QUFzQkFsRyxNQUFBQSxTQUFTLENBQUNnRixNQUFWO0FBQ0EsS0F6QkQ7QUEyQkE7QUFDQSxHQTdpQjRCOztBQStpQjdCO0FBRUEwQixFQUFBQSxZQUFZLEVBQUUsc0JBQVNwQixPQUFULEVBQWtCUSxNQUFsQixFQUEwQkcsS0FBMUIsRUFBaUNLLFFBQWpDLEVBQTJDSyxRQUEzQyxFQUNkO0FBQUE7O0FBQ0M7QUFFQTNHLElBQUFBLFNBQVMsQ0FBQytELElBQVY7QUFFQTs7QUFFQSxRQUFNSyxJQUFJLEdBQUc7QUFDWjhCLE1BQUFBLEdBQUcsRUFBRSxLQUFLQSxHQURFO0FBRVpJLE1BQUFBLFFBQVEsRUFBRUEsUUFBUSxJQUFJLENBQUM7QUFBQ0UsUUFBQUEsSUFBSSxFQUFFRyxRQUFRLEdBQUcsQ0FBSCxHQUFPO0FBQXRCLE9BQUQ7QUFGVixLQUFiO0FBS0EzRyxJQUFBQSxTQUFTLENBQUM0RyxVQUFWLENBQXFCLHVDQUFyQixFQUE4RCxLQUFLOUQsYUFBbkUsRUFBa0Y7QUFBQ3NCLE1BQUFBLElBQUksRUFBRUE7QUFBUCxLQUFsRixFQUFnR2xFLElBQWhHLENBQXFHLFlBQU07QUFFMUdrRSxNQUFBQSxJQUFJLENBQUNrQyxRQUFMLENBQWNqQyxPQUFkLENBQXNCLFVBQUNrQyxTQUFELEVBQWU7QUFFcEMsUUFBQSxNQUFJLENBQUNoRCxXQUFMLENBQWlCLDJDQUEyQyxNQUFJLENBQUMyQyxHQUFqRSxFQUFzRVosT0FBdEU7O0FBRUEsWUFBR0EsT0FBSCxFQUNBO0FBQ0MsVUFBQSxNQUFJLENBQUNLLFdBQUwsQ0FBaUIsMkNBQTJDLE1BQUksQ0FBQ08sR0FBakUsRUFBc0VaLE9BQXRFLEVBQStFUSxNQUEvRTs7QUFFQSxjQUFHQSxNQUFILEVBQ0E7QUFDQyxZQUFBLE1BQUksQ0FBQ0MsU0FBTCxDQUFlLDJDQUEyQyxNQUFJLENBQUNHLEdBQS9ELEVBQW9FWixPQUFwRSxFQUE2RVEsTUFBN0UsRUFBcUZHLEtBQXJGOztBQUVBLGdCQUFHTSxTQUFTLENBQUNDLElBQVYsR0FBaUIsQ0FBcEIsRUFDQTtBQUNDLGNBQUEsTUFBSSxDQUFDVCxTQUFMLENBQWUsMkNBQTJDLE1BQUksQ0FBQ0csR0FBL0QsRUFBb0VaLE9BQXBFLEVBQTZFUSxNQUE3RSxFQUFxRkcsS0FBckY7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsUUFBQSxNQUFJLENBQUNDLEdBQUw7QUFDQSxPQXBCRDtBQXNCQWxHLE1BQUFBLFNBQVMsQ0FBQ2dGLE1BQVY7QUFDQSxLQXpCRDtBQTJCQTtBQUNBLEdBMWxCNEI7O0FBNGxCN0I7QUFFQTZCLEVBQUFBLFdBQVcsRUFBRSxxQkFBUzlFLElBQVQsRUFDYjtBQUNDakMsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxFQUEyRCxDQUFDLENBQUNyRSxJQUFJLENBQUMrRSxRQUFsRTtBQUVBLFdBQU8vRSxJQUFQO0FBQ0EsR0FubUI0Qjs7QUFxbUI3QjtBQUVBRyxFQUFBQSxXQUFXLEVBQUUscUJBQVNILElBQVQsRUFDYjtBQUNDQSxJQUFBQSxJQUFJLENBQUMrRSxRQUFMLEdBQWdCaEgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxDQUFoQjtBQUVBLFdBQU9yRSxJQUFQO0FBQ0EsR0E1bUI0Qjs7QUE4bUI3QjtBQUVBRixFQUFBQSxZQUFZLEVBQUUsd0JBQ2Q7QUFDQy9CLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsQ0FDQyxLQUFLTixTQUFMLENBQ0MsS0FBS0YsV0FBTCxDQUNDLEtBQUsyRSxXQUFMLENBQ0MsS0FBSzdFLFVBQUwsQ0FDQ2xDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFERCxDQURELENBREQsQ0FERCxDQUREO0FBWUM7O0FBRUQ1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ0ssSUFBM0MsQ0FBZ0QsUUFBaEQsRUFBMERnQyxRQUExRCxDQUFtRXJDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBbkU7QUFFQTVDLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDaUgsS0FBM0MsQ0FBaUQsTUFBakQ7QUFDQSxHQW5vQjRCOztBQXFvQjdCO0FBRUFDLEVBQUFBLFdBQVcsRUFBRSx1QkFDYjtBQUNDbEgsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxDQUErQzVDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDSyxJQUEzQyxDQUFnRCxRQUFoRCxFQUEwRDhCLFFBQTFELEVBQS9DO0FBRUFuQyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ2lILEtBQTNDLENBQWlELE1BQWpEO0FBQ0EsR0E1b0I0Qjs7QUE4b0I3QjtBQUVBRSxFQUFBQSxXQUFXLEVBQUUscUJBQVNsRixJQUFULEVBQ2I7QUFDQyxRQUFHLGlCQUFpQkEsSUFBakIsSUFFQUEsSUFBSSxDQUFDbUYsV0FBTCxLQUFxQixJQUZ4QixFQUdHO0FBQ0ZwSCxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDWCxJQUFJLENBQUNtRixXQUFMLENBQWlCekIsSUFBakIsQ0FBc0IzRixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQXRCLENBQS9DO0FBRUE1QyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJELElBQTNEO0FBQ0EsS0FQRCxNQVNBO0FBQ0N0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDO0FBQStDO0FBQWdDO0FBQVE7QUFBdkY7QUFFQTVDLE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsRUFBMkQsS0FBM0Q7QUFDQTs7QUFFRCxRQUFHLGdCQUFnQnJFLElBQWhCLElBRUFBLElBQUksQ0FBQ29GLFVBQUwsS0FBb0IsSUFGdkIsRUFHRztBQUNGckgsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxDQUErQ1gsSUFBSSxDQUFDb0YsVUFBTCxDQUFnQjFCLElBQWhCLENBQXFCM0YsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxFQUFyQixDQUEvQztBQUVBNUMsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxFQUEyRCxJQUEzRDtBQUNBLEtBUEQsTUFTQTtBQUNDdEcsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQztBQUErQztBQUFnQztBQUFRO0FBQXZGO0FBRUE1QyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJELEtBQTNEO0FBQ0E7O0FBRUR0RyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDWCxJQUFJLENBQUNxRixHQUFMLEtBQWEsSUFBYixHQUFvQnJGLElBQUksQ0FBQ3FGLEdBQXpCLEdBQStCLE9BQTlFO0FBQ0F0SCxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDWCxJQUFJLENBQUNzRixHQUFMLEtBQWEsSUFBYixHQUFvQnRGLElBQUksQ0FBQ3NGLEdBQXpCLEdBQStCLE9BQTlFO0FBQ0F2SCxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDWCxJQUFJLENBQUN1RixHQUFMLEtBQWEsSUFBYixHQUFvQnZGLElBQUksQ0FBQ3VGLEdBQXpCLEdBQStCLE9BQTlFO0FBQ0F4SCxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDWCxJQUFJLENBQUNOLEVBQUwsS0FBYSxJQUFiLEdBQW9CTSxJQUFJLENBQUNOLEVBQXpCLEdBQStCLE9BQTlFO0FBRUEzQixJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJELENBQUMsQ0FBQ3JFLElBQUksQ0FBQ3dGLFNBQWxFO0FBQ0F6SCxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJELENBQUMsQ0FBQ3JFLElBQUksQ0FBQ3lGLFNBQWxFO0FBQ0ExSCxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELEVBQTJELENBQUMsQ0FBQ3JFLElBQUksQ0FBQzBGLGFBQWxFO0FBRUE7O0FBQU8sUUFBRzFGLElBQUksQ0FBQzJGLEtBQUwsS0FBZSxLQUFsQixFQUF5QjtBQUMvQjVILE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsRUFBMkQsSUFBM0Q7QUFDQSxLQUZNLE1BRUEsSUFBR3JFLElBQUksQ0FBQzJGLEtBQUwsS0FBZSxNQUFsQixFQUEwQjtBQUNoQzVILE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsRUFBMkQsSUFBM0Q7QUFDQSxLQUZNLE1BRUE7QUFDTnRHLE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsRUFBMkQsSUFBM0Q7QUFDQTs7QUFFRCxXQUFPckUsSUFBUDtBQUNBLEdBbHNCNEI7O0FBb3NCN0I7QUFFQVEsRUFBQUEsV0FBVyxFQUFFLHFCQUFTUixJQUFULEVBQ2I7QUFDQyxRQUFHakMsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxDQUFILEVBQ0E7QUFDQyxVQUFNYyxXQUFXLEdBQUdwSCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQXBCOztBQUVBLFVBQUd3RSxXQUFXLENBQUNTLFdBQVosT0FBOEIsT0FBakMsRUFDQTtBQUNDNUYsUUFBQUEsSUFBSSxDQUFDbUYsV0FBTCxHQUFtQkEsV0FBVyxDQUFDVSxLQUFaLENBQWtCOUgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxFQUFsQixDQUFuQjtBQUNBLE9BSEQsTUFLQTtBQUNDLGVBQU9YLElBQUksQ0FBQ21GLFdBQVo7QUFDQTtBQUNELEtBWkQsTUFjQTtBQUNDLGFBQU9uRixJQUFJLENBQUNtRixXQUFaO0FBQ0E7O0FBRUQsUUFBR3BILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsQ0FBSCxFQUNBO0FBQ0MsVUFBTWUsVUFBVSxHQUFHckgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxFQUFuQjs7QUFFQSxVQUFHeUUsVUFBVSxDQUFDUSxXQUFYLE9BQTZCLE9BQWhDLEVBQ0E7QUFDQzVGLFFBQUFBLElBQUksQ0FBQ29GLFVBQUwsR0FBa0JBLFVBQVUsQ0FBQ1MsS0FBWCxDQUFpQjlILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBakIsQ0FBbEI7QUFDQSxPQUhELE1BS0E7QUFDQyxlQUFPWCxJQUFJLENBQUNvRixVQUFaO0FBQ0E7QUFDRCxLQVpELE1BY0E7QUFDQyxhQUFPcEYsSUFBSSxDQUFDb0YsVUFBWjtBQUNBOztBQUVELFFBQU1DLEdBQUcsR0FBR3RILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBWjs7QUFDQSxRQUFHMEUsR0FBRyxJQUFJQSxHQUFHLENBQUNPLFdBQUosT0FBc0IsT0FBaEMsRUFBeUM7QUFDeEM1RixNQUFBQSxJQUFJLENBQUNxRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPckYsSUFBSSxDQUFDcUYsR0FBWjtBQUNBOztBQUVELFFBQU1DLEdBQUcsR0FBR3ZILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBWjs7QUFDQSxRQUFHMkUsR0FBRyxJQUFJQSxHQUFHLENBQUNNLFdBQUosT0FBc0IsT0FBaEMsRUFBeUM7QUFDeEM1RixNQUFBQSxJQUFJLENBQUNzRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPdEYsSUFBSSxDQUFDc0YsR0FBWjtBQUNBOztBQUVELFFBQU1DLEdBQUcsR0FBR3hILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBWjs7QUFDQSxRQUFHNEUsR0FBRyxJQUFJQSxHQUFHLENBQUNLLFdBQUosT0FBc0IsT0FBaEMsRUFBeUM7QUFDeEM1RixNQUFBQSxJQUFJLENBQUN1RixHQUFMLEdBQVdBLEdBQVg7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPdkYsSUFBSSxDQUFDdUYsR0FBWjtBQUNBOztBQUVELFFBQU03RixFQUFFLEdBQUczQixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQVg7O0FBQ0EsUUFBR2pCLEVBQUUsSUFBSUEsRUFBRSxDQUFDa0csV0FBSCxPQUFxQixPQUE5QixFQUF1QztBQUN0QzVGLE1BQUFBLElBQUksQ0FBQ04sRUFBTCxHQUFVQSxFQUFWO0FBQ0EsS0FGRCxNQUVPO0FBQ04sYUFBT00sSUFBSSxDQUFDTixFQUFaO0FBQ0E7O0FBRUQsUUFBRyxDQUFDM0IsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxVQUFoRCxDQUFKLEVBQWlFO0FBQ2hFckUsTUFBQUEsSUFBSSxDQUFHd0YsU0FBUCxHQUFxQnpILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsQ0FBckI7QUFDQSxLQUZELE1BR0s7QUFDSixhQUFPckUsSUFBSSxDQUFHd0YsU0FBZDtBQUNBOztBQUVELFFBQUcsQ0FBQ3pILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsVUFBaEQsQ0FBSixFQUFpRTtBQUNoRXJFLE1BQUFBLElBQUksQ0FBR3lGLFNBQVAsR0FBcUIxSCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELENBQXJCO0FBQ0EsS0FGRCxNQUdLO0FBQ0osYUFBT3JFLElBQUksQ0FBR3lGLFNBQWQ7QUFDQTs7QUFFRCxRQUFHLENBQUMxSCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELENBQUosRUFBaUU7QUFDaEVyRSxNQUFBQSxJQUFJLENBQUMwRixhQUFMLEdBQXFCM0gsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxDQUFyQjtBQUNBLEtBRkQsTUFHSztBQUNKLGFBQU9yRSxJQUFJLENBQUMwRixhQUFaO0FBQ0E7QUFFRDs7O0FBQU8sUUFBRzNILENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDc0csSUFBM0MsQ0FBZ0QsU0FBaEQsQ0FBSCxFQUErRDtBQUNyRXJFLE1BQUFBLElBQUksQ0FBQzJGLEtBQUwsR0FBYSxLQUFiO0FBQ0EsS0FGTSxNQUVBLElBQUc1SCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELENBQUgsRUFBK0Q7QUFDckVyRSxNQUFBQSxJQUFJLENBQUMyRixLQUFMLEdBQWEsTUFBYjtBQUNBLEtBRk0sTUFFQSxJQUFHNUgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxTQUFoRCxDQUFILEVBQStEO0FBQ3JFLGFBQU9yRSxJQUFJLENBQUMyRixLQUFaO0FBQ0E7O0FBRUQsV0FBTzNGLElBQVA7QUFDQSxHQXR5QjRCOztBQXd5QjdCO0FBRUE4RixFQUFBQSxZQUFZLEVBQUUsc0JBQVNDLFFBQVQsRUFBbUJDLFNBQW5CLEVBQ2Q7QUFDQyxRQUFHQSxTQUFTLEtBQUssQ0FBZCxJQUFtQkEsU0FBUyxLQUFLLENBQXBDLEVBQXVDO0FBQ3RDakksTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RCxLQUE1RDtBQUNBdEcsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RCxLQUE1RDtBQUNBLEtBSEQsTUFJSztBQUNKdEcsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RCxJQUE1RDtBQUNBdEcsTUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNzRyxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RCxJQUE1RDtBQUNBOztBQUVELFFBQUcyQixTQUFTLEtBQUssQ0FBakIsRUFBb0I7QUFDbkJqSSxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELEtBQTVEO0FBQ0F0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELEtBQTVEO0FBQ0F0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELEtBQTVEO0FBQ0EsS0FKRCxNQUtLO0FBQ0p0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELElBQTVEO0FBQ0F0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELElBQTVEO0FBQ0F0RyxNQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFVBQWhELEVBQTRELElBQTVEO0FBQ0E7O0FBRUR0RyxJQUFBQSxDQUFDLENBQUMsMkNBQTJDZ0ksUUFBNUMsQ0FBRCxDQUF1RHBGLEdBQXZELENBQ0MsS0FBS04sU0FBTCxDQUNDLEtBQUtHLFdBQUwsQ0FDQyxLQUFLMEUsV0FBTCxDQUNDLEtBQUtqRixVQUFMLENBQ0NsQyxDQUFDLENBQUMsMkNBQTJDZ0ksUUFBNUMsQ0FBRCxDQUF1RHBGLEdBQXZELEVBREQsQ0FERCxDQURELENBREQsQ0FERDtBQVlDOztBQUVENUMsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNLLElBQTNDLENBQWdELFFBQWhELEVBQTBEZ0MsUUFBMUQsQ0FBbUVyQyxDQUFDLENBQUMsMkNBQTJDZ0ksUUFBNUMsQ0FBRCxDQUF1RHBGLEdBQXZELEVBQW5FO0FBRUE1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ2lILEtBQTNDLENBQWlELE1BQWpEO0FBRUEsU0FBS2lCLGVBQUwsR0FBdUJGLFFBQXZCO0FBQ0EsU0FBS0csZ0JBQUwsR0FBd0JGLFNBQXhCO0FBQ0EsR0FwMUI0Qjs7QUFzMUI3QjtBQUVBRyxFQUFBQSxXQUFXLEVBQUUscUJBQVNKLFFBQVQsRUFDYjtBQUNDaEksSUFBQUEsQ0FBQyxDQUFDLDJDQUEyQ2dJLFFBQTVDLENBQUQsQ0FBdURwRixHQUF2RCxDQUEyRDVDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDSyxJQUEzQyxDQUFnRCxRQUFoRCxFQUEwRDhCLFFBQTFELEVBQTNEO0FBRUFuQyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ2lILEtBQTNDLENBQWlELE1BQWpEO0FBRUEsU0FBS2lCLGVBQUwsR0FBdUIsVUFBdkI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixVQUF4QjtBQUNBLEdBaDJCNEI7O0FBazJCN0I7QUFFQUUsRUFBQUEsS0FBSyxFQUFFLGlCQUNQO0FBQ0MsUUFBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsSUFBZ0MsS0FBbkMsRUFDQTtBQUNDO0FBQ0E7QUFFRDs7O0FBRUF0SSxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBQ0E1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBQ0E1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBRUE1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBQ0E1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBQ0E1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEVBQS9DO0FBRUE1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLENBQStDLEdBQS9DO0FBRUE1QyxJQUFBQSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VGLEtBQTNDO0FBRUE7QUFDQSxHQTEzQjRCOztBQTQzQjdCO0FBRUFnRCxFQUFBQSxNQUFNLEVBQUUsa0JBQ1I7QUFBQTs7QUFDQyxRQUFHLENBQUNELE9BQU8sQ0FBQyxtQkFBRCxDQUFYLEVBQ0E7QUFDQztBQUNBO0FBRUQ7OztBQUVBLFFBQU01RCxLQUFLLEdBQUcsS0FBS2hCLEtBQUwsQ0FBVzFELENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBWCxDQUFkOztBQUNBLFFBQU0rQixJQUFJLEdBQUcsS0FBS2pCLEtBQUwsQ0FBVzFELENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDNEMsR0FBM0MsRUFBWCxDQUFiOztBQUVBLFFBQUcsQ0FBQzhCLEtBQUQsSUFFQSxDQUFDQyxJQUZKLEVBR0c7QUFDRjtBQUNBO0FBRUQ7OztBQUVBekUsSUFBQUEsU0FBUyxDQUFDK0QsSUFBVjtBQUVBQyxJQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIseUhBQXlIakUsU0FBUyxDQUFDNkYsWUFBVixDQUF1QnJCLEtBQXZCLENBQXpILEdBQXlKLEdBQXpKLEdBQStKeEUsU0FBUyxDQUFDNkYsWUFBVixDQUF1QnBCLElBQXZCLENBQS9KLEdBQTZMLEdBQWhOLEVBQXFOdkUsSUFBck4sQ0FBME4sVUFBQ0MsSUFBRCxFQUFPOEUsT0FBUCxFQUFtQjtBQUU1TyxNQUFBLE1BQUksQ0FBQzNCLGdCQUFMLENBQXNCLHVDQUF0Qjs7QUFFQXRELE1BQUFBLFNBQVMsQ0FBQ3NJLE9BQVYsQ0FBa0JyRCxPQUFsQixFQUEyQixJQUEzQjtBQUVBLEtBTkQsRUFNR2hDLElBTkgsQ0FNUSxVQUFDOUMsSUFBRCxFQUFPOEUsT0FBUCxFQUFtQjtBQUUxQixNQUFBLE1BQUksQ0FBQzNCLGdCQUFMLENBQXNCLHVDQUF0Qjs7QUFFQXRELE1BQUFBLFNBQVMsQ0FBQ2tGLEtBQVYsQ0FBZ0JELE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsS0FYRDtBQWFBO0FBQ0EsR0FuNkI0Qjs7QUFxNkI3QjtBQUVBc0QsRUFBQUEsSUFBSSxFQUFFLGNBQVMvRyxJQUFULEVBQWU7QUFDckI7QUFBQTs7QUFDQyxRQUFHQSxJQUFJLEtBQUssQ0FBWixFQUNBO0FBQ0MsVUFBRyxDQUFDNEcsT0FBTyxDQUFDLG1CQUFELENBQVgsRUFDQTtBQUNDO0FBQ0E7QUFDRDtBQUVEOzs7QUFFQSxRQUFNNUQsS0FBSyxHQUFHLEtBQUtoQixLQUFMLENBQVcxRCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQVgsQ0FBZDs7QUFDQSxRQUFNK0IsSUFBSSxHQUFHLEtBQUtqQixLQUFMLENBQVcxRCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQVgsQ0FBYjs7QUFDQSxRQUFNZ0MsSUFBSSxHQUFHLEtBQUtsQixLQUFMLENBQVcxRCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQVgsQ0FBYjs7QUFDQSxRQUFNMEMsY0FBYyxHQUFHLEtBQUs1QixLQUFMLENBQVcxRCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzRDLEdBQTNDLEVBQVgsQ0FBdkI7O0FBQ0EsUUFBTWtELGFBQWEsR0FBRyxLQUFLcEMsS0FBTCxDQUFXMUQsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxFQUFYLENBQXRCOztBQUNBLFFBQU0yRCxtQkFBbUIsR0FBRyxLQUFLN0MsS0FBTCxDQUFXMUQsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkM0QyxHQUEzQyxFQUFYLENBQTVCOztBQUNBLFFBQU1rQyxRQUFRLEdBQUc5RSxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3NHLElBQTNDLENBQWdELFNBQWhELElBQTZELEdBQTdELEdBQW1FLEdBQXBGO0FBQ0EsUUFBTXJFLElBQUksR0FBR2pDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDSyxJQUEzQyxDQUFnRCxRQUFoRCxFQUEwRDhCLFFBQTFELEVBQWI7O0FBRUEsUUFBTXVHLGNBQWMsR0FBRyxLQUFLaEYsS0FBTCxDQUFXaEMsSUFBSSxLQUFLLENBQVQsR0FBYWlILE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLHFCQUFkLEVBQXFDdEQsY0FBckMsQ0FBYixHQUFvRUEsY0FBL0UsQ0FBdkI7O0FBRUEsUUFBRyxDQUFDWixLQUFELElBRUEsQ0FBQ0MsSUFGRCxJQUlBLENBQUNDLElBSkQsSUFNQSxDQUFDVSxjQU5ELElBUUEsQ0FBQ29ELGNBUkQsSUFVQSxDQUFDNUMsYUFWRCxJQVlBLENBQUNTLG1CQVpKLEVBYUc7QUFDRjtBQUNBO0FBRUQ7OztBQUVBckcsSUFBQUEsU0FBUyxDQUFDK0QsSUFBVjtBQUVBOztBQUVBLFFBQU00RSxJQUFJLEdBQUcsRUFBYjtBQUNBLFFBQU1yQyxRQUFRLEdBQUcsRUFBakI7QUFFQXhHLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDOEksY0FBM0MsR0FBNER2RSxPQUE1RCxDQUFvRSxVQUFDNUQsSUFBRCxFQUFVO0FBRTdFLFVBQU1vSSxLQUFLLEdBQUdwSSxJQUFJLENBQUNnRSxJQUFMLENBQVVtRCxLQUFWLENBQWdCLElBQWhCLENBQWQ7O0FBRUEsVUFBR2lCLEtBQUssQ0FBQ2xHLE1BQU4sS0FBaUIsQ0FBcEIsRUFDQTtBQUNDLFlBQU1tRyxJQUFJLEdBQUdELEtBQUssQ0FBQyxDQUFELENBQWxCO0FBQ0EsWUFBTUUsSUFBSSxHQUFHRixLQUFLLENBQUMsQ0FBRCxDQUFsQjs7QUFFQSxZQUFHLEVBQUVDLElBQUksSUFBSXhDLFFBQVYsQ0FBSCxFQUNBO0FBQ0NxQyxVQUFBQSxJQUFJLENBQUM1RCxJQUFMLENBQVUrRCxJQUFWO0FBQ0F4QyxVQUFBQSxRQUFRLENBQUN3QyxJQUFELENBQVIsR0FBaUIsRUFBakI7QUFDQTtBQUVEOzs7QUFBSyxZQUFHQyxJQUFJLEtBQUssTUFBWixFQUNMO0FBQ0N6QyxVQUFBQSxRQUFRLENBQUN3QyxJQUFELENBQVIsQ0FBZUMsSUFBZixJQUF1QmpFLFFBQVEsQ0FBQ3JFLElBQUksQ0FBQ3VJLEtBQU4sQ0FBL0I7QUFDQSxTQUhJLE1BSUEsSUFBR0QsSUFBSSxLQUFLLE1BQVosRUFDTDtBQUNDekMsVUFBQUEsUUFBUSxDQUFDd0MsSUFBRCxDQUFSLENBQWVDLElBQWYsSUFBdUIsTUFBSSxDQUFDL0csVUFBTCxDQUFnQnZCLElBQUksQ0FBQ3VJLEtBQXJCLENBQXZCO0FBQ0EsU0FISSxNQUtMO0FBQ0MxQyxVQUFBQSxRQUFRLENBQUN3QyxJQUFELENBQVIsQ0FBZUMsSUFBZixJQUF3QnZILElBQUksS0FBSyxDQUFULElBQWN1SCxJQUFJLEtBQUssU0FBdkIsSUFBb0N0SSxJQUFJLENBQUN1SSxLQUFMLEtBQWU1RCxjQUFwRCxHQUFzRW9ELGNBQXRFLEdBQ3dFL0gsSUFBSSxDQUFDdUksS0FEcEc7QUFHQTtBQUNEO0FBQ0QsS0E5QkQ7QUFnQ0E7O0FBRUEsUUFBSUMsSUFBSjs7QUFFQSxRQUFJO0FBQ0hBLE1BQUFBLElBQUksR0FBR3RGLElBQUksQ0FBQ0MsS0FBTCxDQUFXN0IsSUFBWCxDQUFQO0FBQ0EsS0FGRCxDQUdBLE9BQU14QixDQUFOLEVBQVM7QUFDUjBJLE1BQUFBLElBQUksR0FBRztBQUFDO0FBQUQsT0FBUDtBQUNBO0FBRUQ7OztBQUVBLFFBQU10RSxJQUFJLEdBQUc7QUFDWlMsTUFBQUEsY0FBYyxFQUFFb0QsY0FESjtBQUVaNUMsTUFBQUEsYUFBYSxFQUFFQSxhQUZIO0FBR1pTLE1BQUFBLG1CQUFtQixFQUFFQSxtQkFIVDtBQUladEUsTUFBQUEsSUFBSSxFQUFFa0gsSUFKTTtBQUtaM0MsTUFBQUEsUUFBUSxFQUFFcUMsSUFBSSxDQUFDTyxHQUFMLENBQVMsVUFBQUMsR0FBRyxFQUFJO0FBQUUsWUFBRyxDQUFDN0MsUUFBUSxDQUFDNkMsR0FBRCxDQUFSLENBQWMxRSxJQUFsQixFQUF3QjZCLFFBQVEsQ0FBQzZDLEdBQUQsQ0FBUixDQUFjMUUsSUFBZCxHQUFxQjZCLFFBQVEsQ0FBQzZDLEdBQUQsQ0FBUixDQUFjbEQsS0FBbkM7QUFBMEMsZUFBT0ssUUFBUSxDQUFDNkMsR0FBRCxDQUFmO0FBQXVCLE9BQTNHO0FBTEUsS0FBYjtBQVFBOztBQUVBLFFBQUczSCxJQUFJLEtBQUssQ0FBWixFQUNBO0FBQ0N4QixNQUFBQSxTQUFTLENBQUNvSixhQUFWLENBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQW9DLFNBQXBDLEVBQStDLENBQUMsS0FBS2hILFNBQUwsQ0FBZXVDLElBQWYsQ0FBRCxDQUEvQyxFQUF1RSxFQUF2RSxFQUEyRXpFLElBQTNFLENBQWdGLFlBQU07QUFFckZGLFFBQUFBLFNBQVMsQ0FBQ2dGLE1BQVY7QUFDQSxPQUhEO0FBSUEsS0FORCxNQVFBO0FBQ0NoQixNQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIseUhBQXlIakUsU0FBUyxDQUFDNkYsWUFBVixDQUF1QnJCLEtBQXZCLENBQXpILEdBQXlKLEdBQXpKLEdBQStKeEUsU0FBUyxDQUFDNkYsWUFBVixDQUF1QnBCLElBQXZCLENBQS9KLEdBQTZMLEdBQWhOLEVBQXFOdkUsSUFBck4sQ0FBME47QUFBQztBQUFrQjtBQUU1TzhELFFBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixrSUFBa0lqRSxTQUFTLENBQUM2RixZQUFWLENBQXVCckIsS0FBdkIsQ0FBbEksR0FBa0ssR0FBbEssR0FBd0t4RSxTQUFTLENBQUM2RixZQUFWLENBQXVCcEIsSUFBdkIsQ0FBeEssR0FBdU0sR0FBdk0sR0FBNk16RSxTQUFTLENBQUM2RixZQUFWLENBQXVCbkIsSUFBdkIsQ0FBN00sR0FBNE8sR0FBNU8sR0FBa1AxRSxTQUFTLENBQUM2RixZQUFWLENBQXVCbEMsSUFBSSxDQUFDRSxTQUFMLENBQWVjLElBQWYsQ0FBdkIsQ0FBbFAsR0FBaVMsR0FBalMsR0FBdVMzRSxTQUFTLENBQUM2RixZQUFWLENBQXVCakIsUUFBdkIsQ0FBdlMsR0FBMFUsR0FBN1YsRUFBa1cxRSxJQUFsVyxDQUF1VyxVQUFDQyxJQUFELEVBQU84RSxPQUFQLEVBQW1CO0FBRXpYLFVBQUEsTUFBSSxDQUFDM0IsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBdEQsVUFBQUEsU0FBUyxDQUFDc0ksT0FBVixDQUFrQnJELE9BQWxCLEVBQTJCLElBQTNCO0FBRUEsU0FORCxFQU1HaEMsSUFOSCxDQU1RLFVBQUM5QyxJQUFELEVBQU84RSxPQUFQLEVBQW1CO0FBRTFCLFVBQUEsTUFBSSxDQUFDM0IsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBdEQsVUFBQUEsU0FBUyxDQUFDa0YsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxTQVhEO0FBYUEsT0FmRCxFQWVHaEMsSUFmSCxDQWVRLFVBQUM5QyxJQUFELEVBQU84RSxPQUFQLEVBQW1CO0FBRTFCLFFBQUEsTUFBSSxDQUFDM0IsZ0JBQUwsQ0FBc0IsdUNBQXRCOztBQUVBdEQsUUFBQUEsU0FBUyxDQUFDa0YsS0FBVixDQUFnQkQsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxPQXBCRDtBQXFCQTtBQUVEOztBQUNBO0FBRUQ7O0FBbGpDNkIsQ0FBckIsQ0FBVDtBQXFqQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFvRSxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBSixFQUFuQjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTZWFyY2hNb2RlbGVyQXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL1NlYXJjaE1vZGVsZXJBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TZWFyY2hNb2RlbGVyL3R3aWcvaW50ZXJmYWNlLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2lucHV0LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0XHRcdCdzdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvYWRkb24vZWRpdC9tYXRjaGJyYWNrZXRzLmpzJyxcblx0XHRcdFx0XHQnanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHQuanMnLFxuXHRcdFx0XHRdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKS5zb3J0YWJsZSh7XG5cdFx0XHRcdFx0XHRzdGFydDogKGUsIHVpKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMSA9IHt9O1xuXG5cdFx0XHRcdFx0XHRcdCQoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzkgPiBkaXZbZGF0YS1pZF0nKS5lYWNoKChpbmR4LCBpdGVtKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMVskKGl0ZW0pLmF0dHIoJ2RhdGEtaWQnKV0gPSBpbmR4O1xuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHVwZGF0ZTogKGUsIHVpKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMiA9IHt9O1xuXG5cdFx0XHRcdFx0XHRcdCQoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzkgPiBkaXZbZGF0YS1pZF0nKS5lYWNoKChpbmR4LCBpdGVtKSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMlskKGl0ZW0pLmF0dHIoJ2RhdGEtaWQnKV0gPSBpbmR4O1xuXHRcdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3dhcChcblx0XHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMSxcblx0XHRcdFx0XHRcdFx0XHR1aS5pdGVtLnJhbmtzMlxuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLnNvcnRhYmxlKCk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IxID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMSk7XG5cblx0XHRcdFx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5Jykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IxLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVkaXRvcjIgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJyksIHtcblx0XHRcdFx0XHRcdGxpbmVOdW1iZXJzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0XHRcdFx0XHRcdG1vZGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InLCBlZGl0b3IyKTtcblxuXHRcdFx0XHRcdCQoJyNFNzhBMTdDMF83OTlFXzhFMzRfNDk4Nl8zMjJCOUVBODBEOUYnKS5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVkaXRvcjIucmVmcmVzaCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0IxNzg2REU3X0JDRDZfRjMzNl9EODExXzlDQkI2RUNCNTgzRicpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0dGhpcy5lZGl0T3B0aW9uczEoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYxID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBtb3JlID0gdGhpcy5fcGFyc2VKc29uKCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShtb3JlKTtcblxuXHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKG1vcmUpKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLmNoYW5nZShmMSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMiA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjIobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS5rZXl1cCAoZjIpO1xuXG5cdFx0XHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLmNoYW5nZShmMik7XG5cdFx0XHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLmtleXVwIChmMik7XG5cblx0XHRcdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2Jykua2V5dXAgKGYyKTtcblx0XHRcdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykua2V5dXAgKGYyKTtcblxuXHRcdFx0XHRcdCQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5jaGFuZ2UoZjIpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjMgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS5hdHRyKCdzaXplJywgJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpLmxlbmd0aCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS5rZXl1cChmMyk7XG5cblx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykudmFsKCcsJyk7XG5cblx0XHRcdFx0XHRmMygpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5hdHRyKCdzaXplJywgJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpLmxlbmd0aCk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS5rZXl1cChmNCk7XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykudmFsKCcsJyk7XG5cblx0XHRcdFx0XHRmNCgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLmZyYWdtZW50SW50ZXJmYWNlID0gZGF0YVsxXTtcblx0XHRcdFx0dGhpcy5mcmFnbWVudElucHV0ID0gZGF0YVsyXTtcblxuXHRcdFx0XHR0aGlzLnNlYXJjaEludGVyZmFjZXMgPSB7fTtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKCgpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdCgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCEkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5JykuaHRtbCgpLnRyaW0oKSlcblx0XHR7XG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF90cmltOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYocykge1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnBhcnNlKHggfHwgJ3t9Jyk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdHJlc3VsdCA9IHsvKi0tLS0tLS0tLS0tLS0tLSovfTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXBKc29uOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0bGV0IHJlc3VsdDtcblxuXHRcdHRyeSB7XG5cdFx0XHRyZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh4IHx8IHt9LCBudWxsLCAyKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0cmVzdWx0ID0gLyotLS0tLS0tLS0qLyAne30nIC8qLS0tLS0tLS0tKi87XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKGRzdClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1NlYXJjaFF1ZXJ5IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zcWw9XCJTRUxFQ1QgYGlkYCwgYGdyb3VwYCwgYG5hbWVgLCBgcmFua2AsIGBqc29uYCwgYGFyY2hpdmVkYCBGUk9NIGByb3V0ZXJfc2VhcmNoX2ludGVyZmFjZWAgT1JERVIgQlkgYHJhbmtgIEFTQywgYGdyb3VwYCBBU0MsIGBuYW1lYCBBU0NcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3Qgcm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSk7XG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHNlYXJjaEludGVyZmFjZXM6IFtdLFxuXHRcdFx0fTtcblxuXHRcdFx0cm93cy5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBpZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJpZFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZ3JvdXBcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IG5hbWUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibmFtZVwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgcmFuayA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyYW5rXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBqc29uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGFyY2hpdmVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFyY2hpdmVkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3Qgc2VhcmNoSW50ZXJmYWNlID0ge1xuXHRcdFx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRcdFx0Z3JvdXA6IGdyb3VwLFxuXHRcdFx0XHRcdFx0bmFtZTogbmFtZSxcblx0XHRcdFx0XHRcdHJhbms6IC8qLSovIHBhcnNlSW50KHJhbmspLFxuXHRcdFx0XHRcdFx0anNvbjogdGhpcy5fcGFyc2VKc29uKGpzb24pLFxuXHRcdFx0XHRcdFx0YXJjaGl2ZWQ6IChhcmNoaXZlZCAhPT0gJzAnKSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0ZGljdC5zZWFyY2hJbnRlcmZhY2VzLnB1c2goc2VhcmNoSW50ZXJmYWNlKTtcblxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF0gPSBzZWFyY2hJbnRlcmZhY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKGRzdCwgdGhpcy5mcmFnbWVudEludGVyZmFjZSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c3dhcDogZnVuY3Rpb24ocmFua3MxLCByYW5rczIpXG5cdHtcblx0XHRmb3IoY29uc3QgaWQgaW4gdGhpcy5zZWFyY2hJbnRlcmZhY2VzKVxuXHRcdHtcblx0XHRcdGlmKHJhbmtzMVtpZF0gIT09IHJhbmtzMltpZF0pXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgY29tbWFuZCA9ICdVcGRhdGVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtZmllbGRzPVwicmFua1wiIC12YWx1ZXM9XCInICsgcmFua3MyW2lkXSArICdcIiAta2V5RmllbGRzPVwiaWRcIiAta2V5VmFsdWVzPVwiJyArIGlkICsgJ1wiJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKGNvbW1hbmQpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRDYXRhbG9nczogZnVuY3Rpb24oZHN0LCBkZWZhdWx0Q2F0YWxvZylcblx0e1xuXHRcdGRlZmF1bHRDYXRhbG9nID0gZGVmYXVsdENhdGFsb2cgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RDYXRhbG9ncycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgY2F0YWxvZyAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgY2F0YWxvZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJleHRlcm5hbENhdGFsb2dcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoY2F0YWxvZy50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0Q2F0YWxvZy50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNhdGFsb2cpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEVudGl0aWVzOiBmdW5jdGlvbihkc3QsIGNhdGFsb2csIGRlZmF1bHRFbnRpdHkpXG5cdHtcblx0XHRpZighY2F0YWxvZylcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdEVudGl0eSA9IGRlZmF1bHRFbnRpdHkgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RFbnRpdGllcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYW4gZW50aXR5IC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBlbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZW50aXR5XCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGVudGl0eS50b0xvd2VyQ2FzZSgpICE9PSBkZWZhdWx0RW50aXR5LnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRGaWVsZHM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZW50aXR5LCBkZWZhdWx0RmllbGQpXG5cdHtcblx0XHRpZighY2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWVudGl0eVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RmllbGQgPSBkZWZhdWx0RmllbGQgfHwgJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0JChkc3QpLmVtcHR5KCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RGaWVsZHMgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcyA9IFtcblx0XHRcdFx0JzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+LS0gc2VsZWN0IGEgZmllbGQgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGZpZWxkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZpZWxkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdGlmKGZpZWxkLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRGaWVsZC50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRcdFx0cy5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGZpZWxkKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JChkc3QpLmh0bWwocy5qb2luKCcnKSkucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbnQ6IDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZWxlY3Q6IGZ1bmN0aW9uKGlkKVxuXHR7XG5cdFx0aWYoIShpZCA9IGlkLnRyaW0oKSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdO1xuXG5cdFx0JCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbChzZWFyY2hJbnRlcmZhY2UuZ3JvdXApO1xuXG5cdFx0JCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbChzZWFyY2hJbnRlcmZhY2UubmFtZSk7XG5cblx0XHQkKCcjRTdDN0IxMDZfODc2QV80QjhBXzJDRTJfMDg0QTlFODlCRjNFJykudmFsKHNlYXJjaEludGVyZmFjZS5yYW5rKTtcblxuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJywgc2VhcmNoSW50ZXJmYWNlLmFyY2hpdmVkKTtcblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihzZWFyY2hJbnRlcmZhY2UubW9yZSkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5nZXRDYXRhbG9ncygnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSk7XG5cblx0XHRcdGlmKHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQkI4OUE0NzNfMDg0Ml9DQjhGX0UxNDZfQTZDQ0Q4RDNGMTVFJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2csIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRFbnRpdHksIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRQcmltYXJ5RmllbGQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IHNlYXJjaEludGVyZmFjZS5qc29uLmNyaXRlcmlhLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nKTtcblxuXHRcdFx0XHRpZihjcml0ZXJpb24uY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSk7XG5cblx0XHRcdFx0XHRpZihjcml0ZXJpb24uZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2csIGNyaXRlcmlvbi5lbnRpdHksIGNyaXRlcmlvbi5maWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmtleV9maWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhZGRDcml0ZXJpb246IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQsIGNyaXRlcmlhLCBpc0tleVZhbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Y250OiB0aGlzLmNudCxcblx0XHRcdGNyaXRlcmlhOiBjcml0ZXJpYSB8fCBbe3R5cGU6IGlzS2V5VmFsID8gNyA6IDB9XSxcblx0XHR9O1xuXG5cdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnLCB0aGlzLmZyYWdtZW50SW5wdXQsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGRpY3QuY3JpdGVyaWEuZm9yRWFjaCgoY3JpdGVyaW9uKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRDYXRhbG9ncygnI0UzQUNCQkFDX0Q0NTJfNUI5QV80OTI2X0Q4RkVFMzU2Q0Q2M18nICsgdGhpcy5jbnQsIGNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLmdldEVudGl0aWVzKCcjQTREMkZENzJfRkYwQV8zQzg3X0IxQ0ZfNEEzMTMzMUQzRjhCXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGVudGl0eSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0E0NUYwMjE2XzZDMzVfMTlGM18yQ0VDXzEwM0E4NTM2OTE0Rl8nICsgdGhpcy5jbnQsIGNhdGFsb2csIGVudGl0eSwgZmllbGQpO1xuXG5cdFx0XHRcdFx0XHRpZihjcml0ZXJpb24udHlwZSA+IDYpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjRjgzQ0U0QkJfMzg1MV8zQzQwXzI0MkVfRjczODRDNjhBMUE1XycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5jbnQrKztcblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmRpc3RpbmN0KTtcblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zm9ybVRvSnNvbjE6IGZ1bmN0aW9uKG1vcmUpXG5cdHtcblx0XHRtb3JlLmRpc3RpbmN0ID0gJCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnKTtcblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMxOiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKFxuXHRcdFx0dGhpcy5fZHVtcEpzb24oXG5cdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEoXG5cdFx0XHRcdFx0dGhpcy5qc29uVG9Gb3JtMShcblx0XHRcdFx0XHRcdHRoaXMuX3BhcnNlSnNvbihcblx0XHRcdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KTtcblxuIFx0XHQvKiovXG5cblx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgpKTtcblxuXHRcdCQoJyNBQUM1NUZBN180OTE5X0RGMUFfRjE5NF8zMERGNjQzNUI1MzknKS5tb2RhbCgnc2hvdycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoJCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdoaWRlJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRqc29uVG9Gb3JtMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCdjb25zdHJhaW50cycgaW4gbW9yZVxuXHRcdCAgICYmXG5cdFx0ICAgbW9yZS5jb25zdHJhaW50cyAhPT0gbnVsbFxuXHRcdCApIHtcblx0XHRcdCQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS52YWwobW9yZS5jb25zdHJhaW50cy5qb2luKCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovICdATlVMTCcgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyk7XG5cblx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdGlmKCdpbml0X3ZhbHVlJyBpbiBtb3JlXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmluaXRfdmFsdWUgIT09IG51bGxcblx0XHQgKSB7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKG1vcmUuaW5pdF92YWx1ZS5qb2luKCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkpO1xuXG5cdFx0XHQkKCcjRjQ1NzBFM0VfQjREQl80MkRFXzNFMTBfNkE0NEYwNEYyRkE3JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI0IzMDJEMTAwX0RERDBfOTA0Rl81QjUwX0UwRTg1RkIwQzREMycpLnZhbCgvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovICdATlVMTCcgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwobW9yZS5taW4gIT09IG51bGwgPyBtb3JlLm1pbiA6ICdATlVMTCcpO1xuXHRcdCQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwobW9yZS5tYXggIT09IG51bGwgPyBtb3JlLm1heCA6ICdATlVMTCcpO1xuXHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS52YWwobW9yZS5vZmYgIT09IG51bGwgPyBtb3JlLm9mZiA6ICdATlVMTCcpO1xuXHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwobW9yZS5vbiAgIT09IG51bGwgPyBtb3JlLm9uICA6ICdATlVMTCcpO1xuXG5cdFx0JCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuYXV0b19vcGVuKTtcblx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5pbmNsdXNpdmUpO1xuXHRcdCQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLnNpbXBsZV9zZWFyY2gpO1xuXG5cdFx0LyotLSovIGlmKG1vcmUub3JkZXIgPT09ICdBU0MnKSB7XG5cdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdH0gZWxzZSBpZihtb3JlLm9yZGVyID09PSAnREVTQycpIHtcblx0XHRcdCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMjogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdGlmKCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgY29uc3RyYWludHMgPSAkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1JykudmFsKCk7XG5cblx0XHRcdGlmKGNvbnN0cmFpbnRzLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpXG5cdFx0XHR7XG5cdFx0XHRcdG1vcmUuY29uc3RyYWludHMgPSBjb25zdHJhaW50cy5zcGxpdCgkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykudmFsKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5jb25zdHJhaW50cztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmNvbnN0cmFpbnRzO1xuXHRcdH1cblxuXHRcdGlmKCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgaW5pdF92YWx1ZSA9ICQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwoKTtcblxuXHRcdFx0aWYoaW5pdF92YWx1ZS50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKVxuXHRcdFx0e1xuXHRcdFx0XHRtb3JlLmluaXRfdmFsdWUgPSBpbml0X3ZhbHVlLnNwbGl0KCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGRlbGV0ZSBtb3JlLmluaXRfdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1pbiA9ICQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS52YWwoKTtcblx0XHRpZihtaW4gJiYgbWluLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWluID0gbWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5taW47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF4ID0gJCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbCgpO1xuXHRcdGlmKG1heCAmJiBtYXgudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5tYXggPSBtYXg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm1heDtcblx0XHR9XG5cblx0XHRjb25zdCBvZmYgPSAkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykudmFsKCk7XG5cdFx0aWYob2ZmICYmIG9mZi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9mZiA9IG9mZjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub2ZmO1xuXHRcdH1cblxuXHRcdGNvbnN0IG9uID0gJCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbCgpO1xuXHRcdGlmKG9uICYmIG9uLnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUub24gPSBvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUub247XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNFMzk1MUZBNV84Qjc2XzNDOUVfQ0ZDMl9FQzM3NDk0NTEyMjYnKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLiAgYXV0b19vcGVuICAgPSAkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLiAgYXV0b19vcGVuICA7XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLiAgaW5jbHVzaXZlICAgPSAkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLiAgaW5jbHVzaXZlICA7XG5cdFx0fVxuXG5cdFx0aWYoISQoJyNCNjY3MTcxNl9FQTRFX0U0QTZfNDU0Ql83OTE0MEZGQzE1MzInKS5wcm9wKCdkaXNhYmxlZCcpKSB7XG5cdFx0XHRtb3JlLnNpbXBsZV9zZWFyY2ggPSAkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnY2hlY2tlZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLnNpbXBsZV9zZWFyY2g7XG5cdFx0fVxuXG5cdFx0LyotLSovIGlmKCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnQVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0bW9yZS5vcmRlciA9ICdERVNDJztcblx0XHR9IGVsc2UgaWYoJCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0ZGVsZXRlIG1vcmUub3JkZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250LCBpbnB1dFR5cGUpXG5cdHtcblx0XHRpZihpbnB1dFR5cGUgPT09IDIgfHwgaW5wdXRUeXBlID09PSAzKSB7XG5cdFx0XHQkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRDU4MEVGN0VfQUQ2QV9CQzUxX0ZGQUJfNDE3ODJDQzNGMkNGJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dFR5cGUgPT09IDQpIHtcblx0XHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNFRDY0OTNCOF82M0ZDXzk2RjFfNDhBQV9GMkQ2NzBFNjM4MzYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbChcblx0XHRcdHRoaXMuX2R1bXBKc29uKFxuXHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKFxuXHRcdFx0XHRcdHRoaXMuanNvblRvRm9ybTIoXG5cdFx0XHRcdFx0XHR0aGlzLl9wYXJzZUpzb24oXG5cdFx0XHRcdFx0XHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cbiBcdFx0LyoqL1xuXG5cdFx0JCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gaW5wdXRDbnQ7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gaW5wdXRUeXBlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0T3B0aW9uczI6IGZ1bmN0aW9uKGlucHV0Q250KVxuXHR7XG5cdFx0JCgnI0M0QUFBREJDX0MzQjVfNkREQ184NTFCX0YwNjQzMENCNEY2RV8nICsgaW5wdXRDbnQpLnZhbCgkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdHRoaXMuY3VycmVudElucHV0Q250ID0gMHhGRkZGRkZGRjtcblx0XHR0aGlzLmN1cnJlbnRJbnB1dFR5cGUgPSAweEZGRkZGRkZGO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y2xlYXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykgPT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoJycpO1xuXHRcdCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoJycpO1xuXHRcdCQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS52YWwoJycpO1xuXG5cdFx0JCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgnJyk7XG5cdFx0JCgnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcpLnZhbCgnJyk7XG5cdFx0JCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgnJyk7XG5cblx0XHQkKCcjRTdDN0IxMDZfODc2QV80QjhBXzJDRTJfMDg0QTlFODlCRjNFJykudmFsKCcwJyk7XG5cblx0XHQkKCcjREQ4OUQ3ODNfNkYzOV83QjNCXzNGM0ZfRDg3NTczN0E1RTY4JykuZW1wdHkoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbW92ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cblx0XHRpZighZ3JvdXBcblx0XHQgICB8fFxuXHRcdCAgICFuYW1lXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzYXZlOiBmdW5jdGlvbihtb2RlKSAvLyAwOiBTVEQsIDE6IENMT05FLCAyOiBTSE9XXG5cdHtcblx0XHRpZihtb2RlICE9PSAyKVxuXHRcdHtcblx0XHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSB0aGlzLl90cmltKCQoJyNCMDhCMEQ1NV8yMjdDXzhBQjJfREQzRl9COUU3ODNFNjA2RjgnKS52YWwoKSk7XG5cdFx0Y29uc3QgbmFtZSA9IHRoaXMuX3RyaW0oJCgnI0JDNEFCQ0MxXzM5RjlfMjAyMF80QjY0XzBCQzg2RERBNkIxNicpLnZhbCgpKTtcblx0XHRjb25zdCByYW5rID0gdGhpcy5fdHJpbSgkKCcjRTdDN0IxMDZfODc2QV80QjhBXzJDRTJfMDg0QTlFODlCRjNFJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRDYXRhbG9nID0gdGhpcy5fdHJpbSgkKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRFbnRpdHkgPSB0aGlzLl90cmltKCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoKSk7XG5cdFx0Y29uc3QgZGVmYXVsdFByaW1hcnlGaWVsZCA9IHRoaXMuX3RyaW0oJCgnI0JCODlBNDczXzA4NDJfQ0I4Rl9FMTQ2X0E2Q0NEOEQzRjE1RScpLnZhbCgpKTtcblx0XHRjb25zdCBhcmNoaXZlZCA9ICQoJyNBMkM1NEYzM19BQzQ1XzM1NTNfODZENl80QTQ3OUQxMENENTQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCc7XG5cdFx0Y29uc3QgbW9yZSA9ICQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5nZXRWYWx1ZSgpO1xuXG5cdFx0Y29uc3QgZGVmYXVsdENBVEFMT0cgPSB0aGlzLl90cmltKG1vZGUgPT09IDEgPyB3aW5kb3cucHJvbXB0KCdOZXcgZGVmYXVsdCBjYXRhbG9nJywgZGVmYXVsdENhdGFsb2cpIDogZGVmYXVsdENhdGFsb2cpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCAgIHx8XG5cdFx0ICAgIXJhbmtcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q2F0YWxvZ1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRDQVRBTE9HXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdEVudGl0eVxuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRQcmltYXJ5RmllbGRcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGtleXMgPSBbXTtcblx0XHRjb25zdCBjcml0ZXJpYSA9IHt9O1xuXG5cdFx0JCgnI0ZFQzM2MEZBX0VDMURfOTBEQ19GRkQ1XzhBNDk4Q0Y2MDMwNScpLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0ubmFtZS5zcGxpdCgnOjonKTtcblxuXHRcdFx0aWYocGFydHMubGVuZ3RoID09PSAyKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBrZXkxID0gcGFydHNbMV07XG5cdFx0XHRcdGNvbnN0IGtleTIgPSBwYXJ0c1swXTtcblxuXHRcdFx0XHRpZighKGtleTEgaW4gY3JpdGVyaWEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0a2V5cy5wdXNoKGtleTEpO1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdID0ge307XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiovIGlmKGtleTIgPT09ICd0eXBlJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNyaXRlcmlhW2tleTFdW2tleTJdID0gcGFyc2VJbnQoaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihrZXkyID09PSAnbW9yZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHRoaXMuX3BhcnNlSnNvbihpdGVtLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IChtb2RlID09PSAxICYmIGtleTIgPT09ICdjYXRhbG9nJyAmJiBpdGVtLnZhbHVlID09PSBkZWZhdWx0Q2F0YWxvZykgPyBkZWZhdWx0Q0FUQUxPR1xuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICgoaXRlbS52YWx1ZSkpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgTU9SRTtcblxuXHRcdHRyeSB7XG5cdFx0XHRNT1JFID0gSlNPTi5wYXJzZShtb3JlKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0TU9SRSA9IHsvKi0tLS0tLS0tLS0qL307XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QganNvbiA9IHtcblx0XHRcdGRlZmF1bHRDYXRhbG9nOiBkZWZhdWx0Q0FUQUxPRyxcblx0XHRcdGRlZmF1bHRFbnRpdHk6IGRlZmF1bHRFbnRpdHksXG5cdFx0XHRkZWZhdWx0UHJpbWFyeUZpZWxkOiBkZWZhdWx0UHJpbWFyeUZpZWxkLFxuXHRcdFx0bW9yZTogTU9SRSxcblx0XHRcdGNyaXRlcmlhOiBrZXlzLm1hcChrZXkgPT4geyBpZighY3JpdGVyaWFba2V5XS5uYW1lKSBjcml0ZXJpYVtrZXldLm5hbWUgPSBjcml0ZXJpYVtrZXldLmZpZWxkOyByZXR1cm4gY3JpdGVyaWFba2V5XTsgfSksXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKG1vZGUgPT09IDIpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wobnVsbCwgbnVsbCwgJ3RleHRCb3gnLCBbdGhpcy5fZHVtcEpzb24oanNvbildLCB7fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNlcGFyYXRvcj1cIsKjXCIgLWtleUZpZWxkcz1cImdyb3VwwqNuYW1lXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsnXCInKS5kb25lKCgvKi0tLS0tLS0tLSovKSA9PiB7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdBZGRFbGVtZW50IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1maWVsZHM9XCJncm91cMKjbmFtZcKjcmFua8KjanNvbsKjYXJjaGl2ZWRcIiAtdmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhyYW5rKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KGpzb24pKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGFyY2hpdmVkKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBHTE9CQUwgSU5TVEFOQ0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5zZWFyY2hNb2RlbGVyQXBwID0gbmV3IFNlYXJjaE1vZGVsZXJBcHAoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
