/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-2019 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global Chart
 *
 */$AMIClass("AdminDashboardHome",{_init:function _init(){var _this=this;var result=$.Deferred();amiWebApp.loadResources(["js/3rd-party/chart.bundle.min.js","subapps/AdminDashboard/twig/home/home.twig","subapps/AdminDashboard/twig/home/extra_menu.twig"]).done(function(data){amiWebApp.replaceHTML("#CB6036B7_5971_41C2_1194_F5A051B21EA0",data[1]).done(function(){amiWebApp.replaceHTML("#C54485C3_44F8_CE8E_0F54_BF847CEECE11",data[2]).done(function(){$("#FCA2B6DC_3239_838D_A109_91F164524987").text(jQuery.fn.tooltip.Constructor.VERSION);$("#F8D580E4_05F1_0317_9F3F_E4BA7AB99D3E").text(jQuery.fn.jquery);$("#ACA527B0_4581_8292_DB2A_22C900E621A0").text(amiTwig.version);$("#D9C3541F_3534_1312_4C08_F22962C05347").text(JSPath.version);$("#E15C9F8C-A955-2643-196B-BBF3317D1616").text(ami.version);$("#A47094A8-3D38-666B-E542-2C88AC486E1D").text(ami.commit_id);var options1={rotation:-Math.PI,cutoutPercentage:50,circumference:+Math.PI,animation:{animateScale:false,animateRotate:false},legend:{display:true,position:"left"},title:{display:true,position:"bottom",text:"Disk availability [MBytes]"}};var options2={rotation:-Math.PI,cutoutPercentage:50,circumference:+Math.PI,animation:{animateScale:false,animateRotate:false},legend:{display:true,position:"left"},title:{display:true,position:"bottom",text:"Memory availability [MBytes]"}};_this._chart1=new Chart($("#F6D24B37_F159_CB36_2D51_466740F9588E")[0].getContext("2d"),{type:"pie",data:{labels:["Used","Free"],datasets:[{data:[0,100],borderColor:["#F5C6CB","#C3E6CB"],backgroundColor:["#F5C6CB","#D4EDDA"]}]},options:options1});_this._chart2=new Chart($("#D058BCEF_2903_2D9D_837F_0B5C8858011D")[0].getContext("2d"),{type:"pie",data:{labels:["Used","Free"],datasets:[{data:[0,100],borderColor:["#F5C6CB","#C3E6CB"],backgroundColor:["#F5C6CB","#D4EDDA"]}]},options:options2});result.resolve()})})}).fail(function(message){result.reject(message)});return result},onLogin:function onLogin(){var _this2=this;var result=$.Deferred();amiCommand.execute("SearchQuery -catalog=\"self\" -entity=\"N/A\" -sql=\"SELECT (SELECT COUNT(*) FROM `router_config`) AS `nb1`, (SELECT COUNT(*) FROM `router_role`) AS `nb2`, (SELECT COUNT(*) FROM `router_command`) AS `nb3`, (SELECT COUNT(*) FROM `router_user`) AS `nb4`, (SELECT COUNT(*) FROM `router_catalog`) AS `nb5`\"").done(function(data){var nr1=amiWebApp.jspath("..field{.@name===\"nb1\"}.$",data)[0]||"N/A";var nr2=amiWebApp.jspath("..field{.@name===\"nb2\"}.$",data)[0]||"N/A";var nr3=amiWebApp.jspath("..field{.@name===\"nb3\"}.$",data)[0]||"N/A";var nr4=amiWebApp.jspath("..field{.@name===\"nb4\"}.$",data)[0]||"N/A";var nr5=amiWebApp.jspath("..field{.@name===\"nb5\"}.$",data)[0]||"N/A";$("#F38F2C33_FD2B_0947_D711_D07C095AED8C").text(nr1);$("#B86F861D_ECA4_8CF4_1ABC_30EFF044A03F").text(nr2);$("#B1969A3F_D9F3_DEA2_E351_53A827AECA72").text(nr3);$("#CFC83907_4194_F600_8191_C0DEB7CADF25").text(nr4);$("#BC9730FE_4458_C523_2F43_2B16F0671E7E").text(nr5);amiCommand.execute("GetServerStatus").done(function(data){var javaBuildVersion=amiWebApp.jspath("..rowset{.@type===\"java\"}..field{.@name===\"buildVersion\"}.$",data)[0]||"N/A";var amiBuildVersion=amiWebApp.jspath("..rowset{.@type===\"ami\"}..field{.@name===\"buildVersion\"}.$",data)[0]||"N/A";var amiCommitIdAbbrev=amiWebApp.jspath("..rowset{.@type===\"ami\"}..field{.@name===\"commitIdAbbrev\"}.$",data)[0]||"N/A";$("#F10C1A82_4C46_C08F_F56A_7B9A90416B68").text(javaBuildVersion);$("#F1FA8298_F283_E0C4_A9F6_74C8EB2E4762").text(amiBuildVersion);$("#A8F46B0F_4657_09B7_BB0D_6B4434FD79A3").text(amiCommitIdAbbrev);var hostName=amiWebApp.jspath("..field{.@name===\"hostName\"}.$",data)[0]||"N/A";var nbOfCores=amiWebApp.jspath("..field{.@name===\"nbOfCores\"}.$",data)[0]||"N/A";var freeDisk=parseInt(amiWebApp.jspath("..field{.@name===\"freeDisk\"}.$",data)[0]||"0");var totalDisk=parseInt(amiWebApp.jspath("..field{.@name===\"totalDisk\"}.$",data)[0]||"0");var freeMem=parseInt(amiWebApp.jspath("..field{.@name===\"freeMem\"}.$",data)[0]||"0");var totalMem=parseInt(amiWebApp.jspath("..field{.@name===\"totalMem\"}.$",data)[0]||"0");$("#B2BE4D58_BE5D_F374_BE74_BE6C4384B125").text(hostName);$("#C4889AE7_CB06_DE89_1297_B9FF7C9C8BA1").text(nbOfCores);$("#FCD9CCC9_65EA_092F_B715_C1C49255943F").text(Math.round(totalDisk/(1024*1024)));$("#A1A836FF_D465_1A2C_B045_AC691EEF0812").text(Math.round(totalMem/(1024*1024)));_this2._chart1.data.datasets[0].data[0]=Math.round((totalDisk-freeDisk)/(1024*1024));_this2._chart1.data.datasets[0].data[1]=Math.round((freeDisk-0)/(1024*1024));_this2._chart1.update();_this2._chart2.data.datasets[0].data[0]=Math.round((totalMem-freeMem)/(1024*1024));_this2._chart2.data.datasets[0].data[1]=Math.round((freeMem-0)/(1024*1024));_this2._chart2.update();result.resolve()}).fail(function(data,message){result.reject(message)})}).fail(function(data,message){result.reject(message)});return result},reflesh:function reflesh(){amiWebApp.lock();this.onLogin().done(function(){amiWebApp.unlock()}).fail(function(data,message){amiWebApp.error(message,true)})}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9ob21lLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCJfaW5pdCIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJkb25lIiwiZGF0YSIsInJlcGxhY2VIVE1MIiwidGV4dCIsImpRdWVyeSIsImZuIiwidG9vbHRpcCIsIkNvbnN0cnVjdG9yIiwiVkVSU0lPTiIsImpxdWVyeSIsImFtaVR3aWciLCJ2ZXJzaW9uIiwiSlNQYXRoIiwiYW1pIiwiY29tbWl0X2lkIiwib3B0aW9uczEiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImN1dG91dFBlcmNlbnRhZ2UiLCJjaXJjdW1mZXJlbmNlIiwiYW5pbWF0aW9uIiwiYW5pbWF0ZVNjYWxlIiwiYW5pbWF0ZVJvdGF0ZSIsImxlZ2VuZCIsImRpc3BsYXkiLCJwb3NpdGlvbiIsInRpdGxlIiwib3B0aW9uczIiLCJfY2hhcnQxIiwiQ2hhcnQiLCJnZXRDb250ZXh0IiwidHlwZSIsImxhYmVscyIsImRhdGFzZXRzIiwiYm9yZGVyQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJvcHRpb25zIiwiX2NoYXJ0MiIsInJlc29sdmUiLCJmYWlsIiwibWVzc2FnZSIsInJlamVjdCIsIm9uTG9naW4iLCJhbWlDb21tYW5kIiwiZXhlY3V0ZSIsIm5yMSIsImpzcGF0aCIsIm5yMiIsIm5yMyIsIm5yNCIsIm5yNSIsImphdmFCdWlsZFZlcnNpb24iLCJhbWlCdWlsZFZlcnNpb24iLCJhbWlDb21taXRJZEFiYnJldiIsImhvc3ROYW1lIiwibmJPZkNvcmVzIiwiZnJlZURpc2siLCJwYXJzZUludCIsInRvdGFsRGlzayIsImZyZWVNZW0iLCJ0b3RhbE1lbSIsInJvdW5kIiwidXBkYXRlIiwicmVmbGVzaCIsImxvY2siLCJ1bmxvY2siLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0dBaUJBQSxTQUFTLENBQUMsb0JBQUQsQ0FBdUIsQ0FHL0JDLEtBQUssQ0FBRSxn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QUFYLENBQXhDLENBQ0EsTUFBSSxDQUFDdEIsT0FBTCxDQUFhckMsSUFBYixDQUFrQmlDLFFBQWxCLENBQTJCLENBQTNCLEVBQThCakMsSUFBOUIsQ0FBbUMsQ0FBbkMsRUFBd0NnQixJQUFJLENBQUM2QyxLQUFMLENBQVcsQ0FBQ0YsT0FBTyxDQUFHLENBQVgsR0FBdUIsS0FBUyxJQUFoQyxDQUFYLENBQXhDLENBQ0EsTUFBSSxDQUFDdEIsT0FBTCxDQUFheUIsTUFBYixHQUlBcEUsTUFBTSxDQUFDNEMsT0FBUCxFQUVBLENBOUNELEVBOENHQyxJQTlDSCxDQThDUSxTQUFDdkMsSUFBRCxDQUFPd0MsT0FBUCxDQUFtQixDQUUxQjlDLE1BQU0sQ0FBQytDLE1BQVAsQ0FBY0QsT0FBZCxDQUNBLENBakRELENBbURBLENBakVELEVBaUVHRCxJQWpFSCxDQWlFUSxTQUFDdkMsSUFBRCxDQUFPd0MsT0FBUCxDQUFtQixDQUUxQjlDLE1BQU0sQ0FBQytDLE1BQVAsQ0FBY0QsT0FBZCxDQUNBLENBcEVELEVBc0VBLE1BQU85QyxDQUFBQSxNQUNQLENBbk44QixDQXVOL0JxRSxPQUFPLENBQUUsa0JBQ1QsQ0FHQ2xFLFNBQVMsQ0FBQ21FLElBQVYsR0FFQSxLQUFLdEIsT0FBTCxHQUFlM0MsSUFBZixDQUFvQixVQUFNLENBRXpCRixTQUFTLENBQUNvRSxNQUFWLEVBRUEsQ0FKRCxFQUlHMUIsSUFKSCxDQUlRLFNBQUN2QyxJQUFELENBQU93QyxPQUFQLENBQW1CLENBRTFCM0MsU0FBUyxDQUFDcUUsS0FBVixDQUFnQjFCLE9BQWhCLENBQXlCLElBQXpCLENBQ0EsQ0FQRCxDQVVBLENBdk84QixDQUF2QixDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOSBUaGUgQU1JIFRlYW0gLyBMUFNDIC8gSU4yUDNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKiBAZ2xvYmFsIENoYXJ0XG4gKlxuICovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogQWRtaW5EYXNoYm9hcmRIb21lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuJEFNSUNsYXNzKCdBZG1pbkRhc2hib2FyZEhvbWUnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2luaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdGFtaVdlYkFwcC5sb2FkUmVzb3VyY2VzKFtcblx0XHRcdCdqcy8zcmQtcGFydHkvY2hhcnQuYnVuZGxlLm1pbi5qcycsXG5cdFx0XHQnc3ViYXBwcy9BZG1pbkRhc2hib2FyZC90d2lnL2hvbWUvaG9tZS50d2lnJyxcblx0XHRcdCdzdWJhcHBzL0FkbWluRGFzaGJvYXJkL3R3aWcvaG9tZS9leHRyYV9tZW51LnR3aWcnLFxuXHRcdF0pLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0YW1pV2ViQXBwLnJlcGxhY2VIVE1MKCcjQ0I2MDM2QjdfNTk3MV80MUMyXzExOTRfRjVBMDUxQjIxRUEwJywgZGF0YVsxXSkuZG9uZSgoKSA9PiB7XG5cdFx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI0M1NDQ4NUMzXzQ0RjhfQ0U4RV8wRjU0X0JGODQ3Q0VFQ0UxMScsIGRhdGFbMl0pLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0JCgnI0ZDQTJCNkRDXzMyMzlfODM4RF9BMTA5XzkxRjE2NDUyNDk4NycpLnRleHQoalF1ZXJ5LmZuLnRvb2x0aXAuQ29uc3RydWN0b3IuVkVSU0lPTik7XG5cblx0XHRcdFx0XHQkKCcjRjhENTgwRTRfMDVGMV8wMzE3XzlGM0ZfRTRCQTdBQjk5RDNFJykudGV4dChqUXVlcnkuZm4uanF1ZXJ5KTtcblxuXHRcdFx0XHRcdCQoJyNBQ0E1MjdCMF80NTgxXzgyOTJfREIyQV8yMkM5MDBFNjIxQTAnKS50ZXh0KGFtaVR3aWcudmVyc2lvbik7XG5cblx0XHRcdFx0XHQkKCcjRDlDMzU0MUZfMzUzNF8xMzEyXzRDMDhfRjIyOTYyQzA1MzQ3JykudGV4dChKU1BhdGgudmVyc2lvbik7XG5cblx0XHRcdFx0XHQkKCcjRTE1QzlGOEMtQTk1NS0yNjQzLTE5NkItQkJGMzMxN0QxNjE2JykudGV4dChhbWkudmVyc2lvbik7XG5cblx0XHRcdFx0XHQkKCcjQTQ3MDk0QTgtM0QzOC02NjZCLUU1NDItMkM4OEFDNDg2RTFEJykudGV4dChhbWkuY29tbWl0X2lkKTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnMxID0ge1xuXHRcdFx0XHRcdFx0cm90YXRpb246IC1NYXRoLlBJLFxuXHRcdFx0XHRcdFx0Y3V0b3V0UGVyY2VudGFnZTogNTAsXG5cdFx0XHRcdFx0XHRjaXJjdW1mZXJlbmNlOiArTWF0aC5QSSxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRhbmltYXRlU2NhbGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRhbmltYXRlUm90YXRlOiBmYWxzZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRsZWdlbmQ6IHtcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdsZWZ0Jyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR0aXRsZToge1xuXHRcdFx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogJ2JvdHRvbScsXG5cdFx0XHRcdFx0XHRcdHRleHQ6ICdEaXNrIGF2YWlsYWJpbGl0eSBbTUJ5dGVzXScsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRjb25zdCBvcHRpb25zMiA9IHtcblx0XHRcdFx0XHRcdHJvdGF0aW9uOiAtTWF0aC5QSSxcblx0XHRcdFx0XHRcdGN1dG91dFBlcmNlbnRhZ2U6IDUwLFxuXHRcdFx0XHRcdFx0Y2lyY3VtZmVyZW5jZTogK01hdGguUEksXG5cdFx0XHRcdFx0XHRhbmltYXRpb246IHtcblx0XHRcdFx0XHRcdFx0YW5pbWF0ZVNjYWxlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0YW5pbWF0ZVJvdGF0ZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0bGVnZW5kOiB7XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiAnbGVmdCcsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdib3R0b20nLFxuXHRcdFx0XHRcdFx0XHR0ZXh0OiAnTWVtb3J5IGF2YWlsYWJpbGl0eSBbTUJ5dGVzXScsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLl9jaGFydDEgPSBuZXcgQ2hhcnQoJCgnI0Y2RDI0QjM3X0YxNTlfQ0IzNl8yRDUxXzQ2Njc0MEY5NTg4RScpWzBdLmdldENvbnRleHQoJzJkJyksIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdwaWUnLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRsYWJlbHM6IFtcblx0XHRcdFx0XHRcdFx0XHQnVXNlZCcsXG5cdFx0XHRcdFx0XHRcdFx0J0ZyZWUnLFxuXHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBbMCwgMTAwXSxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogW1xuXHRcdFx0XHRcdFx0XHRcdFx0JyNGNUM2Q0InLFxuXHRcdFx0XHRcdFx0XHRcdFx0JyNDM0U2Q0InLFxuXHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHQnI0Y1QzZDQicsXG5cdFx0XHRcdFx0XHRcdFx0XHQnI0Q0RUREQScsXG5cdFx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0b3B0aW9uczogb3B0aW9uczEsXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHR0aGlzLl9jaGFydDIgPSBuZXcgQ2hhcnQoJCgnI0QwNThCQ0VGXzI5MDNfMkQ5RF84MzdGXzBCNUM4ODU4MDExRCcpWzBdLmdldENvbnRleHQoJzJkJyksIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdwaWUnLFxuXHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRsYWJlbHM6IFtcblx0XHRcdFx0XHRcdFx0XHQnVXNlZCcsXG5cdFx0XHRcdFx0XHRcdFx0J0ZyZWUnLFxuXHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHRkYXRhc2V0czogW3tcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBbMCwgMTAwXSxcblx0XHRcdFx0XHRcdFx0XHRib3JkZXJDb2xvcjogW1xuXHRcdFx0XHRcdFx0XHRcdFx0JyNGNUM2Q0InLFxuXHRcdFx0XHRcdFx0XHRcdFx0JyNDM0U2Q0InLFxuXHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHQnI0Y1QzZDQicsXG5cdFx0XHRcdFx0XHRcdFx0XHQnI0Q0RUREQScsXG5cdFx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFx0fV1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRvcHRpb25zOiBvcHRpb25zMixcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dpbjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pQ29tbWFuZC5leGVjdXRlKCdTZWFyY2hRdWVyeSAtY2F0YWxvZz1cInNlbGZcIiAtZW50aXR5PVwiTi9BXCIgLXNxbD1cIlNFTEVDVCAoU0VMRUNUIENPVU5UKCopIEZST00gYHJvdXRlcl9jb25maWdgKSBBUyBgbmIxYCwgKFNFTEVDVCBDT1VOVCgqKSBGUk9NIGByb3V0ZXJfcm9sZWApIEFTIGBuYjJgLCAoU0VMRUNUIENPVU5UKCopIEZST00gYHJvdXRlcl9jb21tYW5kYCkgQVMgYG5iM2AsIChTRUxFQ1QgQ09VTlQoKikgRlJPTSBgcm91dGVyX3VzZXJgKSBBUyBgbmI0YCwgKFNFTEVDVCBDT1VOVCgqKSBGUk9NIGByb3V0ZXJfY2F0YWxvZ2ApIEFTIGBuYjVgXCInKS5kb25lKChkYXRhKSA9PiB7XG5cblx0XHRcdGNvbnN0IG5yMSA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYjFcIn0uJCcsIGRhdGEpWzBdIHx8ICdOL0EnO1xuXHRcdFx0Y29uc3QgbnIyID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm5iMlwifS4kJywgZGF0YSlbMF0gfHwgJ04vQSc7XG5cdFx0XHRjb25zdCBucjMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibmIzXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblx0XHRcdGNvbnN0IG5yNCA9IGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJuYjRcIn0uJCcsIGRhdGEpWzBdIHx8ICdOL0EnO1xuXHRcdFx0Y29uc3QgbnI1ID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cIm5iNVwifS4kJywgZGF0YSlbMF0gfHwgJ04vQSc7XG5cblx0XHRcdCQoJyNGMzhGMkMzM19GRDJCXzA5NDdfRDcxMV9EMDdDMDk1QUVEOEMnKS50ZXh0KG5yMSk7XG5cdFx0XHQkKCcjQjg2Rjg2MURfRUNBNF84Q0Y0XzFBQkNfMzBFRkYwNDRBMDNGJykudGV4dChucjIpO1xuXHRcdFx0JCgnI0IxOTY5QTNGX0Q5RjNfREVBMl9FMzUxXzUzQTgyN0FFQ0E3MicpLnRleHQobnIzKTtcblx0XHRcdCQoJyNDRkM4MzkwN180MTk0X0Y2MDBfODE5MV9DMERFQjdDQURGMjUnKS50ZXh0KG5yNCk7XG5cdFx0XHQkKCcjQkM5NzMwRkVfNDQ1OF9DNTIzXzJGNDNfMkIxNkYwNjcxRTdFJykudGV4dChucjUpO1xuXG5cdFx0XHRhbWlDb21tYW5kLmV4ZWN1dGUoJ0dldFNlcnZlclN0YXR1cycpLmRvbmUoKGRhdGEpID0+IHtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGphdmFCdWlsZFZlcnNpb24gPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImphdmFcIn0uLmZpZWxkey5AbmFtZT09PVwiYnVpbGRWZXJzaW9uXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblx0XHRcdFx0Y29uc3QgYW1pQnVpbGRWZXJzaW9uID0gYW1pV2ViQXBwLmpzcGF0aCgnLi5yb3dzZXR7LkB0eXBlPT09XCJhbWlcIn0uLmZpZWxkey5AbmFtZT09PVwiYnVpbGRWZXJzaW9uXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblx0XHRcdFx0Y29uc3QgYW1pQ29tbWl0SWRBYmJyZXYgPSBhbWlXZWJBcHAuanNwYXRoKCcuLnJvd3NldHsuQHR5cGU9PT1cImFtaVwifS4uZmllbGR7LkBuYW1lPT09XCJjb21taXRJZEFiYnJldlwifS4kJywgZGF0YSlbMF0gfHwgJ04vQSc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHQkKCcjRjEwQzFBODJfNEM0Nl9DMDhGX0Y1NkFfN0I5QTkwNDE2QjY4JykudGV4dChqYXZhQnVpbGRWZXJzaW9uKTtcblx0XHRcdFx0JCgnI0YxRkE4Mjk4X0YyODNfRTBDNF9BOUY2Xzc0QzhFQjJFNDc2MicpLnRleHQoYW1pQnVpbGRWZXJzaW9uKTtcblx0XHRcdFx0JCgnI0E4RjQ2QjBGXzQ2NTdfMDlCN19CQjBEXzZCNDQzNEZENzlBMycpLnRleHQoYW1pQ29tbWl0SWRBYmJyZXYpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgaG9zdE5hbWUgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwiaG9zdE5hbWVcIn0uJCcsIGRhdGEpWzBdIHx8ICdOL0EnO1xuXHRcdFx0XHRjb25zdCBuYk9mQ29yZXMgPSBhbWlXZWJBcHAuanNwYXRoKCcuLmZpZWxkey5AbmFtZT09PVwibmJPZkNvcmVzXCJ9LiQnLCBkYXRhKVswXSB8fCAnTi9BJztcblxuXHRcdFx0XHRjb25zdCBmcmVlRGlzayA9IHBhcnNlSW50KGFtaVdlYkFwcC5qc3BhdGgoJy4uZmllbGR7LkBuYW1lPT09XCJmcmVlRGlza1wifS4kJywgZGF0YSlbMF0gfHwgJzAnKTtcblx0XHRcdFx0Y29uc3QgdG90YWxEaXNrID0gcGFyc2VJbnQoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInRvdGFsRGlza1wifS4kJywgZGF0YSlbMF0gfHwgJzAnKTtcblxuXHRcdFx0XHRjb25zdCBmcmVlTWVtID0gcGFyc2VJbnQoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cImZyZWVNZW1cIn0uJCcsIGRhdGEpWzBdIHx8ICcwJyk7XG5cdFx0XHRcdGNvbnN0IHRvdGFsTWVtID0gcGFyc2VJbnQoYW1pV2ViQXBwLmpzcGF0aCgnLi5maWVsZHsuQG5hbWU9PT1cInRvdGFsTWVtXCJ9LiQnLCBkYXRhKVswXSB8fCAnMCcpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0JCgnI0IyQkU0RDU4X0JFNURfRjM3NF9CRTc0X0JFNkM0Mzg0QjEyNScpLnRleHQoaG9zdE5hbWUpO1xuXHRcdFx0XHQkKCcjQzQ4ODlBRTdfQ0IwNl9ERTg5XzEyOTdfQjlGRjdDOUM4QkExJykudGV4dChuYk9mQ29yZXMpO1xuXHRcdFx0XHQkKCcjRkNEOUNDQzlfNjVFQV8wOTJGX0I3MTVfQzFDNDkyNTU5NDNGJykudGV4dChNYXRoLnJvdW5kKHRvdGFsRGlzayAvICgxMDI0LjAgKiAxMDI0LjApKSk7XG5cdFx0XHRcdCQoJyNBMUE4MzZGRl9ENDY1XzFBMkNfQjA0NV9BQzY5MUVFRjA4MTInKS50ZXh0KE1hdGgucm91bmQodG90YWxNZW0gLyAoMTAyNC4wICogMTAyNC4wKSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0dGhpcy5fY2hhcnQxLmRhdGEuZGF0YXNldHNbMF0uZGF0YVswXSA9IE1hdGgucm91bmQoKHRvdGFsRGlzayAtIGZyZWVEaXNrKSAvICgxMDI0LjAgKiAxMDI0LjApKTtcblx0XHRcdFx0dGhpcy5fY2hhcnQxLmRhdGEuZGF0YXNldHNbMF0uZGF0YVsxXSA9IE1hdGgucm91bmQoKGZyZWVEaXNrIC0gMHgwMDAwMDApIC8gKDEwMjQuMCAqIDEwMjQuMCkpO1xuXHRcdFx0XHR0aGlzLl9jaGFydDEudXBkYXRlKCk7XG5cblx0XHRcdFx0dGhpcy5fY2hhcnQyLmRhdGEuZGF0YXNldHNbMF0uZGF0YVswXSA9IE1hdGgucm91bmQoKHRvdGFsTWVtIC0gZnJlZU1lbSkgLyAoMTAyNC4wICogMTAyNC4wKSk7XG5cdFx0XHRcdHRoaXMuX2NoYXJ0Mi5kYXRhLmRhdGFzZXRzWzBdLmRhdGFbMV0gPSBNYXRoLnJvdW5kKChmcmVlTWVtIC0gMHgwMDAwMCkgLyAoMTAyNC4wICogMTAyNC4wKSk7XG5cdFx0XHRcdHRoaXMuX2NoYXJ0Mi51cGRhdGUoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5yZXNvbHZlKCk7XG5cblx0XHRcdH0pLmZhaWwoKGRhdGEsIG1lc3NhZ2UpID0+IHtcblxuXHRcdFx0XHRyZXN1bHQucmVqZWN0KG1lc3NhZ2UpO1xuXHRcdFx0fSk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVmbGVzaDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0YW1pV2ViQXBwLmxvY2soKTtcblxuXHRcdHRoaXMub25Mb2dpbigpLmRvbmUoKCkgPT4ge1xuXG5cdFx0XHRhbWlXZWJBcHAudW5sb2NrKCk7XG5cblx0XHR9KS5mYWlsKChkYXRhLCBtZXNzYWdlKSA9PiB7XG5cblx0XHRcdGFtaVdlYkFwcC5lcnJvcihtZXNzYWdlLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
