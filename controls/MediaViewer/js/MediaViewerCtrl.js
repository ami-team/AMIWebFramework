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
    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/MediaViewer/twig/MediaViewerCtrl.twig'], {
      context: this
    }).done(function (data) {
      this.fragmentMediaViewerCtrl = data[0];
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
    var _this = this;

    if (this.getParent().$name !== 'TabCtrl') {
      var tab = new this.tabCtor(null, this);
      tab.render(selector, this.ctx).done(function () {
        tab.appendItem('<i class="fa fa-arrows-alt"></i> ' + _this.ctx.entity, {
          closable: false
        }).done(function (selector) {
          _this.setParent(tab);

          _this.__render(result, selector);
        });
      });
    } else {
      this.__render(result, selector);
    }
  },

  /*---------------------------------------------------------------------*/
  __render: function __render(result, selector) {
    var _this2 = this;

    var dict = {
      field: this.ctx.field,
      mime: this.ctx.mime
    };
    this.replaceHTML(selector, this.fragmentMediaViewerCtrl, {
      dict: dict
    }).done(function () {
      _this2.refresh().done(function (data) {
        result.resolveWith(_this2.ctx.context, [data]);
      }).fail(function (message) {
        result.rejectWith(_this2.ctx.context, [message]);
      });
    });
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh(settings) {
    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup2 = amiWebApp.setup(['context'], [result], settings),
        context = _amiWebApp$setup2[0];
    /*-----------------------------------------------------------------*/


    amiCommand.execute('GetSessionInfo').done(function (data) {
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
