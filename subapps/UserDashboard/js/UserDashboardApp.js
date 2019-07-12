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
$AMIClass('UserDashboardApp', {
  /*---------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*---------------------------------------------------------------------*/
  onReady: function onReady(userdata) {
    var _this = this;

    var result = $.Deferred();
    amiWebApp.loadResources(['subapps/UserDashboard/css/UserDashboardApp.css', 'subapps/UserDashboard/twig/UserDashboardApp.twig',
    /**/
    amiWebApp.originURL + '/js/3rd-party/jquery-ui.min.js',
    /**/
    amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.min.css', amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.all.js']).done(function (data) {
      amiWebApp.replaceHTML('#ami_main_content', data[1]).done(function () {
        /*---------------------------------------------------------*/
        var el = $('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74');
        /*---------------------------------------------------------*/

        var settings = {
          float: true,
          cellHeight: 36,
          verticalMargin: 12,
          width: 12
        };
        _this.gridstack = el.gridstack(settings).data('gridstack');
        /*---------------------------------------------------------*/

        el.on('change', function (e, items) {
          if (items && !_this.lock) {
            items.forEach(function (item) {
              _this._serialize(item);
            });
          }
        });
        /*---------------------------------------------------------*/

        _this.lock = false;
        /*---------------------------------------------------------*/

        result.resolve();
      });
    }).fail(function (data) {
      result.reject(data);
    });
    return result;
  },

  /*---------------------------------------------------------------------*/
  onLogin: function onLogin() {
    var _this2 = this;

    /*-----------------------------------------------------------------*/
    $('#ami_user_menu_content').html('<div class="dropdown-divider"></div>' + '<a class="dropdown-item" href="javascript:(function() { amiWebApp.lock(); userDashboardApp.reload().done(function() { amiWebApp.unlock(); }).fail(function(message) { amiWebApp.error(message); }); return; })();">Reload Dashboard</a>' + '<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=dashboardAdmin" target="_blank">Edit Dashboard</a>');
    /*-----------------------------------------------------------------*/

    return this.reload().done(function () {
      _this2.interval = setInterval(function () {
        _this2.refresh();
      }, 5000);
    });
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  onLogout: function onLogout() {
    $('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').empty();
    clearInterval(this.interval);
    this.controls = [];
  },

  /*---------------------------------------------------------------------*/
  _reload: function _reload(result, rows, idx) {
    var _this3 = this;

    if (idx === rows.length) {
      return result.resolve();
    }
    /*-----------------------------------------------------------------*/


    var row = rows[idx];
    /*-----------------------------------------------------------------*/

    var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
    var control = amiWebApp.jspath('..field{.@name==="control"}.$', row)[0] || '';
    var params = amiWebApp.jspath('..field{.@name==="params"}.$', row)[0] || '[]';
    var settings = amiWebApp.jspath('..field{.@name==="settings"}.$', row)[0] || '{}';
    var x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '0';
    var y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '0';
    var width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '0';
    var height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '0';
    /*-----------------------------------------------------------------*/

    this.gridstack.addWidget($('<div data-gs-id="' + id + '"><div class="grid-stack-item-content" id="EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx + '"></div></div>'), x, y, width, height).promise().done(function () {
      amiWebApp.createControl(_this3, _this3, control, ['#EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx].concat(JSON.parse(params)), JSON.parse(settings)).done(function (control) {
        _this3._reload(result, rows, idx + 1);

        _this3.controls.push(control);
      }).fail(function (message) {
        result.reject(message);
      });
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  reload: function reload() {
    var _this4 = this;

    var result = $.Deferred();
    /*-----------------------------------------------------------------*/

    amiCommand.execute('GetDashboardInfo').done(function (data) {
      /*-------------------------------------------------------------*/
      _this4.gridstack.removeAll();

      _this4.controls = [];
      _this4.lock = true;
      /*-------------------------------------------------------------*/

      _this4._reload($.Deferred(), amiWebApp.jspath('..row', data), 0).done(function () {
        _this4.refresh();

        _this4.lock = false;
        result.resolve();
      }).fail(function (message) {
        _this4.refresh();

        _this4.lock = false;
        result.reject(message);
      });
    }).fail(function (data, message) {
      result.reject(message);
    });
    /*-----------------------------------------------------------------*/

    return result;
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh() {
    /*-----------------------------------------------------------------*/
    this.controls.forEach(function (control) {
      if (control.refresh) {
        control.refresh();
      }
    });
    /*-----------------------------------------------------------------*/

    return $.Deferred().resolve();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  _serialize: function _serialize(item) {
    amiWebApp.lock();
    amiCommand.execute('SetWidgetProperties -id="' + amiWebApp.textToString(item.id) + '" -x="' + item.x + '" -y="' + item.y + '" -width="' + item.width + '" -height="' + item.height + '"').done(function () {
      amiWebApp.unlock();
    }).fail(function (data, message) {
      amiWebApp.error(message);
    });
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                         */

/*-------------------------------------------------------------------------*/

var userDashboardApp = new UserDashboardApp();
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=UserDashboardApp.js.map
