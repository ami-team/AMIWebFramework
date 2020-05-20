/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */$AMIClass("AdderApp",{$extends:ami.SubApp,onReady:function onReady(userdata){var _this=this;if(userdata){this.qId=[];userdata.split(",").forEach(function(item){_this.qId.push(item.trim())})}var result=$.Deferred();amiWebApp.loadResources(["subapps/Adder/css/AdderApp.css","subapps/Adder/twig/AdderApp.twig","ctrl:adder"],{context:this}).done(function(data){this.adderCtrl=data[2];amiWebApp.replaceHTML("#ami_main_content",data[1],{context:this}).done(function(){result.resolve()})}).fail(function(data){result.reject(data)});return result},onExit:function onExit(){},onLogin:function onLogin(){var result=$.Deferred();var enable=amiLogin.hasRole("AMI_ADMIN")===true||amiLogin.hasRole("AMI_WRITER")===true;if(enable){if(this.qId){var catalog=this.qId[0];var entity=this.qId[1];var field=this.qId[2];var adder=new this.adderCtrl;adder.render("#C9BBC18B_2959_A48E_9059_9FC08D667935",{catalog:catalog,entity:entity,field:field}).done(function(){result.resolve()}).fail(function(message){result.reject(message)})}else{result.reject("Missing parameters")}}else{$("#C9BBC18B_2959_A48E_9059_9FC08D667935").empty()}},onLogout:function onLogout(){$("#C9BBC18B_2959_A48E_9059_9FC08D667935").empty()}});var adderApp=new AdderApp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFkZGVyQXBwLmVzNi5qcyJdLCJuYW1lcyI6WyIkQU1JQ2xhc3MiLCIkZXh0ZW5kcyIsImFtaSIsIlN1YkFwcCIsIm9uUmVhZHkiLCJ1c2VyZGF0YSIsInFJZCIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwidHJpbSIsInJlc3VsdCIsIiQiLCJEZWZlcnJlZCIsImFtaVdlYkFwcCIsImxvYWRSZXNvdXJjZXMiLCJjb250ZXh0IiwiZG9uZSIsImRhdGEiLCJhZGRlckN0cmwiLCJyZXBsYWNlSFRNTCIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0Iiwib25FeGl0Iiwib25Mb2dpbiIsImVuYWJsZSIsImFtaUxvZ2luIiwiaGFzUm9sZSIsImNhdGFsb2ciLCJlbnRpdHkiLCJmaWVsZCIsImFkZGVyIiwicmVuZGVyIiwibWVzc2FnZSIsImVtcHR5Iiwib25Mb2dvdXQiLCJhZGRlckFwcCIsIkFkZGVyQXBwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0dBYUFBLFNBQVMsQ0FBQyxVQUFELENBQWEsQ0FHckJDLFFBQVEsQ0FBRUMsR0FBRyxDQUFDQyxNQUhPLENBT3JCQyxPQUFPLENBQUUsaUJBQVNDLFFBQVQsQ0FDVCxnQkFDTyxHQUFHQSxRQUFILENBQ0EsQ0FDSSxLQUFLQyxHQUFMLENBQVcsRUFBWCxDQUVBRCxRQUFRLENBQUNFLEtBQVQsQ0FBZSxHQUFmLEVBQW9CQyxPQUFwQixDQUE0QixTQUFDQyxJQUFELENBQVUsQ0FFakMsS0FBSSxDQUFDSCxHQUFMLENBQVNJLElBQVQsQ0FBY0QsSUFBSSxDQUFDRSxJQUFMLEVBQWQsQ0FFSixDQUpELENBS0gsQ0FFUCxHQUFJQyxDQUFBQSxNQUFNLENBQUdDLENBQUMsQ0FBQ0MsUUFBRixFQUFiLENBRUFDLFNBQVMsQ0FBQ0MsYUFBVixDQUF3QixDQUN2QixnQ0FEdUIsQ0FFdkIsa0NBRnVCLENBR3ZCLFlBSHVCLENBQXhCLENBSUcsQ0FBQ0MsT0FBTyxDQUFFLElBQVYsQ0FKSCxFQUlvQkMsSUFKcEIsQ0FJeUIsU0FBU0MsSUFBVCxDQUFlLENBRXBDLEtBQUtDLFNBQUwsQ0FBaUJELElBQUksQ0FBQyxDQUFELENBQXJCLENBRUhKLFNBQVMsQ0FBQ00sV0FBVixDQUFzQixtQkFBdEIsQ0FBMkNGLElBQUksQ0FBQyxDQUFELENBQS9DLENBQW9ELENBQUNGLE9BQU8sQ0FBRSxJQUFWLENBQXBELEVBQXFFQyxJQUFyRSxDQUEwRSxVQUFXLENBRXBGTixNQUFNLENBQUNVLE9BQVAsRUFDQSxDQUhELENBS0EsQ0FiRCxFQWFHQyxJQWJILENBYVEsU0FBU0osSUFBVCxDQUFlLENBRXRCUCxNQUFNLENBQUNZLE1BQVAsQ0FBY0wsSUFBZCxDQUNBLENBaEJELEVBa0JBLE1BQU9QLENBQUFBLE1BQ1AsQ0F6Q29CLENBNkNyQmEsTUFBTSxDQUFFLGlCQUNSLENBQ0MsQ0EvQ29CLENBbURyQkMsT0FBTyxDQUFFLGtCQUNULENBQ08sR0FBTWQsQ0FBQUEsTUFBTSxDQUFHQyxDQUFDLENBQUNDLFFBQUYsRUFBZixDQUVBLEdBQUlhLENBQUFBLE1BQU0sQ0FBR0MsUUFBUSxDQUFDQyxPQUFULENBQWlCLFdBQWpCLElBQWtDLElBQWxDLEVBQTBDRCxRQUFRLENBQUNDLE9BQVQsQ0FBaUIsWUFBakIsSUFBbUMsSUFBMUYsQ0FFQSxHQUFHRixNQUFILENBQ0EsQ0FDSSxHQUFHLEtBQUtyQixHQUFSLENBQ0EsQ0FDSSxHQUFNd0IsQ0FBQUEsT0FBTyxDQUFHLEtBQUt4QixHQUFMLENBQVMsQ0FBVCxDQUFoQixDQUNBLEdBQU15QixDQUFBQSxNQUFNLENBQUcsS0FBS3pCLEdBQUwsQ0FBUyxDQUFULENBQWYsQ0FDQSxHQUFNMEIsQ0FBQUEsS0FBSyxDQUFHLEtBQUsxQixHQUFMLENBQVMsQ0FBVCxDQUFkLENBRUEsR0FBTTJCLENBQUFBLEtBQUssQ0FBRyxHQUFJLE1BQUtiLFNBQXZCLENBRUFhLEtBQUssQ0FBQ0MsTUFBTixDQUFhLHVDQUFiLENBQXFELENBQUNKLE9BQU8sQ0FBRUEsT0FBVixDQUFtQkMsTUFBTSxDQUFDQSxNQUExQixDQUFrQ0MsS0FBSyxDQUFFQSxLQUF6QyxDQUFyRCxFQUFzR2QsSUFBdEcsQ0FBMkcsVUFBVyxDQUVsSE4sTUFBTSxDQUFDVSxPQUFQLEVBRUgsQ0FKRCxFQUlHQyxJQUpILENBSVEsU0FBU1ksT0FBVCxDQUFrQixDQUV0QnZCLE1BQU0sQ0FBQ1ksTUFBUCxDQUFjVyxPQUFkLENBQ0gsQ0FQRCxDQVFILENBaEJELElBa0JBLENBQ0l2QixNQUFNLENBQUNZLE1BQVAsQ0FBYyxvQkFBZCxDQUNILENBQ0osQ0F2QkQsSUF5QkEsQ0FDSVgsQ0FBQyxDQUFDLHVDQUFELENBQUQsQ0FBMkN1QixLQUEzQyxFQUNILENBQ1AsQ0FyRm9CLENBeUZyQkMsUUFBUSxDQUFFLG1CQUNWLENBQ0l4QixDQUFDLENBQUMsdUNBQUQsQ0FBRCxDQUEyQ3VCLEtBQTNDLEVBQ0gsQ0E1Rm9CLENBQWIsQ0FBVCxDQXFHQSxHQUFJRSxDQUFBQSxRQUFRLENBQUcsR0FBSUMsQ0FBQUEsUUFBbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBXZWIgRnJhbWV3b3JrXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LVhYWFggVGhlIEFNSSBUZWFtIC8gTFBTQyAvIENOUlNcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiRBTUlDbGFzcygnQWRkZXJBcHAnLCB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGV4dGVuZHM6IGFtaS5TdWJBcHAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRvblJlYWR5OiBmdW5jdGlvbih1c2VyZGF0YSlcblx0e1xuICAgICAgICBpZih1c2VyZGF0YSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xSWQgPSBbXTtcblxuICAgICAgICAgICAgdXNlcmRhdGEuc3BsaXQoJywnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgdGhpcy5xSWQucHVzaChpdGVtLnRyaW0oKSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblx0XHR2YXIgcmVzdWx0ID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0YW1pV2ViQXBwLmxvYWRSZXNvdXJjZXMoW1xuXHRcdFx0J3N1YmFwcHMvQWRkZXIvY3NzL0FkZGVyQXBwLmNzcycsXG5cdFx0XHQnc3ViYXBwcy9BZGRlci90d2lnL0FkZGVyQXBwLnR3aWcnLFxuXHRcdFx0J2N0cmw6YWRkZXInXG5cdFx0XSwge2NvbnRleHQ6IHRoaXN9KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdCAgICB0aGlzLmFkZGVyQ3RybCA9IGRhdGFbMl07XG5cblx0XHRcdGFtaVdlYkFwcC5yZXBsYWNlSFRNTCgnI2FtaV9tYWluX2NvbnRlbnQnLCBkYXRhWzFdLCB7Y29udGV4dDogdGhpc30pLmRvbmUoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVzdWx0LnJlc29sdmUoKTtcblx0XHRcdH0pO1xuXG5cdFx0fSkuZmFpbChmdW5jdGlvbihkYXRhKSB7XG5cblx0XHRcdHJlc3VsdC5yZWplY3QoZGF0YSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25FeGl0OiBmdW5jdGlvbigpXG5cdHtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdG9uTG9naW46IGZ1bmN0aW9uKClcblx0e1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAgICAgdmFyIGVuYWJsZSA9IGFtaUxvZ2luLmhhc1JvbGUoJ0FNSV9BRE1JTicpID09PSB0cnVlIHx8IGFtaUxvZ2luLmhhc1JvbGUoJ0FNSV9XUklURVInKSA9PT0gdHJ1ZTtcblxuICAgICAgICBpZihlbmFibGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMucUlkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhdGFsb2cgPSB0aGlzLnFJZFswXTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLnFJZFsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMucUlkWzJdO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkZXIgPSBuZXcgdGhpcy5hZGRlckN0cmwoKTtcblxuICAgICAgICAgICAgICAgIGFkZGVyLnJlbmRlcignI0M5QkJDMThCXzI5NTlfQTQ4RV85MDU5XzlGQzA4RDY2NzkzNScse2NhdGFsb2c6IGNhdGFsb2csIGVudGl0eTplbnRpdHksIGZpZWxkOiBmaWVsZH0pLmRvbmUoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlc29sdmUoKTtcblxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24obWVzc2FnZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWplY3QobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlamVjdCgnTWlzc2luZyBwYXJhbWV0ZXJzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjQzlCQkMxOEJfMjk1OV9BNDhFXzkwNTlfOUZDMDhENjY3OTM1JykuZW1wdHkoKTtcbiAgICAgICAgfVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0b25Mb2dvdXQ6IGZ1bmN0aW9uKClcblx0e1xuXHQgICAgJCgnI0M5QkJDMThCXzI5NTlfQTQ4RV85MDU5XzlGQzA4RDY2NzkzNScpLmVtcHR5KCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIEdMT0JBTCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBhZGRlckFwcCA9IG5ldyBBZGRlckFwcCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
