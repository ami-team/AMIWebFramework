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
    this.getInterfaceList();

    if ($('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3 option').length === 0) {
      this.getCatalogs('#ECAE118F_BBFB_6F69_590F_C6F38611F8C3');
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogout: function onLogout() {
    this.maskInterfaceList();
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
      amiWebApp.replaceHTML('#CFB6CA12_2D42_3111_3183_EC1006F7E039', _this2.fragmentInterface, {
        dict: dict
      }).done(function () {
        $('#DA22E4F4_323E_0AFA_AA7D_0E9F21A3D20D button').prop('disabled', false);
        $('#E8799895_7169_41DA_189F_ACEFE120C72F').show();
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  maskInterfaceList: function maskInterfaceList() {
    amiWebApp.replaceHTML('#CFB6CA12_2D42_3111_3183_EC1006F7E039', 'Please log-in.').done(function () {
      $('#DA22E4F4_323E_0AFA_AA7D_0E9F21A3D20D button').prop('disabled', true);
      $('#E8799895_7169_41DA_189F_ACEFE120C72F').hide();
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
        more.constraints = constraints.split($('#C64EE3C9_DB38_DDA5_20C2_B3B2E8140637').val()).map(function (x) {
          return x.trim();
        });
      } else {
        delete more.constraints;
      }
    } else {
      delete more.constraints;
    }

    if ($('#F4570E3E_B4DB_42DE_3E10_6A44F04F2FA7').prop('checked')) {
      var init_value = $('#B302D100_DDD0_904F_5B50_E0E85FB0C4D3').val();

      if (init_value.toUpperCase() !== '@NULL') {
        more.init_value = init_value.split($('#B06166B2_2DE1_255D_7350_9C21370DB32F').val()).map(function (x) {
          return x.trim();
        });
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

var searchModelerApp = new SearchModelerApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaE1vZGVsZXJBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic29ydGFibGUiLCJzdGFydCIsImUiLCJ1aSIsIml0ZW0iLCJyYW5rczEiLCJlYWNoIiwiaW5keCIsImF0dHIiLCJ1cGRhdGUiLCJyYW5rczIiLCJzd2FwIiwiZWRpdG9yMSIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsImVkaXRvcjIiLCJjbGljayIsImVkaXRPcHRpb25zMSIsImYxIiwibW9yZSIsIl9wYXJzZUpzb24iLCJnZXRWYWx1ZSIsImZvcm1Ub0pzb24xIiwic2V0VmFsdWUiLCJfZHVtcEpzb24iLCJjaGFuZ2UiLCJmMiIsImZvcm1Ub0pzb24yIiwia2V5dXAiLCJmMyIsInZhbCIsImxlbmd0aCIsImY0IiwiZnJhZ21lbnRJbnRlcmZhY2UiLCJmcmFnbWVudElucHV0Iiwic2VhcmNoSW50ZXJmYWNlcyIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25Mb2dpbiIsImdldEludGVyZmFjZUxpc3QiLCJnZXRDYXRhbG9ncyIsIm9uTG9nb3V0IiwibWFza0ludGVyZmFjZUxpc3QiLCJfdHJpbSIsInMiLCJ0cmltIiwieCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImRzdCIsImxvY2siLCJhbWlDb21tYW5kIiwiZXhlY3V0ZSIsInJvd3MiLCJqc3BhdGgiLCJkaWN0IiwiZm9yRWFjaCIsInJvdyIsImlkIiwiZ3JvdXAiLCJuYW1lIiwicmFuayIsImpzb24iLCJhcmNoaXZlZCIsInNlYXJjaEludGVyZmFjZSIsInBhcnNlSW50IiwicHVzaCIsInByb3AiLCJzaG93IiwidW5sb2NrIiwibWVzc2FnZSIsImVycm9yIiwiaGlkZSIsImNvbW1hbmQiLCJkZWZhdWx0Q2F0YWxvZyIsImVtcHR5IiwiY2F0YWxvZyIsInRvTG93ZXJDYXNlIiwidGV4dFRvSHRtbCIsImh0bWwiLCJqb2luIiwicHJvbWlzZSIsImdldEVudGl0aWVzIiwiZGVmYXVsdEVudGl0eSIsInRleHRUb1N0cmluZyIsImVudGl0eSIsImdldEZpZWxkcyIsImRlZmF1bHRGaWVsZCIsImZpZWxkIiwiY250Iiwic2VsZWN0IiwiZGVmYXVsdFByaW1hcnlGaWVsZCIsImNyaXRlcmlhIiwiY3JpdGVyaW9uIiwidHlwZSIsImtleV9maWVsZCIsImFkZENyaXRlcmlvbiIsImlzS2V5VmFsIiwiYXBwZW5kSFRNTCIsImpzb25Ub0Zvcm0xIiwiZGlzdGluY3QiLCJtb2RhbCIsInNldE9wdGlvbnMxIiwianNvblRvRm9ybTIiLCJjb25zdHJhaW50cyIsImluaXRfdmFsdWUiLCJtaW4iLCJtYXgiLCJvZmYiLCJhdXRvX29wZW4iLCJpbmNsdXNpdmUiLCJzaW1wbGVfc2VhcmNoIiwib3JkZXIiLCJ0b1VwcGVyQ2FzZSIsInNwbGl0IiwibWFwIiwiZWRpdE9wdGlvbnMyIiwiaW5wdXRDbnQiLCJpbnB1dFR5cGUiLCJjdXJyZW50SW5wdXRDbnQiLCJjdXJyZW50SW5wdXRUeXBlIiwic2V0T3B0aW9uczIiLCJjbGVhciIsImNvbmZpcm0iLCJyZW1vdmUiLCJzdWNjZXNzIiwic2F2ZSIsImRlZmF1bHRDQVRBTE9HIiwid2luZG93IiwicHJvbXB0Iiwia2V5cyIsInNlcmlhbGl6ZUFycmF5IiwicGFydHMiLCJrZXkxIiwia2V5MiIsInZhbHVlIiwiTU9SRSIsImtleSIsImNyZWF0ZUNvbnRyb2wiLCJzZWFyY2hNb2RlbGVyQXBwIiwiU2VhcmNoTW9kZWxlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEsU0FBUyxDQUFDLGtCQUFE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QUFJLENBQUNoQyxnQkFBTCxDQUFzQix1Q0FBdEI7O0FBRUFwRCxVQUFBQSxTQUFTLENBQUNxRixLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLFNBWEQ7QUFhQSxPQWZELEVBZUduQyxJQWZILENBZVEsVUFBQzlDLElBQUQsRUFBT2lGLE9BQVAsRUFBbUI7QUFFMUIsUUFBQSxNQUFJLENBQUNoQyxnQkFBTCxDQUFzQix1Q0FBdEI7O0FBRUFwRCxRQUFBQSxTQUFTLENBQUNxRixLQUFWLENBQWdCRCxPQUFoQixFQUF5QixJQUF6QjtBQUNBLE9BcEJEO0FBcUJBO0FBRUQ7O0FBQ0E7QUFFRDs7QUF6a0M2QixDQUFyQixDQUFUO0FBNGtDQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFNcUUsZ0JBQWdCLEdBQUcsSUFBSUMsZ0JBQUosRUFBekI7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2VhcmNoTW9kZWxlckFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9TZWFyY2hNb2RlbGVyQXBwLnR3aWcnLFxuXHRcdFx0J3N1YmFwcHMvU2VhcmNoTW9kZWxlci90d2lnL2ludGVyZmFjZS50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaE1vZGVsZXIvdHdpZy9pbnB1dC50d2lnJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2pzL2pxdWVyeS11aS5taW4uanMnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3MnLFxuXHRcdFx0XHRcdCdqcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycsXG5cdFx0XHRcdFx0J2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0LmpzJyxcblx0XHRcdFx0XSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jykuc29ydGFibGUoe1xuXHRcdFx0XHRcdFx0c3RhcnQ6IChlLCB1aSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczEgPSB7fTtcblxuXHRcdFx0XHRcdFx0XHQkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5ID4gZGl2W2RhdGEtaWRdJykuZWFjaCgoaW5keCwgaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczFbJChpdGVtKS5hdHRyKCdkYXRhLWlkJyldID0gaW5keDtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR1cGRhdGU6IChlLCB1aSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczIgPSB7fTtcblxuXHRcdFx0XHRcdFx0XHQkKCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5ID4gZGl2W2RhdGEtaWRdJykuZWFjaCgoaW5keCwgaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczJbJChpdGVtKS5hdHRyKCdkYXRhLWlkJyldID0gaW5keDtcblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0XHR0aGlzLnN3YXAoXG5cdFx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczEsXG5cdFx0XHRcdFx0XHRcdFx0dWkuaXRlbS5yYW5rczJcblx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNERDg5RDc4M182RjM5XzdCM0JfM0YzRl9EODc1NzM3QTVFNjgnKS5zb3J0YWJsZSgpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yMSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcjEpO1xuXG5cdFx0XHRcdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yMS5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IyID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yMik7XG5cblx0XHRcdFx0XHQkKCcjRTc4QTE3QzBfNzk5RV84RTM0XzQ5ODZfMzIyQjlFQTgwRDlGJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IyLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMTc4NkRFN19CQ0Q2X0YzMzZfRDgxMV85Q0JCNkVDQjU4M0YnKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZWRpdE9wdGlvbnMxKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBmMSA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgbW9yZSA9IHRoaXMuX3BhcnNlSnNvbigkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHRcdFx0XHRcdHRoaXMuZm9ybVRvSnNvbjEobW9yZSk7XG5cblx0XHRcdFx0XHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh0aGlzLl9kdW1wSnNvbihtb3JlKSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdCQoJyNDRUNFRjU1OV83REM3XzFBRTdfQUU4M184MUMxOUFGQjhBMDYnKS5jaGFuZ2UoZjEpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZjIgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1vcmUgPSB0aGlzLl9wYXJzZUpzb24oJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1Ub0pzb24yKG1vcmUpO1xuXG5cdFx0XHRcdFx0XHQkKCcjQTc4QzA2OTRfMTI4Ql8xQUQ4XzI1OTZfQzMyMURBQTQ2OTBCJykuZGF0YSgnZWRpdG9yJykuc2V0VmFsdWUodGhpcy5fZHVtcEpzb24obW9yZSkpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjRjk5MzEwOTFfMzFERF9BOTYwXzJBRDBfQzA4NDE3RkU4NDg0JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1Jykua2V5dXAgKGYyKTtcblxuXHRcdFx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5jaGFuZ2UoZjIpO1xuXHRcdFx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS5rZXl1cCAoZjIpO1xuXG5cdFx0XHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLmtleXVwIChmMik7XG5cdFx0XHRcdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLmtleXVwIChmMik7XG5cblx0XHRcdFx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQkI2QURFMzFfQjYyOV9EQjE1XzkzMTlfREFGQUFEOTk5OUNGJykuY2hhbmdlKGYyKTtcblx0XHRcdFx0XHQkKCcjQTEwRkY1QzVfNEQxN18zNkJCX0ExOEZfNEUyQzRFQjA1QTNCJykuY2hhbmdlKGYyKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGYzID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3JykuYXR0cignc2l6ZScsICQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQzY0RUUzQzlfREIzOF9EREE1XzIwQzJfQjNCMkU4MTQwNjM3Jykua2V5dXAoZjMpO1xuXG5cdFx0XHRcdFx0JCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjMoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGY0ID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykuYXR0cignc2l6ZScsICQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQkKCcjQjA2MTY2QjJfMkRFMV8yNTVEXzczNTBfOUMyMTM3MERCMzJGJykua2V5dXAoZjQpO1xuXG5cdFx0XHRcdFx0JCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgnLCcpO1xuXG5cdFx0XHRcdFx0ZjQoKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5mcmFnbWVudEludGVyZmFjZSA9IGRhdGFbMV07XG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnB1dCA9IGRhdGFbMl07XG5cblx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoKTtcblxuXHRcdGlmKCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMgb3B0aW9uJykubGVuZ3RoID09PSAwKVxuXHRcdHtcblx0XHRcdHRoaXMuZ2V0Q2F0YWxvZ3MoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ291dDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5tYXNrSW50ZXJmYWNlTGlzdCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3RyaW06IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZihzKSB7XG5cdFx0XHRyZXR1cm4gcy50cmltKCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZUpzb246IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJlc3VsdCA9IEpTT04ucGFyc2UoeCB8fCAne30nKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSkge1xuXHRcdFx0cmVzdWx0ID0gey8qLS0tLS0tLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcEpzb246IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRsZXQgcmVzdWx0O1xuXG5cdFx0dHJ5IHtcblx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHggfHwge30sIG51bGwsIDIpO1xuXHRcdH1cblx0XHRjYXRjaChlKSB7XG5cdFx0XHRyZXN1bHQgPSAvKi0tLS0tLS0tLSovICd7fScgLyotLS0tLS0tLS0qLztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SW50ZXJmYWNlTGlzdDogZnVuY3Rpb24oZHN0KVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnU2VhcmNoUXVlcnkgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNxbD1cIlNFTEVDVCBgaWRgLCBgZ3JvdXBgLCBgbmFtZWAsIGByYW5rYCwgYGpzb25gLCBgYXJjaGl2ZWRgIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBPUkRFUiBCWSBgcmFua2AgQVNDLCBgZ3JvdXBgIEFTQywgYG5hbWVgIEFTQ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCByb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0c2VhcmNoSW50ZXJmYWNlczogW10sXG5cdFx0XHR9O1xuXG5cdFx0XHRyb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImlkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBncm91cCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYW1lXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCByYW5rID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInJhbmtcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGpzb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgYXJjaGl2ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYXJjaGl2ZWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB7XG5cdFx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0XHRncm91cDogZ3JvdXAsXG5cdFx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdFx0cmFuazogLyotKi8gcGFyc2VJbnQocmFuayksXG5cdFx0XHRcdFx0XHRqc29uOiB0aGlzLl9wYXJzZUpzb24oanNvbiksXG5cdFx0XHRcdFx0XHRhcmNoaXZlZDogKGFyY2hpdmVkICE9PSAnMCcpLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkaWN0LnNlYXJjaEludGVyZmFjZXMucHVzaChzZWFyY2hJbnRlcmZhY2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXSA9IHNlYXJjaEludGVyZmFjZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknLCB0aGlzLmZyYWdtZW50SW50ZXJmYWNlLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdCQoJyNEQTIyRTRGNF8zMjNFXzBBRkFfQUE3RF8wRTlGMjFBM0QyMEQgYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdFx0JCgnI0U4Nzk5ODk1XzcxNjlfNDFEQV8xODlGX0FDRUZFMTIwQzcyRicpLnNob3coKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bWFza0ludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScsICdQbGVhc2UgbG9nLWluLicpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQkKCcjREEyMkU0RjRfMzIzRV8wQUZBX0FBN0RfMEU5RjIxQTNEMjBEIGJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0XHRcdCQoJyNFODc5OTg5NV83MTY5XzQxREFfMTg5Rl9BQ0VGRTEyMEM3MkYnKS5oaWRlKCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzd2FwOiBmdW5jdGlvbihyYW5rczEsIHJhbmtzMilcblx0e1xuXHRcdGZvcihjb25zdCBpZCBpbiB0aGlzLnNlYXJjaEludGVyZmFjZXMpXG5cdFx0e1xuXHRcdFx0aWYocmFua3MxW2lkXSAhPT0gcmFua3MyW2lkXSlcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBjb21tYW5kID0gJ1VwZGF0ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1maWVsZHM9XCJyYW5rXCIgLXZhbHVlcz1cIicgKyByYW5rczJbaWRdICsgJ1wiIC1rZXlGaWVsZHM9XCJpZFwiIC1rZXlWYWx1ZXM9XCInICsgaWQgKyAnXCInO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoY29tbWFuZCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldENhdGFsb2dzOiBmdW5jdGlvbihkc3QsIGRlZmF1bHRDYXRhbG9nKVxuXHR7XG5cdFx0ZGVmYXVsdENhdGFsb2cgPSBkZWZhdWx0Q2F0YWxvZyB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdENhdGFsb2dzJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBjYXRhbG9nIC0tPC9vcHRpb24+J1xuXHRcdFx0XTtcblxuXHRcdFx0YW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKS5mb3JFYWNoKChyb3cpID0+IHtcblxuXHRcdFx0XHRjb25zdCBjYXRhbG9nID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHRpZihjYXRhbG9nLnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRDYXRhbG9nLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgeHh4eHh4eHg9XCJ4eHh4eHh4eFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY2F0YWxvZykgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjYXRhbG9nKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQoZHN0KS5odG1sKHMuam9pbignJykpLnByb21pc2UoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0RW50aXRpZXM6IGZ1bmN0aW9uKGRzdCwgY2F0YWxvZywgZGVmYXVsdEVudGl0eSlcblx0e1xuXHRcdGlmKCFjYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkZWZhdWx0RW50aXR5ID0gZGVmYXVsdEVudGl0eSB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEVudGl0aWVzIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHMgPSBbXG5cdFx0XHRcdCc8b3B0aW9uIHZhbHVlPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPi0tIHNlbGVjdCBhbiBlbnRpdHkgLS08L29wdGlvbj4nXG5cdFx0XHRdO1xuXG5cdFx0XHRhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGVudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJlbnRpdHlcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZW50aXR5LnRvTG93ZXJDYXNlKCkgIT09IGRlZmF1bHRFbnRpdHkudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChlbnRpdHkpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZW50aXR5KSArICdcIiBzZWxlY3RlZD1cInNlbGVjdGVkXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGVudGl0eSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEZpZWxkczogZnVuY3Rpb24oZHN0LCBjYXRhbG9nLCBlbnRpdHksIGRlZmF1bHRGaWVsZClcblx0e1xuXHRcdGlmKCFjYXRhbG9nXG5cdFx0ICAgfHxcblx0XHQgICAhZW50aXR5XG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRlZmF1bHRGaWVsZCA9IGRlZmF1bHRGaWVsZCB8fCAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQkKGRzdCkuZW1wdHkoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnTGlzdEZpZWxkcyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCBzID0gW1xuXHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4tLSBzZWxlY3QgYSBmaWVsZCAtLTwvb3B0aW9uPidcblx0XHRcdF07XG5cblx0XHRcdGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93JywgZGF0YSkuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZmllbGQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmllbGRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0aWYoZmllbGQudG9Mb3dlckNhc2UoKSAhPT0gZGVmYXVsdEZpZWxkLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdFx0XHRzLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJ1wiIHh4eHh4eHh4PVwieHh4eHh4eHhcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZmllbGQpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHMucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChmaWVsZCkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKGRzdCkuaHRtbChzLmpvaW4oJycpKS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNudDogMCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNlbGVjdDogZnVuY3Rpb24oaWQpXG5cdHtcblx0XHRpZighKGlkID0gaWQudHJpbSgpKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF07XG5cblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKHNlYXJjaEludGVyZmFjZS5ncm91cCk7XG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKHNlYXJjaEludGVyZmFjZS5uYW1lKTtcblxuXHRcdCQoJyNFN0M3QjEwNl84NzZBXzRCOEFfMkNFMl8wODRBOUU4OUJGM0UnKS52YWwoc2VhcmNoSW50ZXJmYWNlLnJhbmspO1xuXG5cdFx0JCgnI0EyQzU0RjMzX0FDNDVfMzU1M184NkQ2XzRBNDc5RDEwQ0Q1NCcpLnByb3AoJ2NoZWNrZWQnLCBzZWFyY2hJbnRlcmZhY2UuYXJjaGl2ZWQpO1xuXG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHRoaXMuX2R1bXBKc29uKHNlYXJjaEludGVyZmFjZS5tb3JlKSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdldENhdGFsb2dzKCcjRUNBRTExOEZfQkJGQl82RjY5XzU5MEZfQzZGMzg2MTFGOEMzJywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpO1xuXG5cdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdENhdGFsb2cpXG5cdFx0e1xuXHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0Y3MUQxNDUyXzg2MTNfNUZCNV8yN0QzX0MxNTQwNTczRjQ1MCcsIHNlYXJjaEludGVyZmFjZS5qc29uLmRlZmF1bHRDYXRhbG9nLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0RW50aXR5KTtcblxuXHRcdFx0aWYoc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnLCBzZWFyY2hJbnRlcmZhY2UuanNvbi5kZWZhdWx0Q2F0YWxvZywgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdEVudGl0eSwgc2VhcmNoSW50ZXJmYWNlLmpzb24uZGVmYXVsdFByaW1hcnlGaWVsZCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdGNudDogdGhpcy5jbnQsXG5cdFx0XHRjcml0ZXJpYTogc2VhcmNoSW50ZXJmYWNlLmpzb24uY3JpdGVyaWEsXG5cdFx0fTtcblxuXHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY3JpdGVyaW9uLmNhdGFsb2cpO1xuXG5cdFx0XHRcdGlmKGNyaXRlcmlvbi5jYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5nZXRFbnRpdGllcygnI0E0RDJGRDcyX0ZGMEFfM0M4N19CMUNGXzRBMzEzMzFEM0Y4Ql8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5KTtcblxuXHRcdFx0XHRcdGlmKGNyaXRlcmlvbi5lbnRpdHkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNBNDVGMDIxNl82QzM1XzE5RjNfMkNFQ18xMDNBODUzNjkxNEZfJyArIHRoaXMuY250LCBjcml0ZXJpb24uY2F0YWxvZywgY3JpdGVyaW9uLmVudGl0eSwgY3JpdGVyaW9uLmZpZWxkKTtcblxuXHRcdFx0XHRcdFx0aWYoY3JpdGVyaW9uLnR5cGUgPiA2KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZpZWxkcygnI0Y4M0NFNEJCXzM4NTFfM0M0MF8yNDJFX0Y3Mzg0QzY4QTFBNV8nICsgdGhpcy5jbnQsIGNyaXRlcmlvbi5jYXRhbG9nLCBjcml0ZXJpb24uZW50aXR5LCBjcml0ZXJpb24ua2V5X2ZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFkZENyaXRlcmlvbjogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZCwgY3JpdGVyaWEsIGlzS2V5VmFsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRjbnQ6IHRoaXMuY250LFxuXHRcdFx0Y3JpdGVyaWE6IGNyaXRlcmlhIHx8IFt7dHlwZTogaXNLZXlWYWwgPyA3IDogMH1dLFxuXHRcdH07XG5cblx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcsIHRoaXMuZnJhZ21lbnRJbnB1dCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0ZGljdC5jcml0ZXJpYS5mb3JFYWNoKChjcml0ZXJpb24pID0+IHtcblxuXHRcdFx0XHR0aGlzLmdldENhdGFsb2dzKCcjRTNBQ0JCQUNfRDQ1Ml81QjlBXzQ5MjZfRDhGRUUzNTZDRDYzXycgKyB0aGlzLmNudCwgY2F0YWxvZyk7XG5cblx0XHRcdFx0aWYoY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuZ2V0RW50aXRpZXMoJyNBNEQyRkQ3Ml9GRjBBXzNDODdfQjFDRl80QTMxMzMxRDNGOEJfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHkpO1xuXG5cdFx0XHRcdFx0aWYoZW50aXR5KVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0RmllbGRzKCcjQTQ1RjAyMTZfNkMzNV8xOUYzXzJDRUNfMTAzQTg1MzY5MTRGXycgKyB0aGlzLmNudCwgY2F0YWxvZywgZW50aXR5LCBmaWVsZCk7XG5cblx0XHRcdFx0XHRcdGlmKGNyaXRlcmlvbi50eXBlID4gNilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGaWVsZHMoJyNGODNDRTRCQl8zODUxXzNDNDBfMjQyRV9GNzM4NEM2OEExQTVfJyArIHRoaXMuY250LCBjYXRhbG9nLCBlbnRpdHksIGZpZWxkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNudCsrO1xuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0xOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0JCgnI0NFQ0VGNTU5XzdEQzdfMUFFN19BRTgzXzgxQzE5QUZCOEEwNicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuZGlzdGluY3QpO1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmb3JtVG9Kc29uMTogZnVuY3Rpb24obW9yZSlcblx0e1xuXHRcdG1vcmUuZGlzdGluY3QgPSAkKCcjQ0VDRUY1NTlfN0RDN18xQUU3X0FFODNfODFDMTlBRkI4QTA2JykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0cmV0dXJuIG1vcmU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0T3B0aW9uczE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMShcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0xKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBM0Q4M0I0Ml80RkJGXzVEQUVfNkEzOF8xMkYxRjUzNDkzQjUnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykudmFsKCkpO1xuXG5cdFx0JCgnI0FBQzU1RkE3XzQ5MTlfREYxQV9GMTk0XzMwREY2NDM1QjUzOScpLm1vZGFsKCdzaG93Jyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRPcHRpb25zMTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0JCgnI0EzRDgzQjQyXzRGQkZfNURBRV82QTM4XzEyRjFGNTM0OTNCNScpLnZhbCgkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSk7XG5cblx0XHQkKCcjQUFDNTVGQTdfNDkxOV9ERjFBX0YxOTRfMzBERjY0MzVCNTM5JykubW9kYWwoJ2hpZGUnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGpzb25Ub0Zvcm0yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJ2NvbnN0cmFpbnRzJyBpbiBtb3JlXG5cdFx0ICAgJiZcblx0XHQgICBtb3JlLmNvbnN0cmFpbnRzICE9PSBudWxsXG5cdFx0ICkge1xuXHRcdFx0JCgnI0Y4N0I4RDRBX0JFM0VfNkM5M19CNDMyXzkxOTVERDFFNUExNScpLnZhbChtb3JlLmNvbnN0cmFpbnRzLmpvaW4oJCgnI0M2NEVFM0M5X0RCMzhfRERBNV8yMEMyX0IzQjJFODE0MDYzNycpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGOTkzMTA5MV8zMUREX0E5NjBfMkFEMF9DMDg0MTdGRTg0ODQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjRjg3QjhENEFfQkUzRV82QzkzX0I0MzJfOTE5NUREMUU1QTE1JykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y5OTMxMDkxXzMxRERfQTk2MF8yQUQwX0MwODQxN0ZFODQ4NCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0aWYoJ2luaXRfdmFsdWUnIGluIG1vcmVcblx0XHQgICAmJlxuXHRcdCAgIG1vcmUuaW5pdF92YWx1ZSAhPT0gbnVsbFxuXHRcdCApIHtcblx0XHRcdCQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwobW9yZS5pbml0X3ZhbHVlLmpvaW4oJCgnI0IwNjE2NkIyXzJERTFfMjU1RF83MzUwXzlDMjEzNzBEQjMyRicpLnZhbCgpKSk7XG5cblx0XHRcdCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjQjMwMkQxMDBfREREMF85MDRGXzVCNTBfRTBFODVGQjBDNEQzJykudmFsKC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8gJ0BOVUxMJyAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovKTtcblxuXHRcdFx0JCgnI0Y0NTcwRTNFX0I0REJfNDJERV8zRTEwXzZBNDRGMDRGMkZBNycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnZhbChtb3JlLm1pbiAhPT0gbnVsbCA/IG1vcmUubWluIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnZhbChtb3JlLm1heCAhPT0gbnVsbCA/IG1vcmUubWF4IDogJ0BOVUxMJyk7XG5cdFx0JCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbChtb3JlLm9mZiAhPT0gbnVsbCA/IG1vcmUub2ZmIDogJ0BOVUxMJyk7XG5cdFx0JCgnI0E2RDlGNTNCX0RDQkZfOTZEMl84RENFXzRFRkFCMEY0NkUzMycpLnZhbChtb3JlLm9uICAhPT0gbnVsbCA/IG1vcmUub24gIDogJ0BOVUxMJyk7XG5cblx0XHQkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnY2hlY2tlZCcsICEhbW9yZS5hdXRvX29wZW4pO1xuXHRcdCQoJyNENjA4OUY4M18zNjNBX0YzMjJfMUU5Ml8yNTU2N0Q4OUJEM0InKS5wcm9wKCdjaGVja2VkJywgISFtb3JlLmluY2x1c2l2ZSk7XG5cdFx0JCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnLCAhIW1vcmUuc2ltcGxlX3NlYXJjaCk7XG5cblx0XHQvKi0tKi8gaWYobW9yZS5vcmRlciA9PT0gJ0FTQycpIHtcblx0XHRcdCQoJyNDMUY1RDQzQl8wMDBFX0Y4NjdfQUJBNV8xM0VBNTE5RjU1Q0EnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0fSBlbHNlIGlmKG1vcmUub3JkZXIgPT09ICdERVNDJykge1xuXHRcdFx0JCgnI0ExMEZGNUM1XzREMTdfMzZCQl9BMThGXzRFMkM0RUIwNUEzQicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnI0JCNkFERTMxX0I2MjlfREIxNV85MzE5X0RBRkFBRDk5OTlDRicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbW9yZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZvcm1Ub0pzb24yOiBmdW5jdGlvbihtb3JlKVxuXHR7XG5cdFx0aWYoJCgnI0Y5OTMxMDkxXzMxRERfQTk2MF8yQUQwX0MwODQxN0ZFODQ4NCcpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHRjb25zdCBjb25zdHJhaW50cyA9ICQoJyNGODdCOEQ0QV9CRTNFXzZDOTNfQjQzMl85MTk1REQxRTVBMTUnKS52YWwoKTtcblxuXHRcdFx0aWYoY29uc3RyYWludHMudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJylcblx0XHRcdHtcblx0XHRcdFx0bW9yZS5jb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzLnNwbGl0KCQoJyNDNjRFRTNDOV9EQjM4X0REQTVfMjBDMl9CM0IyRTgxNDA2MzcnKS52YWwoKSkubWFwKHggPT4geC50cmltKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5jb25zdHJhaW50cztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGRlbGV0ZSBtb3JlLmNvbnN0cmFpbnRzO1xuXHRcdH1cblxuXHRcdGlmKCQoJyNGNDU3MEUzRV9CNERCXzQyREVfM0UxMF82QTQ0RjA0RjJGQTcnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0Y29uc3QgaW5pdF92YWx1ZSA9ICQoJyNCMzAyRDEwMF9EREQwXzkwNEZfNUI1MF9FMEU4NUZCMEM0RDMnKS52YWwoKTtcblxuXHRcdFx0aWYoaW5pdF92YWx1ZS50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKVxuXHRcdFx0e1xuXHRcdFx0XHRtb3JlLmluaXRfdmFsdWUgPSBpbml0X3ZhbHVlLnNwbGl0KCQoJyNCMDYxNjZCMl8yREUxXzI1NURfNzM1MF85QzIxMzcwREIzMkYnKS52YWwoKSkubWFwKHggPT4geC50cmltKCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkZWxldGUgbW9yZS5pbml0X3ZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIG1vcmUuaW5pdF92YWx1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBtaW4gPSAkKCcjQzE3ODg5NzBfNEM5NF9EOThGXzQxOTlfNUExODVCNEQ5N0EzJykudmFsKCk7XG5cdFx0aWYobWluICYmIG1pbi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm1pbiA9IG1pbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG1vcmUubWluO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1heCA9ICQoJyNENTgwRUY3RV9BRDZBX0JDNTFfRkZBQl80MTc4MkNDM0YyQ0YnKS52YWwoKTtcblx0XHRpZihtYXggJiYgbWF4LnRvVXBwZXJDYXNlKCkgIT09ICdATlVMTCcpIHtcblx0XHRcdG1vcmUubWF4ID0gbWF4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5tYXg7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2ZmID0gJCgnI0VENjQ5M0I4XzYzRkNfOTZGMV80OEFBX0YyRDY3MEU2MzgzNicpLnZhbCgpO1xuXHRcdGlmKG9mZiAmJiBvZmYudG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJykge1xuXHRcdFx0bW9yZS5vZmYgPSBvZmY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9mZjtcblx0XHR9XG5cblx0XHRjb25zdCBvbiA9ICQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS52YWwoKTtcblx0XHRpZihvbiAmJiBvbi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKSB7XG5cdFx0XHRtb3JlLm9uID0gb247XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9uO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRTM5NTFGQTVfOEI3Nl8zQzlFX0NGQzJfRUMzNzQ5NDUxMjI2JykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGF1dG9fb3BlbiAgID0gJCgnI0UzOTUxRkE1XzhCNzZfM0M5RV9DRkMyX0VDMzc0OTQ1MTIyNicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGF1dG9fb3BlbiAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS4gIGluY2x1c2l2ZSAgID0gJCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS4gIGluY2x1c2l2ZSAgO1xuXHRcdH1cblxuXHRcdGlmKCEkKCcjQjY2NzE3MTZfRUE0RV9FNEE2XzQ1NEJfNzkxNDBGRkMxNTMyJykucHJvcCgnZGlzYWJsZWQnKSkge1xuXHRcdFx0bW9yZS5zaW1wbGVfc2VhcmNoID0gJCgnI0I2NjcxNzE2X0VBNEVfRTRBNl80NTRCXzc5MTQwRkZDMTUzMicpLnByb3AoJ2NoZWNrZWQnKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRkZWxldGUgbW9yZS5zaW1wbGVfc2VhcmNoO1xuXHRcdH1cblxuXHRcdC8qLS0qLyBpZigkKCcjQzFGNUQ0M0JfMDAwRV9GODY3X0FCQTVfMTNFQTUxOUY1NUNBJykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0XHRtb3JlLm9yZGVyID0gJ0FTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNBMTBGRjVDNV80RDE3XzM2QkJfQTE4Rl80RTJDNEVCMDVBM0InKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdG1vcmUub3JkZXIgPSAnREVTQyc7XG5cdFx0fSBlbHNlIGlmKCQoJyNCQjZBREUzMV9CNjI5X0RCMTVfOTMxOV9EQUZBQUQ5OTk5Q0YnKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdGRlbGV0ZSBtb3JlLm9yZGVyO1xuXHRcdH1cblxuXHRcdHJldHVybiBtb3JlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudCwgaW5wdXRUeXBlKVxuXHR7XG5cdFx0aWYoaW5wdXRUeXBlID09PSAyIHx8IGlucHV0VHlwZSA9PT0gMykge1xuXHRcdFx0JCgnI0MxNzg4OTcwXzRDOTRfRDk4Rl80MTk5XzVBMTg1QjREOTdBMycpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoJyNDMTc4ODk3MF80Qzk0X0Q5OEZfNDE5OV81QTE4NUI0RDk3QTMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI0Q1ODBFRjdFX0FENkFfQkM1MV9GRkFCXzQxNzgyQ0MzRjJDRicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXRUeXBlID09PSA0KSB7XG5cdFx0XHQkKCcjRDYwODlGODNfMzYzQV9GMzIyXzFFOTJfMjU1NjdEODlCRDNCJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQkKCcjQTZEOUY1M0JfRENCRl85NkQyXzhEQ0VfNEVGQUIwRjQ2RTMzJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnI0Q2MDg5RjgzXzM2M0FfRjMyMl8xRTkyXzI1NTY3RDg5QkQzQicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjRUQ2NDkzQjhfNjNGQ185NkYxXzQ4QUFfRjJENjcwRTYzODM2JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdCQoJyNBNkQ5RjUzQl9EQ0JGXzk2RDJfOERDRV80RUZBQjBGNDZFMzMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoXG5cdFx0XHR0aGlzLl9kdW1wSnNvbihcblx0XHRcdFx0dGhpcy5mb3JtVG9Kc29uMihcblx0XHRcdFx0XHR0aGlzLmpzb25Ub0Zvcm0yKFxuXHRcdFx0XHRcdFx0dGhpcy5fcGFyc2VKc29uKFxuXHRcdFx0XHRcdFx0XHQkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXG4gXHRcdC8qKi9cblxuXHRcdCQoJyNBNzhDMDY5NF8xMjhCXzFBRDhfMjU5Nl9DMzIxREFBNDY5MEInKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSgkKCcjQzRBQUFEQkNfQzNCNV82RERDXzg1MUJfRjA2NDMwQ0I0RjZFXycgKyBpbnB1dENudCkudmFsKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IGlucHV0Q250O1xuXHRcdHRoaXMuY3VycmVudElucHV0VHlwZSA9IGlucHV0VHlwZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE9wdGlvbnMyOiBmdW5jdGlvbihpbnB1dENudClcblx0e1xuXHRcdCQoJyNDNEFBQURCQ19DM0I1XzZERENfODUxQl9GMDY0MzBDQjRGNkVfJyArIGlucHV0Q250KS52YWwoJCgnI0E3OEMwNjk0XzEyOEJfMUFEOF8yNTk2X0MzMjFEQUE0NjkwQicpLmRhdGEoJ2VkaXRvcicpLmdldFZhbHVlKCkpO1xuXG5cdFx0JCgnI0U3OEExN0MwXzc5OUVfOEUzNF80OTg2XzMyMkI5RUE4MEQ5RicpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHR0aGlzLmN1cnJlbnRJbnB1dENudCA9IDB4RkZGRkZGRkY7XG5cdFx0dGhpcy5jdXJyZW50SW5wdXRUeXBlID0gMHhGRkZGRkZGRjtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpID09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCcnKTtcblx0XHQkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCcnKTtcblx0XHQkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykudmFsKCcnKTtcblxuXHRcdCQoJyNFQ0FFMTE4Rl9CQkZCXzZGNjlfNTkwRl9DNkYzODYxMUY4QzMnKS52YWwoJycpO1xuXHRcdCQoJyNGNzFEMTQ1Ml84NjEzXzVGQjVfMjdEM19DMTU0MDU3M0Y0NTAnKS52YWwoJycpO1xuXHRcdCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoJycpO1xuXG5cdFx0JCgnI0U3QzdCMTA2Xzg3NkFfNEI4QV8yQ0UyXzA4NEE5RTg5QkYzRScpLnZhbCgnMCcpO1xuXG5cdFx0JCgnI0REODlENzgzXzZGMzlfN0IzQl8zRjNGX0Q4NzU3MzdBNUU2OCcpLmVtcHR5KCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW1vdmU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBncm91cCA9IHRoaXMuX3RyaW0oJCgnI0IwOEIwRDU1XzIyN0NfOEFCMl9ERDNGX0I5RTc4M0U2MDZGOCcpLnZhbCgpKTtcblx0XHRjb25zdCBuYW1lID0gdGhpcy5fdHJpbSgkKCcjQkM0QUJDQzFfMzlGOV8yMDIwXzRCNjRfMEJDODZEREE2QjE2JykudmFsKCkpO1xuXG5cdFx0aWYoIWdyb3VwXG5cdFx0ICAgfHxcblx0XHQgICAhbmFtZVxuXHRcdCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAta2V5RmllbGRzPVwiZ3JvdXDCo25hbWVcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZ3JvdXApICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkgKydcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0dGhpcy5nZXRJbnRlcmZhY2VMaXN0KCcjQ0ZCNkNBMTJfMkQ0Ml8zMTExXzMxODNfRUMxMDA2RjdFMDM5Jyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2F2ZTogZnVuY3Rpb24obW9kZSkgLy8gMDogU1RELCAxOiBDTE9ORSwgMjogU0hPV1xuXHR7XG5cdFx0aWYobW9kZSAhPT0gMilcblx0XHR7XG5cdFx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fdHJpbSgkKCcjQjA4QjBENTVfMjI3Q184QUIyX0REM0ZfQjlFNzgzRTYwNkY4JykudmFsKCkpO1xuXHRcdGNvbnN0IG5hbWUgPSB0aGlzLl90cmltKCQoJyNCQzRBQkNDMV8zOUY5XzIwMjBfNEI2NF8wQkM4NkREQTZCMTYnKS52YWwoKSk7XG5cdFx0Y29uc3QgcmFuayA9IHRoaXMuX3RyaW0oJCgnI0U3QzdCMTA2Xzg3NkFfNEI4QV8yQ0UyXzA4NEE5RTg5QkYzRScpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0Q2F0YWxvZyA9IHRoaXMuX3RyaW0oJCgnI0VDQUUxMThGX0JCRkJfNkY2OV81OTBGX0M2RjM4NjExRjhDMycpLnZhbCgpKTtcblx0XHRjb25zdCBkZWZhdWx0RW50aXR5ID0gdGhpcy5fdHJpbSgkKCcjRjcxRDE0NTJfODYxM181RkI1XzI3RDNfQzE1NDA1NzNGNDUwJykudmFsKCkpO1xuXHRcdGNvbnN0IGRlZmF1bHRQcmltYXJ5RmllbGQgPSB0aGlzLl90cmltKCQoJyNCQjg5QTQ3M18wODQyX0NCOEZfRTE0Nl9BNkNDRDhEM0YxNUUnKS52YWwoKSk7XG5cdFx0Y29uc3QgYXJjaGl2ZWQgPSAkKCcjQTJDNTRGMzNfQUM0NV8zNTUzXzg2RDZfNEE0NzlEMTBDRDU0JykucHJvcCgnY2hlY2tlZCcpID8gJzEnIDogJzAnO1xuXHRcdGNvbnN0IG1vcmUgPSAkKCcjQTNEODNCNDJfNEZCRl81REFFXzZBMzhfMTJGMUY1MzQ5M0I1JykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKTtcblxuXHRcdGNvbnN0IGRlZmF1bHRDQVRBTE9HID0gdGhpcy5fdHJpbShtb2RlID09PSAxID8gd2luZG93LnByb21wdCgnTmV3IGRlZmF1bHQgY2F0YWxvZycsIGRlZmF1bHRDYXRhbG9nKSA6IGRlZmF1bHRDYXRhbG9nKTtcblxuXHRcdGlmKCFncm91cFxuXHRcdCAgIHx8XG5cdFx0ICAgIW5hbWVcblx0XHQgICB8fFxuXHRcdCAgICFyYW5rXG5cdFx0ICAgfHxcblx0XHQgICAhZGVmYXVsdENhdGFsb2dcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0Q0FUQUxPR1xuXHRcdCAgIHx8XG5cdFx0ICAgIWRlZmF1bHRFbnRpdHlcblx0XHQgICB8fFxuXHRcdCAgICFkZWZhdWx0UHJpbWFyeUZpZWxkXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBrZXlzID0gW107XG5cdFx0Y29uc3QgY3JpdGVyaWEgPSB7fTtcblxuXHRcdCQoJyNGRUMzNjBGQV9FQzFEXzkwRENfRkZENV84QTQ5OENGNjAzMDUnKS5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0Y29uc3QgcGFydHMgPSBpdGVtLm5hbWUuc3BsaXQoJzo6Jyk7XG5cblx0XHRcdGlmKHBhcnRzLmxlbmd0aCA9PT0gMilcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qga2V5MSA9IHBhcnRzWzFdO1xuXHRcdFx0XHRjb25zdCBrZXkyID0gcGFydHNbMF07XG5cblx0XHRcdFx0aWYoIShrZXkxIGluIGNyaXRlcmlhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGtleXMucHVzaChrZXkxKTtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqLyBpZihrZXkyID09PSAndHlwZScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjcml0ZXJpYVtrZXkxXVtrZXkyXSA9IHBhcnNlSW50KGl0ZW0udmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoa2V5MiA9PT0gJ21vcmUnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSB0aGlzLl9wYXJzZUpzb24oaXRlbS52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3JpdGVyaWFba2V5MV1ba2V5Ml0gPSAobW9kZSA9PT0gMSAmJiBrZXkyID09PSAnY2F0YWxvZycgJiYgaXRlbS52YWx1ZSA9PT0gZGVmYXVsdENhdGFsb2cpID8gZGVmYXVsdENBVEFMT0dcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAoKGl0ZW0udmFsdWUpKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IE1PUkU7XG5cblx0XHR0cnkge1xuXHRcdFx0TU9SRSA9IEpTT04ucGFyc2UobW9yZSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpIHtcblx0XHRcdE1PUkUgPSB7LyotLS0tLS0tLS0tKi99O1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGpzb24gPSB7XG5cdFx0XHRkZWZhdWx0Q2F0YWxvZzogZGVmYXVsdENBVEFMT0csXG5cdFx0XHRkZWZhdWx0RW50aXR5OiBkZWZhdWx0RW50aXR5LFxuXHRcdFx0ZGVmYXVsdFByaW1hcnlGaWVsZDogZGVmYXVsdFByaW1hcnlGaWVsZCxcblx0XHRcdG1vcmU6IE1PUkUsXG5cdFx0XHRjcml0ZXJpYToga2V5cy5tYXAoa2V5ID0+IHsgaWYoIWNyaXRlcmlhW2tleV0ubmFtZSkgY3JpdGVyaWFba2V5XS5uYW1lID0gY3JpdGVyaWFba2V5XS5maWVsZDsgcmV0dXJuIGNyaXRlcmlhW2tleV07IH0pLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihtb2RlID09PSAyKVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKG51bGwsIG51bGwsICd0ZXh0Qm94JywgW3RoaXMuX2R1bXBKc29uKGpzb24pXSwge30pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zZXBhcmF0b3I9XCLCo1wiIC1rZXlGaWVsZHM9XCJncm91cMKjbmFtZVwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhncm91cCkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSArJ1wiJykuZG9uZSgoLyotLS0tLS0tLS0qLykgPT4ge1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkRWxlbWVudCAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX3NlYXJjaF9pbnRlcmZhY2VcIiAtc2VwYXJhdG9yPVwiwqNcIiAtZmllbGRzPVwiZ3JvdXDCo25hbWXCo3JhbmvCo2pzb27Co2FyY2hpdmVkXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGdyb3VwKSArICfCoycgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKG5hbWUpICsgJ8KjJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcocmFuaykgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSkgKyAnwqMnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhhcmNoaXZlZCkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoJyNDRkI2Q0ExMl8yRDQyXzMxMTFfMzE4M19FQzEwMDZGN0UwMzknKTtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgnI0NGQjZDQTEyXzJENDJfMzExMV8zMTgzX0VDMTAwNkY3RTAzOScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogR0xPQkFMIElOU1RBTkNFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3Qgc2VhcmNoTW9kZWxlckFwcCA9IG5ldyBTZWFyY2hNb2RlbGVyQXBwKCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
