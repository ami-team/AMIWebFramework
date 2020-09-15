/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */$AMIClass("AdminDashboardConfig",{_init:function _init(){var _this=this;var result=$.Deferred();amiWebApp.loadResources(["subapps/AdminDashboard/twig/config/config.twig","subapps/AdminDashboard/twig/config/extra_menu.twig","subapps/AdminDashboard/twig/config/parameter.twig"]).done(function(data){amiWebApp.replaceHTML("#CB6036B7_5971_41C2_1194_F5A051B21EA0",data[0]).done(function(){amiWebApp.replaceHTML("#C54485C3_44F8_CE8E_0F54_BF847CEECE11",data[1]).done(function(){_this.fragmentParameter=data[2];_this.paramDict={};_this.paramDel=[];result.resolve()})})}).fail(function(message){result.reject(message)});return result},onLogin:function onLogin(){if($.isEmptyObject(this.paramDict)){return this._load()}},_load:function _load(){var _this2=this;amiWebApp.lock();return amiCommand.execute("GetConfig").done(function(data){var path_fields=amiWebApp.jspath("..rowset{.@type===\"paths\"}.row.field",data);var config_fields=amiWebApp.jspath("..rowset{.@type===\"params\"}.row.field",data);$("#DF9704CF_51FF_F570_F587_27FB5625A936").text(amiWebApp.jspath(".{.@name===\"configFileName\"}.$[0]",path_fields));$("#B5C738DB_B705_5E37_24CD_B265532D0853").empty();_this2.paramDict={};_this2.paramDel=[];var dict=[];config_fields.forEach(function(config_field){var name=config_field["@name"]||"";var value=config_field["$"]||"";if(name==="task_server_name"||name==="task_server_pass"||name==="task_server_url"||name==="task_server_user"){return}_this2.paramDict[name]=value;var el=$("#D17C089F_FB5D_B2A5_7C9F_65AA0736084F [name = \""+name+"\"]");if(el.length===0){dict.push({NAME:name,VALUE:value})}else{el.val(value)}});amiWebApp.replaceHTML("#B5C738DB_B705_5E37_24CD_B265532D0853",_this2.fragmentParameter,{dict:dict}).done(function(){amiWebApp.unlock()})}).fail(function(data,message){amiWebApp.error(message,true)})},_save:function _save(){amiWebApp.lock();var name;var names=[];var value;var values=[];var params=$("#D17C089F_FB5D_B2A5_7C9F_65AA0736084F").serializeArray();for(var i in params){name=params[i].name;value=params[i].value;if(this.paramDict[name]!==value){if(name.indexOf("|")>=0){amiWebApp.error("character `|` not allow in parameter names ("+name+":"+value+")",true);return}if(value.indexOf("|")>=0){amiWebApp.error("character `|` not allow in parameter values ("+name+":"+value+")",true);return}this.paramDict[name]=value;names.push(amiWebApp.textToString(name));values.push(amiWebApp.textToString(value))}}for(var j in this.paramDel){name=this.paramDel[j];value="@NULL";names.push(amiWebApp.textToString(name));values.push(amiWebApp.textToString(value))}return amiCommand.execute("UpdateConfig -separator=\"|\" -names=\""+names.join("|")+"\" -values=\""+values.join("|")+"\"").done(function(data,message){amiWebApp.success(message,true)}).fail(function(data,message){amiWebApp.error(message,true)})},apply:function apply(){if(!confirm("Please confirm...")){return}this._save()},reset:function reset(){if(!confirm("Please confirm...")){return}this._load()},testEmail:function testEmail(email){amiWebApp.lock();amiCommand.execute("SendEmail -from=\""+amiWebApp.textToString(this.paramDict["admin_email"])+"\" -to=\""+amiWebApp.textToString(email)+"\" -subject=\"Test\" -message=\"This is a test.\"").done(function(data,message){amiWebApp.success(message,true)}).fail(function(data,message){amiWebApp.error(message,true)})},addParameter:function addParameter(){var name=prompt("Parameter name:")||"";name=name.trim();if(name){if($("#B5C738DB_B705_5E37_24CD_B265532D0853_"+name).length===0){var dict={NAME:name,VALUE:""};amiWebApp.prependHTML("#B5C738DB_B705_5E37_24CD_B265532D0853",this.fragmentParameter,{dict:dict})}else{amiWebApp.error("duplicated parameter name",true)}}else{amiWebApp.error("empty parameter name",true)}},delParameter:function delParameter(name){if(!confirm("Please confirm...")){return}this.paramDel.push(name);if(name in this.paramDict){delete this.paramDict[name]}$("#B5C738DB_B705_5E37_24CD_B265532D0853_"+name).parent().parent().remove()},togglePasswordVisibility:function togglePasswordVisibility(el){var input=$("#"+el.parent().attr("for"));if(input.attr("type")==="text"){el.html("<i class=\"fa fa-eye\"></i>");input.attr("type","password")}else if(input.attr("type")==="password"){el.html("<i class=\"fa fa-eye-slash\"></i>");input.attr("type","text")}}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9jb25maWcuZXM2LmpzIl0sIm5hbWVzIjpbIiRBTUlDbGFzcyIsIl9pbml0IiwicmVzdWx0IiwiJCIsIkRlZmVycmVkIiwiYW1pV2ViQXBwIiwibG9hZFJlc291cmNlcyIsImRvbmUiLCJkYXRhIiwicmVwbGFjZUhUTUwiLCJmcmFnbWVudFBhcmFtZXRlciIsInBhcmFtRGljdCIsInBhcmFtRGVsIiwicmVzb2x2ZSIsImZhaWwiLCJtZXNzYWdlIiwicmVqZWN0Iiwib25Mb2dpbiIsImlzRW1wdHlPYmplY3QiLCJfbG9hZCIsImxvY2siLCJhbWlDb21tYW5kIiwiZXhlY3V0ZSIsInBhdGhfZmllbGRzIiwianNwYXRoIiwiY29uZmlnX2ZpZWxkcyIsInRleHQiLCJlbXB0eSIsImRpY3QiLCJmb3JFYWNoIiwiY29uZmlnX2ZpZWxkIiwibmFtZSIsInZhbHVlIiwiZWwiLCJsZW5ndGgiLCJwdXNoIiwiTkFNRSIsIlZBTFVFIiwidmFsIiwidW5sb2NrIiwiZXJyb3IiLCJfc2F2ZSIsIm5hbWVzIiwidmFsdWVzIiwicGFyYW1zIiwic2VyaWFsaXplQXJyYXkiLCJpIiwiaW5kZXhPZiIsInRleHRUb1N0cmluZyIsImoiLCJqb2luIiwic3VjY2VzcyIsImFwcGx5IiwiY29uZmlybSIsInJlc2V0IiwidGVzdEVtYWlsIiwiZW1haWwiLCJhZGRQYXJhbWV0ZXIiLCJwcm9tcHQiLCJ0cmltIiwicHJlcGVuZEhUTUwiLCJkZWxQYXJhbWV0ZXIiLCJwYXJlbnQiLCJyZW1vdmUiLCJ0b2dnbGVQYXNzd29yZFZpc2liaWxpdHkiLCJpbnB1dCIsImF0dHIiLCJodG1sIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBZUFBLFNBQVMsQ0FBQyxzQkFBRCxDQUF5QixDQUdqQ0MsS0FBSyxDQUFFLGdCQUNQLGdCQUNDLEdBQU1DLENBQUFBLE1BQU0sQ0FBR0MsQ0FBQyxDQUFDQyxRQUFGLEVBQWYsQ0FFQUMsU0FBUyxDQUFDQyxhQUFWLENBQXdCLENBQ3ZCLGdEQUR1QixDQUV2QixvREFGdUIsQ0FHdkIsbURBSHVCLENBQXhCLEVBSUdDLElBSkgsQ0FJUSxTQUFDQyxJQUFELENBQVUsQ0FFakJILFNBQVMsQ0FBQ0ksV0FBVixDQUFzQix1Q0FBdEIsQ0FBK0RELElBQUksQ0FBQyxDQUFELENBQW5FLEVBQXdFRCxJQUF4RSxDQUE2RSxVQUFNLENBQ2xGRixTQUFTLENBQUNJLFdBQVYsQ0FBc0IsdUNBQXRCLENBQStERCxJQUFJLENBQUMsQ0FBRCxDQUFuRSxFQUF3RUQsSUFBeEUsQ0FBNkUsVUFBTSxDQUVsRixLQUFJLENBQUNHLGlCQUFMLENBQXlCRixJQUFJLENBQUMsQ0FBRCxDQUE3QixDQUVBLEtBQUksQ0FBQ0csU0FBTCxDQUFpQixFQUFqQixDQUVBLEtBQUksQ0FBQ0MsUUFBTCxDQUFnQixFQUFoQixDQUVBVixNQUFNLENBQUNXLE9BQVAsRUFDQSxDQVRELENBVUEsQ0FYRCxDQWFBLENBbkJELEVBbUJHQyxJQW5CSCxDQW1CUSxTQUFDQyxPQUFELENBQWEsQ0FFcEJiLE1BQU0sQ0FBQ2MsTUFBUCxDQUFjRCxPQUFkLENBQ0EsQ0F0QkQsRUF3QkEsTUFBT2IsQ0FBQUEsTUFDUCxDQWhDZ0MsQ0FvQ2pDZSxPQUFPLENBQUUsa0JBQ1QsQ0FDQyxHQUFHZCxDQUFDLENBQUNlLGFBQUYsQ0FBZ0IsS0FBS1AsU0FBckIsQ0FBSCxDQUNBLENBQ0MsTUFBTyxNQUFLUSxLQUFMLEVBQ1AsQ0FDRCxDQTFDZ0MsQ0E4Q2pDQSxLQUFLLENBQUUsZ0JBQ1AsaUJBR0NkLFNBQVMsQ0FBQ2UsSUFBVixHQUlBLE1BQU9DLENBQUFBLFVBQVUsQ0FBQ0MsT0FBWCxDQUFtQixXQUFuQixFQUFnQ2YsSUFBaEMsQ0FBcUMsU0FBQ0MsSUFBRCxDQUFVLENBRXJELEdBQU1lLENBQUFBLFdBQVcsQ0FBR2xCLFNBQVMsQ0FBQ21CLE1BQVYsQ0FBaUIsd0NBQWpCLENBQXlEaEIsSUFBekQsQ0FBcEIsQ0FFQSxHQUFNaUIsQ0FBQUEsYUFBYSxDQUFHcEIsU0FBUyxDQUFDbUIsTUFBVixDQUFpQix5Q0FBakIsQ0FBMERoQixJQUExRCxDQUF0QixDQUlBTCxDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VCLElBQTNDLENBQWdEckIsU0FBUyxDQUFDbUIsTUFBVixDQUFpQixxQ0FBakIsQ0FBc0RELFdBQXRELENBQWhELEVBSUFwQixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3dCLEtBQTNDLEdBRUEsTUFBSSxDQUFDaEIsU0FBTCxDQUFpQixFQUFqQixDQUNBLE1BQUksQ0FBQ0MsUUFBTCxDQUFnQixFQUFoQixDQUVBLEdBQU1nQixDQUFBQSxJQUFJLENBQUcsRUFBYixDQUVBSCxhQUFhLENBQUNJLE9BQWQsQ0FBc0IsU0FBQ0MsWUFBRCxDQUFrQixDQUd2QyxHQUFJQyxDQUFBQSxJQUFJLENBQUdELFlBQVksQ0FBQyxPQUFELENBQVosRUFBeUIsRUFBcEMsQ0FDQSxHQUFJRSxDQUFBQSxLQUFLLENBQUdGLFlBQVksQ0FBRyxHQUFILENBQVosRUFBeUIsRUFBckMsQ0FFQSxHQUFHQyxJQUFJLEdBQUssa0JBQVQsRUFFQUEsSUFBSSxHQUFLLGtCQUZULEVBSUFBLElBQUksR0FBSyxpQkFKVCxFQU1BQSxJQUFJLEdBQUssa0JBTlosQ0FPRyxDQUNGLE1BQ0EsQ0FJRCxNQUFJLENBQUNwQixTQUFMLENBQWVvQixJQUFmLEVBQXVCQyxLQUF2QixDQUlBLEdBQU1DLENBQUFBLEVBQUUsQ0FBRzlCLENBQUMsQ0FBQyxtREFBb0Q0QixJQUFwRCxDQUEyRCxLQUE1RCxDQUFaLENBRUEsR0FBR0UsRUFBRSxDQUFDQyxNQUFILEdBQWMsQ0FBakIsQ0FDQSxDQUNDTixJQUFJLENBQUNPLElBQUwsQ0FBVSxDQUNUQyxJQUFJLENBQUVMLElBREcsQ0FFVE0sS0FBSyxDQUFFTCxLQUZFLENBQVYsQ0FJQSxDQU5ELElBUUEsQ0FDQ0MsRUFBRSxDQUFDSyxHQUFILENBQU9OLEtBQVAsQ0FDQSxDQUdELENBdENELEVBd0NBM0IsU0FBUyxDQUFDSSxXQUFWLENBQXNCLHVDQUF0QixDQUErRCxNQUFJLENBQUNDLGlCQUFwRSxDQUF1RixDQUFDa0IsSUFBSSxDQUFFQSxJQUFQLENBQXZGLEVBQXFHckIsSUFBckcsQ0FBMEcsVUFBTSxDQUUvR0YsU0FBUyxDQUFDa0MsTUFBVixFQUNBLENBSEQsQ0FPQSxDQWxFTSxFQWtFSnpCLElBbEVJLENBa0VDLFNBQUNOLElBQUQsQ0FBT08sT0FBUCxDQUFtQixDQUUxQlYsU0FBUyxDQUFDbUMsS0FBVixDQUFnQnpCLE9BQWhCLENBQXlCLElBQXpCLENBQ0EsQ0FyRU0sQ0F3RVAsQ0E5SGdDLENBa0lqQzBCLEtBQUssQ0FBRSxnQkFDUCxDQUdDcEMsU0FBUyxDQUFDZSxJQUFWLEdBSUEsR0FBSVcsQ0FBQUEsSUFBSixDQUNBLEdBQU1XLENBQUFBLEtBQUssQ0FBRyxFQUFkLENBRUEsR0FBSVYsQ0FBQUEsS0FBSixDQUNBLEdBQU1XLENBQUFBLE1BQU0sQ0FBRyxFQUFmLENBRUEsR0FBTUMsQ0FBQUEsTUFBTSxDQUFHekMsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkMwQyxjQUEzQyxFQUFmLENBRUEsSUFBSSxHQUFNQyxDQUFBQSxDQUFWLEdBQWVGLENBQUFBLE1BQWYsQ0FDQSxDQUNDYixJQUFJLENBQUdhLE1BQU0sQ0FBQ0UsQ0FBRCxDQUFOLENBQVVmLElBQWpCLENBQ0FDLEtBQUssQ0FBR1ksTUFBTSxDQUFDRSxDQUFELENBQU4sQ0FBVWQsS0FBbEIsQ0FFQSxHQUFHLEtBQUtyQixTQUFMLENBQWVvQixJQUFmLElBQXlCQyxLQUE1QixDQUNBLENBQ0MsR0FBR0QsSUFBSSxDQUFDZ0IsT0FBTCxDQUFhLEdBQWIsR0FBcUIsQ0FBeEIsQ0FBMkIsQ0FDMUIxQyxTQUFTLENBQUNtQyxLQUFWLENBQWdCLCtDQUFpRFQsSUFBakQsQ0FBd0QsR0FBeEQsQ0FBOERDLEtBQTlELENBQXNFLEdBQXRGLENBQTJGLElBQTNGLEVBQ0EsTUFDQSxDQUVELEdBQUdBLEtBQUssQ0FBQ2UsT0FBTixDQUFjLEdBQWQsR0FBc0IsQ0FBekIsQ0FBNEIsQ0FDM0IxQyxTQUFTLENBQUNtQyxLQUFWLENBQWdCLGdEQUFrRFQsSUFBbEQsQ0FBeUQsR0FBekQsQ0FBK0RDLEtBQS9ELENBQXVFLEdBQXZGLENBQTRGLElBQTVGLEVBQ0EsTUFDQSxDQUVELEtBQUtyQixTQUFMLENBQWVvQixJQUFmLEVBQXVCQyxLQUF2QixDQUVBVSxLQUFLLENBQUNQLElBQU4sQ0FBVzlCLFNBQVMsQ0FBQzJDLFlBQVYsQ0FBdUJqQixJQUF2QixDQUFYLEVBQ0FZLE1BQU0sQ0FBQ1IsSUFBUCxDQUFZOUIsU0FBUyxDQUFDMkMsWUFBVixDQUF1QmhCLEtBQXZCLENBQVosQ0FDQSxDQUNELENBSUQsSUFBSSxHQUFNaUIsQ0FBQUEsQ0FBVixHQUFlLE1BQUtyQyxRQUFwQixDQUNBLENBQ0NtQixJQUFJLENBQUcsS0FBS25CLFFBQUwsQ0FBY3FDLENBQWQsQ0FBUCxDQUNBakIsS0FBSyxDQUFRLE9BQWIsQ0FFQVUsS0FBSyxDQUFDUCxJQUFOLENBQVc5QixTQUFTLENBQUMyQyxZQUFWLENBQXVCakIsSUFBdkIsQ0FBWCxFQUNBWSxNQUFNLENBQUNSLElBQVAsQ0FBWTlCLFNBQVMsQ0FBQzJDLFlBQVYsQ0FBdUJoQixLQUF2QixDQUFaLENBQ0EsQ0FJRCxNQUFPWCxDQUFBQSxVQUFVLENBQUNDLE9BQVgsQ0FBbUIsMENBQXlDb0IsS0FBSyxDQUFDUSxJQUFOLENBQVcsR0FBWCxDQUF6QyxDQUEyRCxlQUEzRCxDQUEyRVAsTUFBTSxDQUFDTyxJQUFQLENBQVksR0FBWixDQUEzRSxDQUE4RixJQUFqSCxFQUFzSDNDLElBQXRILENBQTJILFNBQUNDLElBQUQsQ0FBT08sT0FBUCxDQUFtQixDQUVwSlYsU0FBUyxDQUFDOEMsT0FBVixDQUFrQnBDLE9BQWxCLENBQTJCLElBQTNCLENBRUEsQ0FKTSxFQUlKRCxJQUpJLENBSUMsU0FBQ04sSUFBRCxDQUFPTyxPQUFQLENBQW1CLENBRTFCVixTQUFTLENBQUNtQyxLQUFWLENBQWdCekIsT0FBaEIsQ0FBeUIsSUFBekIsQ0FDQSxDQVBNLENBVVAsQ0FqTWdDLENBcU1qQ3FDLEtBQUssQ0FBRSxnQkFDUCxDQUNDLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLG1CQUFELENBQVgsQ0FDQSxDQUNDLE1BQ0EsQ0FJRCxLQUFLWixLQUFMLEVBR0EsQ0FqTmdDLENBcU5qQ2EsS0FBSyxDQUFFLGdCQUNQLENBQ0MsR0FBRyxDQUFDRCxPQUFPLENBQUMsbUJBQUQsQ0FBWCxDQUNBLENBQ0MsTUFDQSxDQUlELEtBQUtsQyxLQUFMLEVBR0EsQ0FqT2dDLENBcU9qQ29DLFNBQVMsQ0FBRSxtQkFBU0MsS0FBVCxDQUNYLENBQ0NuRCxTQUFTLENBQUNlLElBQVYsR0FFQUMsVUFBVSxDQUFDQyxPQUFYLENBQW1CLHFCQUFzQmpCLFNBQVMsQ0FBQzJDLFlBQVYsQ0FBdUIsS0FBS3JDLFNBQUwsQ0FBZSxhQUFmLENBQXZCLENBQXRCLENBQThFLFdBQTlFLENBQTBGTixTQUFTLENBQUMyQyxZQUFWLENBQXVCUSxLQUF2QixDQUExRixDQUEwSCxtREFBN0ksRUFBNkxqRCxJQUE3TCxDQUFrTSxTQUFDQyxJQUFELENBQU9PLE9BQVAsQ0FBbUIsQ0FFcE5WLFNBQVMsQ0FBQzhDLE9BQVYsQ0FBa0JwQyxPQUFsQixDQUEyQixJQUEzQixDQUVBLENBSkQsRUFJR0QsSUFKSCxDQUlRLFNBQUNOLElBQUQsQ0FBT08sT0FBUCxDQUFtQixDQUUxQlYsU0FBUyxDQUFDbUMsS0FBVixDQUFnQnpCLE9BQWhCLENBQXlCLElBQXpCLENBQ0EsQ0FQRCxDQVFBLENBalBnQyxDQXFQakMwQyxZQUFZLENBQUUsdUJBQ2QsQ0FDQyxHQUFJMUIsQ0FBQUEsSUFBSSxDQUFHMkIsTUFBTSxDQUFDLGlCQUFELENBQU4sRUFBNkIsRUFBeEMsQ0FFQTNCLElBQUksQ0FBR0EsSUFBSSxDQUFDNEIsSUFBTCxFQUFQLENBRUEsR0FBRzVCLElBQUgsQ0FDQSxDQUNDLEdBQUc1QixDQUFDLENBQUMseUNBQTJDNEIsSUFBNUMsQ0FBRCxDQUFtREcsTUFBbkQsR0FBOEQsQ0FBakUsQ0FDQSxDQUNDLEdBQU1OLENBQUFBLElBQUksQ0FBRyxDQUNaUSxJQUFJLENBQUVMLElBRE0sQ0FFWk0sS0FBSyxDQUFJLEVBRkcsQ0FBYixDQUtBaEMsU0FBUyxDQUFDdUQsV0FBVixDQUFzQix1Q0FBdEIsQ0FBK0QsS0FBS2xELGlCQUFwRSxDQUF1RixDQUFDa0IsSUFBSSxDQUFFQSxJQUFQLENBQXZGLENBQ0EsQ0FSRCxJQVVBLENBQ0N2QixTQUFTLENBQUNtQyxLQUFWLENBQWdCLDJCQUFoQixDQUE2QyxJQUE3QyxDQUNBLENBQ0QsQ0FmRCxJQWlCQSxDQUNDbkMsU0FBUyxDQUFDbUMsS0FBVixDQUFnQixzQkFBaEIsQ0FBd0MsSUFBeEMsQ0FDQSxDQUNELENBL1FnQyxDQW1SakNxQixZQUFZLENBQUUsc0JBQVM5QixJQUFULENBQ2QsQ0FDQyxHQUFHLENBQUNzQixPQUFPLENBQUMsbUJBQUQsQ0FBWCxDQUNBLENBQ0MsTUFDQSxDQUlELEtBQUt6QyxRQUFMLENBQWN1QixJQUFkLENBQW1CSixJQUFuQixFQUVBLEdBQUdBLElBQUksR0FBSSxNQUFLcEIsU0FBaEIsQ0FDQSxDQUNDLE1BQU8sTUFBS0EsU0FBTCxDQUFlb0IsSUFBZixDQUNQLENBSUQ1QixDQUFDLENBQUMseUNBQTJDNEIsSUFBNUMsQ0FBRCxDQUFtRCtCLE1BQW5ELEdBQTREQSxNQUE1RCxHQUFxRUMsTUFBckUsRUFHQSxDQXhTZ0MsQ0E0U2pDQyx3QkFBd0IsQ0FBRSxrQ0FBUy9CLEVBQVQsQ0FDMUIsQ0FDQyxHQUFNZ0MsQ0FBQUEsS0FBSyxDQUFHOUQsQ0FBQyxDQUFDLElBQU04QixFQUFFLENBQUM2QixNQUFILEdBQVlJLElBQVosQ0FBaUIsS0FBakIsQ0FBUCxDQUFmLENBRUssR0FBR0QsS0FBSyxDQUFDQyxJQUFOLENBQVcsTUFBWCxJQUF1QixNQUExQixDQUFrQyxDQUN0Q2pDLEVBQUUsQ0FBQ2tDLElBQUgsQ0FBUSw2QkFBUixFQUNBRixLQUFLLENBQUNDLElBQU4sQ0FBVyxNQUFYLENBQW1CLFVBQW5CLENBQ0EsQ0FISSxJQUlBLElBQUdELEtBQUssQ0FBQ0MsSUFBTixDQUFXLE1BQVgsSUFBdUIsVUFBMUIsQ0FBc0MsQ0FDMUNqQyxFQUFFLENBQUNrQyxJQUFILENBQVEsbUNBQVIsRUFDQUYsS0FBSyxDQUFDQyxJQUFOLENBQVcsTUFBWCxDQUFtQixNQUFuQixDQUNBLENBQ0QsQ0F4VGdDLENBQXpCLENBQVQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE5IFRoZSBBTUkgVGVhbSAvIExQU0MgLyBJTjJQM1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEFkbWluRGFzaGJvYXJkQ29uZmlnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnQWRtaW5EYXNoYm9hcmRDb25maWcnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2luaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL3R3aWcvY29uZmlnL2NvbmZpZy50d2lnJyxcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL3R3aWcvY29uZmlnL2V4dHJhX21lbnUudHdpZycsXG5cdFx0XHQnc3ViYXBwcy9BZG1pbkRhc2hib2FyZC90d2lnL2NvbmZpZy9wYXJhbWV0ZXIudHdpZycsXG5cdFx0XSkuZG9uZSgoZGF0YSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNDQjYwMzZCN181OTcxXzQxQzJfMTE5NF9GNUEwNTFCMjFFQTAnLCBkYXRhWzBdKS5kb25lKCgpID0+IHtcblx0XHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjQzU0NDg1QzNfNDRGOF9DRThFXzBGNTRfQkY4NDdDRUVDRTExJywgZGF0YVsxXSkuZG9uZSgoKSA9PiB7XG5cblx0XHRcdFx0XHR0aGlzLmZyYWdtZW50UGFyYW1ldGVyID0gZGF0YVsyXTtcblxuXHRcdFx0XHRcdHRoaXMucGFyYW1EaWN0ID0ge307XG5cblx0XHRcdFx0XHR0aGlzLnBhcmFtRGVsID0gW107XG5cblx0XHRcdFx0XHRyZXN1bHQucmVzb2x2ZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbCgobWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKCQuaXNFbXB0eU9iamVjdCh0aGlzLnBhcmFtRGljdCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuX2xvYWQoKTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbG9hZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldENvbmZpZycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0Y29uc3QgcGF0aF9maWVsZHMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cInBhdGhzXCJ9LnJvdy5maWVsZCcsIGRhdGEpO1xuXG5cdFx0XHRjb25zdCBjb25maWdfZmllbGRzID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJwYXJhbXNcIn0ucm93LmZpZWxkJywgZGF0YSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjREY5NzA0Q0ZfNTFGRl9GNTcwX0Y1ODdfMjdGQjU2MjVBOTM2JykudGV4dChhbWlXZWJBcHAuanNwYXRoKCcuey5AbmFtZT09PVwiY29uZmlnRmlsZU5hbWVcIn0uJFswXScsIHBhdGhfZmllbGRzKSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQkKCcjQjVDNzM4REJfQjcwNV81RTM3XzI0Q0RfQjI2NTUzMkQwODUzJykuZW1wdHkoKTtcblxuXHRcdFx0dGhpcy5wYXJhbURpY3QgPSB7fTtcblx0XHRcdHRoaXMucGFyYW1EZWwgPSBbXTtcblxuXHRcdFx0Y29uc3QgZGljdCA9IFtdO1xuXG5cdFx0XHRjb25maWdfZmllbGRzLmZvckVhY2goKGNvbmZpZ19maWVsZCkgPT4ge1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBuYW1lID0gY29uZmlnX2ZpZWxkWydAbmFtZSddIHx8ICcnO1xuXHRcdFx0XHRsZXQgdmFsdWUgPSBjb25maWdfZmllbGRbKCgnJCcpKV0gfHwgJyc7XG5cblx0XHRcdFx0aWYobmFtZSA9PT0gJ3Rhc2tfc2VydmVyX25hbWUnXG5cdFx0XHRcdCAgIHx8XG5cdFx0XHRcdCAgIG5hbWUgPT09ICd0YXNrX3NlcnZlcl9wYXNzJ1xuXHRcdFx0XHQgICB8fFxuXHRcdFx0XHQgICBuYW1lID09PSAndGFza19zZXJ2ZXJfdXJsJ1xuXHRcdFx0XHQgICB8fFxuXHRcdFx0XHQgICBuYW1lID09PSAndGFza19zZXJ2ZXJfdXNlcidcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5wYXJhbURpY3RbbmFtZV0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGVsID0gJCgnI0QxN0MwODlGX0ZCNURfQjJBNV83QzlGXzY1QUEwNzM2MDg0RiBbbmFtZSA9IFwiJyArIG5hbWUgKyAnXCJdJylcblxuXHRcdFx0XHRpZihlbC5sZW5ndGggPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRkaWN0LnB1c2goe1xuXHRcdFx0XHRcdFx0TkFNRTogbmFtZSxcblx0XHRcdFx0XHRcdFZBTFVFOiB2YWx1ZSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRlbC52YWwodmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH0pO1xuXG5cdFx0XHRhbWlXZWJBcHAucmVwbGFjZUhUTUwoJyNCNUM3MzhEQl9CNzA1XzVFMzdfMjRDRF9CMjY1NTMyRDA4NTMnLCB0aGlzLmZyYWdtZW50UGFyYW1ldGVyLCB7ZGljdDogZGljdH0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdGFtaVdlYkFwcC51bmxvY2soKTtcblx0XHRcdH0pXG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfc2F2ZTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBuYW1lO1xuXHRcdGNvbnN0IG5hbWVzID0gW107XG5cblx0XHRsZXQgdmFsdWU7XG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cblx0XHRjb25zdCBwYXJhbXMgPSAkKCcjRDE3QzA4OUZfRkI1RF9CMkE1XzdDOUZfNjVBQTA3MzYwODRGJykuc2VyaWFsaXplQXJyYXkoKTtcblxuXHRcdGZvcihjb25zdCBpIGluIHBhcmFtcylcblx0XHR7XG5cdFx0XHRuYW1lID0gcGFyYW1zW2ldLm5hbWU7XG5cdFx0XHR2YWx1ZSA9IHBhcmFtc1tpXS52YWx1ZTtcblxuXHRcdFx0aWYodGhpcy5wYXJhbURpY3RbbmFtZV0gIT09IHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihuYW1lLmluZGV4T2YoJ3wnKSA+PSAwKSB7XG5cdFx0XHRcdFx0YW1pV2ViQXBwLmVycm9yKCdjaGFyYWN0ZXIgYHxgIG5vdCBhbGxvdyBpbiBwYXJhbWV0ZXIgbmFtZXMgKCcgKyBuYW1lICsgJzonICsgdmFsdWUgKyAnKScsIHRydWUpO1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodmFsdWUuaW5kZXhPZignfCcpID49IDApIHtcblx0XHRcdFx0XHRhbWlXZWJBcHAuZXJyb3IoJ2NoYXJhY3RlciBgfGAgbm90IGFsbG93IGluIHBhcmFtZXRlciB2YWx1ZXMgKCcgKyBuYW1lICsgJzonICsgdmFsdWUgKyAnKScsIHRydWUpO1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5wYXJhbURpY3RbbmFtZV0gPSB2YWx1ZTtcblxuXHRcdFx0XHRuYW1lcy5wdXNoKGFtaVdlYkFwcC50ZXh0VG9TdHJpbmcobmFtZSkpO1xuXHRcdFx0XHR2YWx1ZXMucHVzaChhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKGNvbnN0IGogaW4gdGhpcy5wYXJhbURlbClcblx0XHR7XG5cdFx0XHRuYW1lID0gdGhpcy5wYXJhbURlbFtqXTtcblx0XHRcdHZhbHVlID0gLyotKi8nQE5VTEwnLyotKi87XG5cblx0XHRcdG5hbWVzLnB1c2goYW1pV2ViQXBwLnRleHRUb1N0cmluZyhuYW1lKSk7XG5cdFx0XHR2YWx1ZXMucHVzaChhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHZhbHVlKSk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGFtaUNvbW1hbmQuZXhlY3V0ZSgnVXBkYXRlQ29uZmlnIC1zZXBhcmF0b3I9XCJ8XCIgLW5hbWVzPVwiJyArIG5hbWVzLmpvaW4oJ3wnKSArICdcIiAtdmFsdWVzPVwiJyArIHZhbHVlcy5qb2luKCd8JykgKyAnXCInKS5kb25lKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5zdWNjZXNzKG1lc3NhZ2UsIHRydWUpO1xuXG5cdFx0fSkuZmFpbCgoZGF0YSwgbWVzc2FnZSkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAuZXJyb3IobWVzc2FnZSwgdHJ1ZSk7XG5cdFx0fSk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRhcHBseTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoIWNvbmZpcm0oJ1BsZWFzZSBjb25maXJtLi4uJykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuX3NhdmUoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlc2V0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZighY29uZmlybSgnUGxlYXNlIGNvbmZpcm0uLi4nKSlcblx0XHR7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5fbG9hZCgpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGVzdEVtYWlsOiBmdW5jdGlvbihlbWFpbClcblx0e1xuXHRcdGFtaVdlYkFwcC5sb2NrKCk7XG5cblx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ1NlbmRFbWFpbCAtZnJvbT1cIicgKyBhbWlXZWJBcHAudGV4dFRvU3RyaW5nKHRoaXMucGFyYW1EaWN0WydhZG1pbl9lbWFpbCddKSArICdcIiAtdG89XCInICsgYW1pV2ViQXBwLnRleHRUb1N0cmluZyhlbWFpbCkgKyAnXCIgLXN1YmplY3Q9XCJUZXN0XCIgLW1lc3NhZ2U9XCJUaGlzIGlzIGEgdGVzdC5cIicpLmRvbmUoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnN1Y2Nlc3MobWVzc2FnZSwgdHJ1ZSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGFkZFBhcmFtZXRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5hbWUgPSBwcm9tcHQoJ1BhcmFtZXRlciBuYW1lOicpIHx8ICcnO1xuXG5cdFx0bmFtZSA9IG5hbWUudHJpbSgpO1xuXG5cdFx0aWYobmFtZSlcblx0XHR7XG5cdFx0XHRpZigkKCcjQjVDNzM4REJfQjcwNV81RTM3XzI0Q0RfQjI2NTUzMkQwODUzXycgKyBuYW1lKS5sZW5ndGggPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGRpY3QgPSB7XG5cdFx0XHRcdFx0TkFNRTogbmFtZSxcblx0XHRcdFx0XHRWQUxVRTogKCgnJykpLFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGFtaVdlYkFwcC5wcmVwZW5kSFRNTCgnI0I1QzczOERCX0I3MDVfNUUzN18yNENEX0IyNjU1MzJEMDg1MycsIHRoaXMuZnJhZ21lbnRQYXJhbWV0ZXIsIHtkaWN0OiBkaWN0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGFtaVdlYkFwcC5lcnJvcignZHVwbGljYXRlZCBwYXJhbWV0ZXIgbmFtZScsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0YW1pV2ViQXBwLmVycm9yKCdlbXB0eSBwYXJhbWV0ZXIgbmFtZScsIHRydWUpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRlbFBhcmFtZXRlcjogZnVuY3Rpb24obmFtZSlcblx0e1xuXHRcdGlmKCFjb25maXJtKCdQbGVhc2UgY29uZmlybS4uLicpKVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnBhcmFtRGVsLnB1c2gobmFtZSk7XG5cblx0XHRpZihuYW1lIGluIHRoaXMucGFyYW1EaWN0KVxuXHRcdHtcblx0XHRcdGRlbGV0ZSB0aGlzLnBhcmFtRGljdFtuYW1lXTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQkKCcjQjVDNzM4REJfQjcwNV81RTM3XzI0Q0RfQjI2NTUzMkQwODUzXycgKyBuYW1lKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRvZ2dsZVBhc3N3b3JkVmlzaWJpbGl0eTogZnVuY3Rpb24oZWwpXG5cdHtcblx0XHRjb25zdCBpbnB1dCA9ICQoJyMnICsgZWwucGFyZW50KCkuYXR0cignZm9yJykpO1xuXG5cdFx0LyoqLyBpZihpbnB1dC5hdHRyKCd0eXBlJykgPT09ICd0ZXh0Jykge1xuXHRcdFx0ZWwuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1leWVcIj48L2k+Jyk7XG5cdFx0XHRpbnB1dC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoaW5wdXQuYXR0cigndHlwZScpID09PSAncGFzc3dvcmQnKSB7XG5cdFx0XHRlbC5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWV5ZS1zbGFzaFwiPjwvaT4nKTtcblx0XHRcdGlucHV0LmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
