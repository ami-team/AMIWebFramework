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
    amiWebApp.originURL + '/controls/Table/twig/table.twig', amiWebApp.originURL + '/controls/Table/twig/js.twig',
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
        _this.fieldEditorCtor = data[6];
        _this.fieldUnitCtor = data[7];
        _this.tabCtor = data[8];
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

      $(_this4.patchId('#C9F4DBE7_EF4F_09F1_C31D_97581978BD13')).click(function () {
        _this4.exportResult('AMIXmlToXml.xsl');
      });
      $(_this4.patchId('#A4B03239_52F9_5FBB_0799_C932B9E95FCD')).click(function () {
        _this4.exportResult('AMIXmlToJson.xsl');
      });
      $(_this4.patchId('#C6182164_9432_FA0C_5273_EFF56376660E')).click(function () {
        _this4.exportResult('AMIXmlToCsv.xsl');
      });
      $(_this4.patchId('#B8CCCCA1_9829_3EA5_280E_ED47FCD33ADE')).click(function () {
        _this4.exportResult('AMIXmlToText.xsl');
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJhcHBlbmRIVE1MIiwiZnJhZ21lbnRUYWJsZUN0cmwiLCJmcmFnbWVudFRhYmxlIiwiZnJhZ21lbnRKUyIsImZpZWxkRWRpdG9yQ3RvciIsImZpZWxkVW5pdEN0b3IiLCJ0YWJDdG9yIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJsb2NrIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiY3R4IiwiaXNFbWJlZGRlZCIsImVuZHBvaW50IiwiYW1pQ29tbWFuZCIsInRyaW0iLCJzcWwiLCJtcWwiLCJhc3QiLCJjdXJyZW50VGFiSW5kZXgiLCJzZXR1cCIsImNvbnRleHQiLCJlbmFibGVDYWNoZSIsImVuYWJsZUNvdW50Iiwic2hvd1ByaW1hcnlGaWVsZCIsInNob3dUb29sQmFyIiwic2hvd0RldGFpbHMiLCJzaG93VG9vbHMiLCJjYW5FZGl0IiwiY2F0YWxvZyIsImVudGl0eSIsInByaW1hcnlGaWVsZCIsInJvd3NldCIsInN0YXJ0Iiwic3RvcCIsIm9yZGVyQnkiLCJvcmRlcldheSIsIm1heENlbGxMZW5ndGgiLCJjYXJkIiwiaWdub3JlZEZpZWxkcyIsImZpZWxkRWRpdG9yIiwidW5pdEVkaXRvciIsImdldEluZm8iLCJfcmVuZGVyIiwiZmFpbCIsImFsd2F5cyIsInVubG9jayIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsImRpY3QiLCJwYXRjaElkIiwiY2xpY2siLCJmaXJzdFBhZ2UiLCJtZXNzYWdlIiwiZXJyb3IiLCJwcmV2UGFnZSIsIm5leHRQYWdlIiwibGFzdFBhZ2UiLCJrZXlwcmVzcyIsImUiLCJrZXlDb2RlIiwicmVmcmVzaCIsImNoYW5nZSIsInNldE1vZGUiLCJzaG93Um93TW9kYWwiLCJleHBvcnRSZXN1bHQiLCJjdXJyZW50VGFyZ2V0IiwidG9vbHRpcCIsImNyZWF0ZUNvbnRyb2wiLCJpbnN0YW5jZSIsImNvbW1hbmQyIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsImpzIiwicGFyYW1zIiwiYXV0b1JlZnJlc2giLCJjb25maXJtIiwiZXhlY3V0ZSIsInRleHRUb1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWNjZXNzIiwiZmllbGREZXNjcmlwdGlvbnMiLCJyb3dzIiwidG90YWxOdW1iZXJPZlJvd3MiLCJyZXNvbHZlV2l0aCIsInJlamVjdFdpdGgiLCJwYXJzZVBhZ2VOdW1iZXIiLCJzIiwiZGVmYXVsdFBhZ2VOdW1iZXIiLCJwYXJzZWRQYWdlTnVtYmVyIiwicGFyc2VJbnQiLCJOdW1iZXIiLCJpc05hTiIsImdldE9mZnNldE9mTGFzdFBhZ2UiLCJyYW5nZSIsIm1vZHVsbyIsIm9sZFN0YXJ0IiwidmFsIiwib2xkU3RvcCIsIm5ld1N0YXJ0IiwibmV3U3RvcCIsImZpZWxkRGVzY3JpcHRpb25TZXQiLCJqc3BhdGgiLCJyb3dTZXQiLCJsaXN0T2ZGaWVsZERlc2NyaXB0aW9ucyIsIm1hcCIsIngiLCJsaXN0T2ZSb3dTZXROYW1lIiwibGlzdE9mUm93cyIsIm51bWJlck9mUm93cyIsImxlbmd0aCIsInJlZHVjZSIsInkiLCJtYXhOdW1iZXJPZlJvd3MiLCJoaWRlIiwic2hvdyIsInByb3AiLCJmaW5kIiwicHJldmVudERlZmF1bHQiLCJnZXRBdHRyaWJ1dGUiLCJzaG93UmVmaW5lTW9kYWwiLCJzaG93U3RhdHNUYWIiLCJzaG93R3JvdXBUYWIiLCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmsiLCJkZXNjciIsInNwbGl0IiwiZ2V0T3duZXIiLCJyZWZpbmVSZXN1bHQiLCJmb3JtYXRUV0lHIiwibnVtYmVycyIsInB1c2giLCJzcGFuIiwiYXR0ciIsInRleHQiLCJqb2luIiwiY29udmVydGVyIiwiZmlsZU1pbWUiLCJmaWxlTmFtZSIsInNhdmVBcyIsIkJsb2IiLCJ0eXBlIiwiaXNJbkVkaXRNb2RlIiwidGFnczEiLCJ0YWdzMiIsInRhZ3MzIiwidGFnczQiLCJ0YWdzNSIsInNldEluRWRpdE1vZGUiLCJfYnVpbGRDb2x1bW5OYW1lIiwiZmllbGQiLCJpc01RTCIsInJlZ2lvbnMiLCJ4cWxHZXRSZWdpb25zIiwiY29sdW1uIiwidGFibGVBbGlhcyIsImVsMSIsImVsMiIsInJlc2V0Iiwib2ZmIiwic3VibWl0IiwibW9kYWwiLCJfZmlsdGVyIiwiX3giLCJfeSIsImZpbHRlciIsInkxIiwieTIiLCJyZXBsYWNlIiwiY29uZCIsInhxbCIsImNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lciIsImNvbHVtbk5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FBYUE7QUFFQUEsU0FBUyxDQUFDLFdBQUQsRUFBYztBQUN0QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsT0FIUTs7QUFLdEI7QUFFQUMsRUFBQUEsS0FBSyxFQUFFLGVBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQ1A7QUFDQyxTQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNBLEdBVnFCOztBQVl0QjtBQUVBRSxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQztBQUVBLFdBQU9DLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLHFDQURRO0FBRTlCO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix1Q0FIUTtBQUk5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsaUNBTFEsRUFNOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQiw4QkFOUTtBQU85QjtBQUNBRixJ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QyxJQUFKLENBQVMsY0FBY3FCLE9BQU8sQ0FBQyxPQUFELENBQVAsQ0FBaUJnQixPQUFqQixDQUF5QmpKLE1BQXpCLEVBQWlDaUksT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQkYsS0FBbkIsRUFBMEJLLFVBQTNELENBQXZCO0FBQ0E7QUFFRDs7O0FBRUEsUUFBTTdKLE9BQU8sR0FBRywyQkFBMkJkLFNBQVMsQ0FBQzhGLFlBQVYsQ0FBdUIsS0FBSzFFLEdBQUwsQ0FBU2tCLE9BQWhDLENBQTNCLEdBQXNFLGFBQXRFLEdBQXNGdEMsU0FBUyxDQUFDOEYsWUFBVixDQUF1QixLQUFLMUUsR0FBTCxDQUFTbUIsTUFBaEMsQ0FBdEYsR0FBZ0ksS0FBaEksSUFBeUlnSSxLQUFLLEdBQUcsS0FBSCxHQUFXLEtBQXpKLElBQWtLLElBQWxLLEdBQXlLdkssU0FBUyxDQUFDOEYsWUFBVixDQUF1QjRGLEdBQUcsQ0FBQ25DLElBQUosQ0FBUyxHQUFULENBQXZCLENBQXpLLEdBQWlOLEdBQWpPO0FBRUF2SixJQUFBQSxTQUFTLENBQUMyTCx3QkFBVixDQUFtQyxLQUFLbkksU0FBTCxFQUFuQyxFQUFxRCxJQUFyRCxFQUEyRCxPQUEzRCxFQUFvRSxDQUFDMUMsT0FBRCxDQUFwRSxFQUErRTtBQUFDOEIsTUFBQUEsT0FBTyxFQUFFZ0osVUFBVjtBQUFzQi9JLE1BQUFBLFFBQVEsRUFBRSxLQUFoQztBQUF1Q1YsTUFBQUEsV0FBVyxFQUFFO0FBQXBELEtBQS9FLEVBQTJJLEtBQUtmLEdBQWhKLEVBQXFKLE9BQXJKLEVBQThKLEtBQUtBLEdBQUwsQ0FBU21CLE1BQXZLO0FBRUE7QUFDQTtBQUVEOztBQXp2Q3NCLENBQWQsQ0FBVDtBQTR2Q0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICogQGdsb2JhbCB4cWxHZXRSZWdpb25zXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnVGFibGVDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS90d2lnL1RhYmxlQ3RybC50d2lnJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1RhYmxlL3R3aWcvcmVmaW5lTW9kYWwudHdpZycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS90d2lnL3RhYmxlLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvVGFibGUvdHdpZy9qcy50d2lnJyxcblx0XHRcdC8qKi9cblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1RhYmxlL2pzL2xpYnhxbC5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvZmlsZXNhdmVyLm1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHQnY3RybDpmaWVsZEVkaXRvcicsXG5cdFx0XHQnY3RybDp1bml0RWRpdG9yJyxcblx0XHRcdCdjdHJsOnRhYicsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMV0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZnJhZ21lbnRUYWJsZUN0cmwgPSBkYXRhWzBdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50VGFibGUgPSBkYXRhWzJdO1xuXHRcdFx0XHR0aGlzLmZyYWdtZW50SlMgPSBkYXRhWzNdO1xuXG5cdFx0XHRcdHRoaXMuZmllbGRFZGl0b3JDdG9yID0gZGF0YVs2XTtcblx0XHRcdFx0dGhpcy5maWVsZFVuaXRDdG9yID0gZGF0YVs3XTtcblx0XHRcdFx0dGhpcy50YWJDdG9yID0gZGF0YVs4XTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmQsIHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4ID0ge1xuXHRcdFx0aXNFbWJlZGRlZDogYW1pV2ViQXBwLmlzRW1iZWRkZWQoKSxcblxuXHRcdFx0ZW5kcG9pbnQ6IGFtaUNvbW1hbmQuZW5kcG9pbnQsXG5cblx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQudHJpbSgpLFxuXG5cdFx0XHQvKiovXG5cblx0XHRcdHNxbDogJ04vQScsXG5cdFx0XHRtcWw6ICdOL0EnLFxuXHRcdFx0YXN0OiAnTi9BJyxcblxuXHRcdFx0Y3VycmVudFRhYkluZGV4OiAwLFxuXHRcdH07XG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LFxuXHRcdFx0ZW5hYmxlQ2FjaGUsIGVuYWJsZUNvdW50LCBzaG93UHJpbWFyeUZpZWxkLCBzaG93VG9vbEJhciwgc2hvd0RldGFpbHMsIHNob3dUb29scywgY2FuRWRpdCxcblx0XHRcdGNhdGFsb2csIGVudGl0eSwgcHJpbWFyeUZpZWxkLCByb3dzZXQsXG5cdFx0XHRzdGFydCwgc3RvcCwgb3JkZXJCeSwgb3JkZXJXYXksXG5cdFx0XHRtYXhDZWxsTGVuZ3RoLFxuXHRcdFx0Y2FyZFxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbXG5cdFx0XHRcdCdjb250ZXh0Jyxcblx0XHRcdFx0J2VuYWJsZUNhY2hlJywgJ2VuYWJsZUNvdW50JywgJ3Nob3dQcmltYXJ5RmllbGQnLCAnc2hvd1Rvb2xCYXInLCAnc2hvd0RldGFpbHMnLCAnc2hvd1Rvb2xzJywgJ2NhbkVkaXQnLFxuXHRcdFx0XHQnY2F0YWxvZycsICdlbnRpdHknLCAncHJpbWFyeUZpZWxkJywgJ3Jvd3NldCcsXG5cdFx0XHRcdCdzdGFydCcsICdzdG9wJywgJ29yZGVyQnknLCAnb3JkZXJXYXknLFxuXHRcdFx0XHQnbWF4Q2VsbExlbmd0aCcsXG5cdFx0XHRcdCdjYXJkJyxcblx0XHRcdF0sXG5cdFx0XHRbXG5cdFx0XHRcdHJlc3VsdCxcblx0XHRcdFx0ZmFsc2UsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlLCB0cnVlLCBmYWxzZSxcblx0XHRcdFx0JycsICcnLCAnJywgJycsXG5cdFx0XHRcdDEsIDEwLCAnJywgJycsXG5cdFx0XHRcdDY0LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHR0aGlzLmN0eC5lbmFibGVDYWNoZSA9IGVuYWJsZUNhY2hlO1xuXHRcdHRoaXMuY3R4LmVuYWJsZUNvdW50ID0gZW5hYmxlQ291bnQ7XG5cblx0XHR0aGlzLmN0eC5zaG93UHJpbWFyeUZpZWxkID0gc2hvd1ByaW1hcnlGaWVsZDtcblx0XHR0aGlzLmN0eC5zaG93VG9vbEJhciA9IHNob3dUb29sQmFyO1xuXHRcdHRoaXMuY3R4LnNob3dEZXRhaWxzID0gc2hvd0RldGFpbHM7XG5cdFx0dGhpcy5jdHguc2hvd1Rvb2xzID0gc2hvd1Rvb2xzO1xuXHRcdHRoaXMuY3R4LmNhbkVkaXQgPSBjYW5FZGl0O1xuXG5cdFx0dGhpcy5jdHguY2F0YWxvZyA9IGNhdGFsb2c7XG5cdFx0dGhpcy5jdHguZW50aXR5ID0gZW50aXR5O1xuXHRcdHRoaXMuY3R4LnJvd3NldCA9IHJvd3NldDtcblxuXHRcdHRoaXMuY3R4LnN0YXJ0ID0gc3RhcnQ7XG5cdFx0dGhpcy5jdHguc3RvcCA9IHN0b3A7XG5cdFx0dGhpcy5jdHgub3JkZXJCeSA9IG9yZGVyQnk7XG5cdFx0dGhpcy5jdHgub3JkZXJXYXkgPSBvcmRlcldheTtcblxuXHRcdHRoaXMuY3R4Lm1heENlbGxMZW5ndGggPSBtYXhDZWxsTGVuZ3RoO1xuXG5cdFx0dGhpcy5jdHguY2FyZCA9IGNhcmQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4Lmlnbm9yZWRGaWVsZHMgPSB7XG5cdFx0XHQnT1JBQ0xFX1JPV05VTSc6ICcnLFxuXHRcdFx0J1BST0pFQ1QnOiAnJyxcblx0XHRcdCdQUk9DRVNTJzogJycsXG5cdFx0XHQnQU1JRU5USVRZTkFNRSc6ICcnLFxuXHRcdFx0J0FNSUVMRU1FTlRJRCc6ICcnLFxuXHRcdFx0J0FNSUNSRUFURUQnOiAnJyxcblx0XHRcdCdBTUlMQVNUTU9ESUZJRUQnOiAnJyxcblx0XHRcdCdBTUlTWVNEQVRFJzogJydcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmZpZWxkRWRpdG9yID0gbmV3IHRoaXMuZmllbGRFZGl0b3JDdG9yKHRoaXMsIHRoaXMpO1xuXHRcdHRoaXMudW5pdEVkaXRvciA9IG5ldyB0aGlzLmZpZWxkVW5pdEN0b3IodGhpcywgdGhpcyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMuY3R4LmNhbkVkaXQgfHwgKCh0aGlzLmN0eC5zaG93RGV0YWlscyB8fCB0aGlzLmN0eC5zaG93VG9vbHMpICYmICF0aGlzLmN0eC5wcmltYXJ5RmllbGQpKVxuXHRcdHtcblx0XHRcdHRoaXMuZmllbGRFZGl0b3IuZ2V0SW5mbyhjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZCkuZG9uZSgocHJpbWFyeUZpZWxkKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkID0gcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHRcdHRoaXMuY3R4LnNob3dEZXRhaWxzID0gdGhpcy5jdHguc2hvd0RldGFpbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHRoaXMuY3R4LnNob3dUb29scyAmJiAhIXByaW1hcnlGaWVsZDtcblx0XHRcdFx0dGhpcy5jdHguY2FuRWRpdCA9IHRoaXMuY3R4LmNhbkVkaXQgJiYgISFwcmltYXJ5RmllbGQ7XG5cblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXG5cdFx0XHR9KS5mYWlsKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmN0eC5wcmltYXJ5RmllbGQgPSBwcmltYXJ5RmllbGQ7XG5cblx0XHRcdFx0dGhpcy5jdHguc2hvd0RldGFpbHMgPSB0aGlzLmN0eC5zaG93RGV0YWlscyAmJiAhIXByaW1hcnlGaWVsZDtcblx0XHRcdFx0dGhpcy5jdHguc2hvd1Rvb2xzID0gdGhpcy5jdHguc2hvd1Rvb2xzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0XHR0aGlzLmN0eC5jYW5FZGl0ID0gLyotLS0tLS0tLS0tKi8gZmFsc2UgLyotLS0tLS0tLS0tKi87XG5cblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLmN0eC5wcmltYXJ5RmllbGQgPSBwcmltYXJ5RmllbGQ7XG5cblx0XHRcdHRoaXMuY3R4LnNob3dEZXRhaWxzID0gdGhpcy5jdHguc2hvd0RldGFpbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHR0aGlzLmN0eC5zaG93VG9vbHMgPSB0aGlzLmN0eC5zaG93VG9vbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHR0aGlzLmN0eC5jYW5FZGl0ID0gLyotLS0tLS0tLS0tKi8gZmFsc2UgLyotLS0tLS0tLS0tKi87XG5cblx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgc2VsZWN0b3IpXG5cdHtcblx0XHRpZih0aGlzLmdldFBhcmVudCgpLiRuYW1lICE9PSAnVGFiQ3RybCcpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGFiID0gbmV3IHRoaXMudGFiQ3RvcihudWxsLCB0aGlzKTtcblxuXHRcdFx0dGFiLnJlbmRlcihzZWxlY3RvciwgdGhpcy5jdHgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRhYi5hcHBlbmRJdGVtKCc8aSBjbGFzcz1cImZhIGZhLXRhYmxlXCI+PC9pPiAnICsgdGhpcy5jdHguZW50aXR5LCB7Y2xvc2FibGU6IGZhbHNlLCBmaXJzdFZpc2libGU6IGZhbHNlfSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0UGFyZW50KHRhYik7XG5cblx0XHRcdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudFRhYmxlQ3RybCwge2RpY3Q6IHRoaXMuY3R4fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkExQTdFRUFfMkJCNV81MkYyXzVCQ0ZfNjRCMEMzODFCNTcwJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmZpcnN0UGFnZSgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCQjEyNjI5NF9GRkMyXzI0QjhfODc2NV9DRjY1M0VCOTUwRjcnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMucHJldlBhZ2UoKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRTdGREY0QzhfRUNEMl8zRkUwXzhDNzVfNTQxRTUxMTIzOUMyJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLm5leHRQYWdlKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0I3OTc5NjE5XzE5NkZfRjM5RF9BODkzXzE3RTVFREFBODYyOCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5sYXN0UGFnZSgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkua2V5cHJlc3MoKGUpID0+IHtcblxuXHRcdFx0XHRpZihlLmtleUNvZGUgPT0gMTMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnJlZnJlc2goKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLmtleXByZXNzKChlKSA9PiB7XG5cblx0XHRcdFx0aWYoZS5rZXlDb2RlID09IDEzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Q4MDkxNjZGX0E0MEJfMjM3Nl9DOEE1Xzk3N0FBMEM4QzQwOCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0REQzMyMjM4X0REMjVfODM1NF9BQzZDX0Y2RTI3Q0E2RTE4RCcpKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuc2V0TW9kZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQ0RFNUFEMTRfMTI2OF84RkE3X0Y1RDhfMEQ2OTBGM0ZCODUwJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnNob3dSb3dNb2RhbCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQzlGNERCRTdfRUY0Rl8wOUYxX0MzMURfOTc1ODE5NzhCRDEzJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmV4cG9ydFJlc3VsdCgnQU1JWG1sVG9YbWwueHNsJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBNEIwMzIzOV81MkY5XzVGQkJfMDc5OV9DOTMyQjlFOTVGQ0QnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXhwb3J0UmVzdWx0KCdBTUlYbWxUb0pzb24ueHNsJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDNjE4MjE2NF85NDMyX0ZBMENfNTI3M19FRkY1NjM3NjY2MEUnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXhwb3J0UmVzdWx0KCdBTUlYbWxUb0Nzdi54c2wnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0I4Q0NDQ0ExXzk4MjlfM0VBNV8yODBFX0VENDdGQ0QzM0FERScpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5leHBvcnRSZXN1bHQoJ0FNSVhtbFRvVGV4dC54c2wnKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0M4Q0IzMERDXzQxNEZfNzU1OV9CNjE4XzQyQjdDQzA0Rjk5MycpKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkudG9vbHRpcCgnaGlkZScpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnZWRpdEJveCcsIFt0aGlzLmN0eC5jb21tYW5kXSwge30pLmRvbmUoKGluc3RhbmNlLCBjb21tYW5kKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdHRoaXMuY3R4LmNvbW1hbmQgPSBjb21tYW5kO1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLnJlZnJlc2goKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDRDQ1OEZFQ185QUQ5XzMwRThfMTQwRl8yNjNGMTE5OTYxQkUnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdtZXNzYWdlQm94JywgW3RoaXMuY3R4LnNxbF0sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Y0RjBFQjZDXzY1MzVfNzcxNF81NEY3XzRCQzI4QzI1NDg3MicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ21lc3NhZ2VCb3gnLCBbdGhpcy5jdHgubXFsXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRUY3MzlFRTBfREI3OV8wQTRFXzlGRERfN0JBM0MwRjc0RjkyJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5jb21tYW5kMi5zdGFydHNXaXRoKCdCcm93c2VRdWVyeScpID8gJ1NlYXJjaFF1ZXJ5JyArIHRoaXMuY3R4LmNvbW1hbmQyLnN1YnN0cmluZygxMSkgOiB0aGlzLmN0eC5jb21tYW5kMl0sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Q0OTg1M0UyXzkzMTlfNTJDM181MjUzX0EyMDhGOTUwMDQwOCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ21lc3NhZ2VCb3gnLCBbdGhpcy5jdHguY29tbWFuZC5zdGFydHNXaXRoKCdCcm93c2VRdWVyeScpID8gJ1NlYXJjaFF1ZXJ5JyArIHRoaXMuY3R4LmNvbW1hbmQuc3Vic3RyaW5nKDExKSA6IHRoaXMuY3R4LmNvbW1hbmRdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDNTBDMzQyN19GRUU1X0YxMTVfMUZFQ182QTY2Njg3NjNFQzQnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICd0ZXh0Qm94JywgW3RoaXMuY3R4LmpzXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjFDNzkyNDZfMTdCMl9COUIwXzNBQkZfOEMxMEZBMDg1MkREJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFyYW1zID0gW1xuXHRcdFx0XHRcdHRoaXMuY3R4LmNvbW1hbmRcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRjb25zdCBzZXR0aW5ncyA9IHtcblx0XHRcdFx0XHRlbmFibGVDYWNoZTogdGhpcy5jdHguZW5hYmxlQ2FjaGUsXG5cdFx0XHRcdFx0ZW5hYmxlQ291bnQ6IHRoaXMuY3R4LmVuYWJsZUNvdW50LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRzaG93UHJpbWFyeUZpZWxkOiB0aGlzLmN0eC5zaG93UHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRcdHNob3dUb29sQmFyOiB0aGlzLmN0eC5zaG93VG9vbEJhcixcblx0XHRcdFx0XHRzaG93RGV0YWlsczogdGhpcy5jdHguc2hvd0RldGFpbHMsXG5cdFx0XHRcdFx0c2hvd1Rvb2xzOiB0aGlzLmN0eC5zaG93VG9vbHMsXG5cdFx0XHRcdFx0Y2FuRWRpdDogdGhpcy5jdHguY2FuRWRpdCxcblx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0Y2F0YWxvZzogdGhpcy5jdHguY2F0YWxvZyxcblx0XHRcdFx0XHRlbnRpdHk6IHRoaXMuY3R4LmVudGl0eSxcblx0XHRcdFx0XHRwcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnByaW1hcnlGaWVsZCxcblx0XHRcdFx0XHRyb3dzZXQ6IHRoaXMuY3R4LnJvd3NldCxcblx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0c3RhcnQ6IHRoaXMuY3R4LnN0YXJ0LFxuXHRcdFx0XHRcdHN0b3A6IHRoaXMuY3R4LnN0b3AsXG5cdFx0XHRcdFx0b3JkZXJCeTogdGhpcy5jdHgub3JkZXJCeSxcblx0XHRcdFx0XHRvcmRlcldheTogdGhpcy5jdHgub3JkZXJXYXksXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdG1heENlbGxMZW5ndGg6IHRoaXMuY3R4Lm1heENlbGxMZW5ndGgsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdGNhcmQ6IHRoaXMuY3R4LmNhcmQsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGF1dG9SZWZyZXNoID0gY29uZmlybSgnQXV0by1yZWZyZXNoIG5ldyB3aWRnZXQ/Jyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdBZGRXaWRnZXQgLWNvbnRyb2w9XCJUYWJsZVwiIC1wYXJhbXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKSArICdcIiAtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpICsgJ1wiIC10cmFuc3BhcmVudCcgKyAoYXV0b1JlZnJlc2ggPyAnIC1hdXRvUmVmcmVzaCcgOiAnJykpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKGZpZWxkRGVzY3JpcHRpb25zLCByb3dzLCBzcWwsIG1xbCwgYXN0LCB0b3RhbE51bWJlck9mUm93cykgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLmN0eC5jb250ZXh0LCBbZmllbGREZXNjcmlwdGlvbnMsIHJvd3MsIHNxbCwgbXFsLCBhc3QsIHRvdGFsTnVtYmVyT2ZSb3dzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aCh0aGlzLmN0eC5jb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGFnZU51bWJlcjogZnVuY3Rpb24ocywgZGVmYXVsdFBhZ2VOdW1iZXIpXG5cdHtcblx0XHRjb25zdCBwYXJzZWRQYWdlTnVtYmVyID0gcGFyc2VJbnQocyk7XG5cblx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZFBhZ2VOdW1iZXIpID09PSBmYWxzZSAmJiBwYXJzZWRQYWdlTnVtYmVyID4gMCA/IHBhcnNlZFBhZ2VOdW1iZXJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRQYWdlTnVtYmVyXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRPZmZzZXRPZkxhc3RQYWdlOiBmdW5jdGlvbihyYW5nZSlcblx0e1xuXHRcdGNvbnN0IG1vZHVsbyA9IHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzICUgcmFuZ2U7XG5cblx0XHRyZXR1cm4gdGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MgPiBtb2R1bG8gPyB0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cyAtIG1vZHVsbyArIDFcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDFcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZpcnN0UGFnZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgb2xkU3RhcnQgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgpLCB0aGlzLmN0eC5zdGFydFxuXHRcdCk7XG5cblx0XHRjb25zdCBvbGRTdG9wID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwoKSwgdGhpcy5jdHguc3RvcFxuXHRcdCk7XG5cblx0XHRjb25zdCByYW5nZSA9IG9sZFN0b3AgLSBvbGRTdGFydCArIDE7XG5cblx0XHRjb25zdCBuZXdTdGFydCA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE7XG5cdFx0Y29uc3QgbmV3U3RvcCA9IG5ld1N0YXJ0ICsgcmFuZ2UgLSAxO1xuXG5cdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKG5ld1N0YXJ0KTtcblx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwobmV3U3RvcCk7XG5cblx0XHRyZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGxhc3RQYWdlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBvbGRTdGFydCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKCksIHRoaXMuY3R4LnN0YXJ0XG5cdFx0KTtcblxuXHRcdGNvbnN0IG9sZFN0b3AgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbCgpLCB0aGlzLmN0eC5zdG9wXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJhbmdlID0gb2xkU3RvcCAtIG9sZFN0YXJ0ICsgMTtcblxuXHRcdGNvbnN0IG5ld1N0YXJ0ID0gdGhpcy5nZXRPZmZzZXRPZkxhc3RQYWdlKHJhbmdlKTtcblx0XHRjb25zdCBuZXdTdG9wID0gbmV3U3RhcnQgKyByYW5nZSAtIDE7XG5cblx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwobmV3U3RhcnQpO1xuXHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChuZXdTdG9wKTtcblxuXHRcdHJldHVybiB0aGlzLnJlZnJlc2goKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJldlBhZ2U6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG9sZFN0YXJ0ID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoKSwgdGhpcy5jdHguc3RhcnRcblx0XHQpO1xuXG5cdFx0Y29uc3Qgb2xkU3RvcCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKCksIHRoaXMuY3R4LnN0b3Bcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmFuZ2UgPSBvbGRTdG9wIC0gb2xkU3RhcnQgKyAxO1xuXG5cdFx0Y29uc3QgbmV3U3RhcnQgPSBvbGRTdGFydCAtIHJhbmdlO1xuXHRcdGNvbnN0IG5ld1N0b3AgPSBvbGRTdG9wIC0gcmFuZ2U7XG5cblx0XHRpZihuZXdTdGFydCA+PSAxICYmIG5ld1N0b3AgPj0gMSlcblx0XHR7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwobmV3U3RhcnQpO1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKG5ld1N0b3ApO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKDB4MDAwMSk7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwocmFuZ2UpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnJlZnJlc2goKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bmV4dFBhZ2U6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG9sZFN0YXJ0ID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoKSwgdGhpcy5jdHguc3RhcnRcblx0XHQpO1xuXG5cdFx0Y29uc3Qgb2xkU3RvcCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKCksIHRoaXMuY3R4LnN0b3Bcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmFuZ2UgPSBvbGRTdG9wIC0gb2xkU3RhcnQgKyAxO1xuXG5cdFx0Y29uc3QgbmV3U3RhcnQgPSBvbGRTdGFydCArIHJhbmdlO1xuXHRcdGNvbnN0IG5ld1N0b3AgPSBvbGRTdG9wICsgcmFuZ2U7XG5cblx0XHRpZihuZXdTdGFydCA+PSAxICYmIG5ld1N0b3AgPj0gMSlcblx0XHR7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwobmV3U3RhcnQpO1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKG5ld1N0b3ApO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKDB4MDAwMSk7XG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwocmFuZ2UpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnJlZnJlc2goKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVmcmVzaDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFsnY29udGV4dCddLCBbcmVzdWx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5jb21tYW5kMiA9IHRoaXMuY3R4LmNvbW1hbmQ7XG5cblx0XHQvKiovXG5cblx0XHRpZih0aGlzLmN0eC5vcmRlckJ5KVxuXHRcdHtcblx0XHRcdHRoaXMuY3R4LmNvbW1hbmQyICs9ICcgLW9yZGVyQnk9XCInICsgdGhpcy5jdHgub3JkZXJCeSArICdcIic7XG5cblx0XHRcdGlmKHRoaXMuY3R4Lm9yZGVyV2F5KVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLmN0eC5jb21tYW5kMiArPSAnIC1vcmRlcldheT1cIicgKyB0aGlzLmN0eC5vcmRlcldheSArICdcIic7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqL1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgpLCB0aGlzLmN0eC5zdGFydFxuXHRcdCk7XG5cblx0XHRjb25zdCBzdG9wID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwoKSwgdGhpcy5jdHguc3RvcFxuXHRcdCk7XG5cblx0XHR0aGlzLmN0eC5jb21tYW5kMiArPSAnIC1saW1pdD1cIicgKyAoc3RvcCAtIHN0YXJ0ICsgMSkgKyAnXCInO1xuXG5cdFx0dGhpcy5jdHguY29tbWFuZDIgKz0gJyAtb2Zmc2V0PVwiJyArICgweDAwICsgc3RhcnQgLSAxKSArICdcIic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSh0aGlzLmN0eC5jb21tYW5kMiArICh0aGlzLmN0eC5lbmFibGVDYWNoZSA/ICcgLWNhY2hlZCcgOiAnJykgKyAodGhpcy5jdHguZW5hYmxlQ291bnQgPyAnIC1jb3VudCcgOiAnJykpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZmllbGREZXNjcmlwdGlvblNldCA9IHRoaXMuY3R4LnJvd3NldCA/IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGREZXNjcmlwdGlvbnN7LkByb3dzZXQ9PT1cIicgKyB0aGlzLmN0eC5yb3dzZXQgKyAnXCJ9JywgZGF0YSlcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkRGVzY3JpcHRpb25zJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkYXRhKVxuXHRcdFx0O1xuXG5cdFx0XHRjb25zdCByb3dTZXQgPSB0aGlzLmN0eC5yb3dzZXQgPyBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cIicgKyB0aGlzLmN0eC5yb3dzZXQgKyAnXCJ9XCInLCBkYXRhKVxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXQnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSlcblx0XHRcdDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbGlzdE9mRmllbGREZXNjcmlwdGlvbnMgPSBmaWVsZERlc2NyaXB0aW9uU2V0Lm1hcCh4ID0+IHhbJ2ZpZWxkRGVzY3JpcHRpb24nXSB8fCBbXSk7XG5cblx0XHRcdGNvbnN0IGxpc3RPZlJvd1NldE5hbWUgPSByb3dTZXQubWFwKHggPT4geFsnQHR5cGUnXSB8fCAncmVzdWx0Jyk7XG5cblx0XHRcdGNvbnN0IGxpc3RPZlJvd3MgPSByb3dTZXQubWFwKHggPT4geFsncm93J10gfHwgW10pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmN0eC5zcWwgPSBhbWlXZWJBcHAuanNwYXRoKCcuQHNxbCcsIHJvd1NldClbMF0gfHwgJ04vQSc7XG5cdFx0XHR0aGlzLmN0eC5tcWwgPSBhbWlXZWJBcHAuanNwYXRoKCcuQG1xbCcsIHJvd1NldClbMF0gfHwgJ04vQSc7XG5cdFx0XHR0aGlzLmN0eC5hc3QgPSBhbWlXZWJBcHAuanNwYXRoKCcuQGFzdCcsIHJvd1NldClbMF0gfHwgJ04vQSc7XG5cblx0XHRcdHRoaXMuY3R4Lm51bWJlck9mUm93cyA9IGxpc3RPZlJvd3MubWFwKHggPT4geC5sZW5ndGgpLnJlZHVjZSgoeCwgeSkgPT4geCArIHksIDApO1xuXHRcdFx0dGhpcy5jdHgubWF4TnVtYmVyT2ZSb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5AbWF4TnVtYmVyT2ZSb3dzJywgcm93U2V0KS5tYXAoeCA9PiBwYXJzZUludCh4KSkucmVkdWNlKCh4LCB5KSA9PiB4ICsgeSwgMCk7XG5cdFx0XHR0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uQHRvdGFsTnVtYmVyT2ZSb3dzJywgcm93U2V0KS5tYXAoeCA9PiBwYXJzZUludCh4KSkucmVkdWNlKCh4LCB5KSA9PiB4ICsgeSwgMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3R4Lmxpc3RPZkZpZWxkRGVzY3JpcHRpb25zID0gbGlzdE9mRmllbGREZXNjcmlwdGlvbnM7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuY3R4LnNxbCA9PT0gJ04vQScpIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDRDQ1OEZFQ185QUQ5XzMwRThfMTQwRl8yNjNGMTE5OTYxQkUnKSkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQ0Q0NThGRUNfOUFEOV8zMEU4XzE0MEZfMjYzRjExOTk2MUJFJykpLnNob3coKTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5jdHgubXFsID09PSAnTi9BJykge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Y0RjBFQjZDXzY1MzVfNzcxNF81NEY3XzRCQzI4QzI1NDg3MicpKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGNEYwRUI2Q182NTM1Xzc3MTRfNTRGN180QkMyOEMyNTQ4NzInKSkuc2hvdygpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmN0eC5hc3QgPT09ICdOL0EnKSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRTJFQjYxMzZfNzM1OF84NzVBXzI4NTdfODc2NkU5QjMwMzZFJykpLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0UyRUI2MTM2XzczNThfODc1QV8yODU3Xzg3NjZFOUIzMDM2RScpKS5zaG93KCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKE51bWJlci5pc05hTih0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cykpIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCNzk3OTYxOV8xOTZGX0YzOURfQTg5M18xN0U1RURBQTg2MjgnKSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0I3OTc5NjE5XzE5NkZfRjM5RF9BODkzXzE3RTVFREFBODYyOCcpKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0cHJpbWFyeUZpZWxkOiB0aGlzLmN0eC5wcmltYXJ5RmllbGQsXG5cdFx0XHRcdGlnbm9yZWRGaWVsZHM6IHRoaXMuY3R4Lmlnbm9yZWRGaWVsZHMsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0bGlzdE9mRmllbGREZXNjcmlwdGlvbnM6IGxpc3RPZkZpZWxkRGVzY3JpcHRpb25zLFxuXHRcdFx0XHRsaXN0T2ZSb3dTZXROYW1lOiBsaXN0T2ZSb3dTZXROYW1lLFxuXHRcdFx0XHRsaXN0T2ZSb3dzOiBsaXN0T2ZSb3dzLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdGN1cnJlbnRUYWJJbmRleDogdGhpcy5jdHguY3VycmVudFRhYkluZGV4LFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdG1heENlbGxMZW5ndGg6IHRoaXMuY3R4Lm1heENlbGxMZW5ndGgsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0c2hvd1ByaW1hcnlGaWVsZDogdGhpcy5jdHguc2hvd1ByaW1hcnlGaWVsZCxcblx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRzaG93RGV0YWlsczogdGhpcy5jdHguc2hvd0RldGFpbHMsXG5cdFx0XHRcdHNob3dUb29sczogdGhpcy5jdHguc2hvd1Rvb2xzLFxuXHRcdFx0XHRjYW5FZGl0OiB0aGlzLmN0eC5jYW5FZGl0LFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNGRUY5RThEOF9ENEFCX0I1NDVfQjM5NF9DMTJERDU4MTdENjEnKSwgdGhpcy5mcmFnbWVudFRhYmxlLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IHBhcmVudCA9ICQodGhpcy5wYXRjaElkKCcjRkVGOUU4RDhfRDRBQl9CNTQ1X0IzOTRfQzEyREQ1ODE3RDYxJykpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQ09MVU1OIFRPT0xTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1vcmRlcndheT1cIkRFU0NcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jdHgub3JkZXJCeSA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG5cdFx0XHRcdFx0dGhpcy5jdHgub3JkZXJXYXkgPSAnREVTQyc7XG5cblx0XHRcdFx0XHR0aGlzLnJlZnJlc2goKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtb3JkZXJ3YXk9XCJBU0NcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jdHgub3JkZXJCeSA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG5cdFx0XHRcdFx0dGhpcy5jdHgub3JkZXJXYXkgPSAnQVNDJztcblxuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1hY3Rpb249XCJyZWZpbmVcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5zaG93UmVmaW5lTW9kYWwoXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGFsb2cnKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1lbnRpdHknKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtYWN0aW9uPVwic3RhdHNcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5zaG93U3RhdHNUYWIoXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGFsb2cnKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1lbnRpdHknKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtYWN0aW9uPVwiZ3JvdXBcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5zaG93R3JvdXBUYWIoXG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNhdGFsb2cnKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1lbnRpdHknKVxuXHRcdFx0XHRcdFx0LFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBST1dTRVRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnW2RhdGEtdGFiLWluZGV4XScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXggPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYi1pbmRleCcpKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBERVRBSUxTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnW2RhdGEtY3RybF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsodGhpcy5nZXRQYXJlbnQoKSwgZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmN0eCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogRklMVEVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ2FbZGF0YS1hY3Rpb249XCJmaWx0ZXJcIl0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0Y29uc3QgZGVzY3IgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbHRlci1kZWYnKS5zcGxpdCgnOjonKTtcblxuXHRcdFx0XHRcdGlmKGRlc2NyLmxlbmd0aCA9PT0gMikgdGhpcy5nZXRPd25lcigpLnJlZmluZVJlc3VsdCgnMicsIGRlc2NyWzBdLCBkZXNjclsxXSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogU0VUVVAgRklFTEQgJiBVTklUIEVESVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5maWVsZEVkaXRvci5zZXR1cCh0aGlzLnBhdGNoSWQoJyNGRUY5RThEOF9ENEFCX0I1NDVfQjM5NF9DMTJERDU4MTdENjEnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5jdHgpO1xuXHRcdFx0XHR0aGlzLnVuaXRFZGl0b3Iuc2V0dXAodGhpcy5wYXRjaElkKCcjRkVGOUU4RDhfRDRBQl9CNTQ1X0IzOTRfQzEyREQ1ODE3RDYxJykpO1xuXG5cdFx0XHRcdHRoaXMuc2V0TW9kZSgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVVBEQVRFIEpBVkFTQ1JJUFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5jdHguanMgPSBhbWlXZWJBcHAuZm9ybWF0VFdJRyh0aGlzLmZyYWdtZW50SlMsIHRoaXMuY3R4KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEZJTEwgTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG51bWJlcnMgPSBbXTtcblxuXHRcdFx0XHRpZighTnVtYmVyLmlzTmFOKHRoaXMuY3R4Lm51bWJlck9mUm93cykpIHtcblx0XHRcdFx0XHRudW1iZXJzLnB1c2goJ3Nob3duOiAnICsgdGhpcy5jdHgubnVtYmVyT2ZSb3dzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKCFOdW1iZXIuaXNOYU4odGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MpKSB7XG5cdFx0XHRcdFx0bnVtYmVycy5wdXNoKCd0b3RhbDogJyArIHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBzcGFuID0gJCh0aGlzLnBhdGNoSWQoJyNDNTdDODI0Ql8xNjZDXzRDMjNfRjM0OV84QjBDOEU5NDExNEEnKSk7XG5cblx0XHRcdFx0aWYoIU51bWJlci5pc05hTih0aGlzLmN0eC5tYXhOdW1iZXJPZlJvd3MpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgdG9vbHRpcCA9ICdtYXhpbXVtIG51bWJlciBvZiBzaG93YWJsZSByb3dzOiAnICsgdGhpcy5jdHgubWF4TnVtYmVyT2ZSb3dzO1xuXG5cdFx0XHRcdFx0c3Bhbi5hdHRyKCdkYXRhLXRvZ2dsZScsICd0b29sdGlwJylcblx0XHRcdFx0XHQgICAgLmF0dHIoJ2RhdGEtdGl0bGUnLCB0b29sdGlwKVxuXHRcdFx0XHRcdCAgICAudG9vbHRpcCgnZGlzcG9zZScpXG5cdFx0XHRcdFx0ICAgIC50b29sdGlwKClcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzcGFuLnRleHQobnVtYmVycy5qb2luKCcsICcpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbbGlzdE9mRmllbGREZXNjcmlwdGlvbnMsIGxpc3RPZlJvd3MsIHRoaXMuY3R4LnNxbCwgdGhpcy5jdHgubXFsLCB0aGlzLmN0eC5hc3QsIHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzXSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXhwb3J0UmVzdWx0OiBmdW5jdGlvbihjb252ZXJ0ZXIpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKHRoaXMuY3R4LmNvbW1hbmQsIHtjb252ZXJ0ZXI6IGNvbnZlcnRlcn0pLmRvbmUoZnVuY3Rpb24oZGF0YSwgbWVzc2FnZSkge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHZhciBmaWxlTWltZTtcblx0XHRcdHZhciBmaWxlTmFtZTtcblxuXHRcdFx0LyoqLyBpZihjb252ZXJ0ZXIgPT09ICdBTUlYbWxUb1htbC54c2wnKVxuXHRcdFx0e1xuXHRcdFx0XHRmaWxlTWltZSA9ICdhcHBsaWNhdGlvbi94bWwnO1xuXHRcdFx0XHRmaWxlTmFtZSA9ICdyZXN1bHQueG1sJztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoY29udmVydGVyID09PSAnQU1JWG1sVG9Kc29uLnhzbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGZpbGVNaW1lID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuXHRcdFx0XHRmaWxlTmFtZSA9ICdyZXN1bHQuanNvbic7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKGNvbnZlcnRlciA9PT0gJ0FNSVhtbFRvQ3N2LnhzbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGZpbGVNaW1lID0gJ3RleHQvY3N2Jztcblx0XHRcdFx0ZmlsZU5hbWUgPSAncmVzdWx0LmNzdic7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGZpbGVNaW1lID0gJ3RleHQvcGxhaW4nO1xuXHRcdFx0XHRmaWxlTmFtZSA9ICdyZXN1bHQudHh0Jztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c2F2ZUFzKG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6IGZpbGVNaW1lfSksIGZpbGVOYW1lKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGlzSW5FZGl0TW9kZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmllbGRFZGl0b3IuaXNJbkVkaXRNb2RlKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldE1vZGU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHRhZ3MxID0gJCh0aGlzLnBhdGNoSWQoJyNGRUY5RThEOF9ENEFCX0I1NDVfQjM5NF9DMTJERDU4MTdENjEnKSk7XG5cdFx0Y29uc3QgdGFnczIgPSAkKHRoaXMucGF0Y2hJZCgnI0NERTVBRDE0XzEyNjhfOEZBN19GNUQ4XzBENjkwRjNGQjg1MCcpKTtcblxuXHRcdGNvbnN0IHRhZ3MzID0gdGFnczEuZmluZCgnLmVkaXQtbW9kZScpO1xuXHRcdGNvbnN0IHRhZ3M0ID0gdGFnczEuZmluZCgnLnZpZXctbW9yZScpO1xuXHRcdGNvbnN0IHRhZ3M1ID0gdGFnczEuZmluZCgnLnZpZXctbWVkaWEnKTtcblxuXHRcdGlmKCQodGhpcy5wYXRjaElkKCcjRERDMzIyMzhfREQyNV84MzU0X0FDNkNfRjZFMjdDQTZFMThEJykpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHR0YWdzMi5zaG93KCk7XG5cdFx0XHR0YWdzMy5zaG93KCk7XG5cdFx0XHR0YWdzNC5oaWRlKCk7XG5cdFx0XHR0YWdzNS5oaWRlKCk7XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0SW5FZGl0TW9kZSh0cnVlKTtcblx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXRJbkVkaXRNb2RlKHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGFnczIuaGlkZSgpO1xuXHRcdFx0dGFnczMuaGlkZSgpO1xuXHRcdFx0dGFnczQuc2hvdygpO1xuXHRcdFx0dGFnczUuc2hvdygpO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdFx0dGhpcy51bml0RWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvd1Jvd01vZGFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLmZpZWxkRWRpdG9yLnNob3dSb3dNb2RhbCh0aGlzLmN0eC5jYXRhbG9nLCB0aGlzLmN0eC5lbnRpdHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2J1aWxkQ29sdW1uTmFtZTogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYoY2F0YWxvZyAmJiBjYXRhbG9nICE9PSAnTi9BJykge1xuXHRcdFx0cmVzdWx0LnB1c2goJ2AnICsgY2F0YWxvZyArICdgJyk7XG5cdFx0fVxuXG5cdFx0aWYoZW50aXR5ICYmIGVudGl0eSAhPT0gJ04vQScpIHtcblx0XHRcdHJlc3VsdC5wdXNoKCdgJyArIGVudGl0eSArICdgJyk7XG5cdFx0fVxuXG5cdFx0aWYoZmllbGQgJiYgZmllbGQgIT09ICdOL0EnKSB7XG5cdFx0XHRyZXN1bHQucHVzaCgnYCcgKyBmaWVsZCArICdgJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcuJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dSZWZpbmVNb2RhbDogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaXNNUUwgPSB0aGlzLmN0eC5tcWwgJiYgdGhpcy5jdHgubXFsICE9PSAnTi9BJztcblxuXHRcdGNvbnN0IHJlZ2lvbnMgPSB4cWxHZXRSZWdpb25zKGlzTVFMID8gdGhpcy5jdHgubXFsIDogdGhpcy5jdHguc3FsLCB0aGlzLmN0eC5saXN0T2ZGaWVsZERlc2NyaXB0aW9uc1t0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXhdLCBpc01RTCk7XG5cblx0XHRjb25zdCBjb2x1bW4gPSB0aGlzLl9idWlsZENvbHVtbk5hbWUocmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5jYXRhbG9nLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLnRhYmxlQWxpYXMsIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uZmllbGQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBlbDEgPSAkKCcjQzQ4NTY0RUFfQTY0RF85OEJBXzYyMzJfRDAzRDUyNENBRDA4Jyk7XG5cdFx0Y29uc3QgZWwyID0gJCgnI0YxMTRFNTQ3XzVFNzhfNzJEOV9CQjdGXzM1NUNEQkIzRDAzQScpO1xuXG5cdFx0ZWwxLmZpbmQoJyNFNzAxNEI1N19CMTZBXzc1OTNfRkExQl8wREQxNUMxNUFDM0UnKS50ZXh0KGNvbHVtbik7XG5cdFx0ZWwxLmZpbmQoJyNGM0EwNDBFMV80MEVFXzk3QjNfNDVENl9FN0JGQjYxREJGNDQnKS52YWwoY29sdW1uKTtcblxuXHRcdGVsMS5maW5kKCcjQ0FGOEI1RUJfMTc5Nl8zODM3XzU3MjJfM0I1QjJBN0M3MjlCJykuaGlkZSgpO1xuXHRcdGVsMS5maW5kKCcjQTI0NDI3RERfMERDQl8zQUM4XzRBM0VfQTc1RDc5RkFBOEY3JykuaGlkZSgpO1xuXG5cdFx0ZWwxLmZpbmQoJ2Zvcm0nKVswXS5yZXNldCgpO1xuXG5cdFx0ZWwyLm9mZigpLnN1Ym1pdCgoZSkgPT4ge1xuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHRoaXMucmVmaW5lUmVzdWx0KCk7XG5cdFx0fSk7XG5cblx0XHRlbDEubW9kYWwoJ3Nob3cnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZWZpbmVSZXN1bHQ6IGZ1bmN0aW9uKF9maWx0ZXIsIF94LCBfeSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZWwxID0gJCgnI0M0ODU2NEVBX0E2NERfOThCQV82MjMyX0QwM0Q1MjRDQUQwOCcpO1xuXHRcdGNvbnN0IGVsMiA9ICQoJyNGMTE0RTU0N181RTc4XzcyRDlfQkI3Rl8zNTVDREJCM0QwM0EnKTtcblxuXHRcdGNvbnN0IGZpbHRlciA9IF9maWx0ZXIgfHwgZWwyLmZpbmQoJ3NlbGVjdFtuYW1lPVwiZmlsdGVyXCJdJykudmFsKCk7XG5cblx0XHRsZXQgeCA9IF94IHx8IGVsMi5maW5kKCdpbnB1dFtuYW1lPVwieFwiXScpLnZhbCgpO1xuXHRcdGxldCB5ID0gX3kgfHwgZWwyLmZpbmQoJ2lucHV0W25hbWU9XCJ5XCJdJykudmFsKCk7XG5cblx0XHRsZXQgeTEgPSBlbDIuZmluZCgnaW5wdXRbbmFtZT1cInkxXCJdJykudmFsKCk7XG5cdFx0bGV0IHkyID0gZWwyLmZpbmQoJ2lucHV0W25hbWU9XCJ5MlwiXScpLnZhbCgpO1xuXG5cdFx0eSA9IHkucmVwbGFjZSgvJy9nLCAnXFwnXFwnJyk7XG5cdFx0eTEgPSB5MS5yZXBsYWNlKC8nL2csICdcXCdcXCcnKTtcblx0XHR5MiA9IHkyLnJlcGxhY2UoLycvZywgJ1xcJ1xcJycpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgY29uZDtcblxuXHRcdHN3aXRjaChmaWx0ZXIpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnMCc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBJUyBOVUxMJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzEnOlxuXHRcdFx0XHRjb25kID0geCArICcgSVMgTk9UIE5VTEwnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMic6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyA9IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICczJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnICE9IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc0Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIExJS0UgXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzUnOlxuXHRcdFx0XHRjb25kID0geCArICcgTk9UIExJS0UgXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzYnOlxuXHRcdFx0XHRjb25kID0geCArICcgPCBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnNyc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyA8PSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnOCc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyA+IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc5Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnID49IFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICcxMCc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBCRVRXRUVOIFxcJycgKyB5MSArICdcXCcgQU5EIFxcJycgKyB5MiArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMTEnOlxuXHRcdFx0XHRjb25kID0geCArICcgTk9UIEJFVFdFRU4gXFwnJyArIHkxICsgJ1xcJyBBTkQgXFwnJyArIHkyICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbDEubW9kYWwoJ2hpZGUnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaXNNUUwgPSB0aGlzLmN0eC5tcWwgJiYgdGhpcy5jdHgubXFsICE9PSAnTi9BJztcblxuXHRcdGNvbnN0IHJlZ2lvbnMgPSB4cWxHZXRSZWdpb25zKGlzTVFMID8gdGhpcy5jdHgubXFsIDogdGhpcy5jdHguc3FsLCB0aGlzLmN0eC5saXN0T2ZGaWVsZERlc2NyaXB0aW9uc1t0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXhdLCBpc01RTCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHJlZ2lvbnNbJ1dIRVJFJ10pXG5cdFx0e1xuXHRcdFx0cmVnaW9uc1snV0hFUkUnXSArPSAnIEFORCAnICsgY29uZDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJlZ2lvbnNbJ1dIRVJFJ10gPSBjb25kO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgeHFsID0gW107XG5cblx0XHRpZihyZWdpb25zWydTRUxFQ1QnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1NFTEVDVCAnICsgcmVnaW9uc1snU0VMRUNUJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ0ZST00nXSkge1xuXHRcdFx0eHFsLnB1c2goJ0ZST00gJyArIHJlZ2lvbnNbJ0ZST00nXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snV0hFUkUnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1dIRVJFICcgKyByZWdpb25zWydXSEVSRSddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGNvbW1hbmQgPSAnQnJvd3NlUXVlcnkgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5jYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguZW50aXR5KSArICdcIiAtJyArIChpc01RTCA/ICdtcWwnIDogJ3NxbCcpICsgJz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHhxbC5qb2luKCcgJykpICsgJ1wiJztcblxuXHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ3RhYmxlJywgW2NvbW1hbmRdLCB7fSwgdGhpcy5jdHgsICd0YWJsZScsIHRoaXMuY3R4LmVudGl0eSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvd1N0YXRzVGFiOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBpc01RTCA9IHRoaXMuY3R4Lm1xbCAmJiB0aGlzLmN0eC5tcWwgIT09ICdOL0EnO1xuXG5cdFx0Y29uc3QgcmVnaW9ucyA9IHhxbEdldFJlZ2lvbnMoaXNNUUwgPyB0aGlzLmN0eC5tcWwgOiB0aGlzLmN0eC5zcWwsIHRoaXMuY3R4Lmxpc3RPZkZpZWxkRGVzY3JpcHRpb25zW3RoaXMuY3R4LmN1cnJlbnRUYWJJbmRleF0sIGlzTVFMKTtcblxuXHRcdGNvbnN0IGNvbHVtbk5hbWUgPSB0aGlzLl9idWlsZENvbHVtbk5hbWUocmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5jYXRhbG9nLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLnRhYmxlQWxpYXMsIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uZmllbGQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZWdpb25zWydTRUxFQ1QnXSA9ICdcXCcnICsgY29sdW1uTmFtZS5yZXBsYWNlKC8nL2csICdcXCdcXCcnKSArICdcXCcgQVMgYGZpZWxkYCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnTUlOKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYG1pbmAnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ01BWCgnICsgY29sdW1uTmFtZSArICcpIEFTIGBtYXhgJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdTVU0oJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgc3VtYCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnQVZHKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYGF2Z2AnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ1NURERFVignICsgY29sdW1uTmFtZSArICcpIEFTIGBzdGRkZXZgJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdDT1VOVCgnICsgY29sdW1uTmFtZSArICcpIEFTIGBjb3VudGAnXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCB4cWwgPSBbXTtcblxuXHRcdGlmKHJlZ2lvbnNbJ1NFTEVDVCddKSB7XG5cdFx0XHR4cWwucHVzaCgnU0VMRUNUICcgKyByZWdpb25zWydTRUxFQ1QnXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snRlJPTSddKSB7XG5cdFx0XHR4cWwucHVzaCgnRlJPTSAnICsgcmVnaW9uc1snRlJPTSddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydXSEVSRSddKSB7XG5cdFx0XHR4cWwucHVzaCgnV0hFUkUgJyArIHJlZ2lvbnNbJ1dIRVJFJ10pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgY29tbWFuZCA9ICdCcm93c2VRdWVyeSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5lbnRpdHkpICsgJ1wiIC0nICsgKGlzTVFMID8gJ21xbCcgOiAnc3FsJykgKyAnPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoeHFsLmpvaW4oJyAnKSkgKyAnXCInO1xuXG5cdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcih0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGFibGUnLCBbY29tbWFuZF0sIHtvcmRlckJ5OiAnJywgb3JkZXJXYXk6ICcnLCBzaG93RGV0YWlsczogZmFsc2V9LCB0aGlzLmN0eCwgJ2Jhci1jaGFydCcsIHRoaXMuY3R4LmVudGl0eSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvd0dyb3VwVGFiOiBmdW5jdGlvbihjYXRhbG9nLCBlbnRpdHksIGZpZWxkKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBpc01RTCA9IHRoaXMuY3R4Lm1xbCAmJiB0aGlzLmN0eC5tcWwgIT09ICdOL0EnO1xuXG5cdFx0Y29uc3QgcmVnaW9ucyA9IHhxbEdldFJlZ2lvbnMoaXNNUUwgPyB0aGlzLmN0eC5tcWwgOiB0aGlzLmN0eC5zcWwsIHRoaXMuY3R4Lmxpc3RPZkZpZWxkRGVzY3JpcHRpb25zW3RoaXMuY3R4LmN1cnJlbnRUYWJJbmRleF0sIGlzTVFMKTtcblxuXHRcdGNvbnN0IGNvbHVtbk5hbWUgPSB0aGlzLl9idWlsZENvbHVtbk5hbWUocmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS5jYXRhbG9nLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLnRhYmxlQWxpYXMsIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uZmllbGQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZWdpb25zWydTRUxFQ1QnXSA9IGNvbHVtbk5hbWVcblx0XHRcdFx0KyAnLCBjb3VudCgqKSBBUyBgdG90YWxgLCBDT05DQVQoXFwnQE9XTkVSOjonICsgY29sdW1uTmFtZSArICc6OlxcJywgJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgZ29gJztcblx0XHRyZWdpb25zWydHUk9VUCddID0gY29sdW1uTmFtZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgeHFsID0gW107XG5cblx0XHRpZihyZWdpb25zWydTRUxFQ1QnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1NFTEVDVCAnICsgcmVnaW9uc1snU0VMRUNUJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ0ZST00nXSkge1xuXHRcdFx0eHFsLnB1c2goJ0ZST00gJyArIHJlZ2lvbnNbJ0ZST00nXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snV0hFUkUnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1dIRVJFICcgKyByZWdpb25zWydXSEVSRSddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydHUk9VUCddKSB7XG5cdFx0XHR4cWwucHVzaCgnR1JPVVAgQlkgJyArIHJlZ2lvbnNbJ0dST1VQJ10ucmVwbGFjZShlbnRpdHksIHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0udGFibGVBbGlhcykpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgY29tbWFuZCA9ICdCcm93c2VRdWVyeSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmNhdGFsb2cpICsgJ1wiIC1lbnRpdHk9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5lbnRpdHkpICsgJ1wiIC0nICsgKGlzTVFMID8gJ21xbCcgOiAnc3FsJykgKyAnPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoeHFsLmpvaW4oJyAnKSkgKyAnXCInO1xuXG5cdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2xJbkNvbnRhaW5lcih0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGFibGUnLCBbY29tbWFuZF0sIHtvcmRlckJ5OiBjb2x1bW5OYW1lLCBvcmRlcldheTogJ0FTQycsIHNob3dEZXRhaWxzOiBmYWxzZX0sIHRoaXMuY3R4LCAnc2xhY2snLCB0aGlzLmN0eC5lbnRpdHkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
