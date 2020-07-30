/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global JSROOT
 *
 */$AMIClass("RootCtrl",{$extends:ami.Control,$init:function $init(parent,owner){this.$super.$init(parent,owner)},onReady:function onReady(){var _this=this;return amiWebApp.loadResources(["https://root.cern/js/latest/scripts/JSRootCore.min.js",amiWebApp.originURL+"/controls/Root/twig/RootCtrl.twig",amiWebApp.originURL+"/controls/Root/twig/js.twig"]).done(function(data){_this.fragmentRootCtrl=data[1];_this.fragmentJS=data[2]})},render:function render(selector,commandOrJson,settings){var _this2=this;var result=$.Deferred();commandOrJson=commandOrJson.trim();var _amiWebApp$setup=amiWebApp.setup(["context","height","width"],[result,768,1024],settings),context=_amiWebApp$setup[0],height=_amiWebApp$setup[1],width=_amiWebApp$setup[2];if(commandOrJson.startsWith("{")){this._render(selector,commandOrJson,null,commandOrJson,height,width,settings).done(function(){result.resolveWith(context,[commandOrJson])})}else{amiWebApp.lock();amiCommand.execute(commandOrJson).done(function(data){var rows=amiWebApp.jspath("..rowset{.@type===\"hist\" }.row",data)||[];if(rows.length>0){var json=amiWebApp.jspath("..field{.@name===\"json\"}.$",rows)[0]||"{}";_this2._render(selector,commandOrJson,commandOrJson,json,height,width,settings).done(function(data){result.resolveWith(context,[data]);amiWebApp.unlock()})}else{result.resolveWith(context,["not a ROOT histogram"]);amiWebApp.unlock()}}).fail(function(data,message){result.resolveWith(context,[message]);amiWebApp.unlock()})}return result.promise()},_render:function _render(selector,commandOrJson,command,json,height,width,tools,settings){var _this3=this;var JSON=JSROOT.parse(json);this.ctx={endpoint:amiCommand.endpoint,commandOrJson:commandOrJson,command:command,json:json,height:height,width:width,xAxis:"fXaxis"in JSON,yAxis:"fYaxis"in JSON,zAxis:"fZaxis"in JSON};return this.replaceHTML(this._selector=selector,this.fragmentRootCtrl,{dict:this.ctx}).done(function(){var js=amiWebApp.formatTWIG(_this3.fragmentJS,_this3.ctx);JSROOT.draw(_this3.patchId("#E65240C8_73B7_B44C_52BB_388FFEEE01BD"),JSON,"hist");if(command){$(_this3.patchId("#D5A34EA0_1E22_5DEE_473C_2AFA1D9EB28B")).click(function(){var xMin=$(_this3.patchId("#FAEC8E36_E668_9EBB_A36D_243C3F4C28BA")).val();var xMax=$(_this3.patchId("#BF663B5D_240E_A97D_9963_03F94166AB22")).val();var yMin=$(_this3.patchId("#E8924675_0D6A_99CE_363C_4BF4475B30FF")).val();var yMax=$(_this3.patchId("#CD6401B9_5882_F498_0039_FFD4CDF22C65")).val();var zMin=$(_this3.patchId("#AA2E78B1_FC85_C2FA_A5ED_5E1FF3039775")).val();var zMax=$(_this3.patchId("#E56BD713_6FBB_F319_D823_04E17866C674")).val();var sizeOfBins=$(_this3.patchId("#C7CE39F6_B319_EDDD_CA19_E98DEF899372")).val();commandOrJson=commandOrJson.replace(/\s*-xMin\s*=\s*"[^"]*"/g,"").replace(/\s*-xMax\s*=\s*"[^"]*"/g,"").replace(/\s*-yMin\s*=\s*"[^"]*"/g,"").replace(/\s*-yMax\s*=\s*"[^"]*"/g,"").replace(/\s*-zMin\s*=\s*"[^"]*"/g,"").replace(/\s*-zMax\s*=\s*"[^"]*"/g,"").replace(/\s*-sizeOfBins\s*=\s*"[^"]*"/g,"");_this3.render(selector,commandOrJson+" -xMin=\""+xMin+"\" -xMax=\""+xMax+"\" -yMin=\""+yMin+"\" -yMax=\""+yMax+"\" -zMin=\""+zMin+"\" -zMax=\""+zMax+"\" -sizeOfBins=\""+sizeOfBins+"\"",settings)});$(_this3.patchId("#B22DE562_B7D4_00D9_605D_544911057E50")).click(function(){amiWebApp.createControl(_this3.getParent(),_this3,"messageBox",[command])});$(_this3.patchId("#BA26C452_5152_0114_7324_0F7F9EFA7E72")).click(function(){amiWebApp.createControl(_this3.getParent(),_this3,"textBox",[js,{mode:"javascript"}])});if("fXaxis"in JSON){$(_this3.patchId("#FAEC8E36_E668_9EBB_A36D_243C3F4C28BA")).val(JSON.fXaxis.fXmin);$(_this3.patchId("#BF663B5D_240E_A97D_9963_03F94166AB22")).val(JSON.fXaxis.fXmax);if("fYaxis"in JSON){$(_this3.patchId("#C7CE39F6_B319_EDDD_CA19_E98DEF899372")).val((JSON.fXaxis.fXmax-JSON.fXaxis.fXmin)/JSON.fNcells)}}if("fYaxis"in JSON){$(_this3.patchId("#E8924675_0D6A_99CE_363C_4BF4475B30FF")).val(JSON.fYaxis.fXmin);$(_this3.patchId("#CD6401B9_5882_F498_0039_FFD4CDF22C65")).val(JSON.fYaxis.fXmax);if("fZaxis"in JSON){$(_this3.patchId("#C7CE39F6_B319_EDDD_CA19_E98DEF899372")).val((JSON.fYaxis.fXmax-JSON.fYaxis.fXmin)/JSON.fNcells)}}if("fZaxis"in JSON){$(_this3.patchId("#AA2E78B1_FC85_C2FA_A5ED_5E1FF3039775")).val(JSON.fYaxis.fXmin);$(_this3.patchId("#E56BD713_6FBB_F319_D823_04E17866C674")).val(JSON.fYaxis.fXmax)}$(_this3.patchId("#A1908273_5C91_D702_DA03_41FC7EF2051A")).show()}else{$(_this3.patchId("#A1908273_5C91_D702_DA03_41FC7EF2051A")).hide()}})}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvb3RDdHJsLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIkNvbnRyb2wiLCIkaW5pdCIsInBhcmVudCIsIm93bmVyIiwiJHN1cGVyIiwib25SZWFkeSIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJvcmlnaW5VUkwiLCJkb25lIiwiZGF0YSIsImZyYWdtZW50Um9vdEN0cmwiLCJmcmFnbWVudEpTIiwicmVuZGVyIiwic2VsZWN0b3IiLCJjb21tYW5kT3JKc29uIiwic2V0dGluZ3MiLCJyZXN1bHQiLCIkIiwiRGVmZXJyZWQiLCJ0cmltIiwic2V0dXAiLCJjb250ZXh0IiwiaGVpZ2h0Iiwid2lkdGgiLCJzdGFydHNXaXRoIiwiX3JlbmRlciIsInJlc29sdmVXaXRoIiwibG9jayIsImFtaUNvbW1hbmQiLCJleGVjdXRlIiwicm93cyIsImpzcGF0aCIsImxlbmd0aCIsImpzb24iLCJ1bmxvY2siLCJmYWlsIiwibWVzc2FnZSIsInByb21pc2UiLCJjb21tYW5kIiwidG9vbHMiLCJKU09OIiwiSlNST09UIiwicGFyc2UiLCJjdHgiLCJlbmRwb2ludCIsInhBeGlzIiwieUF4aXMiLCJ6QXhpcyIsInJlcGxhY2VIVE1MIiwiX3NlbGVjdG9yIiwiZGljdCIsImpzIiwiZm9ybWF0VFdJRyIsImRyYXciLCJwYXRjaElkIiwiY2xpY2siLCJ4TWluIiwidmFsIiwieE1heCIsInlNaW4iLCJ5TWF4Iiwiek1pbiIsInpNYXgiLCJzaXplT2ZCaW5zIiwicmVwbGFjZSIsImNyZWF0ZUNvbnRyb2wiLCJnZXRQYXJlbnQiLCJtb2RlIiwiZlhheGlzIiwiZlhtaW4iLCJmWG1heCIsImZOY2VsbHMiLCJmWWF4aXMiLCJzaG93IiwiaGlkZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBZUFBLFNBQVMsQ0FBQyxVQUFELENBQWEsQ0FHckJDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxPQUhPLENBT3JCQyxLQUFLLENBQUUsZUFB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Q0FBQ3FDLE9BQUwsQ0FBYSx1Q0FBYixDQUFELENBQUQsQ0FBeURHLEdBQXpELENBQTZEakIsSUFBSSxDQUFDZ0MsTUFBTCxDQUFZRixLQUF6RSxDQUNBLENBSURyRCxDQUFDLENBQUMsTUFBSSxDQUFDcUMsT0FBTCxDQUFhLHVDQUFiLENBQUQsQ0FBRCxDQUF5RG1CLElBQXpELEVBQ0EsQ0F2RUQsSUF5RUEsQ0FDQ3hELENBQUMsQ0FBQyxNQUFJLENBQUNxQyxPQUFMLENBQWEsdUNBQWIsQ0FBRCxDQUFELENBQXlEb0IsSUFBekQsRUFDQSxDQUdELENBMUZNLENBMkZQLENBdk5vQixDQUFiLENBQVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIENOUlNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIEpTUk9PVFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdSb290Q3RybCcsIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkZXh0ZW5kczogYW1pLkNvbnRyb2wsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24ocGFyZW50LCBvd25lcilcblx0e1xuXHRcdHRoaXMuJHN1cGVyLiRpbml0KHBhcmVudCwgb3duZXIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdodHRwczovL3Jvb3QuY2Vybi9qcy9sYXRlc3Qvc2NyaXB0cy9KU1Jvb3RDb3JlLm1pbi5qcycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9Sb290L3R3aWcvUm9vdEN0cmwudHdpZycsXG5cdFx0XHRhbWlXZWJBcHAub3JpZ2luVVJMICsgJy9jb250cm9scy9Sb290L3R3aWcvanMudHdpZycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHR0aGlzLmZyYWdtZW50Um9vdEN0cmwgPSBkYXRhWzFdO1xuXHRcdFx0dGhpcy5mcmFnbWVudEpTID0gZGF0YVsyXTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmRPckpzb24sIHNldHRpbmdzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0Y29tbWFuZE9ySnNvbiA9IGNvbW1hbmRPckpzb24udHJpbSgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgW1xuXHRcdFx0Y29udGV4dCxcblx0XHRcdGhlaWdodCwgd2lkdGhcblx0XHRdID0gYW1pV2ViQXBwLnNldHVwKFxuXHRcdFx0W1xuXHRcdFx0XHQnY29udGV4dCcsXG5cdFx0XHRcdCdoZWlnaHQnLCAnd2lkdGgnLFxuXHRcdFx0XSxcblx0XHRcdFtcblx0XHRcdFx0cmVzdWx0LFxuXHRcdFx0XHQ3NjgsIDEwMjQsXG5cdFx0XHRdLFxuXHRcdFx0c2V0dGluZ3Ncblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoY29tbWFuZE9ySnNvbi5zdGFydHNXaXRoKCd7JykpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcmVuZGVyKHNlbGVjdG9yLCBjb21tYW5kT3JKc29uLCBudWxsLCBjb21tYW5kT3JKc29uLCBoZWlnaHQsIHdpZHRoLCBzZXR0aW5ncykuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFtjb21tYW5kT3JKc29uXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZShjb21tYW5kT3JKc29uKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdFx0Y29uc3Qgcm93cyA9IGFtaVdlYkFwcC5qc3BhdGgoJy4ucm93c2V0ey5AdHlwZT09PVwiaGlzdFwiIH0ucm93JywgZGF0YSkgfHwgW107XG5cblx0XHRcdFx0aWYocm93cy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QganNvbiA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJqc29uXCJ9LiQnLCByb3dzKVswXSB8fCAne30nO1xuXG5cdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHNlbGVjdG9yLCBjb21tYW5kT3JKc29uLCBjb21tYW5kT3JKc29uLCBqc29uLCBoZWlnaHQsIHdpZHRoLCBzZXR0aW5ncykgLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsvKi0tLS0qLyBkYXRhIC8qLS0tLSovIF0pO1xuXG5cdFx0XHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmVXaXRoKGNvbnRleHQsIFsnbm90IGEgUk9PVCBoaXN0b2dyYW0nXSk7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlV2l0aChjb250ZXh0LCBbLyotKi8gbWVzc2FnZSAvKi0qL10pO1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQucHJvbWlzZSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24oc2VsZWN0b3IsIGNvbW1hbmRPckpzb24sIGNvbW1hbmQsIGpzb24sIGhlaWdodCwgd2lkdGgsIHRvb2xzLCBzZXR0aW5ncylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IEpTT04gPSBKU1JPT1QucGFyc2UoanNvbik7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLmN0eCA9IHtcblx0XHRcdGVuZHBvaW50OiBhbWlDb21tYW5kLmVuZHBvaW50LFxuXHRcdFx0Y29tbWFuZE9ySnNvbjogY29tbWFuZE9ySnNvbixcblx0XHRcdGNvbW1hbmQ6IGNvbW1hbmQsXG5cdFx0XHRqc29uOiBqc29uLFxuXHRcdFx0aGVpZ2h0OiBoZWlnaHQsXG5cdFx0XHR3aWR0aDogd2lkdGgsXG5cdFx0XHR4QXhpczogJ2ZYYXhpcycgaW4gSlNPTixcblx0XHRcdHlBeGlzOiAnZllheGlzJyBpbiBKU09OLFxuXHRcdFx0ekF4aXM6ICdmWmF4aXMnIGluIEpTT04sXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnJlcGxhY2VIVE1MKHRoaXMuX3NlbGVjdG9yID0gc2VsZWN0b3IsIHRoaXMuZnJhZ21lbnRSb290Q3RybCwge2RpY3Q6IHRoaXMuY3R4fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBqcyA9IGFtaVdlYkFwcC5mb3JtYXRUV0lHKHRoaXMuZnJhZ21lbnRKUywgdGhpcy5jdHgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0SlNST09ULmRyYXcodGhpcy5wYXRjaElkKCcjRTY1MjQwQzhfNzNCN19CNDRDXzUyQkJfMzg4RkZFRUUwMUJEJyksIEpTT04sICdoaXN0Jyk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjb21tYW5kKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjRDVBMzRFQTBfMUUyMl81REVFXzQ3M0NfMkFGQTFEOUVCMjhCJykpLmNsaWNrKCgpID0+IHtcblxuXHRcdFx0XHRcdGNvbnN0IHhNaW4gPSAkKHRoaXMucGF0Y2hJZCgnI0ZBRUM4RTM2X0U2NjhfOUVCQl9BMzZEXzI0M0MzRjRDMjhCQScpKS52YWwoKTtcblx0XHRcdFx0XHRjb25zdCB4TWF4ID0gJCh0aGlzLnBhdGNoSWQoJyNCRjY2M0I1RF8yNDBFX0E5N0RfOTk2M18wM0Y5NDE2NkFCMjInKSkudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3QgeU1pbiA9ICQodGhpcy5wYXRjaElkKCcjRTg5MjQ2NzVfMEQ2QV85OUNFXzM2M0NfNEJGNDQ3NUIzMEZGJykpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHlNYXggPSAkKHRoaXMucGF0Y2hJZCgnI0NENjQwMUI5XzU4ODJfRjQ5OF8wMDM5X0ZGRDRDREYyMkM2NScpKS52YWwoKTtcblx0XHRcdFx0XHRjb25zdCB6TWluID0gJCh0aGlzLnBhdGNoSWQoJyNBQTJFNzhCMV9GQzg1X0MyRkFfQTVFRF81RTFGRjMwMzk3NzUnKSkudmFsKCk7XG5cdFx0XHRcdFx0Y29uc3Qgek1heCA9ICQodGhpcy5wYXRjaElkKCcjRTU2QkQ3MTNfNkZCQl9GMzE5X0Q4MjNfMDRFMTc4NjZDNjc0JykpLnZhbCgpO1xuXHRcdFx0XHRcdGNvbnN0IHNpemVPZkJpbnMgPSAkKHRoaXMucGF0Y2hJZCgnI0M3Q0UzOUY2X0IzMTlfRURERF9DQTE5X0U5OERFRjg5OTM3MicpKS52YWwoKTtcblxuXHRcdFx0XHRcdGNvbW1hbmRPckpzb24gPSBjb21tYW5kT3JKc29uLnJlcGxhY2UoL1xccyoteE1pblxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyoteE1heFxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyoteU1pblxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyoteU1heFxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyotek1pblxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyotek1heFxccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgLnJlcGxhY2UoL1xccyotc2l6ZU9mQmluc1xccyo9XFxzKlwiW15cIl0qXCIvZywgJycpXG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXIoc2VsZWN0b3IsIGNvbW1hbmRPckpzb24gKyAnIC14TWluPVwiJyArIHhNaW4gKyAnXCIgLXhNYXg9XCInICsgeE1heCArICdcIiAteU1pbj1cIicgKyB5TWluICsgJ1wiIC15TWF4PVwiJyArIHlNYXggKyAnXCIgLXpNaW49XCInICsgek1pbiArICdcIiAtek1heD1cIicgKyB6TWF4ICsgJ1wiIC1zaXplT2ZCaW5zPVwiJyArIHNpemVPZkJpbnMgKyAnXCInLCBzZXR0aW5ncyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNCMjJERTU2Ml9CN0Q0XzAwRDlfNjA1RF81NDQ5MTEwNTdFNTAnKSkuY2xpY2soKCkgPT4ge1xuXG5cdFx0XHRcdFx0YW1pV2ViQXBwLmNyZWF0ZUNvbnRyb2wodGhpcy5nZXRQYXJlbnQoKSwgdGhpcywgJ21lc3NhZ2VCb3gnLCBbY29tbWFuZF0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JBMjZDNDUyXzUxNTJfMDExNF83MzI0XzBGN0Y5RUZBN0U3MicpKS5jbGljaygoKSA9PiB7XG5cblx0XHRcdFx0XHRhbWlXZWJBcHAuY3JlYXRlQ29udHJvbCh0aGlzLmdldFBhcmVudCgpLCB0aGlzLCAndGV4dEJveCcsIFtqcywge21vZGU6ICdqYXZhc2NyaXB0J31dKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZignZlhheGlzJyBpbiBKU09OKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNGQUVDOEUzNl9FNjY4XzlFQkJfQTM2RF8yNDNDM0Y0QzI4QkEnKSkudmFsKEpTT04uZlhheGlzLmZYbWluKTtcblx0XHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0JGNjYzQjVEXzI0MEVfQTk3RF85OTYzXzAzRjk0MTY2QUIyMicpKS52YWwoSlNPTi5mWGF4aXMuZlhtYXgpO1xuXG5cdFx0XHRcdFx0aWYoJ2ZZYXhpcycgaW4gSlNPTilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0M3Q0UzOUY2X0IzMTlfRURERF9DQTE5X0U5OERFRjg5OTM3MicpKS52YWwoKEpTT04uZlhheGlzLmZYbWF4IC0gSlNPTi5mWGF4aXMuZlhtaW4pIC8gSlNPTi5mTmNlbGxzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZignZllheGlzJyBpbiBKU09OKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNFODkyNDY3NV8wRDZBXzk5Q0VfMzYzQ180QkY0NDc1QjMwRkYnKSkudmFsKEpTT04uZllheGlzLmZYbWluKTtcblx0XHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0NENjQwMUI5XzU4ODJfRjQ5OF8wMDM5X0ZGRDRDREYyMkM2NScpKS52YWwoSlNPTi5mWWF4aXMuZlhtYXgpO1xuXG5cdFx0XHRcdFx0aWYoJ2ZaYXhpcycgaW4gSlNPTilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0M3Q0UzOUY2X0IzMTlfRURERF9DQTE5X0U5OERFRjg5OTM3MicpKS52YWwoKEpTT04uZllheGlzLmZYbWF4IC0gSlNPTi5mWWF4aXMuZlhtaW4pIC8gSlNPTi5mTmNlbGxzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZignZlpheGlzJyBpbiBKU09OKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCh0aGlzLnBhdGNoSWQoJyNBQTJFNzhCMV9GQzg1X0MyRkFfQTVFRF81RTFGRjMwMzk3NzUnKSkudmFsKEpTT04uZllheGlzLmZYbWluKTtcblx0XHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0U1NkJENzEzXzZGQkJfRjMxOV9EODIzXzA0RTE3ODY2QzY3NCcpKS52YWwoSlNPTi5mWWF4aXMuZlhtYXgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKHRoaXMucGF0Y2hJZCgnI0ExOTA4MjczXzVDOTFfRDcwMl9EQTAzXzQxRkM3RUYyMDUxQScpKS5zaG93KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdCQodGhpcy5wYXRjaElkKCcjQTE5MDgyNzNfNUM5MV9ENzAyX0RBMDNfNDFGQzdFRjIwNTFBJykpLmhpZGUoKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
