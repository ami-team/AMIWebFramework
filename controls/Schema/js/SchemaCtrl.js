/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global joint, saveAs
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('SchemaCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/Schema/css/SchemaCtrl.css', amiWebApp.originURL + '/controls/Schema/twig/SchemaCtrl.twig', amiWebApp.originURL + '/controls/Schema/json/datatype.json',
    /**/
    amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
    /**/
    amiWebApp.originURL + '/js/3rd-party/lodash.min.js', amiWebApp.originURL + '/js/3rd-party/backbone-min.js',
    /**/
    amiWebApp.originURL + '/css/3rd-party/joint.min.css', amiWebApp.originURL + '/js/3rd-party/joint.min.js',
    /**/
    amiWebApp.originURL + '/controls/Schema/js/joint.shapes.sql.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[1]).done(function () {
        /*---------------------------------------------------------*/
        _this._fields = null;
        _this._foreignKeys = null;
        _this._currentCell = null;
        _this._currentCatalog = null;
        /*---------------------------------------------------------*/

        var L = ['<option value="@NULL">NONE</option>'];

        for (var dataType in data[2]) {
          L.push('<option value="' + amiWebApp.textToHtml(dataType) + '">' + amiWebApp.textToHtml(data[2][dataType]) + '</option>');
        }

        $('#CE54048D_702D_0132_4659_9E558BE2AC11').html(L.join('')).select2({
          allowClear: true,
          placeholder: 'Choose a media type',
          dropdownParent: $('#B0BEB5C7_8978_7433_F076_A55D2091777C .modal-body')
        });
        /*---------------------------------------------------------*/

        var M = ['<option value="@NULL">NONE</option>'];

        for (var controlName in amiWebApp._controls) {
          M.push('<option value="' + amiWebApp.textToHtml(controlName) + '">' + amiWebApp.textToHtml(controlName) + '</option>');
        }

        $('#F3F31D1D_6B74_F457_4FDC_1887A57ED3DF').html(M.join('')).select2({
          allowClear: true,
          placeholder: 'Choose a control',
          dropdownParent: $('#B0BEB5C7_8978_7433_F076_A55D2091777C .modal-body')
        });
        /*---------------------------------------------------------*/

        amiWebApp.loadResources([amiWebApp.originURL + '/js/3rd-party/codemirror/lib/codemirror.css', amiWebApp.originURL + '/js/3rd-party/codemirror/lib/codemirror.js', amiWebApp.originURL + '/js/3rd-party/codemirror/addon/edit/matchbrackets.js', amiWebApp.originURL + '/js/3rd-party/codemirror/mode/groovy/groovy.js']).done(function () {
          /*-----------------------------------------------------*/
          var editor = CodeMirror.fromTextArea(document.getElementById('E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F'), {
            lineNumbers: true,
            matchBrackets: true,
            mode: 'text/x-groovy'
          });
          /*-----------------------------------------------------*/

          $('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').data('editor', editor);
          /*-----------------------------------------------------*/

          $('#B0BEB5C7_8978_7433_F076_A55D2091777C').on('shown.bs.modal', function () {
            editor.refresh();
          });
          /*-----------------------------------------------------*/
        });
        /*---------------------------------------------------------*/
      });
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, settings) {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    var _amiWebApp$setup = amiWebApp.setup(['onFocus', 'onBlur'], [null, null], settings),
        _onFocus = _amiWebApp$setup[0],
        _onBlur = _amiWebApp$setup[1];

    this._onFocus = _onFocus;
    this._onBlur = _onBlur;
    /*-----------------------------------------------------------------*/

    var el1 = $(this._selector = selector);
    el1.css('box-shadow', '0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0 1px 5px rgba(0, 0, 0, 0.075)');
    el1.css('border', '1px solid rgb(231, 231, 231)');
    el1.css('border-radius', '4px');
    el1.css('overflow-x', 'scroll');
    el1.css('overflow-y', 'scroll');
    el1.css('padding', '10px');
    /*-----------------------------------------------------------------*/

    var el2 = $('<div class="ami-schema"></div>').appendTo(el1);
    /*-----------------------------------------------------------------*/

    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      model: this.graph,
      el: el2,
      width: 1,
      height: 1,
      gridSize: 5.0,
      drawGrid: {
        name: 'dot',
        args: [{
          color: 'red',
          scaleFactor: 2,
          thickness: 1
        }]
      }
    });
    /*-----------------------------------------------------------------*/

    this.paper.on({
      'cell:pointerclick': function cellPointerclick(cellView) {
        $('g[model-id]').removeClass('ami-schema-shadow').filter('[model-id="' + cellView.model.id + '"]').addClass('ami-schema-shadow');
        _this2._currentCell = cellView.model;

        if (_this2._onFocus) {
          _this2._onFocus(_this2._currentCell);
        }
      },
      'blank:pointerdown': function blankPointerdown(cellView) {
        $('g[model-id]').removeClass('ami-schema-shadow')
        /*---------------------------------------------------------------------------*/
        ;

        if (_this2._onBlur) {
          _this2._onBlur(_this2._currentCell);
        }

        _this2._currentCell =
        /*-*/
        null
        /*-*/
        ;
      }
    });
    /*-----------------------------------------------------------------*/

    return this.refresh(null, settings);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  fitToContent: function fitToContent() {
    this.paper.fitToContent({
      padding: 10,
      gridWidth: 10,
      gridHeight: 10,
      minWidth: this._width,
      minHeight: this._height
    });
  },

  /*---------------------------------------------------------------------*/
  _refresh: function _refresh(result, catalog, settings) {
    var _this3 = this;

    this._currentCatalog = catalog;

    var _amiWebApp$setup2 = amiWebApp.setup(['context', 'width', 'height', 'showShowTool', 'showEditTool'], [result, 2000, 2000, false, false], settings),
        context = _amiWebApp$setup2[0],
        _width = _amiWebApp$setup2[1],
        _height = _amiWebApp$setup2[2],
        _showShowTool = _amiWebApp$setup2[3],
        _showEditTool = _amiWebApp$setup2[4];

    this._width = _width;
    this._height = _height;
    this._showShowTool = _showShowTool;
    this._showEditTool = _showEditTool;
    /*-----------------------------------------------------------------*/

    if (!catalog) {
      result.resolveWith(context, [null]);
      return;
    }
    /*-----------------------------------------------------------------*/


    this.graph.clear();
    /*-----------------------------------------------------------------*/

    amiCommand.execute('GetJSONSchema -catalog="' + amiWebApp.textToString(catalog) + '"').done(function (data) {
      /*-------------------------------------------------------------*/

      /* GET SCHEMA                                                  */

      /*-------------------------------------------------------------*/
      var schema;

      try {
        schema = JSON.parse(amiWebApp.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
      } catch (e) {
        schema = {
          /*---------------------------------------------------------------------*/
        };
      }
      /*-------------------------------------------------------------*/

      /* GET COLUMNS                                                 */

      /*-------------------------------------------------------------*/


      var cnt = 0;
      var entities = {};

      _this3._fields.forEach(function (value) {
        if ((amiWebApp.jspath('..field{.@name==="externalCatalog"}.$', value)[0] || '') === catalog) {
          var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', value)[0] || '';
          var field = amiWebApp.jspath('..field{.@name==="field"}.$', value)[0] || '';
          var type = amiWebApp.jspath('..field{.@name==="type"}.$', value)[0] || '';
          var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', value)[0] || '';
          var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', value)[0] || '';
          var crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', value)[0] || '';
          var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', value)[0] || '';
          var created = amiWebApp.jspath('..field{.@name==="created"}.$', value)[0] || '';
          var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', value)[0] || '';
          var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', value)[0] || '';
          var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', value)[0] || '';

          if (!(entity in entities)) {
            var x;
            var y;
            var color;

            if (!(entity in schema)) {
              x = y = 20 + 10 * cnt++;
              color = '#0066CC';
            } else {
              x = schema[entity].x;
              y = schema[entity].y;
              color = schema[entity].color;
            }

            entities[entity] = {
              entity: _this3.graph.newEntity({
                position: {
                  x: x,
                  y: y
                },
                entity: entity,
                color: color,
                showShowTool: _this3._showShowTool,
                showEditTool: _this3._showEditTool
              }),
              fields: []
            };
          }

          if (!(field in entities[entity]['fields'])) {
            entities[entity]['entity'].appendField({
              field: field,
              type: type,
              hidden: hidden === 'true',
              adminOnly: adminOnly === 'true',
              crypted: crypted === 'true',
              primary: primary === 'true',
              created: created === 'true',
              createdBy: createdBy === 'true',
              modified: modified === 'true',
              modifiedBy: modifiedBy === 'true'
            });
          }
        }
      });
      /*-------------------------------------------------------------*/


      $(_this3._selector + ' a.sql-entity-show-link').click(function (e) {
        e.preventDefault();

        _this3.showEntity(catalog, $(e.currentTarget).attr('data-entity'));
      });
      /*-------------------------------------------------------------*/

      $(_this3._selector + ' a.sql-entity-edit-link').click(function (e) {
        e.preventDefault();

        _this3.editEntity(catalog, $(e.currentTarget).attr('data-entity'));
      });
      /*-------------------------------------------------------------*/

      $(_this3._selector + ' a.sql-field-link').click(function (e) {
        e.preventDefault();

        _this3.editField(catalog, $(e.currentTarget).attr('data-entity'), $(e.currentTarget).attr('data-field'));
      });
      /*-------------------------------------------------------------*/

      /* GET FKEYS                                                   */

      /*-------------------------------------------------------------*/

      _this3._foreignKeys.forEach(function (value) {
        if (amiWebApp.jspath('..field{.@name==="fkExternalCatalog"}.$', value)[0] === catalog && amiWebApp.jspath('..field{.@name==="pkExternalCatalog"}.$', value)[0] === catalog) {
          var fkEntity = amiWebApp.jspath('..field{.@name==="fkEntity"}.$', value)[0];
          var pkEntity = amiWebApp.jspath('..field{.@name==="pkEntity"}.$', value)[0];

          _this3.graph.newForeignKey(entities[fkEntity]['entity'].get('id'), entities[pkEntity]['entity'].get('id'));
        }
      });
      /*-------------------------------------------------------------*/

      /* FIT TO CONTENT                                              */

      /*-------------------------------------------------------------*/


      _this3.fitToContent();
      /*-------------------------------------------------------------*/


      result.resolveWith(context, [schema]);
    }).fail(function (data, message) {
      result.rejectWith(context, [message]);
    });
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh(catalog, settings) {
    var _this4 = this;

    var result = $.Deferred();
    amiCommand.execute('GetSchemas').always(function (data) {
      _this4._fields = amiWebApp.jspath('..rowset{.@type==="fields"}.row', data) || [];
      _this4._entities = amiWebApp.jspath('..rowset{.@type==="entities"}.row', data) || [];
      _this4._foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data) || [];

      _this4._refresh(result, catalog, settings);
    });
    return result.promise();
  },

  /*---------------------------------------------------------------------*/
  clear: function clear() {
    this.graph.clear();
    this.paper.setDimensions(1, 1);
  },

  /*---------------------------------------------------------------------*/
  getCurrentCell: function getCurrentCell() {
    return this._currentCell;
  },

  /*---------------------------------------------------------------------*/
  setJSON: function setJSON(json) {
    this.graph.fromJSON(json);
    this.fitToContent();
  },

  /*---------------------------------------------------------------------*/
  getJSON: function getJSON() {
    this.fitToContent();
    return this.graph.toJSON();
  },

  /*---------------------------------------------------------------------*/
  exportSchema: function exportSchema() {
    try {
      var json = JSON.stringify(this.getJSON(), null, 4);
      var blob = new Blob([json], {
        type: 'application/json',
        endings: 'native'
      });
      saveAs(blob, 'schema.json');
    } catch (e) {
      amiWebApp.error(e, true);
    }
  },

  /*---------------------------------------------------------------------*/
  printSchema: function printSchema() {
    /*-----------------------------------------------------------------*/
    var svg = $(this._selector + ' svg');
    /*-----------------------------------------------------------------*/

    var w = window.open('', '', 'height=' + svg.height() + ', width=' + svg.width() + ', toolbar=no');
    w.document.write('<html><head><style>body { margin: 10px; } .link-tools, .marker-vertices, .marker-arrowheads, .connection-wrap, .sql-entity-link { display: none; } .connection { fill: none; }</style></head><body>' + $('#C6DDFAF6_9E75_41C5_87BD_0896B5299559').html() + '</body></html>');
    $(w.document).find('svg').css('background-image', 'none');
    w.print();
    w.close();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  showEntity: function showEntity(catalog, entity) {
    window.open(amiWebApp.webAppURL + '?subapp=tableViewer&userdata=' + encodeURIComponent('{"catalog": "' + amiWebApp.textToString(catalog) + '", "entity": "' + amiWebApp.textToString(entity) + '"}'), '_blank').focus();
  },

  /*---------------------------------------------------------------------*/
  editEntity: function editEntity(catalog, entity) {
    if (amiLogin.hasRole('AMI_ADMIN') === false) {
      return;
    }

    amiCommand.execute('GetEntityInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '"').done(function (data) {
      $('#AF826BB7_E7A8_C5A8_711C_84D00F042418').text(catalog);
      $('#BA295CEC_F262_BB7F_09BF_4420E9EDBD6E').text(entity);
      $('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val(catalog);
      $('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val(entity);
      /**/

      var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', data)[0] || '999';
      var description = amiWebApp.jspath('..field{.@name==="description"}.$', data)[0] || 'N/A';
      var bridge = amiWebApp.jspath('..field{.@name==="bridge"}.$', data)[0] || 'false';
      var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', data)[0] || 'false';
      var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', data)[0] || 'false';
      /**/

      $('#F03DA19A_40CE_5C11_9712_A82917FB07AF').val(rank);
      $('#E831834E_1D7C_A0F7_B266_E5F5F9CB4F16').val(description);
      $('#E1B8F5B1_9BDD_D4A5_56B1_540534E17B09').prop('checked', bridge === 'true');
      $('#A7C3FA85_FE03_FC4F_04FB_D8F9C09430F1').prop('checked', hidden === 'true');
      $('#BFFD13C4_EAE9_D440_15AB_6005A941FB23').prop('checked', adminOnly === 'true');
      /**/

      $('#B7852284_B6C4_8ED5_502D_B8EA22689D2A').modal('show');
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  },

  /*---------------------------------------------------------------------*/
  editField: function editField(catalog, entity, field) {
    if (amiLogin.hasRole('AMI_ADMIN') === false) {
      return;
    }

    amiCommand.execute('GetFieldInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -field="' + amiWebApp.textToString(field) + '"').done(function (data) {
      $('#A1AA5034_F183_9365_2D09_DF80F1775C95').text(catalog);
      $('#C52644CB_45E9_586E_DF23_38DD69147735').text(entity);
      $('#DE6E9DB2_BFED_1783_A6F7_D8CAAFFEFDD0').text(field);
      $('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val(catalog);
      $('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val(entity);
      $('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val(field);
      /**/

      var rank = amiWebApp.jspath('..field{.@name==="rank"}.$', data)[0] || '999';
      var description = amiWebApp.jspath('..field{.@name==="description"}.$', data)[0] || 'N/A';
      var webLinkScript = amiWebApp.jspath('..field{.@name==="webLinkScript"}.$', data)[0] || '@NULL';
      var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', data)[0] || 'false';
      var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', data)[0] || 'false';
      var crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', data)[0] || 'false';
      var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', data)[0] || 'false';
      var readable = amiWebApp.jspath('..field{.@name==="readable"}.$', data)[0] || 'false';
      var automatic = amiWebApp.jspath('..field{.@name==="automatic"}.$', data)[0] || 'false';
      var created = amiWebApp.jspath('..field{.@name==="created"}.$', data)[0] || 'false';
      var createdBy = amiWebApp.jspath('..field{.@name==="createdBy"}.$', data)[0] || 'false';
      var modified = amiWebApp.jspath('..field{.@name==="modified"}.$', data)[0] || 'false';
      var modifiedBy = amiWebApp.jspath('..field{.@name==="modifiedBy"}.$', data)[0] || 'false';
      var statable = amiWebApp.jspath('..field{.@name==="statable"}.$', data)[0] || 'false';
      var groupable = amiWebApp.jspath('..field{.@name==="groupable"}.$', data)[0] || 'false';
      var displayable = amiWebApp.jspath('..field{.@name==="displayable"}.$', data)[0] || 'false';
      var base64 = amiWebApp.jspath('..field{.@name==="base64"}.$', data)[0] || 'false';
      var mime = amiWebApp.jspath('..field{.@name==="mime"}.$', data)[0] || '@NULL';
      var ctrl = amiWebApp.jspath('..field{.@name==="ctrl"}.$', data)[0] || '@NULL';
      /**/

      $('#C6CA88FD_548A_FE30_9871_AFE55362439B').val(rank);
      $('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val(description);
      $('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked', hidden === 'true');
      $('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked', adminOnly === 'true');
      $('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked', crypted === 'true');
      $('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked', primary === 'true');
      $('#D1D48065_3C6B_B0A0_BA7C_8A0D0AB84F55').prop('checked', readable === 'true');
      $('#EDEB0864_76FC_5FCC_C951_4F59AC5B54D2').prop('checked',
      /*--*/
      true
      /*--*/
      );
      $('#E747BF02_031E_A70D_9327_7A974FDF7E96').prop('checked', automatic === 'true');
      $('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked', created === 'true');
      $('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked', createdBy === 'true');
      $('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked', modified === 'true');
      $('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked', modifiedBy === 'true');
      $('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked', statable === 'true');
      $('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked', groupable === 'true');
      $('#B3F6E369_A7E4_26B6_C1EB_B2FC855C1B7A').prop('checked', displayable === 'true');
      $('#F592275B_2199_7962_D270_CBEE38B82DAF').prop('checked', base64 === 'true');
      $('#CE54048D_702D_0132_4659_9E558BE2AC11').val(mime).trigger('change.select2');
      $('#F3F31D1D_6B74_F457_4FDC_1887A57ED3DF').val(ctrl).trigger('change.select2');
      /**/

      $('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').data('editor').setValue(webLinkScript);
      /**/

      $('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('show');
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

SchemaCtrl.resetEntity = function () {
  /*---------------------------------------------------------------------*/
  if (!confirm('Please confirm...')) {
    return;
  }
  /*---------------------------------------------------------------------*/


  amiWebApp.lock();
  /*---------------------------------------------------------------------*/

  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_entity" -keyFields="catalog|entity" -keyValues="' + amiWebApp.textToString($('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val()) + '|' + amiWebApp.textToString($('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val()) + '"').done(function (data, message) {
    amiCommand.execute('FlushServerCaches').done(function () {
      $('#B7852284_B6C4_8ED5_502D_B8EA22689D2A').modal('hide');
      amiWebApp.success(message + ', please reload the page', true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true);
  });
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/


SchemaCtrl.applyEntity = function () {
  /*---------------------------------------------------------------------*/
  if (!confirm('Please confirm...')) {
    return;
  }
  /*---------------------------------------------------------------------*/


  var json = {
    'bridge': $('#E1B8F5B1_9BDD_D4A5_56B1_540534E17B09').prop('checked'),
    'hidden': $('#A7C3FA85_FE03_FC4F_04FB_D8F9C09430F1').prop('checked'),
    'adminOnly': $('#BFFD13C4_EAE9_D440_15AB_6005A941FB23').prop('checked')
  };
  /*---------------------------------------------------------------------*/

  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_entity" -keyFields="catalog|entity" -keyValues="' + amiWebApp.textToString($('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val()) + '|' + amiWebApp.textToString($('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val()) + '"').done(function (data, message) {
    amiCommand.execute(
    /**/
    'AddElement -separator="|" -catalog="self" -entity="router_entity" -fields="catalog|entity|rank|json|description" -values="' + amiWebApp.textToString($('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val()) + '|' + amiWebApp.textToString($('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val()) + '|' + amiWebApp.textToString($('#F03DA19A_40CE_5C11_9712_A82917FB07AF').val()) + '|' + amiWebApp.textToString(JSON.stringify(json)) + '|' + amiWebApp.textToString($('#E831834E_1D7C_A0F7_B266_E5F5F9CB4F16').val()) + '"').done(function (data, message) {
      amiCommand.execute('FlushServerCaches').done(function () {
        $('#B7852284_B6C4_8ED5_502D_B8EA22689D2A').modal('hide');
        amiWebApp.success(message + ', please reload the page', true);
      }).fail(function (data, message) {
        amiWebApp.error(message, true);
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true);
  });
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/


SchemaCtrl.resetField = function () {
  /*---------------------------------------------------------------------*/
  if (!confirm('Please confirm...')) {
    return;
  }
  /*---------------------------------------------------------------------*/


  amiWebApp.lock();
  /*---------------------------------------------------------------------*/

  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_field" -keyFields="catalog|entity|field" -keyValues="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '"').done(function (data, message) {
    amiCommand.execute('FlushServerCaches').done(function () {
      $('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');
      amiWebApp.success(message + ', please reload the page', true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true);
  });
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/


SchemaCtrl.applyField = function () {
  /*---------------------------------------------------------------------*/
  if (!confirm('Please confirm...')) {
    return;
  }
  /*---------------------------------------------------------------------*/


  var json = {
    'hidden': $('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked'),
    'adminOnly': $('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked'),
    'crypted': $('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked'),
    'primary': $('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked'),
    'readable': $('#D1D48065_3C6B_B0A0_BA7C_8A0D0AB84F55').prop('checked'),
    'automatic': $('#E747BF02_031E_A70D_9327_7A974FDF7E96').prop('checked'),
    'created': $('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked'),
    'createdBy': $('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked'),
    'modified': $('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked'),
    'modifiedBy': $('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked'),
    'statable': $('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked'),
    'groupable': $('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked'),
    'displayable': $('#B3F6E369_A7E4_26B6_C1EB_B2FC855C1B7A').prop('checked'),
    'base64': $('#F592275B_2199_7962_D270_CBEE38B82DAF').prop('checked'),
    'mime': $('#CE54048D_702D_0132_4659_9E558BE2AC11').val(),
    'ctrl': $('#F3F31D1D_6B74_F457_4FDC_1887A57ED3DF').val(),
    'webLinkScript': $('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').data('editor').getValue()
  };

  if (!json.mime || json.mime.toUpperCase() === '@NULL') {
    json.mime = null;
  }

  if (!json.ctrl || json.ctrl.toUpperCase() === '@NULL') {
    json.ctrl = null;
  }

  if (!json.webLinkScript || json.webLinkScript.toUpperCase() === '@NULL') {
    json.webLinkScript = null;
  }
  /*---------------------------------------------------------------------*/


  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_field" -keyFields="catalog|entity|field" -keyValues="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '"').done(function (data, message) {
    amiCommand.execute(
    /**/
    'AddElement -separator="|" -catalog="self" -entity="router_field" -fields="catalog|entity|field|rank|json|description" -values="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '|' + amiWebApp.textToString($('#C6CA88FD_548A_FE30_9871_AFE55362439B').val()) + '|' + amiWebApp.textToString(JSON.stringify(json)) + '|' + amiWebApp.textToString($('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val()) + '"').done(function (data, message) {
      amiCommand.execute('FlushServerCaches').done(function () {
        $('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');
        amiWebApp.success(message + ', please reload the page', true);
      }).fail(function (data, message) {
        amiWebApp.error(message, true);
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true);
  });
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjaGVtYUN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImRvbmUiLCJkYXRhIiwiYXBwZW5kSFRNTCIsIl9maWVsZHMiLCJfZm9yZWlnbktleXMiLCJfY3VycmVudENlbGwiLCJfY3VycmVudENhdGFsb2ciLCJMIiwiZGF0YVR5cGUiLCJwdXNoIiwidGV4dFRvSHRtbCIsIiQiLCJodG1sIiwiam9pbiIsInNlbGVjdDIiLCJhbGxvd0NsZWFyIiwicGxhY2Vob2xkZXIiLCJkcm9wZG93blBhcmVudCIsIk0iLCJjb250cm9sTmFtZSIsIl9jb250cm9scyIsImVkaXRvciIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJzZXR1cCIsIl9vbkZvY3VzIiwiX29uQmx1ciIsImVsMSIsIl9zZWxlY3RvciIsImNzcyIsImVsMiIsImFwcGVuZFRvIiwiZ3JhcGgiLCJqb2ludCIsImRpYSIsIkdyYXBoIiwicGFwZXIiLCJQYXBlciIsIm1vZGVsIiwiZWwiLCJ3aWR0aCIsImhlaWdodCIsImdyaWRTaXplIiwiZHJhd0dyaWQiLCJuYW1lIiwiYXJncyIsImNvbG9yIiwic2NhbGVGYWN0b3IiLCJ0aGlja25lc3MiLCJjZWxsVmlldyIsInJlbW92ZUNsYXNzIiwiZmlsdGVyIiwiaWQiLCJhZGRDbGFzcyIsImZpdFRvQ29udGVudCIsInBhZGRpbmciLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0IiwibWluV2lkdGgiLCJfd2lkdGgiLCJtaW5IZWlnaHQiLCJfaGVpZ2h0IiwiX3JlZnJlc2giLCJyZXN1bHQiLCJjYXRhbG9nIiwiY29udGV4dCIsIl9zaG93U2hvd1Rvb2wiLCJfc2hvd0VkaXRUb29sIiwicmVzb2x2ZVdpdGgiLCJjbGVhciIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwidGV4dFRvU3RyaW5nIiwic2NoZW1hIiwiSlNPTiIsInBhcnNlIiwianNwYXRoIiwiZSIsImNudCIsImVudGl0aWVzIiwiZm9yRWFjaCIsInZhbHVlIiwiZW50aXR5IiwiZmllbGQiLCJ0eXBlIiwiaGlkZGVuIiwiYWRtaW5Pbmx5IiwiY3J5cHRlZCIsInByaW1hcnkiLCJjcmVhdGVkIiwiY3JlYXRlZEJ5IiwibW9kaWZpZWQiLCJtb2RpZmllZEJ5IiwieCIsInkiLCJuZXdFbnRpdHkiLCJwb3NpdGlvbiIsInNob3dTaG93VG9vbCIsInNob3dFZGl0VG9vbCIsImZpZWxkcyIsImFwcGVuZEZpZWxkIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsInNob3dFbnRpdHkiLCJjdXJyZW50VGFyZ2V0IiwiYXR0ciIsImVkaXRFbnRpdHkiLCJlZGl0RmllbGQiLCJma0VudGl0eSIsInBrRW50aXR5IiwibmV3Rm9yZWlnbktleSIsImdldCIsImZhaWwiLCJtZXNzYWdlIiwicmVqZWN0V2l0aCIsIkRlZmVycmVkIiwiYWx3YXlzIiwiX2VudGl0aWVzIiwicHJvbWlzZSIsInNldERpbWVuc2lvbnMiLCJnZXRDdXJyZW50Q2VsbCIsInNldEpTT04iLCJqc29uIiwiZnJvbUpTT04iLCJnZXRKU09OIiwidG9KU09OIiwiZXhwb3J0U2NoZW1hIiwic3RyaW5naWZ5IiwiYmxvYiIsIkJsb2IiLCJlbmRpbmdzIiwic2F2ZUFzIiwiZXJyb3IiLCJwcmludFNjaGVtYSIsInN2ZyIsInciLCJ3aW5kb3ciLCJvcGVuIiwid3JpdGUiLCJmaW5kIiwicHJpbnQiLCJjbG9zZSIsIndlYkFwcFVSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsImZvY3VzIiwiYW1pTG9naW4iLCJoYXNSb2xlIiwidGV4dCIsInZhbCIsInJhbmsiLCJkZXNjcmlwdGlvbiIsImJyaWRnZSIsInByb3AiLCJtb2RhbCIsIndlYkxpbmtTY3JpcHQiLCJyZWFkYWJsZSIsImF1dG9tYXRpYyIsInN0YXRhYmxlIiwiZ3JvdXBhYmxlIiwiZGlzcGxheWFibGUiLCJiYXNlNjQiLCJtaW1lIiwiY3RybCIsInRyaWdnZXIiLCJzZXRWYWx1ZSIsIlNjaGVtYUN0cmwiLCJyZXNldEVudGl0eSIsImNvbmZpcm0iLCJsb2NrIiwic3VjY2VzcyIsImFwcGx5RW50aXR5IiwicmVzZXRGaWVsZCIsImFwcGx5RmllbGQiLCJnZXRWYWx1ZSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBRUFBLFNBQVMsQ0FBQyxZQUFELEVBQWU7QUFDdkI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSFM7O0FBS3ZCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVZzQjs7QUFZdkI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsV0FBT0MsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsR0FBc0IscUNBRFEsRUFFOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix1Q0FGUSxFQUc5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLHFDQUhRO0FBSTlCO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixnQ0FMUTtBQU05QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsNkJBUFEsRUFROUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQiwrQkFSUTtBQVM5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsOEJBVlEsRUFXOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQiw0QkFYUTtB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LEVBQXlCLElBQXpCO0FBQ0EsS0FoQkQ7QUFrQkEsR0FwQkQsRUFvQkdELElBcEJILENBb0JRLFVBQUN6SCxJQUFELEVBQU8wSCxPQUFQLEVBQW1CO0FBRTFCOUgsSUFBQUEsU0FBUyxDQUFDaUosS0FBVixDQUFnQm5CLE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsR0F2QkQ7QUF5QkE7QUFDQSxDQXZFRDtBQXlFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIGpvaW50LCBzYXZlQXNcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTY2hlbWFDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvU2NoZW1hL2Nzcy9TY2hlbWFDdHJsLmNzcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TY2hlbWEvdHdpZy9TY2hlbWFDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvU2NoZW1hL2pzb24vZGF0YXR5cGUuanNvbicsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvZmlsZXNhdmVyLm1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvbG9kYXNoLm1pbi5qcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvYmFja2JvbmUtbWluLmpzJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2Nzcy8zcmQtcGFydHkvam9pbnQubWluLmNzcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvam9pbnQubWluLmpzJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1NjaGVtYS9qcy9qb2ludC5zaGFwZXMuc3FsLmpzJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVsxXSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuX2ZpZWxkcyA9IG51bGw7XG5cdFx0XHRcdHRoaXMuX2ZvcmVpZ25LZXlzID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLl9jdXJyZW50Q2VsbCA9IG51bGw7XG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRDYXRhbG9nID0gbnVsbDtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IEwgPSBbJzxvcHRpb24gdmFsdWU9XCJATlVMTFwiPk5PTkU8L29wdGlvbj4nXTtcblxuXHRcdFx0XHRmb3IobGV0IGRhdGFUeXBlIGluIGRhdGFbMl0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZGF0YVR5cGUpICsgJ1wiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChkYXRhWzJdW2RhdGFUeXBlXSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCcjQ0U1NDA0OERfNzAyRF8wMTMyXzQ2NTlfOUU1NThCRTJBQzExJykuaHRtbChMLmpvaW4oJycpKS5zZWxlY3QyKHtcblx0XHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlLFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyOiAnQ2hvb3NlIGEgbWVkaWEgdHlwZScsXG5cdFx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICQoJyNCMEJFQjVDN184OTc4Xzc0MzNfRjA3Nl9BNTVEMjA5MTc3N0MgLm1vZGFsLWJvZHknKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IE0gPSBbJzxvcHRpb24gdmFsdWU9XCJATlVMTFwiPk5PTkU8L29wdGlvbj4nXTtcblxuXHRcdFx0XHRmb3IobGV0IGNvbnRyb2xOYW1lIGluIGFtaVdlYkFwcC5fY29udHJvbHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRNLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY29udHJvbE5hbWUpICsgJ1wiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjb250cm9sTmFtZSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkKCcjRjNGMzFEMURfNkI3NF9GNDU3XzRGRENfMTg4N0E1N0VEM0RGJykuaHRtbChNLmpvaW4oJycpKS5zZWxlY3QyKHtcblx0XHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlLFxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyOiAnQ2hvb3NlIGEgY29udHJvbCcsXG5cdFx0XHRcdFx0ZHJvcGRvd25QYXJlbnQ6ICQoJyNCMEJFQjVDN184OTc4Xzc0MzNfRjA3Nl9BNTVEMjA5MTc3N0MgLm1vZGFsLWJvZHknKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzcycsXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuanMnLFxuXHRcdFx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2FkZG9uL2VkaXQvbWF0Y2hicmFja2V0cy5qcycsXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbW9kZS9ncm9vdnkvZ3Jvb3Z5LmpzJyxcblx0XHRcdFx0XSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IGVkaXRvciA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFNEZFNERGNF9GMTcxXzE0NjdfMDdFRF84QkI3RTBGRkMxNUYnKSwge1xuXHRcdFx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXG5cdFx0XHRcdFx0XHRtYXRjaEJyYWNrZXRzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bW9kZTogJ3RleHQveC1ncm9vdnknLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjRTRGRTRERjRfRjE3MV8xNDY3XzA3RURfOEJCN0UwRkZDMTVGJykuZGF0YSgnZWRpdG9yJywgZWRpdG9yKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0IwQkVCNUM3Xzg5NzhfNzQzM19GMDc2X0E1NUQyMDkxNzc3QycpLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdFx0ZWRpdG9yLnJlZnJlc2goKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbihzZWxlY3Rvciwgc2V0dGluZ3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtfb25Gb2N1cywgX29uQmx1cl0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ29uRm9jdXMnLCAnb25CbHVyJ10sXG5cdFx0XHRbbnVsbCwgbnVsbF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHR0aGlzLl9vbkZvY3VzID0gX29uRm9jdXM7XG5cdFx0dGhpcy5fb25CbHVyID0gX29uQmx1cjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGVsMSA9ICQodGhpcy5fc2VsZWN0b3IgPSBzZWxlY3Rvcik7XG5cblx0XHRlbDEuY3NzKCdib3gtc2hhZG93JywgJzBweCAxcHggMHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgaW5zZXQsIDAgMXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMDc1KScpO1xuXHRcdGVsMS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgcmdiKDIzMSwgMjMxLCAyMzEpJyk7XG5cdFx0ZWwxLmNzcygnYm9yZGVyLXJhZGl1cycsICc0cHgnKTtcblx0XHRlbDEuY3NzKCdvdmVyZmxvdy14JywgJ3Njcm9sbCcpO1xuXHRcdGVsMS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XG5cdFx0ZWwxLmNzcygncGFkZGluZycsICcxMHB4Jyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBlbDIgPSAkKCc8ZGl2IGNsYXNzPVwiYW1pLXNjaGVtYVwiPjwvZGl2PicpLmFwcGVuZFRvKGVsMSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZ3JhcGggPSBuZXcgam9pbnQuZGlhLkdyYXBoKCk7XG5cblx0XHR0aGlzLnBhcGVyID0gbmV3IGpvaW50LmRpYS5QYXBlcih7XG5cdFx0XHRtb2RlbDogdGhpcy5ncmFwaCxcblx0XHRcdGVsOiBlbDIsXG5cdFx0XHR3aWR0aDogMSxcblx0XHRcdGhlaWdodDogMSxcblx0XHRcdGdyaWRTaXplOiA1LjAsXG5cdFx0XHRkcmF3R3JpZDoge1xuXHRcdFx0XHRuYW1lOiAnZG90Jyxcblx0XHRcdFx0YXJnczogW1xuXHRcdFx0XHRcdHtjb2xvcjogJ3JlZCcsIHNjYWxlRmFjdG9yOiAyLCB0aGlja25lc3M6IDF9LFxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucGFwZXIub24oe1xuXHRcdFx0J2NlbGw6cG9pbnRlcmNsaWNrJzogKGNlbGxWaWV3KSA9PiB7XG5cblx0XHRcdFx0JCgnZ1ttb2RlbC1pZF0nKS5yZW1vdmVDbGFzcygnYW1pLXNjaGVtYS1zaGFkb3cnKS5maWx0ZXIoJ1ttb2RlbC1pZD1cIicgKyBjZWxsVmlldy5tb2RlbC5pZCArICdcIl0nKS5hZGRDbGFzcygnYW1pLXNjaGVtYS1zaGFkb3cnKTtcblxuXHRcdFx0XHR0aGlzLl9jdXJyZW50Q2VsbCA9IGNlbGxWaWV3Lm1vZGVsO1xuXG5cdFx0XHRcdGlmKHRoaXMuX29uRm9jdXMpIHtcblx0XHRcdFx0XHR0aGlzLl9vbkZvY3VzKHRoaXMuX2N1cnJlbnRDZWxsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdibGFuazpwb2ludGVyZG93bic6IChjZWxsVmlldykgPT4ge1xuXG5cdFx0XHRcdCQoJ2dbbW9kZWwtaWRdJykucmVtb3ZlQ2xhc3MoJ2FtaS1zY2hlbWEtc2hhZG93JykvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovO1xuXG5cdFx0XHRcdGlmKHRoaXMuX29uQmx1cikge1xuXHRcdFx0XHRcdHRoaXMuX29uQmx1cih0aGlzLl9jdXJyZW50Q2VsbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9jdXJyZW50Q2VsbCA9IC8qLSovbnVsbC8qLSovO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5yZWZyZXNoKG51bGwsIHNldHRpbmdzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaXRUb0NvbnRlbnQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMucGFwZXIuZml0VG9Db250ZW50KHtcblx0XHRcdHBhZGRpbmc6IDEwLFxuXHRcdFx0Z3JpZFdpZHRoOiAxMCxcblx0XHRcdGdyaWRIZWlnaHQ6IDEwLFxuXHRcdFx0bWluV2lkdGg6IHRoaXMuX3dpZHRoLFxuXHRcdFx0bWluSGVpZ2h0OiB0aGlzLl9oZWlnaHQsXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZWZyZXNoOiBmdW5jdGlvbihyZXN1bHQsIGNhdGFsb2csIHNldHRpbmdzKVxuXHR7XG5cdFx0dGhpcy5fY3VycmVudENhdGFsb2cgPSBjYXRhbG9nO1xuXG5cdFx0Y29uc3QgW2NvbnRleHQsIF93aWR0aCwgX2hlaWdodCwgX3Nob3dTaG93VG9vbCwgX3Nob3dFZGl0VG9vbF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3Nob3dTaG93VG9vbCcsICdzaG93RWRpdFRvb2wnXSxcblx0XHRcdFtyZXN1bHQsIDIwMDAsIDIwMDAsIGZhbHNlLCBmYWxzZV0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHR0aGlzLl93aWR0aCA9IF93aWR0aDtcblx0XHR0aGlzLl9oZWlnaHQgPSBfaGVpZ2h0O1xuXG5cdFx0dGhpcy5fc2hvd1Nob3dUb29sID0gX3Nob3dTaG93VG9vbDtcblx0XHR0aGlzLl9zaG93RWRpdFRvb2wgPSBfc2hvd0VkaXRUb29sO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighY2F0YWxvZylcblx0XHR7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW251bGxdKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5ncmFwaC5jbGVhcigpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEpTT05TY2hlbWEgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBTQ0hFTUEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgc2NoZW1hO1xuXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0c2NoZW1hID0gSlNPTi5wYXJzZShhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgZGF0YSlbMF0gfHwgJ3t9Jyk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaChlKVxuXHRcdFx0e1xuXHRcdFx0XHRzY2hlbWEgPSB7LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL307XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgQ09MVU1OUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IGNudCA9IDA7XG5cblx0XHRcdGxldCBlbnRpdGllcyA9IHt9O1xuXG5cdFx0XHR0aGlzLl9maWVsZHMuZm9yRWFjaCgodmFsdWUpID0+IHtcblxuXHRcdFx0XHRpZigoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgdmFsdWUpWzBdIHx8ICcnKSA9PT0gY2F0YWxvZylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGVudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJlbnRpdHlcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJmaWVsZFwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IHR5cGUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwidHlwZVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGhpZGRlbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJoaWRkZW5cIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBhZG1pbk9ubHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYWRtaW5Pbmx5XCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgY3J5cHRlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcnlwdGVkXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgcHJpbWFyeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJwcmltYXJ5XCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgY3JlYXRlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgY3JlYXRlZEJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyZWF0ZWRCeVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IG1vZGlmaWVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1vZGlmaWVkXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgbW9kaWZpZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZEJ5XCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cblx0XHRcdFx0XHRpZighKGVudGl0eSBpbiBlbnRpdGllcykpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGV0IHg7XG5cdFx0XHRcdFx0XHRsZXQgeTtcblx0XHRcdFx0XHRcdGxldCBjb2xvcjtcblxuXHRcdFx0XHRcdFx0aWYoIShlbnRpdHkgaW4gc2NoZW1hKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0eCA9IHlcblx0XHRcdFx0XHRcdFx0ICA9IDIwICsgMTAgKiBjbnQrKztcblx0XHRcdFx0XHRcdFx0Y29sb3IgPSAnIzAwNjZDQyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHggPSBzY2hlbWFbZW50aXR5XS54O1xuXHRcdFx0XHRcdFx0XHR5ID0gc2NoZW1hW2VudGl0eV0ueTtcblx0XHRcdFx0XHRcdFx0Y29sb3IgPSBzY2hlbWFbZW50aXR5XS5jb2xvcjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0ZW50aXRpZXNbZW50aXR5XSA9IHtcblx0XHRcdFx0XHRcdFx0ZW50aXR5OiB0aGlzLmdyYXBoLm5ld0VudGl0eSh7XG5cdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0XHRcdFx0XHRcdHg6IHgsXG5cdFx0XHRcdFx0XHRcdFx0XHR5OiB5LFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0ZW50aXR5OiBlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFx0Y29sb3I6IGNvbG9yLFxuXHRcdFx0XHRcdFx0XHRcdHNob3dTaG93VG9vbDogdGhpcy5fc2hvd1Nob3dUb29sLFxuXHRcdFx0XHRcdFx0XHRcdHNob3dFZGl0VG9vbDogdGhpcy5fc2hvd0VkaXRUb29sLFxuXHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0ZmllbGRzOiBbXSxcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIShmaWVsZCBpbiBlbnRpdGllc1tlbnRpdHldWydmaWVsZHMnXSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZW50aXRpZXNbZW50aXR5XVsnZW50aXR5J10uYXBwZW5kRmllbGQoe1xuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGQsXG5cdFx0XHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0XHRcdGhpZGRlbjogaGlkZGVuID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdGFkbWluT25seTogYWRtaW5Pbmx5ID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdGNyeXB0ZWQ6IGNyeXB0ZWQgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0cHJpbWFyeTogcHJpbWFyeSA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRjcmVhdGVkOiBjcmVhdGVkID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZWRCeTogY3JlYXRlZEJ5ID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdG1vZGlmaWVkOiBtb2RpZmllZCA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRtb2RpZmllZEJ5OiBtb2RpZmllZEJ5ID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMuX3NlbGVjdG9yICsgJyBhLnNxbC1lbnRpdHktc2hvdy1saW5rJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0dGhpcy5zaG93RW50aXR5KFxuXHRcdFx0XHRcdGNhdGFsb2dcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMuX3NlbGVjdG9yICsgJyBhLnNxbC1lbnRpdHktZWRpdC1saW5rJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0dGhpcy5lZGl0RW50aXR5KFxuXHRcdFx0XHRcdGNhdGFsb2dcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMuX3NlbGVjdG9yICsgJyBhLnNxbC1maWVsZC1saW5rJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0dGhpcy5lZGl0RmllbGQoXG5cdFx0XHRcdFx0Y2F0YWxvZ1xuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1lbnRpdHknKVxuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1maWVsZCcpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBGS0VZUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLl9mb3JlaWduS2V5cy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXG5cdFx0XHRcdGlmKGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJma0V4dGVybmFsQ2F0YWxvZ1wifS4kJywgdmFsdWUpWzBdID09PSBjYXRhbG9nXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJwa0V4dGVybmFsQ2F0YWxvZ1wifS4kJywgdmFsdWUpWzBdID09PSBjYXRhbG9nXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRjb25zdCBma0VudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJma0VudGl0eVwifS4kJywgdmFsdWUpWzBdO1xuXHRcdFx0XHRcdGNvbnN0IHBrRW50aXR5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInBrRW50aXR5XCJ9LiQnLCB2YWx1ZSlbMF07XG5cblx0XHRcdFx0XHR0aGlzLmdyYXBoLm5ld0ZvcmVpZ25LZXkoXG5cdFx0XHRcdFx0XHRlbnRpdGllc1tma0VudGl0eV1bJ2VudGl0eSddLmdldCgnaWQnKSxcblx0XHRcdFx0XHRcdGVudGl0aWVzW3BrRW50aXR5XVsnZW50aXR5J10uZ2V0KCdpZCcpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGSVQgVE8gQ09OVEVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5maXRUb0NvbnRlbnQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtzY2hlbWFdKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVmcmVzaDogZnVuY3Rpb24oY2F0YWxvZywgc2V0dGluZ3MpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRTY2hlbWFzJykuYWx3YXlzKChkYXRhKSA9PiB7XG5cblx0XHRcdHRoaXMuX2ZpZWxkcyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZmllbGRzXCJ9LnJvdycsIGRhdGEpIHx8IFtdO1xuXHRcdFx0dGhpcy5fZW50aXRpZXMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImVudGl0aWVzXCJ9LnJvdycsIGRhdGEpIHx8IFtdO1xuXHRcdFx0dGhpcy5fZm9yZWlnbktleXMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImZvcmVpZ25LZXlzXCJ9LnJvdycsIGRhdGEpIHx8IFtdO1xuXG5cdFx0XHR0aGlzLl9yZWZyZXNoKHJlc3VsdCwgY2F0YWxvZywgc2V0dGluZ3MpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNsZWFyOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLmdyYXBoLmNsZWFyKCk7XG5cblx0XHR0aGlzLnBhcGVyLnNldERpbWVuc2lvbnMoMSwgMSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEN1cnJlbnRDZWxsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudENlbGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldEpTT046IGZ1bmN0aW9uKGpzb24pXG5cdHtcblx0XHR0aGlzLmdyYXBoLmZyb21KU09OKGpzb24pO1xuXG5cdFx0dGhpcy5maXRUb0NvbnRlbnQoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SlNPTjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5maXRUb0NvbnRlbnQoKTtcblxuXHRcdHJldHVybiB0aGlzLmdyYXBoLnRvSlNPTigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRleHBvcnRTY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmdldEpTT04oKSwgbnVsbCwgNCk7XG5cblx0XHRcdGxldCBibG9iID0gbmV3IEJsb2IoW2pzb25dLCB7XG5cdFx0XHRcdHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHRcdFx0ZW5kaW5ncyA6ICduYXRpdmUnLFxuXHRcdFx0fSk7XG5cblx0XHRcdHNhdmVBcyhibG9iLCAnc2NoZW1hLmpzb24nKTtcblx0XHR9XG5cdFx0Y2F0Y2goZSlcblx0XHR7XG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IoZSwgdHJ1ZSk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcmludFNjaGVtYTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgc3ZnID0gJCh0aGlzLl9zZWxlY3RvciArICcgc3ZnJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCB3ID0gd2luZG93Lm9wZW4oJycsICcnLCAnaGVpZ2h0PScgKyBzdmcuaGVpZ2h0KCkgKyAnLCB3aWR0aD0nICsgc3ZnLndpZHRoKCkgKyAnLCB0b29sYmFyPW5vJyk7XG5cblx0XHR3LmRvY3VtZW50LndyaXRlKCc8aHRtbD48aGVhZD48c3R5bGU+Ym9keSB7IG1hcmdpbjogMTBweDsgfSAubGluay10b29scywgLm1hcmtlci12ZXJ0aWNlcywgLm1hcmtlci1hcnJvd2hlYWRzLCAuY29ubmVjdGlvbi13cmFwLCAuc3FsLWVudGl0eS1saW5rIHsgZGlzcGxheTogbm9uZTsgfSAuY29ubmVjdGlvbiB7IGZpbGw6IG5vbmU7IH08L3N0eWxlPjwvaGVhZD48Ym9keT4nICsgJCgnI0M2RERGQUY2XzlFNzVfNDFDNV84N0JEXzA4OTZCNTI5OTU1OScpLmh0bWwoKSArICc8L2JvZHk+PC9odG1sPicpO1xuXG5cdFx0JCh3LmRvY3VtZW50KS5maW5kKCdzdmcnKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbm9uZScpO1xuXG5cdFx0dy5wcmludCgpO1xuXHRcdHcuY2xvc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93RW50aXR5OiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHkpXG5cdHtcblx0XHR3aW5kb3cub3BlbihhbWlXZWJBcHAud2ViQXBwVVJMICsgJz9zdWJhcHA9dGFibGVWaWV3ZXImdXNlcmRhdGE9JyArIGVuY29kZVVSSUNvbXBvbmVudCgne1wiY2F0YWxvZ1wiOiBcIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiLCBcImVudGl0eVwiOiBcIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCJ9JyksICdfYmxhbmsnKS5mb2N1cygpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0RW50aXR5OiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHkpXG5cdHtcblx0XHRpZihhbWlMb2dpbi5oYXNSb2xlKCdBTUlfQURNSU4nKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0RW50aXR5SW5mbyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQkKCcjQUY4MjZCQjdfRTdBOF9DNUE4XzcxMUNfODREMDBGMDQyNDE4JykudGV4dChjYXRhbG9nKTtcblx0XHRcdCQoJyNCQTI5NUNFQ19GMjYyX0JCN0ZfMDlCRl80NDIwRTlFREJENkUnKS50ZXh0KGVudGl0eSk7XG5cblx0XHRcdCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoY2F0YWxvZyk7XG5cdFx0XHQkKCcjRTFFOEE0RDRfMEY4M18zOUM0X0VGREZfRDY4NzQ3OUM2QjI1JykudmFsKGVudGl0eSk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0Y29uc3QgcmFuayA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyYW5rXCJ9LiQnLCBkYXRhKVswXSB8fCAnOTk5Jztcblx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImRlc2NyaXB0aW9uXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblxuXHRcdFx0Y29uc3QgYnJpZGdlID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImJyaWRnZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGhpZGRlbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJoaWRkZW5cIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBhZG1pbk9ubHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYWRtaW5Pbmx5XCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdCQoJyNGMDNEQTE5QV80MENFXzVDMTFfOTcxMl9BODI5MTdGQjA3QUYnKS52YWwocmFuayk7XG5cdFx0XHQkKCcjRTgzMTgzNEVfMUQ3Q19BMEY3X0IyNjZfRTVGNUY5Q0I0RjE2JykudmFsKGRlc2NyaXB0aW9uKTtcblxuXHRcdFx0JCgnI0UxQjhGNUIxXzlCRERfRDRBNV81NkIxXzU0MDUzNEUxN0IwOScpLnByb3AoJ2NoZWNrZWQnLCBicmlkZ2UgPT09ICd0cnVlJyk7XG5cblx0XHRcdCQoJyNBN0MzRkE4NV9GRTAzX0ZDNEZfMDRGQl9EOEY5QzA5NDMwRjEnKS5wcm9wKCdjaGVja2VkJywgaGlkZGVuID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0JGRkQxM0M0X0VBRTlfRDQ0MF8xNUFCXzYwMDVBOTQxRkIyMycpLnByb3AoJ2NoZWNrZWQnLCBhZG1pbk9ubHkgPT09ICd0cnVlJyk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0I3ODUyMjg0X0I2QzRfOEVENV81MDJEX0I4RUEyMjY4OUQyQScpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdEZpZWxkOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0aWYoYW1pTG9naW4uaGFzUm9sZSgnQU1JX0FETUlOJykgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEZpZWxkSW5mbyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1maWVsZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpZWxkKSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0JCgnI0ExQUE1MDM0X0YxODNfOTM2NV8yRDA5X0RGODBGMTc3NUM5NScpLnRleHQoY2F0YWxvZyk7XG5cdFx0XHQkKCcjQzUyNjQ0Q0JfNDVFOV81ODZFX0RGMjNfMzhERDY5MTQ3NzM1JykudGV4dChlbnRpdHkpO1xuXHRcdFx0JCgnI0RFNkU5REIyX0JGRURfMTc4M19BNkY3X0Q4Q0FBRkZFRkREMCcpLnRleHQoZmllbGQpO1xuXG5cdFx0XHQkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKGNhdGFsb2cpO1xuXHRcdFx0JCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbChlbnRpdHkpO1xuXHRcdFx0JCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbChmaWVsZCk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0Y29uc3QgcmFuayA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyYW5rXCJ9LiQnLCBkYXRhKVswXSB8fCAnOTk5Jztcblx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImRlc2NyaXB0aW9uXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblx0XHRcdGNvbnN0IHdlYkxpbmtTY3JpcHQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwid2ViTGlua1NjcmlwdFwifS4kJywgZGF0YSlbMF0gfHwgJ0BOVUxMJztcblxuXHRcdFx0Y29uc3QgaGlkZGVuID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImhpZGRlblwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGFkbWluT25seSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJhZG1pbk9ubHlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjcnlwdGVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyeXB0ZWRcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBwcmltYXJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInByaW1hcnlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCByZWFkYWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyZWFkYWJsZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblxuXHRcdFx0Y29uc3QgYXV0b21hdGljID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImF1dG9tYXRpY1wifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNyZWF0ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3JlYXRlZFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNyZWF0ZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkQnlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBtb2RpZmllZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IG1vZGlmaWVkQnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibW9kaWZpZWRCeVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblxuXHRcdFx0Y29uc3Qgc3RhdGFibGUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwic3RhdGFibGVcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBncm91cGFibGUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZ3JvdXBhYmxlXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHRjb25zdCBkaXNwbGF5YWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJkaXNwbGF5YWJsZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGJhc2U2NCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJiYXNlNjRcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBtaW1lID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1pbWVcIn0uJCcsIGRhdGEpWzBdIHx8ICdATlVMTCc7XG5cdFx0XHRjb25zdCBjdHJsID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImN0cmxcIn0uJCcsIGRhdGEpWzBdIHx8ICdATlVMTCc7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0M2Q0E4OEZEXzU0OEFfRkUzMF85ODcxX0FGRTU1MzYyNDM5QicpLnZhbChyYW5rKTtcblx0XHRcdCQoJyNFOTgwMTMxNl8wRUM2X0Q2RjJfMEJDOV9FMUUxREMzQUJBMDAnKS52YWwoZGVzY3JpcHRpb24pO1xuXG5cdFx0XHQkKCcjRjgyQzdGODZfMTI2MF9ENUIxXzRDQkZfRUU1MTk0MTVCM0ZEJykucHJvcCgnY2hlY2tlZCcsIGhpZGRlbiA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNERUExNUEwRl81RUJGXzQ5RTdfM0U3NV9GMjk4NTAxODQ5NjgnKS5wcm9wKCdjaGVja2VkJywgYWRtaW5Pbmx5ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0UyRDhBNEVCXzEwNjVfMDFCNV9DOERCXzdCMkUwMUYwM0FENCcpLnByb3AoJ2NoZWNrZWQnLCBjcnlwdGVkID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0E0RjMzMzMyXzhERERfQjIzNV9GNTIzXzZBMzVCOTAyNTE5QycpLnByb3AoJ2NoZWNrZWQnLCBwcmltYXJ5ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0QxRDQ4MDY1XzNDNkJfQjBBMF9CQTdDXzhBMEQwQUI4NEY1NScpLnByb3AoJ2NoZWNrZWQnLCByZWFkYWJsZSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0JCgnI0VERUIwODY0Xzc2RkNfNUZDQ19DOTUxXzRGNTlBQzVCNTREMicpLnByb3AoJ2NoZWNrZWQnLCAvKi0tKi8gdHJ1ZSAvKi0tKi8pO1xuXHRcdFx0JCgnI0U3NDdCRjAyXzAzMUVfQTcwRF85MzI3XzdBOTc0RkRGN0U5NicpLnByb3AoJ2NoZWNrZWQnLCBhdXRvbWF0aWMgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQkM3RTVDQTFfMDlDOF9CQjVDXzIwRTJfQzBDRkUzMjA0MjI0JykucHJvcCgnY2hlY2tlZCcsIGNyZWF0ZWQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRkI5OThDMjhfMUU1OV8xMkEwXzFCMzRfMkMyQzBBNDRBNkFEJykucHJvcCgnY2hlY2tlZCcsIGNyZWF0ZWRCeSA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNBQURDMDIwRV9FMUNCX0JBOEVfRTg3MF8yN0I2MzY2NkM5ODgnKS5wcm9wKCdjaGVja2VkJywgbW9kaWZpZWQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRkFDRkU0NDNfNzJGM184OTE3XzJGMDhfOTM0RDg4RTU1RERDJykucHJvcCgnY2hlY2tlZCcsIG1vZGlmaWVkQnkgPT09ICd0cnVlJyk7XG5cblx0XHRcdCQoJyNGMjZDMEQzRF9CNTE2XzA2RUFfOTBGNl8wRTNCMTdEMkFGNUQnKS5wcm9wKCdjaGVja2VkJywgc3RhdGFibGUgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQkEwODUwNURfQzQ2OF81NjAyXzk3NDVfMTIzNjlFMUY2MzE4JykucHJvcCgnY2hlY2tlZCcsIGdyb3VwYWJsZSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0JCgnI0IzRjZFMzY5X0E3RTRfMjZCNl9DMUVCX0IyRkM4NTVDMUI3QScpLnByb3AoJ2NoZWNrZWQnLCBkaXNwbGF5YWJsZSA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNGNTkyMjc1Ql8yMTk5Xzc5NjJfRDI3MF9DQkVFMzhCODJEQUYnKS5wcm9wKCdjaGVja2VkJywgYmFzZTY0ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0NFNTQwNDhEXzcwMkRfMDEzMl80NjU5XzlFNTU4QkUyQUMxMScpLnZhbChtaW1lKS50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuXHRcdFx0JCgnI0YzRjMxRDFEXzZCNzRfRjQ1N180RkRDXzE4ODdBNTdFRDNERicpLnZhbChjdHJsKS50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdCQoJyNFNEZFNERGNF9GMTcxXzE0NjdfMDdFRF84QkI3RTBGRkMxNUYnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh3ZWJMaW5rU2NyaXB0KTtcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5TY2hlbWFDdHJsLnJlc2V0RW50aXR5ID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZW50aXR5XCIgLWtleUZpZWxkcz1cImNhdGFsb2d8ZW50aXR5XCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0ZsdXNoU2VydmVyQ2FjaGVzJykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQoJyNCNzg1MjI4NF9CNkM0XzhFRDVfNTAyRF9COEVBMjI2ODlEMkEnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5TY2hlbWFDdHJsLmFwcGx5RW50aXR5ID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QganNvbiA9IHtcblx0XHQnYnJpZGdlJzogJCgnI0UxQjhGNUIxXzlCRERfRDRBNV81NkIxXzU0MDUzNEUxN0IwOScpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnaGlkZGVuJzogJCgnI0E3QzNGQTg1X0ZFMDNfRkM0Rl8wNEZCX0Q4RjlDMDk0MzBGMScpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnYWRtaW5Pbmx5JzogJCgnI0JGRkQxM0M0X0VBRTlfRDQ0MF8xNUFCXzYwMDVBOTQxRkIyMycpLnByb3AoJ2NoZWNrZWQnKSxcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZW50aXR5XCIgLWtleUZpZWxkcz1cImNhdGFsb2d8ZW50aXR5XCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoLyoqLydBZGRFbGVtZW50IC1zZXBhcmF0b3I9XCJ8XCIgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9lbnRpdHlcIiAtZmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8cmFua3xqc29ufGRlc2NyaXB0aW9uXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNGMDNEQTE5QV80MENFXzVDMTFfOTcxMl9BODI5MTdGQjA3QUYnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KGpzb24pKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0U4MzE4MzRFXzFEN0NfQTBGN19CMjY2X0U1RjVGOUNCNEYxNicpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdGbHVzaFNlcnZlckNhY2hlcycpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdCQoJyNCNzg1MjI4NF9CNkM0XzhFRDVfNTAyRF9COEVBMjI2ODlEMkEnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UgKyAnLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlJywgdHJ1ZSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0fSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuU2NoZW1hQ3RybC5yZXNldEZpZWxkID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZmllbGRcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8ZmllbGRcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0M3OEI2MzBDXzk4MDVfN0QxNV9DMTRGXzRDN0MyNzZFOUUyQycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0JCgnI0IwQkVCNUM3Xzg5NzhfNzQzM19GMDc2X0E1NUQyMDkxNzc3QycpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UgKyAnLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlJywgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblNjaGVtYUN0cmwuYXBwbHlGaWVsZCA9IGZ1bmN0aW9uKClcbntcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHR7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0J2hpZGRlbic6ICQoJyNGODJDN0Y4Nl8xMjYwX0Q1QjFfNENCRl9FRTUxOTQxNUIzRkQnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2FkbWluT25seSc6ICQoJyNERUExNUEwRl81RUJGXzQ5RTdfM0U3NV9GMjk4NTAxODQ5NjgnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2NyeXB0ZWQnOiAkKCcjRTJEOEE0RUJfMTA2NV8wMUI1X0M4REJfN0IyRTAxRjAzQUQ0JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdwcmltYXJ5JzogJCgnI0E0RjMzMzMyXzhERERfQjIzNV9GNTIzXzZBMzVCOTAyNTE5QycpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQncmVhZGFibGUnOiAkKCcjRDFENDgwNjVfM0M2Ql9CMEEwX0JBN0NfOEEwRDBBQjg0RjU1JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdhdXRvbWF0aWMnOiAkKCcjRTc0N0JGMDJfMDMxRV9BNzBEXzkzMjdfN0E5NzRGREY3RTk2JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdjcmVhdGVkJzogJCgnI0JDN0U1Q0ExXzA5QzhfQkI1Q18yMEUyX0MwQ0ZFMzIwNDIyNCcpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnY3JlYXRlZEJ5JzogJCgnI0ZCOTk4QzI4XzFFNTlfMTJBMF8xQjM0XzJDMkMwQTQ0QTZBRCcpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnbW9kaWZpZWQnOiAkKCcjQUFEQzAyMEVfRTFDQl9CQThFX0U4NzBfMjdCNjM2NjZDOTg4JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdtb2RpZmllZEJ5JzogJCgnI0ZBQ0ZFNDQzXzcyRjNfODkxN18yRjA4XzkzNEQ4OEU1NUREQycpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnc3RhdGFibGUnOiAkKCcjRjI2QzBEM0RfQjUxNl8wNkVBXzkwRjZfMEUzQjE3RDJBRjVEJykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdncm91cGFibGUnOiAkKCcjQkEwODUwNURfQzQ2OF81NjAyXzk3NDVfMTIzNjlFMUY2MzE4JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdkaXNwbGF5YWJsZSc6ICQoJyNCM0Y2RTM2OV9BN0U0XzI2QjZfQzFFQl9CMkZDODU1QzFCN0EnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2Jhc2U2NCc6ICQoJyNGNTkyMjc1Ql8yMTk5Xzc5NjJfRDI3MF9DQkVFMzhCODJEQUYnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J21pbWUnOiAkKCcjQ0U1NDA0OERfNzAyRF8wMTMyXzQ2NTlfOUU1NThCRTJBQzExJykudmFsKCksXG5cdFx0J2N0cmwnOiAkKCcjRjNGMzFEMURfNkI3NF9GNDU3XzRGRENfMTg4N0E1N0VEM0RGJykudmFsKCksXG5cdFx0J3dlYkxpbmtTY3JpcHQnOiAkKCcjRTRGRTRERjRfRjE3MV8xNDY3XzA3RURfOEJCN0UwRkZDMTVGJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSxcblx0fTtcblxuXHRpZighanNvbi5taW1lIHx8IGpzb24ubWltZS50b1VwcGVyQ2FzZSgpID09PSAnQE5VTEwnKSB7XG5cdFx0anNvbi5taW1lID0gbnVsbDtcblx0fVxuXG5cdGlmKCFqc29uLmN0cmwgfHwganNvbi5jdHJsLnRvVXBwZXJDYXNlKCkgPT09ICdATlVMTCcpIHtcblx0XHRqc29uLmN0cmwgPSBudWxsO1xuXHR9XG5cblx0aWYoIWpzb24ud2ViTGlua1NjcmlwdCB8fCBqc29uLndlYkxpbmtTY3JpcHQudG9VcHBlckNhc2UoKSA9PT0gJ0BOVUxMJykge1xuXHRcdGpzb24ud2ViTGlua1NjcmlwdCA9IG51bGw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZmllbGRcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8ZmllbGRcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0M3OEI2MzBDXzk4MDVfN0QxNV9DMTRGXzRDN0MyNzZFOUUyQycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgvKiovJ0FkZEVsZW1lbnQgLXNlcGFyYXRvcj1cInxcIiAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX2ZpZWxkXCIgLWZpZWxkcz1cImNhdGFsb2d8ZW50aXR5fGZpZWxkfHJhbmt8anNvbnxkZXNjcmlwdGlvblwiIC12YWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQjQ5NUZGMkJfNDVBMl9GM0NBX0M4MTBfNTVGQzA1NDg3MkQyJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzNFMjIxQTZfNkIzM182QTUyX0I3RDFfNTdDQjAyMjhCQjA3JykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzZDQTg4RkRfNTQ4QV9GRTMwXzk4NzFfQUZFNTUzNjI0MzlCJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFOTgwMTMxNl8wRUM2X0Q2RjJfMEJDOV9FMUUxREMzQUJBMDAnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
