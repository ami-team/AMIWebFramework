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


  var json = {
    'bridge': $('#E1B8F5B1_9BDD_D4A5_56B1_540534E17B09').prop('checked')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjaGVtYUN0cmwuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiQ29udHJvbCIsIiRpbml0IiwicGFyZW50Iiwib3duZXIiLCIkc3VwZXIiLCJvblJlYWR5IiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImRvbmUiLCJkYXRhIiwiYXBwZW5kSFRNTCIsIl9maWVsZHMiLCJfZm9yZWlnbktleXMiLCJfY3VycmVudENlbGwiLCJfY3VycmVudENhdGFsb2ciLCJMIiwiZGF0YVR5cGUiLCJwdXNoIiwidGV4dFRvSHRtbCIsIiQiLCJodG1sIiwiam9pbiIsInNlbGVjdDIiLCJhbGxvd0NsZWFyIiwicGxhY2Vob2xkZXIiLCJkcm9wZG93blBhcmVudCIsIk0iLCJjb250cm9sTmFtZSIsIl9jb250cm9scyIsImVkaXRvciIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGluZU51bWJlcnMiLCJtYXRjaEJyYWNrZXRzIiwibW9kZSIsIm9uIiwicmVmcmVzaCIsInJlbmRlciIsInNlbGVjdG9yIiwic2V0dGluZ3MiLCJzZXR1cCIsIl9vbkZvY3VzIiwiX29uQmx1ciIsImVsMSIsIl9zZWxlY3RvciIsImNzcyIsImVsMiIsImFwcGVuZFRvIiwiZ3JhcGgiLCJqb2ludCIsImRpYSIsIkdyYXBoIiwicGFwZXIiLCJQYXBlciIsIm1vZGVsIiwiZWwiLCJ3aWR0aCIsImhlaWdodCIsImdyaWRTaXplIiwiZHJhd0dyaWQiLCJuYW1lIiwiYXJncyIsImNvbG9yIiwic2NhbGVGYWN0b3IiLCJ0aGlja25lc3MiLCJjZWxsVmlldyIsInJlbW92ZUNsYXNzIiwiZmlsdGVyIiwiaWQiLCJhZGRDbGFzcyIsImZpdFRvQ29udGVudCIsInBhZGRpbmciLCJncmlkV2lkdGgiLCJncmlkSGVpZ2h0IiwibWluV2lkdGgiLCJfd2lkdGgiLCJtaW5IZWlnaHQiLCJfaGVpZ2h0IiwiX3JlZnJlc2giLCJyZXN1bHQiLCJjYXRhbG9nIiwiY29udGV4dCIsIl9zaG93U2hvd1Rvb2wiLCJfc2hvd0VkaXRUb29sIiwicmVzb2x2ZVdpdGgiLCJjbGVhciIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwidGV4dFRvU3RyaW5nIiwic2NoZW1hIiwiSlNPTiIsInBhcnNlIiwianNwYXRoIiwiZSIsImNudCIsImVudGl0aWVzIiwiZm9yRWFjaCIsInZhbHVlIiwiZW50aXR5IiwiZmllbGQiLCJ0eXBlIiwiaGlkZGVuIiwiYWRtaW5Pbmx5IiwiY3J5cHRlZCIsInByaW1hcnkiLCJjcmVhdGVkIiwiY3JlYXRlZEJ5IiwibW9kaWZpZWQiLCJtb2RpZmllZEJ5IiwieCIsInkiLCJuZXdFbnRpdHkiLCJwb3NpdGlvbiIsInNob3dTaG93VG9vbCIsInNob3dFZGl0VG9vbCIsImZpZWxkcyIsImFwcGVuZEZpZWxkIiwiY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsInNob3dFbnRpdHkiLCJjdXJyZW50VGFyZ2V0IiwiYXR0ciIsImVkaXRFbnRpdHkiLCJlZGl0RmllbGQiLCJma0VudGl0eSIsInBrRW50aXR5IiwibmV3Rm9yZWlnbktleSIsImdldCIsImZhaWwiLCJtZXNzYWdlIiwicmVqZWN0V2l0aCIsIkRlZmVycmVkIiwiYWx3YXlzIiwiX2VudGl0aWVzIiwicHJvbWlzZSIsInNldERpbWVuc2lvbnMiLCJnZXRDdXJyZW50Q2VsbCIsInNldEpTT04iLCJqc29uIiwiZnJvbUpTT04iLCJnZXRKU09OIiwidG9KU09OIiwiZXhwb3J0U2NoZW1hIiwic3RyaW5naWZ5IiwiYmxvYiIsIkJsb2IiLCJlbmRpbmdzIiwic2F2ZUFzIiwiZXJyb3IiLCJwcmludFNjaGVtYSIsInN2ZyIsInciLCJ3aW5kb3ciLCJvcGVuIiwid3JpdGUiLCJmaW5kIiwicHJpbnQiLCJjbG9zZSIsIndlYkFwcFVSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsImZvY3VzIiwiYW1pTG9naW4iLCJoYXNSb2xlIiwidGV4dCIsInZhbCIsInJhbmsiLCJkZXNjcmlwdGlvbiIsImJyaWRnZSIsInByb3AiLCJtb2RhbCIsIndlYkxpbmtTY3JpcHQiLCJyZWFkYWJsZSIsImF1dG9tYXRpYyIsInN0YXRhYmxlIiwiZ3JvdXBhYmxlIiwiZGlzcGxheWFibGUiLCJiYXNlNjQiLCJtaW1lIiwiY3RybCIsInRyaWdnZXIiLCJzZXRWYWx1ZSIsIlNjaGVtYUN0cmwiLCJyZXNldEVudGl0eSIsImNvbmZpcm0iLCJsb2NrIiwic3VjY2VzcyIsImFwcGx5RW50aXR5IiwicmVzZXRGaWVsZCIsImFwcGx5RmllbGQiLCJnZXRWYWx1ZSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBRUFBLFNBQVMsQ0FBQyxZQUFELEVBQWU7QUFDdkI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSFM7O0FBS3ZCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVZzQjs7QUFZdkI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsV0FBT0MsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsR0FBc0IscUNBRFEsRUFFOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix1Q0FGUSxFQUc5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLHFDQUhRO0FBSTlCO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixnQ0FMUTtBQU05QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsNkJBUFEsRUFROUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQiwrQkFSUTtBQVM5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsOEJBVlEsRUFXOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQiw0QkFYUTtB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QUFFM25CM0MsTUFBQUEsVUFBVSxDQUFDQyxPQUFYLENBQW1CLG1CQUFuQixFQUF3Q2pGLElBQXhDLENBQTZDLFlBQU07QUFFbERXLFFBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDd0osS0FBM0MsQ0FBaUQsTUFBakQ7QUFFQXRLLFFBQUFBLFNBQVMsQ0FBQ3NMLE9BQVYsQ0FBa0J4RCxPQUFPLEdBQUcsMEJBQTVCLEVBQXdELElBQXhEO0FBRUEsT0FORCxFQU1HRCxJQU5ILENBTVEsVUFBQ3pILElBQUQsRUFBTzBILE9BQVAsRUFBbUI7QUFFMUI5SCxRQUFBQSxTQUFTLENBQUNpSixLQUFWLENBQWdCbkIsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxPQVREO0FBV0EsS0FiRCxFQWFHRCxJQWJILENBYVEsVUFBQ3pILElBQUQsRUFBTzBILE9BQVAsRUFBbUI7QUFFMUI5SCxNQUFBQSxTQUFTLENBQUNpSixLQUFWLENBQWdCbkIsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxLQWhCRDtBQWtCQSxHQXBCRCxFQW9CR0QsSUFwQkgsQ0FvQlEsVUFBQ3pILElBQUQsRUFBTzBILE9BQVAsRUFBbUI7QUFFMUI5SCxJQUFBQSxTQUFTLENBQUNpSixLQUFWLENBQWdCbkIsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxHQXZCRDtBQXlCQTtBQUNBLENBdkVEO0FBeUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgam9pbnQsIHNhdmVBc1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1NjaGVtYUN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TY2hlbWEvY3NzL1NjaGVtYUN0cmwuY3NzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1NjaGVtYS90d2lnL1NjaGVtYUN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9TY2hlbWEvanNvbi9kYXRhdHlwZS5qc29uJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9maWxlc2F2ZXIubWluLmpzJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9sb2Rhc2gubWluLmpzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9iYWNrYm9uZS1taW4uanMnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzLzNyZC1wYXJ0eS9qb2ludC5taW4uY3NzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9qb2ludC5taW4uanMnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvU2NoZW1hL2pzL2pvaW50LnNoYXBlcy5zcWwuanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzFdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5fZmllbGRzID0gbnVsbDtcblx0XHRcdFx0dGhpcy5fZm9yZWlnbktleXMgPSBudWxsO1xuXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRDZWxsID0gbnVsbDtcblx0XHRcdFx0dGhpcy5fY3VycmVudENhdGFsb2cgPSBudWxsO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgTCA9IFsnPG9wdGlvbiB2YWx1ZT1cIkBOVUxMXCI+Tk9ORTwvb3B0aW9uPiddO1xuXG5cdFx0XHRcdGZvcihsZXQgZGF0YVR5cGUgaW4gZGF0YVsyXSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChkYXRhVHlwZSkgKyAnXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGRhdGFbMl1bZGF0YVR5cGVdKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQoJyNDRTU0MDQ4RF83MDJEXzAxMzJfNDY1OV85RTU1OEJFMkFDMTEnKS5odG1sKEwuam9pbignJykpLnNlbGVjdDIoe1xuXHRcdFx0XHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICdDaG9vc2UgYSBtZWRpYSB0eXBlJyxcblx0XHRcdFx0XHRkcm9wZG93blBhcmVudDogJCgnI0IwQkVCNUM3Xzg5NzhfNzQzM19GMDc2X0E1NUQyMDkxNzc3QyAubW9kYWwtYm9keScpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgTSA9IFsnPG9wdGlvbiB2YWx1ZT1cIkBOVUxMXCI+Tk9ORTwvb3B0aW9uPiddO1xuXG5cdFx0XHRcdGZvcihsZXQgY29udHJvbE5hbWUgaW4gYW1pV2ViQXBwLl9jb250cm9scylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdE0ucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChjb250cm9sTmFtZSkgKyAnXCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGNvbnRyb2xOYW1lKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQoJyNGM0YzMUQxRF82Qjc0X0Y0NTdfNEZEQ18xODg3QTU3RUQzREYnKS5odG1sKE0uam9pbignJykpLnNlbGVjdDIoe1xuXHRcdFx0XHRcdGFsbG93Q2xlYXI6IHRydWUsXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI6ICdDaG9vc2UgYSBjb250cm9sJyxcblx0XHRcdFx0XHRkcm9wZG93blBhcmVudDogJCgnI0IwQkVCNUM3Xzg5NzhfNzQzM19GMDc2X0E1NUQyMDkxNzc3QyAubW9kYWwtYm9keScpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzJyxcblx0XHRcdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5qcycsXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NvZGVtaXJyb3IvYWRkb24vZWRpdC9tYXRjaGJyYWNrZXRzLmpzJyxcblx0XHRcdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY29kZW1pcnJvci9tb2RlL2dyb292eS9ncm9vdnkuanMnLFxuXHRcdFx0XHRdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0Y29uc3QgZWRpdG9yID0gQ29kZU1pcnJvci5mcm9tVGV4dEFyZWEoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0U0RkU0REY0X0YxNzFfMTQ2N18wN0VEXzhCQjdFMEZGQzE1RicpLCB7XG5cdFx0XHRcdFx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRcdFx0XHRcdG1hdGNoQnJhY2tldHM6IHRydWUsXG5cdFx0XHRcdFx0XHRtb2RlOiAndGV4dC94LWdyb292eScsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdCQoJyNFNEZFNERGNF9GMTcxXzE0NjdfMDdFRF84QkI3RTBGRkMxNUYnKS5kYXRhKCdlZGl0b3InLCBlZGl0b3IpO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRlZGl0b3IucmVmcmVzaCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW19vbkZvY3VzLCBfb25CbHVyXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnb25Gb2N1cycsICdvbkJsdXInXSxcblx0XHRcdFtudWxsLCBudWxsXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdHRoaXMuX29uRm9jdXMgPSBfb25Gb2N1cztcblx0XHR0aGlzLl9vbkJsdXIgPSBfb25CbHVyO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZWwxID0gJCh0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yKTtcblxuXHRcdGVsMS5jc3MoJ2JveC1zaGFkb3cnLCAnMHB4IDFweCAwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSBpbnNldCwgMCAxcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpJyk7XG5cdFx0ZWwxLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCByZ2IoMjMxLCAyMzEsIDIzMSknKTtcblx0XHRlbDEuY3NzKCdib3JkZXItcmFkaXVzJywgJzRweCcpO1xuXHRcdGVsMS5jc3MoJ292ZXJmbG93LXgnLCAnc2Nyb2xsJyk7XG5cdFx0ZWwxLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcblx0XHRlbDEuY3NzKCdwYWRkaW5nJywgJzEwcHgnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGVsMiA9ICQoJzxkaXYgY2xhc3M9XCJhbWktc2NoZW1hXCI+PC9kaXY+JykuYXBwZW5kVG8oZWwxKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5ncmFwaCA9IG5ldyBqb2ludC5kaWEuR3JhcGgoKTtcblxuXHRcdHRoaXMucGFwZXIgPSBuZXcgam9pbnQuZGlhLlBhcGVyKHtcblx0XHRcdG1vZGVsOiB0aGlzLmdyYXBoLFxuXHRcdFx0ZWw6IGVsMixcblx0XHRcdHdpZHRoOiAxLFxuXHRcdFx0aGVpZ2h0OiAxLFxuXHRcdFx0Z3JpZFNpemU6IDUuMCxcblx0XHRcdGRyYXdHcmlkOiB7XG5cdFx0XHRcdG5hbWU6ICdkb3QnLFxuXHRcdFx0XHRhcmdzOiBbXG5cdFx0XHRcdFx0e2NvbG9yOiAncmVkJywgc2NhbGVGYWN0b3I6IDIsIHRoaWNrbmVzczogMX0sXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5wYXBlci5vbih7XG5cdFx0XHQnY2VsbDpwb2ludGVyY2xpY2snOiAoY2VsbFZpZXcpID0+IHtcblxuXHRcdFx0XHQkKCdnW21vZGVsLWlkXScpLnJlbW92ZUNsYXNzKCdhbWktc2NoZW1hLXNoYWRvdycpLmZpbHRlcignW21vZGVsLWlkPVwiJyArIGNlbGxWaWV3Lm1vZGVsLmlkICsgJ1wiXScpLmFkZENsYXNzKCdhbWktc2NoZW1hLXNoYWRvdycpO1xuXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRDZWxsID0gY2VsbFZpZXcubW9kZWw7XG5cblx0XHRcdFx0aWYodGhpcy5fb25Gb2N1cykge1xuXHRcdFx0XHRcdHRoaXMuX29uRm9jdXModGhpcy5fY3VycmVudENlbGwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2JsYW5rOnBvaW50ZXJkb3duJzogKGNlbGxWaWV3KSA9PiB7XG5cblx0XHRcdFx0JCgnZ1ttb2RlbC1pZF0nKS5yZW1vdmVDbGFzcygnYW1pLXNjaGVtYS1zaGFkb3cnKS8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi87XG5cblx0XHRcdFx0aWYodGhpcy5fb25CbHVyKSB7XG5cdFx0XHRcdFx0dGhpcy5fb25CbHVyKHRoaXMuX2N1cnJlbnRDZWxsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRDZWxsID0gLyotKi9udWxsLyotKi87XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnJlZnJlc2gobnVsbCwgc2V0dGluZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZpdFRvQ29udGVudDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5wYXBlci5maXRUb0NvbnRlbnQoe1xuXHRcdFx0cGFkZGluZzogMTAsXG5cdFx0XHRncmlkV2lkdGg6IDEwLFxuXHRcdFx0Z3JpZEhlaWdodDogMTAsXG5cdFx0XHRtaW5XaWR0aDogdGhpcy5fd2lkdGgsXG5cdFx0XHRtaW5IZWlnaHQ6IHRoaXMuX2hlaWdodCxcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlZnJlc2g6IGZ1bmN0aW9uKHJlc3VsdCwgY2F0YWxvZywgc2V0dGluZ3MpXG5cdHtcblx0XHR0aGlzLl9jdXJyZW50Q2F0YWxvZyA9IGNhdGFsb2c7XG5cblx0XHRjb25zdCBbY29udGV4dCwgX3dpZHRoLCBfaGVpZ2h0LCBfc2hvd1Nob3dUb29sLCBfc2hvd0VkaXRUb29sXSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2hvd1Nob3dUb29sJywgJ3Nob3dFZGl0VG9vbCddLFxuXHRcdFx0W3Jlc3VsdCwgMjAwMCwgMjAwMCwgZmFsc2UsIGZhbHNlXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdHRoaXMuX3dpZHRoID0gX3dpZHRoO1xuXHRcdHRoaXMuX2hlaWdodCA9IF9oZWlnaHQ7XG5cblx0XHR0aGlzLl9zaG93U2hvd1Rvb2wgPSBfc2hvd1Nob3dUb29sO1xuXHRcdHRoaXMuX3Nob3dFZGl0VG9vbCA9IF9zaG93RWRpdFRvb2w7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFjYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbbnVsbF0pO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdyYXBoLmNsZWFyKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0SlNPTlNjaGVtYSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogR0VUIFNDSEVNQSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCBzY2hlbWE7XG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRzY2hlbWEgPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCBkYXRhKVswXSB8fCAne30nKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoKGUpXG5cdFx0XHR7XG5cdFx0XHRcdHNjaGVtYSA9IHsvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovfTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEdFVCBDT0xVTU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgY250ID0gMDtcblxuXHRcdFx0bGV0IGVudGl0aWVzID0ge307XG5cblx0XHRcdHRoaXMuX2ZpZWxkcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuXG5cdFx0XHRcdGlmKChhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZXh0ZXJuYWxDYXRhbG9nXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJycpID09PSBjYXRhbG9nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgZW50aXR5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImVudGl0eVwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGZpZWxkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZpZWxkXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgdHlwZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJ0eXBlXCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgaGlkZGVuID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImhpZGRlblwifS4kJywgdmFsdWUpWzBdIHx8ICcnO1xuXHRcdFx0XHRcdGNvbnN0IGFkbWluT25seSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJhZG1pbk9ubHlcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBjcnlwdGVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyeXB0ZWRcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBwcmltYXJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInByaW1hcnlcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBjcmVhdGVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyZWF0ZWRcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBjcmVhdGVkQnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3JlYXRlZEJ5XCJ9LiQnLCB2YWx1ZSlbMF0gfHwgJyc7XG5cdFx0XHRcdFx0Y29uc3QgbW9kaWZpZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibW9kaWZpZWRcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblx0XHRcdFx0XHRjb25zdCBtb2RpZmllZEJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1vZGlmaWVkQnlcIn0uJCcsIHZhbHVlKVswXSB8fCAnJztcblxuXHRcdFx0XHRcdGlmKCEoZW50aXR5IGluIGVudGl0aWVzKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsZXQgeDtcblx0XHRcdFx0XHRcdGxldCB5O1xuXHRcdFx0XHRcdFx0bGV0IGNvbG9yO1xuXG5cdFx0XHRcdFx0XHRpZighKGVudGl0eSBpbiBzY2hlbWEpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR4ID0geVxuXHRcdFx0XHRcdFx0XHQgID0gMjAgKyAxMCAqIGNudCsrO1xuXHRcdFx0XHRcdFx0XHRjb2xvciA9ICcjMDA2NkNDJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0eCA9IHNjaGVtYVtlbnRpdHldLng7XG5cdFx0XHRcdFx0XHRcdHkgPSBzY2hlbWFbZW50aXR5XS55O1xuXHRcdFx0XHRcdFx0XHRjb2xvciA9IHNjaGVtYVtlbnRpdHldLmNvbG9yO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRlbnRpdGllc1tlbnRpdHldID0ge1xuXHRcdFx0XHRcdFx0XHRlbnRpdHk6IHRoaXMuZ3JhcGgubmV3RW50aXR5KHtcblx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0eDogeCxcblx0XHRcdFx0XHRcdFx0XHRcdHk6IHksXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRlbnRpdHk6IGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRjb2xvcjogY29sb3IsXG5cdFx0XHRcdFx0XHRcdFx0c2hvd1Nob3dUb29sOiB0aGlzLl9zaG93U2hvd1Rvb2wsXG5cdFx0XHRcdFx0XHRcdFx0c2hvd0VkaXRUb29sOiB0aGlzLl9zaG93RWRpdFRvb2wsXG5cdFx0XHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdFx0XHRmaWVsZHM6IFtdLFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZighKGZpZWxkIGluIGVudGl0aWVzW2VudGl0eV1bJ2ZpZWxkcyddKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlbnRpdGllc1tlbnRpdHldWydlbnRpdHknXS5hcHBlbmRGaWVsZCh7XG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZCxcblx0XHRcdFx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0XHRcdFx0aGlkZGVuOiBoaWRkZW4gPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0YWRtaW5Pbmx5OiBhZG1pbk9ubHkgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0Y3J5cHRlZDogY3J5cHRlZCA9PT0gJ3RydWUnLFxuXHRcdFx0XHRcdFx0XHRwcmltYXJ5OiBwcmltYXJ5ID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdGNyZWF0ZWQ6IGNyZWF0ZWQgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0Y3JlYXRlZEJ5OiBjcmVhdGVkQnkgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdFx0bW9kaWZpZWQ6IG1vZGlmaWVkID09PSAndHJ1ZScsXG5cdFx0XHRcdFx0XHRcdG1vZGlmaWVkQnk6IG1vZGlmaWVkQnkgPT09ICd0cnVlJyxcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5fc2VsZWN0b3IgKyAnIGEuc3FsLWVudGl0eS1zaG93LWxpbmsnKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLnNob3dFbnRpdHkoXG5cdFx0XHRcdFx0Y2F0YWxvZ1xuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1lbnRpdHknKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5fc2VsZWN0b3IgKyAnIGEuc3FsLWVudGl0eS1lZGl0LWxpbmsnKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLmVkaXRFbnRpdHkoXG5cdFx0XHRcdFx0Y2F0YWxvZ1xuXHRcdFx0XHRcdCxcblx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuYXR0cignZGF0YS1lbnRpdHknKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5fc2VsZWN0b3IgKyAnIGEuc3FsLWZpZWxkLWxpbmsnKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLmVkaXRGaWVsZChcblx0XHRcdFx0XHRjYXRhbG9nXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdFx0LFxuXHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWZpZWxkJylcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogR0VUIEZLRVlTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuX2ZvcmVpZ25LZXlzLmZvckVhY2goKHZhbHVlKSA9PiB7XG5cblx0XHRcdFx0aWYoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZrRXh0ZXJuYWxDYXRhbG9nXCJ9LiQnLCB2YWx1ZSlbMF0gPT09IGNhdGFsb2dcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInBrRXh0ZXJuYWxDYXRhbG9nXCJ9LiQnLCB2YWx1ZSlbMF0gPT09IGNhdGFsb2dcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdGNvbnN0IGZrRW50aXR5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZrRW50aXR5XCJ9LiQnLCB2YWx1ZSlbMF07XG5cdFx0XHRcdFx0Y29uc3QgcGtFbnRpdHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwicGtFbnRpdHlcIn0uJCcsIHZhbHVlKVswXTtcblxuXHRcdFx0XHRcdHRoaXMuZ3JhcGgubmV3Rm9yZWlnbktleShcblx0XHRcdFx0XHRcdGVudGl0aWVzW2ZrRW50aXR5XVsnZW50aXR5J10uZ2V0KCdpZCcpLFxuXHRcdFx0XHRcdFx0ZW50aXRpZXNbcGtFbnRpdHldWydlbnRpdHknXS5nZXQoJ2lkJylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZJVCBUTyBDT05URU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmZpdFRvQ29udGVudCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW3NjaGVtYV0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZWZyZXNoOiBmdW5jdGlvbihjYXRhbG9nLCBzZXR0aW5ncylcblx0e1xuXHRcdGxldCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldFNjaGVtYXMnKS5hbHdheXMoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5fZmllbGRzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJmaWVsZHNcIn0ucm93JywgZGF0YSkgfHwgW107XG5cdFx0XHR0aGlzLl9lbnRpdGllcyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZW50aXRpZXNcIn0ucm93JywgZGF0YSkgfHwgW107XG5cdFx0XHR0aGlzLl9mb3JlaWduS2V5cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZm9yZWlnbktleXNcIn0ucm93JywgZGF0YSkgfHwgW107XG5cblx0XHRcdHRoaXMuX3JlZnJlc2gocmVzdWx0LCBjYXRhbG9nLCBzZXR0aW5ncyk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y2xlYXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuZ3JhcGguY2xlYXIoKTtcblxuXHRcdHRoaXMucGFwZXIuc2V0RGltZW5zaW9ucygxLCAxKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0Q3VycmVudENlbGw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50Q2VsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0SlNPTjogZnVuY3Rpb24oanNvbilcblx0e1xuXHRcdHRoaXMuZ3JhcGguZnJvbUpTT04oanNvbik7XG5cblx0XHR0aGlzLmZpdFRvQ29udGVudCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKU09OOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLmZpdFRvQ29udGVudCgpO1xuXG5cdFx0cmV0dXJuIHRoaXMuZ3JhcGgudG9KU09OKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV4cG9ydFNjaGVtYTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0Y29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZ2V0SlNPTigpLCBudWxsLCA0KTtcblxuXHRcdFx0bGV0IGJsb2IgPSBuZXcgQmxvYihbanNvbl0sIHtcblx0XHRcdFx0dHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRlbmRpbmdzIDogJ25hdGl2ZScsXG5cdFx0XHR9KTtcblxuXHRcdFx0c2F2ZUFzKGJsb2IsICdzY2hlbWEuanNvbicpO1xuXHRcdH1cblx0XHRjYXRjaChlKVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5lcnJvcihlLCB0cnVlKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByaW50U2NoZW1hOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBzdmcgPSAkKHRoaXMuX3NlbGVjdG9yICsgJyBzdmcnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHcgPSB3aW5kb3cub3BlbignJywgJycsICdoZWlnaHQ9JyArIHN2Zy5oZWlnaHQoKSArICcsIHdpZHRoPScgKyBzdmcud2lkdGgoKSArICcsIHRvb2xiYXI9bm8nKTtcblxuXHRcdHcuZG9jdW1lbnQud3JpdGUoJzxodG1sPjxoZWFkPjxzdHlsZT5ib2R5IHsgbWFyZ2luOiAxMHB4OyB9IC5saW5rLXRvb2xzLCAubWFya2VyLXZlcnRpY2VzLCAubWFya2VyLWFycm93aGVhZHMsIC5jb25uZWN0aW9uLXdyYXAsIC5zcWwtZW50aXR5LWxpbmsgeyBkaXNwbGF5OiBub25lOyB9IC5jb25uZWN0aW9uIHsgZmlsbDogbm9uZTsgfTwvc3R5bGU+PC9oZWFkPjxib2R5PicgKyAkKCcjQzZEREZBRjZfOUU3NV80MUM1Xzg3QkRfMDg5NkI1Mjk5NTU5JykuaHRtbCgpICsgJzwvYm9keT48L2h0bWw+Jyk7XG5cblx0XHQkKHcuZG9jdW1lbnQpLmZpbmQoJ3N2ZycpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsICdub25lJyk7XG5cblx0XHR3LnByaW50KCk7XG5cdFx0dy5jbG9zZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dFbnRpdHk6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSlcblx0e1xuXHRcdHdpbmRvdy5vcGVuKGFtaVdlYkFwcC53ZWJBcHBVUkwgKyAnP3N1YmFwcD10YWJsZVZpZXdlciZ1c2VyZGF0YT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCd7XCJjYXRhbG9nXCI6IFwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIsIFwiZW50aXR5XCI6IFwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIn0nKSwgJ19ibGFuaycpLmZvY3VzKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGVkaXRFbnRpdHk6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSlcblx0e1xuXHRcdGlmKGFtaUxvZ2luLmhhc1JvbGUoJ0FNSV9BRE1JTicpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdHZXRFbnRpdHlJbmZvIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdCQoJyNBRjgyNkJCN19FN0E4X0M1QThfNzExQ184NEQwMEYwNDI0MTgnKS50ZXh0KGNhdGFsb2cpO1xuXHRcdFx0JCgnI0JBMjk1Q0VDX0YyNjJfQkI3Rl8wOUJGXzQ0MjBFOUVEQkQ2RScpLnRleHQoZW50aXR5KTtcblxuXHRcdFx0JCgnI0QxMEU0RUZEX0UyQzJfODQ5QV9FODBBX0M1Q0RGMzcwMTk5QycpLnZhbChjYXRhbG9nKTtcblx0XHRcdCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoZW50aXR5KTtcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHRjb25zdCByYW5rID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInJhbmtcIn0uJCcsIGRhdGEpWzBdIHx8ICc5OTknO1xuXHRcdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZGVzY3JpcHRpb25cIn0uJCcsIGRhdGEpWzBdIHx8ICdOL0EnO1xuXG5cdFx0XHRjb25zdCBicmlkZ2UgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiYnJpZGdlXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdCQoJyNGMDNEQTE5QV80MENFXzVDMTFfOTcxMl9BODI5MTdGQjA3QUYnKS52YWwocmFuayk7XG5cdFx0XHQkKCcjRTgzMTgzNEVfMUQ3Q19BMEY3X0IyNjZfRTVGNUY5Q0I0RjE2JykudmFsKGRlc2NyaXB0aW9uKTtcblxuXHRcdFx0JCgnI0UxQjhGNUIxXzlCRERfRDRBNV81NkIxXzU0MDUzNEUxN0IwOScpLnByb3AoJ2NoZWNrZWQnLCBicmlkZ2UgPT09ICd0cnVlJyk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0I3ODUyMjg0X0I2QzRfOEVENV81MDJEX0I4RUEyMjY4OUQyQScpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZWRpdEZpZWxkOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0aWYoYW1pTG9naW4uaGFzUm9sZSgnQU1JX0FETUlOJykgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldEZpZWxkSW5mbyAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbnRpdHkpICsgJ1wiIC1maWVsZD1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGZpZWxkKSArICdcIicpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0JCgnI0ExQUE1MDM0X0YxODNfOTM2NV8yRDA5X0RGODBGMTc3NUM5NScpLnRleHQoY2F0YWxvZyk7XG5cdFx0XHQkKCcjQzUyNjQ0Q0JfNDVFOV81ODZFX0RGMjNfMzhERDY5MTQ3NzM1JykudGV4dChlbnRpdHkpO1xuXHRcdFx0JCgnI0RFNkU5REIyX0JGRURfMTc4M19BNkY3X0Q4Q0FBRkZFRkREMCcpLnRleHQoZmllbGQpO1xuXG5cdFx0XHQkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKGNhdGFsb2cpO1xuXHRcdFx0JCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbChlbnRpdHkpO1xuXHRcdFx0JCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbChmaWVsZCk7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0Y29uc3QgcmFuayA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyYW5rXCJ9LiQnLCBkYXRhKVswXSB8fCAnOTk5Jztcblx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImRlc2NyaXB0aW9uXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblx0XHRcdGNvbnN0IHdlYkxpbmtTY3JpcHQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwid2ViTGlua1NjcmlwdFwifS4kJywgZGF0YSlbMF0gfHwgJ0BOVUxMJztcblxuXHRcdFx0Y29uc3QgaGlkZGVuID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImhpZGRlblwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGFkbWluT25seSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJhZG1pbk9ubHlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBjcnlwdGVkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImNyeXB0ZWRcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBwcmltYXJ5ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInByaW1hcnlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCByZWFkYWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJyZWFkYWJsZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblxuXHRcdFx0Y29uc3QgYXV0b21hdGljID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImF1dG9tYXRpY1wifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNyZWF0ZWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiY3JlYXRlZFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGNyZWF0ZWRCeSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjcmVhdGVkQnlcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBtb2RpZmllZCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJtb2RpZmllZFwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IG1vZGlmaWVkQnkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibW9kaWZpZWRCeVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblxuXHRcdFx0Y29uc3Qgc3RhdGFibGUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwic3RhdGFibGVcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBncm91cGFibGUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiZ3JvdXBhYmxlXCJ9LiQnLCBkYXRhKVswXSB8fCAnZmFsc2UnO1xuXG5cdFx0XHRjb25zdCBkaXNwbGF5YWJsZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJkaXNwbGF5YWJsZVwifS4kJywgZGF0YSlbMF0gfHwgJ2ZhbHNlJztcblx0XHRcdGNvbnN0IGJhc2U2NCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJiYXNlNjRcIn0uJCcsIGRhdGEpWzBdIHx8ICdmYWxzZSc7XG5cdFx0XHRjb25zdCBtaW1lID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm1pbWVcIn0uJCcsIGRhdGEpWzBdIHx8ICdATlVMTCc7XG5cdFx0XHRjb25zdCBjdHJsID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImN0cmxcIn0uJCcsIGRhdGEpWzBdIHx8ICdATlVMTCc7XG5cblx0XHRcdC8qKi9cblxuXHRcdFx0JCgnI0M2Q0E4OEZEXzU0OEFfRkUzMF85ODcxX0FGRTU1MzYyNDM5QicpLnZhbChyYW5rKTtcblx0XHRcdCQoJyNFOTgwMTMxNl8wRUM2X0Q2RjJfMEJDOV9FMUUxREMzQUJBMDAnKS52YWwoZGVzY3JpcHRpb24pO1xuXG5cdFx0XHQkKCcjRjgyQzdGODZfMTI2MF9ENUIxXzRDQkZfRUU1MTk0MTVCM0ZEJykucHJvcCgnY2hlY2tlZCcsIGhpZGRlbiA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNERUExNUEwRl81RUJGXzQ5RTdfM0U3NV9GMjk4NTAxODQ5NjgnKS5wcm9wKCdjaGVja2VkJywgYWRtaW5Pbmx5ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0UyRDhBNEVCXzEwNjVfMDFCNV9DOERCXzdCMkUwMUYwM0FENCcpLnByb3AoJ2NoZWNrZWQnLCBjcnlwdGVkID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0E0RjMzMzMyXzhERERfQjIzNV9GNTIzXzZBMzVCOTAyNTE5QycpLnByb3AoJ2NoZWNrZWQnLCBwcmltYXJ5ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0QxRDQ4MDY1XzNDNkJfQjBBMF9CQTdDXzhBMEQwQUI4NEY1NScpLnByb3AoJ2NoZWNrZWQnLCByZWFkYWJsZSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0JCgnI0VERUIwODY0Xzc2RkNfNUZDQ19DOTUxXzRGNTlBQzVCNTREMicpLnByb3AoJ2NoZWNrZWQnLCAvKi0tKi8gdHJ1ZSAvKi0tKi8pO1xuXHRcdFx0JCgnI0U3NDdCRjAyXzAzMUVfQTcwRF85MzI3XzdBOTc0RkRGN0U5NicpLnByb3AoJ2NoZWNrZWQnLCBhdXRvbWF0aWMgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQkM3RTVDQTFfMDlDOF9CQjVDXzIwRTJfQzBDRkUzMjA0MjI0JykucHJvcCgnY2hlY2tlZCcsIGNyZWF0ZWQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRkI5OThDMjhfMUU1OV8xMkEwXzFCMzRfMkMyQzBBNDRBNkFEJykucHJvcCgnY2hlY2tlZCcsIGNyZWF0ZWRCeSA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNBQURDMDIwRV9FMUNCX0JBOEVfRTg3MF8yN0I2MzY2NkM5ODgnKS5wcm9wKCdjaGVja2VkJywgbW9kaWZpZWQgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjRkFDRkU0NDNfNzJGM184OTE3XzJGMDhfOTM0RDg4RTU1RERDJykucHJvcCgnY2hlY2tlZCcsIG1vZGlmaWVkQnkgPT09ICd0cnVlJyk7XG5cblx0XHRcdCQoJyNGMjZDMEQzRF9CNTE2XzA2RUFfOTBGNl8wRTNCMTdEMkFGNUQnKS5wcm9wKCdjaGVja2VkJywgc3RhdGFibGUgPT09ICd0cnVlJyk7XG5cdFx0XHQkKCcjQkEwODUwNURfQzQ2OF81NjAyXzk3NDVfMTIzNjlFMUY2MzE4JykucHJvcCgnY2hlY2tlZCcsIGdyb3VwYWJsZSA9PT0gJ3RydWUnKTtcblxuXHRcdFx0JCgnI0IzRjZFMzY5X0E3RTRfMjZCNl9DMUVCX0IyRkM4NTVDMUI3QScpLnByb3AoJ2NoZWNrZWQnLCBkaXNwbGF5YWJsZSA9PT0gJ3RydWUnKTtcblx0XHRcdCQoJyNGNTkyMjc1Ql8yMTk5Xzc5NjJfRDI3MF9DQkVFMzhCODJEQUYnKS5wcm9wKCdjaGVja2VkJywgYmFzZTY0ID09PSAndHJ1ZScpO1xuXHRcdFx0JCgnI0NFNTQwNDhEXzcwMkRfMDEzMl80NjU5XzlFNTU4QkUyQUMxMScpLnZhbChtaW1lKS50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuXHRcdFx0JCgnI0YzRjMxRDFEXzZCNzRfRjQ1N180RkRDXzE4ODdBNTdFRDNERicpLnZhbChjdHJsKS50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuXG5cdFx0XHQvKiovXG5cblx0XHRcdCQoJyNFNEZFNERGNF9GMTcxXzE0NjdfMDdFRF84QkI3RTBGRkMxNUYnKS5kYXRhKCdlZGl0b3InKS5zZXRWYWx1ZSh3ZWJMaW5rU2NyaXB0KTtcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5TY2hlbWFDdHJsLnJlc2V0RW50aXR5ID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZW50aXR5XCIgLWtleUZpZWxkcz1cImNhdGFsb2d8ZW50aXR5XCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0ZsdXNoU2VydmVyQ2FjaGVzJykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQoJyNCNzg1MjI4NF9CNkM0XzhFRDVfNTAyRF9COEVBMjI2ODlEMkEnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5TY2hlbWFDdHJsLmFwcGx5RW50aXR5ID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Y29uc3QganNvbiA9IHtcblx0XHQnYnJpZGdlJzogJCgnI0UxQjhGNUIxXzlCRERfRDRBNV81NkIxXzU0MDUzNEUxN0IwOScpLnByb3AoJ2NoZWNrZWQnKSxcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZW50aXR5XCIgLWtleUZpZWxkcz1cImNhdGFsb2d8ZW50aXR5XCIgLWtleVZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoLyoqLydBZGRFbGVtZW50IC1zZXBhcmF0b3I9XCJ8XCIgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9lbnRpdHlcIiAtZmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8cmFua3xqc29ufGRlc2NyaXB0aW9uXCIgLXZhbHVlcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNEMTBFNEVGRF9FMkMyXzg0OUFfRTgwQV9DNUNERjM3MDE5OUMnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFMUU4QTRENF8wRjgzXzM5QzRfRUZERl9ENjg3NDc5QzZCMjUnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNGMDNEQTE5QV80MENFXzVDMTFfOTcxMl9BODI5MTdGQjA3QUYnKS52YWwoKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KGpzb24pKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0U4MzE4MzRFXzFEN0NfQTBGN19CMjY2X0U1RjVGOUNCNEYxNicpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdGbHVzaFNlcnZlckNhY2hlcycpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdCQoJyNCNzg1MjI4NF9CNkM0XzhFRDVfNTAyRF9COEVBMjI2ODlEMkEnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UgKyAnLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlJywgdHJ1ZSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0fSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuU2NoZW1hQ3RybC5yZXNldEZpZWxkID0gZnVuY3Rpb24oKVxue1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZmllbGRcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8ZmllbGRcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0M3OEI2MzBDXzk4MDVfN0QxNV9DMTRGXzRDN0MyNzZFOUUyQycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0JCgnI0IwQkVCNUM3Xzg5NzhfNzQzM19GMDc2X0E1NUQyMDkxNzc3QycpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UgKyAnLCBwbGVhc2UgcmVsb2FkIHRoZSBwYWdlJywgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblNjaGVtYUN0cmwuYXBwbHlGaWVsZCA9IGZ1bmN0aW9uKClcbntcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHR7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGNvbnN0IGpzb24gPSB7XG5cdFx0J2hpZGRlbic6ICQoJyNGODJDN0Y4Nl8xMjYwX0Q1QjFfNENCRl9FRTUxOTQxNUIzRkQnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2FkbWluT25seSc6ICQoJyNERUExNUEwRl81RUJGXzQ5RTdfM0U3NV9GMjk4NTAxODQ5NjgnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2NyeXB0ZWQnOiAkKCcjRTJEOEE0RUJfMTA2NV8wMUI1X0M4REJfN0IyRTAxRjAzQUQ0JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdwcmltYXJ5JzogJCgnI0E0RjMzMzMyXzhERERfQjIzNV9GNTIzXzZBMzVCOTAyNTE5QycpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQncmVhZGFibGUnOiAkKCcjRDFENDgwNjVfM0M2Ql9CMEEwX0JBN0NfOEEwRDBBQjg0RjU1JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdhdXRvbWF0aWMnOiAkKCcjRTc0N0JGMDJfMDMxRV9BNzBEXzkzMjdfN0E5NzRGREY3RTk2JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdjcmVhdGVkJzogJCgnI0JDN0U1Q0ExXzA5QzhfQkI1Q18yMEUyX0MwQ0ZFMzIwNDIyNCcpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnY3JlYXRlZEJ5JzogJCgnI0ZCOTk4QzI4XzFFNTlfMTJBMF8xQjM0XzJDMkMwQTQ0QTZBRCcpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnbW9kaWZpZWQnOiAkKCcjQUFEQzAyMEVfRTFDQl9CQThFX0U4NzBfMjdCNjM2NjZDOTg4JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdtb2RpZmllZEJ5JzogJCgnI0ZBQ0ZFNDQzXzcyRjNfODkxN18yRjA4XzkzNEQ4OEU1NUREQycpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHQnc3RhdGFibGUnOiAkKCcjRjI2QzBEM0RfQjUxNl8wNkVBXzkwRjZfMEUzQjE3RDJBRjVEJykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdncm91cGFibGUnOiAkKCcjQkEwODUwNURfQzQ2OF81NjAyXzk3NDVfMTIzNjlFMUY2MzE4JykucHJvcCgnY2hlY2tlZCcpLFxuXHRcdCdkaXNwbGF5YWJsZSc6ICQoJyNCM0Y2RTM2OV9BN0U0XzI2QjZfQzFFQl9CMkZDODU1QzFCN0EnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J2Jhc2U2NCc6ICQoJyNGNTkyMjc1Ql8yMTk5Xzc5NjJfRDI3MF9DQkVFMzhCODJEQUYnKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0J21pbWUnOiAkKCcjQ0U1NDA0OERfNzAyRF8wMTMyXzQ2NTlfOUU1NThCRTJBQzExJykudmFsKCksXG5cdFx0J2N0cmwnOiAkKCcjRjNGMzFEMURfNkI3NF9GNDU3XzRGRENfMTg4N0E1N0VEM0RGJykudmFsKCksXG5cdFx0J3dlYkxpbmtTY3JpcHQnOiAkKCcjRTRGRTRERjRfRjE3MV8xNDY3XzA3RURfOEJCN0UwRkZDMTVGJykuZGF0YSgnZWRpdG9yJykuZ2V0VmFsdWUoKSxcblx0fTtcblxuXHRpZighanNvbi5taW1lIHx8IGpzb24ubWltZS50b1VwcGVyQ2FzZSgpID09PSAnQE5VTEwnKSB7XG5cdFx0anNvbi5taW1lID0gbnVsbDtcblx0fVxuXG5cdGlmKCFqc29uLmN0cmwgfHwganNvbi5jdHJsLnRvVXBwZXJDYXNlKCkgPT09ICdATlVMTCcpIHtcblx0XHRqc29uLmN0cmwgPSBudWxsO1xuXHR9XG5cblx0aWYoIWpzb24ud2ViTGlua1NjcmlwdCB8fCBqc29uLndlYkxpbmtTY3JpcHQudG9VcHBlckNhc2UoKSA9PT0gJ0BOVUxMJykge1xuXHRcdGpzb24ud2ViTGlua1NjcmlwdCA9IG51bGw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0YW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVFbGVtZW50cyAtc2VwYXJhdG9yPVwifFwiIC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfZmllbGRcIiAta2V5RmllbGRzPVwiY2F0YWxvZ3xlbnRpdHl8ZmllbGRcIiAta2V5VmFsdWVzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0M3OEI2MzBDXzk4MDVfN0QxNV9DMTRGXzRDN0MyNzZFOUUyQycpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0I0OTVGRjJCXzQ1QTJfRjNDQV9DODEwXzU1RkMwNTQ4NzJEMicpLnZhbCgpKSArICd8JyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoJCgnI0MzRTIyMUE2XzZCMzNfNkE1Ml9CN0QxXzU3Q0IwMjI4QkIwNycpLnZhbCgpKSArICdcIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgvKiovJ0FkZEVsZW1lbnQgLXNlcGFyYXRvcj1cInxcIiAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwicm91dGVyX2ZpZWxkXCIgLWZpZWxkcz1cImNhdGFsb2d8ZW50aXR5fGZpZWxkfHJhbmt8anNvbnxkZXNjcmlwdGlvblwiIC12YWx1ZXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzc4QjYzMENfOTgwNV83RDE1X0MxNEZfNEM3QzI3NkU5RTJDJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQjQ5NUZGMkJfNDVBMl9GM0NBX0M4MTBfNTVGQzA1NDg3MkQyJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzNFMjIxQTZfNkIzM182QTUyX0I3RDFfNTdDQjAyMjhCQjA3JykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZygkKCcjQzZDQTg4RkRfNTQ4QV9GRTMwXzk4NzFfQUZFNTUzNjI0MzlCJykudmFsKCkpICsgJ3wnICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShqc29uKSkgKyAnfCcgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKCQoJyNFOTgwMTMxNl8wRUM2X0Q2RjJfMEJDOV9FMUUxREMzQUJBMDAnKS52YWwoKSkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHQkKCcjQjBCRUI1QzdfODk3OF83NDMzX0YwNzZfQTU1RDIwOTE3NzdDJykubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlICsgJywgcGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsIHRydWUpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdH0pO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
