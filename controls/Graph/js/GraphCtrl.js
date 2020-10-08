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
 */$AMIClass("GraphCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources([amiWebApp.originURL+"/controls/Graph/twig/GraphCtrl.twig",amiWebApp.originURL+"/controls/Graph/twig/graph.twig",amiWebApp.originURL+"/js/3rd-party/viz.min.js",amiWebApp.originURL+"/css/ami.min.css",amiWebApp.originURL+"/css/font-awesome.min.css"],{context:this}).done(function(data){_this.fragmentGraphCtrl=data[0];_this.fragmentGraph=data[1]})},render:function render(selector,command,settings){var _this2=this;var result=$.Deferred();var _amiWebApp$setup=amiWebApp.setup(["context"],[result],settings),context=_amiWebApp$setup[0];amiCommand.execute(command).done(function(data){_this2.dotString=amiWebApp.jspath("..rowset{.@type===\"graph\"}.row.field{.@name===\"dot\"}.$",data)[0]||"";_this2.replaceHTML(selector,_this2.fragmentGraphCtrl).done(function(){$(_this2.patchId("#A8E7C88D_7B78_B221_0BCB_6EF1F9CC3C15")).change(function(e){e.preventDefault();_this2.switchOrientation()});$(_this2.patchId("#E90168C4_E4BD_ACC8_085F_9953D6CF789F")).click(function(e){e.preventDefault();_this2.exportGraph()});_this2.display().done(function(){result.resolveWith(context,[data])})})}).fail(function(data){result.rejectWith(context,[data])});return result.promise()},display:function display(){var _this3=this;var result=$.Deferred();var dict={graph:typeof Viz!=="undefined"?Viz(this.dotString,"svg"):""};dict.graph=dict.graph.replace(/xlink:href="([^"]*)"/g,function(x,json){var jsonbObj=JSON.parse(amiWebApp.htmlToText(json));var attrs=["data-ctrl=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl"])+"\"","data-ctrl-location=\""+amiWebApp.textToHtml(jsonbObj["data-ctrl-location"])+"\"","data-params=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-params"]))+"\"","data-settings=\""+amiWebApp.textToHtml(JSON.stringify(jsonbObj["data-settings"]))+"\"","data-icon=\""+amiWebApp.textToHtml(jsonbObj["data-icon"])+"\"","data-title=\""+amiWebApp.textToHtml(jsonbObj["data-title"])+"\"","data-title-icon=\""+amiWebApp.textToHtml(jsonbObj["data-title-icon"])+"\""];return"xlink:href=\"#\" "+attrs.join(" ")});var doc=new DOMParser().parseFromString(dict.graph,"image/svg+xml");var svg=$(doc.documentElement);svg.find("a[data-title-icon]").each(function(i,el){$("<tspan font-family=\"FontAwesome\">"+String.fromCharCode("0x"+$(el).attr("data-title-icon"))+"</tspan><tspan> </tspan>").prependTo($(el).find("text"))});dict.graph=doc.documentElement.outerHTML;this.replaceHTML(this.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487"),this.fragmentGraph,{dict:dict}).done(function(){$(_this3.patchId("#A0F6763F_DE29_5185_35C1_DCAA81E8C487")+" a[data-ctrl]").click(function(e){e.preventDefault();_this3.createControlFromWebLink(_this3.getParent(),e.currentTarget,_this3.ctx)});result.resolveWith(_this3,[result])});return result.promise()},switchOrientation:function switchOrientation(){var _this4=this;var result=$.Deferred();var regex=new RegExp("(.*s*rankdirs*=s*\")([L][R]|[T][B])(\"s*.*)");var orientation=this.dotString.match(regex)[2];if(orientation==="LR"){this.dotString=this.dotString.replace(regex,"$1TB$3")}else if(orientation==="TB"){this.dotString=this.dotString.replace(regex,"$1LR$3")}this.display().done(function(){result.resolveWith(_this4,[result])});return result.promise()},exportGraph:function exportGraph(){console.log("exportGraph");var image=Viz(this.dotString,{format:"png-image-element"});var blob=new Blob([image],{type:"image/png",endings:"native"});saveAs(blob,"graph.png")}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdyYXBoQ3RybC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJDb250cm9sIiwiJGluaXQiLCJwYXJlbnQiLCJvd25lciIsIiRzdXBlciIsIm9uUmVhZHkiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwib3JpZ2luVVJMIiwiY29udGV4dCIsImRvbmUiLCJkYXRhIiwiZnJhZ21lbnRHcmFwaEN0cmwiLCJmcmFnbWVudEdyYXBoIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJzZXR1cCIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwiZG90U3RyaW5nIiwianNwYXRoIiwicmVwbGFjZUhUTUwiLCJwYXRjaElkIiwiY2hhbmdlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3dpdGNoT3JpZW50YXRpb24iLCJjbGljayIsImV4cG9ydEdyYXBoIiwiZGlzcGxheSIsInJlc29sdmVXaXRoIiwiZmFpbCIsInJlamVjdFdpdGgiLCJwcm9taXNlIiwiZGljdCIsImdyYXBoIiwiVml6IiwicmVwbGFjZSIsIngiLCJqc29uIiwianNvbmJPYmoiLCJKU09OIiwicGFyc2UiLCJodG1sVG9UZXh0IiwiYXR0cnMiLCJ0ZXh0VG9IdG1sIiwic3RyaW5naWZ5Iiwiam9pbiIsImRvYyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsInN2ZyIsImRvY3VtZW50RWxlbWVudCIsImZpbmQiLCJlYWNoIiwiaSIsImVsIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXR0ciIsInByZXBlbmRUbyIsIm91dGVySFRNTCIsImNyZWF0ZUNvbnRyb2xGcm9tV2ViTGluayIsImdldFBhcmVudCIsImN1cnJlbnRUYXJnZXQiLCJjdHgiLCJyZWdleCIsIlJlZ0V4cCIsIm9yaWVudGF0aW9uIiwibWF0Y2giLCJjb25zb2xlIiwibG9nIiwiaW1hZ2UiLCJmb3JtYXQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJlbmRpbmdzIiwic2F2ZUFzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBZ0JBQSxTQUFTLENBQUMsV0FBRCxDQUFjLENBR3RCQyxRQUFRLENBQUVDLEdBQUcsQ0FBQ0MsT0FIUSxDQU90QkMsS0FBSyxDQUFFLGVBQVNDLE1BQVQsQ0FBaUJDLEtBQWpCLENBQ1AsQ0FDQyxLQUFLQyxNQUFMLENBQVlILEtBQVosQ0FBa0JDLE1BQWxCLENBQTBCQyxLQUExQixDQUNBLENBVnFCLENBY3RCRSxPQUFPLENBQUUsa0JBQ1QsZ0JBQ0MsTUFBT0MsQ0FBQUEsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQzlCRCxTQUFTLENBQUNFLFNBQVYsQ0FBc0IscUNBRFEsQ0FFOUJGLFNBQVMsQ0FBQ0UsU0FBVixDQUFzQixpQ0FGUSxDQUc5QkYsU0FBUyxDQUFDRSxTQUFWLENBQXNCLDBCQUhRLENBSTlCRixTQUFTLENBQUNFLFNBQVYsQ0FBc0Isa0JBSlEsQ0FLOUJGLFNBQVMsQ0FBQ0UsU0FBVixDQUFzQiwyQkFMUSxDQUF4QixDQU1KLENBQUNDLE9BQU8sQ0FBRSxJQUFWLENBTkksRUFNYUMsSUFOYixDQU1rQixTQUFDQyxJQUFELENBQVUsQ0FFbEMsS0FBSSxDQUFDQyxpQkFBTCxDQUF5QkQsSUFBSSxDQUFDLENBQUQsQ0FBN0IsQ0FDQSxLQUFJLENBQUNFLGFBQUwsQ0FBcUJGLElBQUksQ0FBQyxDQUFELENBQ3pCLENBVk0sQ0FXUCxDQTNCcUIsQ0E2R25CRyxNQUFNLENBQUUsZ0JBQVNDLFFBQVQsQ0FBbUJDLE9BQW5CLENBQTRCQyxRQUE1QixDQUNSLGlCQUNGLEdBQU1DLENBQUFBLE1BQU0sQ0FBR0MsQ0FBQyxDQUFDQyxRQUFGLEVBQWYsQ0FERSxxQkFLZ0JkLFNBQVMsQ0FBQ2UsS0FBVixDQUFnQixDQUFDLFNBQUQsQ0FBaEIsQ0FBNkIsQ0FBQ0gsTUFBRCxDQUE3QixDQUF1Q0QsUUFBdkMsQ0FMaEIsQ0FLS1IsT0FMTCxxQkFTRmEsVUFBVSxDQUFDQyxPQUFYLENBQW1CUCxPQUFuQixFQUE0Qk4sSUFBNUIsQ0FBaUMsU0FBQ0MsSUFBRCxDQUFVLENBRTFDLE1BQUksQ0FBQ2EsU0FBTCxDQUFpQmxCLFNBQVMsQ0FBQ21CLE1BQVYsQ0FBaUIsNERBQWpCLENBQTJFZCxJQUEzRSxFQUFpRixDQUFqRixHQUF1RixFQUF4RyxDQUVBLE1BQUksQ0FBQ2UsV0FBTCxDQUFpQlgsUUFBakIsQ0FBMkIsTUFBSSxDQUFDSCxpQkFBaEMsRUFBbURGLElBQW5ELENBQXdELFVBQU0sQ0FJN0RTLENBQUMsQ0FBQyxNQUFJLENBQUNRLE9BQUwsQ0FBYSx1Q0FBYixDQUFELENBQUQsQ0FBeURDLE1BQXpELENBQWdFLFNBQUNDLENBQUQsQ0FBTyxDQUV0RUEsQ0FBQyxDQUFDQyxjQUFGLEdBRUEsTUFBSSxDQUFDQyxpQkFBTCxFQUNBLENBTEQsRUFTQVosQ0FBQyxDQUFDLE1BQUksQ0FBQ1EsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBRCxDQUF5REssS0FBekQsQ0FBK0QsU0FBQ0gsQ0FBRCxDQUFPLENBRXJFQSxDQUFDLENBQUNDLGNBQUYsR0FFQSxNQUFJLENBQUNHLFdBQUwsRUFDQSxDQUxELEVBU0EsTUFBSSxDQUFDQyxPQUFMLEdBQWV4QixJQUFmLENBQW9CLFVBQU0sQ0FFekJRLE1BQU0sQ0FBQ2lCLFdBQVAsQ0FBbUIxQixPQUFuQixDQUE0QixDQUFDRSxJQUFELENBQTVCLENBRUEsQ0FKRCxDQU9BLENBN0JELENBK0JBLENBbkNELEVBbUNHeUIsSUFuQ0gsQ0FtQ1EsU0FBQ3pCLElBQUQsQ0FBVSxDQUVqQk8sTUFBTSxDQUFDbUIsVUFBUCxDQUFrQjVCLE9BQWxCLENBQTJCLENBQUNFLElBQUQsQ0FBM0IsQ0FDQSxDQXRDRCxFQTBDQSxNQUFPTyxDQUFBQSxNQUFNLENBQUNvQixPQUFQLEVBRUosQ0FuS2tCLENBc0tuQkosT0FBTyxDQUFFLGtCQUNULGlCQUdJLEdBQU1oQixDQUFBQSxNQUFNLENBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFmLENBSU4sR0FBTW1CLENBQUFBLElBQUksQ0FBRyxDQUNaQyxLQUFLLENBQUcsTUFBT0MsQ0FBQUEsR0FBUCxHQUFlLFdBQWYsQ0FBNkJBLEdBQUcsQ0FBQyxLQUFLakIsU0FBTixDQUFpQixLQUFqQixDQUFoQyxDQUEwRCxFQUR0RCxDQUFiLENBUUFlLElBQUksQ0FBQ0MsS0FBTCxDQUFhRCxJQUFJLENBQUNDLEtBQUwsQ0FBV0UsT0FBWCxDQUFtQix1QkFBbkIsQ0FBNEMsU0FBQ0MsQ0FBRCxDQUFJQyxJQUFKLENBQWEsQ0FFckUsR0FBTUMsQ0FBQUEsUUFBUSxDQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV3pDLFNBQVMsQ0FBQzBDLFVBQVYsQ0FBcUJKLElBQXJCLENBQVgsQ0FBakIsQ0FFQSxHQUFNSyxDQUFBQSxLQUFLLENBQUcsQ0FDYixlQUFnQjNDLFNBQVMsQ0FBQzRDLFVBQVYsQ0FBcUJMLFFBQVEsQ0FBQyxXQUFELENBQTdCLENBQWhCLENBQThELElBRGpELENBRWIsd0JBQXlCdkMsU0FBUyxDQUFDNEMsVUFBVixDQUFxQkwsUUFBUSxDQUFDLG9CQUFELENBQTdCLENBQXpCLENBQWdGLElBRm5FLENBR2IsaUJBQWtCdkMsU0FBUyxDQUFDNEMsVUFBVixDQUFxQkosSUFBSSxDQUFDSyxTQUFMLENBQWVOLFFBQVEsQ0FBQyxhQUFELENBQXZCLENBQXJCLENBQWxCLENBQWtGLElBSHJFLENBSWIsbUJBQW9CdkMsU0FBUyxDQUFDNEMsVUFBVixDQUFxQkosSUFBSSxDQUFDSyxTQUFMLENBQWVOLFFBQVEsQ0FBQyxlQUFELENBQXZCLENBQXJCLENBQXBCLENBQXNGLElBSnpFLENBS2IsZUFBZ0J2QyxTQUFTLENBQUM0QyxVQUFWLENBQXFCTCxRQUFRLENBQUMsV0FBRCxDQUE3QixDQUFoQixDQUE4RCxJQUxqRCxDQU1iLGdCQUFpQnZDLFNBQVMsQ0FBQzRDLFVBQVYsQ0FBcUJMLFFBQVEsQ0FBQyxZQUFELENBQTdCLENBQWpCLENBQWdFLElBTm5ELENBT2IscUJBQXNCdkMsU0FBUyxDQUFDNEMsVUFBVixDQUFxQkwsUUFBUSxDQUFDLGlCQUFELENBQTdCLENBQXRCLENBQTBFLElBUDdELENBQWQsQ0FVQSxNQUFPLG9CQUFvQkksS0FBSyxDQUFDRyxJQUFOLENBQVcsR0FBWCxDQUMzQixDQWZZLENBQWIsQ0FtQkEsR0FBTUMsQ0FBQUEsR0FBRyxDQUFHLEdBQUlDLENBQUFBLFNBQUosR0FBZ0JDLGVBQWhCLENBQWdDaEIsSUFBSSxDQUFDQyxLQUFyQyxDQUE0QyxlQUE1QyxDQUFaLENBRUEsR0FBTWdCLENBQUFBLEdBQUcsQ0FBR3JDLENBQUMsQ0FBQ2tDLEdBQUcsQ0FBQ0ksZUFBTCxDQUFiLENBRUFELEdBQUcsQ0FBQ0UsSUFBSixDQUFTLG9CQUFULEVBQStCQyxJQUEvQixDQUFvQyxTQUFDQyxDQUFELENBQUlDLEVBQUosQ0FBVyxDQUU5QzFDLENBQUMsQ0FBQyxzQ0FBc0MyQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0IsS0FBTzVDLENBQUMsQ0FBQzBDLEVBQUQsQ0FBRCxDQUFNRyxJQUFOLENBQVcsaUJBQVgsQ0FBM0IsQ0FBdEMsQ0FBa0csMEJBQW5HLENBQUQsQ0FBZ0lDLFNBQWhJLENBQTBJOUMsQ0FBQyxDQUFDMEMsRUFBRCxDQUFELENBQU1ILElBQU4sQ0FBVyxNQUFYLENBQTFJLENBQ0EsQ0FIRCxFQUtBbkIsSUFBSSxDQUFDQyxLQUFMLENBQWFhLEdBQUcsQ0FBQ0ksZUFBSixDQUFvQlMsU0FBakMsQ0FJQSxLQUFLeEMsV0FBTCxDQUFpQixLQUFLQyxPQUFMLENBQWEsdUNBQWIsQ0FBakIsQ0FBd0UsS0FBS2QsYUFBN0UsQ0FBNEYsQ0FBQzBCLElBQUksQ0FBRUEsSUFBUCxDQUE1RixFQUEwRzdCLElBQTFHLENBQStHLFVBQU0sQ0FFcEhTLENBQUMsQ0FBQyxNQUFJLENBQUNRLE9BQUwsQ0FBYSx1Q0FBYixFQUF3RCxlQUF6RCxDQUFELENBQTJFSyxLQUEzRSxDQUFpRixTQUFDSCxDQUFELENBQU8sQ0FFdkZBLENBQUMsQ0FBQ0MsY0FBRixHQUVBLE1BQUksQ0FBQ3FDLHdCQUFMLENBQThCLE1BQUksQ0FBQ0MsU0FBTCxFQUE5QixDQUFnRHZDLENBQUMsQ0FBQ3dDLGFBQWxELENBQWlFLE1BQUksQ0FBQ0MsR0FBdEUsQ0FDQSxDQUxELEVBT0FwRCxNQUFNLENBQUNpQixXQUFQLENBQW1CLE1BQW5CLENBQXlCLENBQUNqQixNQUFELENBQXpCLENBQ0EsQ0FWRCxFQVlBLE1BQU9BLENBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsRUFDSixDQW5Pa0IsQ0F1T3RCUCxpQkFBaUIsQ0FBRSw0QkFDaEIsaUJBQ0UsR0FBTWIsQ0FBQUEsTUFBTSxDQUFHQyxDQUFDLENBQUNDLFFBQUYsRUFBZixDQUVBLEdBQU1tRCxDQUFBQSxLQUFLLENBQUcsR0FBSUMsQ0FBQUEsTUFBSixDQUFXLDZDQUFYLENBQWQsQ0FFQSxHQUFNQyxDQUFBQSxXQUFXLENBQUcsS0FBS2pELFNBQUwsQ0FBZWtELEtBQWYsQ0FBcUJILEtBQXJCLEVBQTRCLENBQTVCLENBQXBCLENBSUEsR0FBR0UsV0FBVyxHQUFLLElBQW5CLENBQ0EsQ0FDQyxLQUFLakQsU0FBTCxDQUFpQixLQUFLQSxTQUFMLENBQWVrQixPQUFmLENBQXVCNkIsS0FBdkIsQ0FBOEIsUUFBOUIsQ0FDakIsQ0FIRCxJQUlLLElBQUdFLFdBQVcsR0FBSyxJQUFuQixDQUNMLENBQ0gsS0FBS2pELFNBQUwsQ0FBaUIsS0FBS0EsU0FBTCxDQUFla0IsT0FBZixDQUF1QjZCLEtBQXZCLENBQThCLFFBQTlCLENBQ2IsQ0FFTCxLQUFLckMsT0FBTCxHQUFleEIsSUFBZixDQUFvQixVQUFNLENBQ3pCUSxNQUFNLENBQUNpQixXQUFQLENBQW1CLE1BQW5CLENBQXlCLENBQUNqQixNQUFELENBQXpCLENBQ0EsQ0FGRCxFQUlBLE1BQU9BLENBQUFBLE1BQU0sQ0FBQ29CLE9BQVAsRUFDSixDQS9Qa0IsQ0FtUXRCTCxXQUFXLENBQUUsc0JBQ2IsQ0FDQzBDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFFQSxHQUFNQyxDQUFBQSxLQUFLLENBQUdwQyxHQUFHLENBQUMsS0FBS2pCLFNBQU4sQ0FBaUIsQ0FBRXNELE1BQU0sQ0FBRSxtQkFBVixDQUFqQixDQUFqQixDQUVBLEdBQU1DLENBQUFBLElBQUksQ0FBRyxHQUFJQyxDQUFBQSxJQUFKLENBQVMsQ0FBQ0gsS0FBRCxDQUFULENBQWtCLENBQzlCSSxJQUFJLENBQUUsV0FEd0IsQ0FFOUJDLE9BQU8sQ0FBRyxRQUZvQixDQUFsQixDQUFiLENBS0FDLE1BQU0sQ0FBQ0osSUFBRCxDQUFPLFdBQVAsQ0FDTixDQS9RcUIsQ0FBZCxDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgV2ViIEZyYW1ld29ya1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC1YWFhYIFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqXG4gKiBAZ2xvYmFsIFZpeiwgc2F2ZUFzXG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4kQU1JQ2xhc3MoJ0dyYXBoQ3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2NvbnRyb2xzL0dyYXBoL3R3aWcvR3JhcGhDdHJsLnR3aWcnLFxuXHRcdFx0YW1pV2ViQXBwLm9yaWdpblVSTCArICcvY29udHJvbHMvR3JhcGgvdHdpZy9ncmFwaC50d2lnJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2pzLzNyZC1wYXJ0eS92aXoubWluLmpzJyxcblx0XHRcdGFtaVdlYkFwcC5vcmlnaW5VUkwgKyAnL2Nzcy9hbWkubWluLmNzcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxuXHRcdF0sIHtjb250ZXh0OiB0aGlzfSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50R3JhcGhDdHJsID0gZGF0YVswXTtcblx0XHRcdHRoaXMuZnJhZ21lbnRHcmFwaCA9IGRhdGFbMV07XG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy9cdHJlbmRlcl9vbGQ6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb21tYW5kLCBzZXR0aW5ncylcbi8vXHR7XG4vL1x0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG4vL1xuLy9cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLy9cbi8vXHRcdGNvbnN0IFtjb250ZXh0XSA9IGFtaVdlYkFwcC5zZXR1cChbJ2NvbnRleHQnXSwgW3Jlc3VsdF0sIHNldHRpbmdzKTtcbi8vXG4vL1x0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vL1xuLy9cdFx0YW1pQ29tbWFuZC5leGVjdXRlKGNvbW1hbmQpLmRvbmUoKGRhdGEpID0+IHtcbi8vXG4vL1x0XHRcdGNvbnN0IGRvdFN0cmluZyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiZ3JhcGhcIn0ucm93LmZpZWxkey5AbmFtZT09PVwiZG90XCJ9LiQnLCBkYXRhKVswXSB8fCAnJztcbi8vXG4vL1x0XHRcdGNvbnN0IGRpY3QgPSB7XG4vL1x0XHRcdFx0Z3JhcGggOiB0eXBlb2YgVml6ICE9PSAndW5kZWZpbmVkJyA/IFZpeihkb3RTdHJpbmcsICdzdmcnKSA6ICcnLFxuLy9cdFx0XHR9O1xuLy9cbi8vXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vL1x0XHRcdC8qIEdSQVBIIFBPU1QgVFJFQVRNRU5UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLy9cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXG4vL1x0XHRcdGRpY3QuZ3JhcGggPSBkaWN0LmdyYXBoLnJlcGxhY2UoL3hsaW5rOmhyZWY9XCIoW15cIl0qKVwiL2csICh4LCBqc29uKSA9PiB7XG4vL1xuLy9cdFx0XHRcdGNvbnN0IGpzb25iT2JqID0gSlNPTi5wYXJzZShhbWlXZWJBcHAuaHRtbFRvVGV4dChqc29uKSk7XG4vL1xuLy9cdFx0XHRcdGNvbnN0IGF0dHJzID0gW1xuLy9cdFx0XHRcdFx0J2RhdGEtY3RybD1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1jdHJsJ10pICsgJ1wiJyxcbi8vXHRcdFx0XHRcdCdkYXRhLWN0cmwtbG9jYXRpb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybC1sb2NhdGlvbiddKSArICdcIicsXG4vL1x0XHRcdFx0XHQnZGF0YS1wYXJhbXM9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoSlNPTi5zdHJpbmdpZnkoanNvbmJPYmpbJ2RhdGEtcGFyYW1zJ10pKSArICdcIicsXG4vL1x0XHRcdFx0XHQnZGF0YS1zZXR0aW5ncz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1zZXR0aW5ncyddKSkgKyAnXCInLFxuLy9cdFx0XHRcdFx0J2RhdGEtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1pY29uJ10pICsgJ1wiJyxcbi8vXHRcdFx0XHRcdCdkYXRhLXRpdGxlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLXRpdGxlJ10pICsgJ1wiJyxcbi8vXHRcdFx0XHRcdCdkYXRhLXRpdGxlLWljb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUtaWNvbiddKSArICdcIicsXG4vL1x0XHRcdFx0XTtcbi8vXG4vL1x0XHRcdFx0cmV0dXJuICd4bGluazpocmVmPVwiI1wiICcgKyBhdHRycy5qb2luKCcgJyk7XG4vL1x0XHRcdH0pO1xuLy9cbi8vXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vL1xuLy9cdFx0XHRjb25zdCBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpY3QuZ3JhcGgsICdpbWFnZS9zdmcreG1sJyk7XG4vL1xuLy9cdFx0XHRjb25zdCBzdmcgPSAkKGRvYy5kb2N1bWVudEVsZW1lbnQpO1xuLy9cbi8vXHRcdFx0c3ZnLmZpbmQoJ2FbZGF0YS10aXRsZS1pY29uXScpLmVhY2goKGksIGVsKSA9PiB7XG4vL1xuLy9cdFx0XHRcdCQoJzx0c3BhbiBmb250LWZhbWlseT1cIkZvbnRBd2Vzb21lXCI+JyArIFN0cmluZy5mcm9tQ2hhckNvZGUoJzB4JyArICQoZWwpLmF0dHIoJ2RhdGEtdGl0bGUtaWNvbicpKSArICc8L3RzcGFuPjx0c3Bhbj4gPC90c3Bhbj4nKS5wcmVwZW5kVG8oJChlbCkuZmluZCgndGV4dCcpKTtcbi8vXHRcdFx0fSk7XG4vL1xuLy9cdFx0XHRkaWN0LmdyYXBoID0gZG9jLmRvY3VtZW50RWxlbWVudC5vdXRlckhUTUw7XG4vL1xuLy9cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXG4vL1x0XHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRHcmFwaEN0cmwsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG4vL1xuLy9cdFx0XHRcdCQoc2VsZWN0b3IgKyAnIGFbZGF0YS1jdHJsXScpLmNsaWNrKChlKSA9PiB7XG4vL1xuLy9cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy9cbi8vXHRcdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHRoaXMuZ2V0UGFyZW50KCksIGUuY3VycmVudFRhcmdldCwgdGhpcy5jdHgpO1xuLy9cdFx0XHRcdH0pO1xuLy9cbi8vXHRcdFx0XHRyZXN1bHQucmVzb2x2ZVdpdGgoY29udGV4dCwgW2RhdGFdKTtcbi8vXHRcdFx0fSk7XG4vL1xuLy9cdFx0fSkuZmFpbCgoZGF0YSkgPT4ge1xuLy9cbi8vXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGFdKTtcbi8vXHRcdH0pO1xuLy9cbi8vXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8vXG4vL1x0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcbi8vXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKHNlbGVjdG9yLCBjb21tYW5kLCBzZXR0aW5ncylcbiAgICB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW2NvbnRleHRdID0gYW1pV2ViQXBwLnNldHVwKFsnY29udGV4dCddLCBbcmVzdWx0XSwgc2V0dGluZ3MpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKGNvbW1hbmQpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0dGhpcy5kb3RTdHJpbmcgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImdyYXBoXCJ9LnJvdy5maWVsZHsuQG5hbWU9PT1cImRvdFwifS4kJywgZGF0YSlbMF0gfHwgJyc7XG5cblx0XHRcdHRoaXMucmVwbGFjZUhUTUwoc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRHcmFwaEN0cmwpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBOEU3Qzg4RF83Qjc4X0IyMjFfMEJDQl82RUYxRjlDQzNDMTUnKSkuY2hhbmdlKChlKSA9PiB7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHR0aGlzLnN3aXRjaE9yaWVudGF0aW9uKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFOTAxNjhDNF9FNEJEX0FDQzhfMDg1Rl85OTUzRDZDRjc4OUYnKSkuY2xpY2soKGUpID0+IHtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdHRoaXMuZXhwb3J0R3JhcGgoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmRpc3BsYXkoKS5kb25lKCgpID0+IHtcblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbZGF0YV0pO1xuXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9KTtcblxuXHRcdH0pLmZhaWwoKGRhdGEpID0+IHtcblxuXHRcdFx0cmVzdWx0LnJlamVjdFdpdGgoY29udGV4dCwgW2RhdGFdKTtcblx0XHR9KTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcblxuICAgIH0sXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBkaXNwbGF5OiBmdW5jdGlvbigpXG4gICAge1xuICAgIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBkaWN0ID0ge1xuXHRcdFx0Z3JhcGggOiB0eXBlb2YgVml6ICE9PSAndW5kZWZpbmVkJyA/IFZpeih0aGlzLmRvdFN0cmluZywgJ3N2ZycpIDogJycsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHUkFQSCBQT1NUIFRSRUFUTUVOVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZGljdC5ncmFwaCA9IGRpY3QuZ3JhcGgucmVwbGFjZSgveGxpbms6aHJlZj1cIihbXlwiXSopXCIvZywgKHgsIGpzb24pID0+IHtcblxuXHRcdFx0Y29uc3QganNvbmJPYmogPSBKU09OLnBhcnNlKGFtaVdlYkFwcC5odG1sVG9UZXh0KGpzb24pKTtcblxuXHRcdFx0Y29uc3QgYXR0cnMgPSBbXG5cdFx0XHRcdCdkYXRhLWN0cmw9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybCddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLWN0cmwtbG9jYXRpb249XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtY3RybC1sb2NhdGlvbiddKSArICdcIicsXG5cdFx0XHRcdCdkYXRhLXBhcmFtcz1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChKU09OLnN0cmluZ2lmeShqc29uYk9ialsnZGF0YS1wYXJhbXMnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtc2V0dGluZ3M9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoSlNPTi5zdHJpbmdpZnkoanNvbmJPYmpbJ2RhdGEtc2V0dGluZ3MnXSkpICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtaWNvbj1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbChqc29uYk9ialsnZGF0YS1pY29uJ10pICsgJ1wiJyxcblx0XHRcdFx0J2RhdGEtdGl0bGU9XCInICsgYW1pV2ViQXBwLnRleHRUb0h0bWwoanNvbmJPYmpbJ2RhdGEtdGl0bGUnXSkgKyAnXCInLFxuXHRcdFx0XHQnZGF0YS10aXRsZS1pY29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKGpzb25iT2JqWydkYXRhLXRpdGxlLWljb24nXSkgKyAnXCInLFxuXHRcdFx0XTtcblxuXHRcdFx0cmV0dXJuICd4bGluazpocmVmPVwiI1wiICcgKyBhdHRycy5qb2luKCcgJyk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGljdC5ncmFwaCwgJ2ltYWdlL3N2Zyt4bWwnKTtcblxuXHRcdGNvbnN0IHN2ZyA9ICQoZG9jLmRvY3VtZW50RWxlbWVudCk7XG5cblx0XHRzdmcuZmluZCgnYVtkYXRhLXRpdGxlLWljb25dJykuZWFjaCgoaSwgZWwpID0+IHtcblxuXHRcdFx0JCgnPHRzcGFuIGZvbnQtZmFtaWx5PVwiRm9udEF3ZXNvbWVcIj4nICsgU3RyaW5nLmZyb21DaGFyQ29kZSgnMHgnICsgJChlbCkuYXR0cignZGF0YS10aXRsZS1pY29uJykpICsgJzwvdHNwYW4+PHRzcGFuPiA8L3RzcGFuPicpLnByZXBlbmRUbygkKGVsKS5maW5kKCd0ZXh0JykpO1xuXHRcdH0pO1xuXG5cdFx0ZGljdC5ncmFwaCA9IGRvYy5kb2N1bWVudEVsZW1lbnQub3V0ZXJIVE1MO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJlcGxhY2VIVE1MKHRoaXMucGF0Y2hJZCgnI0EwRjY3NjNGX0RFMjlfNTE4NV8zNUMxX0RDQUE4MUU4QzQ4NycpLCB0aGlzLmZyYWdtZW50R3JhcGgsIHtkaWN0OiBkaWN0fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdCQodGhpcy5wYXRjaElkKCcjQTBGNjc2M0ZfREUyOV81MTg1XzM1QzFfRENBQTgxRThDNDg3JykgKyAnIGFbZGF0YS1jdHJsXScpLmNsaWNrKChlKSA9PiB7XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdHRoaXMuY3JlYXRlQ29udHJvbEZyb21XZWJMaW5rKHRoaXMuZ2V0UGFyZW50KCksIGUuY3VycmVudFRhcmdldCwgdGhpcy5jdHgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0XSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcbiAgICB9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c3dpdGNoT3JpZW50YXRpb246IGZ1bmN0aW9uKClcbiAgICB7XG4gICAgIFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgIFx0Y29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCcoLipcXHMqcmFua2Rpclxccyo9XFxzKlwiKShbTF1bUl18W1RdW0JdKShcIlxccyouKiknKTtcblxuICAgICBcdGNvbnN0IG9yaWVudGF0aW9uID0gdGhpcy5kb3RTdHJpbmcubWF0Y2gocmVnZXgpWzJdO1xuXG4gICAgIFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgIFx0aWYob3JpZW50YXRpb24gPT09ICdMUicgKVxuICAgICBcdHtcbiAgICAgXHRcdHRoaXMuZG90U3RyaW5nID0gdGhpcy5kb3RTdHJpbmcucmVwbGFjZShyZWdleCwgJyQxVEIkMycpO1xuICAgICBcdH1cbiAgICAgXHRlbHNlIGlmKG9yaWVudGF0aW9uID09PSAnVEInIClcbiAgICAgXHR7XG5cdFx0XHR0aGlzLmRvdFN0cmluZyA9IHRoaXMuZG90U3RyaW5nLnJlcGxhY2UocmVnZXgsICckMUxSJDMnKTtcbiAgICAgXHR9XG5cblx0XHR0aGlzLmRpc3BsYXkoKS5kb25lKCgpID0+IHtcblx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aCh0aGlzLCBbcmVzdWx0XSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0LnByb21pc2UoKTtcbiAgICB9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXhwb3J0R3JhcGg6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnNvbGUubG9nKCdleHBvcnRHcmFwaCcpO1xuXG5cdFx0Y29uc3QgaW1hZ2UgPSBWaXoodGhpcy5kb3RTdHJpbmcsIHsgZm9ybWF0OiAncG5nLWltYWdlLWVsZW1lbnQnIH0pO1xuXG5cdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtpbWFnZV0sIHtcblx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxuXHRcdFx0ZW5kaW5ncyA6ICduYXRpdmUnLFxuXHRcdH0pO1xuXG5cdFx0c2F2ZUFzKGJsb2IsICdncmFwaC5wbmcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLyJdfQ==
