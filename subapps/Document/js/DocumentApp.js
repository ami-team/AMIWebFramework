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
    this._load(userdata || 'home.html');
  },

  /*----------------------------------------------------------------------------------------------------------------*/
  _load: function _load(page) {
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
        _this._load('404.html');
      }
    });
  }
  /*----------------------------------------------------------------------------------------------------------------*/

});
/*--------------------------------------------------------------------------------------------------------------------*/

/* GLOBAL INSTANCE                                                                                                    */

/*--------------------------------------------------------------------------------------------------------------------*/

documentApp = new DocumentApp();
/*--------------------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRvY3VtZW50QXBwLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIlN1YkFwcCIsIm9uUmVhZHkiLCJ1c2VyZGF0YSIsIl9sb2FkIiwicGFnZSIsInVybCIsImFtaVdlYkFwcCIsIm9yaWdpblVSTCIsIiQiLCJhamF4IiwiY2FjaGUiLCJkYXRhVHlwZSIsImNvbnRleHQiLCJkb25lIiwiZGF0YSIsImZpbGxCcmVhZGNydW1iIiwid2ViQXBwVVJMIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidGV4dFRvSHRtbCIsInJlcGxhY2VIVE1MIiwiZmFpbCIsImRvY3VtZW50QXBwIiwiRG9jdW1lbnRBcHAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUNBOztBQUNBO0FBRUFBLFNBQVMsQ0FBQyxhQUFELEVBQWdCO0FBQ3hCO0FBRUFDLEVBQUFBLFFBQVEsRUFBRUMsR0FBRyxDQUFDQyxNQUhVOztBQUt4QjtBQUVBQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNDLFFBQVQsRUFDVDtBQUNDLFNBQUtDLEtBQUwsQ0FBV0QsUUFBUSxJQUFJLFdBQXZCO0FBQ0EsR0FWdUI7O0FBWXhCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxJQUFULEVBQ1A7QUFBQTs7QUFDQyxRQUFJQyxHQUFHLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBVixHQUFzQixRQUF0QixHQUFpQ0gsSUFBM0M7QUFFQUksSUFBQUEsQ0FBQyxDQUFDQyxJQUFGLENBQU87QUFDTkosTUFBQUEsR0FBRyxFQUFFQSxHQURDO0FBRU5LLE1BQUFBLEtBQUssRUFBRSxLQUZEO0FBR05DLE1BQUFBLFFBQVEsRUFBRSxNQUhKO0FBSU5DLE1BQUFBLE9BQU8sRUFBRTtBQUpILEtBQVAsRUFLR0MsSUFMSCxDQUtRLFVBQUNDLElBQUQsRUFBVTtBQUVqQlIsTUFBQUEsU0FBUyxDQUFDUyxjQUFWLENBQXlCLENBQ3hCLGNBQWNULFNBQVMsQ0FBQ1UsU0FBeEIsR0FBb0MsaUNBRFosRUFFeEIsY0FBY1YsU0FBUyxDQUFDVSxTQUF4QixHQUFvQyw0QkFBcEMsR0FBbUVDLGtCQUFrQixDQUFDYixJQUFELENBQXJGLEdBQThGLElBQTlGLEdBQXFHRSxTQUFTLENBQUNZLFVBQVYsQ0FBcUJkLElBQXJCLENBQXJHLEdBQWtJLE1BRjFHLENBQXpCO0FBS0FFLE1BQUFBLFNBQVMsQ0FBQ2EsV0FBVixDQUFzQixtQkFBdEIsRUFBMkNMLElBQTNDO0FBRUEsS0FkRCxFQWNHTSxJQWRILENBY1EsWUFBTTtBQUViLFVBQUdoQixJQUFJLEtBQUssVUFBWixFQUNBO0FBQ0MsUUFBQSxLQUFJLENBQUNELEtBQUwsQ0FBVyxVQUFYO0FBQ0E7QUFDRCxLQXBCRDtBQXFCQTtBQUVEOztBQXpDd0IsQ0FBaEIsQ0FBVDtBQTRDQTs7QUFDQTs7QUFDQTs7QUFFQWtCLFdBQVcsR0FBRyxJQUFJQyxXQUFKLEVBQWQ7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtIVtWQUxVRSBZRUFSXSBUaGUgQU1JIFRlYW1cbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBEb2N1bWVudEFwcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ0RvY3VtZW50QXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24odXNlcmRhdGEpXG5cdHtcblx0XHR0aGlzLl9sb2FkKHVzZXJkYXRhIHx8ICdob21lLmh0bWwnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9sb2FkOiBmdW5jdGlvbihwYWdlKVxuXHR7XG5cdFx0dmFyIHVybCA9IGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2RvY3MvJyArIHBhZ2U7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRjYWNoZTogZmFsc2UsXG5cdFx0XHRkYXRhVHlwZTogJ2h0bWwnLFxuXHRcdFx0Y29udGV4dDogdGhpcyxcblx0XHR9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5maWxsQnJlYWRjcnVtYihbXG5cdFx0XHRcdCc8YSBocmVmPVwiJyArIGFtaVdlYkFwcC53ZWJBcHBVUkwgKyAnP3N1YmFwcD1kb2N1bWVudFwiPkRvY3VtZW50czwvYT4nLFxuXHRcdFx0XHQnPGEgaHJlZj1cIicgKyBhbWlXZWJBcHAud2ViQXBwVVJMICsgJz9zdWJhcHA9ZG9jdW1lbnQmdXNlcmRhdGE9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYWdlKSArICdcIj4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwocGFnZSkgKyAnPC9hPicsXG5cdFx0XHRdKTtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGEpO1xuXG5cdFx0fSkuZmFpbCgoKSA9PiB7XG5cblx0XHRcdGlmKHBhZ2UgIT09ICc0MDQuaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX2xvYWQoJzQwNC5odG1sJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmRvY3VtZW50QXBwID0gbmV3IERvY3VtZW50QXBwKCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
