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
 */$AMIClass("MessageBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/MessageBox/twig/MessageBoxCtrl.twig",amiWebApp.originURL+"/js/3rd-party/clipboard.min.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548").on("hidden.bs.modal",function(){amiWebApp.modaleEnableLock();_class.deferred.resolveWith(_class.context||_class.deferred)});new ClipboardJS("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .btn[data-clipboard-target]")})})},render:function render(text,settings){var deferred=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"Edit box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#ADCD09FF_5A30_AC10_397D_1F213001977E").html(title);$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548 .modal-body").text(text||"");$("#E7C0EB6B_4C9E_BA8D_7FDA_F23F47DA8548").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.modaleDisableLock();return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2VCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbGVFbmFibGVMb2NrIiwiZGVmZXJyZWQiLCJyZXNvbHZlV2l0aCIsImNvbnRleHQiLCJDbGlwYm9hcmRKUyIsInJlbmRlciIsInRleHQiLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwic2V0dXAiLCJ0aXRsZSIsImh0bWwiLCJtb2RhbCIsIm1vZGFsZURpc2FibGVMb2NrIiwicHJvbWlzZSIsInNob3ciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQWVBQSxTQUFTLENBQUMsZ0JBQUQsQ0FBbUIsQ0FHM0JDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxPQUhhLENBTzNCQyxLQUFLLENBQUUsZUFBU0MsTUFBVCxDQUFpQkMsS0FBakIsQ0FDUCxDQUNDLEtBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsQ0FBMEJDLEtBQTFCLENBQ0EsQ0FWMEIsQ0FjM0JFLE9BQU8sQ0FBRSxrQkFDVCxnQkFDQyxNQUFPQyxDQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixDQUFzQiwrQ0FEUSxDQUU5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLGdDQUZRLENBQXhCLEVBR0pDLElBSEksQ0FHQyxTQUFDQyxJQUFELENBQVUsQ0FFakJKLFNBQVMsQ0FBQ0ssVUFBVixDQUFxQixNQUFyQixDQUE2QkQsSUFBSSxDQUFDLENBQUQsQ0FBakMsRUFBc0NELElBQXRDLENBQTJDLFVBQU0sQ0FFaEQsR0FBTUcsQ0FBQUEsTUFBTSxDQUFHLEtBQUksQ0FBQ0MsTUFBcEIsQ0FJQUMsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNDLEVBQTNDLENBQThDLGlCQUE5QyxDQUFpRSxVQUFNLENBRXRFVCxTQUFTLENBQUNVLGdCQUFWLEdBRUFKLE1BQU0sQ0FBQ0ssUUFBUCxDQUFnQkMsV0FBaEIsQ0FBNEJOLE1BQU0sQ0FBQ08sT0FBUCxFQUFrQlAsTUFBTSxDQUFDSyxRQUFyRCxDQUNBLENBTEQsRUFTQSxHQUFJRyxDQUFBQSxXQUFKLENBQWdCLG1FQUFoQixDQUdBLENBbEJELENBbUJBLENBeEJNLENBeUJQLENBekMwQixDQTZDM0JDLE1BQU0sQ0FBRSxnQkFBU0MsSUFBVCxDQUFlQyxRQUFmLENBQ1IsQ0FDQyxHQUFNTixDQUFBQSxRQUFRLENBQUdILENBQUMsQ0FBQ1UsUUFBRixFQUFqQixDQURELHFCQU9LbEIsU0FBUyxDQUFDbUIsS0FBVixDQUNILENBQUMsU0FBRCxDQUFZLE9BQVosQ0FERyxDQUVILENBQUNSLFFBQUQsQ0FBVyxVQUFYLENBRkcsQ0FHSE0sUUFIRyxDQVBMLENBTUVKLE9BTkYscUJBTVdPLEtBTlgscUJBZUNaLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDYSxJQUEzQyxDQUFnREQsS0FBaEQsRUFFQVosQ0FBQyxDQUFDLG1EQUFELENBQUQsQ0FBdURRLElBQXZELENBQTREQSxJQUFJLEVBQUksRUFBcEUsRUFFQVIsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNjLEtBQTNDLENBQWlELE1BQWpELEVBRUEsS0FBS2YsTUFBTCxDQUFZSSxRQUFaLENBQXVCQSxRQUF2QixDQUNBLEtBQUtKLE1BQUwsQ0FBWU0sT0FBWixDQUFzQkEsT0FBdEIsQ0FJQWIsU0FBUyxDQUFDdUIsaUJBQVYsR0FFQSxNQUFPWixDQUFBQSxRQUFRLENBQUNhLE9BQVQsRUFHUCxDQTdFMEIsQ0FpRjNCQyxJQUFJLENBQUUsY0FBU1QsSUFBVCxDQUFlQyxRQUFmLENBQ04sQ0FDQyxNQUFPLE1BQUtGLE1BQUwsQ0FBWUMsSUFBWixDQUFrQkMsUUFBbEIsQ0FDUCxDQXBGMEIsQ0FBbkIsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIENsaXBib2FyZEpTXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ01lc3NhZ2VCb3hDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvTWVzc2FnZUJveC90d2lnL01lc3NhZ2VCb3hDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L2NsaXBib2FyZC5taW4uanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNFN0MwRUI2Ql80QzlFX0JBOERfN0ZEQV9GMjNGNDdEQTg1NDgnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm1vZGFsZUVuYWJsZUxvY2soKTtcblxuXHRcdFx0XHRcdF9jbGFzcy5kZWZlcnJlZC5yZXNvbHZlV2l0aChfY2xhc3MuY29udGV4dCB8fCBfY2xhc3MuZGVmZXJyZWQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG5ldyBDbGlwYm9hcmRKUygnI0U3QzBFQjZCXzRDOUVfQkE4RF83RkRBX0YyM0Y0N0RBODU0OCAuYnRuW2RhdGEtY2xpcGJvYXJkLXRhcmdldF0nKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LCB0aXRsZVxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAndGl0bGUnXSxcblx0XHRcdFtkZWZlcnJlZCwgJ0VkaXQgYm94J10sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQURDRDA5RkZfNUEzMF9BQzEwXzM5N0RfMUYyMTMwMDE5NzdFJykuaHRtbCh0aXRsZSk7XG5cblx0XHQkKCcjRTdDMEVCNkJfNEM5RV9CQThEXzdGREFfRjIzRjQ3REE4NTQ4IC5tb2RhbC1ib2R5JykudGV4dCh0ZXh0IHx8ICcnKTtcblxuXHRcdCQoJyNFN0MwRUI2Ql80QzlFX0JBOERfN0ZEQV9GMjNGNDdEQTg1NDgnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0dGhpcy4kY2xhc3MuZGVmZXJyZWQgPSBkZWZlcnJlZDtcblx0XHR0aGlzLiRjbGFzcy5jb250ZXh0ID0gY29udGV4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5tb2RhbGVEaXNhYmxlTG9jaygpO1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3c6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKHRleHQsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
