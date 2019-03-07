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
    'ctrl:FieldEditor', 'ctrl:tab']).done(function (data) {
      _this.fragmentElementInfoCtrl = data[0];
      _this.fragmentDetails = data[1];
      _this.fragmentJS = data[2];
      _this.fieldEditorCtor = data[3];
      _this.tabCtor = data[4];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, catalog, entity, primaryFieldName, primaryFieldValue, settings) {
    var _this2 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    this.ctx = {
      isEmbedded: amiWebApp.isEmbedded(),
      endpoint: amiCommand.endpoint,

      /**/
      catalog: catalog,
      entity: entity,
      primaryFieldName: primaryFieldName,
      primaryFieldValue: primaryFieldValue,
      showEmptyFields: false,
      inEditMode: false
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

    this.fieldEditor = new this.fieldEditorCtor(this, this);
    /*-----------------------------------------------------------------*/

    var L = [];
    this.ctx.expandedLinkedElements.forEach(function (expandedLinkedElement) {
      var catalog = expandedLinkedElement.catalog;
      var entity = expandedLinkedElement.entity;
      L.push(catalog + '.' + entity);
    });
    this.ctx.command += ' -expandedLinkedElements="' + L.join(',') + '"';
    /*-----------------------------------------------------------------*/

    this.replaceHTML(selector, this.fragmentElementInfoCtrl, {
      dict: this.ctx
    }).done(function () {
      /*-------------------------------------------------------------*/
      $(_this2.patchId('#ACFEDF15_7894_6D91_CBE7_D98B5F7E9C6A')).click(function () {
        _this2.refresh();
      });
      /*-------------------------------------------------------------*/

      $(_this2.patchId('#D98B6B9A_1D5A_021E_5F90_2B55A6C3BE73')).change(function (e) {
        _this2.ctx.showEmptyFields = $(e.target).prop('checked');

        _this2.refresh();
      });
      $(_this2.patchId('#DDC32238_DD25_8354_AC6C_F6E27CA6E18D')).change(function () {
        _this2.setMode();
      });
      /*-------------------------------------------------------------*/

      $(_this2.patchId('#BF7E7885_DB34_7993_9F17_37990DDD4BF3')).click(function () {
        amiWebApp.createControl(_this2.getParent(), _this2, 'messageBox', [_this2.ctx.command], {});
      });
      $(_this2.patchId('#F1232710_45E2_92BF_7378_1BCD05FBF131')).click(function () {
        amiWebApp.createControl(_this2.getParent(), _this2, 'textBox', [_this2.ctx.js], {});
      });
      /*-------------------------------------------------------------*/

      _this2.ctx.js = amiWebApp.formatTWIG(_this2.fragmentJS, _this2.ctx);
      /*-------------------------------------------------------------*/

      _this2.refresh().done(function (elementRowset, linkedElementRowset, expandedLinkedElements) {
        result.resolveWith(_this2.ctx.context, [elementRowset, linkedElementRowset, expandedLinkedElements]);
      }).fail(function (message) {
        result.rejectWith(_this2.ctx.context, [message]);
      });
      /*-------------------------------------------------------------*/

    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh(settings) {
    var _this3 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup2 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup2[0];
    /*-----------------------------------------------------------------*/


    this.ctx.command = this.ctx.elementInfoCommandFunc(this.ctx.catalog, this.ctx.entity, this.ctx.primaryFieldName, this.ctx.primaryFieldValue);
    /*-----------------------------------------------------------------*/

    amiWebApp.lock();
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

      _this3.ctx.expandedLinkedElements.forEach(function (expandedLinkedElement) {
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
        fieldDescriptions: fieldDescriptions,
        elementRowset: elementRowset,
        linkedElementRowset: linkedElementRowset,
        expandedLinkedElements: expandedLinkedElements,
        showEmptyFields: _this3.ctx.showEmptyFields
      };
      /*-------------------------------------------------------------*/

      _this3.replaceHTML(_this3.patchId('#BBD391C7_759D_01DD_E234_488D46504638'), _this3.fragmentDetails, {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
        _this3.fieldEditor.setup(_this3.patchId('#FEF9E8D8_D4AB_B545_B394_C12DD5817D61'), _this3.ctx.primaryField, _this3.ctx);
        /*---------------------------------------------------------*/


        $(_this3.patchId('#BBD391C7_759D_01DD_E234_488D46504638')).find('a[data-ctrl]').click(function (e) {
          e.preventDefault();

          _this3.createControlFromWebLink(_this3.getParent(), e.currentTarget, _this3.ctx);
        });
        /*---------------------------------------------------------*/

        result.resolveWith(context, [elementRowset, linkedElementRowset, expandedLinkedElements]);
        amiWebApp.unlock();
      });
      /*-------------------------------------------------------------*/

    }).fail(function (data, message) {
      result.rejectWith(context, [message]);
      amiWebApp.error(message, true);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  isInEditMode: function isInEditMode() {
    return this.ctx.inEditMode;
  },

  /*---------------------------------------------------------------------*/
  setMode: function setMode() {
    var tags1 = $(this.patchId('#BBD391C7_759D_01DD_E234_488D46504638 .edit-mode'));

    if ($(this.patchId('#AB84A8CC_5E70_EBE7_8766_317FEE71EFE8')).prop('checked')) {
      this.fieldEditor.setInEditMode(true);
    } else {
      this.fieldEditor.setInEditMode(false);
    }
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
