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
      /**/

      $('#F03DA19A_40CE_5C11_9712_A82917FB07AF').val(rank);
      $('#E831834E_1D7C_A0F7_B266_E5F5F9CB4F16').val(description);
      $('#E1B8F5B1_9BDD_D4A5_56B1_540534E17B09').prop('checked', bridge === 'true');
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


  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_entity" -keyFields="catalog|entity" -keyValues="' + amiWebApp.textToString($('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val()) + '|' + amiWebApp.textToString($('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val()) + '"').done(function (data, message) {
    amiCommand.execute(
    /**/
    'AddElement -separator="|" -catalog="self" -entity="router_entity" -fields="catalog|entity|rank|description|isBridge" -values="' + amiWebApp.textToString($('#D10E4EFD_E2C2_849A_E80A_C5CDF370199C').val()) + '|' + amiWebApp.textToString($('#E1E8A4D4_0F83_39C4_EFDF_D687479C6B25').val()) + '|' + amiWebApp.textToString($('#F03DA19A_40CE_5C11_9712_A82917FB07AF').val()) + '|' + amiWebApp.textToString($('#E831834E_1D7C_A0F7_B266_E5F5F9CB4F16').val()) + '|' + ($('#E1B8F5B1_9BDD_D4A5_56B1_540534E17B09').prop('checked') ? '1' : '0') + '"').done(function (data, message) {
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


  amiCommand.execute('RemoveElements -separator="|" -catalog="self" -entity="router_field" -keyFields="catalog|entity|field" -keyValues="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '"').done(function (data, message) {
    amiCommand.execute(
    /**/
    'AddElement -separator="|" -catalog="self" -entity="router_field" -fields="catalog|entity|field|rank|isHidden|isAdminOnly|isCrypted|isPrimary|isReadable|isAutomatic|isCreated|isCreatedBy|isModified|isModifiedBy|isStatable|isGroupable|isDisplayable|isBase64|mime|ctrl|description|webLinkScript" -values="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '|' + amiWebApp.textToString($('#C6CA88FD_548A_FE30_9871_AFE55362439B').val()) + '|' + ($('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked') ? '1' : '0') + '|' + ($('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked') ? '1' : '0') + '|' + ($('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked') ? '1' : '0') + '|' + ($('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked') ? '1' : '0') + '|' + ($('#D1D48065_3C6B_B0A0_BA7C_8A0D0AB84F55').prop('checked') ? '1' : '0') + '|' + ($('#E747BF02_031E_A70D_9327_7A974FDF7E96').prop('checked') ? '1' : '0') + '|' + ($('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked') ? '1' : '0') + '|' + ($('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked') ? '1' : '0') + '|' + ($('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked') ? '1' : '0') + '|' + ($('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked') ? '1' : '0') + '|' + ($('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked') ? '1' : '0') + '|' + ($('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked') ? '1' : '0') + '|' + ($('#B3F6E369_A7E4_26B6_C1EB_B2FC855C1B7A').prop('checked') ? '1' : '0') + '|' + ($('#F592275B_2199_7962_D270_CBEE38B82DAF').prop('checked') ? '1' : '0') + '|' + amiWebApp.textToString($('#CE54048D_702D_0132_4659_9E558BE2AC11').val()) + '|' + amiWebApp.textToString($('#F3F31D1D_6B74_F457_4FDC_1887A57ED3DF').val()) + '|' + amiWebApp.textToString($('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val()) + '|' + amiWebApp.textToString($('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').data('editor').getValue()) + '"').done(function (data, message) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjaGVtYUN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImRvbmUiLCJkYXRhIiwiYXBwZW5kSFRNTCIsIl9maWVsZHMiLCJfZm9yZWlnbktleXMiLCJfY3VycmVudENlbGwiLCJfY3VycmVudENhdGFsb2ciLCJMIiwiZGF0YVR5cGUiLCJwdXNoIiwidGV4dFRvSHRtbCIsIiQiLCJodG1sIiwiam9pbiIsInNlbGVjdDIiLCJhbGxvd0NsZWFyIiwicGxhY2Vob2xkZXIiLCJkcm9wZG93blBhcmVudCIsIk0iLCJjb250cm9sTmFtZSIsIl9jb250cm9scyIsImVkaXRvciIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJzZXR1cCIsIl9vbkZvY3VzIiwiX29uQmx1ciIsImVsMSIsIl9zZWxlY3RvciIsImNzcyIsImVsMiIsImFwcGVuZFRvIiwiZ3JhcGgiLCJqb2ludCIsImRpYSIsIkdyYXBoIiwicGFwZXIiLCJQYXBlciIsIm1vZGVsIiwiZWwiLCJ3aWR0aCIsImhlaWdodCIsImdyaWRTaXplIiwiZHJhd0dyaWQiLCJuYW1lIiwiYXJncyIsImNvbG9yIiwic2NhbGVGYWN0b3IiLCJ0aGlja25lc3MiLCJjZWxsVmlldyIsInJlbW92ZUNsYXNzIiwiZmlsdGVyIiwiaWQiLCJhZGRDbGFzcyIsImZpdFRvQ29udGVudCIsInBhZGRpbmciLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0IiwibWluV2lkdGgiLCJfd2lkdGgiLCJtaW5IZWlnaHQiLCJfaGVpZ2h0IiwiX3JlZnJlc2giLCJyZXN1bHQiLCJjYXRhbG9nIiwiY29udGV4dCIsIl9zaG93U2hvd1Rvb2wiLCJfc2hvd0VkaXRUb29sIiwicmVzb2x2ZVdpdGgiLCJjbGVhciIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwidGV4dFRvU3RyaW5nIiwic2NoZW1hIiwiSlNPTiIsInBhcnNlIiwianNwYXRoIiwiZSIsImNudCIsImVudGl0aWVzIiwiZm9yRWFjaCIsInZhbHVlIiwiZW50aXR5IiwiZmllbGQiLCJ0eXBlIiwiaGlkZGVuIiwiYWRtaW5Pbmx5IiwiY3J5cHRlZCIsInByaW1hcnkiLCJjcmVhdGVkIiwiY3JlYXRlZEJ5IiwibW9kaWZpZWQiLCJtb2RpZmllZEJ5IiwieCIsInkiLCJuZXdFbnRpdHkiLCJwb3NpdGlvbiIsInNob3dTaG93VG9vbCIsInNob3dFZGl0VG9vbCIsImZpZWxkcyIsImFwcGVuZEZpZWxkIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsInNob3dFbnRpdHkiLCJjdXJyZW50VGFyZ2V0IiwiYXR0ciIsImVkaXRFbnRpdHkiLCJlZGl0RmllbGQiLCJma0VudGl0eSIsInBrRW50aXR5IiwibmV3Rm9yZWlnbktleSIsImdldCIsImZhaWwiLCJtZXNzYWdlIiwicmVqZWN0V2l0aCIsIkRlZmVycmVkIiwiYWx3YXlzIiwiX2VudGl0aWVzIiwicHJvbWlzZSIsInNldERpbWVuc2lvbnMiLCJnZXRDdXJyZW50Q2VsbCIsInNldEpTT04iLCJqc29uIiwiZnJvbUpTT04iLCJnZXRKU09OIiwidG9KU09OIiwiZXhwb3J0U2NoZW1hIiwic3RyaW5naWZ5IiwiYmxvYiIsIkJsb2IiLCJlbmRpbmdzIiwic2F2ZUFzIiwiZXJyb3IiLCJwcmludFNjaGVtYSIsInN2ZyIsInciLCJ3aW5kb3ciLCJvcGVuIiwid3JpdGUiLCJmaW5kIiwicHJpbnQiLCJjbG9zZSIsIndlYkFwcFVSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsImZvY3VzIiwiYW1pTG9naW4iLCJoYXNSb2xlIiwidGV4dCIsInZhbCIsInJhbmsiLCJkZXNjcmlwdGlvbiIsImJyaWRnZSIsInByb3AiLCJtb2RhbCIsIndlYkxpbmtTY3JpcHQiLCJyZWFkYWJsZSIsImF1dG9tYXRpYyIsInN0YXRhYmxlIiwiZ3JvdXBhYmxlIiwiZGlzcGxheWFibGUiLCJiYXNlNjQiLCJtaW1lIiwiY3RybCIsInRyaWdnZXIiLCJzZXRWYWx1ZSIsIlNjaGVtYUN0cmwiLCJyZXNldEVudGl0eSIsImNvbmZpcm0iLCJsb2NrIiwic3VjY2VzcyIsImFwcGx5RW50aXR5IiwicmVzZXRGaWVsZCIsImFwcGx5RmllbGQiLCJnZXRWYWx1ZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUVBQSxTQUFTLENBQUMsWUFBRCxFQUFlO0FBQ3ZCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxPQUhTOztBQUt2QjtBQUVBQyxFQUFBQSxLQUFLLEVBQUUsZUFBU0MsTUFBVCxFQUFpQkMsS0FBakIsRUFDUDtBQUNDLFNBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsRUFBMEJDLEtBQTFCO0FBQ0EsR0FWc0I7O0FBWXZCO0FBRUFFLEVBQUFBLE9BQU8sRUFBRSxtQkFDVDtBQUFBOztBQUNDLFdBQU9DLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLHFDQURRLEVBRTlCRixTQUFTLENBQUNFLFNBQVYsR0FBc0IsdUNBRlEsRUFHOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixxQ0FIUTtBQUk5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsZ0NBTFE7QUFNOUI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLDZCQVBRLEVBUTlCRixTQUFTLENBQUNFLFNBQVYsR0FBc0IsK0JBUlE7QUFTOUI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLDhCQVZRLEVBVzlCRixTQUFTLENBQUNFLFNBQVYsR0FBc0IsNEJBWFE7QUFZOUI7QUFDQUYsSUFB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QUVsRFcsUUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkN3SixLQUEzQyxDQUFpRCxNQUFqRDtBQUVBdEssUUFBQUEsU0FBUyxDQUFDc0wsT0FBVixDQUFrQnhELE9BQU8sR0FBRywwQkFBNUIsRUFBd0QsSUFBeEQ7QUFFQSxPQU5ELEVBTUdELElBTkgsQ0FNUSxVQUFDekgsSUFBRCxFQUFPMEgsT0FBUCxFQUFtQjtBQUUxQjlILFFBQUFBLFNBQVMsQ0FBQ2lKLEtBQVYsQ0FBZ0JuQixPQUFoQixFQUF5QixJQUF6QjtBQUNBLE9BVEQ7QUFXQSxLQWJELEVBYUdELElBYkgsQ0FhUSxVQUFDekgsSUFBRCxFQUFPMEgsT0FBUCxFQUFtQjtBQUUxQjlILE1BQUFBLFNBQVMsQ0FBQ2lKLEtBQVYsQ0FBZ0JuQixPQUFoQixFQUF5QixJQUF6QjtBQUNBLEtBaEJEO0FBa0JBLEdBcEJELEVBb0JHRCxJQXBCSCxDQW9CUSxVQUFDekgsSUFBRCxFQUFPMEgsT0FBUCxFQUFtQjtBQUUxQjlILElBQUFBLFNBQVMsQ0FBQ2lKLEtBQVYsQ0FBZ0JuQixPQUFoQixFQUF5QixJQUF6QjtBQUNBLEdBdkJEO0FBeUJBO0FBQ0EsQ0FyQ0Q7QUF1Q0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICogQGdsb2JhbCBqb2ludCwgc2F2ZUFzXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2NoZW1hQ3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1NjaGVtYS9jc3MvU2NoZW1hQ3RybC5jc3MnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvU2NoZW1hL3R3aWcvU2NoZW1hQ3RybC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1NjaGVtYS9qc29uL2RhdGF0eXBlLmpzb24nLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2ZpbGVzYXZlci5taW4uanMnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2xvZGFzaC5taW4uanMnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2JhY2tib25lLW1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jc3MvM3JkLXBhcnR5L2pvaW50Lm1pbi5jc3MnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2pvaW50Lm1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TY2hlbWEvanMvam9pbnQuc2hhcGVzLnNxbC5qcycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMV0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLl9maWVsZHMgPSBudWxsO1xuXHRcdFx0XHR0aGlzLl9mb3JlaWduS2V5cyA9IG51bGw7XG5cblx0XHRcdFx0dGhpcy5fY3VycmVudENlbGwgPSBudWxsO1xuXHRcdFx0XHR0aGlzLl9jdXJyZW50Q2F0YWxvZyA9IG51bGw7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBMID0gWyc8b3B0aW9uIHZhbHVlPVwiQE5VTExcIj5OT05FPC9vcHRpb24+J107XG5cblx0XHRcdFx0Zm9yKGxldCBkYXRhVHlwZSBpbiBkYXRhWzJdKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGRhdGFUeXBlKSArICdcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoZGF0YVsyXVtkYXRhVHlwZV0pICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JCgnI0NFNTQwNDhEXzcwMkRfMDEzMl80NjU5XzlFNTU4QkUyQUMxMScpLmh0bWwoTC5qb2luKCcnKSkuc2VsZWN0Mih7XG5cdFx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZSxcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJ0Nob29zZSBhIG1lZGlhIHR5cGUnLFxuXHRcdFx0XHRcdGRyb3Bkb3duUGFyZW50OiAkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDIC5tb2RhbC1ib2R5Jylcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBNID0gWyc8b3B0aW9uIHZhbHVlPVwiQE5VTExcIj5OT05FPC9vcHRpb24+J107XG5cblx0XHRcdFx0Zm9yKGxldCBjb250cm9sTmFtZSBpbiBhbWlXZWJBcHAuX2NvbnRyb2xzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TS5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNvbnRyb2xOYW1lKSArICdcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoY29udHJvbE5hbWUpICsgJzwvb3B0aW9uPicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JCgnI0YzRjMxRDFEXzZCNzRfRjQ1N180RkRDXzE4ODdBNTdFRDNERicpLmh0bWwoTS5qb2luKCcnKSkuc2VsZWN0Mih7XG5cdFx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZSxcblx0XHRcdFx0XHRwbGFjZWhvbGRlcjogJ0Nob29zZSBhIGNvbnRyb2wnLFxuXHRcdFx0XHRcdGRyb3Bkb3duUGFyZW50OiAkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDIC5tb2RhbC1ib2R5Jylcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3MnLFxuXHRcdFx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmpzJyxcblx0XHRcdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY29kZW1pcnJvci9hZGRvbi9lZGl0L21hdGNoYnJhY2tldHMuanMnLFxuXHRcdFx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9jb2RlbWlycm9yL21vZGUvZ3Jvb3Z5L2dyb292eS5qcycsXG5cdFx0XHRcdF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBlZGl0b3IgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRTRGRTRERjRfRjE3MV8xNDY3XzA3RURfOEJCN0UwRkZDMTVGJyksIHtcblx0XHRcdFx0XHRcdGxpbmVOdW1iZXJzOiB0cnVlLFxuXHRcdFx0XHRcdFx0bWF0Y2hCcmFja2V0czogdHJ1ZSxcblx0XHRcdFx0XHRcdG1vZGU6ICd0ZXh0L3gtZ3Jvb3Z5Jyxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0U0RkU0REY0X0YxNzFfMTQ2N18wN0VEXzhCQjdFMEZGQzE1RicpLmRhdGEoJ2VkaXRvcicsIGVkaXRvcik7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNCMEJFQjVDN184OTc4Xzc0MzNfRjA3Nl9BNTVEMjA5MTc3N0MnKS5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVkaXRvci5yZWZyZXNoKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbX29uRm9jdXMsIF9vbkJsdXJdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0WydvbkZvY3VzJywgJ29uQmx1ciddLFxuXHRcdFx0W251bGwsIG51bGxdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5fb25Gb2N1cyA9IF9vbkZvY3VzO1xuXHRcdHRoaXMuX29uQmx1ciA9IF9vbkJsdXI7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBlbDEgPSAkKHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3IpO1xuXG5cdFx0ZWwxLmNzcygnYm94LXNoYWRvdycsICcwcHggMXB4IDBweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIGluc2V0LCAwIDFweCA1cHggcmdiYSgwLCAwLCAwLCAwLjA3NSknKTtcblx0XHRlbDEuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkIHJnYigyMzEsIDIzMSwgMjMxKScpO1xuXHRcdGVsMS5jc3MoJ2JvcmRlci1yYWRpdXMnLCAnNHB4Jyk7XG5cdFx0ZWwxLmNzcygnb3ZlcmZsb3cteCcsICdzY3JvbGwnKTtcblx0XHRlbDEuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xuXHRcdGVsMS5jc3MoJ3BhZGRpbmcnLCAnMTBweCcpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZWwyID0gJCgnPGRpdiBjbGFzcz1cImFtaS1zY2hlbWFcIj48L2Rpdj4nKS5hcHBlbmRUbyhlbDEpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdyYXBoID0gbmV3IGpvaW50LmRpYS5HcmFwaCgpO1xuXG5cdFx0dGhpcy5wYXBlciA9IG5ldyBqb2ludC5kaWEuUGFwZXIoe1xuXHRcdFx0bW9kZWw6IHRoaXMuZ3JhcGgsXG5cdFx0XHRlbDogZWwyLFxuXHRcdFx0d2lkdGg6IDEsXG5cdFx0XHRoZWlnaHQ6IDEsXG5cdFx0XHRncmlkU2l6ZTogNS4wLFxuXHRcdFx0ZHJhd0dyaWQ6IHtcblx0XHRcdFx0bmFtZTogJ2RvdCcsXG5cdFx0XHRcdGFyZ3M6IFtcblx0XHRcdFx0XHR7Y29sb3I6ICdyZWQnLCBzY2FsZUZhY3RvcjogMiwgdGhpY2tuZXNzOiAxfSxcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnBhcGVyLm9uKHtcblx0XHRcdCdjZWxsOnBvaW50ZXJjbGljayc6IChjZWxsVmlldykgPT4ge1xuXG5cdFx0XHRcdCQoJ2dbbW9kZWwtaWRdJykucmVtb3ZlQ2xhc3MoJ2FtaS1zY2hlbWEtc2hhZG93JykuZmlsdGVyKCdbbW9kZWwtaWQ9XCInICsgY2VsbFZpZXcubW9kZWwuaWQgKyAnXCJdJykuYWRkQ2xhc3MoJ2FtaS1zY2hlbWEtc2hhZG93Jyk7XG5cblx0XHRcdFx0dGhpcy5fY3VycmVudENlbGwgPSBjZWxsVmlldy5tb2RlbDtcblxuXHRcdFx0XHRpZih0aGlzLl9vbkZvY3VzKSB7XG5cdFx0XHRcdFx0dGhpcy5fb25Gb2N1cyh0aGlzLl9jdXJyZW50Q2VsbCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnYmxhbms6cG9pbnRlcmRvd24nOiAoY2VsbFZpZXcpID0+IHtcblxuXHRcdFx0XHQkKCdnW21vZGVsLWlkXScpLnJlbW92ZUNsYXNzKCdhbWktc2NoZW1hLXNoYWRvdycpLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLztcblxuXHRcdFx0XHRpZih0aGlzLl9vbkJsdXIpIHtcblx0XHRcdFx0XHR0aGlzLl9vbkJsdXIodGhpcy5fY3VycmVudENlbGwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fY3VycmVudENlbGwgPSAvKi0qL251bGwvKi0qLztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucmVmcmVzaChudWxsLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zml0VG9Db250ZW50OiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLnBhcGVyLmZpdFRvQ29udGVudCh7XG5cdFx0XHRwYWRkaW5nOiAxMCxcblx0XHRcdGdyaWRXaWR0aDogMTAsXG5cdFx0XHRncmlkSGVpZ2h0OiAxMCxcblx0XHRcdG1pbldpZHRoOiB0aGlzLl93aWR0aCxcblx0XHRcdG1pbkhlaWdodDogdGhpcy5faGVpZ2h0LFxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVmcmVzaDogZnVuY3Rpb24ocmVzdWx0LCBjYXRhbG9nLCBzZXR0aW5ncylcblx0e1xuXHRcdHRoaXMuX2N1cnJlbnRDYXRhbG9nID0gY2F0YWxvZztcblxuXHRcdGNvbnN0IFtjb250ZXh0LCBfd2lkdGgsIF9oZWlnaHQsIF9zaG93U2hvd1Rvb2wsIF9zaG93RWRpdFRvb2xdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaG93U2hvd1Rvb2wnLCAnc2hvd0VkaXRUb29sJ10sXG5cdFx0XHRbcmVzdWx0LCAyMDAwLCAyMDAwLCBmYWxzZSwgZmFsc2VdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5fd2lkdGggPSBfd2lkdGg7XG5cdFx0dGhpcy5faGVpZ2h0ID0gX2hlaWdodDtcblxuXHRcdHRoaXMuX3Nob3dTaG93VG9vbCA9IF9zaG93U2hvd1Rvb2w7XG5cdFx0dGhpcy5fc2hvd0VkaXRUb29sID0gX3Nob3dFZGl0VG9vbDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWNhdGFsb2cpXG5cdFx0e1xuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtudWxsXSk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZ3JhcGguY2xlYXIoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRKU09OU2NoZW1hIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgU0NIRU1BICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHNjaGVtYTtcblxuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdHNjaGVtYSA9IEpTT04ucGFyc2UoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIGRhdGEpWzBdIHx8ICd7fScpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goZSlcblx0XHRcdHtcblx0XHRcdFx0c2NoZW1hID0gey8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi99O1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogR0VUIENPTFVNTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBjbnQgPSAwO1xuXG5cdFx0XHRsZXQgZW50aXRpZXMgPSB7fTtcblxuXHRcdFx0dGhpcy5fZmllbGRzLmZvckVhY2goKHZhbHVlKSA9PiB7XG5cblx0XHRcdFx0aWYoKGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJleHRlcm5hbENhdGFsb2dcIn0uJCcsIHZhbHVlKVswXSB8fCAnJykgPT09IGNhdGFsb2cpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBlbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZW50aXR5XCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgZmllbGQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmllbGRcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCB0eXBlID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInR5cGVcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBoaWRkZW4gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaGlkZGVuXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgYWRtaW5Pbmx5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFkbWluT25seVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGNyeXB0ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3J5cHRlZFwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IHByaW1hcnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwicHJpbWFyeVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGNyZWF0ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3JlYXRlZFwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGNyZWF0ZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkQnlcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBtb2RpZmllZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZFwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IG1vZGlmaWVkQnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibW9kaWZpZWRCeVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXG5cdFx0XHRcdFx0aWYoIShlbnRpdHkgaW4gZW50aXRpZXMpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGxldCB4O1xuXHRcdFx0XHRcdFx0bGV0IHk7XG5cdFx0XHRcdFx0XHRsZXQgY29sb3I7XG5cblx0XHRcdFx0XHRcdGlmKCEoZW50aXR5IGluIHNjaGVtYSkpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHggPSB5XG5cdFx0XHRcdFx0XHRcdCAgPSAyMCArIDEwICogY250Kys7XG5cdFx0XHRcdFx0XHRcdGNvbG9yID0gJyMwMDY2Q0MnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR4ID0gc2NoZW1hW2VudGl0eV0ueDtcblx0XHRcdFx0XHRcdFx0eSA9IHNjaGVtYVtlbnRpdHldLnk7XG5cdFx0XHRcdFx0XHRcdGNvbG9yID0gc2NoZW1hW2VudGl0eV0uY29sb3I7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGVudGl0aWVzW2VudGl0eV0gPSB7XG5cdFx0XHRcdFx0XHRcdGVudGl0eTogdGhpcy5ncmFwaC5uZXdFbnRpdHkoe1xuXHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR4OiB4LFxuXHRcdFx0XHRcdFx0XHRcdFx0eTogeSxcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGVudGl0eTogZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdGNvbG9yOiBjb2xvcixcblx0XHRcdFx0XHRcdFx0XHRzaG93U2hvd1Rvb2w6IHRoaXMuX3Nob3dTaG93VG9vbCxcblx0XHRcdFx0XHRcdFx0XHRzaG93RWRpdFRvb2w6IHRoaXMuX3Nob3dFZGl0VG9vbCxcblx0XHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRcdGZpZWxkczogW10sXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKCEoZmllbGQgaW4gZW50aXRpZXNbZW50aXR5XVsnZmllbGRzJ10pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVudGl0aWVzW2VudGl0eV1bJ2VudGl0eSddLmFwcGVuZEZpZWxkKHtcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkLFxuXHRcdFx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdFx0XHRoaWRkZW46IGhpZGRlbiA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRhZG1pbk9ubHk6IGFkbWluT25seSA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRjcnlwdGVkOiBjcnlwdGVkID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdHByaW1hcnk6IHByaW1hcnkgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0Y3JlYXRlZDogY3JlYXRlZCA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRjcmVhdGVkQnk6IGNyZWF0ZWRCeSA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRtb2RpZmllZDogbW9kaWZpZWQgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0bW9kaWZpZWRCeTogbW9kaWZpZWRCeSA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLl9zZWxlY3RvciArICcgYS5zcWwtZW50aXR5LXNob3ctbGluaycpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHRoaXMuc2hvd0VudGl0eShcblx0XHRcdFx0XHRjYXRhbG9nXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLl9zZWxlY3RvciArICcgYS5zcWwtZW50aXR5LWVkaXQtbGluaycpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHRoaXMuZWRpdEVudGl0eShcblx0XHRcdFx0XHRjYXRhbG9nXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLl9zZWxlY3RvciArICcgYS5zcWwtZmllbGQtbGluaycpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHRoaXMuZWRpdEZpZWxkKFxuXHRcdFx0XHRcdGNhdGFsb2dcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2RhdGEtZmllbGQnKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBHRVQgRktFWVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5fZm9yZWlnbktleXMuZm9yRWFjaCgodmFsdWUpID0+IHtcblxuXHRcdFx0XHRpZihhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmtFeHRlcm5hbENhdGFsb2dcIn0uJCcsIHZhbHVlKVswXSA9PT0gY2F0YWxvZ1xuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwicGtFeHRlcm5hbENhdGFsb2dcIn0uJCcsIHZhbHVlKVswXSA9PT0gY2F0YWxvZ1xuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0Y29uc3QgZmtFbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZmtFbnRpdHlcIn0uJCcsIHZhbHVlKVswXTtcblx0XHRcdFx0XHRjb25zdCBwa0VudGl0eSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJwa0VudGl0eVwifS4kJywgdmFsdWUpWzBdO1xuXG5cdFx0XHRcdFx0dGhpcy5ncmFwaC5uZXdGb3JlaWduS2V5KFxuXHRcdFx0XHRcdFx0ZW50aXRpZXNbZmtFbnRpdHldWydlbnRpdHknXS5nZXQoJ2lkJyksXG5cdFx0XHRcdFx0XHRlbnRpdGllc1twa0VudGl0eV1bJ2VudGl0eSddLmdldCgnaWQnKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRklUIFRPIENPTlRFTlQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuZml0VG9Db250ZW50KCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbc2NoZW1hXSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZnJlc2g6IGZ1bmN0aW9uKGNhdGFsb2csIHNldHRpbmdzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0U2NoZW1hcycpLmFsd2F5cygoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLl9maWVsZHMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImZpZWxkc1wifS5yb3cnLCBkYXRhKSB8fCBbXTtcblx0XHRcdHRoaXMuX2VudGl0aWVzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJlbnRpdGllc1wifS5yb3cnLCBkYXRhKSB8fCBbXTtcblx0XHRcdHRoaXMuX2ZvcmVpZ25LZXlzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJmb3JlaWduS2V5c1wifS5yb3cnLCBkYXRhKSB8fCBbXTtcblxuXHRcdFx0dGhpcy5fcmVmcmVzaChyZXN1bHQsIGNhdGFsb2csIHNldHRpbmdzKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRjbGVhcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5ncmFwaC5jbGVhcigpO1xuXG5cdFx0dGhpcy5wYXBlci5zZXREaW1lbnNpb25zKDEsIDEpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRDdXJyZW50Q2VsbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRDZWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRKU09OOiBmdW5jdGlvbihqc29uKVxuXHR7XG5cdFx0dGhpcy5ncmFwaC5mcm9tSlNPTihqc29uKTtcblxuXHRcdHRoaXMuZml0VG9Db250ZW50KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTT046IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuZml0VG9Db250ZW50KCk7XG5cblx0XHRyZXR1cm4gdGhpcy5ncmFwaC50b0pTT04oKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXhwb3J0U2NoZW1hOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHRjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRKU09OKCksIG51bGwsIDQpO1xuXG5cdFx0XHRsZXQgYmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge1xuXHRcdFx0XHR0eXBlOiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdGVuZGluZ3MgOiAnbmF0aXZlJyxcblx0XHRcdH0pO1xuXG5cdFx0XHRzYXZlQXMoYmxvYiwgJ3NjaGVtYS5qc29uJyk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmVycm9yKGUsIHRydWUpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJpbnRTY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHN2ZyA9ICQodGhpcy5fc2VsZWN0b3IgKyAnIHN2ZycpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgdyA9IHdpbmRvdy5vcGVuKCcnLCAnJywgJ2hlaWdodD0nICsgc3ZnLmhlaWdodCgpICsgJywgd2lkdGg9JyArIHN2Zy53aWR0aCgpICsgJywgdG9vbGJhcj1ubycpO1xuXG5cdFx0dy5kb2N1bWVudC53cml0ZSgnPGh0bWw+PGhlYWQ+PHN0eWxlPmJvZHkgeyBtYXJnaW46IDEwcHg7IH0gLmxpbmstdG9vbHMsIC5tYXJrZXItdmVydGljZXMsIC5tYXJrZXItYXJyb3doZWFkcywgLmNvbm5lY3Rpb24td3JhcCwgLnNxbC1lbnRpdHktbGluayB7IGRpc3BsYXk6IG5vbmU7IH0gLmNvbm5lY3Rpb24geyBmaWxsOiBub25lOyB9PC9zdHlsZT48L2hlYWQ+PGJvZHk+JyArICQoJyNDNkRERkFGNl85RTc1XzQxQzVfODdCRF8wODk2QjUyOTk1NTknKS5odG1sKCkgKyAnPC9ib2R5PjwvaHRtbD4nKTtcblxuXHRcdCQody5kb2N1bWVudCkuZmluZCgnc3ZnJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ25vbmUnKTtcblxuXHRcdHcucHJpbnQoKTtcblx0XHR3LmNsb3NlKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvd0VudGl0eTogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5KVxuXHR7XG5cdFx0d2luZG93Lm9wZW4oYW1pV2ViQXBwLndlYkFwcFVSTCArICc/c3ViYXBwPXRhYmxlVmlld2VyJnVzZXJkYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQoJ3tcImNhdGFsb2dcIjogXCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiwgXCJlbnRpdHlcIjogXCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wifScpLCAnX2JsYW5rJykuZm9jdXMoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdEVudGl0eTogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5KVxuXHR7XG5cdFx0aWYoYW1pTG9naW4uaGFzUm9sZSgnQU1JX0FETUlOJykgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEVudGl0eUluZm8gLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0JCgnI0FGODI2QkI3X0U3QThfQzVBOF83MTFDXzg0RDAwRjA0MjQxOCcpLnRleHQoY2F0YWxvZyk7XG5cdFx0XHQkKCcjQkEyOTVDRUNfRjI2Ml9CQjdGXzA5QkZfNDQyMEU5RURCRDZFJykudGV4dChlbnRpdHkpO1xuXG5cdFx0XHQkKCcjRDEwRTRFRkRfRTJDMl84NDlBX0U4MEFfQzVDREYzNzAxOTlDJykudmFsKGNhdGFsb2cpO1xuXHRcdFx0JCgnI0UxRThBNEQ0XzBGODNfMzlDNF9FRkRGX0Q2ODc0NzlDNkIyNScpLnZhbChlbnRpdHkpO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdGNvbnN0IHJhbmsgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwicmFua1wifS4kJywgZGF0YSlbMF0gfHwgJzk5OSc7XG5cdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJkZXNjcmlwdGlvblwifS4kJywgZGF0YSlbMF0gfHwgJ04vQSc7XG5cblx0XHRcdGNvbnN0IGJyaWRnZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJicmlkZ2VcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0YwM0RBMTlBXzQwQ0VfNUMxMV85NzEyX0E4MjkxN0ZCMDdBRicpLnZhbChyYW5rKTtcblx0XHRcdCQoJyNFODMxODM0RV8xRDdDX0EwRjdfQjI2Nl9FNUY1RjlDQjRGMTYnKS52YWwoZGVzY3JpcHRpb24pO1xuXG5cdFx0XHQkKCcjRTFCOEY1QjFfOUJERF9ENEE1XzU2QjFfNTQwNTM0RTE3QjA5JykucHJvcCgnY2hlY2tlZCcsIGJyaWRnZSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHQkKCcjQjc4NTIyODRfQjZDNF84RUQ1XzUwMkRfQjhFQTIyNjg5RDJBJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRlZGl0RmllbGQ6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQpXG5cdHtcblx0XHRpZihhbWlMb2dpbi5oYXNSb2xlKCdBTUlfQURNSU4nKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0RmllbGRJbmZvIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLWZpZWxkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZmllbGQpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQkKCcjQTFBQTUwMzRfRjE4M185MzY1XzJEMDlfREY4MEYxNzc1Qzk1JykudGV4dChjYXRhbG9nKTtcblx0XHRcdCQoJyNDNTI2NDRDQl80NUU5XzU4NkVfREYyM18zOERENjkxNDc3MzUnKS50ZXh0KGVudGl0eSk7XG5cdFx0XHQkKCcjREU2RTlEQjJfQkZFRF8xNzgzX0E2RjdfRDhDQUFGRkVGREQwJykudGV4dChmaWVsZCk7XG5cblx0XHRcdCQoJyNDNzhCNjMwQ185ODA1XzdEMTVfQzE0Rl80QzdDMjc2RTlFMkMnKS52YWwoY2F0YWxvZyk7XG5cdFx0XHQkKCcjQjQ5NUZGMkJfNDVBMl9GM0NBX0M4MTBfNTVGQzA1NDg3MkQyJykudmFsKGVudGl0eSk7XG5cdFx0XHQkKCcjQzNFMjIxQTZfNkIzM182QTUyX0I3RDFfNTdDQjAyMjhCQjA3JykudmFsKGZpZWxkKTtcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHRjb25zdCByYW5rID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInJhbmtcIn0uJCcsIGRhdGEpWzBdIHx8ICc5OTknO1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZGVzY3JpcHRpb25cIn0uJCcsIGRhdGEpWzBdIHx8ICdOL0EnO1xuXHRcdFx0Y29uc3Qgd2ViTGlua1NjcmlwdCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJ3ZWJMaW5rU2NyaXB0XCJ9LiQnLCBkYXRhKVswXSB8fCAnQE5VTEwnO1xuXG5cdFx0XHRjb25zdCBoaWRkZW4gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaGlkZGVuXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgYWRtaW5Pbmx5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImFkbWluT25seVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNyeXB0ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3J5cHRlZFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IHByaW1hcnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwicHJpbWFyeVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IHJlYWRhYmxlID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInJlYWRhYmxlXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHRjb25zdCBhdXRvbWF0aWMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYXV0b21hdGljXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgY3JlYXRlZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgY3JlYXRlZEJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyZWF0ZWRCeVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IG1vZGlmaWVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1vZGlmaWVkXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgbW9kaWZpZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZEJ5XCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHRjb25zdCBzdGF0YWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJzdGF0YWJsZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGdyb3VwYWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cGFibGVcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cblx0XHRcdGNvbnN0IGRpc3BsYXlhYmxlID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImRpc3BsYXlhYmxlXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXHRcdFx0Y29uc3QgYmFzZTY0ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImJhc2U2NFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IG1pbWUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibWltZVwifS4kJywgZGF0YSlbMF0gfHwgJ0BOVUxMJztcblx0XHRcdGNvbnN0IGN0cmwgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3RybFwifS4kJywgZGF0YSlbMF0gfHwgJ0BOVUxMJztcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHQkKCcjQzZDQTg4RkRfNTQ4QV9GRTMwXzk4NzFfQUZFNTUzNjI0MzlCJykudmFsKHJhbmspO1xuXHRcdFx0JCgnI0U5ODAxMzE2XzBFQzZfRDZGMl8wQkM5X0UxRTFEQzNBQkEwMCcpLnZhbChkZXNjcmlwdGlvbik7XG5cblx0XHRcdCQoJyNGODJDN0Y4Nl8xMjYwX0Q1QjFfNENCRl9FRTUxOTQxNUIzRkQnKS5wcm9wKCdjaGVja2VkJywgaGlkZGVuID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0RFQTE1QTBGXzVFQkZfNDlFN18zRTc1X0YyOTg1MDE4NDk2OCcpLnByb3AoJ2NoZWNrZWQnLCBhZG1pbk9ubHkgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRTJEOEE0RUJfMTA2NV8wMUI1X0M4REJfN0IyRTAxRjAzQUQ0JykucHJvcCgnY2hlY2tlZCcsIGNyeXB0ZWQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQTRGMzMzMzJfOERERF9CMjM1X0Y1MjNfNkEzNUI5MDI1MTlDJykucHJvcCgnY2hlY2tlZCcsIHByaW1hcnkgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRDFENDgwNjVfM0M2Ql9CMEEwX0JBN0NfOEEwRDBBQjg0RjU1JykucHJvcCgnY2hlY2tlZCcsIHJlYWRhYmxlID09PSAndHJ1ZScpO1xuXG5cdFx0XHQkKCcjRURFQjA4NjRfNzZGQ181RkNDX0M5NTFfNEY1OUFDNUI1NEQyJykucHJvcCgnY2hlY2tlZCcsIC8qLS0qLyB0cnVlIC8qLS0qLyk7XG5cdFx0XHQkKCcjRTc0N0JGMDJfMDMxRV9BNzBEXzkzMjdfN0E5NzRGREY3RTk2JykucHJvcCgnY2hlY2tlZCcsIGF1dG9tYXRpYyA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNCQzdFNUNBMV8wOUM4X0JCNUNfMjBFMl9DMENGRTMyMDQyMjQnKS5wcm9wKCdjaGVja2VkJywgY3JlYXRlZCA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNGQjk5OEMyOF8xRTU5XzEyQTBfMUIzNF8yQzJDMEE0NEE2QUQnKS5wcm9wKCdjaGVja2VkJywgY3JlYXRlZEJ5ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0FBREMwMjBFX0UxQ0JfQkE4RV9FODcwXzI3QjYzNjY2Qzk4OCcpLnByb3AoJ2NoZWNrZWQnLCBtb2RpZmllZCA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNGQUNGRTQ0M183MkYzXzg5MTdfMkYwOF85MzREODhFNTVEREMnKS5wcm9wKCdjaGVja2VkJywgbW9kaWZpZWRCeSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0JCgnI0YyNkMwRDNEX0I1MTZfMDZFQV85MEY2XzBFM0IxN0QyQUY1RCcpLnByb3AoJ2NoZWNrZWQnLCBzdGF0YWJsZSA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNCQTA4NTA1RF9DNDY4XzU2MDJfOTc0NV8xMjM2OUUxRjYzMTgnKS5wcm9wKCdjaGVja2VkJywgZ3JvdXBhYmxlID09PSAndHJ1ZScpO1xuXG5cdFx0XHQkKCcjQjNGNkUzNjlfQTdFNF8yNkI2X0MxRUJfQjJGQzg1NUMxQjdBJykucHJvcCgnY2hlY2tlZCcsIGRpc3BsYXlhYmxlID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0Y1OTIyNzVCXzIxOTlfNzk2Ml9EMjcwX0NCRUUzOEI4MkRBRicpLnByb3AoJ2NoZWNrZWQnLCBiYXNlNjQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQ0U1NDA0OERfNzAyRF8wMTMyXzQ2NTlfOUU1NThCRTJBQzExJykudmFsKG1pbWUpLnRyaWdnZXIoJ2NoYW5nZS5zZWxlY3QyJyk7XG5cdFx0XHQkKCcjRjNGMzFEMURfNkI3NF9GNDU3XzRGRENfMTg4N0E1N0VEM0RGJykudmFsKGN0cmwpLnRyaWdnZXIoJ2NoYW5nZS5zZWxlY3QyJyk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0U0RkU0REY0X0YxNzFfMTQ2N18wN0VEXzhCQjdFMEZGQzE1RicpLmRhdGEoJ2VkaXRvcicpLnNldFZhbHVlKHdlYkxpbmtTY3JpcHQpO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdCQoJyNCMEJFQjVDN184OTc4Xzc0MzNfRjA3Nl9BNTVEMjA5MTc3N0MnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblNjaGVtYUN0cmwucmVzZXRFbnRpdHkgPSBmdW5jdGlvbigpXG57XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0e1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1zZXBhcmF0b3I9XCJ8XCIgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9lbnRpdHlcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHlcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0QxMEU0RUZEX0UyQzJfODQ5QV9FODBBX0M1Q0RGMzcwMTk5QycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0UxRThBNEQ0XzBGODNfMzlDNF9FRkRGX0Q2ODc0NzlDNkIyNScpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0JCgnI0I3ODUyMjg0X0I2QzRfOEVENV81MDJEX0I4RUEyMjY4OUQyQScpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UgKyAnLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlJywgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblNjaGVtYUN0cmwuYXBwbHlFbnRpdHkgPSBmdW5jdGlvbigpXG57XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0e1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1zZXBhcmF0b3I9XCJ8XCIgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9lbnRpdHlcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHlcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0QxMEU0RUZEX0UyQzJfODQ5QV9FODBBX0M1Q0RGMzcwMTk5QycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0UxRThBNEQ0XzBGODNfMzlDNF9FRkRGX0Q2ODc0NzlDNkIyNScpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgvKiovJ0FkZEVsZW1lbnQgLXNlcGFyYXRvcj1cInxcIiAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX2VudGl0eVwiIC1maWVsZHM9XCJjYXRhbG9nfGVudGl0eXxyYW5rfGRlc2NyaXB0aW9ufGlzQnJpZGdlXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNGMDNEQTE5QV80MENFXzVDMTFfOTcxMl9BODI5MTdGQjA3QUYnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFODMxODM0RV8xRDdDX0EwRjdfQjI2Nl9FNUY1RjlDQjRGMTYnKS52YWwoKSkgKyAnfCcgKyAoJCgnI0UxQjhGNUIxXzlCRERfRDRBNV81NkIxXzU0MDUzNEUxN0IwOScpLnByb3AoJ2NoZWNrZWQnKSA/ICcxJyA6ICcwJykgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQkKCcjQjc4NTIyODRfQjZDNF84RUQ1XzUwMkRfQjhFQTIyNjg5RDJBJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblNjaGVtYUN0cmwucmVzZXRGaWVsZCA9IGZ1bmN0aW9uKClcbntcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHR7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFtaUNvbW1hbmQuZXhlY3V0ZSgnUmVtb3ZlRWxlbWVudHMgLXNlcGFyYXRvcj1cInxcIiAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX2ZpZWxkXCIgLWtleUZpZWxkcz1cImNhdGFsb2d8ZW50aXR5fGZpZWxkXCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNDNzhCNjMwQ185ODA1XzdEMTVfQzE0Rl80QzdDMjc2RTlFMkMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNCNDk1RkYyQl80NUEyX0YzQ0FfQzgxMF81NUZDMDU0ODcyRDInKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNDM0UyMjFBNl82QjMzXzZBNTJfQjdEMV81N0NCMDIyOEJCMDcnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0ZsdXNoU2VydmVyQ2FjaGVzJykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQoJyNCMEJFQjVDN184OTc4Xzc0MzNfRjA3Nl9BNTVEMjA5MTc3N0MnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5TY2hlbWFDdHJsLmFwcGx5RmllbGQgPSBmdW5jdGlvbigpXG57XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0e1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1JlbW92ZUVsZW1lbnRzIC1zZXBhcmF0b3I9XCJ8XCIgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9maWVsZFwiIC1rZXlGaWVsZHM9XCJjYXRhbG9nfGVudGl0eXxmaWVsZFwiIC1rZXlWYWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQjQ5NUZGMkJfNDVBMl9GM0NBX0M4MTBfNTVGQzA1NDg3MkQyJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzNFMjIxQTZfNkIzM182QTUyX0I3RDFfNTdDQjAyMjhCQjA3JykudmFsKCkpICsgJ1wiJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKC8qKi8nQWRkRWxlbWVudCAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZmllbGRcIiAtZmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8ZmllbGR8cmFua3xpc0hpZGRlbnxpc0FkbWluT25seXxpc0NyeXB0ZWR8aXNQcmltYXJ5fGlzUmVhZGFibGV8aXNBdXRvbWF0aWN8aXNDcmVhdGVkfGlzQ3JlYXRlZEJ5fGlzTW9kaWZpZWR8aXNNb2RpZmllZEJ5fGlzU3RhdGFibGV8aXNHcm91cGFibGV8aXNEaXNwbGF5YWJsZXxpc0Jhc2U2NHxtaW1lfGN0cmx8ZGVzY3JpcHRpb258d2ViTGlua1NjcmlwdFwiIC12YWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQjQ5NUZGMkJfNDVBMl9GM0NBX0M4MTBfNTVGQzA1NDg3MkQyJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzNFMjIxQTZfNkIzM182QTUyX0I3RDFfNTdDQjAyMjhCQjA3JykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzZDQTg4RkRfNTQ4QV9GRTMwXzk4NzFfQUZFNTUzNjI0MzlCJykudmFsKCkpICsgJ3wnICsgKCQoJyNGODJDN0Y4Nl8xMjYwX0Q1QjFfNENCRl9FRTUxOTQxNUIzRkQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNERUExNUEwRl81RUJGXzQ5RTdfM0U3NV9GMjk4NTAxODQ5NjgnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNFMkQ4QTRFQl8xMDY1XzAxQjVfQzhEQl83QjJFMDFGMDNBRDQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNBNEYzMzMzMl84REREX0IyMzVfRjUyM182QTM1QjkwMjUxOUMnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNEMUQ0ODA2NV8zQzZCX0IwQTBfQkE3Q184QTBEMEFCODRGNTUnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNFNzQ3QkYwMl8wMzFFX0E3MERfOTMyN183QTk3NEZERjdFOTYnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNCQzdFNUNBMV8wOUM4X0JCNUNfMjBFMl9DMENGRTMyMDQyMjQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNGQjk5OEMyOF8xRTU5XzEyQTBfMUIzNF8yQzJDMEE0NEE2QUQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNBQURDMDIwRV9FMUNCX0JBOEVfRTg3MF8yN0I2MzY2NkM5ODgnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNGQUNGRTQ0M183MkYzXzg5MTdfMkYwOF85MzREODhFNTVEREMnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNGMjZDMEQzRF9CNTE2XzA2RUFfOTBGNl8wRTNCMTdEMkFGNUQnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNCQTA4NTA1RF9DNDY4XzU2MDJfOTc0NV8xMjM2OUUxRjYzMTgnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNCM0Y2RTM2OV9BN0U0XzI2QjZfQzFFQl9CMkZDODU1QzFCN0EnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgKCQoJyNGNTkyMjc1Ql8yMTk5Xzc5NjJfRDI3MF9DQkVFMzhCODJEQUYnKS5wcm9wKCdjaGVja2VkJykgPyAnMScgOiAnMCcpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQ0U1NDA0OERfNzAyRF8wMTMyXzQ2NTlfOUU1NThCRTJBQzExJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjRjNGMzFEMURfNkI3NF9GNDU3XzRGRENfMTg4N0E1N0VEM0RGJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjRTk4MDEzMTZfMEVDNl9ENkYyXzBCQzlfRTFFMURDM0FCQTAwJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjRTRGRTRERjRfRjE3MV8xNDY3XzA3RURfOEJCN0UwRkZDMTVGJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
