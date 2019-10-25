/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

/* DocumentApp                                                                                                        */

/*--------------------------------------------------------------------------------------------------------------------*/
$AMIClass('DocumentApp', {
  /*----------------------------------------------------------------------------------------------------------------*/
  $extends: ami.SubApp,

  /*----------------------------------------------------------------------------------------------------------------*/
  onReady: function onReady(userdata) {
    this.loadPage(userdata || 'home.html');
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  loadPage: function loadPage(page) {
    var _this = this;

    var url = amiWebApp.originURL + '/docs/' + page;
    $.ajax({
      url: url,
      cache: false,
      dataType: 'html',
      context: this
    }).done(function (data) {
      amiWebApp.fillBreadcrumb(['<a href="' + amiWebApp.webAppURL + '?subapp=document">Documents</a>', '<a href="' + amiWebApp.webAppURL + '?subapp=document&userdata=' + encodeURIComponent(page) + '">' + amiWebApp.textToHtml(page) + '</a>']);
      amiWebApp.replaceHTML('#ami_main_content', data);
    }).fail(function () {
      if (page !== '404.html') {
        _this.loadPage('404.html');
      }
    });
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

var documentApp = new DocumentApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRvY3VtZW50QXBwLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIlN1YkFwcCIsIm9uUmVhZHkiLCJ1c2VyZGF0YSIsImxvYWRQYWdlIiwicGFnZSIsInVybCIsImFtaVdlYkFwcCIsIm9yaWdpblVSTCIsIiQiLCJhamF4IiwiY2FjaGUiLCJkYXRhVHlwZSIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZpbGxCcmVhZGNydW1iIiwid2ViQXBwVVJMIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidGV4dFRvSHRtbCIsInJlcGxhY2VIVE1MIiwiZmFpbCIsImRvY3VtZW50QXBwIiwiRG9jdW1lbnRBcHAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUNBOztBQUNBO0FBRUFBLFNBQVMsQ0FBQyxhQUFELEVBQWdCO0FBQ3hCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhVOztBQUt4QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNDLFFBQVQsRUFDVDtBQUNDLFNBQUtDLFFBQUwsQ0FBY0QsUUFBUSxJQUFJLFdBQTFCO0FBQ0EsR0FWdUI7O0FBWXhCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRSxrQkFBU0MsSUFBVCxFQUNWO0FBQUE7O0FBQ0MsUUFBTUMsR0FBRyxHQUFHQyxTQUFTLENBQUNDLFNBQVYsR0FBc0IsUUFBdEIsR0FBaUNILElBQTdDO0FBRUFJLElBQUFBLENBQUMsQ0FBQ0MsSUFBRixDQUFPO0FBQ05KLE1BQUFBLEdBQUcsRUFBRUEsR0FEQztBQUVOSyxNQUFBQSxLQUFLLEVBQUUsS0FGRDtBQUdOQyxNQUFBQSxRQUFRLEVBQUUsTUFISjtBQUlOQyxNQUFBQSxPQUFPLEVBQUU7QUFKSCxLQUFQLEVBS0dDLElBTEgsQ0FLUSxVQUFDQyxJQUFELEVBQVU7QUFFakJSLE1BQUFBLFNBQVMsQ0FBQ1MsY0FBVixDQUF5QixDQUN4QixjQUFjVCxTQUFTLENBQUNVLFNBQXhCLEdBQW9DLGlDQURaLEVBRXhCLGNBQWNWLFNBQVMsQ0FBQ1UsU0FBeEIsR0FBb0MsNEJBQXBDLEdBQW1FQyxrQkFBa0IsQ0FBQ2IsSUFBRCxDQUFyRixHQUE4RixJQUE5RixHQUFxR0UsU0FBUyxDQUFDWSxVQUFWLENBQXFCZCxJQUFyQixDQUFyRyxHQUFrSSxNQUYxRyxDQUF6QjtBQUtBRSxNQUFBQSxTQUFTLENBQUNhLFdBQVYsQ0FBc0IsbUJBQXRCLEVBQTJDTCxJQUEzQztBQUVBLEtBZEQsRUFjR00sSUFkSCxDQWNRLFlBQU07QUFFYixVQUFHaEIsSUFBSSxLQUFLLFVBQVosRUFDQTtBQUNDLFFBQUEsS0FBSSxDQUFDRCxRQUFMLENBQWMsVUFBZDtBQUNBO0FBQ0QsS0FwQkQ7QUFxQkE7QUFFRDs7QUF6Q3dCLENBQWhCLENBQVQ7QUE0Q0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTWtCLFdBQVcsR0FBRyxJQUFJQyxXQUFKLEVBQXBCO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LSFbVkFMVUUgWUVBUl0gVGhlIEFNSSBUZWFtXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogRG9jdW1lbnRBcHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdEb2N1bWVudEFwcCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLlN1YkFwcCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKHVzZXJkYXRhKVxuXHR7XG5cdFx0dGhpcy5sb2FkUGFnZSh1c2VyZGF0YSB8fCAnaG9tZS5odG1sJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRsb2FkUGFnZTogZnVuY3Rpb24ocGFnZSlcblx0e1xuXHRcdGNvbnN0IHVybCA9IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvJyArIHBhZ2U7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRkYXRhVHlwZTogJ2h0bWwnLFxuXHRcdFx0Y29udGV4dDogdGhpcyxcblx0XHR9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5maWxsQnJlYWRjcnVtYihbXG5cdFx0XHRcdCc8YSBocmVmPVwiJyArIGFtaVdlYkFwcC53ZWJBcHBVUkwgKyAnP3N1YmFwcD1kb2N1bWVudFwiPkRvY3VtZW50czwvYT4nLFxuXHRcdFx0XHQnPGEgaHJlZj1cIicgKyBhbWlXZWJBcHAud2ViQXBwVVJMICsgJz9zdWJhcHA9ZG9jdW1lbnQmdXNlcmRhdGE9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYWdlKSArICdcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocGFnZSkgKyAnPC9hPicsXG5cdFx0XHRdKTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGEpO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdGlmKHBhZ2UgIT09ICc0MDQuaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMubG9hZFBhZ2UoJzQwNC5odG1sJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGRvY3VtZW50QXBwID0gbmV3IERvY3VtZW50QXBwKCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
