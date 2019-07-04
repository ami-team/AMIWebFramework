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

      $(_this4.patchId('#C8CB30DC_414F_7559_B618_42B7CC04F993')).click(function () {
        amiWebApp.createControl(_this4.getParent(), _this4, 'editBox', [_this4.ctx.command], {}).done(function (instance, command) {
          /*-----------------------------------------------------*/
          _this4.ctx.command = command;
          /*-----------------------------------------------------*/

          _this4.refresh().fail(function (message) {
            amiWebApp.error(message, true);
          });
          /*-----------------------------------------------------*/

        });
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
          _this5.ctx.currentTabIndex = e.currentTarget.getAttribute('data-tab-index');
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
//# sourceMappingURL=TableCtrl.js.map
