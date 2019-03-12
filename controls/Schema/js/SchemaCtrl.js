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
    amiWebApp.originURL + '/js/3rd-party/jointjs/lodash.min.js', amiWebApp.originURL + '/js/3rd-party/jointjs/backbone-min.js',
    /**/
    amiWebApp.originURL + '/css/3rd-party/jointjs/joint.min.css', amiWebApp.originURL + '/js/3rd-party/jointjs/joint.min.js',
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
          var cnt = 0;
          $('#B0BEB5C7_8978_7433_F076_A55D2091777C').on('shown.bs.modal', function () {
            if (cnt++ === 0) {
              CodeMirror.fromTextArea(document.getElementById('E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F'), {
                lineNumbers: true,
                matchBrackets: true,
                mode: 'text/x-groovy'
              });
            }
          });
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

    if (this._fields && this._foreignKeys) {
      this._refresh(result, catalog, settings);
    } else {
      amiCommand.execute('GetSchemas').always(function (data) {
        _this4._fields = amiWebApp.jspath('..rowset{.@type==="fields"}.row', data) || [];
        _this4._foreignKeys = amiWebApp.jspath('..rowset{.@type==="foreignKeys"}.row', data) || [];

        _this4._refresh(result, catalog, settings);
      });
    }

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

    amiCommand.execute('GetSessionInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '"').done(function (data) {
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
      var adminOnly = amiWebApp.jspath('..field{.@name==="adminOnly"}.$', data)[0] || 'false';
      var hidden = amiWebApp.jspath('..field{.@name==="hidden"}.$', data)[0] || 'false';
      var crypted = amiWebApp.jspath('..field{.@name==="crypted"}.$', data)[0] || 'false';
      var primary = amiWebApp.jspath('..field{.@name==="primary"}.$', data)[0] || 'false';
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
      $('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').val(webLinkScript);
      $('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked', adminOnly === 'true');
      $('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked', hidden === 'true');
      $('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked', crypted === 'true');
      $('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked', primary === 'true');
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
      amiWebApp.success(message + ', please reload the page', true
      /*---------*/
      );
    }).fail(function (data, message) {
      amiWebApp.error(message, true, '#C3F91880_2CD8_96B3_1093_65CD7AD615C4');
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true, '#C3F91880_2CD8_96B3_1093_65CD7AD615C4');
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
        amiWebApp.success(message + ', please reload the page', true
        /*---------*/
        );
      }).fail(function (data, message) {
        amiWebApp.error(message, true, '#C3F91880_2CD8_96B3_1093_65CD7AD615C4');
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true, '#C3F91880_2CD8_96B3_1093_65CD7AD615C4');
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true, '#C3F91880_2CD8_96B3_1093_65CD7AD615C4');
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
      amiWebApp.success(message + ', please reload the page', true
      /*---------*/
      );
    }).fail(function (data, message) {
      amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
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
    'AddElement -separator="|" -catalog="self" -entity="router_field" -fields="catalog|entity|field|rank|isHidden|isAdminOnly|isCrypted|isPrimary|isCreated|isCreatedBy|isModified|isModifiedBy|isStatable|isGroupable|isDisplayable|isBase64|mime|ctrl|description|webLinkScript" -values="' + amiWebApp.textToString($('#C78B630C_9805_7D15_C14F_4C7C276E9E2C').val()) + '|' + amiWebApp.textToString($('#B495FF2B_45A2_F3CA_C810_55FC054872D2').val()) + '|' + amiWebApp.textToString($('#C3E221A6_6B33_6A52_B7D1_57CB0228BB07').val()) + '|' + amiWebApp.textToString($('#C6CA88FD_548A_FE30_9871_AFE55362439B').val()) + '|' + ($('#F82C7F86_1260_D5B1_4CBF_EE519415B3FD').prop('checked') ? '1' : '0') + '|' + ($('#DEA15A0F_5EBF_49E7_3E75_F29850184968').prop('checked') ? '1' : '0') + '|' + ($('#E2D8A4EB_1065_01B5_C8DB_7B2E01F03AD4').prop('checked') ? '1' : '0') + '|' + ($('#A4F33332_8DDD_B235_F523_6A35B902519C').prop('checked') ? '1' : '0') + '|' + ($('#BC7E5CA1_09C8_BB5C_20E2_C0CFE3204224').prop('checked') ? '1' : '0') + '|' + ($('#FB998C28_1E59_12A0_1B34_2C2C0A44A6AD').prop('checked') ? '1' : '0') + '|' + ($('#AADC020E_E1CB_BA8E_E870_27B63666C988').prop('checked') ? '1' : '0') + '|' + ($('#FACFE443_72F3_8917_2F08_934D88E55DDC').prop('checked') ? '1' : '0') + '|' + ($('#F26C0D3D_B516_06EA_90F6_0E3B17D2AF5D').prop('checked') ? '1' : '0') + '|' + ($('#BA08505D_C468_5602_9745_12369E1F6318').prop('checked') ? '1' : '0') + '|' + ($('#B3F6E369_A7E4_26B6_C1EB_B2FC855C1B7A').prop('checked') ? '1' : '0') + '|' + ($('#F592275B_2199_7962_D270_CBEE38B82DAF').prop('checked') ? '1' : '0') + '|' + amiWebApp.textToString($('#CE54048D_702D_0132_4659_9E558BE2AC11').val()) + '|' + amiWebApp.textToString($('#F3F31D1D_6B74_F457_4FDC_1887A57ED3DF').val()) + '|' + amiWebApp.textToString($('#E9801316_0EC6_D6F2_0BC9_E1E1DC3ABA00').val()) + '|' + amiWebApp.textToString($('#E4FE4DF4_F171_1467_07ED_8BB7E0FFC15F').val()) + '"').done(function (data, message) {
      amiCommand.execute('FlushServerCaches').done(function () {
        $('#B0BEB5C7_8978_7433_F076_A55D2091777C').modal('hide');
        amiWebApp.success(message + ', please reload the page', true
        /*---------*/
        );
      }).fail(function (data, message) {
        amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
    });
  }).fail(function (data, message) {
    amiWebApp.error(message, true, '#F7A1EF6C_34F4_9A58_EEAD_F0DB92DCB886');
  });
  /*---------------------------------------------------------------------*/
};
/*-------------------------------------------------------------------------*/
