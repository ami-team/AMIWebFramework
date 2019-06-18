/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('MediaViewerCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/MediaViewer/twig/MediaViewerCtrl.twig']).done(function (data) {
      _this.fragmentMediaViewerCtrl = data[0];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, catalog, entity, primaryFieldName, primaryFieldValue, field, base64, mime, settings) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    this.ctx = {
      catalog: catalog,
      entity: entity,
      primaryFieldName: primaryFieldName,
      primaryFieldValue: primaryFieldValue,
      field: field,
      base64: base64,
      mime: mime
    };

    var _amiWebApp$setup = amiWebApp.setup(['context', 'card'], [result, false], settings),
        context = _amiWebApp$setup[0],
        card = _amiWebApp$setup[1];

    this.ctx.card = card;
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

    var dict = {
      field: this.ctx.field,
      mime: this.ctx.mime
    };
    this.replaceHTML(selector, this.fragmentMediaViewerCtrl, {
      dict: dict
    }).done(function () {
      _this3.refresh().done(function (data) {
        result.resolveWith(_this3.ctx.context, [data]);
      }).fail(function (message) {
        result.rejectWith(_this3.ctx.context, [message]);
      });
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


    var command = 'SearchQuery -catalog="' + amiWebApp.textToString(this.ctx.catalog) + '" -entity="' + amiWebApp.textToString(this.ctx.entity) + '" -sql="SELECT `' + amiWebApp.textToString(this.ctx.field) + '` FROM `' + amiWebApp.textToString(this.ctx.entity) + '` WHERE `' + amiWebApp.textToString(this.ctx.primaryFieldName) + '` = \'' + amiWebApp.textToString(this.ctx.primaryFieldValue) + '\'"';
    /*-----------------------------------------------------------------*/

    amiCommand.execute(command).done(function (data) {
      /*-------------------------------------------------------------*/
      var text = amiWebApp.jspath('..field.$', data)[0] || '';
      /*-------------------------------------------------------------*/

      if (_this4.ctx.mime.startsWith('image/')) {
        /*---------------------------------------------------------*/
        $('<img />').attr({
          alt: _this4.ctx.field,
          src: 'data:' + _this4.ctx.mime + ';base64,' + text,
          height: 'auto',
          width: '800'
        }).appendTo(_this4.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));
        /*---------------------------------------------------------*/
      } else {
        /*---------------------------------------------------------*/
        $('<object />').attr({
          type: _this4.ctx.mime,
          data: 'data:' + _this4.ctx.mime + ';base64,' + text,
          height: '600',
          width: '800'
        }).appendTo(_this4.patchId('#D25C9390_A722_9C48_BC81_5C8875CAAC95'));
        /*---------------------------------------------------------*/
      }
      /*-------------------------------------------------------------*/


      result.resolveWith(context, [data]);
      /*-------------------------------------------------------------*/
    }).fail(function (data, message) {
      result.rejectWith(context, [message]);
    });
    /*-----------------------------------------------------------------*/

    return result;
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=MediaViewerCtrl.js.map
