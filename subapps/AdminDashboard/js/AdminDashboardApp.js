/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * @global AdminDashboardHome
 * @global AdminDashboardConfig
 * @global AdminDashboardRoles
 * @global AdminDashboardCommands
 * @global AdminDashboardUsers
 * @global AdminDashboardCatalogs
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

/* AdminDashboardApp                                                                                                  */

/*--------------------------------------------------------------------------------------------------------------------*/
$AMIClass('AdminDashboardApp', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady(userdata) {
    var _this = this;

    var result = $.Deferred();
    amiWebApp.loadResources(['subapps/AdminDashboard/twig/AdminDashboardApp.twig', 'subapps/AdminDashboard/js/_home.js', 'subapps/AdminDashboard/js/_config.js', 'subapps/AdminDashboard/js/_roles.js', 'subapps/AdminDashboard/js/_commands.js', 'subapps/AdminDashboard/js/_users.js', 'subapps/AdminDashboard/js/_catalogs.js']).done(function (data) {
      amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function () {
        /**/
        if (userdata === 'config') {
          _this.subsubapp = new AdminDashboardConfig();
        } else if (userdata === 'roles') {
          _this.subsubapp = new AdminDashboardRoles();
        } else if (userdata === 'commands') {
          _this.subsubapp = new AdminDashboardCommands();
        } else if (userdata === 'users') {
          _this.subsubapp = new AdminDashboardUsers();
        } else if (userdata === 'catalogs') {
          _this.subsubapp = new AdminDashboardCatalogs();
        } else {
          _this.subsubapp = new AdminDashboardHome();
        }

        _this.subsubapp._init().done(function () {
          result.resolve();
        }).fail(function (data) {
          result.reject(data);
        });
      });
    }).fail(function (message) {
      result.reject(message);
    });
    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onExit: function onExit() {
    if (this.subsubapp.onExit) {
      return this.subsubapp.onExit();
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogin: function onLogin() {
    if (amiLogin.hasRole('AMI_ADMIN')) {
      amiWebApp.flush();
      $('#C54485C3_44F8_CE8E_0F54_BF847CEECE11').show();
      $('#CB6036B7_5971_41C2_1194_F5A051B21EA0').show();

      if (this.subsubapp.onLogin) {
        return this.subsubapp.onLogin();
      }
    } else {
      this.onLogout();
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogout: function onLogout() {
    amiWebApp.error('Administrator roles required!');
    $('#C54485C3_44F8_CE8E_0F54_BF847CEECE11').hide();
    $('#CB6036B7_5971_41C2_1194_F5A051B21EA0').hide();

    if (this.subsubapp.onLogout) {
      return this.subsubapp.onLogout();
    }
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  findNewCommands: function findNewCommands() {
    /*------------------------------------------------------------------------------------------------------------*/
    if (!confirm('Please confirm...')) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.execute('FindNewCommands').done(function (data, message) {
      amiWebApp.success(message, true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  flushCommandCache: function flushCommandCache() {
    /*------------------------------------------------------------------------------------------------------------*/
    if (!confirm('Please confirm...')) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.execute('FlushCommandCache').done(function (data, message) {
      amiWebApp.success(message, true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  flushServerCachesFast: function flushServerCachesFast() {
    /*------------------------------------------------------------------------------------------------------------*/
    if (!confirm('Please confirm...')) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.execute('FlushServerCaches').done(function (data, message) {
      amiWebApp.success(message, true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  flushServerCachesSlow: function flushServerCachesSlow() {
    /*------------------------------------------------------------------------------------------------------------*/
    if (!confirm('Please confirm...')) {
      return;
    }
    /*------------------------------------------------------------------------------------------------------------*/


    amiWebApp.lock();
    amiCommand.execute('FlushServerCaches -full').done(function (data, message) {
      amiWebApp.success(message, true);
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
    /*------------------------------------------------------------------------------------------------------------*/
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

var adminDashboardApp = new AdminDashboardApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFkbWluRGFzaGJvYXJkQXBwLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIlN1YkFwcCIsIm9uUmVhZHkiLCJ1c2VyZGF0YSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwic3Vic3ViYXBwIiwiQWRtaW5EYXNoYm9hcmRDb25maWciLCJBZG1pbkRhc2hib2FyZFJvbGVzIiwiQWRtaW5EYXNoYm9hcmRDb21tYW5kcyIsIkFkbWluRGFzaGJvYXJkVXNlcnMiLCJBZG1pbkRhc2hib2FyZENhdGFsb2dzIiwiQWRtaW5EYXNoYm9hcmRIb21lIiwiX2luaXQiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsIm1lc3NhZ2UiLCJvbkV4aXQiLCJvbkxvZ2luIiwiYW1pTG9naW4iLCJoYXNSb2xlIiwiZmx1c2giLCJzaG93Iiwib25Mb2dvdXQiLCJlcnJvciIsImhpZGUiLCJmaW5kTmV3Q29tbWFuZHMiLCJjb25maXJtIiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwic3VjY2VzcyIsImZsdXNoQ29tbWFuZENhY2hlIiwiZmx1c2hTZXJ2ZXJDYWNoZXNGYXN0IiwiZmx1c2hTZXJ2ZXJDYWNoZXNTbG93IiwiYWRtaW5EYXNoYm9hcmRBcHAiLCJBZG1pbkRhc2hib2FyZEFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBO0FBRUFBLFNBQVMsQ0FBQyxtQkFBRCxFQUFzQjtBQUM5QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsTUFIZ0I7O0FBSzlCO0FBRUFDLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0MsUUFBVCxFQUNUO0FBQUE7O0FBQ0MsUUFBTUMsTUFBTSxHQUFHQyxDQUFDLENBQUNDLFFBQUYsRUFBZjtBQUVBQyxJQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDdkIsb0RBRHVCLEVBRXZCLG9DQUZ1QixFQUd2QixzQ0FIdUIsRUFJdkIscUNBSnVCLEVBS3ZCLHdDQUx1QixFQU12QixxQ0FOdUIsRUFPdkIsd0NBUHVCLENBQXhCLEVBUUdDLElBUkgsQ0FRUSxVQUFDQyxJQUFELEVBQVU7QUFFakJILE1BQUFBLFNBQVMsQ0FBQ0ksV0FBVixDQUFzQixtQkFBdEIsRUFBMkNELElBQUksQ0FBQyxDQUFELENBQS9DLEVBQW9ERCxJQUFwRCxDQUF5RCxZQUFNO0FBRTlEO0FBQUssWUFBR04sUUFBUSxLQUFLLFFBQWhCLEVBQTBCO0FBQzlCLFVBQUEsS0FBSSxDQUFDUyxTQUFMLEdBQWlCLElBQUlDLG9CQUFKLEVBQWpCO0FBQ0EsU0FGSSxNQUdBLElBQUdWLFFBQVEsS0FBSyxPQUFoQixFQUF5QjtBQUM3QixVQUFBLEtBQUksQ0FBQ1MsU0FBTCxHQUFpQixJQUFJRSxtQkFBSixFQUFqQjtBQUNBLFNBRkksTUFHQSxJQUFHWCxRQUFRLEtBQUssVUFBaEIsRUFBNEI7QUFDaEMsVUFBQSxLQUFJLENBQUNTLFNBQUwsR0FBaUIsSUFBSUcsc0JBQUosRUFBakI7QUFDQSxTQUZJLE1BR0EsSUFBR1osUUFBUSxLQUFLLE9BQWhCLEVBQXlCO0FBQzdCLFVBQUEsS0FBSSxDQUFDUyxTQUFMLEdBQWlCLElBQUlJLG1CQUFKLEVBQWpCO0FBQ0EsU0FGSSxNQUdBLElBQUdiLFFBQVEsS0FBSyxVQUFoQixFQUE0QjtBQUNoQyxVQUFBLEtBQUksQ0FBQ1MsU0FBTCxHQUFpQixJQUFJSyxzQkFBSixFQUFqQjtBQUNBLFNBRkksTUFHQTtBQUNKLFVBQUEsS0FBSSxDQUFDTCxTQUFMLEdBQWlCLElBQUlNLGtCQUFKLEVBQWpCO0FBQ0E7O0FBRUQsUUFBQSxLQUFJLENBQUNOLFNBQUwsQ0FBZU8sS0FBZixHQUF1QlYsSUFBdkIsQ0FBNEIsWUFBTTtBQUVqQ0wsVUFBQUEsTUFBTSxDQUFDZ0IsT0FBUDtBQUVBLFNBSkQsRUFJR0MsSUFKSCxDQUlRLFVBQUNYLElBQUQsRUFBVTtBQUVqQk4sVUFBQUEsTUFBTSxDQUFDa0IsTUFBUCxDQUFjWixJQUFkO0FBQ0EsU0FQRDtBQVFBLE9BN0JEO0FBK0JBLEtBekNELEVBeUNHVyxJQXpDSCxDQXlDUSxVQUFDRSxPQUFELEVBQWE7QUFFcEJuQixNQUFBQSxNQUFNLENBQUNrQixNQUFQLENBQWNDLE9BQWQ7QUFDQSxLQTVDRDtBQThDQSxXQUFPbkIsTUFBUDtBQUNBLEdBMUQ2Qjs7QUE0RDlCO0FBRUFvQixFQUFBQSxNQUFNLEVBQUUsa0JBQ1I7QUFDQyxRQUFHLEtBQUtaLFNBQUwsQ0FBZVksTUFBbEIsRUFDQTtBQUNDLGFBQU8sS0FBS1osU0FBTCxDQUFlWSxNQUFmLEVBQVA7QUFDQTtBQUNELEdBcEU2Qjs7QUFzRTlCO0FBRUFDLEVBQUFBLE9BQU8sRUFBRSxtQkFDVDtBQUNDLFFBQUdDLFFBQVEsQ0FBQ0MsT0FBVCxDQUFpQixXQUFqQixDQUFILEVBQ0E7QUFDQ3BCLE1BQUFBLFNBQVMsQ0FBQ3FCLEtBQVY7QUFFQXZCLE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDd0IsSUFBM0M7QUFDQXhCLE1BQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDd0IsSUFBM0M7O0FBRUEsVUFBRyxLQUFLakIsU0FBTCxDQUFlYSxPQUFsQixFQUNBO0FBQ0MsZUFBTyxLQUFLYixTQUFMLENBQWVhLE9BQWYsRUFBUDtBQUNBO0FBQ0QsS0FYRCxNQWFBO0FBQ0MsV0FBS0ssUUFBTDtBQUNBO0FBQ0QsR0ExRjZCOztBQTRGOUI7QUFFQUEsRUFBQUEsUUFBUSxFQUFFLG9CQUNWO0FBQ0N2QixJQUFBQSxTQUFTLENBQUN3QixLQUFWLENBQWdCLCtCQUFoQjtBQUVBMUIsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkMyQixJQUEzQztBQUNBM0IsSUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkMyQixJQUEzQzs7QUFFQSxRQUFHLEtBQUtwQixTQUFMLENBQWVrQixRQUFsQixFQUNBO0FBQ0MsYUFBTyxLQUFLbEIsU0FBTCxDQUFla0IsUUFBZixFQUFQO0FBQ0E7QUFDRCxHQXpHNkI7O0FBMkc5QjtBQUVBRyxFQUFBQSxlQUFlLEVBQUUsMkJBQ2pCO0FBQ0M7QUFFQSxRQUFHLENBQUNDLE9BQU8sQ0FBQyxtQkFBRCxDQUFYLEVBQ0E7QUFDQztBQUNBO0FBRUQ7OztBQUVBM0IsSUFBQUEsU0FBUyxDQUFDNEIsSUFBVjtBQUVBQyxJQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIsaUJBQW5CLEVBQXNDNUIsSUFBdEMsQ0FBMkMsVUFBQ0MsSUFBRCxFQUFPYSxPQUFQLEVBQW1CO0FBRTdEaEIsTUFBQUEsU0FBUyxDQUFDK0IsT0FBVixDQUFrQmYsT0FBbEIsRUFBMkIsSUFBM0I7QUFFQSxLQUpELEVBSUdGLElBSkgsQ0FJUSxVQUFDWCxJQUFELEVBQU9hLE9BQVAsRUFBbUI7QUFFMUJoQixNQUFBQSxTQUFTLENBQUN3QixLQUFWLENBQWdCUixPQUFoQixFQUF5QixJQUF6QjtBQUNBLEtBUEQ7QUFTQTtBQUNBLEdBcEk2Qjs7QUFzSTlCO0FBRUFnQixFQUFBQSxpQkFBaUIsRUFBRSw2QkFDbkI7QUFDQztBQUVBLFFBQUcsQ0FBQ0wsT0FBTyxDQUFDLG1CQUFELENBQVgsRUFDQTtBQUNDO0FBQ0E7QUFFRDs7O0FBRUEzQixJQUFBQSxTQUFTLENBQUM0QixJQUFWO0FBRUFDLElBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixtQkFBbkIsRUFBd0M1QixJQUF4QyxDQUE2QyxVQUFDQyxJQUFELEVBQU9hLE9BQVAsRUFBbUI7QUFFL0RoQixNQUFBQSxTQUFTLENBQUMrQixPQUFWLENBQWtCZixPQUFsQixFQUEyQixJQUEzQjtBQUVBLEtBSkQsRUFJR0YsSUFKSCxDQUlRLFVBQUNYLElBQUQsRUFBT2EsT0FBUCxFQUFtQjtBQUUxQmhCLE1BQUFBLFNBQVMsQ0FBQ3dCLEtBQVYsQ0FBZ0JSLE9BQWhCLEVBQXlCLElBQXpCO0FBQ0EsS0FQRDtBQVNBO0FBQ0EsR0EvSjZCOztBQWlLOUI7QUFFQWlCLEVBQUFBLHFCQUFxQixFQUFFLGlDQUN2QjtBQUNDO0FBRUEsUUFBRyxDQUFDTixPQUFPLENBQUMsbUJBQUQsQ0FBWCxFQUNBO0FBQ0M7QUFDQTtBQUVEOzs7QUFFQTNCLElBQUFBLFNBQVMsQ0FBQzRCLElBQVY7QUFFQUMsSUFBQUEsVUFBVSxDQUFDQyxPQUFYLENBQW1CLG1CQUFuQixFQUF3QzVCLElBQXhDLENBQTZDLFVBQUNDLElBQUQsRUFBT2EsT0FBUCxFQUFtQjtBQUUvRGhCLE1BQUFBLFNBQVMsQ0FBQytCLE9BQVYsQ0FBa0JmLE9BQWxCLEVBQTJCLElBQTNCO0FBRUEsS0FKRCxFQUlHRixJQUpILENBSVEsVUFBQ1gsSUFBRCxFQUFPYSxPQUFQLEVBQW1CO0FBRTFCaEIsTUFBQUEsU0FBUyxDQUFDd0IsS0FBVixDQUFnQlIsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxLQVBEO0FBU0E7QUFDQSxHQTFMNkI7O0FBNEw5QjtBQUVBa0IsRUFBQUEscUJBQXFCLEVBQUUsaUNBQ3ZCO0FBQ0M7QUFFQSxRQUFHLENBQUNQLE9BQU8sQ0FBQyxtQkFBRCxDQUFYLEVBQ0E7QUFDQztBQUNBO0FBRUQ7OztBQUVBM0IsSUFBQUEsU0FBUyxDQUFDNEIsSUFBVjtBQUVBQyxJQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIseUJBQW5CLEVBQThDNUIsSUFBOUMsQ0FBbUQsVUFBQ0MsSUFBRCxFQUFPYSxPQUFQLEVBQW1CO0FBRXJFaEIsTUFBQUEsU0FBUyxDQUFDK0IsT0FBVixDQUFrQmYsT0FBbEIsRUFBMkIsSUFBM0I7QUFFQSxLQUpELEVBSUdGLElBSkgsQ0FJUSxVQUFDWCxJQUFELEVBQU9hLE9BQVAsRUFBbUI7QUFFMUJoQixNQUFBQSxTQUFTLENBQUN3QixLQUFWLENBQWdCUixPQUFoQixFQUF5QixJQUF6QjtBQUNBLEtBUEQ7QUFTQTtBQUNBO0FBRUQ7O0FBdk44QixDQUF0QixDQUFUO0FBME5BOztBQUNBOztBQUNBOztBQUVBLElBQU1tQixpQkFBaUIsR0FBRyxJQUFJQyxpQkFBSixFQUExQjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBUaGUgQU1JIFRlYW1cbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKlxuICogQGdsb2JhbCBBZG1pbkRhc2hib2FyZEhvbWVcbiAqIEBnbG9iYWwgQWRtaW5EYXNoYm9hcmRDb25maWdcbiAqIEBnbG9iYWwgQWRtaW5EYXNoYm9hcmRSb2xlc1xuICogQGdsb2JhbCBBZG1pbkRhc2hib2FyZENvbW1hbmRzXG4gKiBAZ2xvYmFsIEFkbWluRGFzaGJvYXJkVXNlcnNcbiAqIEBnbG9iYWwgQWRtaW5EYXNoYm9hcmRDYXRhbG9nc1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEFkbWluRGFzaGJvYXJkQXBwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnQWRtaW5EYXNoYm9hcmRBcHAnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5TdWJBcHAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbih1c2VyZGF0YSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL3R3aWcvQWRtaW5EYXNoYm9hcmRBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9BZG1pbkRhc2hib2FyZC9qcy9faG9tZS5qcycsXG5cdFx0XHQnc3ViYXBwcy9BZG1pbkRhc2hib2FyZC9qcy9fY29uZmlnLmpzJyxcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL2pzL19yb2xlcy5qcycsXG5cdFx0XHQnc3ViYXBwcy9BZG1pbkRhc2hib2FyZC9qcy9fY29tbWFuZHMuanMnLFxuXHRcdFx0J3N1YmFwcHMvQWRtaW5EYXNoYm9hcmQvanMvX3VzZXJzLmpzJyxcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL2pzL19jYXRhbG9ncy5qcycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNhbWlfbWFpbl9jb250ZW50JywgZGF0YVswXSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyoqLyBpZih1c2VyZGF0YSA9PT0gJ2NvbmZpZycpIHtcblx0XHRcdFx0XHR0aGlzLnN1YnN1YmFwcCA9IG5ldyBBZG1pbkRhc2hib2FyZENvbmZpZygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodXNlcmRhdGEgPT09ICdyb2xlcycpIHtcblx0XHRcdFx0XHR0aGlzLnN1YnN1YmFwcCA9IG5ldyBBZG1pbkRhc2hib2FyZFJvbGVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih1c2VyZGF0YSA9PT0gJ2NvbW1hbmRzJykge1xuXHRcdFx0XHRcdHRoaXMuc3Vic3ViYXBwID0gbmV3IEFkbWluRGFzaGJvYXJkQ29tbWFuZHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHVzZXJkYXRhID09PSAndXNlcnMnKSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJzdWJhcHAgPSBuZXcgQWRtaW5EYXNoYm9hcmRVc2VycygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodXNlcmRhdGEgPT09ICdjYXRhbG9ncycpIHtcblx0XHRcdFx0XHR0aGlzLnN1YnN1YmFwcCA9IG5ldyBBZG1pbkRhc2hib2FyZENhdGFsb2dzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zdWJzdWJhcHAgPSBuZXcgQWRtaW5EYXNoYm9hcmRIb21lKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnN1YnN1YmFwcC5faW5pdCgpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblxuXHRcdFx0XHR9KS5mYWlsKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVqZWN0KGRhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uRXhpdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYodGhpcy5zdWJzdWJhcHAub25FeGl0KVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLnN1YnN1YmFwcC5vbkV4aXQoKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhbWlMb2dpbi5oYXNSb2xlKCdBTUlfQURNSU4nKSlcblx0XHR7XG5cdFx0XHRhbWlXZWJBcHAuZmx1c2goKTtcblxuXHRcdFx0JCgnI0M1NDQ4NUMzXzQ0RjhfQ0U4RV8wRjU0X0JGODQ3Q0VFQ0UxMScpLnNob3coKTtcblx0XHRcdCQoJyNDQjYwMzZCN181OTcxXzQxQzJfMTE5NF9GNUEwNTFCMjFFQTAnKS5zaG93KCk7XG5cblx0XHRcdGlmKHRoaXMuc3Vic3ViYXBwLm9uTG9naW4pXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB0aGlzLnN1YnN1YmFwcC5vbkxvZ2luKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLm9uTG9nb3V0KCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5lcnJvcignQWRtaW5pc3RyYXRvciByb2xlcyByZXF1aXJlZCEnKTtcblxuXHRcdCQoJyNDNTQ0ODVDM180NEY4X0NFOEVfMEY1NF9CRjg0N0NFRUNFMTEnKS5oaWRlKCk7XG5cdFx0JCgnI0NCNjAzNkI3XzU5NzFfNDFDMl8xMTk0X0Y1QTA1MUIyMUVBMCcpLmhpZGUoKTtcblxuXHRcdGlmKHRoaXMuc3Vic3ViYXBwLm9uTG9nb3V0KVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLnN1YnN1YmFwcC5vbkxvZ291dCgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZpbmROZXdDb21tYW5kczogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0ZpbmROZXdDb21tYW5kcycpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZsdXNoQ29tbWFuZENhY2hlOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hDb21tYW5kQ2FjaGUnKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmbHVzaFNlcnZlckNhY2hlc0Zhc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdGbHVzaFNlcnZlckNhY2hlcycpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZsdXNoU2VydmVyQ2FjaGVzU2xvdzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0ZsdXNoU2VydmVyQ2FjaGVzIC1mdWxsJykuZG9uZSgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuc3VjY2VzcyhtZXNzYWdlLCB0cnVlKTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBHTE9CQUwgSU5TVEFOQ0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBhZG1pbkRhc2hib2FyZEFwcCA9IG5ldyBBZG1pbkRhc2hib2FyZEFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
