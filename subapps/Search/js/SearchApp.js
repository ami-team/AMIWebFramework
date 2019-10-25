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

/*--------------------------------------------------------------------------------------------------------------------*/
$AMIClass('SearchApp', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady(userdata) {
    var _this = this;

    var result = $.Deferred();
    amiWebApp.loadResources(['subapps/Search/twig/SearchApp.twig', 'subapps/Search/twig/interface.twig', 'ctrl:search', 'ctrl:tab']).done(function (data) {
      _this.searchCtor = data[2];
      _this.tabCtrl = new data[3]();
      amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function () {
        _this.tabCtrl.render('#FE8BB925_A267_F972_060E_CC9C70D0C6D2', {
          card: false
        }).done(function () {
          /*------------------------------------------------------------------------------------------------*/
          _this.fragmentInterface = data[1];
          _this.searchInterfaces = {};
          /*------------------------------------------------------------------------------------------------*/

          _this.groups1 = [];
          _this.groups2 = [];

          if (userdata) {
            userdata.split(',').forEach(function (item) {
              var parts = item.split(':');
              /**/

              if (parts.length > 0) {
                var group = parts[0].trim();

                if (_this.groups1.indexOf(group) < 0) {
                  _this.groups1.push(group);
                }

                if (parts.length > 1) {
                  var name = parts[1].trim();

                  if (_this.groups2.indexOf(group + ':' + name) < 0) {
                    _this.groups2.push(group + ':' + name);
                  }
                }
              }
            });
          }
          /*------------------------------------------------------------------------------------------------*/


          result.resolve();
        });
      });
    }).fail(function (data) {
      result.reject(data);
    });
    return result;
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogin: function onLogin() {
    this.getInterfaceList();
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  onLogout: function onLogout() {
    this.maskInterfaceList();
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  getInterfaceList: function getInterfaceList() {
    var _this2 = this;

    amiWebApp.lock();
    var sql = this.groups1.length === 0 ? 'SELECT `id`, `group`, `name`, `rank`, `json` FROM `router_search_interface` WHERE `archived` = 0 ORDER BY `rank` ASC, `group` ASC, `name` ASC' : 'SELECT `id`, `group`, `name`, `rank`, `json` FROM `router_search_interface` WHERE `archived` = 0 AND `group` IN (' + this.groups1.map(function (group) {
      return '\'' + amiWebApp.textToSQL(group) + '\'';
    }).join(', ') + ') ORDER BY `rank` ASC, `group` ASC, `name` ASC';
    amiCommand.execute('SearchQuery -catalog="self" -entity="router_search_interface" -sql="' + sql + '"').done(function (data) {
      var rows = amiWebApp.jspath('..row', data);
      var dict = {
        groups: {}
      };
      var auto_open = [];
      rows.forEach(function (row) {
        var id = amiWebApp.jspath('..field{.@name==="id"}.$', row)[0] || '';
        var group = amiWebApp.jspath('..field{.@name==="group"}.$', row)[0] || '';
        var name = amiWebApp.jspath('..field{.@name==="name"}.$', row)[0] || '';
        var json = amiWebApp.jspath('..field{.@name==="json"}.$', row)[0] || '';

        try {
          if (!(group in dict.groups)) {
            dict.groups[group] = [];
          }

          var searchInterface = {
            id: id,
            name: name,
            json: JSON.parse(json)
          };
          dict.groups[group].push(searchInterface);
          _this2.searchInterfaces[id] = searchInterface;

          if (_this2.groups2.indexOf(group + ':' + name) >= 0) {
            auto_open.push(id);
          }
        } catch (e) {
          /* IGNORE */
        }
      });
      amiWebApp.replaceHTML('#CCFE77D9_5798_A236_8108_E59AE44FB242', _this2.fragmentInterface, {
        dict: dict
      }).done(function () {
        $('#FE8BB925_A267_F972_060E_CC9C70D0C6D2').show();
        auto_open.forEach(function (item) {
          _this2.select(item);
        });
        amiWebApp.unlock();
      });
    }).fail(function (data, message) {
      amiWebApp.error(message, true);
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  maskInterfaceList: function maskInterfaceList() {
    amiWebApp.replaceHTML('#CCFE77D9_5798_A236_8108_E59AE44FB242', 'Please log-in.').done(function () {
      $('#FE8BB925_A267_F972_060E_CC9C70D0C6D2').hide();
    });
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  select: function select(id) {
    var _this3 = this;

    amiWebApp.lock();
    var searchInterface = this.searchInterfaces[id];
    this.tabCtrl.appendItem(searchInterface.name, {
      context: this,
      closable: true
    }).done(function (sel) {
      searchInterface.json.name = searchInterface.name;
      new _this3.searchCtor(_this3.tabCtrl).render(sel, searchInterface.json).always(function () {
        amiWebApp.unlock();
      });
    });
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

var searchApp = new SearchApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlYXJjaEFwcC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJTdWJBcHAiLCJvblJlYWR5IiwidXNlcmRhdGEiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwiZG9uZSIsImRhdGEiLCJzZWFyY2hDdG9yIiwidGFiQ3RybCIsInJlcGxhY2VIVE1MIiwicmVuZGVyIiwiY2FyZCIsImZyYWdtZW50SW50ZXJmYWNlIiwic2VhcmNoSW50ZXJmYWNlcyIsImdyb3VwczEiLCJncm91cHMyIiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsInBhcnRzIiwibGVuZ3RoIiwiZ3JvdXAiLCJ0cmltIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJvbkxvZ2luIiwiZ2V0SW50ZXJmYWNlTGlzdCIsIm9uTG9nb3V0IiwibWFza0ludGVyZmFjZUxpc3QiLCJsb2NrIiwic3FsIiwibWFwIiwidGV4dFRvU1FMIiwiam9pbiIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJncm91cHMiLCJhdXRvX29wZW4iLCJyb3ciLCJpZCIsImpzb24iLCJzZWFyY2hJbnRlcmZhY2UiLCJKU09OIiwicGFyc2UiLCJlIiwic2hvdyIsInNlbGVjdCIsInVubG9jayIsIm1lc3NhZ2UiLCJlcnJvciIsImhpZGUiLCJhcHBlbmRJdGVtIiwiY29udGV4dCIsImNsb3NhYmxlIiwic2VsIiwiYWx3YXlzIiwic2VhcmNoQXBwIiwiU2VhcmNoQXBwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUVBQSxTQUFTLENBQUMsV0FBRCxFQUFjO0FBQ3RCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhROztBQUt0QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNDLFFBQVQsRUFDVDtBQUFBOztBQUND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QyxTQUFKLEVBQWhCO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ1NlYXJjaEFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKHVzZXJkYXRhKVxuXHR7XG5cdFx0dmFyIHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL1NlYXJjaC90d2lnL1NlYXJjaEFwcC50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NlYXJjaC90d2lnL2ludGVyZmFjZS50d2lnJyxcblx0XHRcdCdjdHJsOnNlYXJjaCcsXG5cdFx0XHQnY3RybDp0YWInLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5zZWFyY2hDdG9yID0gZGF0YVsyXTtcblxuXHRcdFx0dGhpcy50YWJDdHJsID0gbmV3IGRhdGFbM10oKTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdHRoaXMudGFiQ3RybC5yZW5kZXIoJyNGRThCQjkyNV9BMjY3X0Y5NzJfMDYwRV9DQzlDNzBEMEM2RDInLCB7Y2FyZDogZmFsc2V9KS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UgPSBkYXRhWzFdO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzID0ge307XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLmdyb3VwczEgPSBbXTtcblx0XHRcdFx0XHR0aGlzLmdyb3VwczIgPSBbXTtcblxuXHRcdFx0XHRcdGlmKHVzZXJkYXRhKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHVzZXJkYXRhLnNwbGl0KCcsJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhcnRzID0gaXRlbS5zcGxpdCgnOicpO1xuXG5cdFx0XHRcdFx0XHRcdC8qKi9cblxuXHRcdFx0XHRcdFx0XHRpZihwYXJ0cy5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgZ3JvdXAgPSBwYXJ0c1swXS50cmltKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLmdyb3VwczEuaW5kZXhPZihncm91cCkgPCAwKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZ3JvdXBzMS5wdXNoKGdyb3VwKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRpZihwYXJ0cy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5hbWUgPSBwYXJ0c1sxXS50cmltKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ3JvdXBzMi5pbmRleE9mKGdyb3VwICsgJzonICsgbmFtZSkgPCAwKVxuXHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmdyb3VwczIucHVzaCgoZ3JvdXAgKyAnOicgKyBuYW1lKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KGRhdGEpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuZ2V0SW50ZXJmYWNlTGlzdCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMubWFza0ludGVyZmFjZUxpc3QoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRjb25zdCBzcWwgPSAodGhpcy5ncm91cHMxLmxlbmd0aCA9PT0gMCkgPyAnU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYHJhbmtgLCBganNvbmAgRlJPTSBgcm91dGVyX3NlYXJjaF9pbnRlcmZhY2VgIFdIRVJFIGBhcmNoaXZlZGAgPSAwIE9SREVSIEJZIGByYW5rYCBBU0MsIGBncm91cGAgQVNDLCBgbmFtZWAgQVNDJ1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdTRUxFQ1QgYGlkYCwgYGdyb3VwYCwgYG5hbWVgLCBgcmFua2AsIGBqc29uYCBGUk9NIGByb3V0ZXJfc2VhcmNoX2ludGVyZmFjZWAgV0hFUkUgYGFyY2hpdmVkYCA9IDAgQU5EIGBncm91cGAgSU4gKCcgKyB0aGlzLmdyb3VwczEubWFwKGdyb3VwID0+ICdcXCcnICsgYW1pV2ViQXBwLnRleHRUb1NRTChncm91cCkgKyAnXFwnJykuam9pbignLCAnKSArICcpIE9SREVSIEJZIGByYW5rYCBBU0MsIGBncm91cGAgQVNDLCBgbmFtZWAgQVNDJ1xuXHRcdDtcblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnU2VhcmNoUXVlcnkgLWNhdGFsb2c9XCJzZWxmXCIgLWVudGl0eT1cInJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlXCIgLXNxbD1cIicgKyBzcWwgKyAnXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IHJvd3MgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvdycsIGRhdGEpO1xuXG5cdFx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0XHRncm91cHM6IHt9LFxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgYXV0b19vcGVuID0gW107XG5cblx0XHRcdHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgaWQgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaWRcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGdyb3VwID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImdyb3VwXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBuYW1lID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm5hbWVcIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cdFx0XHRcdGNvbnN0IGpzb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwianNvblwifS4kJywgcm93KVswXSB8fCAnJztcblxuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCEoZ3JvdXAgaW4gZGljdC5ncm91cHMpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpY3QuZ3JvdXBzW2dyb3VwXSA9IFtdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHtcblx0XHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdFx0XHRqc29uOiBKU09OLnBhcnNlKGpzb24pLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRkaWN0Lmdyb3Vwc1tncm91cF0ucHVzaChzZWFyY2hJbnRlcmZhY2UpO1xuXG5cdFx0XHRcdFx0dGhpcy5zZWFyY2hJbnRlcmZhY2VzW2lkXSA9IHNlYXJjaEludGVyZmFjZTtcblxuXHRcdFx0XHRcdGlmKHRoaXMuZ3JvdXBzMi5pbmRleE9mKGdyb3VwICsgJzonICsgbmFtZSkgPj0gMClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRhdXRvX29wZW4ucHVzaChpZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0NDRkU3N0Q5XzU3OThfQTIzNl84MTA4X0U1OUFFNDRGQjI0MicsIHRoaXMuZnJhZ21lbnRJbnRlcmZhY2UsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0JCgnI0ZFOEJCOTI1X0EyNjdfRjk3Ml8wNjBFX0NDOUM3MEQwQzZEMicpLnNob3coKTtcblxuXHRcdFx0XHRhdXRvX29wZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3QoaXRlbSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRtYXNrSW50ZXJmYWNlTGlzdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjQ0NGRTc3RDlfNTc5OF9BMjM2XzgxMDhfRTU5QUU0NEZCMjQyJywgJ1BsZWFzZSBsb2ctaW4uJykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQoJyNGRThCQjkyNV9BMjY3X0Y5NzJfMDYwRV9DQzlDNzBEMEM2RDInKS5oaWRlKCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZWxlY3Q6IGZ1bmN0aW9uKGlkKVxuXHR7XG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdGNvbnN0IHNlYXJjaEludGVyZmFjZSA9IHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF07XG5cblx0XHR0aGlzLnRhYkN0cmwuYXBwZW5kSXRlbShzZWFyY2hJbnRlcmZhY2UubmFtZSwge2NvbnRleHQ6IHRoaXMsIGNsb3NhYmxlOiB0cnVlfSkuZG9uZSgoc2VsKSA9PiB7XG5cblx0XHRcdHNlYXJjaEludGVyZmFjZS5qc29uLm5hbWUgPSBzZWFyY2hJbnRlcmZhY2UubmFtZTtcblxuXHRcdFx0bmV3IHRoaXMuc2VhcmNoQ3Rvcih0aGlzLnRhYkN0cmwpLnJlbmRlcihzZWwsIHNlYXJjaEludGVyZmFjZS5qc29uKS5hbHdheXMoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBHTE9CQUwgSU5TVEFOQ0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgc2VhcmNoQXBwID0gbmV3IFNlYXJjaEFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
