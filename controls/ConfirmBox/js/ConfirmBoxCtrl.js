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
 */$AMIClass("ConfirmBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/ConfirmBox/twig/ConfirmBoxCtrl.twig",amiWebApp.originURL+"/js/3rd-party/clipboard.min.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#DCDB367E_FB67_A957_68AC_B54038F860DB").on("hidden.bs.modal",function(){amiWebApp.modalLock();_class.deferred.rejectWith(_class.context||_class.deferred,[false])});$("#E5435D68_FE3D_C90F_FC41_DEFF400CE4AE").on("click",function(){amiWebApp.modalLock();$("#DCDB367E_FB67_A957_68AC_B54038F860DB").modal("hide");_class.deferred.resolveWith(_class.context||_class.deferred,[true])});new ClipboardJS("#DCDB367E_FB67_A957_68AC_B54038F860DB .btn[data-clipboard-target]")})})},render:function render(text,settings){var deferred=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"Confirm box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#DF8EBE84_FA77_2711_8EB5_4B3213739A54").html(title);$("#DCDB367E_FB67_A957_68AC_B54038F860DB .modal-body").text(text||"");$("#DCDB367E_FB67_A957_68AC_B54038F860DB").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.modalUnlock();return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbmZpcm1Cb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbExvY2siLCJkZWZlcnJlZCIsInJlamVjdFdpdGgiLCJjb250ZXh0IiwibW9kYWwiLCJyZXNvbHZlV2l0aCIsIkNsaXBib2FyZEpTIiwicmVuZGVyIiwidGV4dCIsInNldHRpbmdzIiwiRGVmZXJyZWQiLCJzZXR1cCIsInRpdGxlIiwiaHRtbCIsIm1vZGFsVW5sb2NrIiwicHJvbWlzZSIsInNob3ciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQWVBQSxTQUFTLENBQUMsZ0JBQUQsQ0FBbUIsQ0FHM0JDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxPQUhhLENBTzNCQyxLQUFLLENBQUUsZUFBU0MsTUFBVCxDQUFpQkMsS0FBakIsQ0FDUCxDQUNDLEtBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsQ0FBMEJDLEtBQTFCLENBQ0EsQ0FWMEIsQ0FjM0JFLE9BQU8sQ0FBRSxrQkFDVCxnQkFDQyxNQUFPQyxDQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixDQUFzQiwrQ0FEUSxDQUU5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLGdDQUZRLENBQXhCLEVBR0pDLElBSEksQ0FHQyxTQUFDQyxJQUFELENBQVUsQ0FFakJKLFNBQVMsQ0FBQ0ssVUFBVixDQUFxQixNQUFyQixDQUE2QkQsSUFBSSxDQUFDLENBQUQsQ0FBakMsRUFBc0NELElBQXRDLENBQTJDLFVBQU0sQ0FFaEQsR0FBTUcsQ0FBQUEsTUFBTSxDQUFHLEtBQUksQ0FBQ0MsTUFBcEIsQ0FJQUMsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNDLEVBQTNDLENBQThDLGlCQUE5QyxDQUFpRSxVQUFNLENBRXRFVCxTQUFTLENBQUNVLFNBQVYsR0FJQUosTUFBTSxDQUFDSyxRQUFQLENBQWdCQyxVQUFoQixDQUEyQk4sTUFBTSxDQUFDTyxPQUFQLEVBQWtCUCxNQUFNLENBQUNLLFFBQXBELENBQThELENBQUMsS0FBRCxDQUE5RCxDQUNBLENBUEQsRUFXQUgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNDLEVBQTNDLENBQW1ELE9BQW5ELENBQWlFLFVBQU0sQ0FFdEVULFNBQVMsQ0FBQ1UsU0FBVixHQUVBRixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ00sS0FBM0MsQ0FBaUQsTUFBakQsRUFFQVIsTUFBTSxDQUFDSyxRQUFQLENBQWdCSSxXQUFoQixDQUE0QlQsTUFBTSxDQUFDTyxPQUFQLEVBQWtCUCxNQUFNLENBQUNLLFFBQXJELENBQStELENBQUMsSUFBRCxDQUEvRCxDQUNBLENBUEQsRUFXQSxHQUFJSyxDQUFBQSxXQUFKLENBQWdCLG1FQUFoQixDQUdBLENBL0JELENBZ0NBLENBckNNLENBc0NQLENBdEQwQixDQTBEM0JDLE1BQU0sQ0FBRSxnQkFBU0MsSUFBVCxDQUFlQyxRQUFmLENBQ1IsQ0FDQyxHQUFNUixDQUFBQSxRQUFRLENBQUdILENBQUMsQ0FBQ1ksUUFBRixFQUFqQixDQURELHFCQU9LcEIsU0FBUyxDQUFDcUIsS0FBVixDQUNILENBQUMsU0FBRCxDQUFZLE9BQVosQ0FERyxDQUVILENBQUNWLFFBQUQsQ0FBVyxhQUFYLENBRkcsQ0FHSFEsUUFIRyxDQVBMLENBTUVOLE9BTkYscUJBTVdTLEtBTlgscUJBZUNkLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDZSxJQUEzQyxDQUFnREQsS0FBaEQsRUFFQWQsQ0FBQyxDQUFDLG1EQUFELENBQUQsQ0FBdURVLElBQXZELENBQTREQSxJQUFJLEVBQUksRUFBcEUsRUFFQVYsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNNLEtBQTNDLENBQWlELE1BQWpELEVBRUEsS0FBS1AsTUFBTCxDQUFZSSxRQUFaLENBQXVCQSxRQUF2QixDQUNBLEtBQUtKLE1BQUwsQ0FBWU0sT0FBWixDQUFzQkEsT0FBdEIsQ0FJQWIsU0FBUyxDQUFDd0IsV0FBVixHQUVBLE1BQU9iLENBQUFBLFFBQVEsQ0FBQ2MsT0FBVCxFQUdQLENBMUYwQixDQThGM0JDLElBQUksQ0FBRSxjQUFTUixJQUFULENBQWVDLFFBQWYsQ0FDTixDQUNDLE1BQU8sTUFBS0YsTUFBTCxDQUFZQyxJQUFaLENBQWtCQyxRQUFsQixDQUNQLENBakcwQixDQUFuQixDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqIEBnbG9iYWwgQ2xpcGJvYXJkSlNcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnQ29uZmlybUJveEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9Db25maXJtQm94L3R3aWcvQ29uZmlybUJveEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvY2xpcGJvYXJkLm1pbi5qcycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuYXBwZW5kSFRNTCgnYm9keScsIGRhdGFbMF0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IF9jbGFzcyA9IHRoaXMuJGNsYXNzO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0RDREIzNjdFX0ZCNjdfQTk1N182OEFDX0I1NDAzOEY4NjBEQicpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAubW9kYWxMb2NrKCk7XG5cblx0XHRcdFx0XHQvLyQoJyNEQ0RCMzY3RV9GQjY3X0E5NTdfNjhBQ19CNTQwMzhGODYwREInKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0X2NsYXNzLmRlZmVycmVkLnJlamVjdFdpdGgoX2NsYXNzLmNvbnRleHQgfHwgX2NsYXNzLmRlZmVycmVkLCBbZmFsc2VdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTU0MzVENjhfRkUzRF9DOTBGX0ZDNDFfREVGRjQwMENFNEFFJykub24oLyotKi8nY2xpY2snLyotKi8sICgpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5tb2RhbExvY2soKTtcblxuXHRcdFx0XHRcdCQoJyNEQ0RCMzY3RV9GQjY3X0E5NTdfNjhBQ19CNTQwMzhGODYwREInKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0X2NsYXNzLmRlZmVycmVkLnJlc29sdmVXaXRoKF9jbGFzcy5jb250ZXh0IHx8IF9jbGFzcy5kZWZlcnJlZCwgW3RydWVdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRuZXcgQ2xpcGJvYXJkSlMoJyNEQ0RCMzY3RV9GQjY3X0E5NTdfNjhBQ19CNTQwMzhGODYwREIgLmJ0bltkYXRhLWNsaXBib2FyZC10YXJnZXRdJyk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncylcblx0e1xuXHRcdGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCwgdGl0bGVcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3RpdGxlJ10sXG5cdFx0XHRbZGVmZXJyZWQsICdDb25maXJtIGJveCddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0RGOEVCRTg0X0ZBNzdfMjcxMV84RUI1XzRCMzIxMzczOUE1NCcpLmh0bWwodGl0bGUpO1xuXG5cdFx0JCgnI0RDREIzNjdFX0ZCNjdfQTk1N182OEFDX0I1NDAzOEY4NjBEQiAubW9kYWwtYm9keScpLnRleHQodGV4dCB8fCAnJyk7XG5cblx0XHQkKCcjRENEQjM2N0VfRkI2N19BOTU3XzY4QUNfQjU0MDM4Rjg2MERCJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuJGNsYXNzLmRlZmVycmVkID0gZGVmZXJyZWQ7XG5cdFx0dGhpcy4kY2xhc3MuY29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubW9kYWxVbmxvY2soKTtcblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzaG93OiBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncylcblx0e1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcih0ZXh0LCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
