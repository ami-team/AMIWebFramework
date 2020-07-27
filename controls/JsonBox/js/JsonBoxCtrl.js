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
 */$AMIClass("JsonBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/JsonBox/twig/JsonBoxCtrl.twig",amiWebApp.originURL+"/css/3rd-party/jsonview.bundle.css",amiWebApp.originURL+"/js/3rd-party/jsonview.bundle.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").on("hidden.bs.modal",function(){amiWebApp.modalLock();_class.deferred.resolveWith(_class.context||_class.deferred)})})})},render:function render(json,settings){var deferred=$.Deferred();var a;var b;try{if(amiWebApp.typeOf(json)!=="String"){a=json;b=JSON.stringify(a,null,2)}else{json=json.trim();if(json&&json.toUpperCase()!=="@NULL"){a=JSON.parse(json);b=JSON.stringify(a,null,2)}else{a=null;b="null"}}}catch(e){a=null;b="null"}var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"JSON box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#FA090573_9E6B_72F6_2431_AFB1F104EFB7").text(title);JsonView.render(JsonView.createTree(a),$("#B28C3528_0A98_27A9_ADEC_C0678ACE0426 div").empty()[0]);$("#CB4CDCFF_8B4A_F4D6_CFD5_E0C69BB4C2E0 code").html("<i class=\"line-number\"></i>"+amiWebApp.textToHtml(b).replace(/\n/g,"\n<i class=\"line-number\"></i>"));$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").modal("show");this.$class.deferred=deferred;this.$class.context=context;amiWebApp.modalUnlock();return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpzb25Cb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbExvY2siLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsInJlbmRlciIsImpzb24iLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwiYSIsImIiLCJ0eXBlT2YiLCJKU09OIiwic3RyaW5naWZ5IiwidHJpbSIsInRvVXBwZXJDYXNlIiwicGFyc2UiLCJlIiwic2V0dXAiLCJ0aXRsZSIsInRleHQiLCJKc29uVmlldyIsImNyZWF0ZVRyZWUiLCJlbXB0eSIsImh0bWwiLCJ0ZXh0VG9IdG1sIiwicmVwbGFjZSIsIm1vZGFsIiwibW9kYWxVbmxvY2siLCJwcm9taXNlIiwic2hvdyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBZUFBLFNBQVMsQ0FBQyxhQUFELENBQWdCLENBR3hCQyxRQUFRLENBQUVDLEdBQUcsQ0FBQ0MsT0FIVSxDQU94QkMsS0FBSyxDQUFFLGVBQVNDLE1BQVQsQ0FBaUJDLEtBQWpCLENBQ1AsQ0FDQyxLQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLENBQTBCQyxLQUExQixDQUNBLENBVnVCLENBY3hCRSxPQUFPLENBQUUsa0JBQ1QsZ0JBQ0MsTUFBT0MsQ0FBQUEsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsQ0FBc0IseUNBRFEsQ0FFOUJGLFNBQVMsQ0FBQ0UsU0FBVixDQUFzQixvQ0FGUSxDQUc5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLGtDQUhRLENBQXhCLEVBSUpDLElBSkksQ0FJQyxT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dCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIENOUlNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIEpzb25WaWV3XG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ0pzb25Cb3hDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvSnNvbkJveC90d2lnL0pzb25Cb3hDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzLzNyZC1wYXJ0eS9qc29udmlldy5idW5kbGUuY3NzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9qc29udmlldy5idW5kbGUuanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNFNUEzNDk3Nl9BQzZGXzVCNUZfNzcwRl9GMjZERDFBMkFCOTYnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm1vZGFsTG9jaygpO1xuXG5cdFx0XHRcdFx0X2NsYXNzLmRlZmVycmVkLnJlc29sdmVXaXRoKF9jbGFzcy5jb250ZXh0IHx8IF9jbGFzcy5kZWZlcnJlZCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oanNvbiwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBhO1xuXHRcdGxldCBiO1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aWYoYW1pV2ViQXBwLnR5cGVPZihqc29uKSAhPT0gJ1N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGEgPSAvKi0tLS0tLSovKGpzb24pO1xuXHRcdFx0XHRiID0gSlNPTi5zdHJpbmdpZnkoYSwgbnVsbCwgMik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGpzb24gPSBqc29uLnRyaW0oKTtcblxuXHRcdFx0XHRpZihqc29uICYmIGpzb24udG9VcHBlckNhc2UoKSAhPT0gJ0BOVUxMJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuXHRcdFx0XHRcdGIgPSBKU09OLnN0cmluZ2lmeShhLCBudWxsLCAyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhID0gbnVsbDtcblx0XHRcdFx0XHRiID0gJ251bGwnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNhdGNoKGUpXG5cdFx0e1xuXHRcdFx0YSA9IG51bGw7XG5cdFx0XHRiID0gJ251bGwnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IFtcblx0XHRcdGNvbnRleHQsIHRpdGxlXG5cdFx0XSA9IGFtaVdlYkFwcC5zZXR1cChcblx0XHRcdFsnY29udGV4dCcsICd0aXRsZSddLFxuXHRcdFx0W2RlZmVycmVkLCAnSlNPTiBib3gnXSxcblx0XHRcdHNldHRpbmdzXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdCQoJyNGQTA5MDU3M185RTZCXzcyRjZfMjQzMV9BRkIxRjEwNEVGQjcnKS50ZXh0KHRpdGxlKTtcblxuXHRcdEpzb25WaWV3LnJlbmRlcihKc29uVmlldy5jcmVhdGVUcmVlKGEpLCAkKCcjQjI4QzM1MjhfMEE5OF8yN0E5X0FERUNfQzA2NzhBQ0UwNDI2IGRpdicpLmVtcHR5KClbMF0pO1xuXG5cdFx0JCgnI0NCNENEQ0ZGXzhCNEFfRjRENl9DRkQ1X0UwQzY5QkI0QzJFMCBjb2RlJykuaHRtbCgnPGkgY2xhc3M9XCJsaW5lLW51bWJlclwiPjwvaT4nICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoYikucmVwbGFjZSgvXFxuL2csICdcXG48aSBjbGFzcz1cImxpbmUtbnVtYmVyXCI+PC9pPicpKTtcblxuXHRcdCQoJyNFNUEzNDk3Nl9BQzZGXzVCNUZfNzcwRl9GMjZERDFBMkFCOTYnKS5tb2RhbCgnc2hvdycpO1xuXG5cdFx0dGhpcy4kY2xhc3MuZGVmZXJyZWQgPSBkZWZlcnJlZDtcblx0XHR0aGlzLiRjbGFzcy5jb250ZXh0ID0gY29udGV4dDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5tb2RhbFVubG9jaygpO1xuXG5cdFx0cmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNob3c6IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKHRleHQsIHNldHRpbmdzKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
