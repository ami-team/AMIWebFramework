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

    var L = [];
    this.ctx.expandedLinkedElements.forEach(function (expandedLinkedElement) {
      var catalog = expandedLinkedElement.catalog;
      var entity = expandedLinkedElement.entity;
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

        /**/
        fieldDescriptions: fieldDescriptions,

        /**/
        elementRowset: elementRowset,
        linkedElementRowset: linkedElementRowset,
        expandedLinkedElements: expandedLinkedElements,

        /**/
        showToolBar: _this4.ctx.showToolBar,
        primaryFieldName: _this4.ctx.primaryFieldName,
        primaryFieldValue: _this4.ctx.primaryFieldValue,

        /**/
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

        result.resolveWith(context, [elementRowset, linkedElementRowset, expandedLinkedElements]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVsZW1lbnRJbmZvQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiZG9uZSIsImRhdGEiLCJmcmFnbWVudEVsZW1lbnRJbmZvQ3RybCIsImZyYWdtZW50RGV0YWlscyIsImZyYWdtZW50SlMiLCJmaWVsZEVkaXRvckN0b3IiLCJmaWVsZFVuaXRDdG9yIiwidGFiQ3RvciIsInJlbmRlciIsInNlbGVjdG9yIiwiY2F0YWxvZyIsImVudGl0eSIsInByaW1hcnlGaWVsZE5hbWUiLCJwcmltYXJ5RmllbGRWYWx1ZSIsInNldHRpbmdzIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiY3R4IiwiZm4iLCJ0ZXh0VG9TdHJpbmciLCJzZXR1cCIsImNvbnRleHQiLCJlbGVtZW50SW5mb0NvbW1hbmRGdW5jIiwiZXhwYW5kZWRMaW5rZWRFbGVtZW50cyIsImVuYWJsZUNhY2hlIiwiZW5hYmxlQ291bnQiLCJzaG93UHJpbWFyeUZpZWxkIiwic2hvd1Rvb2xCYXIiLCJzaG93RGV0YWlscyIsInNob3dUb29scyIsImNhbkVkaXQiLCJtYXhDZWxsTGVuZ3RoIiwiY2FyZCIsIkwiLCJmb3JFYWNoIiwiZXhwYW5kZWRMaW5rZWRFbGVtZW50IiwicHVzaCIsImNvbW1hbmQiLCJqb2luIiwiZmllbGRFZGl0b3IiLCJ1bml0RWRpdG9yIiwiX3JlbmRlciIsImdldFBhcmVudCIsIiRuYW1lIiwidGFiIiwiYXBwZW5kSXRlbSIsImNsb3NhYmxlIiwiZmlyc3RWaXNpYmxlIiwic2V0UGFyZW50IiwiX19yZW5kZXIiLCJyZXBsYWNlSFRNTCIsImRpY3QiLCJwYXRjaElkIiwiY2xpY2siLCJsb2NrIiwicmVmcmVzaCIsInVubG9jayIsImZhaWwiLCJtZXNzYWdlIiwiZXJyb3IiLCJjaGFuZ2UiLCJzZXRNb2RlIiwiY3JlYXRlQ29udHJvbCIsImpzIiwicGFyYW1zIiwicHJpbWFyeUZpZWxkIiwicm93c2V0IiwiYXV0b1JlZnJlc2giLCJjb25maXJtIiwiYW1pQ29tbWFuZCIsImV4ZWN1dGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZvcm1hdFRXSUciLCJlbGVtZW50Um93c2V0IiwibGlua2VkRWxlbWVudFJvd3NldCIsInJlc29sdmVXaXRoIiwicmVqZWN0V2l0aCIsImZpZWxkRGVzY3JpcHRpb25zIiwianNwYXRoIiwiZmllbGRzIiwia2V5VmFsTW9kZSIsInJvd3MiLCJzaG93RW1wdHlGaWVsZHMiLCJwcm9wIiwiZmluZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayIsImN1cnJlbnRUYXJnZXQiLCJpc0luRWRpdE1vZGUiLCJ0YWdzMSIsInRhZ3MyIiwidGFnczMiLCJoaWRlIiwic2V0SW5FZGl0TW9kZSIsInNob3ciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBO0FBRUFBLFNBQVMsQ0FBQyxpQkFBRCxFQUFvQjtBQUM1QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsT0FIYzs7QUFLNUI7QUFFQUMsRUFBQUEsS0FBSyxFQUFFLGVBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQ1A7QUFDQyxTQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNBLEdBVjJCOztBQVk1QjtBQUVBRSxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxXQUFPQyxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixpREFEUSxFQUU5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLHlDQUZRLEVBRzlCRixTQUFTLENBQUNFLFNBQVYsR0FBc0Isb0NBSFE7QUFJOUI7QUFDQSxzQkFMOEIsRUFNOUIsaUJBTjhCLEVBTzlCLFVBUDhC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QUVBLFdBQUt4RCxXQUFMLENBQWlCeUQsYUFBakIsQ0FBK0IsSUFBL0I7QUFDQSxXQUFLeEQsVUFBTCxDQUFnQndELGFBQWhCLENBQThCLElBQTlCO0FBQ0EsS0FQRCxNQVNBO0FBQ0NILE1BQUFBLEtBQUssQ0FBQ0ksSUFBTjtBQUNBSCxNQUFBQSxLQUFLLENBQUNHLElBQU47QUFFQSxXQUFLMUQsV0FBTCxDQUFpQnlELGFBQWpCLENBQStCLEtBQS9CO0FBQ0EsV0FBS3hELFVBQUwsQ0FBZ0J3RCxhQUFoQixDQUE4QixLQUE5QjtBQUNBO0FBQ0Q7QUFFRDs7QUE1WjRCLENBQXBCLENBQVQ7QUErWkEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiogQU1JIFdlYiBGcmFtZXdvcmtcbipcbiogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4qXG4qIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbipcbiovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnRWxlbWVudEluZm9DdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvRWxlbWVudEluZm8vdHdpZy9FbGVtZW50SW5mb0N0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9FbGVtZW50SW5mby90d2lnL2RldGFpbHMudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9FbGVtZW50SW5mby90d2lnL2pzLnR3aWcnLFxuXHRcdFx0LyoqL1xuXHRcdFx0J2N0cmw6ZmllbGRFZGl0b3InLFxuXHRcdFx0J2N0cmw6dW5pdEVkaXRvcicsXG5cdFx0XHQnY3RybDp0YWInLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5mcmFnbWVudEVsZW1lbnRJbmZvQ3RybCA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50RGV0YWlscyA9IGRhdGFbMV07XG5cdFx0XHR0aGlzLmZyYWdtZW50SlMgPSBkYXRhWzJdO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yQ3RvciA9IGRhdGFbM107XG5cdFx0XHR0aGlzLmZpZWxkVW5pdEN0b3IgPSBkYXRhWzRdO1xuXHRcdFx0dGhpcy50YWJDdG9yID0gZGF0YVs1XTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbihzZWxlY3RvciwgY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGROYW1lLCBwcmltYXJ5RmllbGRWYWx1ZSwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY3R4ID0ge1xuXHRcdFx0Y2F0YWxvZzogY2F0YWxvZyxcblx0XHRcdGVudGl0eTogZW50aXR5LFxuXHRcdFx0cHJpbWFyeUZpZWxkTmFtZTogcHJpbWFyeUZpZWxkTmFtZSxcblx0XHRcdHByaW1hcnlGaWVsZFZhbHVlOiBwcmltYXJ5RmllbGRWYWx1ZSxcblx0XHR9O1xuXG5cdFx0Y29uc3QgZm4gPSAoY2F0YWxvZywgZW50aXR5LCBwcmltYXJ5RmllbGROYW1lLCBwcmltYXJ5RmllbGRWYWx1ZSkgPT4gJ0dldEVsZW1lbnRJbmZvIC1jYXRhbG9nPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoY2F0YWxvZykgKyAnXCIgLWVudGl0eT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKGVudGl0eSkgKyAnXCIgLXByaW1hcnlGaWVsZE5hbWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGROYW1lKSArICdcIiAtcHJpbWFyeUZpZWxkVmFsdWU9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhwcmltYXJ5RmllbGRWYWx1ZSkgKyAnXCInO1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCxcblx0XHRcdGVsZW1lbnRJbmZvQ29tbWFuZEZ1bmMsXG5cdFx0XHRleHBhbmRlZExpbmtlZEVsZW1lbnRzLFxuXHRcdFx0ZW5hYmxlQ2FjaGUsIGVuYWJsZUNvdW50LCBzaG93UHJpbWFyeUZpZWxkLCBzaG93VG9vbEJhciwgc2hvd0RldGFpbHMsIHNob3dUb29scywgY2FuRWRpdCxcblx0XHRcdG1heENlbGxMZW5ndGgsXG5cdFx0XHRjYXJkXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFtcblx0XHRcdFx0J2NvbnRleHQnLFxuXHRcdFx0XHQnZWxlbWVudEluZm9Db21tYW5kRnVuYycsXG5cdFx0XHRcdCdleHBhbmRlZExpbmtlZEVsZW1lbnRzJyxcblx0XHRcdFx0J2VuYWJsZUNhY2hlJywgJ2VuYWJsZUNvdW50JywgJ3Nob3dQcmltYXJ5RmllbGQnLCAnc2hvd1Rvb2xCYXInLCAnc2hvd0RldGFpbHMnLCAnc2hvd1Rvb2xzJywgJ2NhbkVkaXQnLFxuXHRcdFx0XHQnbWF4Q2VsbExlbmd0aCcsXG5cdFx0XHRcdCdjYXJkJyxcblx0XHRcdF0sXG5cdFx0XHRbXG5cdFx0XHRcdHJlc3VsdCxcblx0XHRcdFx0Zm4sXG5cdFx0XHRcdFtdLFxuXHRcdFx0XHRmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlLFxuXHRcdFx0XHQ2NCxcblx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0dGhpcy5jdHguZWxlbWVudEluZm9Db21tYW5kRnVuYyA9IGVsZW1lbnRJbmZvQ29tbWFuZEZ1bmM7XG5cblx0XHR0aGlzLmN0eC5leHBhbmRlZExpbmtlZEVsZW1lbnRzID0gZXhwYW5kZWRMaW5rZWRFbGVtZW50cztcblxuXHRcdHRoaXMuY3R4LmVuYWJsZUNhY2hlID0gZW5hYmxlQ2FjaGU7XG5cdFx0dGhpcy5jdHguZW5hYmxlQ291bnQgPSBlbmFibGVDb3VudDtcblxuXHRcdHRoaXMuY3R4LnNob3dQcmltYXJ5RmllbGQgPSBzaG93UHJpbWFyeUZpZWxkO1xuXHRcdHRoaXMuY3R4LnNob3dUb29sQmFyID0gc2hvd1Rvb2xCYXI7XG5cdFx0dGhpcy5jdHguc2hvd0RldGFpbHMgPSBzaG93RGV0YWlscztcblx0XHR0aGlzLmN0eC5zaG93VG9vbHMgPSBzaG93VG9vbHM7XG5cdFx0dGhpcy5jdHguY2FuRWRpdCA9IGNhbkVkaXQ7XG5cblx0XHR0aGlzLmN0eC5tYXhDZWxsTGVuZ3RoID0gbWF4Q2VsbExlbmd0aDtcblxuXHRcdHRoaXMuY3R4LmNhcmQgPSBjYXJkO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBMID0gW107XG5cblx0XHR0aGlzLmN0eC5leHBhbmRlZExpbmtlZEVsZW1lbnRzLmZvckVhY2goKGV4cGFuZGVkTGlua2VkRWxlbWVudCkgPT4ge1xuXG5cdFx0XHRsZXQgY2F0YWxvZyA9IGV4cGFuZGVkTGlua2VkRWxlbWVudC5jYXRhbG9nO1xuXHRcdFx0bGV0IGVudGl0eSA9IGV4cGFuZGVkTGlua2VkRWxlbWVudC5lbnRpdHk7XG5cblx0XHRcdEwucHVzaChjYXRhbG9nICsgJy4nICsgZW50aXR5KTtcblx0XHR9KTtcblxuXHRcdHRoaXMuY3R4LmNvbW1hbmQgKz0gJyAtZXhwYW5kZWRMaW5rZWRFbGVtZW50cz1cIicgKyBMLmpvaW4oJywnKSArICdcIic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuZmllbGRFZGl0b3IgPSBuZXcgdGhpcy5maWVsZEVkaXRvckN0b3IodGhpcywgdGhpcyk7XG5cdFx0dGhpcy51bml0RWRpdG9yID0gbmV3IHRoaXMuZmllbGRVbml0Q3Rvcih0aGlzLCB0aGlzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0aWYodGhpcy5nZXRQYXJlbnQoKS4kbmFtZSAhPT0gJ1RhYkN0cmwnKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRhYiA9IG5ldyB0aGlzLnRhYkN0b3IobnVsbCwgdGhpcyk7XG5cblx0XHRcdHRhYi5yZW5kZXIoc2VsZWN0b3IsIHRoaXMuY3R4KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0YWIuYXBwZW5kSXRlbSgnPGkgY2xhc3M9XCJmYSBmYS1hcnJvd3MtYWx0XCI+PC9pPiAnICsgdGhpcy5jdHguZW50aXR5LCB7Y2xvc2FibGU6IGZhbHNlLCBmaXJzdFZpc2libGU6IGZhbHNlfSkuZG9uZSgoc2VsZWN0b3IpID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0UGFyZW50KHRhYik7XG5cblx0XHRcdFx0XHR0aGlzLl9fcmVuZGVyKHJlc3VsdCwgc2VsZWN0b3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5fX3JlbmRlcihyZXN1bHQsIHNlbGVjdG9yKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9fcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIHNlbGVjdG9yKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJlcGxhY2VIVE1MKHNlbGVjdG9yLCB0aGlzLmZyYWdtZW50RWxlbWVudEluZm9DdHJsLCB7ZGljdDogdGhpcy5jdHh9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBQ0ZFREYxNV83ODk0XzZEOTFfQ0JFN19EOThCNUY3RTlDNkEnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0Q5OEI2QjlBXzFENUFfMDIxRV81RjkwXzJCNTVBNkMzQkU3MycpKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdFx0dGhpcy5yZWZyZXNoKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0FCODRBOENDXzVFNzBfRUJFN184NzY2XzMxN0ZFRTcxRUZFOCcpKS5jaGFuZ2UoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMuc2V0TW9kZSgpXG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCRjdFNzg4NV9EQjM0Xzc5OTNfOUYxN18zNzk5MERERDRCRjMnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICdtZXNzYWdlQm94JywgW3RoaXMuY3R4LmNvbW1hbmRdLCB7fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGMTIzMjcxMF80NUUyXzkyQkZfNzM3OF8xQkNEMDVGQkYxMzEnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMuZ2V0UGFyZW50KCksIHRoaXMsICd0ZXh0Qm94JywgW3RoaXMuY3R4LmpzXSwge30pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQzI4QzMzQjFfOUJDRV84MDhDXzBFNTdfNEM4NzA0MzU5OTMyJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFyYW1zID0gW1xuXHRcdFx0XHRcdHRoaXMuY3R4LmNhdGFsb2csXG5cdFx0XHRcdFx0dGhpcy5jdHguZW50aXR5LFxuXHRcdFx0XHRcdHRoaXMuY3R4LnByaW1hcnlGaWVsZE5hbWUsXG5cdFx0XHRcdFx0dGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUsXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0Y29uc3Qgc2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0ZW5hYmxlQ2FjaGU6IHRoaXMuY3R4LmVuYWJsZUNhY2hlLFxuXHRcdFx0XHRcdGVuYWJsZUNvdW50OiB0aGlzLmN0eC5lbmFibGVDb3VudCxcblx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0c2hvd1ByaW1hcnlGaWVsZDogdGhpcy5jdHguc2hvd1ByaW1hcnlGaWVsZCxcblx0XHRcdFx0XHRzaG93VG9vbEJhcjogdGhpcy5jdHguc2hvd1Rvb2xCYXIsXG5cdFx0XHRcdFx0c2hvd0RldGFpbHM6IHRoaXMuY3R4LnNob3dEZXRhaWxzLFxuXHRcdFx0XHRcdHNob3dUb29sczogdGhpcy5jdHguc2hvd1Rvb2xzLFxuXHRcdFx0XHRcdGNhbkVkaXQ6IHRoaXMuY3R4LmNhbkVkaXQsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdGNhdGFsb2c6IHRoaXMuY3R4LmNhdGFsb2csXG5cdFx0XHRcdFx0ZW50aXR5OiB0aGlzLmN0eC5lbnRpdHksXG5cdFx0XHRcdFx0cHJpbWFyeUZpZWxkOiB0aGlzLmN0eC5wcmltYXJ5RmllbGQsXG5cdFx0XHRcdFx0cm93c2V0OiB0aGlzLmN0eC5yb3dzZXQsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdG1heENlbGxMZW5ndGg6IHRoaXMuY3R4Lm1heENlbGxMZW5ndGgsXG5cdFx0XHRcdFx0LyoqL1xuXHRcdFx0XHRcdGNhcmQ6IHRoaXMuY3R4LmNhcmQsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGF1dG9SZWZyZXNoID0gY29uZmlybSgnQXV0by1yZWZyZXNoIG5ldyB3aWRnZXQ/Jyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdBZGRXaWRnZXQgLWNvbnRyb2w9XCJFbGVtZW50SW5mb1wiIC1wYXJhbXM9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKSArICdcIiAtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpICsgJ1wiIC10cmFuc3BhcmVudCcgKyAoYXV0b1JlZnJlc2ggPyAnIC1hdXRvUmVmcmVzaCcgOiAnJykpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UpO1xuXG5cdFx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMuY3R4LmpzID0gYW1pV2ViQXBwLmZvcm1hdFRXSUcodGhpcy5mcmFnbWVudEpTLCB0aGlzLmN0eCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMucmVmcmVzaCgpLmRvbmUoKGVsZW1lbnRSb3dzZXQsIGxpbmtlZEVsZW1lbnRSb3dzZXQsIGV4cGFuZGVkTGlua2VkRWxlbWVudHMpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgodGhpcy5jdHguY29udGV4dCwgW2VsZW1lbnRSb3dzZXQsIGxpbmtlZEVsZW1lbnRSb3dzZXQsIGV4cGFuZGVkTGlua2VkRWxlbWVudHNdKTtcblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3RXaXRoKHRoaXMuY3R4LmNvbnRleHQsIFttZXNzYWdlXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVmcmVzaDogZnVuY3Rpb24oc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChbJ2NvbnRleHQnXSwgW3Jlc3VsdF0sIHNldHRpbmdzKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5jdHguY29tbWFuZCA9IHRoaXMuY3R4LmVsZW1lbnRJbmZvQ29tbWFuZEZ1bmModGhpcy5jdHguY2F0YWxvZywgdGhpcy5jdHguZW50aXR5LCB0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLCB0aGlzLmN0eC5wcmltYXJ5RmllbGRWYWx1ZSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSh0aGlzLmN0eC5jb21tYW5kKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGZpZWxkRGVzY3JpcHRpb25zID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZERlc2NyaXB0aW9uJywgZGF0YSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGVsZW1lbnRSb3dzZXQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImVsZW1lbnRcIiB8fCAuQHR5cGU9PT1cIkVsZW1lbnRfSW5mb1wifS5yb3cnLCBkYXRhKTsgLyogQkVSSyAqL1xuXG5cdFx0XHRjb25zdCBsaW5rZWRFbGVtZW50Um93c2V0ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJsaW5rZWRfZWxlbWVudHNcIiB8fCAuQHR5cGU9PT1cIkVsZW1lbnRfQ2hpbGRcIn0ucm93JywgZGF0YSk7IC8qIEJFUksgKi9cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZXhwYW5kZWRMaW5rZWRFbGVtZW50cyA9IFtdO1xuXG5cdFx0XHR0aGlzLmN0eC5leHBhbmRlZExpbmtlZEVsZW1lbnRzLmZvckVhY2goKGV4cGFuZGVkTGlua2VkRWxlbWVudCkgPT4ge1xuXG5cdFx0XHRcdGV4cGFuZGVkTGlua2VkRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdFx0Y2F0YWxvZzogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmNhdGFsb2csXG5cdFx0XHRcdFx0ZW50aXR5OiBleHBhbmRlZExpbmtlZEVsZW1lbnQuZW50aXR5LFxuXHRcdFx0XHRcdGZpZWxkczogZXhwYW5kZWRMaW5rZWRFbGVtZW50LmZpZWxkcyxcblx0XHRcdFx0XHRrZXlWYWxNb2RlOiBleHBhbmRlZExpbmtlZEVsZW1lbnQua2V5VmFsTW9kZSxcblx0XHRcdFx0XHRyb3dzOiBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cIicgKyBleHBhbmRlZExpbmtlZEVsZW1lbnQuZW50aXR5ICsgJ1wifS5yb3cnLCBkYXRhKSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0Y2F0YWxvZzogdGhpcy5jdHguY2F0YWxvZyxcblx0XHRcdFx0ZW50aXR5OiB0aGlzLmN0eC5lbnRpdHksXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0ZmllbGREZXNjcmlwdGlvbnM6IGZpZWxkRGVzY3JpcHRpb25zLFxuXHRcdFx0XHQvKiovXG5cdFx0XHRcdGVsZW1lbnRSb3dzZXQ6IGVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGxpbmtlZEVsZW1lbnRSb3dzZXQ6IGxpbmtlZEVsZW1lbnRSb3dzZXQsXG5cdFx0XHRcdGV4cGFuZGVkTGlua2VkRWxlbWVudHM6IGV4cGFuZGVkTGlua2VkRWxlbWVudHMsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0c2hvd1Rvb2xCYXI6IHRoaXMuY3R4LnNob3dUb29sQmFyLFxuXHRcdFx0XHRwcmltYXJ5RmllbGROYW1lOiB0aGlzLmN0eC5wcmltYXJ5RmllbGROYW1lLFxuXHRcdFx0XHRwcmltYXJ5RmllbGRWYWx1ZTogdGhpcy5jdHgucHJpbWFyeUZpZWxkVmFsdWUsXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0c2hvd0VtcHR5RmllbGRzOiAkKHRoaXMucGF0Y2hJZCgnI0Q5OEI2QjlBXzFENUFfMDIxRV81RjkwXzJCNTVBNkMzQkU3MycpKS5wcm9wKCdjaGVja2VkJyksXG5cdFx0XHRcdC8qKi9cblx0XHRcdFx0bWF4Q2VsbExlbmd0aDogdGhpcy5jdHgubWF4Q2VsbExlbmd0aCxcblx0XHRcdH07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHRoaXMucmVwbGFjZUhUTUwodGhpcy5wYXRjaElkKCcjQkJEMzkxQzdfNzU5RF8wMUREX0UyMzRfNDg4RDQ2NTA0NjM4JyksIHRoaXMuZnJhZ21lbnREZXRhaWxzLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldHVwKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmN0eCk7XG5cdFx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXR1cCh0aGlzLnBhdGNoSWQoJyNCQkQzOTFDN183NTlEXzAxRERfRTIzNF80ODhENDY1MDQ2MzgnKSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQkJEMzkxQzdfNzU5RF8wMUREX0UyMzRfNDg4RDQ2NTA0NjM4JykpLmZpbmQoJ1tkYXRhLWN0cmxdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHRoaXMuZ2V0UGFyZW50KCksIGUuY3VycmVudFRhcmdldCwgdGhpcy5jdHgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtlbGVtZW50Um93c2V0LCBsaW5rZWRFbGVtZW50Um93c2V0LCBleHBhbmRlZExpbmtlZEVsZW1lbnRzXSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW21lc3NhZ2VdKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aXNJbkVkaXRNb2RlOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5maWVsZEVkaXRvci5pc0luRWRpdE1vZGUoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TW9kZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgdGFnczEgPSAkKHRoaXMucGF0Y2hJZCgnI0JCRDM5MUM3Xzc1OURfMDFERF9FMjM0XzQ4OEQ0NjUwNDYzOCcpKTtcblxuXHRcdGNvbnN0IHRhZ3MyID0gdGFnczEuZmluZCgnLnZpZXctbW9yZScpO1xuXHRcdGNvbnN0IHRhZ3MzID0gdGFnczEuZmluZCgnLnZpZXctbWVkaWEnKTtcblxuXHRcdGlmKCQodGhpcy5wYXRjaElkKCcjQUI4NEE4Q0NfNUU3MF9FQkU3Xzg3NjZfMzE3RkVFNzFFRkU4JykpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHR7XG5cdFx0XHR0YWdzMi5oaWRlKCk7XG5cdFx0XHR0YWdzMy5oaWRlKCk7XG5cblx0XHRcdHRoaXMuZmllbGRFZGl0b3Iuc2V0SW5FZGl0TW9kZSh0cnVlKTtcblx0XHRcdHRoaXMudW5pdEVkaXRvci5zZXRJbkVkaXRNb2RlKHRydWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGFnczIuc2hvdygpO1xuXHRcdFx0dGFnczMuc2hvdygpO1xuXG5cdFx0XHR0aGlzLmZpZWxkRWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdFx0dGhpcy51bml0RWRpdG9yLnNldEluRWRpdE1vZGUoZmFsc2UpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
