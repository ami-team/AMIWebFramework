/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global jscolor
 *
 */$AMIClass("SchemaViewerApp",{$extends:ami.SubApp,onReady:function onReady(userdata){var _this=this;$("#ami_breadcrumb_content").css("display","none");var result=$.Deferred();amiWebApp.loadResources(["js/3rd-party/jscolor.min.js","subapps/SchemaViewer/twig/SchemaViewerApp.twig","subapps/SchemaViewer/css/SchemaViewerApp.css","ctrl:schema"]).done(function(data){amiWebApp.replaceHTML("#ami_main_content",data[1],{dict:{command:userdata}}).done(function(){_this.colorPicker=new jscolor("F542C5DA_46FD_6A57_76CB_9A6A949E7F39",{hash:true});var dropZone=document.getElementById("EFAEDA1C_C8B2_46EA_AC47_A591A0704FE3");dropZone.addEventListener("dragover",_this.handleDragOver,false);dropZone.addEventListener("drop",_this.handleDrop,false);$("#C6DDFAF6_9E75_41C5_87BD_0896B5299559").outerHeight($(document).height()-$("#C6DDFAF6_9E75_41C5_87BD_0896B5299559").offset().top-8);_this.schema=new data[3];_this.schema.render("#C6DDFAF6_9E75_41C5_87BD_0896B5299559",{onFocus:function onFocus(cell){if(cell){_this.colorPicker.fromString(cell.getColor())}},onBlur:function onBlur(){_this.colorPicker.fromString("#0066CC")}}).done(function(){$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC").change(function(){_this.defaultCatalog=$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC option:selected").val()});_this.defaultCatalog=userdata;result.resolve()})})}).fail(function(message){result.reject(message)});return result},onLogin:function onLogin(){var _this2=this;var result=$.Deferred();amiCommand.execute("ListCatalogs").done(function(data){var L=["<option value=\"\" style=\"display: none;\">Choose a catalog</option>"];$.each(amiWebApp.jspath("..field{.@name===\"externalCatalog\"}.$",data),function(index,value){if(value===_this2.defaultCatalog){L.push("<option value=\""+amiWebApp.textToHtml(value)+"\" selected=\"selected\">"+amiWebApp.textToHtml(value)+"</option>")}else{L.push("<option value=\""+amiWebApp.textToHtml(value)+"\" xxxxxxxx=\"xxxxxxxx\">"+amiWebApp.textToHtml(value)+"</option>")}});_this2.openSchema().done(function(){var disable=amiLogin.hasRole("AMI_ADMIN")===false;$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC").html(L.join(""));$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC").prop("disabled",false);$("#A9A20536_D366_4AFE_96E3_56E3FAF52179").prop("disabled",false);$("#D342245F_B95E_4CAB_84C5_53B509C28319").prop("disabled",disable);if(disable){$("#D316F050_F66C_8D02_33A0_CFF920BEF817").hide();$("#A20151B8_B578_A3F1_AF65_FB5AE59287E6").hide()}else{$("#D316F050_F66C_8D02_33A0_CFF920BEF817").show();$("#A20151B8_B578_A3F1_AF65_FB5AE59287E6").show()}$("#F542C5DA_46FD_6A57_76CB_9A6A949E7F39").prop("disabled",disable);$("#A8A2E848_F02A_40C7_8327_53F73B1B2BD6").prop("disabled",false);$("#DA57C571_E294_4D75_B36F_FF6BB066D504").prop("disabled",false);result.resolve()}).fail(function(message){result.reject(message)})}).fail(function(data,message){result.reject(message)});return result},onLogout:function onLogout(){this.schema.clear();$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC").empty();$("#D015B3C1_B150_4E27_99D9_A628B3F9B0AC").prop("disabled",true);$("#A9A20536_D366_4AFE_96E3_56E3FAF52179").prop("disabled",true);$("#D342245F_B95E_4CAB_84C5_53B509C28319").prop("disabled",true);$("#D316F050_F66C_8D02_33A0_CFF920BEF817").hide();$("#A20151B8_B578_A3F1_AF65_FB5AE59287E6").hide();$("#F542C5DA_46FD_6A57_76CB_9A6A949E7F39").prop("disabled",true);$("#A8A2E848_F02A_40C7_8327_53F73B1B2BD6").prop("disabled",true);$("#DA57C571_E294_4D75_B36F_FF6BB066D504").prop("disabled",true)},handleDragOver:function handleDragOver(e){e.stopPropagation();e.preventDefault();e.dataTransfer.dropEffect="copy"},handleDrop:function handleDrop(e){e.stopPropagation();e.preventDefault();var files=e.dataTransfer.files;for(var i=0,file;file=files[i];i++){var reader=new FileReader;reader.onload=function(e){try{var json=JSON.parse(e.target.result);schemaViewerApp.schema.setJSON(json)}catch(message){amiWebApp.error(message,true)}};reader.readAsText(file)}},openSchema:function openSchema(){var _this3=this;amiWebApp.lock();return this.schema.refresh(this.defaultCatalog,{showShowTool:true,showEditTool:amiLogin.hasRole("AMI_ADMIN")}).done(function(){window.history.pushState("","",amiWebApp.webAppURL+"?subapp=schemaViewer"+(_this3.defaultCatalog?"&userdata="+encodeURIComponent(_this3.defaultCatalog):""));amiWebApp.unlock()}).fail(function(message){amiWebApp.error(message,true)})},saveSchema:function saveSchema(){if(!this.defaultCatalog){return}amiWebApp.lock();var custom={};$.each(this.schema.graph.getCells(),function(index,value){if(value.get("type")==="sql.Entity"){var position=value.getPosition();var color=value.getColor();custom[value.get("entity")]={x:position.x,y:position.y,color:color}}});if(jQuery.isEmptyObject(custom)===false){var text=JSON.stringify(custom);amiCommand.execute("SetJSONSchema -catalog=\""+amiWebApp.textToString(this.defaultCatalog)+"\" -json=\""+amiWebApp.textToString(text)+"\"").done(function(data,message){amiWebApp.success(message,true)}).fail(function(data,message){amiWebApp.error(message,true)})}},flushServerCachesFast:function flushServerCachesFast(){if(!confirm("Please confirm...")){return}amiWebApp.lock();amiCommand.execute("FlushServerCaches").done(function(data,message){amiWebApp.success(message,true)}).fail(function(data,message){amiWebApp.error(message,true)})},flushServerCachesSlow:function flushServerCachesSlow(){if(!confirm("Please confirm...")){return}amiWebApp.lock();amiCommand.execute("FlushServerCaches -full").done(function(data,message){amiWebApp.success(message,true)}).fail(function(data,message){amiWebApp.error(message,true)})},setBoxColor:function setBoxColor(color){var currentCell=this.schema.getCurrentCell();if(currentCell){currentCell.setColor(color)}},exportSchema:function exportSchema(){this.schema.exportSchema()},printSchema:function printSchema(){this.schema.printSchema()}});var schemaViewerApp=new SchemaViewerApp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjaGVtYVZpZXdlckFwcC5lczYuanMiXSwibmFtZXMiOlsiJEFNSUNsYXNzIiwiJGV4dGVuZHMiLCJhbWkiLCJTdWJBcHAiLCJvblJlYWR5IiwidXNlcmRhdGEiLCIkIiwiY3NzIiwicmVzdWx0IiwiRGVmZXJyZWQiLCJhbWlXZWJBcHAiLCJsb2FkUmVzb3VyY2VzIiwiZG9uZSIsImRhdGEiLCJyZXBsYWNlSFRNTCIsImRpY3QiLCJjb21tYW5kIiwiY29sb3JQaWNrZXIiLCJqc2NvbG9yIiwiaGFzaCIsImRyb3Bab25lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVEcmFnT3ZlciIsImhhbmRsZURyb3AiLCJvdXRlckhlaWdodCIsImhlaWdodCIsIm9mZnNldCIsInRvcCIsInNjaGVtYSIsInJlbmRlciIsIm9uRm9jdXMiLCJjZWxsIiwiZnJvbVN0cmluZyIsImdldENvbG9yIiwib25CbHVyIiwiY2hhbmdlIiwiZGVmYXVsdENhdGFsb2ciLCJ2YWwiLCJyZXNvbHZlIiwiZmFpbCIsIm1lc3NhZ2UiLCJyZWplY3QiLCJvbkxvZ2luIiwiYW1pQ29tbWFuZCIsImV4ZWN1dGUiLCJMIiwiZWFjaCIsImpzcGF0aCIsImluZGV4IiwidmFsdWUiLCJwdXNoIiwidGV4dFRvSHRtbCIsIm9wZW5TY2hlbWEiLCJkaXNhYmxlIiwiYW1pTG9naW4iLCJoYXNSb2xlIiwiaHRtbCIsImpvaW4iLCJwcm9wIiwiaGlkZSIsInNob3ciLCJvbkxvZ291dCIsImNsZWFyIiwiZW1wdHkiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJkYXRhVHJhbnNmZXIiLCJkcm9wRWZmZWN0IiwiZmlsZXMiLCJpIiwiZmlsZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwidGFyZ2V0Iiwic2NoZW1hVmlld2VyQXBwIiwic2V0SlNPTiIsImVycm9yIiwicmVhZEFzVGV4dCIsImxvY2siLCJyZWZyZXNoIiwic2hvd1Nob3dUb29sIiwic2hvd0VkaXRUb29sIiwid2luZG93IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsIndlYkFwcFVSTCIsImVuY29kZVVSSUNvbXBvbmVudCIsInVubG9jayIsInNhdmVTY2hlbWEiLCJjdXN0b20iLCJncmFwaCIsImdldENlbGxzIiwiZ2V0IiwicG9zaXRpb24iLCJnZXRQb3NpdGlvbiIsImNvbG9yIiwieCIsInkiLCJqUXVlcnkiLCJpc0VtcHR5T2JqZWN0IiwidGV4dCIsInN0cmluZ2lmeSIsInRleHRUb1N0cmluZyIsInN1Y2Nlc3MiLCJmbHVzaFNlcnZlckNhY2hlc0Zhc3QiLCJjb25maXJtIiwiZmx1c2hTZXJ2ZXJDYWNoZXNTbG93Iiwic2V0Qm94Q29sb3IiLCJjdXJyZW50Q2VsbCIsImdldEN1cnJlbnRDZWxsIiwic2V0Q29sb3IiLCJleHBvcnRTY2hlbWEiLCJwcmludFNjaGVtYSIsIlNjaGVtYVZpZXdlckFwcCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBZUFBLFNBQVMsQ0FBQyxpQkFBRCxDQUFvQixDQUc1QkMsUUFBUSxDQUFFQyxHQUFHLENBQUNDLE1BSGMsQ0FPNUJDLE9BQU8sQ0FBRSxpQkFBU0MsUUFBVCxDQUNULGdCQUdDQyxDQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QkMsR0FBN0IsQ0FBaUMsU0FBakMsQ0FBNEMsTUFBNUMsRUFJQSxHQUFNQyxDQUFBQSxNQUFNLENBQUdGLENBQUMsQ0FBQ0csUUFBRixFQUFmLENBRUFDLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUN2Qiw2QkFEdUIsQ0FFdkIsZ0RBRnVCLENBR3ZCLDhDQUh1QixDQUt2QixhQUx1QixDQUF4QixFQU1HQyxJQU5ILENBTVEsU0FBQ0MsSUFBRCxDQUFVLENBRWpCSCxTQUFTLENBQUNJLFdBQVYsQ0FBc0IsbUJBQXRCLENBQTJDRCxJQUFJLENBQUMsQ0FBRCxDQUEvQyxDQUFvRCxDQUFDRSxJQUFJLENBQUUsQ0FBQ0MsT0FBTyxDQUFF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LENBQ0MsTUFDQSxDQUlEdEcsU0FBUyxDQUFDMkUsSUFBVixHQUlBeEMsVUFBVSxDQUFDQyxPQUFYLENBQW1CLHlCQUFuQixFQUE4Q2xDLElBQTlDLENBQW1ELFNBQUNDLElBQUQsQ0FBTzZCLE9BQVAsQ0FBbUIsQ0FFckVoQyxTQUFTLENBQUNvRyxPQUFWLENBQWtCcEUsT0FBbEIsQ0FBMkIsSUFBM0IsQ0FFQSxDQUpELEVBSUdELElBSkgsQ0FJUSxTQUFDNUIsSUFBRCxDQUFPNkIsT0FBUCxDQUFtQixDQUUxQmhDLFNBQVMsQ0FBQ3lFLEtBQVYsQ0FBZ0J6QyxPQUFoQixDQUF5QixJQUF6QixDQUNBLENBUEQsQ0FVQSxDQWxXMkIsQ0FzVzVCd0UsV0FBVyxDQUFFLHFCQUFTWixLQUFULENBQ2IsQ0FDQyxHQUFNYSxDQUFBQSxXQUFXLENBQUcsS0FBS3JGLE1BQUwsQ0FBWXNGLGNBQVosRUFBcEIsQ0FFQSxHQUFHRCxXQUFILENBQ0EsQ0FDQ0EsV0FBVyxDQUFDRSxRQUFaLENBQXFCZixLQUFyQixDQUNBLENBQ0QsQ0E5VzJCLENBa1g1QmdCLFlBQVksQ0FBRSx1QkFDZCxDQUNDLEtBQUt4RixNQUFMLENBQVl3RixZQUFaLEVBQ0EsQ0FyWDJCLENBeVg1QkMsV0FBVyxDQUFFLHNCQUNiLENBQ0MsS0FBS3pGLE1BQUwsQ0FBWXlGLFdBQVosRUFDQSxDQTVYMkIsQ0FBcEIsQ0FBVCxDQXFZQSxHQUFNdEMsQ0FBQUEsZUFBZSxDQUFHLEdBQUl1QyxDQUFBQSxlQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFdlYiBGcmFtZXdvcmtcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtWFhYWCBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIGpzY29sb3JcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnU2NoZW1hVmlld2VyQXBwJywge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRleHRlbmRzOiBhbWkuU3ViQXBwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25SZWFkeTogZnVuY3Rpb24odXNlcmRhdGEpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjYW1pX2JyZWFkY3J1bWJfY29udGVudCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRhbWlXZWJBcHAubG9hZFJlc291cmNlcyhbXG5cdFx0XHQnanMvM3JkLXBhcnR5L2pzY29sb3IubWluLmpzJyxcblx0XHRcdCdzdWJhcHBzL1NjaGVtYVZpZXdlci90d2lnL1NjaGVtYVZpZXdlckFwcC50d2lnJyxcblx0XHRcdCdzdWJhcHBzL1NjaGVtYVZpZXdlci9jc3MvU2NoZW1hVmlld2VyQXBwLmNzcycsXG5cdFx0XHQvKiovXG5cdFx0XHQnY3RybDpzY2hlbWEnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjYW1pX21haW5fY29udGVudCcsIGRhdGFbMV0sIHtkaWN0OiB7Y29tbWFuZDogdXNlcmRhdGF9fSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQ09MT1IgUElDS0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHR0aGlzLmNvbG9yUGlja2VyID0gbmV3IGpzY29sb3IoJ0Y1NDJDNURBXzQ2RkRfNkE1N183NkNCXzlBNkE5NDlFN0YzOScsIHtoYXNoOiB0cnVlfSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogRFJPUCBaT05FICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBkcm9wWm9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdFRkFFREExQ19DOEIyXzQ2RUFfQUM0N19BNTkxQTA3MDRGRTMnKTtcblxuXHRcdFx0XHRkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcblx0XHRcdFx0ZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcgICAgLCB0aGlzLmhhbmRsZURyb3AgICAgLCBmYWxzZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogRURJVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjQzZEREZBRjZfOUU3NV80MUM1Xzg3QkRfMDg5NkI1Mjk5NTU5Jykub3V0ZXJIZWlnaHQoXG5cdFx0XHRcdFx0JChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKCcjQzZEREZBRjZfOUU3NV80MUM1Xzg3QkRfMDg5NkI1Mjk5NTU5Jykub2Zmc2V0KCkudG9wIC0gOFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5zY2hlbWEgPSBuZXcgZGF0YVszXSgpO1xuXG5cdFx0XHRcdHRoaXMuc2NoZW1hLnJlbmRlcignI0M2RERGQUY2XzlFNzVfNDFDNV84N0JEXzA4OTZCNTI5OTU1OScsIHtcblx0XHRcdFx0XHRvbkZvY3VzOiAoY2VsbCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRpZihjZWxsKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuY29sb3JQaWNrZXIuZnJvbVN0cmluZyhjZWxsLmdldENvbG9yKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b25CbHVyOiAoKSA9PiB7XG5cdFx0XHRcdFx0XHQvKiovXG5cdFx0XHRcdFx0XHRcdHRoaXMuY29sb3JQaWNrZXIuZnJvbVN0cmluZygoKCgnIzAwNjZDQycpKSkpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHQkKCcjRDAxNUIzQzFfQjE1MF80RTI3Xzk5RDlfQTYyOEIzRjlCMEFDJykuY2hhbmdlKCgpID0+IHtcblxuXHRcdFx0XHRcdFx0dGhpcy5kZWZhdWx0Q2F0YWxvZyA9ICQoJyNEMDE1QjNDMV9CMTUwXzRFMjdfOTlEOV9BNjI4QjNGOUIwQUMgb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLmRlZmF1bHRDYXRhbG9nID0gLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovIHVzZXJkYXRhIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qLztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdMaXN0Q2F0YWxvZ3MnKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IEwgPSBbJzxvcHRpb24gdmFsdWU9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+Q2hvb3NlIGEgY2F0YWxvZzwvb3B0aW9uPiddO1xuXG5cdFx0XHQkLmVhY2goYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImV4dGVybmFsQ2F0YWxvZ1wifS4kJywgZGF0YSksIChpbmRleCwgdmFsdWUpID0+IHtcblxuXHRcdFx0XHRpZih2YWx1ZSA9PT0gdGhpcy5kZWZhdWx0Q2F0YWxvZykge1xuXHRcdFx0XHRcdEwucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh2YWx1ZSkgKyAnXCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPicgKyBhbWlXZWJBcHAudGV4dFRvSHRtbCh2YWx1ZSkgKyAnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0TC5wdXNoKCc8b3B0aW9uIHZhbHVlPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHZhbHVlKSArICdcIiB4eHh4eHh4eD1cInh4eHh4eHh4XCI+JyArIGFtaVdlYkFwcC50ZXh0VG9IdG1sKHZhbHVlKSArICc8L29wdGlvbj4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5vcGVuU2NoZW1hKCkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgZGlzYWJsZSA9IGFtaUxvZ2luLmhhc1JvbGUoJ0FNSV9BRE1JTicpID09PSBmYWxzZTtcblxuXHRcdFx0XHQkKCcjRDAxNUIzQzFfQjE1MF80RTI3Xzk5RDlfQTYyOEIzRjlCMEFDJykuaHRtbChMLmpvaW4oJycpKTtcblxuXHRcdFx0XHQkKCcjRDAxNUIzQzFfQjE1MF80RTI3Xzk5RDlfQTYyOEIzRjlCMEFDJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdFx0JCgnI0E5QTIwNTM2X0QzNjZfNEFGRV85NkUzXzU2RTNGQUY1MjE3OScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdFx0XHQkKCcjRDM0MjI0NUZfQjk1RV80Q0FCXzg0QzVfNTNCNTA5QzI4MzE5JykucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcblxuXHRcdFx0XHRpZihkaXNhYmxlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0JCgnI0QzMTZGMDUwX0Y2NkNfOEQwMl8zM0EwX0NGRjkyMEJFRjgxNycpLmhpZGUoKTtcblx0XHRcdFx0XHQkKCcjQTIwMTUxQjhfQjU3OF9BM0YxX0FGNjVfRkI1QUU1OTI4N0U2JykuaGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCQoJyNEMzE2RjA1MF9GNjZDXzhEMDJfMzNBMF9DRkY5MjBCRUY4MTcnKS5zaG93KCk7XG5cdFx0XHRcdFx0JCgnI0EyMDE1MUI4X0I1NzhfQTNGMV9BRjY1X0ZCNUFFNTkyODdFNicpLnNob3coKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQoJyNGNTQyQzVEQV80NkZEXzZBNTdfNzZDQl85QTZBOTQ5RTdGMzknKS5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xuXG5cdFx0XHRcdCQoJyNBOEEyRTg0OF9GMDJBXzQwQzdfODMyN181M0Y3M0IxQjJCRDYnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdFx0JCgnI0RBNTdDNTcxX0UyOTRfNEQ3NV9CMzZGX0ZGNkJCMDY2RDUwNCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdH0pLmZhaWwoKG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuc2NoZW1hLmNsZWFyKCk7XG5cblx0XHQkKCcjRDAxNUIzQzFfQjE1MF80RTI3Xzk5RDlfQTYyOEIzRjlCMEFDJykuZW1wdHkoKTtcblxuXHRcdCQoJyNEMDE1QjNDMV9CMTUwXzRFMjdfOTlEOV9BNjI4QjNGOUIwQUMnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG5cdFx0JCgnI0E5QTIwNTM2X0QzNjZfNEFGRV85NkUzXzU2RTNGQUY1MjE3OScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0JCgnI0QzNDIyNDVGX0I5NUVfNENBQl84NEM1XzUzQjUwOUMyODMxOScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0XHQkKCcjRDMxNkYwNTBfRjY2Q184RDAyXzMzQTBfQ0ZGOTIwQkVGODE3JykuaGlkZSgpO1xuXHRcdCQoJyNBMjAxNTFCOF9CNTc4X0EzRjFfQUY2NV9GQjVBRTU5Mjg3RTYnKS5oaWRlKCk7XG5cblx0XHQkKCcjRjU0MkM1REFfNDZGRF82QTU3Xzc2Q0JfOUE2QTk0OUU3RjM5JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuXHRcdCQoJyNBOEEyRTg0OF9GMDJBXzQwQzdfODMyN181M0Y3M0IxQjJCRDYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdCQoJyNEQTU3QzU3MV9FMjk0XzRENzVfQjM2Rl9GRjZCQjA2NkQ1MDQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0aGFuZGxlRHJhZ092ZXI6IGZ1bmN0aW9uKGUpXG5cdHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRoYW5kbGVEcm9wOiBmdW5jdGlvbihlKVxuXHR7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCBmaWxlcyA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXG5cdFx0Zm9yKGxldCBpID0gMCwgZmlsZTsgKGZpbGUgPSBmaWxlc1tpXSk7IGkrKylcblx0XHR7XG5cdFx0XHRjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSlcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBqc29uID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuXG5cdFx0XHRcdFx0c2NoZW1hVmlld2VyQXBwLnNjaGVtYS5zZXRKU09OKGpzb24pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKG1lc3NhZ2UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9wZW5TY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zY2hlbWEucmVmcmVzaCh0aGlzLmRlZmF1bHRDYXRhbG9nLCB7c2hvd1Nob3dUb29sOiB0cnVlLCBzaG93RWRpdFRvb2w6IGFtaUxvZ2luLmhhc1JvbGUoJ0FNSV9BRE1JTicpfSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIGFtaVdlYkFwcC53ZWJBcHBVUkwgKyAnP3N1YmFwcD1zY2hlbWFWaWV3ZXInICsgKHRoaXMuZGVmYXVsdENhdGFsb2cgPyAnJnVzZXJkYXRhPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5kZWZhdWx0Q2F0YWxvZykgOiAnJykpO1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNhdmVTY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCF0aGlzLmRlZmF1bHRDYXRhbG9nKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgY3VzdG9tID0ge307XG5cblx0XHQkLmVhY2godGhpcy5zY2hlbWEuZ3JhcGguZ2V0Q2VsbHMoKSwgKGluZGV4LCB2YWx1ZSkgPT4ge1xuXG5cdFx0XHRpZih2YWx1ZS5nZXQoJ3R5cGUnKSA9PT0gJ3NxbC5FbnRpdHknKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBwb3NpdGlvbiA9IHZhbHVlLmdldFBvc2l0aW9uKCk7XG5cdFx0XHRcdGNvbnN0IGNvbG9yICAgID0gdmFsdWUuZ2V0Q29sb3IoKSAgIDtcblxuXHRcdFx0XHRjdXN0b21bdmFsdWUuZ2V0KCdlbnRpdHknKV0gPSB7XG5cdFx0XHRcdFx0eDogcG9zaXRpb24ueCxcblx0XHRcdFx0XHR5OiBwb3NpdGlvbi55LFxuXHRcdFx0XHRcdGNvbG9yOiBjb2xvcixcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGpRdWVyeS5pc0VtcHR5T2JqZWN0KGN1c3RvbSkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCB0ZXh0ID0gSlNPTi5zdHJpbmdpZnkoY3VzdG9tKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnU2V0SlNPTlNjaGVtYSAtY2F0YWxvZz1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMuZGVmYXVsdENhdGFsb2cpICsgJ1wiIC1qc29uPVwiJyArIGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcodGV4dCkgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Zmx1c2hTZXJ2ZXJDYWNoZXNGYXN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGFtaUNvbW1hbmQuZXhlY3V0ZSgnRmx1c2hTZXJ2ZXJDYWNoZXMnKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmbHVzaFNlcnZlckNhY2hlc1Nsb3c6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRhbWlXZWJBcHAubG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdGbHVzaFNlcnZlckNhY2hlcyAtZnVsbCcpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldEJveENvbG9yOiBmdW5jdGlvbihjb2xvcilcblx0e1xuXHRcdGNvbnN0IGN1cnJlbnRDZWxsID0gdGhpcy5zY2hlbWEuZ2V0Q3VycmVudENlbGwoKTtcblxuXHRcdGlmKGN1cnJlbnRDZWxsKVxuXHRcdHtcblx0XHRcdGN1cnJlbnRDZWxsLnNldENvbG9yKGNvbG9yKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRleHBvcnRTY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuc2NoZW1hLmV4cG9ydFNjaGVtYSgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHJpbnRTY2hlbWE6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHRoaXMuc2NoZW1hLnByaW50U2NoZW1hKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IHNjaGVtYVZpZXdlckFwcCA9IG5ldyBTY2hlbWFWaWV3ZXJBcHAoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovIl19
