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
$AMIClass('SimpleSearchApp', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady(userdata) {
    var _this = this;

    var result = $.Deferred();
    amiWebApp.loadResources(['subapps/SimpleSearch/twig/SimpleSearchApp.twig', 'subapps/SimpleSearch/twig/interface.twig', 'ctrl:simpleSearch', 'ctrl:tab']).done(function (data) {
      _this.searchCtor = data[2];
      _this.tabCtrl = new data[3]();
      amiWebApp.replaceHTML('#ami_main_content', data[0]).done(function () {
        _this.tabCtrl.render('#D76D32CB_F57C_B3DD_0C6C_6C45BFE15572', {
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
      amiWebApp.replaceHTML('#DF5986EA_9773_14A1_DA62_82F21B5062CB', _this2.fragmentInterface, {
        dict: dict
      }).done(function () {
        $('#D76D32CB_F57C_B3DD_0C6C_6C45BFE15572').show();
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
    amiWebApp.replaceHTML('#DF5986EA_9773_14A1_DA62_82F21B5062CB', 'Please log-in.').done(function () {
      $('#D76D32CB_F57C_B3DD_0C6C_6C45BFE15572').hide();
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

var simpleSearchApp = new SimpleSearchApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNlYXJjaEFwcC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJTdWJBcHAiLCJvblJlYWR5IiwidXNlcmRhdGEiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwiZG9uZSIsImRhdGEiLCJzZWFyY2hDdG9yIiwidGFiQ3RybCIsInJlcGxhY2VIVE1MIiwicmVuZGVyIiwiY2FyZCIsImZyYWdtZW50SW50ZXJmYWNlIiwic2VhcmNoSW50ZXJmYWNlcyIsImdyb3VwczEiLCJncm91cHMyIiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsInBhcnRzIiwibGVuZ3RoIiwiZ3JvdXAiLCJ0cmltIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJvbkxvZ2luIiwiZ2V0SW50ZXJmYWNlTGlzdCIsIm9uTG9nb3V0IiwibWFza0ludGVyZmFjZUxpc3QiLCJsb2NrIiwic3FsIiwibWFwIiwidGV4dFRvU1FMIiwiam9pbiIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImRpY3QiLCJncm91cHMiLCJhdXRvX29wZW4iLCJyb3ciLCJpZCIsImpzb24iLCJzZWFyY2hJbnRlcmZhY2UiLCJKU09OIiwicGFyc2UiLCJlIiwic2hvdyIsInNlbGVjdCIsInVubG9jayIsIm1lc3NhZ2UiLCJlcnJvciIsImhpZGUiLCJhcHBlbmRJdGVtIiwiY29udGV4dCIsImNsb3NhYmxlIiwic2VsIiwiYWx3YXlzIiwic2ltcGxlU2VhcmNoQXBwIiwiU2ltcGxlU2VhcmNoQXBwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUVBQSxTQUFTLENBQUMsaUJBQUQsRUFBb0I7QUFDNUI7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE1BSGM7O0FBSzVCO0FBRUFDLEVBQUFBLE9BQU8sRUFBRSxpQkFBU0Ms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QSxJQUFJUyxlQUFlLEdBQUcsSUFBSUMsZUFBSixFQUF0QjtBQUVBIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdTaW1wbGVTZWFyY2hBcHAnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5TdWJBcHAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbih1c2VyZGF0YSlcblx0e1xuXHRcdHZhciByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHQnc3ViYXBwcy9TaW1wbGVTZWFyY2gvdHdpZy9TaW1wbGVTZWFyY2hBcHAudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9TaW1wbGVTZWFyY2gvdHdpZy9pbnRlcmZhY2UudHdpZycsXG5cdFx0XHQnY3RybDpzaW1wbGVTZWFyY2gnLFxuXHRcdFx0J2N0cmw6dGFiJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdHRoaXMuc2VhcmNoQ3RvciA9IGRhdGFbMl07XG5cblx0XHRcdHRoaXMudGFiQ3RybCA9IG5ldyBkYXRhWzNdKCk7XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHR0aGlzLnRhYkN0cmwucmVuZGVyKCcjRDc2RDMyQ0JfRjU3Q19CM0REXzBDNkNfNkM0NUJGRTE1NTcyJywge2NhcmQ6IGZhbHNlfSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLmZyYWdtZW50SW50ZXJmYWNlID0gZGF0YVsxXTtcblxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlcyA9IHt9O1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0dGhpcy5ncm91cHMxID0gW107XG5cdFx0XHRcdFx0dGhpcy5ncm91cHMyID0gW107XG5cblx0XHRcdFx0XHRpZih1c2VyZGF0YSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1c2VyZGF0YS5zcGxpdCgnLCcpLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXJ0cyA9IGl0ZW0uc3BsaXQoJzonKTtcblxuXHRcdFx0XHRcdFx0XHQvKiovXG5cblx0XHRcdFx0XHRcdFx0aWYocGFydHMubGVuZ3RoID4gMClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGdyb3VwID0gcGFydHNbMF0udHJpbSgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5ncm91cHMxLmluZGV4T2YoZ3JvdXApIDwgMClcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmdyb3VwczEucHVzaChncm91cCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYocGFydHMubGVuZ3RoID4gMSlcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBuYW1lID0gcGFydHNbMV0udHJpbSgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLmdyb3VwczIuaW5kZXhPZihncm91cCArICc6JyArIG5hbWUpIDwgMClcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5ncm91cHMyLnB1c2goKGdyb3VwICsgJzonICsgbmFtZSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdChkYXRhKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvbkxvZ2luOiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLmdldEludGVyZmFjZUxpc3QoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9nb3V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHR0aGlzLm1hc2tJbnRlcmZhY2VMaXN0KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRJbnRlcmZhY2VMaXN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0Y29uc3Qgc3FsID0gKHRoaXMuZ3JvdXBzMS5sZW5ndGggPT09IDApID8gJ1NFTEVDVCBgaWRgLCBgZ3JvdXBgLCBgbmFtZWAsIGByYW5rYCwgYGpzb25gIEZST00gYHJvdXRlcl9zZWFyY2hfaW50ZXJmYWNlYCBXSEVSRSBgYXJjaGl2ZWRgID0gMCBPUkRFUiBCWSBgcmFua2AgQVNDLCBgZ3JvdXBgIEFTQywgYG5hbWVgIEFTQydcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnU0VMRUNUIGBpZGAsIGBncm91cGAsIGBuYW1lYCwgYHJhbmtgLCBganNvbmAgRlJPTSBgcm91dGVyX3NlYXJjaF9pbnRlcmZhY2VgIFdIRVJFIGBhcmNoaXZlZGAgPSAwIEFORCBgZ3JvdXBgIElOICgnICsgdGhpcy5ncm91cHMxLm1hcChncm91cCA9PiAnXFwnJyArIGFtaVdlYkFwcC50ZXh0VG9TUUwoZ3JvdXApICsgJ1xcJycpLmpvaW4oJywgJykgKyAnKSBPUkRFUiBCWSBgcmFua2AgQVNDLCBgZ3JvdXBgIEFTQywgYG5hbWVgIEFTQydcblx0XHQ7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1NlYXJjaFF1ZXJ5IC1jYXRhbG9nPVwic2VsZlwiIC1lbnRpdHk9XCJyb3V0ZXJfc2VhcmNoX2ludGVyZmFjZVwiIC1zcWw9XCInICsgc3FsICsgJ1wiJykuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRjb25zdCByb3dzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3cnLCBkYXRhKTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IHtcblx0XHRcdFx0Z3JvdXBzOiB7fSxcblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IGF1dG9fb3BlbiA9IFtdO1xuXG5cdFx0XHRyb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IGlkID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImlkXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBncm91cCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJncm91cFwifS4kJywgcm93KVswXSB8fCAnJztcblx0XHRcdFx0Y29uc3QgbmFtZSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYW1lXCJ9LiQnLCByb3cpWzBdIHx8ICcnO1xuXHRcdFx0XHRjb25zdCBqc29uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImpzb25cIn0uJCcsIHJvdylbMF0gfHwgJyc7XG5cblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZighKGdyb3VwIGluIGRpY3QuZ3JvdXBzKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkaWN0Lmdyb3Vwc1tncm91cF0gPSBbXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB7XG5cdFx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRcdFx0anNvbjogSlNPTi5wYXJzZShqc29uKSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0ZGljdC5ncm91cHNbZ3JvdXBdLnB1c2goc2VhcmNoSW50ZXJmYWNlKTtcblxuXHRcdFx0XHRcdHRoaXMuc2VhcmNoSW50ZXJmYWNlc1tpZF0gPSBzZWFyY2hJbnRlcmZhY2U7XG5cblx0XHRcdFx0XHRpZih0aGlzLmdyb3VwczIuaW5kZXhPZihncm91cCArICc6JyArIG5hbWUpID49IDApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXV0b19vcGVuLnB1c2goaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNERjU5ODZFQV85NzczXzE0QTFfREE2Ml84MkYyMUI1MDYyQ0InLCB0aGlzLmZyYWdtZW50SW50ZXJmYWNlLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdCQoJyNENzZEMzJDQl9GNTdDX0IzRERfMEM2Q182QzQ1QkZFMTU1NzInKS5zaG93KCk7XG5cblx0XHRcdFx0YXV0b19vcGVuLmZvckVhY2goKGl0ZW0pID0+IHtcblxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0KGl0ZW0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmVycm9yKG1lc3NhZ2UsIHRydWUpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0bWFza0ludGVyZmFjZUxpc3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0RGNTk4NkVBXzk3NzNfMTRBMV9EQTYyXzgyRjIxQjUwNjJDQicsICdQbGVhc2UgbG9nLWluLicpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQkKCcjRDc2RDMyQ0JfRjU3Q19CM0REXzBDNkNfNkM0NUJGRTE1NTcyJykuaGlkZSgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2VsZWN0OiBmdW5jdGlvbihpZClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRjb25zdCBzZWFyY2hJbnRlcmZhY2UgPSB0aGlzLnNlYXJjaEludGVyZmFjZXNbaWRdO1xuXG5cdFx0dGhpcy50YWJDdHJsLmFwcGVuZEl0ZW0oc2VhcmNoSW50ZXJmYWNlLm5hbWUsIHtjb250ZXh0OiB0aGlzLCBjbG9zYWJsZTogdHJ1ZX0pLmRvbmUoKHNlbCkgPT4ge1xuXG5cdFx0XHRzZWFyY2hJbnRlcmZhY2UuanNvbi5uYW1lID0gc2VhcmNoSW50ZXJmYWNlLm5hbWU7XG5cblx0XHRcdG5ldyB0aGlzLnNlYXJjaEN0b3IodGhpcy50YWJDdHJsKS5yZW5kZXIoc2VsLCBzZWFyY2hJbnRlcmZhY2UuanNvbikuYWx3YXlzKCgpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogR0xPQkFMIElOU1RBTkNFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIHNpbXBsZVNlYXJjaEFwcCA9IG5ldyBTaW1wbGVTZWFyY2hBcHAoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
