/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 *
 * @global Viz, saveAs
 *
 */$AMIClass("GraphCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/Graph/twig/GraphCtrl.twig",amiWebApp.originURL+"/controls/Graph/twig/graph.twig",amiWebApp.originURL+"/js/3rd-party/viz.min.js",amiWebApp.originURL+"/css/ami.min.css",amiWebApp.originURL+"/css/font-awesome.min.css"],{context:this}).done(function(data){_this.fragmentGraphCtrl=data[0];_this.fragmentGraph=data[1]})},render:function render(selector,command,settings){var _this2=this;var result=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context"],[result],settings),context=_amiWebApp$setup[0];amiCommand.execute(command).done(function(data){_this2.dotString=amiWebApp.jspath("..rowset{.@type===\"graph\"}.row.field{.@name===\"dot\"}.$",data)[0]||"";_this2.replaceHTML(selector,_this2.fragmentGraphCtrl).done(function(){$(_this2.patchId("#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15")).change(function(e){e.preventDefault();_this2.switchDirection()});$(_this2.patchId("#E90168C4_E4BD_ACC8_085F_9953D6CF789F")).click(function(e){e.preventDefault();_this2.exportGraph();_this2.test()});_this2.display().done(function(){result.resolveWith(context,[data])})})}).fail(function(data){result.rejectWith(context,[data])});return result.promise()},display:function display(){var _this3=this;amiWebApp.lock();var result=$.Deferred();this.graph=typeof Viz!=="undefined"?Viz(this.dotString,"svg"):"";this.graph=this.graph.replace(/xlink:href="([^"]*)"/g,function(x,json){var jsonbObj=JSON.parse(amiWebApp.htmlToText(json));var attrs=["data-ctrl=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl"])+"\"","data-ctrl-location=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl-location"])+"\"","data-params=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-params"]))+"\"","data-settings=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-settings"]))+"\"","data-icon=\""+amiWebApp.textToHtml(jsonbObj["data-icon"])+"\"","data-title=\""+amiWebApp.textToHtml(jsonbObj["data-title"])+"\"","data-title-icon=\""+amiWebApp.textToHtml(jsonbObj["data-title-icon"])+"\""];return"xlink:href=\"#\" "+attrs.join(" ")});var doc=new DOMParser().parseFromString(this.graph,"image/svg+xml");var svg=$(doc.documentElement);svg.find("a[data-title-icon]").each(function(i,el){$("<tspan font-family=\"FontAwesome\">"+String.fromCharCode("0x"+$(el).attr("data-title-icon"))+"</tspan><tspan> </tspan>").prependTo($(el).find("text"))});this.graph=doc.documentElement.outerHTML;var dict={graph:this.graph};this.replaceHTML(this.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487"),this.fragmentGraph,{dict:dict}).done(function(){$(_this3.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487")+" a[data-ctrl]").click(function(e){e.preventDefault();_this3.createControlFromWebLink(_this3.getParent(),e.currentTarget,_this3.ctx)});amiWebApp.unlock();result.resolveWith(_this3,[result])});return result.promise()},switchDirection:function switchDirection(){var regex=new RegExp("(.*s*rankdirs*=s*\")([L][R]|[T][B])(\"s*.*)");var direction=this.dotString.match(regex)[2];if(direction==="LR"){this.dotString=this.dotString.replace(regex,"$1TB$3")}else if(direction==="TB"){this.dotString=this.dotString.replace(regex,"$1LR$3")}this.display()},exportGraph:function exportGraph(){var blob=new Blob([this.graph],{type:"image/svg+xml",endings:"native"});saveAs(blob,"graph.svg")},test:function test(){var image=Viz.svgXmlToPngImageElement(this.graph);var blob=new Blob([image],{type:"image/png",endings:"native"});saveAs(blob,"graph.png")}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyYXBoQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiY29udGV4dCIsImRvbmUiLCJkYXRhIiwiZnJhZ21lbnRHcmFwaEN0cmwiLCJmcmFnbWVudEdyYXBoIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJzZXR1cCIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiZG90U3RyaW5nIiwianNwYXRoIiwicmVwbGFjZUhUTUwiLCJwYXRjaElkIiwiY2hhbmdlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3dpdGNoRGlyZWN0aW9uIiwiY2xpY2siLCJleHBvcnRHcmFwaCIsInRlc3QiLCJkaXNwbGF5IiwicmVzb2x2ZVdpdGgiLCJmYWlsIiwicmVqZWN0V2l0aCIsInByb21pc2UiLCJsb2NrIiwiZ3JhcGgiLCJWaXoiLCJyZXBsYWNlIiwieCIsImpzb24iLCJqc29uYk9iaiIsIkpTT04iLCJwYXJzZSIsImh0bWxUb1RleHQiLCJhdHRycyIsInRleHRUb0h0bWwiLCJzdHJpbmdpZnkiLCJqb2luIiwiZG9jIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwic3ZnIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZCIsImVhY2giLCJpIiwiZWwiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhdHRyIiwicHJlcGVuZFRvIiwib3V0ZXJIVE1MIiwiZGljdCIsImNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayIsImdldFBhcmVudCIsImN1cnJlbnRUYXJnZXQiLCJjdHgiLCJ1bmxvY2siLCJyZWdleCIsIlJlZ0V4cCIsImRpcmVjdGlvbiIsIm1hdGNoIiwiYmxvYiIsIkJsb2IiLCJ0eXBl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QixDQTJNdEI1QyxJQUFJLENBQUUsZUFDTixDQUNDLEdBQUlpRCxDQUFBQSxLQUFLLENBQUd6QyxHQUFHLENBQUMwQyx1QkFBSixDQUE0QixLQUFLM0MsS0FBakMsQ0FBWixDQUVBLEdBQU1xQyxDQUFBQSxJQUFJLENBQUcsR0FBSUMsQ0FBQUEsSUFBSixDQUFTLENBQUNJLEtBQUQsQ0FBVCxDQUFrQixDQUM5QkgsSUFBSSxDQUFFLFdBRHdCLENBRTlCQyxPQUFPLENBQUcsUUFGb0IsQ0FBbEIsQ0FBYixDQUtBQyxNQUFNLENBQUNKLElBQUQsQ0FBTyxXQUFQLENBQ04sQ0FyTnFCLENBQWQsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKlxuICogQGdsb2JhbCBWaXosIHNhdmVBc1xuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdHcmFwaEN0cmwnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5Db250cm9sLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHBhcmVudCwgb3duZXIpXG5cdHtcblx0XHR0aGlzLiRzdXBlci4kaW5pdChwYXJlbnQsIG93bmVyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uUmVhZHk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9HcmFwaC90d2lnL0dyYXBoQ3RybC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0dyYXBoL3R3aWcvZ3JhcGgudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9qcy8zcmQtcGFydHkvdml6Lm1pbi5qcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jc3MvYW1pLm1pbi5jc3MnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyxcblx0XHRdLCB7Y29udGV4dDogdGhpc30pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5mcmFnbWVudEdyYXBoQ3RybCA9IGRhdGFbMF07XG5cdFx0XHR0aGlzLmZyYWdtZW50R3JhcGggPSBkYXRhWzFdO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb21tYW5kLCBzZXR0aW5ncylcbiAgICB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFsnY29udGV4dCddLCBbcmVzdWx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKGNvbW1hbmQpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5kb3RTdHJpbmcgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImdyYXBoXCJ9LnJvdy5maWVsZHsuQG5hbWU9PT1cImRvdFwifS4kJywgZGF0YSlbMF0gfHwgJyc7XG5cblx0XHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRHcmFwaEN0cmwpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBOEU3Qzg4RF83Qjc4X0IyMjFfMEJDQl82RUYxRjlDQzNDMTUnKSkuY2hhbmdlKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLnN3aXRjaERpcmVjdGlvbigpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRTkwMTY4QzRfRTRCRF9BQ0M4XzA4NUZfOTk1M0Q2Q0Y3ODlGJykpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLmV4cG9ydEdyYXBoKCk7XG5cdFx0XHRcdFx0dGhpcy50ZXN0KCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5kaXNwbGF5KCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGFdKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YV0pO1xuXHRcdH0pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG5cbiAgICB9LFxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgZGlzcGxheTogZnVuY3Rpb24oKVxuICAgIHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHR5cGVvZiBWaXogIT09ICd1bmRlZmluZWQnID8gVml6KHRoaXMuZG90U3RyaW5nLCAnc3ZnJykgOiAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHUkFQSCBQT1NUIFRSRUFUTUVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5ncmFwaCA9IHRoaXMuZ3JhcGgucmVwbGFjZSgveGxpbms6aHJlZj1cIihbXlwiXSopXCIvZywgKHgsIGpzb24pID0+IHtcblxuXHRcdFx0Y29uc3QganNvbmJPYmogPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5odG1sVG9UZXh0KGpzb24pKTtcblxuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdCdkYXRhLWN0cmw9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybCddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLWN0cmwtbG9jYXRpb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybC1sb2NhdGlvbiddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1wYXJhbXMnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoSlNPTi5zdHJpbmdpZnkoanNvbmJPYmpbJ2RhdGEtc2V0dGluZ3MnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1pY29uJ10pICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtdGl0bGU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUnXSkgKyAnXCInLFxuXHRcdFx0XHQnZGF0YS10aXRsZS1pY29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLXRpdGxlLWljb24nXSkgKyAnXCInLFxuXHRcdFx0XTtcblxuXHRcdFx0cmV0dXJuICd4bGluazpocmVmPVwiI1wiICcgKyBhdHRycy5qb2luKCcgJyk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcodGhpcy5ncmFwaCwgJ2ltYWdlL3N2Zyt4bWwnKTtcblxuXHRcdGNvbnN0IHN2ZyA9ICQoZG9jLmRvY3VtZW50RWxlbWVudCk7XG5cblx0XHRzdmcuZmluZCgnYVtkYXRhLXRpdGxlLWljb25dJykuZWFjaCgoaSwgZWwpID0+IHtcblxuXHRcdFx0JCgnPHRzcGFuIGZvbnQtZmFtaWx5PVwiRm9udEF3ZXNvbWVcIj4nICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgJChlbCkuYXR0cignZGF0YS10aXRsZS1pY29uJykpICsgJzwvdHNwYW4+PHRzcGFuPiA8L3RzcGFuPicpLnByZXBlbmRUbygkKGVsKS5maW5kKCd0ZXh0JykpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5ncmFwaCA9IGRvYy5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MO1xuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRncmFwaCA6IHRoaXMuZ3JhcGgsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNBMEY2NzYzRl9ERTI5XzUxODVfMzVDMV9EQ0FBODFFOEM0ODcnKSwgdGhpcy5mcmFnbWVudEdyYXBoLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0EwRjY3NjNGX0RFMjlfNTE4NV8zNUMxX0RDQUE4MUU4QzQ4NycpICsgJyBhW2RhdGEtY3RybF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayh0aGlzLmdldFBhcmVudCgpLCBlLmN1cnJlbnRUYXJnZXQsIHRoaXMuY3R4KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRdKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuICAgIH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzd2l0Y2hEaXJlY3Rpb246IGZ1bmN0aW9uKClcbiAgICB7XG4gICAgIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgIFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCcoLipcXHMqcmFua2Rpclxccyo9XFxzKlwiKShbTF1bUl18W1RdW0JdKShcIlxccyouKiknKTtcblxuICAgICBcdGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZG90U3RyaW5nLm1hdGNoKHJlZ2V4KVsyXTtcblxuICAgICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICBcdGlmKGRpcmVjdGlvbiA9PT0gJ0xSJyApXG4gICAgIFx0e1xuICAgICBcdFx0dGhpcy5kb3RTdHJpbmcgPSB0aGlzLmRvdFN0cmluZy5yZXBsYWNlKHJlZ2V4LCAnJDFUQiQzJyk7XG4gICAgIFx0fVxuICAgICBcdGVsc2UgaWYoZGlyZWN0aW9uID09PSAnVEInIClcbiAgICAgXHR7XG5cdFx0XHR0aGlzLmRvdFN0cmluZyA9IHRoaXMuZG90U3RyaW5nLnJlcGxhY2UocmVnZXgsICckMUxSJDMnKTtcbiAgICAgXHR9XG5cblx0XHR0aGlzLmRpc3BsYXkoKTtcbiAgICB9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXhwb3J0R3JhcGg6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbdGhpcy5ncmFwaF0sIHtcblx0XHRcdHR5cGU6ICdpbWFnZS9zdmcreG1sJyxcblx0XHRcdGVuZGluZ3MgOiAnbmF0aXZlJyxcblx0XHR9KTtcblxuXHRcdHNhdmVBcyhibG9iLCAnZ3JhcGguc3ZnJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0ZXN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHR2YXIgaW1hZ2UgPSBWaXouc3ZnWG1sVG9QbmdJbWFnZUVsZW1lbnQodGhpcy5ncmFwaCk7XG5cblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW2ltYWdlXSwge1xuXHRcdFx0dHlwZTogJ2ltYWdlL3BuZycsXG5cdFx0XHRlbmRpbmdzIDogJ25hdGl2ZScsXG5cdFx0fSk7XG5cblx0XHRzYXZlQXMoYmxvYiwgJ2dyYXBoLnBuZycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovIl19
