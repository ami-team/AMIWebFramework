/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */$AMIClass("TreeBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/TreeBox/twig/TreeBoxCtrl.twig",amiWebApp.originURL+"/js/3rd-party/jsonview.js",amiWebApp.originURL+"/css/3rd-party/jsonview.css"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").on("hidden.bs.modal",function(){_class.deferred.resolveWith(_class.context||_class.deferred)})})})},render:function render(json,settings){var deferred=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"Tree box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];amiWebApp.unlock();$("#E262C0A2_6C07_3B1A_9774_8AE41B7C4CA6").empty();jsonView.format(json,"#E262C0A2_6C07_3B1A_9774_8AE41B7C4CA6");$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").modal("show");this.$class.deferred=deferred;this.$class.context=context;return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyZWVCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsInJlbmRlciIsImpzb24iLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwic2V0dXAiLCJ0aXRsZSIsInVubG9jayIsImVtcHR5IiwianNvblZpZXciLCJmb3JtYXQiLCJtb2RhbCIsInByb21pc2UiLCJzaG93IiwidGV4dCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztHQWFBQSxTQUFTLENBQUMsYUFBRCxDQUFnQixDQUd4QkMsUUFBUSxDQUFFQyxHQUFHLENBQUNDLE9BSFUsQ0FPeEJDLEtBQUssQ0FBRSxlQUFTQyxNQUFULENBQWlCQyxLQUFqQixDQUNQLENBQ0MsS0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixDQUEwQkMsS0FBMUIsQ0FDQSxDQVZ1QixDQWN4QkUsT0FBTyxDQUFFLGtCQUNULGdCQUNDLE1BQU9DLENBQUFBLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLENBQXNCLHlDQURRLENBRTlCRixTQUFTLENBQUNFLFNBQVYsQ0FBc0IsMkJBRlEsQ0FHOUJGLFNBQVMsQ0FBQ0UsU0FBVixDQUFzQiw2QkFIUSxDQUF4QixFQUlKQyxJQUpJLENBSUMsU0FBQ0MsSUFBRCxDQUFVLENBRWpCSixTQUFTLENBQUNLLFVBQVYsQ0FBcUIsTUFBckIsQ0FBNkJELElBQUksQ0FBQyxDQUFELENBQWpDLEVBQXNDRCxJQUF0QyxDQUEyQyxVQUFNLENBQ3BDLEdBQU1HLENBQUFBLE1BQU0sQ0FBRyxLQUFJLENBQUNDLE1BQXBCLENBSUFDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDQyxFQUEzQyxDQUE4QyxpQkFBOUMsQ0FBaUUsVUFBTSxDQUVuRUgsTUFBTSxDQUFDSSxRQUFQLENBQWdCQyxXQUFoQixDQUE0QkwsTUFBTSxDQUFDTSxPQUFQLEVBQWtCTixNQUFNLENBQUNJLFFBQXJELENBQ0gsQ0FIRCxDQUlaLENBVEQsQ0FVQSxDQWhCTSxDQWlCUCxDQWpDdUIsQ0FxQ3ZCRyxNQUFNLENBQUUsZ0JBQVNDLElBQVQsQ0FBZUMsUUFBZixDQUNMLENBQ0MsR0FBTUwsQ0FBQUEsUUFBUSxDQUFHRixDQUFDLENBQUNRLFFBQUYsRUFBakIsQ0FERCxxQkFPS2hCLFNBQVMsQ0FBQ2lCLEtBQVYsQ0FDSCxDQUFDLFNBQUQsQ0FBWSxPQUFaLENBREcsQ0FFSCxDQUFDUCxRQUFELENBQVcsVUFBWCxDQUZHLENBR0hLLFFBSEcsQ0FQTCxDQU1FSCxPQU5GLHFCQU1XTSxLQU5YLHFCQWVDbEIsU0FBUyxDQUFDbUIsTUFBVixHQUVBWCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ1ksS0FBM0MsR0FFTUMsUUFBUSxDQUFDQyxNQUFULENBQWdCUixJQUFoQixDQUFzQix1Q0FBdEIsRUFFTk4sQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNlLEtBQTNDLENBQWlELE1BQWpELEVBRUEsS0FBS2hCLE1BQUwsQ0FBWUcsUUFBWixDQUF1QkEsUUFBdkIsQ0FDQSxLQUFLSCxNQUFMLENBQVlLLE9BQVosQ0FBc0JBLE9BQXRCLENBSUEsTUFBT0YsQ0FBQUEsUUFBUSxDQUFDYyxPQUFULEVBR1AsQ0FyRW1CLENBdUVqQkMsSUFBSSxDQUFFLGNBQVNDLElBQVQsQ0FBZVgsUUFBZixDQUNOLENBQ0ksTUFBTyxNQUFLRixNQUFMLENBQVlhLElBQVosQ0FBa0JYLFFBQWxCLENBQ1YsQ0ExRWdCLENBQWhCLENBQVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIENOUlNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnVHJlZUJveEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9UcmVlQm94L3R3aWcvVHJlZUJveEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvanNvbnZpZXcuanMnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzLzNyZC1wYXJ0eS9qc29udmlldy5jc3MnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuICAgICAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgICAgICAgICAkKCcjRTVBMzQ5NzZfQUM2Rl81QjVGXzc3MEZfRjI2REQxQTJBQjk2Jykub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBfY2xhc3MuZGVmZXJyZWQucmVzb2x2ZVdpdGgoX2NsYXNzLmNvbnRleHQgfHwgX2NsYXNzLmRlZmVycmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZW5kZXI6IGZ1bmN0aW9uKGpzb24sIHNldHRpbmdzKVxuICAgIFx0e1xuICAgIFx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIFx0XHRjb25zdCBbXG4gICAgXHRcdFx0Y29udGV4dCwgdGl0bGVcbiAgICBcdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcbiAgICBcdFx0XHRbJ2NvbnRleHQnLCAndGl0bGUnXSxcbiAgICBcdFx0XHRbZGVmZXJyZWQsICdUcmVlIGJveCddLFxuICAgIFx0XHRcdHNldHRpbmdzXG4gICAgXHRcdCk7XG5cbiAgICBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG4gICAgXHRcdCQoJyNFMjYyQzBBMl82QzA3XzNCMUFfOTc3NF84QUU0MUI3QzRDQTYnKS5lbXB0eSgpO1xuXG4gICAgICAgICAgICBqc29uVmlldy5mb3JtYXQoanNvbiwgJyNFMjYyQzBBMl82QzA3XzNCMUFfOTc3NF84QUU0MUI3QzRDQTYnKTtcblxuICAgIFx0XHQkKCcjRTVBMzQ5NzZfQUM2Rl81QjVGXzc3MEZfRjI2REQxQTJBQjk2JykubW9kYWwoJ3Nob3cnKTtcblxuICAgIFx0XHR0aGlzLiRjbGFzcy5kZWZlcnJlZCA9IGRlZmVycmVkO1xuICAgIFx0XHR0aGlzLiRjbGFzcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgIFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIFx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG4gICAgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgIFx0fSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncylcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRleHQsIHNldHRpbmdzKTtcbiAgICAgICAgfSxcblxufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
