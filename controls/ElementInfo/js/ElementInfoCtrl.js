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
    'ctrl:fieldEditor', 'ctrl:tab']).done(function (data) {
      _this.fragmentElementInfoCtrl = data[0];
      _this.fragmentDetails = data[1];
      _this.fragmentJS = data[2];
      _this.fieldEditorCtor = data[3];
      _this.tabCtor = data[4];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    this.ctx = {
      isEmbedded: amiWebApp.isEmbedded(),
      endpoint: amiCommand.endpoint,

      /**/
      catalog: catalog,
      entity: entity,
      primaryFieldName: primaryFieldName,
      primaryFieldValue: primaryFieldValue
    };

    var fn = function fn(catalog, entity, primaryFieldName, primaryFieldValue) {
      return 'GetElementInfo -catalog="' + amiWebApp.textToString(catalog) + '" -entity="' + amiWebApp.textToString(entity) + '" -primaryFieldName="' + amiWebApp.textToString(primaryFieldName) + '" -primaryFieldValue="' + amiWebApp.textToString(primaryFieldValue) + '"';
    };

    var _amiWebApp$setup = amiWebApp.setup(['context', 'elementInfoCommandFunc', 'expandedLinkedElements', 'enableCache', 'showToolBar', 'showDetails', 'showTools', 'canEdit', 'start', 'stop', 'orderBy', 'orderWay', 'card'], [result, fn, [], false, true, false, true, false, 1, 10, '', '', false], settings),
        context = _amiWebApp$setup[0],
        elementInfoCommandFunc = _amiWebApp$setup[1],
        expandedLinkedElements = _amiWebApp$setup[2],
        enableCache = _amiWebApp$setup[3],
        showToolBar = _amiWebApp$setup[4],
        showDetails = _amiWebApp$setup[5],
        showTools = _amiWebApp$setup[6],
        canEdit = _amiWebApp$setup[7],
        start = _amiWebApp$setup[8],
        stop = _amiWebApp$setup[9],
        orderBy = _amiWebApp$setup[10],
        orderWay = _amiWebApp$setup[11],
        card = _amiWebApp$setup[12];

    this.ctx.elementInfoCommandFunc = elementInfoCommandFunc;
    this.ctx.expandedLinkedElements = expandedLinkedElements;
    this.ctx.enableCache = enableCache;
    this.ctx.showToolBar = showToolBar;
    this.ctx.showDetails = showDetails;
    this.ctx.showTools = showTools;
    this.ctx.canEdit = canEdit;
    this.ctx.start = start;
    this.ctx.stop = stop;
    this.ctx.orderBy = orderBy;
    this.ctx.orderWay = orderWay;
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
          closable: false
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
        primaryFieldValue: _this4.ctx.primaryFieldValue,

        /**/
        showEmptyFields: $(_this4.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).prop('checked')
      };
      /*-------------------------------------------------------------*/

      _this4.replaceHTML(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), _this4.fragmentDetails, {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
        _this4.fieldEditor.setup(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), _this4.ctx.primaryFieldName, _this4.ctx);
        /*---------------------------------------------------------*/


        $(_this4.patchId('#BBD391C7_759D_01DD_E234_488D46504638')).find('a[data-ctrl]').click(function (e) {
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
    if ($(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).prop('checked')) {
      this.fieldEditor.setInEditMode(true);
    } else {
      this.fieldEditor.setInEditMode(false);
    }
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
