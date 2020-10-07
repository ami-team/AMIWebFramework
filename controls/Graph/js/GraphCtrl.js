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
 * @global Viz
 *
 */$AMIClass("GraphCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/Graph/twig/GraphCtrl.twig",amiWebApp.originURL+"/controls/Graph/twig/graph.twig",amiWebApp.originURL+"/js/3rd-party/viz.min.js",amiWebApp.originURL+"/css/ami.min.css",amiWebApp.originURL+"/css/font-awesome.min.css"],{context:this}).done(function(data){_this.fragmentGraphCtrl=data[0];_this.fragmentGraph=data[1]})},render:function render(selector,command,settings){var _this2=this;var result=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context"],[result],settings),context=_amiWebApp$setup[0];amiCommand.execute(command).done(function(data){_this2.dotString=amiWebApp.jspath("..rowset{.@type===\"graph\"}.row.field{.@name===\"dot\"}.$",data)[0]||"";_this2.replaceHTML(selector,_this2.fragmentGraphCtrl).done(function(){_this2.display().done(function(){result.resolveWith(context,[data])})})}).fail(function(data){result.rejectWith(context,[data])});return result.promise()},display:function display(){var _this3=this;var result=$.Deferred();var dict={graph:typeof Viz!=="undefined"?Viz(this.dotString,"svg"):""};dict.graph=dict.graph.replace(/xlink:href="([^"]*)"/g,function(x,json){var jsonbObj=JSON.parse(amiWebApp.htmlToText(json));var attrs=["data-ctrl=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl"])+"\"","data-ctrl-location=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl-location"])+"\"","data-params=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-params"]))+"\"","data-settings=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-settings"]))+"\"","data-icon=\""+amiWebApp.textToHtml(jsonbObj["data-icon"])+"\"","data-title=\""+amiWebApp.textToHtml(jsonbObj["data-title"])+"\"","data-title-icon=\""+amiWebApp.textToHtml(jsonbObj["data-title-icon"])+"\""];return"xlink:href=\"#\" "+attrs.join(" ")});var doc=new DOMParser().parseFromString(dict.graph,"image/svg+xml");var svg=$(doc.documentElement);svg.find("a[data-title-icon]").each(function(i,el){$("<tspan font-family=\"FontAwesome\">"+String.fromCharCode("0x"+$(el).attr("data-title-icon"))+"</tspan><tspan> </tspan>").prependTo($(el).find("text"))});dict.graph=doc.documentElement.outerHTML;this.replaceHTML(this.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487"),this.fragmentGraph,{dict:dict}).done(function(){$(_this3.patchId("#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15")).change(function(e){e.preventDefault();_this3.switchOrientation()});$(_this3.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487")+" a[data-ctrl]").click(function(e){e.preventDefault();_this3.createControlFromWebLink(_this3.getParent(),e.currentTarget,_this3.ctx)});result.resolveWith(_this3,[result])});return result.promise()},switchOrientation:function switchOrientation(){var _this4=this;var result=$.Deferred();var regex=new RegExp("(.*s*rankdirs*=s*\")([L][R]|[T][B])(\"s*.*)");var orientation=this.dotString.match(regex)[2];console.debug(orientation);if(orientation==="LR"){this.dotString=this.dotString.replace(regex,"$1TB$3")}else if(orientation==="TB"){this.dotString=this.dotString.replace(regex,"$1LR$3")}this.display().done(function(){result.resolveWith(_this4,[result])});return result.promise()}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyYXBoQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiY29udGV4dCIsImRvbmUiLCJkYXRhIiwiZnJhZ21lbnRHcmFwaEN0cmwiLCJmcmFnbWVudEdyYXBoIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJzZXR1cCIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiZG90U3RyaW5nIiwianNwYXRoIiwicmVwbGFjZUhUTUwiLCJkaXNwbGF5IiwicmVzb2x2ZVdpdGgiLCJmYWlsIiwicmVqZWN0V2l0aCIsInByb21pc2UiLCJkaWN0IiwiZ3JhcGgiLCJWaXoiLCJyZXBsYWNlIiwieCIsImpzb24iLCJqc29uYk9iaiIsIkpTT04iLCJwYXJzZSIsImh0bWxUb1RleHQiLCJhdHRycyIsInRleHRUb0h0bWwiLCJzdHJpbmdpZnkiLCJqb2luIiwiZG9jIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwic3ZnIiwiZG9jdW1lbnRFbGVtZW50IiwiZmluZCIsImVhY2giLCJpIiwiZWwiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhdHRyIiwicHJlcGVuZFRvIiwib3V0ZXJIVE1MIiwicGF0Y2hJZCIsImNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN3aXRjaE9yaWVudGF0aW9uIiwiY2xpY2siLCJjcmVhdGVDb250cm9sRnJvbVdlYkxpbmsiLCJnZXRQYXJlbnQiLCJjdXJyZW50VGFyZ2V0IiwiY3R4IiwicmVnZXgiLCJSZWdFeHAiLCJvcmllbnRhdGlvbiIsIm1hdGNoIiwiY29uc29sZSIsImRlYnVnIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBZ0JB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Q0FBQUEsTUFBTSxDQUFHQyxDQUFDLENBQUNDLFFBQUYsRUFBZixDQUVBLEdBQU1rRCxDQUFBQSxLQUFLLENBQUcsR0FBSUMsQ0FBQUEsTUFBSixDQUFXLDZDQUFYLENBQWQsQ0FFQSxHQUFNQyxDQUFBQSxXQUFXLENBQUcsS0FBS2hELFNBQUwsQ0FBZWlELEtBQWYsQ0FBcUJILEtBQXJCLEVBQTRCLENBQTVCLENBQXBCLENBRUFJLE9BQU8sQ0FBQ0MsS0FBUixDQUFjSCxXQUFkLEVBSUEsR0FBR0EsV0FBVyxHQUFLLElBQW5CLENBQ0EsQ0FDQyxLQUFLaEQsU0FBTCxDQUFpQixLQUFLQSxTQUFMLENBQWVXLE9BQWYsQ0FBdUJtQyxLQUF2QixDQUE4QixRQUE5QixDQUNqQixDQUhELElBSUssSUFBR0UsV0FBVyxHQUFLLElBQW5CLENBQ0wsQ0FDSCxLQUFLaEQsU0FBTCxDQUFpQixLQUFLQSxTQUFMLENBQWVXLE9BQWYsQ0FBdUJtQyxLQUF2QixDQUE4QixRQUE5QixDQUNiLENBRUwsS0FBSzNDLE9BQUwsR0FBZWpCLElBQWYsQ0FBb0IsVUFBTSxDQUN6QlEsTUFBTSxDQUFDVSxXQUFQLENBQW1CLE1BQW5CLENBQXlCLENBQUNWLE1BQUQsQ0FBekIsQ0FDQSxDQUZELEVBSUEsTUFBT0EsQ0FBQUEsTUFBTSxDQUFDYSxPQUFQLEVBQ0osQ0FwUGtCLENBQWQsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKlxuICogQGdsb2JhbCBWaXpcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnR3JhcGhDdHJsJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuQ29udHJvbCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihwYXJlbnQsIG93bmVyKVxuXHR7XG5cdFx0dGhpcy4kc3VwZXIuJGluaXQocGFyZW50LCBvd25lcik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gYW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvR3JhcGgvdHdpZy9HcmFwaEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9HcmFwaC90d2lnL2dyYXBoLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvanMvM3JkLXBhcnR5L3Zpei5taW4uanMnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY3NzL2FtaS5taW4uY3NzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycsXG5cdFx0XSwge2NvbnRleHQ6IHRoaXN9KS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdHRoaXMuZnJhZ21lbnRHcmFwaEN0cmwgPSBkYXRhWzBdO1xuXHRcdFx0dGhpcy5mcmFnbWVudEdyYXBoID0gZGF0YVsxXTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vL1x0cmVuZGVyX29sZDogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmQsIHNldHRpbmdzKVxuLy9cdHtcbi8vXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcbi8vXG4vL1x0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vL1xuLy9cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFsnY29udGV4dCddLCBbcmVzdWx0XSwgc2V0dGluZ3MpO1xuLy9cbi8vXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXG4vL1x0XHRhbWlDb21tYW5kLmV4ZWN1dGUoY29tbWFuZCkuZG9uZSgoZGF0YSkgPT4ge1xuLy9cbi8vXHRcdFx0Y29uc3QgZG90U3RyaW5nID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJncmFwaFwifS5yb3cuZmllbGR7LkBuYW1lPT09XCJkb3RcIn0uJCcsIGRhdGEpWzBdIHx8ICcnO1xuLy9cbi8vXHRcdFx0Y29uc3QgZGljdCA9IHtcbi8vXHRcdFx0XHRncmFwaCA6IHR5cGVvZiBWaXogIT09ICd1bmRlZmluZWQnID8gVml6KGRvdFN0cmluZywgJ3N2ZycpIDogJycsXG4vL1x0XHRcdH07XG4vL1xuLy9cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXHRcdFx0LyogR1JBUEggUE9TVCBUUkVBVE1FTlQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vL1x0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLy9cbi8vXHRcdFx0ZGljdC5ncmFwaCA9IGRpY3QuZ3JhcGgucmVwbGFjZSgveGxpbms6aHJlZj1cIihbXlwiXSopXCIvZywgKHgsIGpzb24pID0+IHtcbi8vXG4vL1x0XHRcdFx0Y29uc3QganNvbmJPYmogPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5odG1sVG9UZXh0KGpzb24pKTtcbi8vXG4vL1x0XHRcdFx0Y29uc3QgYXR0cnMgPSBbXG4vL1x0XHRcdFx0XHQnZGF0YS1jdHJsPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLWN0cmwnXSkgKyAnXCInLFxuLy9cdFx0XHRcdFx0J2RhdGEtY3RybC1sb2NhdGlvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1jdHJsLWxvY2F0aW9uJ10pICsgJ1wiJyxcbi8vXHRcdFx0XHRcdCdkYXRhLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1wYXJhbXMnXSkpICsgJ1wiJyxcbi8vXHRcdFx0XHRcdCdkYXRhLXNldHRpbmdzPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKEpTT04uc3RyaW5naWZ5KGpzb25iT2JqWydkYXRhLXNldHRpbmdzJ10pKSArICdcIicsXG4vL1x0XHRcdFx0XHQnZGF0YS1pY29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLWljb24nXSkgKyAnXCInLFxuLy9cdFx0XHRcdFx0J2RhdGEtdGl0bGU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUnXSkgKyAnXCInLFxuLy9cdFx0XHRcdFx0J2RhdGEtdGl0bGUtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS10aXRsZS1pY29uJ10pICsgJ1wiJyxcbi8vXHRcdFx0XHRdO1xuLy9cbi8vXHRcdFx0XHRyZXR1cm4gJ3hsaW5rOmhyZWY9XCIjXCIgJyArIGF0dHJzLmpvaW4oJyAnKTtcbi8vXHRcdFx0fSk7XG4vL1xuLy9cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXG4vL1x0XHRcdGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGljdC5ncmFwaCwgJ2ltYWdlL3N2Zyt4bWwnKTtcbi8vXG4vL1x0XHRcdGNvbnN0IHN2ZyA9ICQoZG9jLmRvY3VtZW50RWxlbWVudCk7XG4vL1xuLy9cdFx0XHRzdmcuZmluZCgnYVtkYXRhLXRpdGxlLWljb25dJykuZWFjaCgoaSwgZWwpID0+IHtcbi8vXG4vL1x0XHRcdFx0JCgnPHRzcGFuIGZvbnQtZmFtaWx5PVwiRm9udEF3ZXNvbWVcIj4nICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgJChlbCkuYXR0cignZGF0YS10aXRsZS1pY29uJykpICsgJzwvdHNwYW4+PHRzcGFuPiA8L3RzcGFuPicpLnByZXBlbmRUbygkKGVsKS5maW5kKCd0ZXh0JykpO1xuLy9cdFx0XHR9KTtcbi8vXG4vL1x0XHRcdGRpY3QuZ3JhcGggPSBkb2MuZG9jdW1lbnRFbGVtZW50Lm91dGVySFRNTDtcbi8vXG4vL1x0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLy9cbi8vXHRcdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudEdyYXBoQ3RybCwge2RpY3Q6IGRpY3R9KS5kb25lKCgpID0+IHtcbi8vXG4vL1x0XHRcdFx0JChzZWxlY3RvciArICcgYVtkYXRhLWN0cmxdJykuY2xpY2soKGUpID0+IHtcbi8vXG4vL1x0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG4vL1xuLy9cdFx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsodGhpcy5nZXRQYXJlbnQoKSwgZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmN0eCk7XG4vL1x0XHRcdFx0fSk7XG4vL1xuLy9cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YV0pO1xuLy9cdFx0XHR9KTtcbi8vXG4vL1x0XHR9KS5mYWlsKChkYXRhKSA9PiB7XG4vL1xuLy9cdFx0XHRyZXN1bHQucmVqZWN0V2l0aChjb250ZXh0LCBbZGF0YV0pO1xuLy9cdFx0fSk7XG4vL1xuLy9cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLy9cbi8vXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuLy9cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmQsIHNldHRpbmdzKVxuICAgIHtcblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBbY29udGV4dF0gPSBhbWlXZWJBcHAuc2V0dXAoWydjb250ZXh0J10sIFtyZXN1bHRdLCBzZXR0aW5ncyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoY29tbWFuZCkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmRvdFN0cmluZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZ3JhcGhcIn0ucm93LmZpZWxkey5AbmFtZT09PVwiZG90XCJ9LiQnLCBkYXRhKVswXSB8fCAnJztcblxuXHRcdFx0dGhpcy5yZXBsYWNlSFRNTChzZWxlY3RvciwgdGhpcy5mcmFnbWVudEdyYXBoQ3RybCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0dGhpcy5kaXNwbGF5KCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGFdKTtcblxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cblxuXHRcdH0pLmZhaWwoKGRhdGEpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGFdKTtcblx0XHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblxuICAgIH0sXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBkaXNwbGF5OiBmdW5jdGlvbigpXG4gICAge1xuICAgIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Z3JhcGggOiB0eXBlb2YgVml6ICE9PSAndW5kZWZpbmVkJyA/IFZpeih0aGlzLmRvdFN0cmluZywgJ3N2ZycpIDogJycsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHUkFQSCBQT1NUIFRSRUFUTUVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZGljdC5ncmFwaCA9IGRpY3QuZ3JhcGgucmVwbGFjZSgveGxpbms6aHJlZj1cIihbXlwiXSopXCIvZywgKHgsIGpzb24pID0+IHtcblxuXHRcdFx0Y29uc3QganNvbmJPYmogPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5odG1sVG9UZXh0KGpzb24pKTtcblxuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdCdkYXRhLWN0cmw9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybCddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLWN0cmwtbG9jYXRpb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybC1sb2NhdGlvbiddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1wYXJhbXMnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoSlNPTi5zdHJpbmdpZnkoanNvbmJPYmpbJ2RhdGEtc2V0dGluZ3MnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1pY29uJ10pICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtdGl0bGU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUnXSkgKyAnXCInLFxuXHRcdFx0XHQnZGF0YS10aXRsZS1pY29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLXRpdGxlLWljb24nXSkgKyAnXCInLFxuXHRcdFx0XTtcblxuXHRcdFx0cmV0dXJuICd4bGluazpocmVmPVwiI1wiICcgKyBhdHRycy5qb2luKCcgJyk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGljdC5ncmFwaCwgJ2ltYWdlL3N2Zyt4bWwnKTtcblxuXHRcdGNvbnN0IHN2ZyA9ICQoZG9jLmRvY3VtZW50RWxlbWVudCk7XG5cblx0XHRzdmcuZmluZCgnYVtkYXRhLXRpdGxlLWljb25dJykuZWFjaCgoaSwgZWwpID0+IHtcblxuXHRcdFx0JCgnPHRzcGFuIGZvbnQtZmFtaWx5PVwiRm9udEF3ZXNvbWVcIj4nICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgJChlbCkuYXR0cignZGF0YS10aXRsZS1pY29uJykpICsgJzwvdHNwYW4+PHRzcGFuPiA8L3RzcGFuPicpLnByZXBlbmRUbygkKGVsKS5maW5kKCd0ZXh0JykpO1xuXHRcdH0pO1xuXG5cdFx0ZGljdC5ncmFwaCA9IGRvYy5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJlcGxhY2VIVE1MKHRoaXMucGF0Y2hJZCgnI0EwRjY3NjNGX0RFMjlfNTE4NV8zNUMxX0RDQUE4MUU4QzQ4NycpLCB0aGlzLmZyYWdtZW50R3JhcGgsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQThFN0M4OERfN0I3OF9CMjIxXzBCQ0JfNkVGMUY5Q0MzQzE1JykpLmNoYW5nZSgoZSkgPT4ge1xuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHR0aGlzLnN3aXRjaE9yaWVudGF0aW9uKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBMEY2NzYzRl9ERTI5XzUxODVfMzVDMV9EQ0FBODFFOEM0ODcnKSArICcgYVtkYXRhLWN0cmxdJykuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0dGhpcy5jcmVhdGVDb250cm9sRnJvbVdlYkxpbmsodGhpcy5nZXRQYXJlbnQoKSwgZS5jdXJyZW50VGFyZ2V0LCB0aGlzLmN0eCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKHRoaXMsIFtyZXN1bHRdKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuICAgIH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzd2l0Y2hPcmllbnRhdGlvbjogZnVuY3Rpb24oKVxuICAgIHtcbiAgICAgXHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAgXHRjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJyguKlxccypyYW5rZGlyXFxzKj1cXHMqXCIpKFtMXVtSXXxbVF1bQl0pKFwiXFxzKi4qKScpO1xuXG4gICAgIFx0Y29uc3Qgb3JpZW50YXRpb24gPSB0aGlzLmRvdFN0cmluZy5tYXRjaChyZWdleClbMl07XG5cbiAgICAgXHRjb25zb2xlLmRlYnVnKG9yaWVudGF0aW9uKTtcblxuICAgICBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICBcdGlmKG9yaWVudGF0aW9uID09PSAnTFInIClcbiAgICAgXHR7XG4gICAgIFx0XHR0aGlzLmRvdFN0cmluZyA9IHRoaXMuZG90U3RyaW5nLnJlcGxhY2UocmVnZXgsICckMVRCJDMnKTtcbiAgICAgXHR9XG4gICAgIFx0ZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gJ1RCJyApXG4gICAgIFx0e1xuXHRcdFx0dGhpcy5kb3RTdHJpbmcgPSB0aGlzLmRvdFN0cmluZy5yZXBsYWNlKHJlZ2V4LCAnJDFMUiQzJyk7XG4gICAgIFx0fVxuXG5cdFx0dGhpcy5kaXNwbGF5KCkuZG9uZSgoKSA9PiB7XG5cdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgodGhpcywgW3Jlc3VsdF0pO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdC5wcm9taXNlKCk7XG4gICAgfVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyJdfQ==
