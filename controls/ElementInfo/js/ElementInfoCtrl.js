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

    if (this.getParent().$name !== 'TabCtrl') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVsZW1lbnRJbmZvQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJmcmFnbWVudEVsZW1lbnRJbmZvQ3RybCIsImZyYWdtZW50RGV0YWlscyIsImZyYWdtZW50SlMiLCJmaWVsZEVkaXRvckN0b3IiLCJmaWVsZFVuaXRDdG9yIiwidGFiQ3RvciIsInJlbmRlciIsInNlbGVjdG9yIiwiY2F0YWxvZyIsImVudGl0eSIsInByaW1hcnlGaWVsZE5hbWUiLCJwcmltYXJ5RmllbGRWYWx1ZSIsInNldHRpbmdzIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiY3R4IiwiZm4iLCJ0ZXh0VG9TdHJpbmciLCJzZXR1cCIsImNvbnRleHQiLCJlbGVtZW50SW5mb0NvbW1hbmRGdW5jIiwiZXhwYW5kZWRMaW5rZWRFbGVtZW50cyIsImVuYWJsZUNhY2hlIiwiZW5hYmxlQ291bnQiLCJzaG93UHJpbWFyeUZpZWxkIiwic2hvd1Rvb2xCYXIiLCJzaG93RGV0YWlscyIsInNob3dUb29scyIsImNhbkVkaXQiLCJtYXhDZWxsTGVuZ3RoIiwiY2FyZCIsImlnbm9yZWRGaWVsZHMiLCJMIiwiZm9yRWFjaCIsImV4cGFuZGVkTGlua2VkRWxlbWVudCIsInB1c2giLCJjb21tYW5kIiwiam9pbiIsImZpZWxkRWRpdG9yIiwidW5pdEVkaXRvciIsIl9yZW5kZXIiLCJnZXRQYXJlbnQiLCIkbmFtZSIsInRhYiIsImFwcGVuZEl0ZW0iLCJjbG9zYWJsZSIsImZpcnN0VmlzaWJsZSIsInNldFBhcmVudCIsIl9fcmVuZGVyIiwicmVwbGFjZUhUTUwiLCJkaWN0IiwicGF0Y2hJZCIsImNsaWNrIiwibG9jayIsInJlZnJlc2giLCJ1bmxvY2siLCJmYWlsIiwibWVzc2FnZSIsImVycm9yIiwiY2hhbmdlIiwic2V0TW9kZSIsImNyZWF0ZUNvbnRyb2wiLCJqcyIsInBhcmFtcyIsInByaW1hcnlGaWVsZCIsInJvd3NldCIsImF1dG9SZWZyZXNoIiwiY29uZmlybSIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1Y2Nlc3MiLCJmb3JtYXRUV0lHIiwiZWxlbWVudFJvd3NldCIsImxpbmtlZEVsZW1lbnRSb3dzZXQiLCJyZXNvbHZlV2l0aCIsInJlamVjdFdpdGgiLCJmaWVsZERlc2NyaXB0aW9ucyIsImpzcGF0aCIsImZpZWxkcyIsImtleVZhbE1vZGUiLCJyb3dzIiwic2hvd0VtcHR5RmllbGRzIiwicHJvcCIsImZpbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmsiLCJjdXJyZW50VGFyZ2V0IiwiaXNJbkVkaXRNb2RlIiwidGFnczEiLCJ0YWdzMiIsInRhZ3MzIiwiaGlkZSIsInNldEluRWRpdE1vZGUiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUVBQSxTQUFTLENBQUMsaUJBQUQsRUFBb0I7QUFDNUI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSGM7O0FBSzVCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVYyQjs7QUFZNUI7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsV0FBT0MsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsR0FBc0IsaURBRFEsRUFFOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix5Q0FGUSxFQUc5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLG9DQUhRO0FBSTlCO0FBQ0Esc0JBTDhCLEVBTTlCLGlC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UUFBTStCLEtBQUssR0FBRzlFLENBQUMsQ0FBQyxLQUFLc0MsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBZjtBQUVBLFFBQU15QyxLQUFLLEdBQUdELEtBQUssQ0FBQ04sSUFBTixDQUFXLFlBQVgsQ0FBZDtBQUNBLFFBQU1RLEtBQUssR0FBR0YsS0FBSyxDQUFDTixJQUFOLENBQVcsYUFBWCxDQUFkOztBQUVBLFFBQUd4RSxDQUFDLENBQUMsS0FBS3NDLE9BQUwsQ0FBYSx1Q0FBYixDQUFELENBQUQsQ0FBeURpQyxJQUF6RCxDQUE4RCxTQUE5RCxDQUFILEVBQ0E7QUFDQ1EsTUFBQUEsS0FBSyxDQUFDRSxJQUFOO0FBQ0FELE1BQUFBLEtBQUssQ0FBQ0MsSUFBTjtBQUVBLFdBQUt4RCxXQUFMLENBQWlCeUQsYUFBakIsQ0FBK0IsSUFBL0I7QUFDQSxXQUFLeEQsVUFBTCxDQUFnQndELGFBQWhCLENBQThCLElBQTlCO0FBQ0EsS0FQRCxNQVNBO0FBQ0NILE1BQUFBLEtBQUssQ0FBQ0ksSUFBTjtBQUNBSCxNQUFBQSxLQUFLLENBQUNHLElBQU47QUFFQSxXQUFLMUQsV0FBTCxDQUFpQnlELGFBQWpCLENBQStCLEtBQS9CO0FBQ0EsV0FBS3hELFVBQUwsQ0FBZ0J3RCxhQUFoQixDQUE4QixLQUE5QjtBQUNBO0FBQ0Q7QUFFRDs7QUF6YTRCLENBQXBCLENBQVQ7QUE0YUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiogQU1JIFdlYiBGcmFtZXdvcmtcbipcbiogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4qXG4qIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbipcbiovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnRWxlbWVudEluZm9DdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvRWxlbWVudEluZm8vdHdpZy9FbGVtZW50SW5mb0N0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9FbGVtZW50SW5mby90d2lnL2RldGFpbHMudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9FbGVtZW50SW5mby90d2lnL2pzLnR3aWcnLFxuXHRcdFx0LyoqL1xuXHRcdFx0J2N0cmw6ZmllbGRFZGl0b3InLFxuXHRcdFx0J2N0cmw6dW5pdEVkaXRvcicsXG5cdFx0XHQnY3RybDp0YWInLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5mcmFnbWVudEVsZW1lbnRJbmZvQ3RybCA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50RGV0YWlscyA9IGRhdGFbMV07XG5cdFx0XHR0aGlzLmZyYWdtZW50SlMgPSBkYXRhWzJdO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yQ3RvciA9IGRhdGFbM107XG5cdFx0XHR0aGlzLmZpZWxkVW5pdEN0b3IgPSBkYXRhWzRdO1xuXHRcdFx0dGhpcy50YWJDdG9yID0gZGF0YVs1XTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbihzZWxlY3RvciwgY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGROYW1lLCBwcmltYXJ5RmllbGRWYWx1ZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4ID0ge1xuXHRcdFx0Y2F0YWxvZzogY2F0YWxvZyxcblx0XHRcdGVudGl0eTogZW50aXR5LFxuXHRcdFx0cHJpbWFyeUZpZWxkTmFtZTogcHJpbWFyeUZpZWxkTmFtZSxcblx0XHRcdHByaW1hcnlGaWVsZFZhbHVlOiBwcmltYXJ5RmllbGRWYWx1ZSxcblx0XHR9O1xuXG5cdFx0Y29uc3QgZm4gPSAoY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGROYW1lLCBwcmltYXJ5RmllbGRWYWx1ZSkgPT4gJ0dldEVsZW1lbnRJbmZvIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLXByaW1hcnlGaWVsZE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGROYW1lKSArICdcIiAtcHJpbWFyeUZpZWxkVmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGRWYWx1ZSkgKyAnXCInO1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCxcblx0XHRcdGVsZW1lbnRJbmZvQ29tbWFuZEZ1bmMsXG5cdFx0XHRleHBhbmRlZExpbmtlZEVsZW1lbnRzLFxuXHRcdFx0ZW5hYmxlQ2FjaGUsIGVuYWJsZUNvdW50LCBzaG93UHJpbWFyeUZpZWxkLCBzaG93VG9vbEJhciwgc2hvd0RldGFpbHMsIHNob3dUb29scywgY2FuRWRpdCxcblx0XHRcdG1heENlbGxMZW5ndGgsXG5cdFx0XHRjYXJkXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFtcblx0XHRcdFx0J2NvbnRleHQnLFxuXHRcdFx0XHQnZWxlbWVudEluZm9Db21tYW5kRnVuYycsXG5cdFx0XHRcdCdleHBhbmRlZExpbmtlZEVsZW1lbnRzJyxcblx0XHRcdFx0J2VuYWJsZUNhY2hlJywgJ2VuYWJsZUNvdW50JywgJ3Nob3dQcmltYXJ5RmllbGQnLCAnc2hvd1Rvb2xCYXInLCAnc2hvd0RldGFpbHMnLCAnc2hvd1Rvb2xzJywgJ2NhbkVkaXQnLFxuXHRcdFx0XHQnbWF4Q2VsbExlbmd0aCcsXG5cdFx0XHRcdCdjYXJkJyxcblx0XHRcdF0sXG5cdFx0XHRbXG5cdFx0XHRcdHJlc3VsdCxcblx0XHRcdFx0Zm4sXG5cdFx0XHRcdFtdLFxuXHRcdFx0XHRmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlLFxuXHRcdFx0XHQ2NCxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5jdHguZWxlbWVudEluZm9Db21tYW5kRnVuYyA9IGVsZW1lbnRJbmZvQ29tbWFuZEZ1bmM7XG5cblx0XHR0aGlzLmN0eC5leHBhbmRlZExpbmtlZEVsZW1lbnRzID0gZXhwYW5kZWRMaW5rZWRFbGVtZW50cztcblxuXHRcdHRoaXMuY3R4LmVuYWJsZUNhY2hlID0gZW5hYmxlQ2FjaGU7XG5cdFx0dGhpcy5jdHguZW5hYmxlQ291bnQgPSBlbmFibGVDb3VudDtcblxuXHRcdHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQgPSBzaG93UHJpbWFyeUZpZWxkO1xuXHRcdHRoaXMuY3R4LnNob3dUb29sQmFyID0gc2hvd1Rvb2xCYXI7XG5cdFx0dGhpcy5jdHguc2hvd0RldGFpbHMgPSBzaG93RGV0YWlscztcblx0XHR0aGlzLmN0eC5zaG93VG9vbHMgPSBzaG93VG9vbHM7XG5cdFx0dGhpcy5jdHguY2FuRWRpdCA9IGNhbkVkaXQ7XG5cblx0XHR0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoID0gbWF4Q2VsbExlbmd0aDtcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eC5pZ25vcmVkRmllbGRzID0ge1xuXHRcdFx0J09SQUNMRV9ST1dOVU0nOiAnJyxcblx0XHRcdCdQUk9KRUNUJzogJycsXG5cdFx0XHQnUFJPQ0VTUyc6ICcnLFxuXHRcdFx0J0FNSUVOVElUWU5BTUUnOiAnJyxcblx0XHRcdCdBTUlFTEVNRU5USUQnOiAnJyxcblx0XHRcdCdBTUlDUkVBVEVEJzogJycsXG5cdFx0XHQnQU1JTEFTVE1PRElGSUVEJzogJycsXG5cdFx0XHQnQU1JU1lTREFURSc6ICcnXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0dGhpcy5jdHguZXhwYW5kZWRMaW5rZWRFbGVtZW50cy5mb3JFYWNoKChleHBhbmRlZExpbmtlZEVsZW1lbnQpID0+IHtcblxuXHRcdFx0bGV0IGNhdGFsb2cgPSBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGV4cGFuZGVkTGlua2VkRWxlbWVudC5jYXRhbG9nKTtcblx0XHRcdGxldCBlbnRpdHkgPSBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGV4cGFuZGVkTGlua2VkRWxlbWVudC5lbnRpdHkpO1xuXG5cdFx0XHRMLnB1c2goY2F0YWxvZyArICcuJyArIGVudGl0eSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmN0eC5jb21tYW5kICs9ICcgLWV4cGFuZGVkTGlua2VkRWxlbWVudHM9XCInICsgTC5qb2luKCcsJykgKyAnXCInO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmZpZWxkRWRpdG9yID0gbmV3IHRoaXMuZmllbGRFZGl0b3JDdG9yKHRoaXMsIHRoaXMpO1xuXHRcdHRoaXMudW5pdEVkaXRvciA9IG5ldyB0aGlzLmZpZWxkVW5pdEN0b3IodGhpcywgdGhpcyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdGlmKHRoaXMuZ2V0UGFyZW50KCkuJG5hbWUgIT09ICdUYWJDdHJsJylcblx0XHR7XG5cdFx0XHRjb25zdCB0YWIgPSBuZXcgdGhpcy50YWJDdG9yKG51bGwsIHRoaXMpO1xuXG5cdFx0XHR0YWIucmVuZGVyKHNlbGVjdG9yLCB0aGlzLmN0eCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGFiLmFwcGVuZEl0ZW0oJzxpIGNsYXNzPVwiZmEgZmEtYXJyb3dzLWFsdFwiPjwvaT4gJyArIHRoaXMuY3R4LmVudGl0eSwge2Nsb3NhYmxlOiBmYWxzZSwgZmlyc3RWaXNpYmxlOiBmYWxzZX0pLmRvbmUoKHNlbGVjdG9yKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFBhcmVudCh0YWIpO1xuXG5cdFx0XHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuX19yZW5kZXIocmVzdWx0LCBzZWxlY3Rvcik7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfX3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBzZWxlY3Rvcilcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudEVsZW1lbnRJbmZvQ3RybCwge2RpY3Q6IHRoaXMuY3R4fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQUNGRURGMTVfNzg5NF82RDkxX0NCRTdfRDk4QjVGN0U5QzZBJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNEOThCNkI5QV8xRDVBXzAyMUVfNUY5MF8yQjU1QTZDM0JFNzMnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBQjg0QThDQ181RTcwX0VCRTdfODc2Nl8zMTdGRUU3MUVGRTgnKSkuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnNldE1vZGUoKVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkY3RTc4ODVfREIzNF83OTkzXzlGMTdfMzc5OTBEREQ0QkYzJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAnbWVzc2FnZUJveCcsIFt0aGlzLmN0eC5jb21tYW5kXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjRjEyMzI3MTBfNDVFMl85MkJGXzczNzhfMUJDRDA1RkJGMTMxJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGV4dEJveCcsIFt0aGlzLmN0eC5qc10sIHt9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0MyOEMzM0IxXzlCQ0VfODA4Q18wRTU3XzRDODcwNDM1OTkzMicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHBhcmFtcyA9IFtcblx0XHRcdFx0XHR0aGlzLmN0eC5jYXRhbG9nLFxuXHRcdFx0XHRcdHRoaXMuY3R4LmVudGl0eSxcblx0XHRcdFx0XHR0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0XHRcdHRoaXMuY3R4LnByaW1hcnlGaWVsZFZhbHVlLFxuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdGNvbnN0IHNldHRpbmdzID0ge1xuXHRcdFx0XHRcdGVuYWJsZUNhY2hlOiB0aGlzLmN0eC5lbmFibGVDYWNoZSxcblx0XHRcdFx0XHRlbmFibGVDb3VudDogdGhpcy5jdHguZW5hYmxlQ291bnQsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdHNob3dQcmltYXJ5RmllbGQ6IHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQsXG5cdFx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRcdHNob3dEZXRhaWxzOiB0aGlzLmN0eC5zaG93RGV0YWlscyxcblx0XHRcdFx0XHRzaG93VG9vbHM6IHRoaXMuY3R4LnNob3dUb29scyxcblx0XHRcdFx0XHRjYW5FZGl0OiB0aGlzLmN0eC5jYW5FZGl0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRjYXRhbG9nOiB0aGlzLmN0eC5jYXRhbG9nLFxuXHRcdFx0XHRcdGVudGl0eTogdGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRcdHByaW1hcnlGaWVsZDogdGhpcy5jdHgucHJpbWFyeUZpZWxkLFxuXHRcdFx0XHRcdHJvd3NldDogdGhpcy5jdHgucm93c2V0LFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRtYXhDZWxsTGVuZ3RoOiB0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoLFxuXHRcdFx0XHRcdC8qKi9cblx0XHRcdFx0XHRjYXJkOiB0aGlzLmN0eC5jYXJkLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBhdXRvUmVmcmVzaCA9IGNvbmZpcm0oJ0F1dG8tcmVmcmVzaCBuZXcgd2lkZ2V0PycpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnQWRkV2lkZ2V0IC1jb250cm9sPVwiRWxlbWVudEluZm9cIiAtcGFyYW1zPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkocGFyYW1zKSkgKyAnXCIgLXNldHRpbmdzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKSArICdcIiAtdHJhbnNwYXJlbnQnICsgKGF1dG9SZWZyZXNoID8gJyAtYXV0b1JlZnJlc2gnIDogJycpKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLmN0eC5qcyA9IGFtaVdlYkFwcC5mb3JtYXRUV0lHKHRoaXMuZnJhZ21lbnRKUywgdGhpcy5jdHgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR0aGlzLnJlZnJlc2goKS5kb25lKChlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMuY3R4LmNvbnRleHQsIFtlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzXSk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0V2l0aCh0aGlzLmN0eC5jb250ZXh0LCBbbWVzc2FnZV0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZnJlc2g6IGZ1bmN0aW9uKHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoWydjb250ZXh0J10sIFtyZXN1bHRdLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQgPSB0aGlzLmN0eC5lbGVtZW50SW5mb0NvbW1hbmRGdW5jKHRoaXMuY3R4LmNhdGFsb2csIHRoaXMuY3R4LmVudGl0eSwgdGhpcy5jdHgucHJpbWFyeUZpZWxkTmFtZSwgdGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUodGhpcy5jdHguY29tbWFuZCkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBmaWVsZERlc2NyaXB0aW9ucyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGREZXNjcmlwdGlvbicsIGRhdGEpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBlbGVtZW50Um93c2V0ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJlbGVtZW50XCIgfHwgLkB0eXBlPT09XCJFbGVtZW50X0luZm9cIn0ucm93JywgZGF0YSk7IC8qIEJFUksgKi9cblxuXHRcdFx0Y29uc3QgbGlua2VkRWxlbWVudFJvd3NldCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwibGlua2VkX2VsZW1lbnRzXCIgfHwgLkB0eXBlPT09XCJFbGVtZW50X0NoaWxkXCJ9LnJvdycsIGRhdGEpOyAvKiBCRVJLICovXG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGV4cGFuZGVkTGlua2VkRWxlbWVudHMgPSBbXTtcblxuXHRcdFx0dGhpcy5jdHguZXhwYW5kZWRMaW5rZWRFbGVtZW50cy5mb3JFYWNoKChleHBhbmRlZExpbmtlZEVsZW1lbnQpID0+IHtcblxuXHRcdFx0XHRleHBhbmRlZExpbmtlZEVsZW1lbnRzLnB1c2goe1xuXHRcdFx0XHRcdGNhdGFsb2c6IGV4cGFuZGVkTGlua2VkRWxlbWVudC5jYXRhbG9nLFxuXHRcdFx0XHRcdGVudGl0eTogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmVudGl0eSxcblx0XHRcdFx0XHRmaWVsZHM6IGV4cGFuZGVkTGlua2VkRWxlbWVudC5maWVsZHMsXG5cdFx0XHRcdFx0a2V5VmFsTW9kZTogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmtleVZhbE1vZGUsXG5cdFx0XHRcdFx0cm93czogYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCInICsgZXhwYW5kZWRMaW5rZWRFbGVtZW50LmVudGl0eSArICdcIn0ucm93JywgZGF0YSksXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdGNhdGFsb2c6IHRoaXMuY3R4LmNhdGFsb2csXG5cdFx0XHRcdGVudGl0eTogdGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRwcmltYXJ5RmllbGROYW1lOiB0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0XHRwcmltYXJ5RmllbGRWYWx1ZTogdGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0ZmllbGREZXNjcmlwdGlvbnM6IGZpZWxkRGVzY3JpcHRpb25zLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdGVsZW1lbnRSb3dzZXQ6IGVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGxpbmtlZEVsZW1lbnRSb3dzZXQ6IGxpbmtlZEVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGV4cGFuZGVkTGlua2VkRWxlbWVudHM6IGV4cGFuZGVkTGlua2VkRWxlbWVudHMsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRpZ25vcmVkRmllbGRzOiB0aGlzLmN0eC5pZ25vcmVkRmllbGRzLFxuXHRcdFx0XHRzaG93RW1wdHlGaWVsZHM6ICQodGhpcy5wYXRjaElkKCcjRDk4QjZCOUFfMUQ1QV8wMjFFXzVGOTBfMkI1NUE2QzNCRTczJykpLnByb3AoJ2NoZWNrZWQnKSxcblx0XHRcdFx0LyoqL1xuXHRcdFx0XHRtYXhDZWxsTGVuZ3RoOiB0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoLFxuXHRcdFx0fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNCQkQzOTFDN183NTlEXzAxRERfRTIzNF80ODhENDY1MDQ2MzgnKSwgdGhpcy5mcmFnbWVudERldGFpbHMsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0dXAodGhpcy5wYXRjaElkKCcjQkJEMzkxQzdfNzU5RF8wMUREX0UyMzRfNDg4RDQ2NTA0NjM4JyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY3R4KTtcblx0XHRcdFx0dGhpcy51bml0RWRpdG9yLnNldHVwKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCQkQzOTFDN183NTlEXzAxRERfRTIzNF80ODhENDY1MDQ2MzgnKSkuZmluZCgnW2RhdGEtY3RybF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsodGhpcy5nZXRQYXJlbnQoKSwgZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmN0eCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2ZpZWxkRGVzY3JpcHRpb25zLCBlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aXNJbkVkaXRNb2RlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maWVsZEVkaXRvci5pc0luRWRpdE1vZGUoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TW9kZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgdGFnczEgPSAkKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpKTtcblxuXHRcdGNvbnN0IHRhZ3MyID0gdGFnczEuZmluZCgnLnZpZXctbW9yZScpO1xuXHRcdGNvbnN0IHRhZ3MzID0gdGFnczEuZmluZCgnLnZpZXctbWVkaWEnKTtcblxuXHRcdGlmKCQodGhpcy5wYXRjaElkKCcjQUI4NEE4Q0NfNUU3MF9FQkU3Xzg3NjZfMzE3RkVFNzFFRkU4JykpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHR0YWdzMi5oaWRlKCk7XG5cdFx0XHR0YWdzMy5oaWRlKCk7XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0SW5FZGl0TW9kZSh0cnVlKTtcblx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXRJbkVkaXRNb2RlKHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGFnczIuc2hvdygpO1xuXHRcdFx0dGFnczMuc2hvdygpO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdFx0dGhpcy51bml0RWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
