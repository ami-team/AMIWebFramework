/*!
 * AMICommand class
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 * In "$CATALINA_HOME/lib", copy:
 ** java-property-utils-x.x.x.jar
 ** cors-filter-x.x.x.jar
 *
 * In "$CATALINA_HOME/conf/web.xml", write:
 **  <filter>
 **    <filter-name>CORS</filter-name>
 **    <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
 **    <init-param>
 **      <param-name>cors.allowed.methods</param-name>
 **      <param-value>GET,POST</param-value>
 **    </init-param>
 **    <init-param>
 **      <param-name>cors.support.credentials</param-name>
 **      <param-value>true</param-value>
 **    </init-param>
 **  </filter>
 **
 **  <filter-mapping>
 **    <filter-name>CORS</filter-name>
 **    <url-pattern>/*</url-pattern>
 **  </filter-mapping>
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMICommand                                                        */
/*-------------------------------------------------------------------------*/

var COMMAND_FLAGS_ALWAYS = 64
var COMMAND_FLAGS_LOGOUT = 65

/*-------------------------------------------------------------------------*/

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.noCert = false;

	/*-----------------------------------------------------------------*/

	this.endPoint = 'http://xx.yy';
	this.converter = 'AMIXmlToJson.xsl';

	/*-----------------------------------------------------------------*/

	this.execute = function(command, settings) {

		var flags = 0x00;
		var context = undefined;
		var endpoint = this.endPoint;
		var converter = this.converter;

		if(settings) {

			if('flags' in settings) {
				flags = settings['flags'];
			}

			if('context' in settings) {
				context = settings['context'];
			}

			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}
		}

		/*---------------------------------------------------------*/

		/**/ if(flags == 0x000000000000000000) {

			if(amiCookie.get('AMI_SESSION') != 'ACTIVE') {
				amiWebApp.replaceHTML('ami_login_content', amiLogin.fragmentLoginButton);

				amiWebApp.onSessionExpired();
			} else {
				amiCookie.set('AMI_SESSION', 'ACTIVE', {minutes: 25});
			}
		}
		else if(flags == COMMAND_FLAGS_ALWAYS) {
			amiCookie.set('AMI_SESSION', 'ACTIVE', {minutes: 25});
		}
		else if(flags == COMMAND_FLAGS_LOGOUT) {
			amiCookie.del('AMI_SESSION');
		}

		/*---------------------------------------------------------*/

		var URL = endpoint.trim();
		var COMMAND = command.trim();
		var CONVERTER = converter.trim();

		/*---------------------------------------------------------*/

		data = {
			Command: COMMAND,
			Converter: CONVERTER,
		}

		if(this.noCert) {
			data['NoCert'] = '';
		}

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		/*---------------------------------------------------------*/

		$.ajax({
			url: URL,
			data: data,
			type: "POST",
			dataType: 'json',
			xhrFields: {
				withCredentials: true,
 			},
		}).done(function(data) {

			var error = amiWebApp.jspath('..error', data);

			if(error.length == 0) {

				if(context) {
					deferred.resolveWith(context, [data]);
				} else {
					deferred.resolve(data);
				}
			} else {

				if(context) {
					deferred.rejectWith(context, [data]);
				} else {
					deferred.reject(data);
				}
			}
		}).fail(function(data) {

			if(context) {
				deferred.rejectWith(context, [data]);
			} else {
				deferred.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.passLogin = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = true;

		this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

 	this.certLogin = function(settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = false;

		this.execute('GetSessionInfo', {flags: COMMAND_FLAGS_ALWAYS}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

	this.logout = function(settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.noCert = true;

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""', {flags: COMMAND_FLAGS_LOGOUT}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="amiLogin"}.$', data)[0];

			if(context) {
				result.resolveWith(context, [data, user]);
			} else {
				result.resolve(data, user);
			}
		}).fail(function(data) {

			if(context) {
				result.rejectWith(context, [data]);
			} else {
				result.reject(data);
			}
		});

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.attachCert = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -attachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS, context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.detachCert = function(user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -detachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {flags: COMMAND_FLAGS_ALWAYS, context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.addUser = function(firstName, lastName, email, user, pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('AddUser -firstName="' + firstName + '"-lastName="' + lastName + '" -email="' + email + '" -amiLogin="' + user + '" -amiPassword="' + pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changeInfo = function(firstName, lastName, email, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('SetUserInfo -firstName="' + firstName + '" -lastName="' + lastName + '" -email="' + email + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function(old_pass, new_pass, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('ChangePassword -amiPasswordOld="' + old_pass + '" -amiPasswordNew="' + new_pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.resetPass = function(user, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return this.execute('ResetPassword -amiLogin="' + user + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
