/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global ClipboardJS
 *
 */

/*-------------------------------------------------------------------------*/
$AMIClass('TextBoxCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/TextBox/twig/TextBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/clipboard.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        var _class = _this.$class;
        /*---------------------------------------------------------*/

        $('#B8927006_7FCE_87BD_FC8D_C7575D69C362').on('hidden.bs.modal', function () {
          _class.deferred.resolveWith(_class.context || _class.deferred);
        });
        /*---------------------------------------------------------*/

        new ClipboardJS('#B8927006_7FCE_87BD_FC8D_C7575D69C362 .btn[data-clipboard-target]');
        /*---------------------------------------------------------*/
      });
    });
  },

  /*---------------------------------------------------------------------*/
  render: function render(text, settings) {
    var deferred = $.Deferred();
    /*-----------------------------------------------------------------*/

    var _amiWebApp$setup = amiWebApp.setup(['context', 'title'], [deferred, 'Edit box'], settings),
        context = _amiWebApp$setup[0],
        title = _amiWebApp$setup[1];
    /*-----------------------------------------------------------------*/


    amiWebApp.unlock();
    $('#B8927006_7FCE_87BD_FC8D_C7575D69C362 code').html(text ? '<i class="line-number"></i>' + amiWebApp.textToHtml(text).replace(/\n/g, '\n<i class="line-number"></i>') : '');
    $('#B8927006_7FCE_87BD_FC8D_C7575D69C362').modal('show');
    this.$class.deferred = deferred;
    this.$class.context = context;
    /*-----------------------------------------------------------------*/

    return deferred.promise();
    /*-----------------------------------------------------------------*/
  },

  /*---------------------------------------------------------------------*/
  show: function show(text, settings) {
    return this.render(text, settings);
  }
  /*---------------------------------------------------------------------*/

});
/*-------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHRCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsIkNsaXBib2FyZEpTIiwicmVuZGVyIiwidGV4dCIsInNldHRpbmdzIiwiRGVmZXJyZWQiLCJzZXR1cCIsInRpdGxlIiwidW5sb2NrIiwiaHRtbCIsInRleHRUb0h0bWwiLCJyZXBsYWNlIiwibW9kYWwiLCJwcm9taXNlIiwic2hvdyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUVBQSxTQUFTLENBQUMsYUFBRCxFQUFnQjtBQUN4QjtBQUVBQyxFQUFBQSxRQUFRLEVBQUVDLEdBQUcsQ0FBQ0MsT0FIVTs7QUFLeEI7QUFFQUMsRUFBQUEsS0FBSyxFQUFFLGVBQVNDLE1BQVQsRUFBaUJDLEtBQWpCLEVBQ1A7QUFDQyxTQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNBLEdBVnVCOztBQVl4QjtBQUVBRSxFQUFBQSxPQUFPLEVBQUUsbUJBQ1Q7QUFBQTs7QUFDQyxXQUFPQyxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixHQUFzQix5Q0FEUSxFQUU5QkYsU0FBUyxDQUFDRSxTQUFWLEdBQXNCLGdDQUZRLENBQXhCLEVBR0pDLElBSEksQ0FHQyxVQUFDQyxJQUFELEVBQVU7QUFFakJKLE1BQUFBLFNBQVMsQ0FBQ0ssVUFBVixDQUFxQixNQUFyQixFQUE2QkQsSUFBSSxDQUFDLENBQUQsQ0FBakMsRUFBc0NELElBQXRDLENBQTJDLFlBQU07QUFFaEQsWUFBTUcsTUFBTSxHQUFHLEtBQUksQ0FBQ0MsTUFBcEI7QUFFQTs7QUFFQUMsUUFBQUEsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNDLEVBQTNDLENBQThDLGlCQUE5QyxFQUFpRSxZQUFNO0FBRXRFSCxVQUFBQSxNQUFNLENBQUNJLFFBQVAsQ0FBZ0JDLFdBQWhCLENBQTRCTCxNQUFNLENBQUNNLE9BQVAsSUFBa0JOLE1BQU0sQ0FBQ0ksUUFBckQ7QUFDQSxTQUhEO0FBS0E7O0FBRUEsWUFBSUcsV0FBSixDQUFnQixtRUFBaEI7QUFFQTtBQUNBLE9BaEJEO0FBaUJBLEtBdEJNLENBQVA7QUF1QkEsR0F2Q3VCOztBQXlDeEI7QUFFQUMsRUFBQUEsTUFBTSxFQUFFLGdCQUFTQyxJQUFULEVBQWVDLFFBQWYsRUFDUjtBQUNDLFFBQU1OLFFBQVEsR0FBR0YsQ0FBQyxDQUFDUyxRQUFGLEVBQWpCO0FBRUE7O0FBSEQsMkJBT0tqQixTQUFTLENBQUNrQixLQUFWLENBQ0gsQ0FBQyxTQUFELEVBQVksT0FBWixDQURHLEVBRUgsQ0FBQ1IsUUFBRCxFQUFXLFVBQVgsQ0FGRyxFQUdITSxRQUhHLENBUEw7QUFBQSxRQU1FSixPQU5GO0FBQUEsUUFNV08sS0FOWDtBQWFDOzs7QUFFQW5CLElBQUFBLFNBQVMsQ0FBQ29CLE1BQVY7QUFFQVosSUFBQUEsQ0FBQyxDQUFDLDRDQUFELENBQUQsQ0FBZ0RhLElBQWhELENBQXFETixJQUFJLEdBQUcsZ0NBQWdDZixTQUFTLENBQUNzQixVQUFWLENBQXFCUCxJQUFyQixFQUEyQlEsT0FBM0IsQ0FBbUMsS0FBbkMsRUFBMEMsK0JBQTFDLENBQW5DLEdBQWdILEVBQXpLO0FBRUFmLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDZ0IsS0FBM0MsQ0FBaUQsTUFBakQ7QUFFQSxTQUFLakIsTUFBTCxDQUFZRyxRQUFaLEdBQXVCQSxRQUF2QjtBQUNBLFNBQUtILE1BQUwsQ0FBWUssT0FBWixHQUFzQkEsT0FBdEI7QUFFQTs7QUFFQSxXQUFPRixRQUFRLENBQUNlLE9BQVQsRUFBUDtBQUVBO0FBQ0EsR0F6RXVCOztBQTJFeEI7QUFFQUMsRUFBQUEsSUFBSSxFQUFFLGNBQVNYLElBQVQsRUFBZUMsUUFBZixFQUNOO0FBQ0MsV0FBTyxLQUFLRixNQUFMLENBQVlDLElBQVosRUFBa0JDLFFBQWxCLENBQVA7QUFDQTtBQUVEOztBQWxGd0IsQ0FBaEIsQ0FBVDtBQXFGQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIENsaXBib2FyZEpTXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnVGV4dEJveEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UZXh0Qm94L3R3aWcvVGV4dEJveEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY2xpcGJvYXJkLm1pbi5qcycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IF9jbGFzcyA9IHRoaXMuJGNsYXNzO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjQjg5MjcwMDZfN0ZDRV84N0JEX0ZDOERfQzc1NzVENjlDMzYyJykub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdF9jbGFzcy5kZWZlcnJlZC5yZXNvbHZlV2l0aChfY2xhc3MuY29udGV4dCB8fCBfY2xhc3MuZGVmZXJyZWQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bmV3IENsaXBib2FyZEpTKCcjQjg5MjcwMDZfN0ZDRV84N0JEX0ZDOERfQzc1NzVENjlDMzYyIC5idG5bZGF0YS1jbGlwYm9hcmQtdGFyZ2V0XScpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsIHRpdGxlXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd0aXRsZSddLFxuXHRcdFx0W2RlZmVycmVkLCAnRWRpdCBib3gnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0JCgnI0I4OTI3MDA2XzdGQ0VfODdCRF9GQzhEX0M3NTc1RDY5QzM2MiBjb2RlJykuaHRtbCh0ZXh0ID8gJzxpIGNsYXNzPVwibGluZS1udW1iZXJcIj48L2k+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHRleHQpLnJlcGxhY2UoL1xcbi9nLCAnXFxuPGkgY2xhc3M9XCJsaW5lLW51bWJlclwiPjwvaT4nKSA6ICcnKTtcblxuXHRcdCQoJyNCODkyNzAwNl83RkNFXzg3QkRfRkM4RF9DNzU3NUQ2OUMzNjInKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0dGhpcy4kY2xhc3MuZGVmZXJyZWQgPSBkZWZlcnJlZDtcblx0XHR0aGlzLiRjbGFzcy5jb250ZXh0ID0gY29udGV4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93OiBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcih0ZXh0LCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
