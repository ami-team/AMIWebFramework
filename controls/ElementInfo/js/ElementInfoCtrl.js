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

/*-------------------------------------------------------------------------*/
$AMIClass('ElementInfoCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/ElementInfo/twig/ElementInfoCtrl.twig', amiWebApp.originURL + '/controls/ElementInfo/twig/details.twig', amiWebApp.originURL + '/controls/ElementInfo/twig/js.twig',
    /**/
    'ctrl:fieldEditor', 'ctrl:unitEditor', 'ctrl:tab']).done(function (data) {
      _this.fragmentElementInfoCtrl = data[0];
      _this.fragmentDetails = data[1];
      _this.fragmentJS = data[2];
      _this.fieldEditorCtor = data[3];
      _this.fieldUnitCtor = data[4];
      _this.tabCtor = data[5];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    this.ctx = {
      catalog: catalog,
      entity: entity,
      primaryFieldName: primaryFieldName,
      primaryFieldValue: primaryFieldValue
    };

    var fn = function fn(catalog, entity, primaryFieldName, primaryFieldValue) {
      return 'GetElementInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -primaryFieldName="' + amiWebApp.textToString(primaryFieldName) + '" -primaryFieldValue="' + amiWebApp.textToString(primaryFieldValue) + '"';
    };

    var _amiWebApp$setup = amiWebApp.setup(['context', 'elementInfoCommandFunc', 'expandedLinkedElements', 'enableCache', 'enableCount', 'showPrimaryField', 'showToolBar', 'showDetails', 'showTools', 'canEdit', 'maxCellLength', 'card'], [result, fn, [], false, true, true, true, false, true, false, 64, false], settings),
        context = _amiWebApp$setup[0],
        elementInfoCommandFunc = _amiWebApp$setup[1],
        expandedLinkedElements = _amiWebApp$setup[2],
        enableCache = _amiWebApp$setup[3],
        enableCount = _amiWebApp$setup[4],
        showPrimaryField = _amiWebApp$setup[5],
        showToolBar = _amiWebApp$setup[6],
        showDetails = _amiWebApp$setup[7],
        showTools = _amiWebApp$setup[8],
        canEdit = _amiWebApp$setup[9],
        maxCellLength = _amiWebApp$setup[10],
        card = _amiWebApp$setup[11];

    this.ctx.elementInfoCommandFunc = elementInfoCommandFunc;
    this.ctx.expandedLinkedElements = expandedLinkedElements;
    this.ctx.enableCache = enableCache;
    this.ctx.enableCount = enableCount;
    this.ctx.showPrimaryField = showPrimaryField;
    this.ctx.showToolBar = showToolBar;
    this.ctx.showDetails = showDetails;
    this.ctx.showTools = showTools;
    this.ctx.canEdit = canEdit;
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

    var L = [];
    this.ctx.expandedLinkedElements.forEach(function (expandedLinkedElement) {
      var catalog = amiWebApp.textToString(expandedLinkedElement.catalog);
      var entity = amiWebApp.textToString(expandedLinkedElement.entity);
      L.push(catalog + '.' + entity);
    });
    this.ctx.command += ' -expandedLinkedElements="' + L.join(',') + '"';
    /*-----------------------------------------------------------------*/

    this.fieldEditor = new this.fieldEditorCtor(this, this);
    this.unitEditor = new this.fieldUnitCtor(this, this);
    /*-----------------------------------------------------------------*/

    this._render(result, selector);
    /*-----------------------------------------------------------------*/


    return result;
  },

  /*---------------------------------------------------------------------*/
  _render: function _render(result, selector) {
    var _this2 = this;

    if (this.getParent() == null || this.getParent().$name !== 'TabCtrl') {
      var tab = new this.tabCtor(null, this);
      tab.render(selector, this.ctx).done(function () {
        tab.appendItem('<i class="fa fa-arrows-alt"></i> ' + _this2.ctx.entity, {
          closable: false,
          firstVisible: false
        }).done(function (selector) {
          _this2.setParent(tab);

          _this2.__render(result, selector);
        });
      });
    } else {
      this.__render(result, selector);
    }
  },

  /*---------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this3 = this;

    /*-----------------------------------------------------------------*/
    this.replaceHTML(selector, this.fragmentElementInfoCtrl, {
      dict: this.ctx
    }).done(function () {
      /*-------------------------------------------------------------*/
      $(_this3.patchId('#ACFEDF15_7894_6D91_CBE7_D98B5F7E9C6A')).click(function () {
        amiWebApp.lock();

        _this3.refresh().done(function () {
          amiWebApp.unlock();
        }).fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      $(_this3.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).change(function () {
        amiWebApp.lock();

        _this3.refresh().done(function () {
          amiWebApp.unlock();
        }).fail(function (message) {
          amiWebApp.error(message, true);
        });
      });
      /*-------------------------------------------------------------*/

      $(_this3.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).change(function () {
        _this3.setMode();
      });
      /*-------------------------------------------------------------*/

      $(_this3.patchId('#BF7E7885_DB34_7993_9F17_37990DDD4BF3')).click(function () {
        amiWebApp.createControl(_this3.getParent(), _this3, 'messageBox', [_this3.ctx.command], {});
      });
      $(_this3.patchId('#F1232710_45E2_92BF_7378_1BCD05FBF131')).click(function () {
        amiWebApp.createControl(_this3.getParent(), _this3, 'textBox', [_this3.ctx.js], {});
      });
      /*-------------------------------------------------------------*/

      $(_this3.patchId('#C28C33B1_9BCE_808C_0E57_4C8704359932')).click(function () {
        /*---------------------------------------------------------*/
        var params = [_this3.ctx.catalog, _this3.ctx.entity, _this3.ctx.primaryFieldName, _this3.ctx.primaryFieldValue];
        var settings = {
          enableCache: _this3.ctx.enableCache,
          enableCount: _this3.ctx.enableCount,

          /**/
          showPrimaryField: _this3.ctx.showPrimaryField,
          showToolBar: _this3.ctx.showToolBar,
          showDetails: _this3.ctx.showDetails,
          showTools: _this3.ctx.showTools,
          canEdit: _this3.ctx.canEdit,

          /**/
          catalog: _this3.ctx.catalog,
          entity: _this3.ctx.entity,
          primaryField: _this3.ctx.primaryField,
          rowset: _this3.ctx.rowset,

          /**/
          maxCellLength: _this3.ctx.maxCellLength,

          /**/
          card: _this3.ctx.card
        };
        /*---------------------------------------------------------*/

        var autoRefresh = confirm('Auto-refresh new widget?');
        /*---------------------------------------------------------*/

        amiWebApp.lock();
        amiCommand.execute('AddWidget -control="ElementInfo" -params="' + amiWebApp.textToString(JSON.stringify(params)) + '" -settings="' + amiWebApp.textToString(JSON.stringify(settings)) + '" -transparent' + (autoRefresh ? ' -autoRefresh' : '')).done(function (data, message) {
          amiWebApp.success(message);
        }).fail(function (data, message) {
          amiWebApp.error(message);
        });
        /*---------------------------------------------------------*/
      });
      /*-------------------------------------------------------------*/

      _this3.ctx.js = amiWebApp.formatTWIG(_this3.fragmentJS, _this3.ctx);
      /*-------------------------------------------------------------*/

      _this3.refresh().done(function (elementRowset, linkedElementRowset, expandedLinkedElements) {
        result.resolveWith(_this3.ctx.context, [elementRowset, linkedElementRowset, expandedLinkedElements]);
      }).fail(function (message) {
        result.rejectWith(_this3.ctx.context, [message]);
      });
      /*-------------------------------------------------------------*/

    });
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh(settings) {
    var _this4 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup2 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup2[0];
    /*-----------------------------------------------------------------*/


    this.ctx.command = this.ctx.elementInfoCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.primaryFieldName, this.ctx.primaryFieldValue);
    /*-----------------------------------------------------------------*/

    amiCommand.execute(this.ctx.command).done(function (data) {
      /*-------------------------------------------------------------*/
      var fieldDescriptions = amiWebApp.jspath('..fieldDescription', data);
      /*-------------------------------------------------------------*/

      var elementRowset = amiWebApp.jspath('..rowset{.@type==="element" || .@type==="Element_Info"}.row', data);
      /* BERK */

      var linkedElementRowset = amiWebApp.jspath('..rowset{.@type==="linked_elements" || .@type==="Element_Child"}.row', data);
      /* BERK */

      /*-------------------------------------------------------------*/

      var expandedLinkedElements = [];

      _this4.ctx.expandedLinkedElements.forEach(function (expandedLinkedElement) {
        expandedLinkedElements.push({
          catalog: expandedLinkedElement.catalog,
          entity: expandedLinkedElement.entity,
          fields: expandedLinkedElement.fields,
          keyValMode: expandedLinkedElement.keyValMode,
          rows: amiWebApp.jspath('..rowset{.@type==="' + expandedLinkedElement.entity + '"}.row', data)
        });
      });
      /*-------------------------------------------------------------*/


      var dict = {
        catalog: _this4.ctx.catalog,
        entity: _this4.ctx.entity,
        primaryFieldName: _this4.ctx.primaryFieldName,
        primaryFieldValue: _this4.ctx.primaryFieldValue,

        /**/
        fieldDescriptions: fieldDescriptions,

        /**/
        elementRowset: elementRowset,
        linkedElementRowset: linkedElementRowset,
        expandedLinkedElements: expandedLinkedElements,

        /**/
        showToolBar: _this4.ctx.showToolBar,
        ignoredFields: _this4.ctx.ignoredFields,
        showEmptyFields: $(_this4.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).prop('checked'),

        /**/
        maxCellLength: _this4.ctx.maxCellLength
      };
      /*-------------------------------------------------------------*/

      _this4.replaceHTML(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), _this4.fragmentDetails, {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
        _this4.fieldEditor.setup(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), _this4.ctx);

        _this4.unitEditor.setup(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638'));
        /*---------------------------------------------------------*/


        $(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638')).find('[data-ctrl]').click(function (e) {
          e.preventDefault();

          _this4.createControlFromWebLink(_this4.getParent(), e.currentTarget, _this4.ctx);
        });
        /*---------------------------------------------------------*/

        result.resolveWith(context, [fieldDescriptions, elementRowset, linkedElementRowset, expandedLinkedElements]);
      });
      /*-------------------------------------------------------------*/

    }).fail(function (data, message) {
      result.rejectWith(context, [message]);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  isInEditMode: function isInEditMode() {
    return this.fieldEditor.isInEditMode();
  },

  /*---------------------------------------------------------------------*/
  setMode: function setMode() {
    var tags1 = $(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638'));
    var tags2 = tags1.find('.view-more');
    var tags3 = tags1.find('.view-media');

    if ($(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).prop('checked')) {
      tags2.hide();
      tags3.hide();
      this.fieldEditor.setInEditMode(true);
      this.unitEditor.setInEditMode(true);
    } else {
      tags2.show();
      tags3.show();
      this.fieldEditor.setInEditMode(false);
      this.unitEditor.setInEditMode(false);
    }
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVsZW1lbnRJbmZvQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJmcmFnbWVudEVsZW1lbnRJbmZvQ3RybCIsImZyYWdtZW50RGV0YWlscyIsImZyYWdtZW50SlMiLCJmaWVsZEVkaXRvckN0b3IiLCJmaWVsZFVuaXRDdG9yIiwidGFiQ3RvciIsInJlbmRlciIsInNlbGVjdG9yIiwiY2F0YWxvZyIsImVudGl0eSIsInByaW1hcnlGaWVsZE5hbWUiLCJwcmltYXJ5RmllbGRWYWx1ZSIsInNldHRpbmdzIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiY3R4IiwiZm4iLCJ0ZXh0VG9TdHJpbmciLCJzZXR1cCIsImNvbnRleHQiLCJlbGVtZW50SW5mb0NvbW1hbmRGdW5jIiwiZXhwYW5kZWRMaW5rZWRFbGVtZW50cyIsImVuYWJsZUNhY2hlIiwiZW5hYmxlQ291bnQiLCJzaG93UHJpbWFyeUZpZWxkIiwic2hvd1Rvb2xCYXIiLCJzaG93RGV0YWlscyIsInNob3dUb29scyIsImNhbkVkaXQiLCJtYXhDZWxsTGVuZ3RoIiwiY2FyZCIsImlnbm9yZWRGaWVsZHMiLCJMIiwiZm9yRWFjaCIsImV4cGFuZGVkTGlua2VkRWxlbWVudCIsInB1c2giLCJjb21tYW5kIiwiam9pbiIsImZpZWxkRWRpdG9yIiwidW5pdEVkaXRvciIsIl9yZW5kZXIiLCJnZXRQYXJlbnQiLCIkbmFtZSIsInRhYiIsImFwcGVuZEl0ZW0iLCJjbG9zYWJsZSIsImZpcnN0VmlzaWJsZSIsInNldFBhcmVudCIsIl9fcmVuZGVyIiwicmVwbGFjZUhUTUwiLCJkaWN0IiwicGF0Y2hJZCIsImNsaWNrIiwibG9jayIsInJlZnJlc2giLCJ1bmxvY2siLCJmYWlsIiwibWVzc2FnZSIsImVycm9yIiwiY2hhbmdlIiwic2V0TW9kZSIsImNyZWF0ZUNvbnRyb2wiLCJqcyIsInBhcmFtcyIsInByaW1hcnlGaWVsZCIsInJvd3NldCIsImF1dG9SZWZyZXNoIiwiY29uZmlybSIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiLCJmb3JtYXRUV0lHIiwiZWxlbWVudFJvd3NldCIsImxpbmtlZEVsZW1lbnRSb3dzZXQiLCJyZXNvbHZlV2l0aCIsInJlamVjdFdpdGgiLCJmaWVsZERlc2NyaXB0aW9ucyIsImpzcGF0aCIsImZpZWxkcyIsImtleVZhbE1vZGUiLCJyb3dzIiwic2hvd0VtcHR5RmllbGRzIiwicHJvcCIsImZpbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmsiLCJjdXJyZW50VGFyZ2V0IiwiaXNJbkVkaXRNb2RlIiwidGFnczEiLCJ0YWdzMiIsInRhZ3MzIiwiaGlkZSIsInNldEluRWRpdE1vZGUiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUVBQSxTQUFTLENBQUMsaUJBQUQsRUFBb0I7QUFDNUI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSGM7O0FBSzVCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVYyQjs7QUFZNUI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsV0FBT0MsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsR0FBc0IsaURBRFEsRUFFOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix5Q0FGUSxFQUc5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLG9DQUhRO0FBSTlCO0FBQ0Esc0JBTDhCLEVBTTlCLGlC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QixFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFDQyxRQUFNK0IsS0FBSyxHQUFHOUUsQ0FBQyxDQUFDLEtBQUtzQyxPQUFMLENBQWEsdUNBQWIsQ0FBRCxDQUFmO0FBRUEsUUFBTXlDLEtBQUssR0FBR0QsS0FBSyxDQUFDTixJQUFOLENBQVcsWUFBWCxDQUFkO0FBQ0EsUUFBTVEsS0FBSyxHQUFHRixLQUFLLENBQUNOLElBQU4sQ0FBVyxhQUFYLENBQWQ7O0FBRUEsUUFBR3hFLENBQUMsQ0FBQyxLQUFLc0MsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBRCxDQUF5RGlDLElBQXpELENBQThELFNBQTlELENBQUgsRUFDQTtBQUNDUSxNQUFBQSxLQUFLLENBQUNFLElBQU47QUFDQUQsTUFBQUEsS0FBSyxDQUFDQyxJQUFOO0FBRUEsV0FBS3hELFdBQUwsQ0FBaUJ5RCxhQUFqQixDQUErQixJQUEvQjtBQUNBLFdBQUt4RCxVQUFMLENBQWdCd0QsYUFBaEIsQ0FBOEIsSUFBOUI7QUFDQSxLQVBELE1BU0E7QUFDQ0gsTUFBQUEsS0FBSyxDQUFDSSxJQUFOO0FBQ0FILE1BQUFBLEtBQUssQ0FBQ0csSUFBTjtBQUVBLFdBQUsxRCxXQUFMLENBQWlCeUQsYUFBakIsQ0FBK0IsS0FBL0I7QUFDQSxXQUFLeEQsVUFBTCxDQUFnQndELGFBQWhCLENBQThCLEtBQTlCO0FBQ0E7QUFDRDtBQUVEOztBQXphNEIsQ0FBcEIsQ0FBVDtBQTRhQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuKiBBTUkgV2ViIEZyYW1ld29ya1xuKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbipcbiogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuKlxuKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdFbGVtZW50SW5mb0N0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9FbGVtZW50SW5mby90d2lnL0VsZW1lbnRJbmZvQ3RybC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0VsZW1lbnRJbmZvL3R3aWcvZGV0YWlscy50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0VsZW1lbnRJbmZvL3R3aWcvanMudHdpZycsXG5cdFx0XHQvKiovXG5cdFx0XHQnY3RybDpmaWVsZEVkaXRvcicsXG5cdFx0XHQnY3RybDp1bml0RWRpdG9yJyxcblx0XHRcdCdjdHJsOnRhYicsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50RWxlbWVudEluZm9DdHJsID0gZGF0YVswXTtcblx0XHRcdHRoaXMuZnJhZ21lbnREZXRhaWxzID0gZGF0YVsxXTtcblx0XHRcdHRoaXMuZnJhZ21lbnRKUyA9IGRhdGFbMl07XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3JDdG9yID0gZGF0YVszXTtcblx0XHRcdHRoaXMuZmllbGRVbml0Q3RvciA9IGRhdGFbNF07XG5cdFx0XHR0aGlzLnRhYkN0b3IgPSBkYXRhWzVdO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZE5hbWUsIHByaW1hcnlGaWVsZFZhbHVlLCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHggPSB7XG5cdFx0XHRjYXRhbG9nOiBjYXRhbG9nLFxuXHRcdFx0ZW50aXR5OiBlbnRpdHksXG5cdFx0XHRwcmltYXJ5RmllbGROYW1lOiBwcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0cHJpbWFyeUZpZWxkVmFsdWU6IHByaW1hcnlGaWVsZFZhbHVlLFxuXHRcdH07XG5cblx0XHRjb25zdCBmbiA9IChjYXRhbG9nLCBlbnRpdHksIHByaW1hcnlGaWVsZE5hbWUsIHByaW1hcnlGaWVsZFZhbHVlKSA9PiAnR2V0RWxlbWVudEluZm8gLWNhdGFsb2c9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhjYXRhbG9nKSArICdcIiAtZW50aXR5PVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZW50aXR5KSArICdcIiAtcHJpbWFyeUZpZWxkTmFtZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlGaWVsZE5hbWUpICsgJ1wiIC1wcmltYXJ5RmllbGRWYWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHByaW1hcnlGaWVsZFZhbHVlKSArICdcIic7XG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LFxuXHRcdFx0ZWxlbWVudEluZm9Db21tYW5kRnVuYyxcblx0XHRcdGV4cGFuZGVkTGlua2VkRWxlbWVudHMsXG5cdFx0XHRlbmFibGVDYWNoZSwgZW5hYmxlQ291bnQsIHNob3dQcmltYXJ5RmllbGQsIHNob3dUb29sQmFyLCBzaG93RGV0YWlscywgc2hvd1Rvb2xzLCBjYW5FZGl0LFxuXHRcdFx0bWF4Q2VsbExlbmd0aCxcblx0XHRcdGNhcmRcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0W1xuXHRcdFx0XHQnY29udGV4dCcsXG5cdFx0XHRcdCdlbGVtZW50SW5mb0NvbW1hbmRGdW5jJyxcblx0XHRcdFx0J2V4cGFuZGVkTGlua2VkRWxlbWVudHMnLFxuXHRcdFx0XHQnZW5hYmxlQ2FjaGUnLCAnZW5hYmxlQ291bnQnLCAnc2hvd1ByaW1hcnlGaWVsZCcsICdzaG93VG9vbEJhcicsICdzaG93RGV0YWlscycsICdzaG93VG9vbHMnLCAnY2FuRWRpdCcsXG5cdFx0XHRcdCdtYXhDZWxsTGVuZ3RoJyxcblx0XHRcdFx0J2NhcmQnLFxuXHRcdFx0XSxcblx0XHRcdFtcblx0XHRcdFx0cmVzdWx0LFxuXHRcdFx0XHRmbixcblx0XHRcdFx0W10sXG5cdFx0XHRcdGZhbHNlLCB0cnVlLCB0cnVlLCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UsXG5cdFx0XHRcdDY0LFxuXHRcdFx0XHRmYWxzZSxcblx0XHRcdF0sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHR0aGlzLmN0eC5lbGVtZW50SW5mb0NvbW1hbmRGdW5jID0gZWxlbWVudEluZm9Db21tYW5kRnVuYztcblxuXHRcdHRoaXMuY3R4LmV4cGFuZGVkTGlua2VkRWxlbWVudHMgPSBleHBhbmRlZExpbmtlZEVsZW1lbnRzO1xuXG5cdFx0dGhpcy5jdHguZW5hYmxlQ2FjaGUgPSBlbmFibGVDYWNoZTtcblx0XHR0aGlzLmN0eC5lbmFibGVDb3VudCA9IGVuYWJsZUNvdW50O1xuXG5cdFx0dGhpcy5jdHguc2hvd1ByaW1hcnlGaWVsZCA9IHNob3dQcmltYXJ5RmllbGQ7XG5cdFx0dGhpcy5jdHguc2hvd1Rvb2xCYXIgPSBzaG93VG9vbEJhcjtcblx0XHR0aGlzLmN0eC5zaG93RGV0YWlscyA9IHNob3dEZXRhaWxzO1xuXHRcdHRoaXMuY3R4LnNob3dUb29scyA9IHNob3dUb29scztcblx0XHR0aGlzLmN0eC5jYW5FZGl0ID0gY2FuRWRpdDtcblxuXHRcdHRoaXMuY3R4Lm1heENlbGxMZW5ndGggPSBtYXhDZWxsTGVuZ3RoO1xuXG5cdFx0dGhpcy5jdHguY2FyZCA9IGNhcmQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4Lmlnbm9yZWRGaWVsZHMgPSB7XG5cdFx0XHQnT1JBQ0xFX1JPV05VTSc6ICcnLFxuXHRcdFx0J1BST0pFQ1QnOiAnJyxcblx0XHRcdCdQUk9DRVNTJzogJycsXG5cdFx0XHQnQU1JRU5USVRZTkFNRSc6ICcnLFxuXHRcdFx0J0FNSUVMRU1FTlRJRCc6ICcnLFxuXHRcdFx0J0FNSUNSRUFURUQnOiAnJyxcblx0XHRcdCdBTUlMQVNUTU9ESUZJRUQnOiAnJyxcblx0XHRcdCdBTUlTWVNEQVRFJzogJydcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBMID0gW107XG5cblx0XHR0aGlzLmN0eC5leHBhbmRlZExpbmtlZEVsZW1lbnRzLmZvckVhY2goKGV4cGFuZGVkTGlua2VkRWxlbWVudCkgPT4ge1xuXG5cdFx0XHRsZXQgY2F0YWxvZyA9IGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZXhwYW5kZWRMaW5rZWRFbGVtZW50LmNhdGFsb2cpO1xuXHRcdFx0bGV0IGVudGl0eSA9IGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoZXhwYW5kZWRMaW5rZWRFbGVtZW50LmVudGl0eSk7XG5cblx0XHRcdEwucHVzaChjYXRhbG9nICsgJy4nICsgZW50aXR5KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQgKz0gJyAtZXhwYW5kZWRMaW5rZWRFbGVtZW50cz1cIicgKyBMLmpvaW4oJywnKSArICdcIic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZmllbGRFZGl0b3IgPSBuZXcgdGhpcy5maWVsZEVkaXRvckN0b3IodGhpcywgdGhpcyk7XG5cdFx0dGhpcy51bml0RWRpdG9yID0gbmV3IHRoaXMuZmllbGRVbml0Q3Rvcih0aGlzLCB0aGlzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0aWYodGhpcy5nZXRQYXJlbnQoKSA9PSBudWxsIHx8IHRoaXMuZ2V0UGFyZW50KCkuJG5hbWUgIT09ICdUYWJDdHJsJylcblx0XHR7XG5cdFx0XHRjb25zdCB0YWIgPSBuZXcgdGhpcy50YWJDdG9yKG51bGwsIHRoaXMpO1xuXG5cdFx0XHR0YWIucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGFiLmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtYXJyb3dzLWFsdFwiPjwvaT4gJyArIHRoaXMuY3R4LmVudGl0eSwge2Nsb3NhYmxlOiBmYWxzZSwgZmlyc3RWaXNpYmxlOiBmYWxzZX0pLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFBhcmVudCh0YWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudEVsZW1lbnRJbmZvQ3RybCwge2RpY3Q6IHRoaXMuY3R4fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQUNGRURGMTVfNzg5NF82RDkxX0NCRTdfRDk4QjVGN0U5QzZBJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEOThCNkI5QV8xRDVBXzAyMUVfNUY5MF8yQjU1QTZDM0JFNzMnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBQjg0QThDQ181RTcwX0VCRTdfODc2Nl8zMTdGRUU3MUVGRTgnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnNldE1vZGUoKVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY3RTc4ODVfREIzNF83OTkzXzlGMTdfMzc5OTBEREQ0QkYzJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5jb21tYW5kXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjEyMzI3MTBfNDVFMl85MkJGXzczNzhfMUJDRDA1RkJGMTMxJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGV4dEJveCcsIFt0aGlzLmN0eC5qc10sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0MyOEMzM0IxXzlCQ0VfODA4Q18wRTU3XzRDODcwNDM1OTkzMicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHBhcmFtcyA9IFtcblx0XHRcdFx0XHR0aGlzLmN0eC5jYXRhbG9nLFxuXHRcdFx0XHRcdHRoaXMuY3R4LmVudGl0eSxcblx0XHRcdFx0XHR0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0XHRcdHRoaXMuY3R4LnByaW1hcnlGaWVsZFZhbHVlLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGNvbnN0IHNldHRpbmdzID0ge1xuXHRcdFx0XHRcdGVuYWJsZUNhY2hlOiB0aGlzLmN0eC5lbmFibGVDYWNoZSxcblx0XHRcdFx0XHRlbmFibGVDb3VudDogdGhpcy5jdHguZW5hYmxlQ291bnQsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdHNob3dQcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQsXG5cdFx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRcdHNob3dEZXRhaWxzOiB0aGlzLmN0eC5zaG93RGV0YWlscyxcblx0XHRcdFx0XHRzaG93VG9vbHM6IHRoaXMuY3R4LnNob3dUb29scyxcblx0XHRcdFx0XHRjYW5FZGl0OiB0aGlzLmN0eC5jYW5FZGl0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRjYXRhbG9nOiB0aGlzLmN0eC5jYXRhbG9nLFxuXHRcdFx0XHRcdGVudGl0eTogdGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRcdHByaW1hcnlGaWVsZDogdGhpcy5jdHgucHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRcdHJvd3NldDogdGhpcy5jdHgucm93c2V0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRtYXhDZWxsTGVuZ3RoOiB0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoLFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRjYXJkOiB0aGlzLmN0eC5jYXJkLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBhdXRvUmVmcmVzaCA9IGNvbmZpcm0oJ0F1dG8tcmVmcmVzaCBuZXcgd2lkZ2V0PycpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkV2lkZ2V0IC1jb250cm9sPVwiRWxlbWVudEluZm9cIiAtcGFyYW1zPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkocGFyYW1zKSkgKyAnXCIgLXNldHRpbmdzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKSArICdcIiAtdHJhbnNwYXJlbnQnICsgKGF1dG9SZWZyZXNoID8gJyAtYXV0b1JlZnJlc2gnIDogJycpKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmN0eC5qcyA9IGFtaVdlYkFwcC5mb3JtYXRUV0lHKHRoaXMuZnJhZ21lbnRKUywgdGhpcy5jdHgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLnJlZnJlc2goKS5kb25lKChlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQsIFtlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aCh0aGlzLmN0eC5jb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZnJlc2g6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoWydjb250ZXh0J10sIFtyZXN1bHRdLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQgPSB0aGlzLmN0eC5lbGVtZW50SW5mb0NvbW1hbmRGdW5jKHRoaXMuY3R4LmNhdGFsb2csIHRoaXMuY3R4LmVudGl0eSwgdGhpcy5jdHgucHJpbWFyeUZpZWxkTmFtZSwgdGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUodGhpcy5jdHguY29tbWFuZCkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaWVsZERlc2NyaXB0aW9ucyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGREZXNjcmlwdGlvbicsIGRhdGEpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBlbGVtZW50Um93c2V0ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJlbGVtZW50XCIgfHwgLkB0eXBlPT09XCJFbGVtZW50X0luZm9cIn0ucm93JywgZGF0YSk7IC8qIEJFUksgKi9cblxuXHRcdFx0Y29uc3QgbGlua2VkRWxlbWVudFJvd3NldCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwibGlua2VkX2VsZW1lbnRzXCIgfHwgLkB0eXBlPT09XCJFbGVtZW50X0NoaWxkXCJ9LnJvdycsIGRhdGEpOyAvKiBCRVJLICovXG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGV4cGFuZGVkTGlua2VkRWxlbWVudHMgPSBbXTtcblxuXHRcdFx0dGhpcy5jdHguZXhwYW5kZWRMaW5rZWRFbGVtZW50cy5mb3JFYWNoKChleHBhbmRlZExpbmtlZEVsZW1lbnQpID0+IHtcblxuXHRcdFx0XHRleHBhbmRlZExpbmtlZEVsZW1lbnRzLnB1c2goe1xuXHRcdFx0XHRcdGNhdGFsb2c6IGV4cGFuZGVkTGlua2VkRWxlbWVudC5jYXRhbG9nLFxuXHRcdFx0XHRcdGVudGl0eTogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmVudGl0eSxcblx0XHRcdFx0XHRmaWVsZHM6IGV4cGFuZGVkTGlua2VkRWxlbWVudC5maWVsZHMsXG5cdFx0XHRcdFx0a2V5VmFsTW9kZTogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmtleVZhbE1vZGUsXG5cdFx0XHRcdFx0cm93czogYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCInICsgZXhwYW5kZWRMaW5rZWRFbGVtZW50LmVudGl0eSArICdcIn0ucm93JywgZGF0YSksXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdGNhdGFsb2c6IHRoaXMuY3R4LmNhdGFsb2csXG5cdFx0XHRcdGVudGl0eTogdGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRwcmltYXJ5RmllbGROYW1lOiB0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0XHRwcmltYXJ5RmllbGRWYWx1ZTogdGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0ZmllbGREZXNjcmlwdGlvbnM6IGZpZWxkRGVzY3JpcHRpb25zLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdGVsZW1lbnRSb3dzZXQ6IGVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGxpbmtlZEVsZW1lbnRSb3dzZXQ6IGxpbmtlZEVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGV4cGFuZGVkTGlua2VkRWxlbWVudHM6IGV4cGFuZGVkTGlua2VkRWxlbWVudHMsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRpZ25vcmVkRmllbGRzOiB0aGlzLmN0eC5pZ25vcmVkRmllbGRzLFxuXHRcdFx0XHRzaG93RW1wdHlGaWVsZHM6ICQodGhpcy5wYXRjaElkKCcjRDk4QjZCOUFfMUQ1QV8wMjFFXzVGOTBfMkI1NUE2QzNCRTczJykpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRtYXhDZWxsTGVuZ3RoOiB0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoLFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNCQkQzOTFDN183NTlEXzAxRERfRTIzNF80ODhENDY1MDQ2MzgnKSwgdGhpcy5mcmFnbWVudERldGFpbHMsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0dXAodGhpcy5wYXRjaElkKCcjQkJEMzkxQzdfNzU5RF8wMUREX0UyMzRfNDg4RDQ2NTA0NjM4JyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY3R4KTtcblx0XHRcdFx0dGhpcy51bml0RWRpdG9yLnNldHVwKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCQkQzOTFDN183NTlEXzAxRERfRTIzNF80ODhENDY1MDQ2MzgnKSkuZmluZCgnW2RhdGEtY3RybF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsodGhpcy5nZXRQYXJlbnQoKSwgZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmN0eCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2ZpZWxkRGVzY3JpcHRpb25zLCBlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aXNJbkVkaXRNb2RlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maWVsZEVkaXRvci5pc0luRWRpdE1vZGUoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TW9kZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgdGFnczEgPSAkKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpKTtcblxuXHRcdGNvbnN0IHRhZ3MyID0gdGFnczEuZmluZCgnLnZpZXctbW9yZScpO1xuXHRcdGNvbnN0IHRhZ3MzID0gdGFnczEuZmluZCgnLnZpZXctbWVkaWEnKTtcblxuXHRcdGlmKCQodGhpcy5wYXRjaElkKCcjQUI4NEE4Q0NfNUU3MF9FQkU3Xzg3NjZfMzE3RkVFNzFFRkU4JykpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHR0YWdzMi5oaWRlKCk7XG5cdFx0XHR0YWdzMy5oaWRlKCk7XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0SW5FZGl0TW9kZSh0cnVlKTtcblx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXRJbkVkaXRNb2RlKHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGFnczIuc2hvdygpO1xuXHRcdFx0dGFnczMuc2hvdygpO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdFx0dGhpcy51bml0RWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
