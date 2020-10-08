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
 */$AMIClass("GraphCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/Graph/twig/GraphCtrl.twig",amiWebApp.originURL+"/controls/Graph/twig/graph.twig",amiWebApp.originURL+"/js/3rd-party/viz.min.js",amiWebApp.originURL+"/css/ami.min.css",amiWebApp.originURL+"/css/font-awesome.min.css"],{context:this}).done(function(data){_this.fragmentGraphCtrl=data[0];_this.fragmentGraph=data[1]})},render:function render(selector,command,settings){var _this2=this;var result=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context"],[result],settings),context=_amiWebApp$setup[0];amiCommand.execute(command).done(function(data){_this2.dotString=amiWebApp.jspath("..rowset{.@type===\"graph\"}.row.field{.@name===\"dot\"}.$",data)[0]||"";_this2.replaceHTML(selector,_this2.fragmentGraphCtrl).done(function(){$(_this2.patchId("#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15")).change(function(e){e.preventDefault();_this2.switchDirection()});$(_this2.patchId("#E90168C4_E4BD_ACC8_085F_9953D6CF789F")).click(function(e){e.preventDefault();_this2.exportGraph()});_this2.display().done(function(){result.resolveWith(context,[data])})})}).fail(function(data){result.rejectWith(context,[data])});return result.promise()},display:function display(){var _this3=this;amiWebApp.lock();var result=$.Deferred();this.graph=typeof Viz!=="undefined"?Viz(this.dotString,"svg"):"";this.graph=this.graph.replace(/xlink:href="([^"]*)"/g,function(x,json){var jsonbObj=JSON.parse(amiWebApp.htmlToText(json));var attrs=["data-ctrl=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl"])+"\"","data-ctrl-location=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl-location"])+"\"","data-params=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-params"]))+"\"","data-settings=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-settings"]))+"\"","data-icon=\""+amiWebApp.textToHtml(jsonbObj["data-icon"])+"\"","data-title=\""+amiWebApp.textToHtml(jsonbObj["data-title"])+"\"","data-title-icon=\""+amiWebApp.textToHtml(jsonbObj["data-title-icon"])+"\""];return"xlink:href=\"#\" "+attrs.join(" ")});var doc=new DOMParser().parseFromString(this.graph,"image/svg+xml");var svg=$(doc.documentElement);svg.find("a[data-title-icon]").each(function(i,el){$("<tspan font-family=\"FontAwesome\">"+String.fromCharCode("0x"+$(el).attr("data-title-icon"))+"</tspan><tspan> </tspan>").prependTo($(el).find("text"))});this.graph=doc.documentElement.outerHTML;var dict={graph:this.graph};this.replaceHTML(this.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487"),this.fragmentGraph,{dict:dict}).done(function(){$(_this3.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487")+" a[data-ctrl]").click(function(e){e.preventDefault();_this3.createControlFromWebLink(_this3.getParent(),e.currentTarget,_this3.ctx)});amiWebApp.unlock();result.resolveWith(_this3,[result])});return result.promise()},switchDirection:function switchDirection(){var _this4=this;var result=$.Deferred();var regex=new RegExp("(.*s*rankdirs*=s*\")([L][R]|[T][B])(\"s*.*)");var direction=this.dotString.match(regex)[2];if(direction==="LR"){this.dotString=this.dotString.replace(regex,"$1TB$3")}else if(direction==="TB"){this.dotString=this.dotString.replace(regex,"$1LR$3")}this.display().done(function(){result.resolveWith(_this4,[result])});return result.promise()},exportGraph:function exportGraph(){var blob=new Blob([this.graph],{type:"image/svg+xml",endings:"native"});saveAs(blob,"graph.svg")}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyYXBoQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiY29udGV4dCIsImRvbmUiLCJkYXRhIiwiZnJhZ21lbnRHcmFwaEN0cmwiLCJmcmFnbWVudEdyYXBoIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJzZXR1cCIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiZG90U3RyaW5nIiwianNwYXRoIiwicmVwbGFjZUhUTUwiLCJwYXRjaElkIiwiY2hhbmdlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3dpdGNoRGlyZWN0aW9uIiwiY2xpY2siLCJleHBvcnRHcmFwaCIsImRpc3BsYXkiLCJyZXNvbHZlV2l0aCIsImZhaWwiLCJyZWplY3RXaXRoIiwicHJvbWlzZSIsImxvY2siLCJncmFwaCIsIlZpeiIsInJlcGxhY2UiLCJ4IiwianNvbiIsImpzb25iT2JqIiwiSlNPTiIsInBhcnNlIiwiaHRtbFRvVGV4dCIsImF0dHJzIiwidGV4dFRvSHRtbCIsInN0cmluZ2lmeSIsImpvaW4iLCJkb2MiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJzdmciLCJkb2N1bWVudEVsZW1lbnQiLCJmaW5kIiwiZWFjaCIsImkiLCJlbCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImF0dHIiLCJwcmVwZW5kVG8iLCJvdXRlckhUTUwiLCJkaWN0IiwiY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rIiwiZ2V0UGFyZW50IiwiY3VycmVudFRhcmdldCIsImN0eCIsInVubG9jayIsInJlZ2V4IiwiUmVnRXhwIiwiZGlyZWN0aW9uIiwibWF0Y2giLCJibG9iIiwiQmxvYiIsInR5cGUiLCJlbmRp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QUFOLENBQVQsQ0FBdUIsQ0FDbkN1QyxJQUFJLENBQUUsZUFENkIsQ0FFbkNDLE9BQU8sQ0FBRyxRQUZ5QixDQUF2QixDQUFiLENBS0FDLE1BQU0sQ0FBQ0osSUFBRCxDQUFPLFdBQVAsQ0FDTixDQXpNcUIsQ0FBZCxDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqXG4gKiBAZ2xvYmFsIFZpeiwgc2F2ZUFzXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ0dyYXBoQ3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0dyYXBoL3R3aWcvR3JhcGhDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvR3JhcGgvdHdpZy9ncmFwaC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS92aXoubWluLmpzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdF0sIHtjb250ZXh0OiB0aGlzfSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50R3JhcGhDdHJsID0gZGF0YVswXTtcblx0XHRcdHRoaXMuZnJhZ21lbnRHcmFwaCA9IGRhdGFbMV07XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmQsIHNldHRpbmdzKVxuICAgIHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoWydjb250ZXh0J10sIFtyZXN1bHRdLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoY29tbWFuZCkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmRvdFN0cmluZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZ3JhcGhcIn0ucm93LmZpZWxkey5AbmFtZT09PVwiZG90XCJ9LiQnLCBkYXRhKVswXSB8fCAnJztcblxuXHRcdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudEdyYXBoQ3RybCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0E4RTdDODhEXzdCNzhfQjIyMV8wQkNCXzZFRjFGOUNDM0MxNScpKS5jaGFuZ2UoKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuc3dpdGNoRGlyZWN0aW9uKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFOTAxNjhDNF9FNEJEX0FDQzhfMDg1Rl85OTUzRDZDRjc4OUYnKSkuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuZXhwb3J0R3JhcGgoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmRpc3BsYXkoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YV0pO1xuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGFdKTtcblx0XHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblxuICAgIH0sXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBkaXNwbGF5OiBmdW5jdGlvbigpXG4gICAge1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cbiAgICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICBjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAgICAgdGhpcy5ncmFwaCA9IHR5cGVvZiBWaXogIT09ICd1bmRlZmluZWQnID8gVml6KHRoaXMuZG90U3RyaW5nLCAnc3ZnJykgOiAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHUkFQSCBQT1NUIFRSRUFUTUVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5ncmFwaCA9IHRoaXMuZ3JhcGgucmVwbGFjZSgveGxpbms6aHJlZj1cIihbXlwiXSopXCIvZywgKHgsIGpzb24pID0+IHtcblxuXHRcdFx0Y29uc3QganNvbmJPYmogPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5odG1sVG9UZXh0KGpzb24pKTtcblxuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdCdkYXRhLWN0cmw9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybCddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLWN0cmwtbG9jYXRpb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybC1sb2NhdGlvbiddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1wYXJhbXMnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoSlNPTi5zdHJpbmdpZnkoanNvbmJPYmpbJ2RhdGEtc2V0dGluZ3MnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1pY29uJ10pICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtdGl0bGU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUnXSkgKyAnXCInLFxuXHRcdFx0XHQnZGF0YS10aXRsZS1pY29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLXRpdGxlLWljb24nXSkgKyAnXCInLFxuXHRcdFx0XTtcblxuXHRcdFx0cmV0dXJuICd4bGluazpocmVmPVwiI1wiICcgKyBhdHRycy5qb2luKCcgJyk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcodGhpcy5ncmFwaCwgJ2ltYWdlL3N2Zyt4bWwnKTtcblxuXHRcdGNvbnN0IHN2ZyA9ICQoZG9jLmRvY3VtZW50RWxlbWVudCk7XG5cblx0XHRzdmcuZmluZCgnYVtkYXRhLXRpdGxlLWljb25dJykuZWFjaCgoaSwgZWwpID0+IHtcblxuXHRcdFx0JCgnPHRzcGFuIGZvbnQtZmFtaWx5PVwiRm9udEF3ZXNvbWVcIj4nICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgJChlbCkuYXR0cignZGF0YS10aXRsZS1pY29uJykpICsgJzwvdHNwYW4+PHRzcGFuPiA8L3RzcGFuPicpLnByZXBlbmRUbygkKGVsKS5maW5kKCd0ZXh0JykpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5ncmFwaCA9IGRvYy5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MO1xuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRncmFwaCA6IHRoaXMuZ3JhcGgsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yZXBsYWNlSFRNTCh0aGlzLnBhdGNoSWQoJyNBMEY2NzYzRl9ERTI5XzUxODVfMzVDMV9EQ0FBODFFOEM0ODcnKSwgdGhpcy5mcmFnbWVudEdyYXBoLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0EwRjY3NjNGX0RFMjlfNTE4NV8zNUMxX0RDQUE4MUU4QzQ4NycpICsgJyBhW2RhdGEtY3RybF0nKS5jbGljaygoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLmNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayh0aGlzLmdldFBhcmVudCgpLCBlLmN1cnJlbnRUYXJnZXQsIHRoaXMuY3R4KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0YW1pV2ViQXBwLnVubG9jaygpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRdKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuICAgIH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzd2l0Y2hEaXJlY3Rpb246IGZ1bmN0aW9uKClcbiAgICB7XG4gICAgIFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgIFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCcoLipcXHMqcmFua2Rpclxccyo9XFxzKlwiKShbTF1bUl18W1RdW0JdKShcIlxccyouKiknKTtcblxuICAgICBcdGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZG90U3RyaW5nLm1hdGNoKHJlZ2V4KVsyXTtcblxuICAgICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICBcdGlmKGRpcmVjdGlvbiA9PT0gJ0xSJyApXG4gICAgIFx0e1xuICAgICBcdFx0dGhpcy5kb3RTdHJpbmcgPSB0aGlzLmRvdFN0cmluZy5yZXBsYWNlKHJlZ2V4LCAnJDFUQiQzJyk7XG4gICAgIFx0fVxuICAgICBcdGVsc2UgaWYoZGlyZWN0aW9uID09PSAnVEInIClcbiAgICAgXHR7XG5cdFx0XHR0aGlzLmRvdFN0cmluZyA9IHRoaXMuZG90U3RyaW5nLnJlcGxhY2UocmVnZXgsICckMUxSJDMnKTtcbiAgICAgXHR9XG5cblx0XHR0aGlzLmRpc3BsYXkoKS5kb25lKCgpID0+IHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0XSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcbiAgICB9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXhwb3J0R3JhcGg6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbdGhpcy5ncmFwaF0sIHtcblx0XHRcdHR5cGU6ICdpbWFnZS9zdmcreG1sJyxcblx0XHRcdGVuZGluZ3MgOiAnbmF0aXZlJyxcblx0XHR9KTtcblxuXHRcdHNhdmVBcyhibG9iLCAnZ3JhcGguc3ZnJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi8iXX0=
