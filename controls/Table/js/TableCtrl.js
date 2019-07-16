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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJhcHBlbmRIVE1MIiwiZnJhZ21lbnRUYWJsZUN0cmwiLCJmcmFnbWVudFRhYmxlIiwiZnJhZ21lbnRKUyIsImZpZWxkRWRpdG9yQ3RvciIsImZpZWxkVW5pdEN0b3IiLCJ0YWJDdG9yIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJsb2NrIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiY3R4IiwiaXNFbWJlZGRlZCIsImVuZHBvaW50IiwiYW1pQ29tbWFuZCIsInRyaW0iLCJzcWwiLCJtcWwiLCJhc3QiLCJjdXJyZW50VGFiSW5kZXgiLCJzZXR1cCIsImNvbnRleHQiLCJlbmFibGVDYWNoZSIsImVuYWJsZUNvdW50Iiwic2hvd1ByaW1hcnlGaWVsZCIsInNob3dUb29sQmFyIiwic2hvd0RldGFpbHMiLCJzaG93VG9vbHMiLCJjYW5FZGl0IiwiY2F0YWxvZyIsImVudGl0eSIsInByaW1hcnlGaWVsZCIsInJvd3NldCIsInN0YXJ0Iiwic3RvcCIsIm9yZGVyQnkiLCJvcmRlcldheSIsIm1heENlbGxMZW5ndGgiLCJjYXJkIiwiaWdub3JlZEZpZWxkcyIsImZpZWxkRWRpdG9yIiwidW5pdEVkaXRvciIsImdldEluZm8iLCJfcmVuZGVyIiwiZmFpbCIsImFsd2F5cyIsInVubG9jayIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsImRpY3QiLCJwYXRjaElkIiwiY2xpY2siLCJmaXJzdFBhZ2UiLCJtZXNzYWdlIiwiZXJyb3IiLCJwcmV2UGFnZSIsIm5leHRQYWdlIiwibGFzdFBhZ2UiLCJrZXlwcmVzcyIsImUiLCJrZXlDb2RlIiwicmVmcmVzaCIsImNoYW5nZSIsInNldE1vZGUiLCJzaG93Um93TW9kYWwiLCJleHBvcnRSZXN1bHQiLCJjdXJyZW50VGFyZ2V0IiwidG9vbHRpcCIsImNyZWF0ZUNvbnRyb2wiLCJpbnN0YW5jZSIsImNvbW1hbmQyIiwic3RhcnRzV2l0aCIsInN1YnN0cmluZyIsImpzIiwiZmllbGREZXNjcmlwdGlvbnMiLCJyb3dzIiwidG90YWxOdW1iZXJPZlJvd3MiLCJyZXNvbHZlV2l0aCIsInJlamVjdFdpdGgiLCJwYXJzZVBhZ2VOdW1iZXIiLCJzIiwiZGVmYXVsdFBhZ2VOdW1iZXIiLCJwYXJzZWRQYWdlTnVtYmVyIiwicGFyc2VJbnQiLCJOdW1iZXIiLCJpc05hTiIsImdldE9mZnNldE9mTGFzdFBhZ2UiLCJyYW5nZSIsIm1vZHVsbyIsIm9sZFN0YXJ0IiwidmFsIiwib2xkU3RvcCIsIm5ld1N0YXJ0IiwibmV3U3RvcCIsImV4ZWN1dGUiLCJmaWVsZERlc2NyaXB0aW9uU2V0IiwianNwYXRoIiwicm93U2V0IiwibGlzdE9mRmllbGREZXNjcmlwdGlvbnMiLCJtYXAiLCJ4IiwibGlzdE9mUm93U2V0TmFtZSIsImxpc3RPZlJvd3MiLCJudW1iZXJPZlJvd3MiLCJsZW5ndGgiLCJyZWR1Y2UiLCJ5IiwibWF4TnVtYmVyT2ZSb3dzIiwiaGlkZSIsInNob3ciLCJwcm9wIiwiZmluZCIsInByZXZlbnREZWZhdWx0IiwiZ2V0QXR0cmlidXRlIiwic2hvd1JlZmluZU1vZGFsIiwic2hvd1N0YXRzVGFiIiwic2hvd0dyb3VwVGFiIiwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rIiwiZGVzY3IiLCJzcGxpdCIsImdldE93bmVyIiwicmVmaW5lUmVzdWx0IiwiZm9ybWF0VFdJRyIsIm51bWJlcnMiLCJwdXNoIiwic3BhbiIsImF0dHIiLCJ0ZXh0Iiwiam9pbiIsImNvbnZlcnRlciIsImZpbGVNaW1lIiwiZmlsZU5hbWUiLCJzYXZlQXMiLCJCbG9iIiwidHlwZSIsImlzSW5FZGl0TW9kZSIsInRhZ3MxIiwidGFnczIiLCJ0YWdzMyIsInRhZ3M0IiwidGFnczUiLCJzZXRJbkVkaXRNb2RlIiwiX2J1aWxkQ29sdW1uTmFtZSIsImZpZWxkIiwiaXNNUUwiLCJyZWdpb25zIiwieHFsR2V0UmVnaW9ucyIsImNvbHVtbiIsInRhYmxlQWxpYXMiLCJlbDEiLCJlbDIiLCJyZXNldCIsIm9mZiIsInN1Ym1pdCIsIm1vZGFsIiwiX2ZpbHRlciIsIl94IiwiX3kiLCJmaWx0ZXIiLCJ5MSIsInkyIiwicmVwbGFjZSIsImNvbmQiLCJ4cWwiLCJ0ZXh0VG9TdHJpbmciLCJjcmVhdGVDb250cm9sSW5Db250YWluZXIiLCJjb2x1bW5OYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBRUFBLFNBQVMsQ0FBQyxXQUFELEVBQWM7QUFDdEI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSFE7O0FBS3RCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVZxQjs7QUFZdEI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0M7QUFFQSxXQUFPQyxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixxQ0FEUTtBQUU5QjtBQUNBRixJQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0IsdUNBSFE7QUFJOUI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLGlDQUxRLEVBTTlCRixTQUFTLENBQUNFLFNBQVYsR0FBc0IsOEJBTlE7QUFPOUI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLDhCQVJRO0FBUzlCO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ0Us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QUFELENBQTNCO0FBQ0E7O0FBRUQsUUFBR0EsT0FBTyxDQUFDLE9BQUQsQ0FBVixFQUFxQjtBQUNwQmtCLE1BQUFBLEdBQUcsQ0FBQ3ZDLElBQUosQ0FBUyxjQUFjcUIsT0FBTyxDQUFDLE9BQUQsQ0FBUCxDQUFpQmdCLE9BQWpCLENBQXlCMUksTUFBekIsRUFBaUMwSCxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CRixLQUFuQixFQUEwQkssVUFBM0QsQ0FBdkI7QUFDQTtBQUVEOzs7QUFFQSxRQUFNdEosT0FBTyxHQUFHLDJCQUEyQmQsU0FBUyxDQUFDb0wsWUFBVixDQUF1QixLQUFLaEssR0FBTCxDQUFTa0IsT0FBaEMsQ0FBM0IsR0FBc0UsYUFBdEUsR0FBc0Z0QyxTQUFTLENBQUNvTCxZQUFWLENBQXVCLEtBQUtoSyxHQUFMLENBQVNtQixNQUFoQyxDQUF0RixHQUFnSSxLQUFoSSxJQUF5SXlILEtBQUssR0FBRyxLQUFILEdBQVcsS0FBekosSUFBa0ssSUFBbEssR0FBeUtoSyxTQUFTLENBQUNvTCxZQUFWLENBQXVCRCxHQUFHLENBQUNuQyxJQUFKLENBQVMsR0FBVCxDQUF2QixDQUF6SyxHQUFpTixHQUFqTztBQUVBaEosSUFBQUEsU0FBUyxDQUFDcUwsd0JBQVYsQ0FBbUMsS0FBSzdILFNBQUwsRUFBbkMsRUFBcUQsSUFBckQsRUFBMkQsT0FBM0QsRUFBb0UsQ0FBQzFDLE9BQUQsQ0FBcEUsRUFBK0U7QUFBQzhCLE1BQUFBLE9BQU8sRUFBRTBJLFVBQVY7QUFBc0J6SSxNQUFBQSxRQUFRLEVBQUUsS0FBaEM7QUFBdUNWLE1BQUFBLFdBQVcsRUFBRTtBQUFwRCxLQUEvRSxFQUEySSxLQUFLZixHQUFoSixFQUFxSixPQUFySixFQUE4SixLQUFLQSxHQUFMLENBQVNtQixNQUF2SztBQUVBO0FBQ0E7QUFFRDs7QUFsc0NzQixDQUFkLENBQVQ7QUFxc0NBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgeHFsR2V0UmVnaW9uc1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1RhYmxlQ3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvVGFibGUvdHdpZy9UYWJsZUN0cmwudHdpZycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS90d2lnL3JlZmluZU1vZGFsLnR3aWcnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvVGFibGUvdHdpZy90YWJsZS50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL1RhYmxlL3R3aWcvanMudHdpZycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UYWJsZS9qcy9saWJ4cWwuanMnLFxuXHRcdFx0LyoqL1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2ZpbGVzYXZlci5taW4uanMnLFxuXHRcdFx0LyoqL1xuXHRcdFx0J2N0cmw6ZmllbGRFZGl0b3InLFxuXHRcdFx0J2N0cmw6dW5pdEVkaXRvcicsXG5cdFx0XHQnY3RybDp0YWInLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzFdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmZyYWdtZW50VGFibGVDdHJsID0gZGF0YVswXTtcblx0XHRcdFx0dGhpcy5mcmFnbWVudFRhYmxlID0gZGF0YVsyXTtcblx0XHRcdFx0dGhpcy5mcmFnbWVudEpTID0gZGF0YVszXTtcblxuXHRcdFx0XHR0aGlzLmZpZWxkRWRpdG9yQ3RvciA9IGRhdGFbNl07XG5cdFx0XHRcdHRoaXMuZmllbGRVbml0Q3RvciA9IGRhdGFbN107XG5cdFx0XHRcdHRoaXMudGFiQ3RvciA9IGRhdGFbOF07XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb21tYW5kLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHtcblx0XHRcdGlzRW1iZWRkZWQ6IGFtaVdlYkFwcC5pc0VtYmVkZGVkKCksXG5cblx0XHRcdGVuZHBvaW50OiBhbWlDb21tYW5kLmVuZHBvaW50LFxuXG5cdFx0XHRjb21tYW5kOiBjb21tYW5kLnRyaW0oKSxcblxuXHRcdFx0LyoqL1xuXG5cdFx0XHRzcWw6ICdOL0EnLFxuXHRcdFx0bXFsOiAnTi9BJyxcblx0XHRcdGFzdDogJ04vQScsXG5cblx0XHRcdGN1cnJlbnRUYWJJbmRleDogMCxcblx0XHR9O1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCxcblx0XHRcdGVuYWJsZUNhY2hlLCBlbmFibGVDb3VudCwgc2hvd1ByaW1hcnlGaWVsZCwgc2hvd1Rvb2xCYXIsIHNob3dEZXRhaWxzLCBzaG93VG9vbHMsIGNhbkVkaXQsXG5cdFx0XHRjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZCwgcm93c2V0LFxuXHRcdFx0c3RhcnQsIHN0b3AsIG9yZGVyQnksIG9yZGVyV2F5LFxuXHRcdFx0bWF4Q2VsbExlbmd0aCxcblx0XHRcdGNhcmRcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0W1xuXHRcdFx0XHQnY29udGV4dCcsXG5cdFx0XHRcdCdlbmFibGVDYWNoZScsICdlbmFibGVDb3VudCcsICdzaG93UHJpbWFyeUZpZWxkJywgJ3Nob3dUb29sQmFyJywgJ3Nob3dEZXRhaWxzJywgJ3Nob3dUb29scycsICdjYW5FZGl0Jyxcblx0XHRcdFx0J2NhdGFsb2cnLCAnZW50aXR5JywgJ3ByaW1hcnlGaWVsZCcsICdyb3dzZXQnLFxuXHRcdFx0XHQnc3RhcnQnLCAnc3RvcCcsICdvcmRlckJ5JywgJ29yZGVyV2F5Jyxcblx0XHRcdFx0J21heENlbGxMZW5ndGgnLFxuXHRcdFx0XHQnY2FyZCcsXG5cdFx0XHRdLFxuXHRcdFx0W1xuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdGZhbHNlLCB0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsXG5cdFx0XHRcdCcnLCAnJywgJycsICcnLFxuXHRcdFx0XHQxLCAxMCwgJycsICcnLFxuXHRcdFx0XHQ2NCxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5jdHguZW5hYmxlQ2FjaGUgPSBlbmFibGVDYWNoZTtcblx0XHR0aGlzLmN0eC5lbmFibGVDb3VudCA9IGVuYWJsZUNvdW50O1xuXG5cdFx0dGhpcy5jdHguc2hvd1ByaW1hcnlGaWVsZCA9IHNob3dQcmltYXJ5RmllbGQ7XG5cdFx0dGhpcy5jdHguc2hvd1Rvb2xCYXIgPSBzaG93VG9vbEJhcjtcblx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHNob3dEZXRhaWxzO1xuXHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHNob3dUb29scztcblx0XHR0aGlzLmN0eC5jYW5FZGl0ID0gY2FuRWRpdDtcblxuXHRcdHRoaXMuY3R4LmNhdGFsb2cgPSBjYXRhbG9nO1xuXHRcdHRoaXMuY3R4LmVudGl0eSA9IGVudGl0eTtcblx0XHR0aGlzLmN0eC5yb3dzZXQgPSByb3dzZXQ7XG5cblx0XHR0aGlzLmN0eC5zdGFydCA9IHN0YXJ0O1xuXHRcdHRoaXMuY3R4LnN0b3AgPSBzdG9wO1xuXHRcdHRoaXMuY3R4Lm9yZGVyQnkgPSBvcmRlckJ5O1xuXHRcdHRoaXMuY3R4Lm9yZGVyV2F5ID0gb3JkZXJXYXk7XG5cblx0XHR0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoID0gbWF4Q2VsbExlbmd0aDtcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pZ25vcmVkRmllbGRzID0ge1xuXHRcdFx0J09SQUNMRV9ST1dOVU0nOiAnJyxcblx0XHRcdCdQUk9KRUNUJzogJycsXG5cdFx0XHQnUFJPQ0VTUyc6ICcnLFxuXHRcdFx0J0FNSUVOVElUWU5BTUUnOiAnJyxcblx0XHRcdCdBTUlFTEVNRU5USUQnOiAnJyxcblx0XHRcdCdBTUlDUkVBVEVEJzogJycsXG5cdFx0XHQnQU1JTEFTVE1PRElGSUVEJzogJycsXG5cdFx0XHQnQU1JU1lTREFURSc6ICcnXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5maWVsZEVkaXRvciA9IG5ldyB0aGlzLmZpZWxkRWRpdG9yQ3Rvcih0aGlzLCB0aGlzKTtcblx0XHR0aGlzLnVuaXRFZGl0b3IgPSBuZXcgdGhpcy5maWVsZFVuaXRDdG9yKHRoaXMsIHRoaXMpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLmN0eC5jYW5FZGl0IHx8ICgodGhpcy5jdHguc2hvd0RldGFpbHMgfHwgdGhpcy5jdHguc2hvd1Rvb2xzKSAmJiAhdGhpcy5jdHgucHJpbWFyeUZpZWxkKSlcblx0XHR7XG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLmdldEluZm8oY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGQpLmRvbmUoKHByaW1hcnlGaWVsZCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuY3R4LnByaW1hcnlGaWVsZCA9IHByaW1hcnlGaWVsZDtcblxuXHRcdFx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHRoaXMuY3R4LnNob3dEZXRhaWxzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0XHR0aGlzLmN0eC5zaG93VG9vbHMgPSB0aGlzLmN0eC5zaG93VG9vbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHRcdHRoaXMuY3R4LmNhbkVkaXQgPSB0aGlzLmN0eC5jYW5FZGl0ICYmICEhcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblxuXHRcdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkID0gcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHRcdHRoaXMuY3R4LnNob3dEZXRhaWxzID0gdGhpcy5jdHguc2hvd0RldGFpbHMgJiYgISFwcmltYXJ5RmllbGQ7XG5cdFx0XHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHRoaXMuY3R4LnNob3dUb29scyAmJiAhIXByaW1hcnlGaWVsZDtcblx0XHRcdFx0dGhpcy5jdHguY2FuRWRpdCA9IC8qLS0tLS0tLS0tLSovIGZhbHNlIC8qLS0tLS0tLS0tLSovO1xuXG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkID0gcHJpbWFyeUZpZWxkO1xuXG5cdFx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHRoaXMuY3R4LnNob3dEZXRhaWxzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0dGhpcy5jdHguc2hvd1Rvb2xzID0gdGhpcy5jdHguc2hvd1Rvb2xzICYmICEhcHJpbWFyeUZpZWxkO1xuXHRcdFx0dGhpcy5jdHguY2FuRWRpdCA9IC8qLS0tLS0tLS0tLSovIGZhbHNlIC8qLS0tLS0tLS0tLSovO1xuXG5cdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LmFsd2F5cygoKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0aWYodGhpcy5nZXRQYXJlbnQoKS4kbmFtZSAhPT0gJ1RhYkN0cmwnKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRhYiA9IG5ldyB0aGlzLnRhYkN0b3IobnVsbCwgdGhpcyk7XG5cblx0XHRcdHRhYi5yZW5kZXIoc2VsZWN0b3IsIHRoaXMuY3R4KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0YWIuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS10YWJsZVwiPjwvaT4gJyArIHRoaXMuY3R4LmVudGl0eSwge2Nsb3NhYmxlOiBmYWxzZSwgZmlyc3RWaXNpYmxlOiBmYWxzZX0pLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFBhcmVudCh0YWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRUYWJsZUN0cmwsIHtkaWN0OiB0aGlzLmN0eH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JBMUE3RUVBXzJCQjVfNTJGMl81QkNGXzY0QjBDMzgxQjU3MCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5maXJzdFBhZ2UoKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkIxMjYyOTRfRkZDMl8yNEI4Xzg3NjVfQ0Y2NTNFQjk1MEY3JykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnByZXZQYWdlKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0U3RkRGNEM4X0VDRDJfM0ZFMF84Qzc1XzU0MUU1MTEyMzlDMicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5uZXh0UGFnZSgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCNzk3OTYxOV8xOTZGX0YzOURfQTg5M18xN0U1RURBQTg2MjgnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMubGFzdFBhZ2UoKS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLmtleXByZXNzKChlKSA9PiB7XG5cblx0XHRcdFx0aWYoZS5rZXlDb2RlID09IDEzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS5rZXlwcmVzcygoZSkgPT4ge1xuXG5cdFx0XHRcdGlmKGUua2V5Q29kZSA9PSAxMylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaCgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEODA5MTY2Rl9BNDBCXzIzNzZfQzhBNV85NzdBQTBDOEM0MDgnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEREMzMjIzOF9ERDI1XzgzNTRfQUM2Q19GNkUyN0NBNkUxOEQnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnNldE1vZGUoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NERTVBRDE0XzEyNjhfOEZBN19GNUQ4XzBENjkwRjNGQjg1MCcpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5zaG93Um93TW9kYWwoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0M5RjREQkU3X0VGNEZfMDlGMV9DMzFEXzk3NTgxOTc4QkQxMycpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5leHBvcnRSZXN1bHQoJ0FNSVhtbFRvWG1sLnhzbCcpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQTRCMDMyMzlfNTJGOV81RkJCXzA3OTlfQzkzMkI5RTk1RkNEJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmV4cG9ydFJlc3VsdCgnQU1JWG1sVG9Kc29uLnhzbCcpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQzYxODIxNjRfOTQzMl9GQTBDXzUyNzNfRUZGNTYzNzY2NjBFJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLmV4cG9ydFJlc3VsdCgnQU1JWG1sVG9Dc3YueHNsJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCOENDQ0NBMV85ODI5XzNFQTVfMjgwRV9FRDQ3RkNEMzNBREUnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuZXhwb3J0UmVzdWx0KCdBTUlYbWxUb1RleHQueHNsJyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNDOENCMzBEQ180MTRGXzc1NTlfQjYxOF80MkI3Q0MwNEY5OTMnKSkuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnRvb2x0aXAoJ2hpZGUnKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ2VkaXRCb3gnLCBbdGhpcy5jdHguY29tbWFuZF0sIHt9KS5kb25lKChpbnN0YW5jZSwgY29tbWFuZCkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLmN0eC5jb21tYW5kID0gY29tbWFuZDtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQ0Q0NThGRUNfOUFEOV8zMEU4XzE0MEZfMjYzRjExOTk2MUJFJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5zcWxdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGNEYwRUI2Q182NTM1Xzc3MTRfNTRGN180QkMyOEMyNTQ4NzInKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdtZXNzYWdlQm94JywgW3RoaXMuY3R4Lm1xbF0sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0VGNzM5RUUwX0RCNzlfMEE0RV85RkREXzdCQTNDMEY3NEY5MicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ21lc3NhZ2VCb3gnLCBbdGhpcy5jdHguY29tbWFuZDIuc3RhcnRzV2l0aCgnQnJvd3NlUXVlcnknKSA/ICdTZWFyY2hRdWVyeScgKyB0aGlzLmN0eC5jb21tYW5kMi5zdWJzdHJpbmcoMTEpIDogdGhpcy5jdHguY29tbWFuZDJdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNENDk4NTNFMl85MzE5XzUyQzNfNTI1M19BMjA4Rjk1MDA0MDgnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdtZXNzYWdlQm94JywgW3RoaXMuY3R4LmNvbW1hbmQuc3RhcnRzV2l0aCgnQnJvd3NlUXVlcnknKSA/ICdTZWFyY2hRdWVyeScgKyB0aGlzLmN0eC5jb21tYW5kLnN1YnN0cmluZygxMSkgOiB0aGlzLmN0eC5jb21tYW5kXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQzUwQzM0MjdfRkVFNV9GMTE1XzFGRUNfNkE2NjY4NzYzRUM0JykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGV4dEJveCcsIFt0aGlzLmN0eC5qc10sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLnJlZnJlc2goKS5kb25lKChmaWVsZERlc2NyaXB0aW9ucywgcm93cywgc3FsLCBtcWwsIGFzdCwgdG90YWxOdW1iZXJPZlJvd3MpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgodGhpcy5jdHguY29udGV4dCwgW2ZpZWxkRGVzY3JpcHRpb25zLCByb3dzLCBzcWwsIG1xbCwgYXN0LCB0b3RhbE51bWJlck9mUm93c10pO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdFdpdGgodGhpcy5jdHguY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBhZ2VOdW1iZXI6IGZ1bmN0aW9uKHMsIGRlZmF1bHRQYWdlTnVtYmVyKVxuXHR7XG5cdFx0Y29uc3QgcGFyc2VkUGFnZU51bWJlciA9IHBhcnNlSW50KHMpO1xuXG5cdFx0cmV0dXJuIE51bWJlci5pc05hTihwYXJzZWRQYWdlTnVtYmVyKSA9PT0gZmFsc2UgJiYgcGFyc2VkUGFnZU51bWJlciA+IDAgPyBwYXJzZWRQYWdlTnVtYmVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0UGFnZU51bWJlclxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0T2Zmc2V0T2ZMYXN0UGFnZTogZnVuY3Rpb24ocmFuZ2UpXG5cdHtcblx0XHRjb25zdCBtb2R1bG8gPSB0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cyAlIHJhbmdlO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzID4gbW9kdWxvID8gdGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MgLSBtb2R1bG8gKyAxXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmaXJzdFBhZ2U6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG9sZFN0YXJ0ID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoKSwgdGhpcy5jdHguc3RhcnRcblx0XHQpO1xuXG5cdFx0Y29uc3Qgb2xkU3RvcCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKCksIHRoaXMuY3R4LnN0b3Bcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmFuZ2UgPSBvbGRTdG9wIC0gb2xkU3RhcnQgKyAxO1xuXG5cdFx0Y29uc3QgbmV3U3RhcnQgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxO1xuXHRcdGNvbnN0IG5ld1N0b3AgPSBuZXdTdGFydCArIHJhbmdlIC0gMTtcblxuXHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbChuZXdTdGFydCk7XG5cdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKG5ld1N0b3ApO1xuXG5cdFx0cmV0dXJuIHRoaXMucmVmcmVzaCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRsYXN0UGFnZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgb2xkU3RhcnQgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgpLCB0aGlzLmN0eC5zdGFydFxuXHRcdCk7XG5cblx0XHRjb25zdCBvbGRTdG9wID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwoKSwgdGhpcy5jdHguc3RvcFxuXHRcdCk7XG5cblx0XHRjb25zdCByYW5nZSA9IG9sZFN0b3AgLSBvbGRTdGFydCArIDE7XG5cblx0XHRjb25zdCBuZXdTdGFydCA9IHRoaXMuZ2V0T2Zmc2V0T2ZMYXN0UGFnZShyYW5nZSk7XG5cdFx0Y29uc3QgbmV3U3RvcCA9IG5ld1N0YXJ0ICsgcmFuZ2UgLSAxO1xuXG5cdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKG5ld1N0YXJ0KTtcblx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGODVEQzBFX0MwN0VfREU1RV9BNjVCXzIzN0ZDQTNENDYxQycpKS52YWwobmV3U3RvcCk7XG5cblx0XHRyZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByZXZQYWdlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBvbGRTdGFydCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKCksIHRoaXMuY3R4LnN0YXJ0XG5cdFx0KTtcblxuXHRcdGNvbnN0IG9sZFN0b3AgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbCgpLCB0aGlzLmN0eC5zdG9wXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJhbmdlID0gb2xkU3RvcCAtIG9sZFN0YXJ0ICsgMTtcblxuXHRcdGNvbnN0IG5ld1N0YXJ0ID0gb2xkU3RhcnQgLSByYW5nZTtcblx0XHRjb25zdCBuZXdTdG9wID0gb2xkU3RvcCAtIHJhbmdlO1xuXG5cdFx0aWYobmV3U3RhcnQgPj0gMSAmJiBuZXdTdG9wID49IDEpXG5cdFx0e1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKG5ld1N0YXJ0KTtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChuZXdTdG9wKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgweDAwMDEpO1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKHJhbmdlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG5leHRQYWdlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBvbGRTdGFydCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKCksIHRoaXMuY3R4LnN0YXJ0XG5cdFx0KTtcblxuXHRcdGNvbnN0IG9sZFN0b3AgPSB0aGlzLnBhcnNlUGFnZU51bWJlcihcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbCgpLCB0aGlzLmN0eC5zdG9wXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJhbmdlID0gb2xkU3RvcCAtIG9sZFN0YXJ0ICsgMTtcblxuXHRcdGNvbnN0IG5ld1N0YXJ0ID0gb2xkU3RhcnQgKyByYW5nZTtcblx0XHRjb25zdCBuZXdTdG9wID0gb2xkU3RvcCArIHJhbmdlO1xuXG5cdFx0aWYobmV3U3RhcnQgPj0gMSAmJiBuZXdTdG9wID49IDEpXG5cdFx0e1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEQkU1QUVCMl9GRjNFX0Y3ODFfNERGOV8zMEQ5NzQ2MkQ5QkInKSkudmFsKG5ld1N0YXJ0KTtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY4NURDMEVfQzA3RV9ERTVFX0E2NUJfMjM3RkNBM0Q0NjFDJykpLnZhbChuZXdTdG9wKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdCQodGhpcy5wYXRjaElkKCcjREJFNUFFQjJfRkYzRV9GNzgxXzRERjlfMzBEOTc0NjJEOUJCJykpLnZhbCgweDAwMDEpO1xuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKHJhbmdlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZnJlc2g6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChbJ2NvbnRleHQnXSwgW3Jlc3VsdF0sIHNldHRpbmdzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHguY29tbWFuZDIgPSB0aGlzLmN0eC5jb21tYW5kO1xuXG5cdFx0LyoqL1xuXG5cdFx0aWYodGhpcy5jdHgub3JkZXJCeSlcblx0XHR7XG5cdFx0XHR0aGlzLmN0eC5jb21tYW5kMiArPSAnIC1vcmRlckJ5PVwiJyArIHRoaXMuY3R4Lm9yZGVyQnkgKyAnXCInO1xuXG5cdFx0XHRpZih0aGlzLmN0eC5vcmRlcldheSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5jdHguY29tbWFuZDIgKz0gJyAtb3JkZXJXYXk9XCInICsgdGhpcy5jdHgub3JkZXJXYXkgKyAnXCInO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKi9cblxuXHRcdGNvbnN0IHN0YXJ0ID0gdGhpcy5wYXJzZVBhZ2VOdW1iZXIoXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0RCRTVBRUIyX0ZGM0VfRjc4MV80REY5XzMwRDk3NDYyRDlCQicpKS52YWwoKSwgdGhpcy5jdHguc3RhcnRcblx0XHQpO1xuXG5cdFx0Y29uc3Qgc3RvcCA9IHRoaXMucGFyc2VQYWdlTnVtYmVyKFxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjg1REMwRV9DMDdFX0RFNUVfQTY1Ql8yMzdGQ0EzRDQ2MUMnKSkudmFsKCksIHRoaXMuY3R4LnN0b3Bcblx0XHQpO1xuXG5cdFx0dGhpcy5jdHguY29tbWFuZDIgKz0gJyAtbGltaXQ9XCInICsgKHN0b3AgLSBzdGFydCArIDEpICsgJ1wiJztcblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQyICs9ICcgLW9mZnNldD1cIicgKyAoMHgwMCArIHN0YXJ0IC0gMSkgKyAnXCInO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUodGhpcy5jdHguY29tbWFuZDIgKyAodGhpcy5jdHguZW5hYmxlQ2FjaGUgPyAnIC1jYWNoZWQnIDogJycpICsgKHRoaXMuY3R4LmVuYWJsZUNvdW50ID8gJyAtY291bnQnIDogJycpKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpZWxkRGVzY3JpcHRpb25TZXQgPSB0aGlzLmN0eC5yb3dzZXQgPyBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkRGVzY3JpcHRpb25zey5Acm93c2V0PT09XCInICsgdGhpcy5jdHgucm93c2V0ICsgJ1wifScsIGRhdGEpXG5cdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZERlc2NyaXB0aW9ucycgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGF0YSlcblx0XHRcdDtcblxuXHRcdFx0Y29uc3Qgcm93U2V0ID0gdGhpcy5jdHgucm93c2V0ID8gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCInICsgdGhpcy5jdHgucm93c2V0ICsgJ1wifVwiJywgZGF0YSlcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRhdGEpXG5cdFx0XHQ7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGxpc3RPZkZpZWxkRGVzY3JpcHRpb25zID0gZmllbGREZXNjcmlwdGlvblNldC5tYXAoeCA9PiB4WydmaWVsZERlc2NyaXB0aW9uJ10gfHwgW10pO1xuXG5cdFx0XHRjb25zdCBsaXN0T2ZSb3dTZXROYW1lID0gcm93U2V0Lm1hcCh4ID0+IHhbJ0B0eXBlJ10gfHwgJ3Jlc3VsdCcpO1xuXG5cdFx0XHRjb25zdCBsaXN0T2ZSb3dzID0gcm93U2V0Lm1hcCh4ID0+IHhbJ3JvdyddIHx8IFtdKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5jdHguc3FsID0gYW1pV2ViQXBwLmpzcGF0aCgnLkBzcWwnLCByb3dTZXQpWzBdIHx8ICdOL0EnO1xuXHRcdFx0dGhpcy5jdHgubXFsID0gYW1pV2ViQXBwLmpzcGF0aCgnLkBtcWwnLCByb3dTZXQpWzBdIHx8ICdOL0EnO1xuXHRcdFx0dGhpcy5jdHguYXN0ID0gYW1pV2ViQXBwLmpzcGF0aCgnLkBhc3QnLCByb3dTZXQpWzBdIHx8ICdOL0EnO1xuXG5cdFx0XHR0aGlzLmN0eC5udW1iZXJPZlJvd3MgPSBsaXN0T2ZSb3dzLm1hcCh4ID0+IHgubGVuZ3RoKS5yZWR1Y2UoKHgsIHkpID0+IHggKyB5LCAwKTtcblx0XHRcdHRoaXMuY3R4Lm1heE51bWJlck9mUm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uQG1heE51bWJlck9mUm93cycsIHJvd1NldCkubWFwKHggPT4gcGFyc2VJbnQoeCkpLnJlZHVjZSgoeCwgeSkgPT4geCArIHksIDApO1xuXHRcdFx0dGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MgPSBhbWlXZWJBcHAuanNwYXRoKCcuLkB0b3RhbE51bWJlck9mUm93cycsIHJvd1NldCkubWFwKHggPT4gcGFyc2VJbnQoeCkpLnJlZHVjZSgoeCwgeSkgPT4geCArIHksIDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmN0eC5saXN0T2ZGaWVsZERlc2NyaXB0aW9ucyA9IGxpc3RPZkZpZWxkRGVzY3JpcHRpb25zO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmN0eC5zcWwgPT09ICdOL0EnKSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQ0Q0NThGRUNfOUFEOV8zMEU4XzE0MEZfMjYzRjExOTk2MUJFJykpLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NENDU4RkVDXzlBRDlfMzBFOF8xNDBGXzI2M0YxMTk5NjFCRScpKS5zaG93KCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuY3R4Lm1xbCA9PT0gJ04vQScpIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGNEYwRUI2Q182NTM1Xzc3MTRfNTRGN180QkMyOEMyNTQ4NzInKSkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjRGMEVCNkNfNjUzNV83NzE0XzU0RjdfNEJDMjhDMjU0ODcyJykpLnNob3coKTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5jdHguYXN0ID09PSAnTi9BJykge1xuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0UyRUI2MTM2XzczNThfODc1QV8yODU3Xzg3NjZFOUIzMDM2RScpKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFMkVCNjEzNl83MzU4Xzg3NUFfMjg1N184NzY2RTlCMzAzNkUnKSkuc2hvdygpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihOdW1iZXIuaXNOYU4odGhpcy5jdHgudG90YWxOdW1iZXJPZlJvd3MpKSB7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQjc5Nzk2MTlfMTk2Rl9GMzlEX0E4OTNfMTdFNUVEQUE4NjI4JykpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCNzk3OTYxOV8xOTZGX0YzOURfQTg5M18xN0U1RURBQTg2MjgnKSkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdHByaW1hcnlGaWVsZDogdGhpcy5jdHgucHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRpZ25vcmVkRmllbGRzOiB0aGlzLmN0eC5pZ25vcmVkRmllbGRzLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdGxpc3RPZkZpZWxkRGVzY3JpcHRpb25zOiBsaXN0T2ZGaWVsZERlc2NyaXB0aW9ucyxcblx0XHRcdFx0bGlzdE9mUm93U2V0TmFtZTogbGlzdE9mUm93U2V0TmFtZSxcblx0XHRcdFx0bGlzdE9mUm93czogbGlzdE9mUm93cyxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRjdXJyZW50VGFiSW5kZXg6IHRoaXMuY3R4LmN1cnJlbnRUYWJJbmRleCxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRtYXhDZWxsTGVuZ3RoOiB0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdHNob3dQcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQsXG5cdFx0XHRcdHNob3dUb29sQmFyOiB0aGlzLmN0eC5zaG93VG9vbEJhcixcblx0XHRcdFx0c2hvd0RldGFpbHM6IHRoaXMuY3R4LnNob3dEZXRhaWxzLFxuXHRcdFx0XHRzaG93VG9vbHM6IHRoaXMuY3R4LnNob3dUb29scyxcblx0XHRcdFx0Y2FuRWRpdDogdGhpcy5jdHguY2FuRWRpdCxcblx0XHRcdH07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMucmVwbGFjZUhUTUwodGhpcy5wYXRjaElkKCcjRkVGOUU4RDhfRDRBQl9CNTQ1X0IzOTRfQzEyREQ1ODE3RDYxJyksIHRoaXMuZnJhZ21lbnRUYWJsZSwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBwYXJlbnQgPSAkKHRoaXMucGF0Y2hJZCgnI0ZFRjlFOEQ4X0Q0QUJfQjU0NV9CMzk0X0MxMkRENTgxN0Q2MScpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIENPTFVNTiBUT09MUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtb3JkZXJ3YXk9XCJERVNDXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3R4Lm9yZGVyQnkgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuXHRcdFx0XHRcdHRoaXMuY3R4Lm9yZGVyV2F5ID0gJ0RFU0MnO1xuXG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLW9yZGVyd2F5PVwiQVNDXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3R4Lm9yZGVyQnkgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuXHRcdFx0XHRcdHRoaXMuY3R4Lm9yZGVyV2F5ID0gJ0FTQyc7XG5cblx0XHRcdFx0XHR0aGlzLnJlZnJlc2goKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtYWN0aW9uPVwicmVmaW5lXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuc2hvd1JlZmluZU1vZGFsKFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jYXRhbG9nJylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLWFjdGlvbj1cInN0YXRzXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuc2hvd1N0YXRzVGFiKFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jYXRhbG9nJylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnQuZmluZCgnYVtkYXRhLWFjdGlvbj1cImdyb3VwXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuc2hvd0dyb3VwVGFiKFxuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jYXRhbG9nJylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZW50aXR5Jylcblx0XHRcdFx0XHRcdCxcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogUk9XU0VUUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ1tkYXRhLXRhYi1pbmRleF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5jdHguY3VycmVudFRhYkluZGV4ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWItaW5kZXgnKSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogREVUQUlMUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50LmZpbmQoJ1tkYXRhLWN0cmxdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHRoaXMuZ2V0UGFyZW50KCksIGUuY3VycmVudFRhcmdldCwgdGhpcy5jdHgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEZJTFRFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudC5maW5kKCdhW2RhdGEtYWN0aW9uPVwiZmlsdGVyXCJdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdGNvbnN0IGRlc2NyID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1maWx0ZXItZGVmJykuc3BsaXQoJzo6Jyk7XG5cblx0XHRcdFx0XHRpZihkZXNjci5sZW5ndGggPT09IDIpIHRoaXMuZ2V0T3duZXIoKS5yZWZpbmVSZXN1bHQoJzInLCBkZXNjclswXSwgZGVzY3JbMV0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFNFVFVQIEZJRUxEICYgVU5JVCBFRElUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0dXAodGhpcy5wYXRjaElkKCcjRkVGOUU4RDhfRDRBQl9CNTQ1X0IzOTRfQzEyREQ1ODE3RDYxJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY3R4KTtcblx0XHRcdFx0dGhpcy51bml0RWRpdG9yLnNldHVwKHRoaXMucGF0Y2hJZCgnI0ZFRjlFOEQ4X0Q0QUJfQjU0NV9CMzk0X0MxMkRENTgxN0Q2MScpKTtcblxuXHRcdFx0XHR0aGlzLnNldE1vZGUoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVQREFURSBKQVZBU0NSSVBUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuY3R4LmpzID0gYW1pV2ViQXBwLmZvcm1hdFRXSUcodGhpcy5mcmFnbWVudEpTLCB0aGlzLmN0eCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBGSUxMIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBudW1iZXJzID0gW107XG5cblx0XHRcdFx0aWYoIU51bWJlci5pc05hTih0aGlzLmN0eC5udW1iZXJPZlJvd3MpKSB7XG5cdFx0XHRcdFx0bnVtYmVycy5wdXNoKCdzaG93bjogJyArIHRoaXMuY3R4Lm51bWJlck9mUm93cyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZighTnVtYmVyLmlzTmFOKHRoaXMuY3R4LnRvdGFsTnVtYmVyT2ZSb3dzKSkge1xuXHRcdFx0XHRcdG51bWJlcnMucHVzaCgndG90YWw6ICcgKyB0aGlzLmN0eC50b3RhbE51bWJlck9mUm93cyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc3BhbiA9ICQodGhpcy5wYXRjaElkKCcjQzU3QzgyNEJfMTY2Q180QzIzX0YzNDlfOEIwQzhFOTQxMTRBJykpO1xuXG5cdFx0XHRcdGlmKCFOdW1iZXIuaXNOYU4odGhpcy5jdHgubWF4TnVtYmVyT2ZSb3dzKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IHRvb2x0aXAgPSAnbWF4aW11bSBudW1iZXIgb2Ygc2hvd2FibGUgcm93czogJyArIHRoaXMuY3R4Lm1heE51bWJlck9mUm93cztcblxuXHRcdFx0XHRcdHNwYW4uYXR0cignZGF0YS10b2dnbGUnLCAndG9vbHRpcCcpXG5cdFx0XHRcdFx0ICAgIC5hdHRyKCdkYXRhLXRpdGxlJywgdG9vbHRpcClcblx0XHRcdFx0XHQgICAgLnRvb2x0aXAoJ2Rpc3Bvc2UnKVxuXHRcdFx0XHRcdCAgICAudG9vbHRpcCgpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3Bhbi50ZXh0KG51bWJlcnMuam9pbignLCAnKSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2xpc3RPZkZpZWxkRGVzY3JpcHRpb25zLCBsaXN0T2ZSb3dzLCB0aGlzLmN0eC5zcWwsIHRoaXMuY3R4Lm1xbCwgdGhpcy5jdHguYXN0LCB0aGlzLmN0eC50b3RhbE51bWJlck9mUm93c10pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKGNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV4cG9ydFJlc3VsdDogZnVuY3Rpb24oY29udmVydGVyKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSh0aGlzLmN0eC5jb21tYW5kLCB7Y29udmVydGVyOiBjb252ZXJ0ZXJ9KS5kb25lKGZ1bmN0aW9uKGRhdGEsIG1lc3NhZ2UpIHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR2YXIgZmlsZU1pbWU7XG5cdFx0XHR2YXIgZmlsZU5hbWU7XG5cblx0XHRcdC8qKi8gaWYoY29udmVydGVyID09PSAnQU1JWG1sVG9YbWwueHNsJylcblx0XHRcdHtcblx0XHRcdFx0ZmlsZU1pbWUgPSAnYXBwbGljYXRpb24veG1sJztcblx0XHRcdFx0ZmlsZU5hbWUgPSAncmVzdWx0LnhtbCc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKGNvbnZlcnRlciA9PT0gJ0FNSVhtbFRvSnNvbi54c2wnKVxuXHRcdFx0e1xuXHRcdFx0XHRmaWxlTWltZSA9ICdhcHBsaWNhdGlvbi9qc29uJztcblx0XHRcdFx0ZmlsZU5hbWUgPSAncmVzdWx0Lmpzb24nO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihjb252ZXJ0ZXIgPT09ICdBTUlYbWxUb0Nzdi54c2wnKVxuXHRcdFx0e1xuXHRcdFx0XHRmaWxlTWltZSA9ICd0ZXh0L2Nzdic7XG5cdFx0XHRcdGZpbGVOYW1lID0gJ3Jlc3VsdC5jc3YnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRmaWxlTWltZSA9ICd0ZXh0L3BsYWluJztcblx0XHRcdFx0ZmlsZU5hbWUgPSAncmVzdWx0LnR4dCc7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHNhdmVBcyhuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiBmaWxlTWltZX0pLCBmaWxlTmFtZSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRpc0luRWRpdE1vZGU6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmZpZWxkRWRpdG9yLmlzSW5FZGl0TW9kZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRNb2RlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCB0YWdzMSA9ICQodGhpcy5wYXRjaElkKCcjRkVGOUU4RDhfRDRBQl9CNTQ1X0IzOTRfQzEyREQ1ODE3RDYxJykpO1xuXHRcdGNvbnN0IHRhZ3MyID0gJCh0aGlzLnBhdGNoSWQoJyNDREU1QUQxNF8xMjY4XzhGQTdfRjVEOF8wRDY5MEYzRkI4NTAnKSk7XG5cblx0XHRjb25zdCB0YWdzMyA9IHRhZ3MxLmZpbmQoJy5lZGl0LW1vZGUnKTtcblx0XHRjb25zdCB0YWdzNCA9IHRhZ3MxLmZpbmQoJy52aWV3LW1vcmUnKTtcblx0XHRjb25zdCB0YWdzNSA9IHRhZ3MxLmZpbmQoJy52aWV3LW1lZGlhJyk7XG5cblx0XHRpZigkKHRoaXMucGF0Y2hJZCgnI0REQzMyMjM4X0REMjVfODM1NF9BQzZDX0Y2RTI3Q0E2RTE4RCcpKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0e1xuXHRcdFx0dGFnczIuc2hvdygpO1xuXHRcdFx0dGFnczMuc2hvdygpO1xuXHRcdFx0dGFnczQuaGlkZSgpO1xuXHRcdFx0dGFnczUuaGlkZSgpO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldEluRWRpdE1vZGUodHJ1ZSk7XG5cdFx0XHR0aGlzLnVuaXRFZGl0b3Iuc2V0SW5FZGl0TW9kZSh0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRhZ3MyLmhpZGUoKTtcblx0XHRcdHRhZ3MzLmhpZGUoKTtcblx0XHRcdHRhZ3M0LnNob3coKTtcblx0XHRcdHRhZ3M1LnNob3coKTtcblxuXHRcdFx0dGhpcy5maWVsZEVkaXRvci5zZXRJbkVkaXRNb2RlKGZhbHNlKTtcblx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXRJbkVkaXRNb2RlKGZhbHNlKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dSb3dNb2RhbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0dGhpcy5maWVsZEVkaXRvci5zaG93Um93TW9kYWwodGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9idWlsZENvbHVtbk5hbWU6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGlmKGNhdGFsb2cgJiYgY2F0YWxvZyAhPT0gJ04vQScpIHtcblx0XHRcdHJlc3VsdC5wdXNoKCdgJyArIGNhdGFsb2cgKyAnYCcpO1xuXHRcdH1cblxuXHRcdGlmKGVudGl0eSAmJiBlbnRpdHkgIT09ICdOL0EnKSB7XG5cdFx0XHRyZXN1bHQucHVzaCgnYCcgKyBlbnRpdHkgKyAnYCcpO1xuXHRcdH1cblxuXHRcdGlmKGZpZWxkICYmIGZpZWxkICE9PSAnTi9BJykge1xuXHRcdFx0cmVzdWx0LnB1c2goJ2AnICsgZmllbGQgKyAnYCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignLicpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93UmVmaW5lTW9kYWw6IGZ1bmN0aW9uKGNhdGFsb2csIGVudGl0eSwgZmllbGQpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGlzTVFMID0gdGhpcy5jdHgubXFsICYmIHRoaXMuY3R4Lm1xbCAhPT0gJ04vQSc7XG5cblx0XHRjb25zdCByZWdpb25zID0geHFsR2V0UmVnaW9ucyhpc01RTCA/IHRoaXMuY3R4Lm1xbCA6IHRoaXMuY3R4LnNxbCwgdGhpcy5jdHgubGlzdE9mRmllbGREZXNjcmlwdGlvbnNbdGhpcy5jdHguY3VycmVudFRhYkluZGV4XSwgaXNNUUwpO1xuXG5cdFx0Y29uc3QgY29sdW1uID0gdGhpcy5fYnVpbGRDb2x1bW5OYW1lKHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uY2F0YWxvZywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS50YWJsZUFsaWFzLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmZpZWxkKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgZWwxID0gJCgnI0M0ODU2NEVBX0E2NERfOThCQV82MjMyX0QwM0Q1MjRDQUQwOCcpO1xuXHRcdGNvbnN0IGVsMiA9ICQoJyNGMTE0RTU0N181RTc4XzcyRDlfQkI3Rl8zNTVDREJCM0QwM0EnKTtcblxuXHRcdGVsMS5maW5kKCcjRTcwMTRCNTdfQjE2QV83NTkzX0ZBMUJfMEREMTVDMTVBQzNFJykudGV4dChjb2x1bW4pO1xuXHRcdGVsMS5maW5kKCcjRjNBMDQwRTFfNDBFRV85N0IzXzQ1RDZfRTdCRkI2MURCRjQ0JykudmFsKGNvbHVtbik7XG5cblx0XHRlbDEuZmluZCgnI0NBRjhCNUVCXzE3OTZfMzgzN181NzIyXzNCNUIyQTdDNzI5QicpLmhpZGUoKTtcblx0XHRlbDEuZmluZCgnI0EyNDQyN0REXzBEQ0JfM0FDOF80QTNFX0E3NUQ3OUZBQThGNycpLmhpZGUoKTtcblxuXHRcdGVsMS5maW5kKCdmb3JtJylbMF0ucmVzZXQoKTtcblxuXHRcdGVsMi5vZmYoKS5zdWJtaXQoKGUpID0+IHtcblxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLnJlZmluZVJlc3VsdCgpO1xuXHRcdH0pO1xuXG5cdFx0ZWwxLm1vZGFsKCdzaG93Jyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVmaW5lUmVzdWx0OiBmdW5jdGlvbihfZmlsdGVyLCBfeCwgX3kpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGVsMSA9ICQoJyNDNDg1NjRFQV9BNjREXzk4QkFfNjIzMl9EMDNENTI0Q0FEMDgnKTtcblx0XHRjb25zdCBlbDIgPSAkKCcjRjExNEU1NDdfNUU3OF83MkQ5X0JCN0ZfMzU1Q0RCQjNEMDNBJyk7XG5cblx0XHRjb25zdCBmaWx0ZXIgPSBfZmlsdGVyIHx8IGVsMi5maW5kKCdzZWxlY3RbbmFtZT1cImZpbHRlclwiXScpLnZhbCgpO1xuXG5cdFx0bGV0IHggPSBfeCB8fCBlbDIuZmluZCgnaW5wdXRbbmFtZT1cInhcIl0nKS52YWwoKTtcblx0XHRsZXQgeSA9IF95IHx8IGVsMi5maW5kKCdpbnB1dFtuYW1lPVwieVwiXScpLnZhbCgpO1xuXG5cdFx0bGV0IHkxID0gZWwyLmZpbmQoJ2lucHV0W25hbWU9XCJ5MVwiXScpLnZhbCgpO1xuXHRcdGxldCB5MiA9IGVsMi5maW5kKCdpbnB1dFtuYW1lPVwieTJcIl0nKS52YWwoKTtcblxuXHRcdHkgPSB5LnJlcGxhY2UoLycvZywgJ1xcJ1xcJycpO1xuXHRcdHkxID0geTEucmVwbGFjZSgvJy9nLCAnXFwnXFwnJyk7XG5cdFx0eTIgPSB5Mi5yZXBsYWNlKC8nL2csICdcXCdcXCcnKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGNvbmQ7XG5cblx0XHRzd2l0Y2goZmlsdGVyKVxuXHRcdHtcblx0XHRcdGNhc2UgJzAnOlxuXHRcdFx0XHRjb25kID0geCArICcgSVMgTlVMTCc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICcxJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIElTIE5PVCBOVUxMJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzInOlxuXHRcdFx0XHRjb25kID0geCArICcgPSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMyc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyAhPSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnNCc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyBMSUtFIFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc1Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIE5PVCBMSUtFIFxcJycgKyB5ICsgJ1xcJyc7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICc2Jzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIDwgXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzcnOlxuXHRcdFx0XHRjb25kID0geCArICcgPD0gXFwnJyArIHkgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzgnOlxuXHRcdFx0XHRjb25kID0geCArICcgPiBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnOSc6XG5cdFx0XHRcdGNvbmQgPSB4ICsgJyA+PSBcXCcnICsgeSArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnMTAnOlxuXHRcdFx0XHRjb25kID0geCArICcgQkVUV0VFTiBcXCcnICsgeTEgKyAnXFwnIEFORCBcXCcnICsgeTIgKyAnXFwnJztcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJzExJzpcblx0XHRcdFx0Y29uZCA9IHggKyAnIE5PVCBCRVRXRUVOIFxcJycgKyB5MSArICdcXCcgQU5EIFxcJycgKyB5MiArICdcXCcnO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWwxLm1vZGFsKCdoaWRlJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGlzTVFMID0gdGhpcy5jdHgubXFsICYmIHRoaXMuY3R4Lm1xbCAhPT0gJ04vQSc7XG5cblx0XHRjb25zdCByZWdpb25zID0geHFsR2V0UmVnaW9ucyhpc01RTCA/IHRoaXMuY3R4Lm1xbCA6IHRoaXMuY3R4LnNxbCwgdGhpcy5jdHgubGlzdE9mRmllbGREZXNjcmlwdGlvbnNbdGhpcy5jdHguY3VycmVudFRhYkluZGV4XSwgaXNNUUwpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihyZWdpb25zWydXSEVSRSddKVxuXHRcdHtcblx0XHRcdHJlZ2lvbnNbJ1dIRVJFJ10gKz0gJyBBTkQgJyArIGNvbmQ7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZWdpb25zWydXSEVSRSddID0gY29uZDtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHhxbCA9IFtdO1xuXG5cdFx0aWYocmVnaW9uc1snU0VMRUNUJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdTRUxFQ1QgJyArIHJlZ2lvbnNbJ1NFTEVDVCddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydGUk9NJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdGUk9NICcgKyByZWdpb25zWydGUk9NJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ1dIRVJFJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdXSEVSRSAnICsgcmVnaW9uc1snV0hFUkUnXSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBjb21tYW5kID0gJ0Jyb3dzZVF1ZXJ5IC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuY3R4LmVudGl0eSkgKyAnXCIgLScgKyAoaXNNUUwgPyAnbXFsJyA6ICdzcWwnKSArICc9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh4cWwuam9pbignICcpKSArICdcIic7XG5cblx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbEluQ29udGFpbmVyKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICd0YWJsZScsIFtjb21tYW5kXSwge30sIHRoaXMuY3R4LCAndGFibGUnLCB0aGlzLmN0eC5lbnRpdHkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dTdGF0c1RhYjogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaXNNUUwgPSB0aGlzLmN0eC5tcWwgJiYgdGhpcy5jdHgubXFsICE9PSAnTi9BJztcblxuXHRcdGNvbnN0IHJlZ2lvbnMgPSB4cWxHZXRSZWdpb25zKGlzTVFMID8gdGhpcy5jdHgubXFsIDogdGhpcy5jdHguc3FsLCB0aGlzLmN0eC5saXN0T2ZGaWVsZERlc2NyaXB0aW9uc1t0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXhdLCBpc01RTCk7XG5cblx0XHRjb25zdCBjb2x1bW5OYW1lID0gdGhpcy5fYnVpbGRDb2x1bW5OYW1lKHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uY2F0YWxvZywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS50YWJsZUFsaWFzLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmZpZWxkKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmVnaW9uc1snU0VMRUNUJ10gPSAnXFwnJyArIGNvbHVtbk5hbWUucmVwbGFjZSgvJy9nLCAnXFwnXFwnJykgKyAnXFwnIEFTIGBmaWVsZGAnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ01JTignICsgY29sdW1uTmFtZSArICcpIEFTIGBtaW5gJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdNQVgoJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgbWF4YCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnU1VNKCcgKyBjb2x1bW5OYW1lICsgJykgQVMgYHN1bWAnXG5cdFx0ICAgICAgICAgICAgICAgICAgICArICcsICcgK1xuXHRcdCAgICAgICAgICAgICAgICAgICAgJ0FWRygnICsgY29sdW1uTmFtZSArICcpIEFTIGBhdmdgJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKyAnLCAnICtcblx0XHQgICAgICAgICAgICAgICAgICAgICdTVERERVYoJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgc3RkZGV2YCdcblx0XHQgICAgICAgICAgICAgICAgICAgICsgJywgJyArXG5cdFx0ICAgICAgICAgICAgICAgICAgICAnQ09VTlQoJyArIGNvbHVtbk5hbWUgKyAnKSBBUyBgY291bnRgJ1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgeHFsID0gW107XG5cblx0XHRpZihyZWdpb25zWydTRUxFQ1QnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1NFTEVDVCAnICsgcmVnaW9uc1snU0VMRUNUJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ0ZST00nXSkge1xuXHRcdFx0eHFsLnB1c2goJ0ZST00gJyArIHJlZ2lvbnNbJ0ZST00nXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snV0hFUkUnXSkge1xuXHRcdFx0eHFsLnB1c2goJ1dIRVJFICcgKyByZWdpb25zWydXSEVSRSddKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGNvbW1hbmQgPSAnQnJvd3NlUXVlcnkgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5jYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguZW50aXR5KSArICdcIiAtJyArIChpc01RTCA/ICdtcWwnIDogJ3NxbCcpICsgJz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHhxbC5qb2luKCcgJykpICsgJ1wiJztcblxuXHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ3RhYmxlJywgW2NvbW1hbmRdLCB7b3JkZXJCeTogJycsIG9yZGVyV2F5OiAnJywgc2hvd0RldGFpbHM6IGZhbHNlfSwgdGhpcy5jdHgsICdiYXItY2hhcnQnLCB0aGlzLmN0eC5lbnRpdHkpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3dHcm91cFRhYjogZnVuY3Rpb24oY2F0YWxvZywgZW50aXR5LCBmaWVsZClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaXNNUUwgPSB0aGlzLmN0eC5tcWwgJiYgdGhpcy5jdHgubXFsICE9PSAnTi9BJztcblxuXHRcdGNvbnN0IHJlZ2lvbnMgPSB4cWxHZXRSZWdpb25zKGlzTVFMID8gdGhpcy5jdHgubXFsIDogdGhpcy5jdHguc3FsLCB0aGlzLmN0eC5saXN0T2ZGaWVsZERlc2NyaXB0aW9uc1t0aGlzLmN0eC5jdXJyZW50VGFiSW5kZXhdLCBpc01RTCk7XG5cblx0XHRjb25zdCBjb2x1bW5OYW1lID0gdGhpcy5fYnVpbGRDb2x1bW5OYW1lKHJlZ2lvbnNbJ0FMSUFTRVMnXVtmaWVsZF0uY2F0YWxvZywgcmVnaW9uc1snQUxJQVNFUyddW2ZpZWxkXS50YWJsZUFsaWFzLCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLmZpZWxkKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmVnaW9uc1snU0VMRUNUJ10gPSBjb2x1bW5OYW1lXG5cdFx0XHRcdCsgJywgY291bnQoKikgQVMgYHRvdGFsYCwgQ09OQ0FUKFxcJ0BPV05FUjo6JyArIGNvbHVtbk5hbWUgKyAnOjpcXCcsICcgKyBjb2x1bW5OYW1lICsgJykgQVMgYGdvYCc7XG5cdFx0cmVnaW9uc1snR1JPVVAnXSA9IGNvbHVtbk5hbWU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHhxbCA9IFtdO1xuXG5cdFx0aWYocmVnaW9uc1snU0VMRUNUJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdTRUxFQ1QgJyArIHJlZ2lvbnNbJ1NFTEVDVCddKTtcblx0XHR9XG5cblx0XHRpZihyZWdpb25zWydGUk9NJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdGUk9NICcgKyByZWdpb25zWydGUk9NJ10pO1xuXHRcdH1cblxuXHRcdGlmKHJlZ2lvbnNbJ1dIRVJFJ10pIHtcblx0XHRcdHhxbC5wdXNoKCdXSEVSRSAnICsgcmVnaW9uc1snV0hFUkUnXSk7XG5cdFx0fVxuXG5cdFx0aWYocmVnaW9uc1snR1JPVVAnXSkge1xuXHRcdFx0eHFsLnB1c2goJ0dST1VQIEJZICcgKyByZWdpb25zWydHUk9VUCddLnJlcGxhY2UoZW50aXR5LCByZWdpb25zWydBTElBU0VTJ11bZmllbGRdLnRhYmxlQWxpYXMpKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGNvbW1hbmQgPSAnQnJvd3NlUXVlcnkgLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyh0aGlzLmN0eC5jYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGhpcy5jdHguZW50aXR5KSArICdcIiAtJyArIChpc01RTCA/ICdtcWwnIDogJ3NxbCcpICsgJz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHhxbC5qb2luKCcgJykpICsgJ1wiJztcblxuXHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sSW5Db250YWluZXIodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ3RhYmxlJywgW2NvbW1hbmRdLCB7b3JkZXJCeTogY29sdW1uTmFtZSwgb3JkZXJXYXk6ICdBU0MnLCBzaG93RGV0YWlsczogZmFsc2V9LCB0aGlzLmN0eCwgJ3NsYWNrJywgdGhpcy5jdHguZW50aXR5KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
