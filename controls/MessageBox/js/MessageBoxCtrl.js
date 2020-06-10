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
 */$AMIClass("MessageBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/MessageBox/twig/MessageBoxCtrl.twig",amiWebApp.originURL+"/js/3rd-party/clipboard.min.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548").on("hidden.bs.modal",function(){amiWebApp.lock();_class.deferred.resolveWith(_class.context||_class.deferred)});new ClipboardJS("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]")})})},render:function render(text,settings){var deferred=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"Edit box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#ADCD09FF_5A30_AC10_397D_1F213001977E").html(title);$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body").text(text||"");$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.unlock();return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2VCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJsb2NrIiwiZGVmZXJyZWQiLCJyZXNvbHZlV2l0aCIsImNvbnRleHQiLCJDbGlwYm9hcmRKUyIsInJlbmRlciIsInRleHQiLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwic2V0dXAiLCJ0aXRsZSIsImh0bWwiLCJtb2RhbCIsInVubG9jayIsInByb21pc2UiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FlQUEsU0FBUyxDQUFDLGdCQUFELENBQW1CLENBRzNCQyxRQUFRLENBQUVDLEdBQUcsQ0FBQ0MsT0FIYSxDQU8zQkMsS0FBSyxDQUFFLGVBQVNDLE1BQVQsQ0FBaUJDLEtBQWpCLENBQ1AsQ0FDQyxLQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLENBQTBCQyxLQUExQixDQUNBLENBVjBCLENBYzNCRSxPQUFPLENBQUUsa0JBQ1QsZ0JBQ0MsTUFBT0MsQ0FBQUEsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsQ0FBc0IsK0NBRFEsQ0FFOUJGLFNBQVMsQ0FBQ0UsU0FBVixDQUFzQixnQ0FGUSxDQUF4QixFQUdKQyxJQUhJLENBR0MsU0FBQ0MsSUFBRCxDQUFVLENBRWpCSixTQUFTLENBQUNLLFVBQVYsQ0FBcUIsTUFBckIsQ0FBNkJELElBQUksQ0FBQyxDQUFELENBQWpDLEVBQXNDRCxJQUF0QyxDQUEyQyxVQUFNLENBRWhELEdBQU1HLENBQUFBLE1BQU0sQ0FBRyxLQUFJLENBQUNDLE1BQXBCLENBSUFDLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDQyxFQUEzQyxDQUE4QyxpQkFBOUMsQ0FBaUUsVUFBTSxDQUV0RVQsU0FBUyxDQUFDVSxJQUFWLEdBRUFKLE1BQU0sQ0FBQ0ssUUFBUCxDQUFnQkMsV0FBaEIsQ0FBNEJOLE1BQU0sQ0FBQ08sT0FBUCxFQUFrQlAsTUFBTSxDQUFDSyxRQUFyRCxDQUNBLENBTEQsRUFTQSxHQUFJRyxDQUFBQSxXQUFKLENBQWdCLG1FQUFoQixDQUdBLENBbEJELENBbUJBLENBeEJNLENBeUJQLENBekMwQixDQTZDM0JDLE1BQU0sQ0FBRSxnQkFBU0MsSUFBVCxDQUFlQyxRQUFmLENBQ1IsQ0FDQyxHQUFNTixDQUFBQSxRQUFRLENBQUdILENBQUMsQ0FBQ1UsUUFBRixFQUFqQixDQURELHFCQU9LbEIsU0FBUyxDQUFDbUIsS0FBVixDQUNILENBQUMsU0FBRCxDQUFZLE9BQVosQ0FERyxDQUVILENBQUNSLFFBQUQsQ0FBVyxVQUFYLENBRkcsQ0FHSE0sUUFIRyxDQVBMLENBTUVKLE9BTkYscUJBTVdPLEtBTlgscUJBZUNaLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDYSxJQUEzQyxDQUFnREQsS0FBaEQsRUFFQVosQ0FBQyxDQUFDLG1EQUFELENBQUQsQ0FBdURRLElBQXZELENBQTREQSxJQUFJLEVBQUksRUFBcEUsRUFFQVIsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNjLEtBQTNDLENBQWlELE1BQWpELEVBRUEsS0FBS2YsTUFBTCxDQUFZSSxRQUFaLENBQXVCQSxRQUF2QixDQUNBLEtBQUtKLE1BQUwsQ0FBWU0sT0FBWixDQUFzQkEsT0FBdEIsQ0FJQWIsU0FBUyxDQUFDdUIsTUFBVixHQUVBLE1BQU9aLENBQUFBLFFBQVEsQ0FBQ2EsT0FBVCxFQUdQLENBN0UwQixDQWlGM0JDLElBQUksQ0FBRSxjQUFTVCxJQUFULENBQWVDLFFBQWYsQ0FDTixDQUNDLE1BQU8sTUFBS0YsTUFBTCxDQUFZQyxJQUFaLENBQWtCQyxRQUFsQixDQUNQLENBcEYwQixDQUFuQixDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgQ2xpcGJvYXJkSlNcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnTWVzc2FnZUJveEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9NZXNzYWdlQm94L3R3aWcvTWVzc2FnZUJveEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY2xpcGJvYXJkLm1pbi5qcycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IF9jbGFzcyA9IHRoaXMuJGNsYXNzO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0XHRcdFx0X2NsYXNzLmRlZmVycmVkLnJlc29sdmVXaXRoKF9jbGFzcy5jb250ZXh0IHx8IF9jbGFzcy5kZWZlcnJlZCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bmV3IENsaXBib2FyZEpTKCcjRTdDMEVCNkJfNEM5RV9CQThEXzdGREFfRjIzRjQ3REE4NTQ4IC5idG5bZGF0YS1jbGlwYm9hcmQtdGFyZ2V0XScpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsIHRpdGxlXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd0aXRsZSddLFxuXHRcdFx0W2RlZmVycmVkLCAnRWRpdCBib3gnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNBRENEMDlGRl81QTMwX0FDMTBfMzk3RF8xRjIxMzAwMTk3N0UnKS5odG1sKHRpdGxlKTtcblxuXHRcdCQoJyNFN0MwRUI2Ql80QzlFX0JBOERfN0ZEQV9GMjNGNDdEQTg1NDggLm1vZGFsLWJvZHknKS50ZXh0KHRleHQgfHwgJycpO1xuXG5cdFx0JCgnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCcpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLiRjbGFzcy5kZWZlcnJlZCA9IGRlZmVycmVkO1xuXHRcdHRoaXMuJGNsYXNzLmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3c6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKHRleHQsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
