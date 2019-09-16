/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global xqlGetRegions
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('TableCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    /*-----------------------------------------------------------------*/
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/Table/twig/TableCtrl.twig',
    /**/
    amiWebApp.originURL + '/controls/Table/twig/refineModal.twig',
    /**/
    amiWebApp.originURL + '/controls/Table/twig/table.twig', amiWebApp.originURL + '/controls/Table/twig/js.twig', amiWebApp.originURL + '/controls/Table/twig/export.twig',
    /**/
    amiWebApp.originURL + '/controls/Table/js/libxql.js',
    /**/
    amiWebApp.originURL + '/js/3rd-party/filesaver.min.js',
    /**/
    'ctrl:fieldEditor', 'ctrl:unitEditor', 'ctrl:tab']).done(function (data) {
      amiWebApp.appendHTML('body', data[1]).done(function () {
        _this.fragmentTableCtrl = data[0];
        _this.fragmentTable = data[2];
        _this.fragmentJS = data[3];
        _this.fragmentExport = data[4];
        _this.fieldEditorCtor = data[7];
        _this.fieldUnitCtor = data[8];
        _this.tabCtor = data[9];
      });
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, command, settings) {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    amiWebApp.lock();
    /*-----------------------------------------------------------------*/

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    this.ctx = {
      isEmbedded: amiWebApp.isEmbedded(),
      endpoint: amiCommand.endpoint,
      command: command.trim(),

      /**/
      sql: 'N/A',
      mql: 'N/A',
      ast: 'N/A',
      currentTabIndex: 0
    };

    var _amiWebApp$setup = amiWebApp.setup(['context', 'enableCache', 'enableCount', 'showPrimaryField', 'showToolBar', 'showDetails', 'showTools', 'canEdit', 'catalog', 'entity', 'primaryField', 'rowset', 'start', 'stop', 'orderBy', 'orderWay', 'maxCellLength', 'card'], [result, false, true, true, true, false, true, false, '', '', '', '', 1, 10, '', '', 64, false], settings),
        context = _amiWebApp$setup[0],
        enableCache = _amiWebApp$setup[1],
        enableCount = _amiWebApp$setup[2],
        showPrimaryField = _amiWebApp$setup[3],
        showToolBar = _amiWebApp$setup[4],
        showDetails = _amiWebApp$setup[5],
        showTools = _amiWebApp$setup[6],
        canEdit = _amiWebApp$setup[7],
        catalog = _amiWebApp$setup[8],
        entity = _amiWebApp$setup[9],
        primaryField = _amiWebApp$setup[10],
        rowset = _amiWebApp$setup[11],
        start = _amiWebApp$setup[12],
        stop = _amiWebApp$setup[13],
        orderBy = _amiWebApp$setup[14],
        orderWay = _amiWebApp$setup[15],
        maxCellLength = _amiWebApp$setup[16],
        card = _amiWebApp$setup[17];

    this.ctx.enableCache = enableCache;
    this.ctx.enableCount = enableCount;
    this.ctx.showPrimaryField = showPrimaryField;
    this.ctx.showToolBar = showToolBar;
    this.ctx.showDetails = showDetails;
    this.ctx.showTools = showTools;
    this.ctx.canEdit = canEdit;
    this.ctx.catalog = catalog;
    this.ctx.entity = entity;
    this.ctx.rowset = rowset;
    this.ctx.start = start;
    this.ctx.stop = stop;
    this.ctx.orderBy = orderBy;
    this.ctx.orderWay = orderWay;
    this.ctx.maxCellLength = maxCellLength;
    this.ctx.card = card;
    /*-----------------------------------------------------------------*/

    this.ctx.ignoredFields = {
      'ORACLE_ROWNUM': '',
      'PROJECT': '',
      'PROCESS': '',
      'AMIENTITYNAME': '',
      'AMIELEMENTID': '',
      'AMICREATED': '',
      'AMILASTMODIFIED': '',
      'AMISYSDATE': ''
    };
    /*-----------------------------------------------------------------*/

    this.fieldEditor = new this.fieldEditorCtor(this, this);
    this.unitEditor = new this.fieldUnitCtor(this, this);
    /*-----------------------------------------------------------------*/

    if (this.ctx.canEdit || (this.ctx.showDetails || this.ctx.showTools) && !this.ctx.primaryField) {
      this.fieldEditor.getInfo(catalog, entity, primaryField).done(function (primaryField) {
        _this2.ctx.primaryField = primaryField;
        _this2.ctx.showDetails = _this2.ctx.showDetails && !!primaryField;
        _this2.ctx.showTools = _this2.ctx.showTools && !!primaryField;
        _this2.ctx.canEdit = _this2.ctx.canEdit && !!primaryField;

        _this2._render(result, selector);
      }).fail(function () {
        _this2.ctx.primaryField = primaryField;
        _this2.ctx.showDetails = _this2.ctx.showDetails && !!primaryField;
        _this2.ctx.showTools = _this2.ctx.showTools && !!primaryField;
        _this2.ctx.canEdit =
        /*----------*/
        false
        /*----------*/
        ;

        _this2._render(result, selector);
      });
    } else {
      this.ctx.primaryField = primaryField;
      this.ctx.showDetails = this.ctx.showDetails && !!primaryField;
      this.ctx.showTools = this.ctx.showTools && !!primaryField;
      this.ctx.canEdit =
      /*----------*/
      false
      /*----------*/
      ;

      this._render(result, selector);
    }
    /*-----------------------------------------------------------------*/


    return result.always(function () {
      amiWebApp.unlock();
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  _render: function _render(result, selector) {
    var _this3 = this;

    if (this.getParent().$name !== 'TabCtrl') {
      var tab = new this.tabCtor(null, this);
      tab.render(selector, this.ctx).done(function () {
        tab.appendItem('<i class="fa fa-table"></i> ' + _this3.ctx.entity, {
          closable: false,
          firstVisible: false
        }).done(function (selector) {
          _this3.setParent(tab);

          _this3.__render(result, selector);
        });
      });
    } else {
      this.__render(result, selector);
    }
  },

  /*---------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this4 = this;

    this.replaceHTML(selector, this.fragmentTableCtrl, {
      dict: this.ctx
    }).done(function () {
      /*-------------------------------------------------------------*/
      $(_this4.patchId('#BA1A7EEA_2BB5_52F2_5BCF_64B0C381B570')).click(function () {
        _this4.firstPage().fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      $(_this4.patchId('#BB126294_FFC2_24B8_8765_CF653EB950F7')).click(function () {
        _this4.prevPage().fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      $(_this4.patchId('#E7FDF4C8_ECD2_3FE0_8C75_541E511239C2')).click(function () {
        _this4.nextPage().fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      $(_this4.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).click(function () {
        _this4.lastPage().fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      /*-------------------------------------------------------------*/

      $(_this4.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).keypress(function (e) {
        if (e.keyCode == 13) {
          _this4.refresh().fail(function (message) {
            amiWebApp.error(message, true);
          });
        }
      });
      $(_this4.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).keypress(function (e) {
        if (e.keyCode == 13) {
          _this4.refresh().fail(function (message) {
            amiWebApp.error(message, true);
          });
        }
      });
      $(_this4.patchId('#D809166F_A40B_2376_C8A5_977AA0C8C408')).click(function () {
        _this4.refresh().fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      /*-------------------------------------------------------------*/

      $(_this4.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(function () {
        _this4.setMode();
      });
      $(_this4.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850')).click(function () {
        _this4.showRowModal();
      });
      /*-------------------------------------------------------------*/

      amiWebApp.lock();
      amiCommand.execute('ListConverters').done(function (data, message) {
        var xslts = amiWebApp.jspath('..field{.@name==="xslt" && .$!==="AMIXmlToXml.xsl" && .$!==="AMIXmlToJson.xsl" && .$!==="AMIXmlToCsv.xsl" && .$!==="AMIXmlToText.xsl" }.$', data) || [];

        _this4.replaceHTML(_this4.patchId('#A49B2730_4FAB_F089_5864_41029D65BF05'), _this4.fragmentExport, {
          dict: _this4.ctx,
          xslts: xslts
        }).done(function () {
          $(_this4.patchId('#A49B2730_4FAB_F089_5864_41029D65BF05') + ' a').click(function (e) {
            _this4.exportResult(e.currentTarget.getAttribute('xslt'));
          });
        });

        amiWebApp.unlock();
      }).fail(function (data, message) {
        amiWebApp.error(message);
      }); //			$(this.patchId('#C9F4DBE7_EF4F_09F1_C31D_97581978BD13')).click(() => {
      //
      //				this.exportResult('AMIXmlToXml.xsl');
      //			});
      //
      //			$(this.patchId('#A4B03239_52F9_5FBB_0799_C932B9E95FCD')).click(() => {
      //
      //				this.exportResult('AMIXmlToJson.xsl');
      //			});
      //
      //			$(this.patchId('#C6182164_9432_FA0C_5273_EFF56376660E')).click(() => {
      //
      //				this.exportResult('AMIXmlToCsv.xsl');
      //			});
      //
      //			$(this.patchId('#B8CCCCA1_9829_3EA5_280E_ED47FCD33ADE')).click(() => {
      //
      //				this.exportResult('AMIXmlToText.xsl');
      //			});

      /*-------------------------------------------------------------*/

      $(_this4.patchId('#C8CB30DC_414F_7559_B618_42B7CC04F993')).click(function (e) {
        /*---------------------------------------------------------*/
        $(e.currentTarget).tooltip('hide');
        /*---------------------------------------------------------*/

        amiWebApp.createControl(_this4.getParent(), _this4, 'editBox', [_this4.ctx.command], {}).done(function (instance, command) {
          /*-----------------------------------------------------*/
          _this4.ctx.command = command;
          /*-----------------------------------------------------*/

          _this4.refresh().fail(function (message) {
            amiWebApp.error(message, true);
          });
          /*-----------------------------------------------------*/

        });
        /*---------------------------------------------------------*/
      });
      /*-------------------------------------------------------------*/

      $(_this4.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'messageBox', [_this4.ctx.sql], {});
      });
      $(_this4.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'messageBox', [_this4.ctx.mql], {});
      });
      $(_this4.patchId('#EF739EE0_DB79_0A4E_9FDD_7BA3C0F74F92')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'messageBox', [_this4.ctx.command2.startsWith('BrowseQuery') ? 'SearchQuery' + _this4.ctx.command2.substring(11) : _this4.ctx.command2], {});
      });
      $(_this4.patchId('#D49853E2_9319_52C3_5253_A208F9500408')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'messageBox', [_this4.ctx.command.startsWith('BrowseQuery') ? 'SearchQuery' + _this4.ctx.command.substring(11) : _this4.ctx.command], {});
      });
      $(_this4.patchId('#C50C3427_FEE5_F115_1FEC_6A6668763EC4')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'textBox', [_this4.ctx.js], {});
      });
      /*-------------------------------------------------------------*/

      $(_this4.patchId('#F1C79246_17B2_B9B0_3ABF_8C10FA0852DD')).click(function () {
        /*---------------------------------------------------------*/
        var params = [_this4.ctx.command];
        var settings = {
          enableCache: _this4.ctx.enableCache,
          enableCount: _this4.ctx.enableCount,

          /**/
          showPrimaryField: _this4.ctx.showPrimaryField,
          showToolBar: _this4.ctx.showToolBar,
          showDetails: _this4.ctx.showDetails,
          showTools: _this4.ctx.showTools,
          canEdit: _this4.ctx.canEdit,

          /**/
          catalog: _this4.ctx.catalog,
          entity: _this4.ctx.entity,
          primaryField: _this4.ctx.primaryField,
          rowset: _this4.ctx.rowset,

          /**/
          start: _this4.ctx.start,
          stop: _this4.ctx.stop,
          orderBy: _this4.ctx.orderBy,
          orderWay: _this4.ctx.orderWay,

          /**/
          maxCellLength: _this4.ctx.maxCellLength,

          /**/
          card: _this4.ctx.card
        };
        /*---------------------------------------------------------*/

        var autoRefresh = confirm('Auto-refresh new widget?');
        /*---------------------------------------------------------*/

        amiWebApp.lock();
        amiCommand.execute('AddWidget -control="Table" -params="' + amiWebApp.textToString(JSON.stringify(params)) + '" -settings="' + amiWebApp.textToString(JSON.stringify(settings)) + '" -transparent' + (autoRefresh ? ' -autoRefresh' : '')).done(function (data, message) {
          amiWebApp.success(message);
        }).fail(function (data, message) {
          amiWebApp.error(message);
        });
        /*---------------------------------------------------------*/
      });
      /*-------------------------------------------------------------*/

      _this4.refresh().done(function (fieldDescriptions, rows, sql, mql, ast, totalNumberOfRows) {
        result.resolveWith(_this4.ctx.context, [fieldDescriptions, rows, sql, mql, ast, totalNumberOfRows]);
      }).fail(function (message) {
        result.rejectWith(_this4.ctx.context, [message]);
      });
      /*-------------------------------------------------------------*/

    });
  },

  /*---------------------------------------------------------------------*/
  parsePageNumber: function parsePageNumber(s, defaultPageNumber) {
    var parsedPageNumber = parseInt(s);
    return Number.isNaN(parsedPageNumber) === false && parsedPageNumber > 0 ? parsedPageNumber : defaultPageNumber;
  },

  /*---------------------------------------------------------------------*/
  getOffsetOfLastPage: function getOffsetOfLastPage(range) {
    var modulo = this.ctx.totalNumberOfRows % range;
    return this.ctx.totalNumberOfRows > modulo ? this.ctx.totalNumberOfRows - modulo + 1 : 0x0000000000000000000000000000000000001;
  },

  /*---------------------------------------------------------------------*/
  firstPage: function firstPage() {
    var oldStart = this.parsePageNumber($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start);
    var oldStop = this.parsePageNumber($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop);
    var range = oldStop - oldStart + 1;
    var newStart = 0x00000000000000000000000000001;
    var newStop = newStart + range - 1;
    $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
    $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
    return this.refresh();
  },

  /*---------------------------------------------------------------------*/
  lastPage: function lastPage() {
    var oldStart = this.parsePageNumber($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start);
    var oldStop = this.parsePageNumber($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop);
    var range = oldStop - oldStart + 1;
    var newStart = this.getOffsetOfLastPage(range);
    var newStop = newStart + range - 1;
    $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
    $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
    return this.refresh();
  },

  /*---------------------------------------------------------------------*/
  prevPage: function prevPage() {
    var oldStart = this.parsePageNumber($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start);
    var oldStop = this.parsePageNumber($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop);
    var range = oldStop - oldStart + 1;
    var newStart = oldStart - range;
    var newStop = oldStop - range;

    if (newStart >= 1 && newStop >= 1) {
      $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
      $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
    } else {
      $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(0x0001);
      $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(range);
    }

    return this.refresh();
  },

  /*---------------------------------------------------------------------*/
  nextPage: function nextPage() {
    var oldStart = this.parsePageNumber($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start);
    var oldStop = this.parsePageNumber($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop);
    var range = oldStop - oldStart + 1;
    var newStart = oldStart + range;
    var newStop = oldStop + range;

    if (newStart >= 1 && newStop >= 1) {
      $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(newStart);
      $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(newStop);
    } else {
      $(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(0x0001);
      $(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(range);
    }

    return this.refresh();
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh(settings) {
    var _this5 = this;

    /*-----------------------------------------------------------------*/
    amiWebApp.lock();
    /*-----------------------------------------------------------------*/

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup2 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup2[0];
    /*-----------------------------------------------------------------*/


    this.ctx.command2 = this.ctx.command;
    /**/

    if (this.ctx.orderBy) {
      this.ctx.command2 += ' -orderBy="' + this.ctx.orderBy + '"';

      if (this.ctx.orderWay) {
        this.ctx.command2 += ' -orderWay="' + this.ctx.orderWay + '"';
      }
    }
    /**/


    var start = this.parsePageNumber($(this.patchId('#DBE5AEB2_FF3E_F781_4DF9_30D97462D9BB')).val(), this.ctx.start);
    var stop = this.parsePageNumber($(this.patchId('#BF85DC0E_C07E_DE5E_A65B_237FCA3D461C')).val(), this.ctx.stop);
    this.ctx.command2 += ' -limit="' + (stop - start + 1) + '"';
    this.ctx.command2 += ' -offset="' + (0x00 + start - 1) + '"';
    /*-----------------------------------------------------------------*/

    amiCommand.execute(this.ctx.command2 + (this.ctx.enableCache ? ' -cached' : '') + (this.ctx.enableCount ? ' -count' : '')).done(function (data) {
      /*-------------------------------------------------------------*/
      var fieldDescriptionSet = _this5.ctx.rowset ? amiWebApp.jspath('..fieldDescriptions{.@rowset==="' + _this5.ctx.rowset + '"}', data) : amiWebApp.jspath('..fieldDescriptions', data);
      var rowSet = _this5.ctx.rowset ? amiWebApp.jspath('..rowset{.@type==="' + _this5.ctx.rowset + '"}"', data) : amiWebApp.jspath('..rowset', data);
      /*-------------------------------------------------------------*/

      var listOfFieldDescriptions = fieldDescriptionSet.map(function (x) {
        return x['fieldDescription'] || [];
      });
      var listOfRowSetName = rowSet.map(function (x) {
        return x['@type'] || 'result';
      });
      var listOfRows = rowSet.map(function (x) {
        return x['row'] || [];
      });
      /*-------------------------------------------------------------*/

      _this5.ctx.sql = amiWebApp.jspath('.@sql', rowSet)[0] || 'N/A';
      _this5.ctx.mql = amiWebApp.jspath('.@mql', rowSet)[0] || 'N/A';
      _this5.ctx.ast = amiWebApp.jspath('.@ast', rowSet)[0] || 'N/A';
      _this5.ctx.numberOfRows = listOfRows.map(function (x) {
        return x.length;
      }).reduce(function (x, y) {
        return x + y;
      }, 0);
      _this5.ctx.maxNumberOfRows = amiWebApp.jspath('..@maxNumberOfRows', rowSet).map(function (x) {
        return parseInt(x);
      }).reduce(function (x, y) {
        return x + y;
      }, 0);
      _this5.ctx.totalNumberOfRows = amiWebApp.jspath('..@totalNumberOfRows', rowSet).map(function (x) {
        return parseInt(x);
      }).reduce(function (x, y) {
        return x + y;
      }, 0);
      /*-------------------------------------------------------------*/

      _this5.ctx.listOfFieldDescriptions = listOfFieldDescriptions;
      /*-------------------------------------------------------------*/

      if (_this5.ctx.sql === 'N/A') {
        $(_this5.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).hide();
      } else {
        $(_this5.patchId('#CD458FEC_9AD9_30E8_140F_263F119961BE')).show();
      }

      if (_this5.ctx.mql === 'N/A') {
        $(_this5.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).hide();
      } else {
        $(_this5.patchId('#F4F0EB6C_6535_7714_54F7_4BC28C254872')).show();
      }

      if (_this5.ctx.ast === 'N/A') {
        $(_this5.patchId('#E2EB6136_7358_875A_2857_8766E9B3036E')).hide();
      } else {
        $(_this5.patchId('#E2EB6136_7358_875A_2857_8766E9B3036E')).show();
      }

      if (Number.isNaN(_this5.ctx.totalNumberOfRows)) {
        $(_this5.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).prop('disabled', true);
      } else {
        $(_this5.patchId('#B7979619_196F_F39D_A893_17E5EDAA8628')).prop('disabled', false);
      }
      /*-------------------------------------------------------------*/


      var dict = {
        primaryField: _this5.ctx.primaryField,
        ignoredFields: _this5.ctx.ignoredFields,

        /**/
        listOfFieldDescriptions: listOfFieldDescriptions,
        listOfRowSetName: listOfRowSetName,
        listOfRows: listOfRows,

        /**/
        currentTabIndex: _this5.ctx.currentTabIndex,

        /**/
        maxCellLength: _this5.ctx.maxCellLength,

        /**/
        showPrimaryField: _this5.ctx.showPrimaryField,
        showToolBar: _this5.ctx.showToolBar,
        showDetails: _this5.ctx.showDetails,
        showTools: _this5.ctx.showTools,
        canEdit: _this5.ctx.canEdit
      };
      /*-------------------------------------------------------------*/

      _this5.replaceHTML(_this5.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), _this5.fragmentTable, {
        dict: dict
      }).done(function () {
        var parent = $(_this5.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));
        /*---------------------------------------------------------*/

        /* COLUMN TOOLS                                            */

        /*---------------------------------------------------------*/

        parent.find('a[data-orderway="DESC"]').click(function (e) {
          e.preventDefault();
          _this5.ctx.orderBy = e.currentTarget.getAttribute('data-row');
          _this5.ctx.orderWay = 'DESC';

          _this5.refresh();
        });
        /*---------------------------------------------------------*/

        parent.find('a[data-orderway="ASC"]').click(function (e) {
          e.preventDefault();
          _this5.ctx.orderBy = e.currentTarget.getAttribute('data-row');
          _this5.ctx.orderWay = 'ASC';

          _this5.refresh();
        });
        /*---------------------------------------------------------*/

        parent.find('a[data-action="refine"]').click(function (e) {
          e.preventDefault();

          _this5.showRefineModal(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'));
        });
        /*---------------------------------------------------------*/

        parent.find('a[data-action="stats"]').click(function (e) {
          e.preventDefault();

          _this5.showStatsTab(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'));
        });
        /*---------------------------------------------------------*/

        parent.find('a[data-action="group"]').click(function (e) {
          e.preventDefault();

          _this5.showGroupTab(e.currentTarget.getAttribute('data-catalog'), e.currentTarget.getAttribute('data-entity'), e.currentTarget.getAttribute('data-field'));
        });
        /*---------------------------------------------------------*/

        /* ROWSETS                                                 */

        /*---------------------------------------------------------*/

        parent.find('[data-tab-index]').click(function (e) {
          _this5.ctx.currentTabIndex = parseInt(e.currentTarget.getAttribute('data-tab-index'));
        });
        /*---------------------------------------------------------*/

        /* DETAILS                                                 */

        /*---------------------------------------------------------*/

        parent.find('[data-ctrl]').click(function (e) {
          e.preventDefault();

          _this5.createControlFromWebLink(_this5.getParent(), e.currentTarget, _this5.ctx);
        });
        /*---------------------------------------------------------*/

        /* FILTERS                                                 */

        /*---------------------------------------------------------*/

        parent.find('a[data-action="filter"]').click(function (e) {
          e.preventDefault();
          var descr = e.currentTarget.getAttribute('data-filter-def').split('::');
          if (descr.length === 2) _this5.getOwner().refineResult('2', descr[0], descr[1]);
        });
        /*---------------------------------------------------------*/

        /* SETUP FIELD & UNIT EDITOR                               */

        /*---------------------------------------------------------*/

        _this5.fieldEditor.setup(_this5.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), _this5.ctx);

        _this5.unitEditor.setup(_this5.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));

        _this5.setMode();
        /*---------------------------------------------------------*/

        /* UPDATE JAVASCRIPT                                       */

        /*---------------------------------------------------------*/


        _this5.ctx.js = amiWebApp.formatTWIG(_this5.fragmentJS, _this5.ctx);
        /*---------------------------------------------------------*/

        /* FILL NUMBERS                                            */

        /*---------------------------------------------------------*/

        var numbers = [];

        if (!Number.isNaN(_this5.ctx.numberOfRows)) {
          numbers.push('shown: ' + _this5.ctx.numberOfRows);
        }

        if (!Number.isNaN(_this5.ctx.totalNumberOfRows)) {
          numbers.push('total: ' + _this5.ctx.totalNumberOfRows);
        }
        /*---------------------------------------------------------*/


        var span = $(_this5.patchId('#C57C824B_166C_4C23_F349_8B0C8E94114A'));

        if (!Number.isNaN(_this5.ctx.maxNumberOfRows)) {
          var tooltip = 'maximum number of showable rows: ' + _this5.ctx.maxNumberOfRows;
          span.attr('data-toggle', 'tooltip').attr('data-title', tooltip).tooltip('dispose').tooltip();
        }

        span.text(numbers.join(', '));
        /*---------------------------------------------------------*/

        amiWebApp.unlock();
        result.resolveWith(context, [listOfFieldDescriptions, listOfRows, _this5.ctx.sql, _this5.ctx.mql, _this5.ctx.ast, _this5.ctx.totalNumberOfRows]);
        /*---------------------------------------------------------*/
      });
      /*-------------------------------------------------------------*/

    }).fail(function (data, message) {
      amiWebApp.unlock();
      result.rejectWith(context, [message]);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  exportResult: function exportResult(converter) {
    amiWebApp.lock();
    amiCommand.execute(this.ctx.command, {
      converter: converter
    }).done(function (data, message) {
      /*---------------------------------------------------------*/
      var fileMime;
      var fileName;
      /**/

      if (converter === 'AMIXmlToXml.xsl') {
        fileMime = 'application/xml';
        fileName = 'result.xml';
      } else if (converter === 'AMIXmlToJson.xsl') {
        fileMime = 'application/json';
        fileName = 'result.json';
      } else if (converter === 'AMIXmlToCsv.xsl') {
        fileMime = 'text/csv';
        fileName = 'result.csv';
      } else {
        fileMime = 'text/plain';
        fileName = 'result.txt';
      }
      /*-------------------------------------------------------------*/


      saveAs(new Blob([data], {
        type: fileMime
      }), fileName);
      /*-------------------------------------------------------------*/

      amiWebApp.unlock();
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  },

  /*---------------------------------------------------------------------*/
  isInEditMode: function isInEditMode() {
    return this.fieldEditor.isInEditMode();
  },

  /*---------------------------------------------------------------------*/
  setMode: function setMode() {
    var tags1 = $(this.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'));
    var tags2 = $(this.patchId('#CDE5AD14_1268_8FA7_F5D8_0D690F3FB850'));
    var tags3 = tags1.find('.edit-mode');
    var tags4 = tags1.find('.view-more');
    var tags5 = tags1.find('.view-media');

    if ($(this.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).prop('checked')) {
      tags2.show();
      tags3.show();
      tags4.hide();
      tags5.hide();
      this.fieldEditor.setInEditMode(true);
      this.unitEditor.setInEditMode(true);
    } else {
      tags2.hide();
      tags3.hide();
      tags4.show();
      tags5.show();
      this.fieldEditor.setInEditMode(false);
      this.unitEditor.setInEditMode(false);
    }
  },

  /*---------------------------------------------------------------------*/
  showRowModal: function showRowModal() {
    this.fieldEditor.showRowModal(this.ctx.catalog, this.ctx.entity);
  },

  /*---------------------------------------------------------------------*/

  /*---------------------------------------------------------------------*/

  /*---------------------------------------------------------------------*/
  _buildColumnName: function _buildColumnName(catalog, entity, field) {
    var result = [];

    if (catalog && catalog !== 'N/A') {
      result.push('`' + catalog + '`');
    }

    if (entity && entity !== 'N/A') {
      result.push('`' + entity + '`');
    }

    if (field && field !== 'N/A') {
      result.push('`' + field + '`');
    }

    return result.join('.');
  },

  /*---------------------------------------------------------------------*/
  showRefineModal: function showRefineModal(catalog, entity, field) {
    var _this6 = this;

    /*-----------------------------------------------------------------*/
    var isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';
    var regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.listOfFieldDescriptions[this.ctx.currentTabIndex], isMQL);

    var column = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);
    /*-----------------------------------------------------------------*/


    var el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
    var el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');
    el1.find('#E7014B57_B16A_7593_FA1B_0DD15C15AC3E').text(column);
    el1.find('#F3A040E1_40EE_97B3_45D6_E7BFB61DBF44').val(column);
    el1.find('#CAF8B5EB_1796_3837_5722_3B5B2A7C729B').hide();
    el1.find('#A24427DD_0DCB_3AC8_4A3E_A75D79FAA8F7').hide();
    el1.find('form')[0].reset();
    el2.off().submit(function (e) {
      e.preventDefault();

      _this6.refineResult();
    });
    el1.modal('show');
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  refineResult: function refineResult(_filter, _x, _y) {
    /*-----------------------------------------------------------------*/
    var el1 = $('#C48564EA_A64D_98BA_6232_D03D524CAD08');
    var el2 = $('#F114E547_5E78_72D9_BB7F_355CDBB3D03A');

    var filter = _filter || el2.find('select[name="filter"]').val();

    var x = _x || el2.find('input[name="x"]').val();

    var y = _y || el2.find('input[name="y"]').val();

    var y1 = el2.find('input[name="y1"]').val();
    var y2 = el2.find('input[name="y2"]').val();
    y = y.replace(/'/g, '\'\'');
    y1 = y1.replace(/'/g, '\'\'');
    y2 = y2.replace(/'/g, '\'\'');
    /*-----------------------------------------------------------------*/

    var cond;

    switch (filter) {
      case '0':
        cond = x + ' IS NULL';
        break;

      case '1':
        cond = x + ' IS NOT NULL';
        break;

      case '2':
        cond = x + ' = \'' + y + '\'';
        break;

      case '3':
        cond = x + ' != \'' + y + '\'';
        break;

      case '4':
        cond = x + ' LIKE \'' + y + '\'';
        break;

      case '5':
        cond = x + ' NOT LIKE \'' + y + '\'';
        break;

      case '6':
        cond = x + ' < \'' + y + '\'';
        break;

      case '7':
        cond = x + ' <= \'' + y + '\'';
        break;

      case '8':
        cond = x + ' > \'' + y + '\'';
        break;

      case '9':
        cond = x + ' >= \'' + y + '\'';
        break;

      case '10':
        cond = x + ' BETWEEN \'' + y1 + '\' AND \'' + y2 + '\'';
        break;

      case '11':
        cond = x + ' NOT BETWEEN \'' + y1 + '\' AND \'' + y2 + '\'';
        break;

      default:
        return;
    }
    /*-----------------------------------------------------------------*/


    el1.modal('hide');
    /*-----------------------------------------------------------------*/

    var isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';
    var regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.listOfFieldDescriptions[this.ctx.currentTabIndex], isMQL);
    /*-----------------------------------------------------------------*/

    if (regions['WHERE']) {
      regions['WHERE'] += ' AND ' + cond;
    } else {
      regions['WHERE'] = cond;
    }
    /*-----------------------------------------------------------------*/


    var xql = [];

    if (regions['SELECT']) {
      xql.push('SELECT ' + regions['SELECT']);
    }

    if (regions['FROM']) {
      xql.push('FROM ' + regions['FROM']);
    }

    if (regions['WHERE']) {
      xql.push('WHERE ' + regions['WHERE']);
    }
    /*-----------------------------------------------------------------*/


    var command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';
    amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {}, this.ctx, 'table', this.ctx.entity);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  showStatsTab: function showStatsTab(catalog, entity, field) {
    /*-----------------------------------------------------------------*/
    var isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';
    var regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.listOfFieldDescriptions[this.ctx.currentTabIndex], isMQL);

    var columnName = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);
    /*-----------------------------------------------------------------*/


    regions['SELECT'] = '\'' + columnName.replace(/'/g, '\'\'') + '\' AS `field`' + ', ' + 'MIN(' + columnName + ') AS `min`' + ', ' + 'MAX(' + columnName + ') AS `max`' + ', ' + 'SUM(' + columnName + ') AS `sum`' + ', ' + 'AVG(' + columnName + ') AS `avg`' + ', ' + 'STDDEV(' + columnName + ') AS `stddev`' + ', ' + 'COUNT(' + columnName + ') AS `count`';
    /*-----------------------------------------------------------------*/

    var xql = [];

    if (regions['SELECT']) {
      xql.push('SELECT ' + regions['SELECT']);
    }

    if (regions['FROM']) {
      xql.push('FROM ' + regions['FROM']);
    }

    if (regions['WHERE']) {
      xql.push('WHERE ' + regions['WHERE']);
    }
    /*-----------------------------------------------------------------*/


    var command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';
    amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {
      orderBy: '',
      orderWay: '',
      showDetails: false
    }, this.ctx, 'bar-chart', this.ctx.entity);
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  showGroupTab: function showGroupTab(catalog, entity, field) {
    /*-----------------------------------------------------------------*/
    var isMQL = this.ctx.mql && this.ctx.mql !== 'N/A';
    var regions = xqlGetRegions(isMQL ? this.ctx.mql : this.ctx.sql, this.ctx.listOfFieldDescriptions[this.ctx.currentTabIndex], isMQL);

    var columnName = this._buildColumnName(regions['ALIASES'][field].catalog, regions['ALIASES'][field].tableAlias, regions['ALIASES'][field].field);
    /*-----------------------------------------------------------------*/


    regions['SELECT'] = columnName + ', count(*) AS `total`, CONCAT(\'@OWNER::' + columnName + '::\', ' + columnName + ') AS `go`';
    regions['GROUP'] = columnName;
    /*-----------------------------------------------------------------*/

    var xql = [];

    if (regions['SELECT']) {
      xql.push('SELECT ' + regions['SELECT']);
    }

    if (regions['FROM']) {
      xql.push('FROM ' + regions['FROM']);
    }

    if (regions['WHERE']) {
      xql.push('WHERE ' + regions['WHERE']);
    }

    if (regions['GROUP']) {
      xql.push('GROUP BY ' + regions['GROUP'].replace(entity, regions['ALIASES'][field].tableAlias));
    }
    /*-----------------------------------------------------------------*/


    var command = 'BrowseQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -' + (isMQL ? 'mql' : 'sql') + '="' + amiWebApp.textToString(xql.join(' ')) + '"';
    amiWebApp.createControlInContainer(this.getParent(), this, 'table', [command], {
      orderBy: columnName,
      orderWay: 'ASC',
      showDetails: false
    }, this.ctx, 'slack', this.ctx.entity);
    /*-----------------------------------------------------------------*/
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJhcHBlbmRIVE1MIiwiZnJhZ21lbnRUYWJsZUN0cmwiLCJmcmFnbWVudFRhYmxlIiwiZnJhZ21lbnRKUyIsImZyYWdtZW50RXhwb3J0IiwiZmllbGRFZGl0b3JDdG9yIiwiZmllbGRVbml0Q3RvciIsInRhYkN0b3IiLCJyZW5kZXIiLCJzZWxlY3RvciIsImNvbW1hbmQiLCJzZXR0aW5ncyIsImxvY2siLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJjdHgiLCJpc0VtYmVkZGVkIiwiZW5kcG9pbnQiLCJhbWlDb21tYW5kIiwidHJpbSIsInNxbCIsIm1xbCIsImFzdCIsImN1cnJlbnRUYWJJbmRleCIsInNldHVwIiwiY29udGV4dCIsImVuYWJsZUNhY2hlIiwiZW5hYmxlQ291bnQiLCJzaG93UHJpbWFyeUZpZWxkIiwic2hvd1Rvb2xCYXIiLCJzaG93RGV0YWlscyIsInNob3dUb29scyIsImNhbkVkaXQiLCJjYXRhbG9nIiwiZW50aXR5IiwicHJpbWFyeUZpZWxkIiwicm93c2V0Iiwic3RhcnQiLCJzdG9wIiwib3JkZXJCeSIsIm9yZGVyV2F5IiwibWF4Q2VsbExlbmd0aCIsImNhcmQiLCJpZ25vcmVkRmllbGRzIiwiZmllbGRFZGl0b3IiLCJ1bml0RWRpdG9yIiwiZ2V0SW5mbyIsIl9yZW5kZXIiLCJmYWlsIiwiYWx3YXlzIiwidW5sb2NrIiwiZ2V0UGFyZW50IiwiJG5hbWUiLCJ0YWIiLCJhcHBlbmRJdGVtIiwiY2xvc2FibGUiLCJmaXJzdFZpc2libGUiLCJzZXRQYXJlbnQiLCJfX3JlbmRlciIsInJlcGxhY2VIVE1MIiwiZGljdCIsInBhdGNoSWQiLCJjbGljayIsImZpcnN0UGFnZSIsIm1lc3NhZ2UiLCJlcnJvciIsInByZXZQYWdlIiwibmV4dFBhZ2UiLCJsYXN0UGFnZSIsImtleXByZXNzIiwiZSIsImtleUNvZGUiLCJyZWZyZXNoIiwiY2hhbmdlIiwic2V0TW9kZSIsInNob3dSb3dNb2RhbCIsImV4ZWN1dGUiLCJ4c2x0cyIsImpzcGF0aCIsImV4cG9ydFJlc3VsdCIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJ0b29sdGlwIiwiY3JlYXRlQ29udHJvbCIsImluc3RhbmNlIiwiY29tbWFuZDIiLCJzdGFydHNXaXRoIiwic3Vic3RyaW5nIiwianMiLCJwYXJhbXMiLCJhdXRvUmVmcmVzaCIsImNvbmZpcm0iLCJ0ZXh0VG9TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZpZWxkRGVzY3JpcHRpb25zIiwicm93cyIsInRvdGFsTnVtYmVyT2ZSb3dzIiwicmVzb2x2ZVdpdGgiLCJyZWplY3RXaXRoIiwicGFyc2VQYWdlTnVtYmVyIiwicyIsImRlZmF1bHRQYWdlTnVtYmVyIiwicGFyc2VkUGFnZU51bWJlciIsInBhcnNlSW50IiwiTnVtYmVyIiwiaXNOYU4iLCJnZXRPZmZzZXRPZkxhc3RQYWdlIiwicmFuZ2UiLCJtb2R1bG8iLCJvbGRTdGFydCIsInZhbCIsIm9sZFN0b3AiLCJuZXdTdGFydCIsIm5ld1N0b3AiLCJmaWVsZERlc2NyaXB0aW9uU2V0Iiwicm93U2V0IiwibGlzdE9mRmllbGREZXNjcmlwdGlvbnMiLCJtYXAiLCJ4IiwibGlzdE9mUm93U2V0TmFtZSIsImxpc3RPZlJvd3MiLCJudW1iZXJPZlJvd3MiLCJsZW5ndGgiLCJyZWR1Y2UiLCJ5IiwibWF4TnVtYmVyT2ZSb3dzIiwiaGlkZSIsInNob3ciLCJwcm9wIiwiZmluZCIsInByZXZlbnREZWZhdWx0Iiwic2hvd1JlZmluZU1vZGFsIiwic2hvd1N0YXRzVGFiIiwic2hvd0dyb3VwVGFiIiwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rIiwiZGVzY3IiLCJzcGxpdCIsImdldE93bmVyIiwicmVmaW5lUmVzdWx0IiwiZm9ybWF0VFdJRyIsIm51bWJlcnMiLCJwdXNoIiwic3BhbiIsImF0dHIiLCJ0ZXh0Iiwiam9pbiIsImNvbnZlcnRlciIsImZpbGVNaW1lIiwiZmlsZU5hbWUiLCJzYXZlQXMiLCJCbG9iIiwidHlwZSIsImlzSW5FZGl0TW9kZSIsInRhZ3MxIiwidGFnczIiLCJ0YWdzMyIsInRhZ3M0IiwidGFnczUiLCJzZXRJbkVkaXRNb2RlIiwiX2J1aWxkQ29sdW1uTmFtZSIsImZpZWxkIiwiaXNNUUwiLCJyZWdpb25zIiwieHFsR2V0UmVnaW9ucyIsImNvbHVtbiIsInRhYmxlQWxpYXMiLCJlbDEiLCJlbDIiLCJyZXNldCIsIm9mZiIsInN1Ym1pdCIsIm1vZGFsIiwiX2ZpbHRlciIsIl94IiwiX3kiLCJmaWx0ZXIiLCJ5MSIsInkyIiwicmVwbGFjZSIsImNvbmQiLCJ4cWwiLCJjcmVhdGVDb250cm9sSW5Db250YWluZXIiLCJjb2x1bW5OYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBRUFBLFNBQVMsQ0FBQyxXQUFELEVBQWM7QUFDdEI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSFE7O0FBS3RCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVZxQjs7QUFZdEI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0M7QUFFQSxXQUFPQyxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixxQ0FEUTtBQUU5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsdUNBSFE7QUFJOUI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLGlDQUxRLEVBTTlCRixTQUFTLENBQUNFLFNBQVYs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QUwsRUFBbkMsRUFBcUQsSUFBckQsRUFBMkQsT0FBM0QsRUFBb0UsQ0FBQzFDLE9BQUQsQ0FBcEUsRUFBK0U7QUFBQzhCLE1BQUFBLE9BQU8sRUFBRWlKLFVBQVY7QUFBc0JoSixNQUFBQSxRQUFRLEVBQUUsS0FBaEM7QUFBdUNWLE1BQUFBLFdBQVcsRUFBRTtBQUFwRCxLQUEvRSxFQUEySSxLQUFLZixHQUFoSixFQUFxSixPQUFySixFQUE4SixLQUFLQSxHQUFMLENBQVNtQixNQUF2SztBQUVBO0FBQ0E7QUFFRDs7QUFqeENzQixDQUFkLENBQVQ7QUFveENBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgeHFsR2V0UmVnaW9uc1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1RhYmxlQ3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvVGFibGUvdHdpZy9UYWJsZUN0cmwudHdpZycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS90d2lnL3JlZmluZU1vZGFsLnR3aWcnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvVGFibGUvdHdpZy90YWJsZS50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1RhYmxlL3R3aWcvanMudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS90d2lnL2V4cG9ydC50d2lnJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1RhYmxlL2pzL2xpYnhxbC5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvZmlsZXNhdmVyLm1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHQnY3RybDpmaWVsZEVkaXRvcicsXG5cdFx0XHQnY3RybDp1bml0RWRpdG9yJyxcblx0XHRcdCdjdHJsOnRhYicsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMV0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRUYWJsZUN0cmwgPSBkYXRhWzBdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50VGFibGUgPSBkYXRhWzJdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50SlMgPSBkYXRhWzNdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50RXhwb3J0ID0gZGF0YVs0XTtcblxuXHRcdFx0XHR0aGlzLmZpZWxkRWRpdG9yQ3RvciA9IGRhdGFbN107XG5cdFx0XHRcdHRoaXMuZmllbGRVbml0Q3RvciA9IGRhdGFbOF07XG5cdFx0XHRcdHRoaXMudGFiQ3RvciA9IGRhdGFbOV07XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb21tYW5kLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHtcblx0XHRcdGlzRW1iZWRkZWQ6IGFtaVdlYkFwcC5pc0VtYmVkZGVkKCksXG5cblx0XHRcdGVuZHBvaW50OiBhbWlDb21tYW5kLmVuZHBvaW50LFxuXG5cdFx0XHRjb21tYW5kOiBjb21tYW5kLnRyaW0oKSxcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHRzcWw6ICdOL0EnLFxuXHRcdFx0bXFsOiAnTi9BJyxcblx0XHRcdGFzdDogJ04vQScsXG5cblx0XHRcdGN1cnJlbnRUYWJJbmRleDogMCxcblx0XHR9O1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCxcblx0XHRcdGVuYWJsZUNhY2hlLCBlbmFibGVDb3VudCwgc2hvd1ByaW1hcnlGaWVsZCwgc2hvd1Rvb2xCYXIsIHNob3dEZXRhaWxzLCBzaG93VG9vbHMsIGNhbkVkaXQsXG5cdFx0XHRjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZCwgcm93c2V0LFxuXHRcdFx0c3RhcnQsIHN0b3AsIG9yZGVyQnksIG9yZGVyV2F5LFxuXHRcdFx0bWF4Q2VsbExlbmd0aCxcblx0XHRcdGNhcmRcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0W1xuXHRcdFx0XHQnY29udGV4dCcsXG5cdFx0XHRcdCdlbmFibGVDYWNoZScsICdlbmFibGVDb3VudCcsICdzaG93UHJpbWFyeUZpZWxkJywgJ3Nob3dUb29sQmFyJywgJ3Nob3dEZXRhaWxzJywgJ3Nob3dUb29scycsICdjYW5FZGl0Jyxcblx0XHRcdFx0J2NhdGFsb2cnLCAnZW50aXR5JywgJ3ByaW1hcnlGaWVsZCcsICdyb3dzZXQnLFxuXHRcdFx0XHQnc3RhcnQnLCAnc3RvcCcsICdvcmRlckJ5JywgJ29yZGVyV2F5Jyxcblx0XHRcdFx0J21heENlbGxMZW5ndGgnLFxuXHRcdFx0XHQnY2FyZCcsXG5cdFx0XHRdLFxuXHRcdFx0W1xuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdGZhbHNlLCB0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsXG5cdFx0XHRcdCcnLCAnJywgJycsICcnLFxuXHRcdFx0XHQxLCAxMCwgJycsICcnLFxuXHRcdFx0XHQ2NCxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5jdHguZW5hYmxlQ2FjaGUgPSBlbmFibGVDYWNoZTtcblx0XHR0aGlzLmN0eC5lbmFibGVDb3VudCA9IGVuYWJsZUNvdW50O1xuXG5cdFx0dGhpcy5jdHguc2hvd1ByaW1hcnlGaWVsZCA9IHNob3dQcmltYXJ5RmllbGQ7XG5cdFx0dGhpcy5jdHguc2hvd1Rvb2xCYXIgPSBzaG93VG9vbEJhcjtcblx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHNob3dEZXRhaWxzO1xuXHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHNob3dUb29scztcblx0XHR0aGlzLmN0eC5jYW5FZGl0ID0gY2FuRWRpdDtcblxuXHRcdHRoaXMuY3R4LmNhdGFsb2cgPSBjYXRhbG9nO1xuXHRcdHRoaXMuY3R4LmVudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLmN0eC5yb3dzZXQgPSByb3dzZXQ7XG5cblx0XHR0aGlzLmN0eC5zdGFydCA9IHN0YXJ0O1xuXHRcdHRoaXMuY3R4LnN0b3AgPSBzdG9wO1xuXHRcdHRoaXMuY3R4Lm9yZGVyQnkgPSBvcmRlckJ5O1xuXHRcdHRoaXMuY3R4Lm9yZGVyV2F5ID0gb3JkZXJXYXk7XG5cblx0XHR0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoID0gbWF4Q2VsbExlbmd0aDtcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pZ25vcmVkRmllbGRzID0ge1xuXHRcdFx0J09SQUNMRV9ST1dOVU0nOiAnJyxcblx0XHRcdCdQUk9KRUNUJzogJycsXG5cdFx0XHQnUFJPQ0VTUyc6ICcnLFxuXHRcdFx0J0FNSUVOVElUWU5BTUUnOiAnJyxcblx0XHRcdCdBTUlFTEVNRU5USUQnOiAnJyxcblx0XHRcdCdBTUlDUkVBVEVEJzogJycsXG5cdFx0XHQnQU1JTEFTVE1PRElGSUVEJzogJycsXG5cdFx0XHQnQU1JU1lTREFURSc6ICcnXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5maWVsZEVkaXRvciA9IG5ldyB0aGlzLmZpZWxkRWRpdG9yQ3Rvcih0aGlzLCB0aGlzKTtcblx0XHR0aGlzLnVuaXRFZGl0b3IgPSBuZXcgdGhpcy5maWVsZFVuaXRDdG9yKHRoaXMsIHRoaXMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLmN0eC5jYW5FZGl0IHx8ICgodGhpcy5jdHguc2hvd0RldGFpbHMgfHwgdGhpcy5jdHguc2hvd1Rvb2xzKSAmJiAhdGhpcy5jdHgucHJpbWFyeUZpZWxkKSlcblx0XHR7XG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLmdldEluZm8oY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGQpLmRvbmUoKHByaW1hcnlGaWVsZCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuY3R4LnByaW1hcnlGaWVsZCA9IHByaW1hcnlGaWVsZDtcblxuXHRcdFx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHRoaXMuY3R4LnNob3dEZXRhaWxzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0XHR0aGlzLmN0eC5zaG93VG9vbHMgPSB0aGlzLmN0eC5zaG93VG9vbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHRcdHRoaXMuY3R4LmNhbkVkaXQgPSB0aGlzLmN0eC5jYW5FZGl0ICYmICEhcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblxuXHRcdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkID0gcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHRcdHRoaXMuY3R4LnNob3dEZXRhaWxzID0gdGhpcy5jdHguc2hvd0RldGFpbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHRoaXMuY3R4LnNob3dUb29scyAmJiAhIXByaW1hcnlGaWVsZDtcblx0XHRcdFx0dGhpcy5jdHguY2FuRWRpdCA9IC8qLS0tLS0tLS0tLSovIGZhbHNlIC8qLS0tLS0tLS0tLSovO1xuXG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkID0gcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHRoaXMuY3R4LnNob3dEZXRhaWxzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0dGhpcy5jdHguc2hvd1Rvb2xzID0gdGhpcy5jdHguc2hvd1Rvb2xzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0dGhpcy5jdHguY2FuRWRpdCA9IC8qLS0tLS0tLS0tLSovIGZhbHNlIC8qLS0tLS0tLS0tLSovO1xuXG5cdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0aWYodGhpcy5nZXRQYXJlbnQoKS4kbmFtZSAhPT0gJ1RhYkN0cmwnKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRhYiA9IG5ldyB0aGlzLnRhYkN0b3IobnVsbCwgdGhpcyk7XG5cblx0XHRcdHRhYi5yZW5kZXIoc2VsZWN0b3IsIHRoaXMuY3R4KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0YWIuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS10YWJsZVwiPjwvaT4gJyArIHRoaXMuY3R4LmVudGl0eSwge2Nsb3NhYmxlOiBmYWxzZSwgZmlyc3RWaXNpYmxlOiBmYWxzZX0pLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFBhcmVudCh0YWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRUYWJsZUN0cmwsIHtkaWN0OiB0aGlzLmN0eH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JBMUE3RUVBXzJCQjVfNTJGMl81QkNGXzY0QjBDMzgxQjU3MCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5maXJzdFBhZ2UoKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkIxMjYyOTRfRkZDMl8yNEI4Xzg3NjVfQ0Y2NTNFQjk1MEY3JykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnByZXZQYWdlKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0U3RkRGNEM4X0VDRDJfM0ZFMF84Qzc1XzU0MUU1MTEyMzlDMicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5uZXh0UGFnZSgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCNzk3OTYxOV8xOTZGX0YzOURfQTg5M18xN0U1RURBQTg2MjgnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMubGFzdFBhZ2UoKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLmtleXByZXNzKChlKSA9PiB7XG5cblx0XHRcdFx0aWYoZS5rZXlDb2RlID09IDEzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS5rZXlwcmVzcygoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKGUua2V5Q29kZSA9PSAxMylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEODA5MTY2Rl9BNDBCXzIzNzZfQzhBNV85NzdBQTBDOEM0MDgnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEREMzMjIzOF9ERDI1XzgzNTRfQUM2Q19GNkUyN0NBNkUxOEQnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnNldE1vZGUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NERTVBRDE0XzEyNjhfOEZBN19GNUQ4XzBENjkwRjNGQjg1MCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5zaG93Um93TW9kYWwoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0xpc3RDb252ZXJ0ZXJzJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXHRcdFx0XHRcblx0XHRcdFx0dmFyIHhzbHRzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInhzbHRcIiAmJiAuJCE9PT1cIkFNSVhtbFRvWG1sLnhzbFwiICYmIC4kIT09PVwiQU1JWG1sVG9Kc29uLnhzbFwiICYmIC4kIT09PVwiQU1JWG1sVG9Dc3YueHNsXCIgJiYgLiQhPT09XCJBTUlYbWxUb1RleHQueHNsXCIgfS4kJywgZGF0YSkgfHwgW107XG5cblx0XHRcdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNBNDlCMjczMF80RkFCX0YwODlfNTg2NF80MTAyOUQ2NUJGMDUnKSwgdGhpcy5mcmFnbWVudEV4cG9ydCwge2RpY3Q6IHRoaXMuY3R4LCB4c2x0cyA6IHhzbHRzfSkuZG9uZSgoKSA9PiB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBNDlCMjczMF80RkFCX0YwODlfNTg2NF80MTAyOUQ2NUJGMDUnKSArICcgYScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRcdHRoaXMuZXhwb3J0UmVzdWx0KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ3hzbHQnKSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRcbi8vXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDOUY0REJFN19FRjRGXzA5RjFfQzMxRF85NzU4MTk3OEJEMTMnKSkuY2xpY2soKCkgPT4ge1xuLy9cbi8vXHRcdFx0XHR0aGlzLmV4cG9ydFJlc3VsdCgnQU1JWG1sVG9YbWwueHNsJyk7XG4vL1x0XHRcdH0pO1xuLy9cbi8vXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBNEIwMzIzOV81MkY5XzVGQkJfMDc5OV9DOTMyQjlFOTVGQ0QnKSkuY2xpY2soKCkgPT4ge1xuLy9cbi8vXHRcdFx0XHR0aGlzLmV4cG9ydFJlc3VsdCgnQU1JWG1sVG9Kc29uLnhzbCcpO1xuLy9cdFx0XHR9KTtcbi8vXG4vL1x0XHRcdCQodGhpcy5wYXRjaElkKCcjQzYxODIxNjRfOTQzMl9GQTBDXzUyNzNfRUZGNTYzNzY2NjBFJykpLmNsaWNrKCgpID0+IHtcbi8vXG4vL1x0XHRcdFx0dGhpcy5leHBvcnRSZXN1bHQoJ0FNSVhtbFRvQ3N2LnhzbCcpO1xuLy9cdFx0XHR9KTtcbi8vXG4vL1x0XHRcdCQodGhpcy5wYXRjaElkKCcjQjhDQ0NDQTFfOTgyOV8zRUE1XzI4MEVfRUQ0N0ZDRDMzQURFJykpLmNsaWNrKCgpID0+IHtcbi8vXG4vL1x0XHRcdFx0dGhpcy5leHBvcnRSZXN1bHQoJ0FNSVhtbFRvVGV4dC54c2wnKTtcbi8vXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQzhDQjMwRENfNDE0Rl83NTU5X0I2MThfNDJCN0NDMDRGOTkzJykpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS50b29sdGlwKCdoaWRlJyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdlZGl0Qm94JywgW3RoaXMuY3R4LmNvbW1hbmRdLCB7fSkuZG9uZSgoaW5zdGFuY2UsIGNvbW1hbmQpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0dGhpcy5jdHguY29tbWFuZCA9IGNvbW1hbmQ7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NENDU4RkVDXzlBRDlfMzBFOF8xNDBGXzI2M0YxMTk5NjFCRScpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ21lc3NhZ2VCb3gnLCBbdGhpcy5jdHguc3FsXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjRGMEVCNkNfNjUzNV83NzE0XzU0RjdfNEJDMjhDMjU0ODcyJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5tcWxdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFRjczOUVFMF9EQjc5XzBBNEVfOUZERF83QkEzQzBGNzRGOTInKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdtZXNzYWdlQm94JywgW3RoaXMuY3R4LmNvbW1hbmQyLnN0YXJ0c1dpdGgoJ0Jyb3dzZVF1ZXJ5JykgPyAnU2VhcmNoUXVlcnknICsgdGhpcy5jdHguY29tbWFuZDIuc3Vic3RyaW5nKDExKSA6IHRoaXMuY3R4LmNvbW1hbmQyXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRDQ5ODUzRTJfOTMxOV81MkMzXzUyNTNfQTIwOEY5NTAwNDA4JykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5jb21tYW5kLnN0YXJ0c1dpdGgoJ0Jyb3dzZVF1ZXJ5JykgPyAnU2VhcmNoUXVlcnknICsgdGhpcy5jdHguY29tbWFuZC5zdWJzdHJpbmcoMTEpIDogdGhpcy5jdHguY29tbWFuZF0sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0M1MEMzNDI3X0ZFRTVfRjExNV8xRkVDXzZBNjY2ODc2M0VDNCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ3RleHRCb3gnLCBbdGhpcy5jdHguanNdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGMUM3OTI0Nl8xN0IyX0I5QjBfM0FCRl84QzEwRkEwODUyREQnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBwYXJhbXMgPSBbXG5cdFx0XHRcdFx0dGhpcy5jdHguY29tbWFuZFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGNvbnN0IHNldHRpbmdzID0ge1xuXHRcdFx0XHRcdGVuYWJsZUNhY2hlOiB0aGlzLmN0eC5lbmFibGVDYWNoZSxcblx0XHRcdFx0XHRlbmFibGVDb3VudDogdGhpcy5jdHguZW5hYmxlQ291bnQsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdHNob3dQcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQsXG5cdFx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRcdHNob3dEZXRhaWxzOiB0aGlzLmN0eC5zaG93RGV0YWlscyxcblx0XHRcdFx0XHRzaG93VG9vbHM6IHRoaXMuY3R4LnNob3dUb29scyxcblx0XHRcdFx0XHRjYW5FZGl0OiB0aGlzLmN0eC5jYW5FZGl0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRjYXRhbG9nOiB0aGlzLmN0eC5jYXRhbG9nLFxuXHRcdFx0XHRcdGVudGl0eTogdGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRcdHByaW1hcnlGaWVsZDogdGhpcy5jdHgucHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRcdHJvd3NldDogdGhpcy5jdHgucm93c2V0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRzdGFydDogdGhpcy5jdHguc3RhcnQsXG5cdFx0XHRcdFx0c3RvcDogdGhpcy5jdHguc3RvcCxcblx0XHRcdFx0XHRvcmRlckJ5OiB0aGlzLmN0eC5vcmRlckJ5LFxuXHRcdFx0XHRcdG9yZGVyV2F5OiB0aGlzLmN0eC5vcmRlcldheSxcblx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0bWF4Q2VsbExlbmd0aDogdGhpcy5jdHgubWF4Q2VsbExlbmd0aCxcblx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0Y2FyZDogdGhpcy5jdHguY2FyZCxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgYXV0b1JlZnJlc2ggPSBjb25maXJtKCdBdXRvLXJlZnJlc2ggbmV3IHdpZGdldD8nKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0FkZFdpZGdldCAtY29udHJvbD1cIlRhYmxlXCIgLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpICsgJ1wiIC1zZXR0aW5ncz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSkgKyAnXCIgLXRyYW5zcGFyZW50JyArIChhdXRvUmVmcmVzaCA/ICcgLWF1dG9SZWZyZXNoJyA6ICcnKSkuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSk7XG5cblx0XHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5yZWZyZXNoKCkuZG9uZSgoZmllbGREZXNjcmlwdGlvbnMsIHJvd3MsIHNxbCwgbXFsLCBhc3QsIHRvdGFsTnVtYmVyT2ZSb3dzKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQsIFtmaWVsZERlc2NyaXB0aW9ucywgcm93cywgc3FsLCBtcWwsIGFzdCwgdG90YWxOdW1iZXJPZlJvd3NdKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKHRoaXMuY3R4LmNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQYWdlTnVtYmVyOiBmdW5jdGlvbihzLCBkZWZhdWx0UGFnZU51bWJlcilcblx0e1xuXHRcdGNvbnN0IHBhcnNlZFBhZ2VOdW1iZXIgPSBwYXJzZUludChzKTtcblxuXHRcdHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkUGFnZU51bWJlcikgPT09IGZhbHNlICYmIHBhcnNlZFBhZ2VOdW1iZXIgPiAwID8gcGFyc2VkUGFnZU51bWJlclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFBhZ2VOdW1iZXJcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldE9mZnNldE9mTGFzdFBhZ2U6IGZ1bmN0aW9uKHJhbmdlKVxuXHR7XG5cdFx0Y29uc3QgbW9kdWxvID0gdGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MgJSByYW5nZTtcblxuXHRcdHJldHVybiB0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cyA+IG1vZHVsbyA/IHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzIC0gbW9kdWxvICsgMVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zmlyc3RQYWdlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBvbGRTdGFydCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKCksIHRoaXMuY3R4LnN0YXJ0XG5cdFx0KTtcblxuXHRcdGNvbnN0IG9sZFN0b3AgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbCgpLCB0aGlzLmN0eC5zdG9wXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJhbmdlID0gb2xkU3RvcCAtIG9sZFN0YXJ0ICsgMTtcblxuXHRcdGNvbnN0IG5ld1N0YXJ0ID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTtcblx0XHRjb25zdCBuZXdTdG9wID0gbmV3U3RhcnQgKyByYW5nZSAtIDE7XG5cblx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwobmV3U3RhcnQpO1xuXHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChuZXdTdG9wKTtcblxuXHRcdHJldHVybiB0aGlzLnJlZnJlc2goKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bGFzdFBhZ2U6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG9sZFN0YXJ0ID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoKSwgdGhpcy5jdHguc3RhcnRcblx0XHQpO1xuXG5cdFx0Y29uc3Qgb2xkU3RvcCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKCksIHRoaXMuY3R4LnN0b3Bcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmFuZ2UgPSBvbGRTdG9wIC0gb2xkU3RhcnQgKyAxO1xuXG5cdFx0Y29uc3QgbmV3U3RhcnQgPSB0aGlzLmdldE9mZnNldE9mTGFzdFBhZ2UocmFuZ2UpO1xuXHRcdGNvbnN0IG5ld1N0b3AgPSBuZXdTdGFydCArIHJhbmdlIC0gMTtcblxuXHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbChuZXdTdGFydCk7XG5cdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKG5ld1N0b3ApO1xuXG5cdFx0cmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcmV2UGFnZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgb2xkU3RhcnQgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgpLCB0aGlzLmN0eC5zdGFydFxuXHRcdCk7XG5cblx0XHRjb25zdCBvbGRTdG9wID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwoKSwgdGhpcy5jdHguc3RvcFxuXHRcdCk7XG5cblx0XHRjb25zdCByYW5nZSA9IG9sZFN0b3AgLSBvbGRTdGFydCArIDE7XG5cblx0XHRjb25zdCBuZXdTdGFydCA9IG9sZFN0YXJ0IC0gcmFuZ2U7XG5cdFx0Y29uc3QgbmV3U3RvcCA9IG9sZFN0b3AgLSByYW5nZTtcblxuXHRcdGlmKG5ld1N0YXJ0ID49IDEgJiYgbmV3U3RvcCA+PSAxKVxuXHRcdHtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbChuZXdTdGFydCk7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwobmV3U3RvcCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoMHgwMDAxKTtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChyYW5nZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRuZXh0UGFnZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgb2xkU3RhcnQgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgpLCB0aGlzLmN0eC5zdGFydFxuXHRcdCk7XG5cblx0XHRjb25zdCBvbGRTdG9wID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwoKSwgdGhpcy5jdHguc3RvcFxuXHRcdCk7XG5cblx0XHRjb25zdCByYW5nZSA9IG9sZFN0b3AgLSBvbGRTdGFydCArIDE7XG5cblx0XHRjb25zdCBuZXdTdGFydCA9IG9sZFN0YXJ0ICsgcmFuZ2U7XG5cdFx0Y29uc3QgbmV3U3RvcCA9IG9sZFN0b3AgKyByYW5nZTtcblxuXHRcdGlmKG5ld1N0YXJ0ID49IDEgJiYgbmV3U3RvcCA+PSAxKVxuXHRcdHtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbChuZXdTdGFydCk7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwobmV3U3RvcCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoMHgwMDAxKTtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChyYW5nZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZWZyZXNoOiBmdW5jdGlvbihzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoWydjb250ZXh0J10sIFtyZXN1bHRdLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQyID0gdGhpcy5jdHguY29tbWFuZDtcblxuXHRcdC8qKi9cblxuXHRcdGlmKHRoaXMuY3R4Lm9yZGVyQnkpXG5cdFx0e1xuXHRcdFx0dGhpcy5jdHguY29tbWFuZDIgKz0gJyAtb3JkZXJCeT1cIicgKyB0aGlzLmN0eC5vcmRlckJ5ICsgJ1wiJztcblxuXHRcdFx0aWYodGhpcy5jdHgub3JkZXJXYXkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuY3R4LmNvbW1hbmQyICs9ICcgLW9yZGVyV2F5PVwiJyArIHRoaXMuY3R4Lm9yZGVyV2F5ICsgJ1wiJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKiovXG5cblx0XHRjb25zdCBzdGFydCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKCksIHRoaXMuY3R4LnN0YXJ0XG5cdFx0KTtcblxuXHRcdGNvbnN0IHN0b3AgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbCgpLCB0aGlzLmN0eC5zdG9wXG5cdFx0KTtcblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQyICs9ICcgLWxpbWl0PVwiJyArIChzdG9wIC0gc3RhcnQgKyAxKSArICdcIic7XG5cblx0XHR0aGlzLmN0eC5jb21tYW5kMiArPSAnIC1vZmZzZXQ9XCInICsgKDB4MDAgKyBzdGFydCAtIDEpICsgJ1wiJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKHRoaXMuY3R4LmNvbW1hbmQyICsgKHRoaXMuY3R4LmVuYWJsZUNhY2hlID8gJyAtY2FjaGVkJyA6ICcnKSArICh0aGlzLmN0eC5lbmFibGVDb3VudCA/ICcgLWNvdW50JyA6ICcnKSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaWVsZERlc2NyaXB0aW9uU2V0ID0gdGhpcy5jdHgucm93c2V0ID8gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZERlc2NyaXB0aW9uc3suQHJvd3NldD09PVwiJyArIHRoaXMuY3R4LnJvd3NldCArICdcIn0nLCBkYXRhKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGREZXNjcmlwdGlvbnMnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEpXG5cdFx0XHQ7XG5cblx0XHRcdGNvbnN0IHJvd1NldCA9IHRoaXMuY3R4LnJvd3NldCA/IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiJyArIHRoaXMuY3R4LnJvd3NldCArICdcIn1cIicsIGRhdGEpXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhKVxuXHRcdFx0O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBsaXN0T2ZGaWVsZERlc2NyaXB0aW9ucyA9IGZpZWxkRGVzY3JpcHRpb25TZXQubWFwKHggPT4geFsnZmllbGREZXNjcmlwdGlvbiddIHx8IFtdKTtcblxuXHRcdFx0Y29uc3QgbGlzdE9mUm93U2V0TmFtZSA9IHJvd1NldC5tYXAoeCA9PiB4WydAdHlwZSddIHx8ICdyZXN1bHQnKTtcblxuXHRcdFx0Y29uc3QgbGlzdE9mUm93cyA9IHJvd1NldC5tYXAoeCA9PiB4Wydyb3cnXSB8fCBbXSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3R4LnNxbCA9IGFtaVdlYkFwcC5qc3BhdGgoJy5Ac3FsJywgcm93U2V0KVswXSB8fCAnTi9BJztcblx0XHRcdHRoaXMuY3R4Lm1xbCA9IGFtaVdlYkFwcC5qc3BhdGgoJy5AbXFsJywgcm93U2V0KVswXSB8fCAnTi9BJztcblx0XHRcdHRoaXMuY3R4LmFzdCA9IGFtaVdlYkFwcC5qc3BhdGgoJy5AYXN0Jywgcm93U2V0KVswXSB8fCAnTi9BJztcblxuXHRcdFx0dGhpcy5jdHgubnVtYmVyT2ZSb3dzID0gbGlzdE9mUm93cy5tYXAoeCA9PiB4Lmxlbmd0aCkucmVkdWNlKCh4LCB5KSA9PiB4ICsgeSwgMCk7XG5cdFx0XHR0aGlzLmN0eC5tYXhOdW1iZXJPZlJvd3MgPSBhbWlXZWJBcHAuanNwYXRoKCcuLkBtYXhOdW1iZXJPZlJvd3MnLCByb3dTZXQpLm1hcCh4ID0+IHBhcnNlSW50KHgpKS5yZWR1Y2UoKHgsIHkpID0+IHggKyB5LCAwKTtcblx0XHRcdHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5AdG90YWxOdW1iZXJPZlJvd3MnLCByb3dTZXQpLm1hcCh4ID0+IHBhcnNlSW50KHgpKS5yZWR1Y2UoKHgsIHkpID0+IHggKyB5LCAwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5jdHgubGlzdE9mRmllbGREZXNjcmlwdGlvbnMgPSBsaXN0T2ZGaWVsZERlc2NyaXB0aW9ucztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5jdHguc3FsID09PSAnTi9BJykge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NENDU4RkVDXzlBRDlfMzBFOF8xNDBGXzI2M0YxMTk5NjFCRScpKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDRDQ1OEZFQ185QUQ5XzMwRThfMTQwRl8yNjNGMTE5OTYxQkUnKSkuc2hvdygpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmN0eC5tcWwgPT09ICdOL0EnKSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjRGMEVCNkNfNjUzNV83NzE0XzU0RjdfNEJDMjhDMjU0ODcyJykpLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Y0RjBFQjZDXzY1MzVfNzcxNF81NEY3XzRCQzI4QzI1NDg3MicpKS5zaG93KCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuY3R4LmFzdCA9PT0gJ04vQScpIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFMkVCNjEzNl83MzU4Xzg3NUFfMjg1N184NzY2RTlCMzAzNkUnKSkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRTJFQjYxMzZfNzM1OF84NzVBXzI4NTdfODc2NkU5QjMwMzZFJykpLnNob3coKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoTnVtYmVyLmlzTmFOKHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzKSkge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0I3OTc5NjE5XzE5NkZfRjM5RF9BODkzXzE3RTVFREFBODYyOCcpKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQjc5Nzk2MTlfMTk2Rl9GMzlEX0E4OTNfMTdFNUVEQUE4NjI4JykpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRwcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnByaW1hcnlGaWVsZCxcblx0XHRcdFx0aWdub3JlZEZpZWxkczogdGhpcy5jdHguaWdub3JlZEZpZWxkcyxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRsaXN0T2ZGaWVsZERlc2NyaXB0aW9uczogbGlzdE9mRmllbGREZXNjcmlwdGlvbnMsXG5cdFx0XHRcdGxpc3RPZlJvd1NldE5hbWU6IGxpc3RPZlJvd1NldE5hbWUsXG5cdFx0XHRcdGxpc3RPZlJvd3M6IGxpc3RPZlJvd3MsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0Y3VycmVudFRhYkluZGV4OiB0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXgsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0bWF4Q2VsbExlbmd0aDogdGhpcy5jdHgubWF4Q2VsbExlbmd0aCxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRzaG93UHJpbWFyeUZpZWxkOiB0aGlzLmN0eC5zaG93UHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRzaG93VG9vbEJhcjogdGhpcy5jdHguc2hvd1Rvb2xCYXIsXG5cdFx0XHRcdHNob3dEZXRhaWxzOiB0aGlzLmN0eC5zaG93RGV0YWlscyxcblx0XHRcdFx0c2hvd1Rvb2xzOiB0aGlzLmN0eC5zaG93VG9vbHMsXG5cdFx0XHRcdGNhbkVkaXQ6IHRoaXMuY3R4LmNhbkVkaXQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLnJlcGxhY2VIVE1MKHRoaXMucGF0Y2hJZCgnI0ZFRjlFOEQ4X0Q0QUJfQjU0NV9CMzk0X0MxMkRENTgxN0Q2MScpLCB0aGlzLmZyYWdtZW50VGFibGUsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgcGFyZW50ID0gJCh0aGlzLnBhdGNoSWQoJyNGRUY5RThEOF9ENEFCX0I1NDVfQjM5NF9DMTJERDU4MTdENjEnKSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBDT0xVTU4gVE9PTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLW9yZGVyd2F5PVwiREVTQ1wiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLmN0eC5vcmRlckJ5ID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcblx0XHRcdFx0XHR0aGlzLmN0eC5vcmRlcldheSA9ICdERVNDJztcblxuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1vcmRlcndheT1cIkFTQ1wiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLmN0eC5vcmRlckJ5ID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcblx0XHRcdFx0XHR0aGlzLmN0eC5vcmRlcldheSA9ICdBU0MnO1xuXG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLWFjdGlvbj1cInJlZmluZVwiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLnNob3dSZWZpbmVNb2RhbChcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0YWxvZycpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1hY3Rpb249XCJzdGF0c1wiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLnNob3dTdGF0c1RhYihcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0YWxvZycpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1hY3Rpb249XCJncm91cFwiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLnNob3dHcm91cFRhYihcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0YWxvZycpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWVudGl0eScpXG5cdFx0XHRcdFx0XHQsXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFJPV1NFVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdbZGF0YS10YWItaW5kZXhdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuY3R4LmN1cnJlbnRUYWJJbmRleCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLWluZGV4JykpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIERFVEFJTFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdbZGF0YS1jdHJsXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayh0aGlzLmdldFBhcmVudCgpLCBlLmN1cnJlbnRUYXJnZXQsIHRoaXMuY3R4KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBGSUxURVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLWFjdGlvbj1cImZpbHRlclwiXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRjb25zdCBkZXNjciA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyLWRlZicpLnNwbGl0KCc6OicpO1xuXG5cdFx0XHRcdFx0aWYoZGVzY3IubGVuZ3RoID09PSAyKSB0aGlzLmdldE93bmVyKCkucmVmaW5lUmVzdWx0KCcyJywgZGVzY3JbMF0sIGRlc2NyWzFdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBTRVRVUCBGSUVMRCAmIFVOSVQgRURJVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldHVwKHRoaXMucGF0Y2hJZCgnI0ZFRjlFOEQ4X0Q0QUJfQjU0NV9CMzk0X0MxMkRENTgxN0Q2MScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmN0eCk7XG5cdFx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXR1cCh0aGlzLnBhdGNoSWQoJyNGRUY5RThEOF9ENEFCX0I1NDVfQjM5NF9DMTJERDU4MTdENjEnKSk7XG5cblx0XHRcdFx0dGhpcy5zZXRNb2RlKCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBVUERBVEUgSkFWQVNDUklQVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmN0eC5qcyA9IGFtaVdlYkFwcC5mb3JtYXRUV0lHKHRoaXMuZnJhZ21lbnRKUywgdGhpcy5jdHgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogRklMTCBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbnVtYmVycyA9IFtdO1xuXG5cdFx0XHRcdGlmKCFOdW1iZXIuaXNOYU4odGhpcy5jdHgubnVtYmVyT2ZSb3dzKSkge1xuXHRcdFx0XHRcdG51bWJlcnMucHVzaCgnc2hvd246ICcgKyB0aGlzLmN0eC5udW1iZXJPZlJvd3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoIU51bWJlci5pc05hTih0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cykpIHtcblx0XHRcdFx0XHRudW1iZXJzLnB1c2goJ3RvdGFsOiAnICsgdGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHNwYW4gPSAkKHRoaXMucGF0Y2hJZCgnI0M1N0M4MjRCXzE2NkNfNEMyM19GMzQ5XzhCMEM4RTk0MTE0QScpKTtcblxuXHRcdFx0XHRpZighTnVtYmVyLmlzTmFOKHRoaXMuY3R4Lm1heE51bWJlck9mUm93cykpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCB0b29sdGlwID0gJ21heGltdW0gbnVtYmVyIG9mIHNob3dhYmxlIHJvd3M6ICcgKyB0aGlzLmN0eC5tYXhOdW1iZXJPZlJvd3M7XG5cblx0XHRcdFx0XHRzcGFuLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3Rvb2x0aXAnKVxuXHRcdFx0XHRcdCAgICAuYXR0cignZGF0YS10aXRsZScsIHRvb2x0aXApXG5cdFx0XHRcdFx0ICAgIC50b29sdGlwKCdkaXNwb3NlJylcblx0XHRcdFx0XHQgICAgLnRvb2x0aXAoKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNwYW4udGV4dChudW1iZXJzLmpvaW4oJywgJykpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtsaXN0T2ZGaWVsZERlc2NyaXB0aW9ucywgbGlzdE9mUm93cywgdGhpcy5jdHguc3FsLCB0aGlzLmN0eC5tcWwsIHRoaXMuY3R4LmFzdCwgdGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3NdKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRleHBvcnRSZXN1bHQ6IGZ1bmN0aW9uKGNvbnZlcnRlcilcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUodGhpcy5jdHguY29tbWFuZCwge2NvbnZlcnRlcjogY29udmVydGVyfSkuZG9uZShmdW5jdGlvbihkYXRhLCBtZXNzYWdlKSB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dmFyIGZpbGVNaW1lO1xuXHRcdFx0dmFyIGZpbGVOYW1lO1xuXG5cdFx0XHQvKiovIGlmKGNvbnZlcnRlciA9PT0gJ0FNSVhtbFRvWG1sLnhzbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGZpbGVNaW1lID0gJ2FwcGxpY2F0aW9uL3htbCc7XG5cdFx0XHRcdGZpbGVOYW1lID0gJ3Jlc3VsdC54bWwnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0ZXIgPT09ICdBTUlYbWxUb0pzb24ueHNsJylcblx0XHRcdHtcblx0XHRcdFx0ZmlsZU1pbWUgPSAnYXBwbGljYXRpb24vanNvbic7XG5cdFx0XHRcdGZpbGVOYW1lID0gJ3Jlc3VsdC5qc29uJztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydGVyID09PSAnQU1JWG1sVG9Dc3YueHNsJylcblx0XHRcdHtcblx0XHRcdFx0ZmlsZU1pbWUgPSAndGV4dC9jc3YnO1xuXHRcdFx0XHRmaWxlTmFtZSA9ICdyZXN1bHQuY3N2Jztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0ZmlsZU1pbWUgPSAndGV4dC9wbGFpbic7XG5cdFx0XHRcdGZpbGVOYW1lID0gJ3Jlc3VsdC50eHQnO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzYXZlQXMobmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogZmlsZU1pbWV9KSwgZmlsZU5hbWUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aXNJbkVkaXRNb2RlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maWVsZEVkaXRvci5pc0luRWRpdE1vZGUoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TW9kZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgdGFnczEgPSAkKHRoaXMucGF0Y2hJZCgnI0ZFRjlFOEQ4X0Q0QUJfQjU0NV9CMzk0X0MxMkRENTgxN0Q2MScpKTtcblx0XHRjb25zdCB0YWdzMiA9ICQodGhpcy5wYXRjaElkKCcjQ0RFNUFEMTRfMTI2OF84RkE3X0Y1RDhfMEQ2OTBGM0ZCODUwJykpO1xuXG5cdFx0Y29uc3QgdGFnczMgPSB0YWdzMS5maW5kKCcuZWRpdC1tb2RlJyk7XG5cdFx0Y29uc3QgdGFnczQgPSB0YWdzMS5maW5kKCcudmlldy1tb3JlJyk7XG5cdFx0Y29uc3QgdGFnczUgPSB0YWdzMS5maW5kKCcudmlldy1tZWRpYScpO1xuXG5cdFx0aWYoJCh0aGlzLnBhdGNoSWQoJyNEREMzMjIzOF9ERDI1XzgzNTRfQUM2Q19GNkUyN0NBNkUxOEQnKSkucHJvcCgnY2hlY2tlZCcpKVxuXHRcdHtcblx0XHRcdHRhZ3MyLnNob3coKTtcblx0XHRcdHRhZ3MzLnNob3coKTtcblx0XHRcdHRhZ3M0LmhpZGUoKTtcblx0XHRcdHRhZ3M1LmhpZGUoKTtcblxuXHRcdFx0dGhpcy5maWVsZEVkaXRvci5zZXRJbkVkaXRNb2RlKHRydWUpO1xuXHRcdFx0dGhpcy51bml0RWRpdG9yLnNldEluRWRpdE1vZGUodHJ1ZSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0YWdzMi5oaWRlKCk7XG5cdFx0XHR0YWdzMy5oaWRlKCk7XG5cdFx0XHR0YWdzNC5zaG93KCk7XG5cdFx0XHR0YWdzNS5zaG93KCk7XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0SW5FZGl0TW9kZShmYWxzZSk7XG5cdFx0XHR0aGlzLnVuaXRFZGl0b3Iuc2V0SW5FZGl0TW9kZShmYWxzZSk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93Um93TW9kYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuZmllbGRFZGl0b3Iuc2hvd1Jvd01vZGFsKHRoaXMuY3R4LmNhdGFsb2csIHRoaXMuY3R4LmVudGl0eSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYnVpbGRDb2x1bW5OYW1lOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRpZihjYXRhbG9nICYmIGNhdGFsb2cgIT09ICdOL0EnKSB7XG5cdFx0XHRyZXN1bHQucHVzaCgnYCcgKyBjYXRhbG9nICsgJ2AnKTtcblx0XHR9XG5cblx0XHRpZihlbnRpdHkgJiYgZW50aXR5ICE9PSAnTi9BJykge1xuXHRcdFx0cmVzdWx0LnB1c2goJ2AnICsgZW50aXR5ICsgJ2AnKTtcblx0XHR9XG5cblx0XHRpZihmaWVsZCAmJiBmaWVsZCAhPT0gJ04vQScpIHtcblx0XHRcdHJlc3VsdC5wdXNoKCdgJyArIGZpZWxkICsgJ2AnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJy4nKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvd1JlZmluZU1vZGFsOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBpc01RTCA9IHRoaXMuY3R4Lm1xbCAmJiB0aGlzLmN0eC5tcWwgIT09ICdOL0EnO1xuXG5cdFx0Y29uc3QgcmVnaW9ucyA9IHhxbEdldFJlZ2lvbnMoaXNNUUwgPyB0aGlzLmN0eC5tcWwgOiB0aGlzLmN0eC5zcWwsIHRoaXMuY3R4Lmxpc3RPZkZpZWxkRGVzY3JpcHRpb25zW3RoaXMuY3R4LmN1cnJlbnRUYWJJbmRleF0sIGlzTVFMKTtcblxuXHRcdGNvbnN0IGNvbHVtbiA9IHRoaXMuX2J1aWxkQ29sdW1uTmFtZShyZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmNhdGFsb2csIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0udGFibGVBbGlhcywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5maWVsZCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGVsMSA9ICQoJyNDNDg1NjRFQV9BNjREXzk4QkFfNjIzMl9EMDNENTI0Q0FEMDgnKTtcblx0XHRjb25zdCBlbDIgPSAkKCcjRjExNEU1NDdfNUU3OF83MkQ5X0JCN0ZfMzU1Q0RCQjNEMDNBJyk7XG5cblx0XHRlbDEuZmluZCgnI0U3MDE0QjU3X0IxNkFfNzU5M19GQTFCXzBERDE1QzE1QUMzRScpLnRleHQoY29sdW1uKTtcblx0XHRlbDEuZmluZCgnI0YzQTA0MEUxXzQwRUVfOTdCM180NUQ2X0U3QkZCNjFEQkY0NCcpLnZhbChjb2x1bW4pO1xuXG5cdFx0ZWwxLmZpbmQoJyNDQUY4QjVFQl8xNzk2XzM4MzdfNTcyMl8zQjVCMkE3QzcyOUInKS5oaWRlKCk7XG5cdFx0ZWwxLmZpbmQoJyNBMjQ0MjdERF8wRENCXzNBQzhfNEEzRV9BNzVENzlGQUE4RjcnKS5oaWRlKCk7XG5cblx0XHRlbDEuZmluZCgnZm9ybScpWzBdLnJlc2V0KCk7XG5cblx0XHRlbDIub2ZmKCkuc3VibWl0KChlKSA9PiB7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy5yZWZpbmVSZXN1bHQoKTtcblx0XHR9KTtcblxuXHRcdGVsMS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZmluZVJlc3VsdDogZnVuY3Rpb24oX2ZpbHRlciwgX3gsIF95KVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbDEgPSAkKCcjQzQ4NTY0RUFfQTY0RF85OEJBXzYyMzJfRDAzRDUyNENBRDA4Jyk7XG5cdFx0Y29uc3QgZWwyID0gJCgnI0YxMTRFNTQ3XzVFNzhfNzJEOV9CQjdGXzM1NUNEQkIzRDAzQScpO1xuXG5cdFx0Y29uc3QgZmlsdGVyID0gX2ZpbHRlciB8fCBlbDIuZmluZCgnc2VsZWN0W25hbWU9XCJmaWx0ZXJcIl0nKS52YWwoKTtcblxuXHRcdGxldCB4ID0gX3ggfHwgZWwyLmZpbmQoJ2lucHV0W25hbWU9XCJ4XCJdJykudmFsKCk7XG5cdFx0bGV0IHkgPSBfeSB8fCBlbDIuZmluZCgnaW5wdXRbbmFtZT1cInlcIl0nKS52YWwoKTtcblxuXHRcdGxldCB5MSA9IGVsMi5maW5kKCdpbnB1dFtuYW1lPVwieTFcIl0nKS52YWwoKTtcblx0XHRsZXQgeTIgPSBlbDIuZmluZCgnaW5wdXRbbmFtZT1cInkyXCJdJykudmFsKCk7XG5cblx0XHR5ID0geS5yZXBsYWNlKC8nL2csICdcXCdcXCcnKTtcblx0XHR5MSA9IHkxLnJlcGxhY2UoLycvZywgJ1xcJ1xcJycpO1xuXHRcdHkyID0geTIucmVwbGFjZSgvJy9nLCAnXFwnXFwnJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBjb25kO1xuXG5cdFx0c3dpdGNoKGZpbHRlcilcblx0XHR7XG5cdFx0XHRjYXNlICcwJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIElTIE5VTEwnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMSc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBJUyBOT1QgTlVMTCc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICcyJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnID0gXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzMnOlxuXHRcdFx0XHRjb25kID0geCArICcgIT0gXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzQnOlxuXHRcdFx0XHRjb25kID0geCArICcgTElLRSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnNSc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBOT1QgTElLRSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnNic6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyA8IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc3Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIDw9IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc4Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnID4gXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzknOlxuXHRcdFx0XHRjb25kID0geCArICcgPj0gXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzEwJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIEJFVFdFRU4gXFwnJyArIHkxICsgJ1xcJyBBTkQgXFwnJyArIHkyICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICcxMSc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBOT1QgQkVUV0VFTiBcXCcnICsgeTEgKyAnXFwnIEFORCBcXCcnICsgeTIgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsMS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBpc01RTCA9IHRoaXMuY3R4Lm1xbCAmJiB0aGlzLmN0eC5tcWwgIT09ICdOL0EnO1xuXG5cdFx0Y29uc3QgcmVnaW9ucyA9IHhxbEdldFJlZ2lvbnMoaXNNUUwgPyB0aGlzLmN0eC5tcWwgOiB0aGlzLmN0eC5zcWwsIHRoaXMuY3R4Lmxpc3RPZkZpZWxkRGVzY3JpcHRpb25zW3RoaXMuY3R4LmN1cnJlbnRUYWJJbmRleF0sIGlzTVFMKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYocmVnaW9uc1snV0hFUkUnXSlcblx0XHR7XG5cdFx0XHRyZWdpb25zWydXSEVSRSddICs9ICcgQU5EICcgKyBjb25kO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmVnaW9uc1snV0hFUkUnXSA9IGNvbmQ7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB4cWwgPSBbXTtcblxuXHRcdGlmKHJlZ2lvbnNbJ1NFTEVDVCddKSB7XG5cdFx0XHR4cWwucHVzaCgnU0VMRUNUICcgKyByZWdpb25zWydTRUxFQ1QnXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snRlJPTSddKSB7XG5cdFx0XHR4cWwucHVzaCgnRlJPTSAnICsgcmVnaW9uc1snRlJPTSddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydXSEVSRSddKSB7XG5cdFx0XHR4cWwucHVzaCgnV0hFUkUgJyArIHJlZ2lvbnNbJ1dIRVJFJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgY29tbWFuZCA9ICdCcm93c2VRdWVyeSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5lbnRpdHkpICsgJ1wiIC0nICsgKGlzTVFMID8gJ21xbCcgOiAnc3FsJykgKyAnPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoeHFsLmpvaW4oJyAnKSkgKyAnXCInO1xuXG5cdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcih0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGFibGUnLCBbY29tbWFuZF0sIHt9LCB0aGlzLmN0eCwgJ3RhYmxlJywgdGhpcy5jdHguZW50aXR5KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93U3RhdHNUYWI6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGlzTVFMID0gdGhpcy5jdHgubXFsICYmIHRoaXMuY3R4Lm1xbCAhPT0gJ04vQSc7XG5cblx0XHRjb25zdCByZWdpb25zID0geHFsR2V0UmVnaW9ucyhpc01RTCA/IHRoaXMuY3R4Lm1xbCA6IHRoaXMuY3R4LnNxbCwgdGhpcy5jdHgubGlzdE9mRmllbGREZXNjcmlwdGlvbnNbdGhpcy5jdHguY3VycmVudFRhYkluZGV4XSwgaXNNUUwpO1xuXG5cdFx0Y29uc3QgY29sdW1uTmFtZSA9IHRoaXMuX2J1aWxkQ29sdW1uTmFtZShyZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmNhdGFsb2csIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0udGFibGVBbGlhcywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5maWVsZCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJlZ2lvbnNbJ1NFTEVDVCddID0gJ1xcJycgKyBjb2x1bW5OYW1lLnJlcGxhY2UoLycvZywgJ1xcJ1xcJycpICsgJ1xcJyBBUyBgZmllbGRgJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdNSU4oJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgbWluYCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnTUFYKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYG1heGAnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ1NVTSgnICsgY29sdW1uTmFtZSArICcpIEFTIGBzdW1gJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdBVkcoJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgYXZnYCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnU1REREVWKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYHN0ZGRldmAnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ0NPVU5UKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYGNvdW50YCdcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHhxbCA9IFtdO1xuXG5cdFx0aWYocmVnaW9uc1snU0VMRUNUJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdTRUxFQ1QgJyArIHJlZ2lvbnNbJ1NFTEVDVCddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydGUk9NJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdGUk9NICcgKyByZWdpb25zWydGUk9NJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ1dIRVJFJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdXSEVSRSAnICsgcmVnaW9uc1snV0hFUkUnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBjb21tYW5kID0gJ0Jyb3dzZVF1ZXJ5IC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmVudGl0eSkgKyAnXCIgLScgKyAoaXNNUUwgPyAnbXFsJyA6ICdzcWwnKSArICc9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh4cWwuam9pbignICcpKSArICdcIic7XG5cblx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICd0YWJsZScsIFtjb21tYW5kXSwge29yZGVyQnk6ICcnLCBvcmRlcldheTogJycsIHNob3dEZXRhaWxzOiBmYWxzZX0sIHRoaXMuY3R4LCAnYmFyLWNoYXJ0JywgdGhpcy5jdHguZW50aXR5KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93R3JvdXBUYWI6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGlzTVFMID0gdGhpcy5jdHgubXFsICYmIHRoaXMuY3R4Lm1xbCAhPT0gJ04vQSc7XG5cblx0XHRjb25zdCByZWdpb25zID0geHFsR2V0UmVnaW9ucyhpc01RTCA/IHRoaXMuY3R4Lm1xbCA6IHRoaXMuY3R4LnNxbCwgdGhpcy5jdHgubGlzdE9mRmllbGREZXNjcmlwdGlvbnNbdGhpcy5jdHguY3VycmVudFRhYkluZGV4XSwgaXNNUUwpO1xuXG5cdFx0Y29uc3QgY29sdW1uTmFtZSA9IHRoaXMuX2J1aWxkQ29sdW1uTmFtZShyZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmNhdGFsb2csIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0udGFibGVBbGlhcywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5maWVsZCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJlZ2lvbnNbJ1NFTEVDVCddID0gY29sdW1uTmFtZVxuXHRcdFx0XHQrICcsIGNvdW50KCopIEFTIGB0b3RhbGAsIENPTkNBVChcXCdAT1dORVI6OicgKyBjb2x1bW5OYW1lICsgJzo6XFwnLCAnICsgY29sdW1uTmFtZSArICcpIEFTIGBnb2AnO1xuXHRcdHJlZ2lvbnNbJ0dST1VQJ10gPSBjb2x1bW5OYW1lO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB4cWwgPSBbXTtcblxuXHRcdGlmKHJlZ2lvbnNbJ1NFTEVDVCddKSB7XG5cdFx0XHR4cWwucHVzaCgnU0VMRUNUICcgKyByZWdpb25zWydTRUxFQ1QnXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snRlJPTSddKSB7XG5cdFx0XHR4cWwucHVzaCgnRlJPTSAnICsgcmVnaW9uc1snRlJPTSddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydXSEVSRSddKSB7XG5cdFx0XHR4cWwucHVzaCgnV0hFUkUgJyArIHJlZ2lvbnNbJ1dIRVJFJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ0dST1VQJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdHUk9VUCBCWSAnICsgcmVnaW9uc1snR1JPVVAnXS5yZXBsYWNlKGVudGl0eSwgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS50YWJsZUFsaWFzKSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBjb21tYW5kID0gJ0Jyb3dzZVF1ZXJ5IC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmVudGl0eSkgKyAnXCIgLScgKyAoaXNNUUwgPyAnbXFsJyA6ICdzcWwnKSArICc9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh4cWwuam9pbignICcpKSArICdcIic7XG5cblx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICd0YWJsZScsIFtjb21tYW5kXSwge29yZGVyQnk6IGNvbHVtbk5hbWUsIG9yZGVyV2F5OiAnQVNDJywgc2hvd0RldGFpbHM6IGZhbHNlfSwgdGhpcy5jdHgsICdzbGFjaycsIHRoaXMuY3R4LmVudGl0eSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
