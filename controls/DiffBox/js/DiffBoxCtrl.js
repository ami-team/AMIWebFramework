/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global diff_match_patch
 *
 */$AMIClass("DiffBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/DiffBox/twig/DiffBoxCtrl.twig",amiWebApp.originURL+"/js/3rd-party/diff_match_patch.min.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B").on("hidden.bs.modal",function(){amiWebApp.modalLeave();_class.deferred.resolveWith(_class.context||_class.deferred)});_this.dmp=new diff_match_patch})})},render:function render(text1,text3,settings){var deferred=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"Diff box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];var d=this.dmp.diff_main(text1,text3);this.dmp.diff_cleanupEfficiency(d);var html1="<i class=\"line-number\"></i>"+amiWebApp.textToHtml(text1).replace(/\n/g,"\n<i class=\"line-number\"></i>");$("#E94A7FE7_FEBC_AE12_0C13_E625FC2ADFE6").html(html1);var html2="<i class=\"line-number\"></i>"+this.dmp.diff_prettyHtml(d).replace(/\n/g,"\n<i class=\"line-number\"></i>");$("#AF0BD692_6F09_4527_2684_AAF623658767").html(html2);var html3="<i class=\"line-number\"></i>"+amiWebApp.textToHtml(text3).replace(/\n/g,"\n<i class=\"line-number\"></i>");$("#C604C636_346F_64A8_3EBE_ADCDE2AEB343").html(html3);$("#D12ACA0D_8E47_F13D_0DCD_E7D1ED5CA4AA").text(title);$("#B8D42DF0_0D25_C818_1438_5BAD52BB9E0B").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.modalEnter();return deferred.promise()},show:function show(text1,text3,settings){return this.render(text1,text3,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpZmZCb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbExlYXZlIiwiZGVmZXJyZWQiLCJyZXNvbHZlV2l0aCIsImNvbnRleHQiLCJkbXAiLCJkaWZmX21hdGNoX3BhdGNoIiwicmVuZGVyIiwidGV4dDEiLCJ0ZXh0MyIsInNldHRpbmdzIiwiRGVmZXJyZWQiLCJzZXR1cCIsInRpdGxlIiwiZCIsImRpZmZfbWFpbiIsImRpZmZfY2xlYW51cEVmZmljaWVuY3kiLCJodG1sMSIsInRleHRUb0h0bWwiLCJyZXBsYWNlIiwiaHRtbCIsImh0bWwyIiwiZGlmZl9wcmV0dHlIdG1sIiwiaHRtbDMiLCJ0ZXh0IiwibW9kYWwiLCJtb2RhbEVudGVyIiwicHJvbWlzZSIsInNob3ciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQWVBQSxTQUFTLENBQUMsYUFBRCxDQUFnQixDQUd4QkMsUUFBUSxDQUFFQyxHQUFHLENBQUNDLE9BSFUsQ0FPeEJDLEtBQUssQ0FBRSxlQUFTQyxNQUFULENBQWlCQyxLQUFqQixDQUNQLENBQ0MsS0FBS0MsTUFBTCxDQUFZSCxLQUFaLENBQWtCQyxNQUFsQixDQUEwQkMsS0FBMUIsQ0FDQSxDQVZ1QixDQWN4QkUsT0FBTyxDQUFFLGtCQUNULGdCQUNDLE1BQU9DLENBQUFBLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUM5QkQsU0FBUyxDQUFDRSxTQUFWLENBQXNCLHlDQURRLENBRTlCRixTQUFTLENBQUNFLFNBQVYsQ0FBc0IsdUNBRlEsQ0FBeEIsRUFHSkMsSUFISSxDQUdDLFNBQUNDLElBQUQsQ0FBVSxDQUVqQkosU0FBUyxDQUFDSyxVQUFWLENBQXFCLE1BQXJCLENBQTZCRCxJQUFJLENBQUMsQ0FBRCxDQUFqQyxFQUFzQ0QsSUFBdEMsQ0FBMkMsVUFBTSxDQUVoRCxHQUFNRyxDQUFBQSxNQUFNLENBQUcsS0FBSSxDQUFDQyxNQUFwQixDQUlBQyxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ0MsRUFBM0MsQ0FBOEMsaUJBQTlDLENBQWlFLFVBQU0sQ0FFdEVULFNBQVMsQ0FBQ1UsVUFBVixHQUVBSixNQUFNLENBQUNLLFFBQVAsQ0FBZ0JDLFdBQWhCLENBQTRCTixNQUFNLENBQUNPLE9BQVAsRUFBa0JQLE1BQU0sQ0FBQ0ssUUFBckQsQ0FDQSxDQUxELEVBU0EsS0FBSSxDQUFDRyxHQUFMLENBQVcsR0FBSUMsQ0FBQUEsZ0JBR2YsQ0FsQkQsQ0FtQkEsQ0F4Qk0sQ0F5QlAsQ0F6Q3VCLENBNkN4QkMsTUFBTSxDQUFFLGdCQUFTQyxLQUFULENBQWdCQyxLQUFoQixDQUF1QkMsUUFBdkIsQ0FDUixDQUNDLEdBQU1SLENBQUFBLFFBQVEsQ0FBR0gsQ0FBQyxDQUFDWSxRQUFGLEVBQWpCLENBREQscUJBT0twQixTQUFTLENBQUNxQixLQUFWLENBQ0gsQ0FBQyxTQUFELENBQVksT0FBWixDQURHLENBRUgsQ0FBQ1YsUUFBRCxDQUFXLFVBQVgsQ0FGRyxDQUdIUSxRQUhHLENBUEwsQ0FNRU4sT0FORixxQkFNV1MsS0FOWCxxQkFlQyxHQUFNQyxDQUFBQSxDQUFDLENBQUcsS0FBS1QsR0FBTCxDQUFTVSxTQUFULENBQW1CUCxLQUFuQixDQUEwQkMsS0FBMUIsQ0FBVixDQUVBLEtBQUtKLEdBQUwsQ0FBU1csc0JBQVQsQ0FBZ0NGLENBQWhDLEVBSUEsR0FBTUcsQ0FBQUEsS0FBSyxDQUFHLGdDQUFnQzFCLFNBQVMsQ0FBQzJCLFVBQVYsQ0FBcUJWLEtBQXJCLEVBQTRCVyxPQUE1QixDQUFvQyxLQUFwQyxDQUEyQyxpQ0FBM0MsQ0FBOUMsQ0FFQXBCLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDcUIsSUFBM0MsQ0FBZ0RILEtBQWhELEVBSUEsR0FBTUksQ0FBQUEsS0FBSyxDQUFHLGdDQUFnQyxLQUFLaEIsR0FBTCxDQUFTaUIsZUFBVCxDQUF5QlIsQ0FBekIsRUFBNEJLLE9BQTVCLENBQW9DLEtBQXBDLENBQTJDLGlDQUEzQyxDQUE5QyxDQUVBcEIsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNxQixJQUEzQyxDQUFnREMsS0FBaEQsRUFJQSxHQUFNRSxDQUFBQSxLQUFLLENBQUcsZ0NBQWdDaEMsU0FBUyxDQUFDMkIsVUFBVixDQUFxQlQsS0FBckIsRUFBNEJVLE9BQTVCLENBQW9DLEtBQXBDLENBQTJDLGlDQUEzQyxDQUE5QyxDQUVBcEIsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkNxQixJQUEzQyxDQUFnREcsS0FBaEQsRUFJQXhCLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDeUIsSUFBM0MsQ0FBZ0RYLEtBQWhELEVBRUFkLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDMEIsS0FBM0MsQ0FBaUQsTUFBakQsRUFFQSxLQUFLM0IsTUFBTCxDQUFZSSxRQUFaLENBQXVCQSxRQUF2QixDQUNBLEtBQUtKLE1BQUwsQ0FBWU0sT0FBWixDQUFzQkEsT0FBdEIsQ0FJQWIsU0FBUyxDQUFDbUMsVUFBVixHQUVBLE1BQU94QixDQUFBQSxRQUFRLENBQUN5QixPQUFULEVBR1AsQ0FuR3VCLENBdUd4QkMsSUFBSSxDQUFFLGNBQVNwQixLQUFULENBQWdCQyxLQUFoQixDQUF1QkMsUUFBdkIsQ0FDTixDQUNDLE1BQU8sTUFBS0gsTUFBTCxDQUFZQyxLQUFaLENBQW1CQyxLQUFuQixDQUEwQkMsUUFBMUIsQ0FDUCxDQTFHdUIsQ0FBaEIsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIGRpZmZfbWF0Y2hfcGF0Y2hcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnRGlmZkJveEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9EaWZmQm94L3R3aWcvRGlmZkJveEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvZGlmZl9tYXRjaF9wYXRjaC5taW4uanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNCOEQ0MkRGMF8wRDI1X0M4MThfMTQzOF81QkFENTJCQjlFMEInKS5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm1vZGFsTGVhdmUoKTtcblxuXHRcdFx0XHRcdF9jbGFzcy5kZWZlcnJlZC5yZXNvbHZlV2l0aChfY2xhc3MuY29udGV4dCB8fCBfY2xhc3MuZGVmZXJyZWQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHRoaXMuZG1wID0gbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRleHQxLCB0ZXh0Mywgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsIHRpdGxlXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd0aXRsZSddLFxuXHRcdFx0W2RlZmVycmVkLCAnRGlmZiBib3gnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGQgPSB0aGlzLmRtcC5kaWZmX21haW4odGV4dDEsIHRleHQzKTtcblxuXHRcdHRoaXMuZG1wLmRpZmZfY2xlYW51cEVmZmljaWVuY3koZCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBodG1sMSA9ICc8aSBjbGFzcz1cImxpbmUtbnVtYmVyXCI+PC9pPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh0ZXh0MSkucmVwbGFjZSgvXFxuL2csICdcXG48aSBjbGFzcz1cImxpbmUtbnVtYmVyXCI+PC9pPicpO1xuXG5cdFx0JCgnI0U5NEE3RkU3X0ZFQkNfQUUxMl8wQzEzX0U2MjVGQzJBREZFNicpLmh0bWwoaHRtbDEpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgaHRtbDIgPSAnPGkgY2xhc3M9XCJsaW5lLW51bWJlclwiPjwvaT4nICsgdGhpcy5kbXAuZGlmZl9wcmV0dHlIdG1sKGQpLnJlcGxhY2UoL1xcbi9nLCAnXFxuPGkgY2xhc3M9XCJsaW5lLW51bWJlclwiPjwvaT4nKTtcblxuXHRcdCQoJyNBRjBCRDY5Ml82RjA5XzQ1MjdfMjY4NF9BQUY2MjM2NTg3NjcnKS5odG1sKGh0bWwyKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGh0bWwzID0gJzxpIGNsYXNzPVwibGluZS1udW1iZXJcIj48L2k+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHRleHQzKS5yZXBsYWNlKC9cXG4vZywgJ1xcbjxpIGNsYXNzPVwibGluZS1udW1iZXJcIj48L2k+Jyk7XG5cblx0XHQkKCcjQzYwNEM2MzZfMzQ2Rl82NEE4XzNFQkVfQURDREUyQUVCMzQzJykuaHRtbChodG1sMyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjRDEyQUNBMERfOEU0N19GMTNEXzBEQ0RfRTdEMUVENUNBNEFBJykudGV4dCh0aXRsZSk7XG5cblx0XHQkKCcjQjhENDJERjBfMEQyNV9DODE4XzE0MzhfNUJBRDUyQkI5RTBCJykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuJGNsYXNzLmRlZmVycmVkID0gZGVmZXJyZWQ7XG5cdFx0dGhpcy4kY2xhc3MuY29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubW9kYWxFbnRlcigpO1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3c6IGZ1bmN0aW9uKHRleHQxLCB0ZXh0Mywgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIodGV4dDEsIHRleHQzLCBzZXR0aW5ncyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
