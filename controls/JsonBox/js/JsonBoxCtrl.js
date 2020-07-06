/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global JsonView
 *
 */$AMIClass("JsonBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/JsonBox/twig/JsonBoxCtrl.twig",amiWebApp.originURL+"/css/3rd-party/jsonview.bundle.css",amiWebApp.originURL+"/js/3rd-party/jsonview.bundle.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").on("hidden.bs.modal",function(){amiWebApp.modalLock();_class.deferred.resolveWith(_class.context||_class.deferred)})})})},render:function render(json,settings){var deferred=$.Deferred();var a;var b;if(amiWebApp.typeOf(json)!=="String"){a=json;b=JSON.stringify(a,null,2)}else{json=json.trim();if(json&&json.toUpperCase()!=="@NULL"){a=JSON.parse(json);b=JSON.stringify(a,null,2)}else{a=null;b="null"}}var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"JSON box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#FA090573_9E6B_72F6_2431_AFB1F104EFB7").text(title);JsonView.render(JsonView.createTree(a),$("#B28C3528_0A98_27A9_ADEC_C0678ACE0426 div").empty()[0]);$("#CB4CDCFF_8B4A_F4D6_CFD5_E0C69BB4C2E0 code").html("<i class=\"line-number\"></i>"+amiWebApp.textToHtml(b).replace(/\n/g,"\n<i class=\"line-number\"></i>"));$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.modalUnlock();return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpzb25Cb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbExvY2siLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsInJlbmRlciIsImpzb24iLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwiYSIsImIiLCJ0eXBlT2YiLCJKU09OIiwic3RyaW5naWZ5IiwidHJpbSIsInRvVXBwZXJDYXNlIiwicGFyc2UiLCJzZXR1cCIsInRpdGxlIiwidGV4dCIsIkpzb25WaWV3IiwiY3JlYXRlVHJlZSIsImVtcHR5IiwiaHRtbCIsInRleHRUb0h0bWwiLCJyZXBsYWNlIiwibW9kYWwiLCJtb2RhbFVubG9jayIsInByb21pc2UiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FlQUEsU0FBUyxDQUFDLGFBQUQsQ0FBZ0IsQ0FHeEJDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxPQUhVLENBT3hCQyxLQUFLLENBQUUsZUFBU0MsTUFBVCxDQUFpQkMsS0FBakIsQ0FDUCxDQUNDLEtBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsQ0FBMEJDLEtBQTFCLENBQ0EsQ0FWdUIsQ0FjeEJFLE9BQU8sQ0FBRSxrQkFDVCxnQkFDQyxNQUFPQyxDQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixDQUFzQix5Q0FEUSxDQUU5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLG9DQUZRLENBRzlCRixTQUFTLENBQUNFLFNBQVYsQ0FBc0Isa0NBSFEsQ0FBeEIsRUFJSkMsSUFKSSxDQUlDLFNBQUNDLElBQUQsQ0FBVSxDQUVqQkosU0FBUyxDQUFDSyxVQUFWLENBQXFCLE1BQXJCLENBQTZCRCxJQUFJLENBQUMsQ0FBRCxDQUFqQyxFQUFzQ0QsSUFBdEMsQ0FBMkMsVUFBTSxDQUVoRCxHQUFNRyxDQUFBQSxNQUFNLENBQUcsS0FBSSxDQUFDQyxNQUFwQixDQUlBQyxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ0MsRUFBM0MsQ0FBOEMsaUJBQTlDLENBQWlFLFVBQU0sQ0FFdEVULFNBQVMsQ0FBQ1UsU0FBVixHQUVBSixNQUFNLENBQUNLLFFBQVAsQ0FBZ0JDLFdBQWhCLENBQTRCTixNQUFNLENBQUNPLE9BQVAsRUFBa0JQLE1BQU0sQ0FBQ0ssUUFBckQsQ0FDQSxDQUxELENBUUEsQ0FkRCxDQWVBLENBckJNLENBc0JQLENBdEN1QixDQTBDeEJHLE1BQU0sQ0FBRSxnQkFBU0MsSUFBVCxDQUFlQyxRQUFmLENBQ1IsQ0FDQyxHQUFNTCxDQUFBQSxRQUFRLENBQUdILENBQUMsQ0FBQ1MsUUFBRixFQUFqQixDQUlBLEdBQUlDLENBQUFBLENBQUosQ0FDQSxHQUFJQyxDQUFBQSxDQUFKLENBRUEsR0FBR25CLFNBQVMsQ0FBQ29CLE1BQVYsQ0FBaUJMLElBQWpCLElBQTJCLFFBQTlCLENBQ0EsQ0FDQ0csQ0FBQyxDQUFjSCxJQUFmLENBQ0FJLENBQUMsQ0FBR0UsSUFBSSxDQUFDQyxTQUFMLENBQWVKLENBQWYsQ0FBa0IsSUFBbEIsQ0FBd0IsQ0FBeEIsQ0FDSixDQUpELElBTUEsQ0FDQ0gsSUFBSSxDQUFHQSxJQUFJLENBQUNRLElBQUwsRUFBUCxDQUVBLEdBQUdSLElBQUksRUFBSUEsSUFBSSxDQUFDUyxXQUFMLEtBQXVCLE9BQWxDLENBQ0EsQ0FDQ04sQ0FBQyxDQUFHRyxJQUFJLENBQUNJLEtBQUwsQ0FBV1YsSUFBWCxDQUFKLENBQ0FJLENBQUMsQ0FBR0UsSUFBSSxDQUFDQyxTQUFMLENBQWVKLENBQWYsQ0FBa0IsSUFBbEIsQ0FBd0IsQ0FBeEIsQ0FDSixDQUpELElBTUEsQ0FDQ0EsQ0FBQyxDQUFHLElBQUosQ0FDQUMsQ0FBQyxDQUFHLE1BQ0osQ0FDRCxDQTNCRixxQkFpQ0tuQixTQUFTLENBQUMwQixLQUFWLENBQ0gsQ0FBQyxTQUFELENBQVksT0FBWixDQURHLENBRUgsQ0FBQ2YsUUFBRCxDQUFXLFVBQVgsQ0FGRyxDQUdISyxRQUhHLENBakNMLENBZ0NFSCxPQWhDRixxQkFnQ1djLEtBaENYLHFCQXlDQ25CLENBQUMsQ0FBQyx1Q0FBRCxDQUFELENBQTJDb0IsSUFBM0MsQ0FBZ0RELEtBQWhELEVBRUFFLFFBQVEsQ0FBQ2YsTUFBVCxDQUFnQmUsUUFBUSxDQUFDQyxVQUFULENBQW9CWixDQUFwQixDQUFoQixDQUF3Q1YsQ0FBQyxDQUFDLDJDQUFELENBQUQsQ0FBK0N1QixLQUEvQyxHQUF1RCxDQUF2RCxDQUF4QyxFQUVBdkIsQ0FBQyxDQUFDLDRDQUFELENBQUQsQ0FBZ0R3QixJQUFoRCxDQUFxRCxnQ0FBZ0NoQyxTQUFTLENBQUNpQyxVQUFWLENBQXFCZCxDQUFyQixFQUF3QmUsT0FBeEIsQ0FBZ0MsS0FBaEMsQ0FBdUMsaUNBQXZDLENBQXJGLEVBRUExQixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQzJCLEtBQTNDLENBQWlELE1BQWpELEVBRUEsS0FBSzVCLE1BQUwsQ0FBWUksUUFBWixDQUF1QkEsUUFBdkIsQ0FDQSxLQUFLSixNQUFMLENBQVlNLE9BQVosQ0FBc0JBLE9BQXRCLENBSUFiLFNBQVMsQ0FBQ29DLFdBQVYsR0FFQSxNQUFPekIsQ0FBQUEsUUFBUSxDQUFDMEIsT0FBVCxFQUdQLENBdEd1QixDQTBHeEJDLElBQUksQ0FBRSxjQUFTVixJQUFULENBQWVaLFFBQWYsQ0FDTixDQUNDLE1BQU8sTUFBS0YsTUFBTCxDQUFZYyxJQUFaLENBQWtCWixRQUFsQixDQUNQLENBN0d1QixDQUFoQixDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBDTlJTXG4gKlxuICogVGhpcyBmaWxlIG11c3QgYmUgdXNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DOlxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWVuLmh0bWxcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1mci5odG1sXG4gKlxuICogQGdsb2JhbCBKc29uVmlld1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdKc29uQm94Q3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0pzb25Cb3gvdHdpZy9Kc29uQm94Q3RybC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2Nzcy8zcmQtcGFydHkvanNvbnZpZXcuYnVuZGxlLmNzcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvanNvbnZpZXcuYnVuZGxlLmpzJyxcblx0XHRdKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5hcHBlbmRIVE1MKCdib2R5JywgZGF0YVswXSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgX2NsYXNzID0gdGhpcy4kY2xhc3M7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRTVBMzQ5NzZfQUM2Rl81QjVGXzc3MEZfRjI2REQxQTJBQjk2Jykub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcblxuXHRcdFx0XHRcdGFtaVdlYkFwcC5tb2RhbExvY2soKTtcblxuXHRcdFx0XHRcdF9jbGFzcy5kZWZlcnJlZC5yZXNvbHZlV2l0aChfY2xhc3MuY29udGV4dCB8fCBfY2xhc3MuZGVmZXJyZWQpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKGpzb24sIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgYTtcblx0XHRsZXQgYjtcblxuXHRcdGlmKGFtaVdlYkFwcC50eXBlT2YoanNvbikgIT09ICdTdHJpbmcnKVxuXHRcdHtcblx0XHRcdGEgPSAvKi0tLS0tLSovKGpzb24pO1xuXHRcdFx0YiA9IEpTT04uc3RyaW5naWZ5KGEsIG51bGwsIDIpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0anNvbiA9IGpzb24udHJpbSgpO1xuXG5cdFx0XHRpZihqc29uICYmIGpzb24udG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJylcblx0XHRcdHtcblx0XHRcdFx0YSA9IEpTT04ucGFyc2UoanNvbik7XG5cdFx0XHRcdGIgPSBKU09OLnN0cmluZ2lmeShhLCBudWxsLCAyKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YSA9IG51bGw7XG5cdFx0XHRcdGIgPSAnbnVsbCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCwgdGl0bGVcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0Wydjb250ZXh0JywgJ3RpdGxlJ10sXG5cdFx0XHRbZGVmZXJyZWQsICdKU09OIGJveCddLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0JCgnI0ZBMDkwNTczXzlFNkJfNzJGNl8yNDMxX0FGQjFGMTA0RUZCNycpLnRleHQodGl0bGUpO1xuXG5cdFx0SnNvblZpZXcucmVuZGVyKEpzb25WaWV3LmNyZWF0ZVRyZWUoYSksICQoJyNCMjhDMzUyOF8wQTk4XzI3QTlfQURFQ19DMDY3OEFDRTA0MjYgZGl2JykuZW1wdHkoKVswXSk7XG5cblx0XHQkKCcjQ0I0Q0RDRkZfOEI0QV9GNEQ2X0NGRDVfRTBDNjlCQjRDMkUwIGNvZGUnKS5odG1sKCc8aSBjbGFzcz1cImxpbmUtbnVtYmVyXCI+PC9pPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChiKS5yZXBsYWNlKC9cXG4vZywgJ1xcbjxpIGNsYXNzPVwibGluZS1udW1iZXJcIj48L2k+JykpO1xuXG5cdFx0JCgnI0U1QTM0OTc2X0FDNkZfNUI1Rl83NzBGX0YyNkREMUEyQUI5NicpLm1vZGFsKCdzaG93Jyk7XG5cblx0XHR0aGlzLiRjbGFzcy5kZWZlcnJlZCA9IGRlZmVycmVkO1xuXHRcdHRoaXMuJGNsYXNzLmNvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLm1vZGFsVW5sb2NrKCk7XG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvdzogZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIodGV4dCwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
