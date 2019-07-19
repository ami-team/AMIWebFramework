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
    'subapps/UserDashboard/js/jquery-ui.min.js',
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
              _this.updateWidget(item);
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
    $('#ami_user_menu_content').html('<div class="dropdown-divider"></div>' + '<a class="dropdown-item" href="javascript:userDashboardApp.reload2();">Reload Dashboard</a>' + '<a class="dropdown-item" href="javascript:userDashboardApp.refresh2();">Refresh Dashboard</a>' + '<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=dashboardAdmin" target="_blank">Edit Dashboard</a>');
    /*-----------------------------------------------------------------*/

    return this.reload().done(function () {
      _this2.interval = setInterval(function () {
        _this2.refresh();
      }, 10000);
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
    var autoRefresh = amiWebApp.jspath('..field{.@name==="autoRefresh"}.$', row)[0] || '1';
    var x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '0';
    var y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '0';
    var width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '0';
    var height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '0';
    /*-----------------------------------------------------------------*/

    this.gridstack.addWidget($('<div data-gs-id="' + id + '">' + '  <div class="grid-stack-item-content" id="EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx + '"></div>' + '  <div class="grid-stack-item-close-handle" id="D08B4F35_49D8_4844_D9D2_FB951948AF17_' + idx + '"></div>' + '</div>'), x, y, width, height).promise().done(function () {
      amiWebApp.createControl(_this3, _this3, control, ['#EB4DF671_2C31_BED0_6BED_44790525F28F_' + idx].concat(JSON.parse(params)), JSON.parse(settings)).done(function (control) {
        /*---------------------------------------------------------*/
        $('#D08B4F35_49D8_4844_D9D2_FB951948AF17_' + idx).click(function (e) {
          var el = $(e.currentTarget).parent();

          _this3.removeWidget(el.data('_gridstack_node')).done(function () {
            el.remove();
          });
        });
        /*---------------------------------------------------------*/

        control.autoRefresh = parseInt(autoRefresh);

        _this3.controls.push(control);
        /*---------------------------------------------------------*/


        _this3._reload(result, rows, idx + 1);
        /*---------------------------------------------------------*/

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
  reload2: function reload2() {
    amiWebApp.lock();
    this.reload().done(function () {
      amiWebApp.unlock();
    }).fail(function (message) {
      amiWebApp.error(message);
    });
  },

  /*---------------------------------------------------------------------*/
  refresh: function refresh() {
    /*-----------------------------------------------------------------*/
    this.controls.forEach(function (control) {
      if (control.autoRefresh !== 0 && control.refresh) {
        control.refresh();
      }
    });
    /*-----------------------------------------------------------------*/

    return $.Deferred().resolve();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  refresh2: function refresh2() {
    amiWebApp.lock();
    this.refresh().done(function () {
      amiWebApp.unlock();
    }).fail(function (message) {
      amiWebApp.error(message);
    });
  },

  /*---------------------------------------------------------------------*/
  updateWidget: function updateWidget(item) {
    amiWebApp.lock();
    return amiCommand.execute('UpdateWidget -id="' + amiWebApp.textToString(item.id) + '" -x="' + item.x + '" -y="' + item.y + '" -width="' + item.width + '" -height="' + item.height + '"').done(function () {
      amiWebApp.unlock();
    }).fail(function (data, message) {
      amiWebApp.error(message);
    });
  },

  /*---------------------------------------------------------------------*/
  removeWidget: function removeWidget(item) {
    amiWebApp.lock();
    return amiCommand.execute('RemoveWidget -id="' + amiWebApp.textToString(item.id) + '"').done(function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzZXJEYXNoYm9hcmRBcHAuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIiRleHRlbmRzIiwiYW1pIiwiU3ViQXBwIiwib25SZWFkeSIsInVzZXJkYXRhIiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsIm9yaWdpblVSTCIsImRvbmUiLCJkYXRhIiwicmVwbGFjZUhUTUwiLCJlbCIsInNldHRpbmdzIiwiZmxvYXQiLCJjZWxsSGVpZ2h0IiwidmVydGljYWxNYXJnaW4iLCJ3aWR0aCIsImdyaWRzdGFjayIsIm9uIiwiZSIsIml0ZW1zIiwibG9jayIsImZvckVhY2giLCJpdGVtIiwidXBkYXRlV2lkZ2V0IiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJvbkxvZ2luIiwiaHRtbCIsIndlYkFwcFVSTCIsInJlbG9hZCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJyZWZyZXNoIiwib25Mb2dvdXQiLCJlbXB0eSIsImNsZWFySW50ZXJ2YWwiLCJjb250cm9scyIsIl9yZWxvYWQiLCJyb3dzIiwiaWR4IiwibGVuZ3RoIiwicm93IiwiaWQiLCJqc3BhdGgiLCJjb250cm9sIiwicGFyYW1zIiwiYXV0b1JlZnJlc2giLCJ4IiwieSIsImhlaWdodCIsImFkZFdpZGdldCIsInByb21pc2UiLCJjcmVhdGVDb250cm9sIiwiY29uY2F0IiwiSlNPTiIsInBhcnNlIiwiY2xpY2siLCJjdXJyZW50VGFyZ2V0IiwicGFyZW50IiwicmVtb3ZlV2lkZ2V0IiwicmVtb3ZlIiwicGFyc2VJbnQiLCJwdXNoIiwibWVzc2FnZSIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicmVtb3ZlQWxsIiwicmVsb2FkMiIsInVubG9jayIsImVycm9yIiwicmVmcmVzaDIiLCJ0ZXh0VG9TdHJpbmciLCJ1c2VyRGFzaGJvYXJkQXBwIiwiVXNlckRhc2hib2FyZEFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFFQUEs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RCxFQUFPd0QsT0FBUCxFQUFtQjtBQUUxQjVELE1BQUFBLFNBQVMsQ0FBQ2tFLEtBQVYsQ0FBZ0JOLE9BQWhCO0FBQ0EsS0FQTSxDQUFQO0FBUUE7QUFFRDs7QUF4VDZCLENBQXJCLENBQVQ7QUEyVEE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBSVMsZ0JBQWdCLEdBQUcsSUFBSUMsZ0JBQUosRUFBdkI7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gQ05SU1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1VzZXJEYXNoYm9hcmRBcHAnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24odXNlcmRhdGEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2Nzcy9Vc2VyRGFzaGJvYXJkQXBwLmNzcycsXG5cdFx0XHQnc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL3R3aWcvVXNlckRhc2hib2FyZEFwcC50d2lnJyxcblx0XHRcdC8qKi9cblx0XHRcdCdzdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvanF1ZXJ5LXVpLm1pbi5qcycsXG5cdFx0XHQvKiovXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9zdWJhcHBzL1VzZXJEYXNoYm9hcmQvanMvZ3JpZHN0YWNrLm1pbi5jc3MnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvc3ViYXBwcy9Vc2VyRGFzaGJvYXJkL2pzL2dyaWRzdGFjay5hbGwuanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMV0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlbCA9ICQoJyNGMjUxNjk2Rl9ENDJFX0Y3RkZfODZGN18yRTZCNEYyRThGNzQnKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgc2V0dGluZ3MgPSB7XG5cdFx0XHRcdFx0ZmxvYXQ6IHRydWUsXG5cdFx0XHRcdFx0Y2VsbEhlaWdodDogMzYsXG5cdFx0XHRcdFx0dmVydGljYWxNYXJnaW46IDEyLFxuXHRcdFx0XHRcdHdpZHRoOiAxMixcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLmdyaWRzdGFjayA9IGVsLmdyaWRzdGFjayhzZXR0aW5ncykuZGF0YSgnZ3JpZHN0YWNrJyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGVsLm9uKCdjaGFuZ2UnLCAoZSwgaXRlbXMpID0+IHtcblxuXHRcdFx0XHRcdGlmKGl0ZW1zICYmICF0aGlzLmxvY2spXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMudXBkYXRlV2lkZ2V0KGl0ZW0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5sb2NrID0gZmFsc2U7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChkYXRhKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI2FtaV91c2VyX21lbnVfY29udGVudCcpLmh0bWwoXG5cdFx0XHQnPGRpdiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj4nXG5cdFx0XHQrXG5cdFx0XHQnPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cImphdmFzY3JpcHQ6dXNlckRhc2hib2FyZEFwcC5yZWxvYWQyKCk7XCI+UmVsb2FkIERhc2hib2FyZDwvYT4nXG5cdFx0XHQrXG5cdFx0XHQnPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cImphdmFzY3JpcHQ6dXNlckRhc2hib2FyZEFwcC5yZWZyZXNoMigpO1wiPlJlZnJlc2ggRGFzaGJvYXJkPC9hPidcblx0XHRcdCtcblx0XHRcdCc8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiJyArIGFtaVdlYkFwcC53ZWJBcHBVUkwgKyAnP3N1YmFwcD1kYXNoYm9hcmRBZG1pblwiIHRhcmdldD1cIl9ibGFua1wiPkVkaXQgRGFzaGJvYXJkPC9hPidcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5yZWxvYWQoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnJlZnJlc2goKTtcblxuXHRcdFx0fSwgMTAwMDApO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQkKCcjRjI1MTY5NkZfRDQyRV9GN0ZGXzg2RjdfMkU2QjRGMkU4Rjc0JykuZW1wdHkoKTtcblxuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG5cblx0XHR0aGlzLmNvbnRyb2xzID0gW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZWxvYWQ6IGZ1bmN0aW9uKHJlc3VsdCwgcm93cywgaWR4KVxuXHR7XG5cdFx0aWYoaWR4ID09PSByb3dzLmxlbmd0aClcblx0XHR7XG5cdFx0XHRyZXR1cm4gcmVzdWx0LnJlc29sdmUoKTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJvdyA9IHJvd3NbaWR4XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0Y29uc3QgY29udHJvbCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJjb250cm9sXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdGNvbnN0IHBhcmFtcyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJwYXJhbXNcIn0uJCcsIHJvdylbMF0gfHwgJ1tdJztcblx0XHRjb25zdCBzZXR0aW5ncyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJzZXR0aW5nc1wifS4kJywgcm93KVswXSB8fCAne30nO1xuXHRcdGNvbnN0IGF1dG9SZWZyZXNoID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImF1dG9SZWZyZXNoXCJ9LiQnLCByb3cpWzBdIHx8ICcxJztcblx0XHRjb25zdCB4ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInhcIn0uJCcsIHJvdylbMF0gfHwgJzAnO1xuXHRcdGNvbnN0IHkgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwieVwifS4kJywgcm93KVswXSB8fCAnMCc7XG5cdFx0Y29uc3Qgd2lkdGggPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwid2lkdGhcIn0uJCcsIHJvdylbMF0gfHwgJzAnO1xuXHRcdGNvbnN0IGhlaWdodCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJoZWlnaHRcIn0uJCcsIHJvdylbMF0gfHwgJzAnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmdyaWRzdGFjay5hZGRXaWRnZXQoJChcblx0XHRcdCc8ZGl2IGRhdGEtZ3MtaWQ9XCInICsgaWQgKyAnXCI+JyArXG5cdFx0XHQnICA8ZGl2IGNsYXNzPVwiZ3JpZC1zdGFjay1pdGVtLWNvbnRlbnRcIiBpZD1cIkVCNERGNjcxXzJDMzFfQkVEMF82QkVEXzQ0NzkwNTI1RjI4Rl8nICsgaWR4ICsgJ1wiPjwvZGl2PicgK1xuXHRcdFx0JyAgPGRpdiBjbGFzcz1cImdyaWQtc3RhY2staXRlbS1jbG9zZS1oYW5kbGVcIiBpZD1cIkQwOEI0RjM1XzQ5RDhfNDg0NF9EOUQyX0ZCOTUxOTQ4QUYxN18nICsgaWR4ICsgJ1wiPjwvZGl2PicgK1xuXHRcdFx0JzwvZGl2Pidcblx0XHQpLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KS5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5jcmVhdGVDb250cm9sKHRoaXMsIHRoaXMsIGNvbnRyb2wsIFsnI0VCNERGNjcxXzJDMzFfQkVEMF82QkVEXzQ0NzkwNTI1RjI4Rl8nICsgaWR4XS5jb25jYXQoSlNPTi5wYXJzZShwYXJhbXMpKSwgSlNPTi5wYXJzZShzZXR0aW5ncykpLmRvbmUoKGNvbnRyb2wpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0QwOEI0RjM1XzQ5RDhfNDg0NF9EOUQyX0ZCOTUxOTQ4QUYxN18nICsgaWR4KS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdFx0Y29uc3QgZWwgPSAkKGUuY3VycmVudFRhcmdldCkucGFyZW50KCk7XG5cblx0XHRcdFx0XHR0aGlzLnJlbW92ZVdpZGdldChlbC5kYXRhKCdfZ3JpZHN0YWNrX25vZGUnKSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29udHJvbC5hdXRvUmVmcmVzaCA9IHBhcnNlSW50KGF1dG9SZWZyZXNoKTtcblxuXHRcdFx0XHR0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuX3JlbG9hZChyZXN1bHQsIHJvd3MsIGlkeCArIDEpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVsb2FkOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnR2V0RGFzaGJvYXJkSW5mbycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5ncmlkc3RhY2sucmVtb3ZlQWxsKCk7XG5cblx0XHRcdHRoaXMuY29udHJvbHMgPSBbXTtcblxuXHRcdFx0dGhpcy5sb2NrID0gdHJ1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0dGhpcy5fcmVsb2FkKCQuRGVmZXJyZWQoKSwgYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKSwgMCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cblx0XHRcdFx0dGhpcy5sb2NrID0gZmFsc2U7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoLyotLS0tKi8pO1xuXG5cdFx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5yZWZyZXNoKCk7XG5cblx0XHRcdFx0dGhpcy5sb2NrID0gZmFsc2U7XG5cblx0XHRcdFx0cmVzdWx0LnJlamVjdChtZXNzYWdlKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZWxvYWQyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0dGhpcy5yZWxvYWQoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygvKi0tLSovKTtcblxuXHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZWZyZXNoOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuY29udHJvbHMuZm9yRWFjaCgoY29udHJvbCkgPT4ge1xuXG5cdFx0XHRpZihjb250cm9sLmF1dG9SZWZyZXNoICE9PSAwICYmIGNvbnRyb2wucmVmcmVzaClcblx0XHRcdHtcblx0XHRcdFx0Y29udHJvbC5yZWZyZXNoKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlZnJlc2gyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0dGhpcy5yZWZyZXNoKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC51bmxvY2soLyotLS0qLyk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dXBkYXRlV2lkZ2V0OiBmdW5jdGlvbihpdGVtKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmV4ZWN1dGUoJ1VwZGF0ZVdpZGdldCAtaWQ9XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhpdGVtLmlkKSArICdcIiAteD1cIicgKyBpdGVtLnggKyAnXCIgLXk9XCInICsgaXRlbS55ICsgJ1wiIC13aWR0aD1cIicgKyBpdGVtLndpZHRoICsgJ1wiIC1oZWlnaHQ9XCInICsgaXRlbS5oZWlnaHQgKyAnXCInKS5kb25lKCgpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbW92ZVdpZGdldDogZnVuY3Rpb24oaXRlbSlcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gYW1pQ29tbWFuZC5leGVjdXRlKCdSZW1vdmVXaWRnZXQgLWlkPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcoaXRlbS5pZCkgKyAnXCInKS5kb25lKCgpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBHTE9CQUwgSU5TVEFOQ0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIHVzZXJEYXNoYm9hcmRBcHAgPSBuZXcgVXNlckRhc2hib2FyZEFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
