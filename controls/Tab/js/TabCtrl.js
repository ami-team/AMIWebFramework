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
$AMIClass('TabCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
    this._previousActiveTab = '';
    this._cnt = 0;
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/Tab/twig/TabCtrl.twig', amiWebApp.originURL + '/controls/Tab/twig/nav_item.twig', amiWebApp.originURL + '/controls/Tab/twig/tab_pane.twig']).done(function (data) {
      _this.fragmentTabCtrl = data[0];
      _this.fragmentNavItem = data[1];
      _this.fragmentTabPane = data[2];
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(selector, settings) {
    var _this2 = this;

    var result = $.Deferred();
    this._context = result;
    this._card = true;
    this._closable = true;
    this._firstVisible = true;

    if (settings) {
      if ('context' in settings) {
        this._context = settings['context'];
      }

      if ('card' in settings) {
        this._card = settings['card'];
      }

      if ('closable' in settings) {
        this._closable = settings['closable'];
      }

      if ('firstVisible' in settings) {
        this._firstVisible = settings['firstVisible'];
      }
    }

    var dict = {
      'card': this._card
    };
    this.replaceHTML(this._selector = selector, this.fragmentTabCtrl, {
      dict: dict
    }).done(function () {
      result.resolveWith(_this2._context);
    });
    return result.promise();
  },

  /*---------------------------------------------------------------------*/
  _getTabEl: function _getTabEl(tabId) {
    return $(this._selector + ' .nav-link[href="#' + tabId + '"]:parent');
  },

  /*---------------------------------------------------------------------*/
  _getLinkEl: function _getLinkEl(tabId) {
    return $(this._selector + ' .nav-link[href="#' + tabId + '"]');
  },

  /*---------------------------------------------------------------------*/
  _getPaneEl: function _getPaneEl(tabId) {
    return $(this._selector + ' #' + tabId);
  },

  /*---------------------------------------------------------------------*/
  prependItem: function prependItem(title, settings) {
    var _this3 = this;

    var result = $.Deferred();
    var context = result;
    var height = 'auto';
    var active = true;
    var closable = this._closable;
    var firstVisible = this._firstVisible;

    if (settings) {
      if ('context' in settings) {
        context = settings['context'];
      }

      if ('height' in settings) {
        height = settings['height'];
      }

      if ('active' in settings) {
        active = settings['active'];
      }

      if ('closable' in settings) {
        closable = settings['closable'];
      }

      if ('firstVisible' in settings) {
        firstVisible = settings['firstVisible'];
      }
    }
    /*-----------------------------------------------------------------*/


    var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

    var dict = {
      id: tabId,
      title: title,
      height: height,
      closable: closable
    };
    /*-----------------------------------------------------------------*/

    var tabSelector = this._card ? '.card > .card-header > .nav-tabs' : '.nav-tabs';
    var contentSelector = this._card ? '.card > .card-body > .tab-content' : '.tab-content';
    this.prependHTML(this._selector + ' > ' + tabSelector, this.fragmentNavItem, {
      dict: dict
    }).done(function () {
      _this3.prependHTML(_this3._selector + ' > ' + contentSelector, _this3.fragmentTabPane, {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
        _this3._getTabEl(tabId).find('.fa-times').click(function (e) {
          _this3.removeTab(tabId);

          e.preventDefault();
        });
        /*---------------------------------------------------------*/


        _this3._getLinkEl(tabId).on('show.bs.tab', function (e) {
          _this3._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
        });
        /*---------------------------------------------------------*/


        if (_this3._cnt++ === 0 || active) {
          _this3._getLinkEl(tabId).tab('show');
        }
        /*---------------------------------------------------------*/


        var els = $(_this3._selector + ' > ' + tabSelector);

        if (els.length === 1 && firstVisible === false) {
          els.hide();
        } else {
          els.show();
        }
        /*---------------------------------------------------------*/


        result.resolveWith(context, ['#' + tabId]);
        /*---------------------------------------------------------*/
      });
    });
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/
  appendItem: function appendItem(title, settings) {
    var _this4 = this;

    var result = $.Deferred();
    var context = result;
    var height = 'auto';
    var active = true;
    var closable = this._closable;
    var firstVisible = this._firstVisible;

    if (settings) {
      if ('context' in settings) {
        context = settings['context'];
      }

      if ('height' in settings) {
        height = settings['height'];
      }

      if ('active' in settings) {
        active = settings['active'];
      }

      if ('closable' in settings) {
        closable = settings['closable'];
      }

      if ('firstVisible' in settings) {
        firstVisible = settings['firstVisible'];
      }
    }
    /*-----------------------------------------------------------------*/


    var tabId = this.patchId('F3EF6D3D_723B_F5FB_F299_E0AA9CA0914D') + '_' + this._cnt;

    var dict = {
      id: tabId,
      title: title,
      height: height,
      closable: closable
    };
    /*-----------------------------------------------------------------*/

    var tabSelector = this._card ? '.card > .card-header > .nav-tabs' : '.nav-tabs';
    var contentSelector = this._card ? '.card > .card-body > .tab-content' : '.tab-content';
    this.appendHTML(this._selector + ' > ' + tabSelector, this.fragmentNavItem, {
      dict: dict
    }).done(function () {
      _this4.appendHTML(_this4._selector + ' > ' + contentSelector, _this4.fragmentTabPane, {
        dict: dict
      }).done(function () {
        /*---------------------------------------------------------*/
        _this4._getTabEl(tabId).find('.fa-times').click(function (e) {
          _this4.removeTab(tabId);

          e.preventDefault();
        });
        /*---------------------------------------------------------*/


        _this4._getLinkEl(tabId).on('show.bs.tab', function (e) {
          _this4._previousActiveTab = e.relatedTarget ? $(e.relatedTarget).attr('href').substring(1) : '';
        });
        /*---------------------------------------------------------*/


        if (_this4._cnt++ === 0 || active) {
          _this4._getLinkEl(tabId).tab('show');
        }
        /*---------------------------------------------------------*/


        var els = $(_this4._selector + ' > ' + tabSelector);

        if (els.length === 1 && firstVisible === false) {
          els.hide();
        } else {
          els.show();
        }
        /*---------------------------------------------------------*/


        result.resolveWith(context, ['#' + tabId]);
        /*---------------------------------------------------------*/
      });
    });
    /*-----------------------------------------------------------------*/

    return result.promise();
  },

  /*---------------------------------------------------------------------*/
  removeTab: function removeTab(tabId) {
    this._getTabEl(tabId).remove();

    this._getPaneEl(tabId).remove();

    if (this._previousActiveTab) {
      this._getLinkEl(this._previousActiveTab).tab('show');
    } else {
      $(this._selector + ' .nav-link:first').tab('show');
    }
  },

  /*---------------------------------------------------------------------*/
  removeTabs: function removeTabs() {
    $(this._selector + ' .nav-tabs').empty();
    $(this._selector + ' .tab-content').empty();
  },

  /*---------------------------------------------------------------------*/
  isEmpty: function isEmpty() {
    return $(this._selector + ' .nav-tabs').is(':empty') || $(this._selector + ' .nav-content').is(':empty');
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
