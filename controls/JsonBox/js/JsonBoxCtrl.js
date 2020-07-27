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
 */$AMIClass("JsonBoxCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/JsonBox/twig/JsonBoxCtrl.twig",amiWebApp.originURL+"/css/3rd-party/jsonview.bundle.css",amiWebApp.originURL+"/js/3rd-party/jsonview.bundle.js"]).done(function(data){amiWebApp.appendHTML("body",data[0]).done(function(){var _class=_this.$class;$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").on("hidden.bs.modal",function(){amiWebApp.modalLock();_class.deferred.resolveWith(_class.context||_class.deferred)})})})},render:function render(json,settings){var deferred=$.Deferred();amiWebApp.modalUnlock();var a;var b;try{if(amiWebApp.typeOf(json)!=="String"){a=json;b=JSON.stringify(a,null,2)}else{json=json.trim();if(json&&json.toUpperCase()!=="@NULL"){a=JSON.parse(json);b=JSON.stringify(a,null,2)}else{a=null;b="null"}}}catch(e){amiWebApp.error(e,true);a=null;b="null"}var _amiWebApp$setup=amiWebApp.setup(["context","title"],[deferred,"JSON box"],settings),context=_amiWebApp$setup[0],title=_amiWebApp$setup[1];$("#FA090573_9E6B_72F6_2431_AFB1F104EFB7").text(title);JsonView.render(JsonView.createTree(a),$("#B28C3528_0A98_27A9_ADEC_C0678ACE0426 div").empty()[0]);$("#CB4CDCFF_8B4A_F4D6_CFD5_E0C69BB4C2E0 code").html("<i class=\"line-number\"></i>"+amiWebApp.textToHtml(b).replace(/\n/g,"\n<i class=\"line-number\"></i>"));$("#E5A34976_AC6F_5B5F_770F_F26DD1A2AB96").modal("show");this.$class.deferred=deferred;this.$class.context=context;return deferred.promise()},show:function show(text,settings){return this.render(text,settings)}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpzb25Cb3hDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImFwcGVuZEhUTUwiLCJfY2xhc3MiLCIkY2xhc3MiLCIkIiwib24iLCJtb2RhbExvY2siLCJkZWZlcnJlZCIsInJlc29sdmVXaXRoIiwiY29udGV4dCIsInJlbmRlciIsImpzb24iLCJzZXR0aW5ncyIsIkRlZmVycmVkIiwibW9kYWxVbmxvY2siLCJhIiwiYiIsInR5cGVPZiIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0cmltIiwidG9VcHBlckNhc2UiLCJwYXJzZSIsImUiLCJlcnJvciIsInNldHVwIiwidGl0bGUiLCJ0ZXh0IiwiSnNvblZpZXciLCJjcmVhdGVUcmVlIiwiZW1wdHkiLCJodG1sIiwidGV4dFRvSHRtbCIsInJlcGxhY2UiLCJtb2RhbCIsInByb21pc2UiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FlQUEsU0FBUyxDQUFDLGFBQUQsQ0FBZ0IsQ0FHeEJDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxPQUhVLENBT3hCQyxLQUFLLENBQUUsZUFBU0MsTUFBVCxDQUFpQkMsS0FBakIsQ0FDUCxDQUNDLEtBQUtDLE1BQUwsQ0FBWUgsS0FBWixDQUFrQkMsTUFBbEIsQ0FBMEJDLEtBQTFCLENBQ0EsQ0FWdUIsQ0FjeEJFLE9BQU8sQ0FBRSxrQkFDVCxnQkFDQyxNQUFPQyxDQUFBQSxTQUFTLENBQUNDLGFBQVYsQ0FBd0IsQ0FDOUJELFNBQVMsQ0FBQ0UsU0FBVixDQUFzQix5Q0FEUSxDQUU5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLG9DQUZRLENBRzlCRixTQUFTLENBQUNFLFNBQVYsQ0FBc0Isa0NBSFEsQ0FBeEIsRUFJSkMsSUFK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WWlCLElBQVosQ0FBa0JmLFFBQWxCLENBQ1AsQ0F6SHVCLENBQWhCLENBQVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIENOUlNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIEpzb25WaWV3XG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ0pzb25Cb3hDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvSnNvbkJveC90d2lnL0pzb25Cb3hDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzLzNyZC1wYXJ0eS9qc29udmlldy5idW5kbGUuY3NzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS9qc29udmlldy5idW5kbGUuanMnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLmFwcGVuZEhUTUwoJ2JvZHknLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRjb25zdCBfY2xhc3MgPSB0aGlzLiRjbGFzcztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQoJyNFNUEzNDk3Nl9BQzZGXzVCNUZfNzcwRl9GMjZERDFBMkFCOTYnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLm1vZGFsTG9jaygpO1xuXG5cdFx0XHRcdFx0X2NsYXNzLmRlZmVycmVkLnJlc29sdmVXaXRoKF9jbGFzcy5jb250ZXh0IHx8IF9jbGFzcy5kZWZlcnJlZCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oanNvbiwgc2V0dGluZ3MpXG5cdHtcblx0XHRjb25zdCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5tb2RhbFVubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGE7XG5cdFx0bGV0IGI7XG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpZihhbWlXZWJBcHAudHlwZU9mKGpzb24pICE9PSAnU3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0YSA9IC8qLS0tLS0tKi8oanNvbik7XG5cdFx0XHRcdGIgPSBKU09OLnN0cmluZ2lmeShhLCBudWxsLCAyKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0anNvbiA9IGpzb24udHJpbSgpO1xuXG5cdFx0XHRcdGlmKGpzb24gJiYganNvbi50b1VwcGVyQ2FzZSgpICE9PSAnQE5VTEwnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YSA9IEpTT04ucGFyc2UoanNvbik7XG5cdFx0XHRcdFx0YiA9IEpTT04uc3RyaW5naWZ5KGEsIG51bGwsIDIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEgPSBudWxsO1xuXHRcdFx0XHRcdGIgPSAnbnVsbCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0Y2F0Y2goZSlcblx0XHR7XG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IoZSwgdHJ1ZSk7XG5cblx0XHRcdGEgPSBudWxsO1xuXHRcdFx0YiA9ICdudWxsJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbXG5cdFx0XHRjb250ZXh0LCB0aXRsZVxuXHRcdF0gPSBhbWlXZWJBcHAuc2V0dXAoXG5cdFx0XHRbJ2NvbnRleHQnLCAndGl0bGUnXSxcblx0XHRcdFtkZWZlcnJlZCwgJ0pTT04gYm94J10sXG5cdFx0XHRzZXR0aW5nc1xuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjRkEwOTA1NzNfOUU2Ql83MkY2XzI0MzFfQUZCMUYxMDRFRkI3JykudGV4dCh0aXRsZSk7XG5cblx0XHRKc29uVmlldy5yZW5kZXIoSnNvblZpZXcuY3JlYXRlVHJlZShhKSwgJCgnI0IyOEMzNTI4XzBBOThfMjdBOV9BREVDX0MwNjc4QUNFMDQyNiBkaXYnKS5lbXB0eSgpWzBdKTtcblxuXHRcdCQoJyNDQjRDRENGRl84QjRBX0Y0RDZfQ0ZENV9FMEM2OUJCNEMyRTAgY29kZScpLmh0bWwoJzxpIGNsYXNzPVwibGluZS1udW1iZXJcIj48L2k+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGIpLnJlcGxhY2UoL1xcbi9nLCAnXFxuPGkgY2xhc3M9XCJsaW5lLW51bWJlclwiPjwvaT4nKSk7XG5cblx0XHQkKCcjRTVBMzQ5NzZfQUM2Rl81QjVGXzc3MEZfRjI2REQxQTJBQjk2JykubW9kYWwoJ3Nob3cnKTtcblxuXHRcdHRoaXMuJGNsYXNzLmRlZmVycmVkID0gZGVmZXJyZWQ7XG5cdFx0dGhpcy4kY2xhc3MuY29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2hvdzogZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIodGV4dCwgc2V0dGluZ3MpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iXX0=
