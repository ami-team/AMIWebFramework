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
$AMIClass('MessageBoxCtrl', {
  /*---------------------------------------------------------------------*/
  $extends: ami.Control,

  /*---------------------------------------------------------------------*/
  $init: function $init(parent, owner) {
    this.$super.$init(parent, owner);
  },

  /*---------------------------------------------------------------------*/
  onReady: function onReady() {
    var _this = this;

    return amiWebApp.loadResources([amiWebApp.originURL + '/controls/MessageBox/twig/MessageBoxCtrl.twig', amiWebApp.originURL + '/js/3rd-party/clipboard.min.js']).done(function (data) {
      amiWebApp.appendHTML('body', data[0]).done(function () {
        var _class = _this.$class;
        /*---------------------------------------------------------*/

        $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').on('hidden.bs.modal', function () {
          _class.deferred.resolveWith(_class.context || _class.deferred);
        });
        /*---------------------------------------------------------*/

        new ClipboardJS('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]');
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
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body').text(text || '');
    $('#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548').modal('show');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2VCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsIkNsaXBib2FyZEpTIiwicmVuZGVyIiwidGV4dCIsInNldHRpbmdzIiwiRGVmZXJyZWQiLCJzZXR1cCIsInRpdGxlIiwidW5sb2NrIiwibW9kYWwiLCJwcm9taXNlIiwic2hvdyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUVBQSxTQUFTLENBQUMsZ0JBQUQsRUFBbUI7QUFDM0I7QUFFQUMsRUFBQUEsUUFBUSxFQUFFQyxHQUFHLENBQUNDLE9BSGE7O0FBSzNCO0FBRUFDLEVBQUFBLEtBQUssRUFBRSxlQUFTQyxNQUFULEVBQWlCQyxLQUFqQixFQUNQO0FBQ0MsU0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixFQUEwQkMsS0FBMUI7QUFDQSxHQVYwQjs7QUFZM0I7QUFFQUUsRUFBQUEsT0FBTyxFQUFFLG1CQUNUO0FBQUE7O0FBQ0MsV0FBT0MsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsR0FBc0IsK0NBRFEsRUFFOUJGLFNBQVMsQ0FBQ0UsU0FBVixHQUFzQixnQ0FGUSxDQUF4QixFQUdKQyxJQUhJLENBR0MsVUFBQ0MsSUFBRCxFQUFVO0FBRWpCSixNQUFBQSxTQUFTLENBQUNLLFVBQVYsQ0FBcUIsTUFBckIsRUFBNkJELElBQUksQ0FBQyxDQUFELENBQWpDLEVBQXNDRCxJQUF0QyxDQUEyQyxZQUFNO0FBRWhELFlBQU1HLE1BQU0sR0FBRyxLQUFJLENBQUNDLE1BQXBCO0FBRUE7O0FBRUFDLFFBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDQyxFQUEzQyxDQUE4QyxpQkFBOUMsRUFBaUUsWUFBTTtBQUV0RUgsVUFBQUEsTUFBTSxDQUFDSSxRQUFQLENBQWdCQyxXQUFoQixDQUE0QkwsTUFBTSxDQUFDTSxPQUFQLElBQWtCTixNQUFNLENBQUNJLFFBQXJEO0FBQ0EsU0FIRDtBQUtBOztBQUVBLFlBQUlHLFdBQUosQ0FBZ0IsbUVBQWhCO0FBRUE7QUFDQSxPQWhCRDtBQWlCQSxLQXRCTSxDQUFQO0FBdUJBLEdBdkMwQjs7QUF5QzNCO0FBRUFDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsSUFBVCxFQUFlQyxRQUFmLEVBQ1I7QUFDQyxRQUFNTixRQUFRLEdBQUdGLENBQUMsQ0FBQ1MsUUFBRixFQUFqQjtBQUVBOztBQUhELDJCQU9LakIsU0FBUyxDQUFDa0IsS0FBVixDQUNILENBQUMsU0FBRCxFQUFZLE9BQVosQ0FERyxFQUVILENBQUNSLFFBQUQsRUFBVyxVQUFYLENBRkcsRUFHSE0sUUFIRyxDQVBMO0FBQUEsUUFNRUosT0FORjtBQUFBLFFBTVdPLEtBTlg7QUFhQzs7O0FBRUFuQixJQUFBQSxTQUFTLENBQUNvQixNQUFWO0FBRUFaLElBQUFBLENBQUMsQ0FBQyxtREFBRCxDQUFELENBQXVETyxJQUF2RCxDQUE0REEsSUFBSSxJQUFJLEVBQXBFO0FBRUFQLElBQUFBLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDYSxLQUEzQyxDQUFpRCxNQUFqRDtBQUVBLFNBQUtkLE1BQUwsQ0FBWUcsUUFBWixHQUF1QkEsUUFBdkI7QUFDQSxTQUFLSCxNQUFMLENBQVlLLE9BQVosR0FBc0JBLE9BQXRCO0FBRUE7O0FBRUEsV0FBT0YsUUFBUSxDQUFDWSxPQUFULEVBQVA7QUFFQTtBQUNBLEdBekUwQjs7QUEyRTNCO0FBRUFDLEVBQUFBLElBQUksRUFBRSxjQUFTUixJQUFULEVBQWVDLFFBQWYsRUFDTjtBQUNDLFdBQU8sS0FBS0YsTUFBTCxDQUFZQyxJQUFaLEVBQWtCQyxRQUFsQixDQUFQO0FBQ0E7QUFFRDs7QUFsRjJCLENBQW5CLENBQVQ7QUFxRkEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIElOMlAzXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICogQGdsb2JhbCBDbGlwYm9hcmRKU1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ01lc3NhZ2VCb3hDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvTWVzc2FnZUJveC90d2lnL01lc3NhZ2VCb3hDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NsaXBib2FyZC5taW4uanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRfY2xhc3MuZGVmZXJyZWQucmVzb2x2ZVdpdGgoX2NsYXNzLmNvbnRleHQgfHwgX2NsYXNzLmRlZmVycmVkKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG5ldyBDbGlwYm9hcmRKUygnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCAuYnRuW2RhdGEtY2xpcGJvYXJkLXRhcmdldF0nKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LCB0aXRsZVxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAndGl0bGUnXSxcblx0XHRcdFtkZWZlcnJlZCwgJ0VkaXQgYm94J10sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblxuXHRcdCQoJyNFN0MwRUI2Ql80QzlFX0JBOERfN0ZEQV9GMjNGNDdEQTg1NDggLm1vZGFsLWJvZHknKS50ZXh0KHRleHQgfHwgJycpO1xuXG5cdFx0JCgnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCcpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLiRjbGFzcy5kZWZlcnJlZCA9IGRlZmVycmVkO1xuXHRcdHRoaXMuJGNsYXNzLmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3c6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKHRleHQsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
