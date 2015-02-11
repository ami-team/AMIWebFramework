/*!
 * AMICommand class
 *
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
/* BASE64                                                                  */
/*-------------------------------------------------------------------------*/

var _internal_base64KeyStr =
	'ABCDEFGHIJKLMNOP' +
	'QRSTUVWXYZabcdef' +
	'ghijklmnopqrstuv' +
	'wxyz0123456789+/' +
	'='
;

/*-------------------------------------------------------------------------*/

function amiBase64Decode(input) {

	var i = 0;
	var output = '';
	var chr1, chr2, chr3 = '';
	var enc1, enc2, enc3, enc4 = '';

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

	do {
		enc1 = _internal_base64KeyStr.indexOf(input.charAt(i++));
		enc2 = _internal_base64KeyStr.indexOf(input.charAt(i++));
		enc3 = _internal_base64KeyStr.indexOf(input.charAt(i++));
		enc4 = _internal_base64KeyStr.indexOf(input.charAt(i++));

		chr1 = ((enc1 & 255) << 2) | (enc2 >> 4);
		chr2 = ((enc2 &  15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 &   3) << 6) | (enc4 >> 0);

		output = output + String.fromCharCode(chr1);

		if(enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}

		if(enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = '';
		enc1 = enc2 = enc3 = enc4 = '';

	} while (i < input.length);

	return unescape(output);
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommand                                                        */
/*-------------------------------------------------------------------------*/

function AMICommand() {
	/*-----------------------------------------------------------------*/

	this.endpoint = 'http://xx.yy';
	this.converter = 'AMIXmlToJson.xsl';

	/*-----------------------------------------------------------------*/

	this.execute = function(command, settings) {

		var context = undefined;
		var endpoint = this.endpoint;
		var converter = this.converter;
		var extraParam = undefined;
		var extraValue = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}

			if('endpoint' in settings) {
				endpoint = settings['endpoint'];
			}

			if('converter' in settings) {
				converter = settings['converter'];
			}

			if('extraParam' in settings) {
				extraParam = settings['extraParam'];
			}

			if('extraValue' in settings) {
				extraValue = settings['extraValue'];
			}
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

		/*---------------------------------------------------------*/

		if(extraParam) {

			if(extraValue) {
				data[extraParam] = extraValue;
			} else {
				data[extraParam] = (((null)));
			}
		}

		/*---------------------------------------------------------*/

		var urlWithParameters = URL + '?' + $.param(data);

		/*---------------------------------------------------------*/

		var deferred = $.Deferred();

		/*---------------------------------------------------------*/

		if(CONVERTER === 'AMIXmlToJson.xsl') {
			/*-------------------------------------------------*/
			/* JSON FORMAT                                     */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: "POST",
				dataType: 'json',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					var error = amiWebApp.jspath('.AMIMessage.error', data);

					if(error.length === 0) {

						if(context) {
							deferred.resolveWith(context, [data, urlWithParameters]);
						} else {
							deferred.resolve(data, urlWithParameters);
						}
					} else {

						if(context) {
							deferred.rejectWith(context, [data, urlWithParameters]);
						} else {
							deferred.reject(data, urlWithParameters);
						}
					}
				},
				error: function(jqXHR, textStatus) {

					var data = {'AMIMessage': [{'error': [{'$': textStatus}]}]};

					if(context) {
						deferred.rejectWith(context, [data, urlWithParameters]);
					} else {
						deferred.reject(data, urlWithParameters);
					}
				},
			});

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/
			/* OTHER FORMATS                                   */
			/*-------------------------------------------------*/

			$.ajax({
				url: URL,
				data: data,
				type: "POST",
				dataType: 'text',
				xhrFields: {
					withCredentials: true
				},
				success: function(data) {

					if(context) {
						deferred.resolveWith(context, [data, urlWithParameters]);
					} else {
						deferred.resolve(data, urlWithParameters);
					}
				},
				error: function(jqXHR, textStatus) {

					if(context) {
						deferred.rejectWith(context, [textStatus, urlWithParameters]);
					} else {
						deferred.reject(textStatus, urlWithParameters);
					}
				},
			});

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return deferred.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.passLogin = function(user, pass, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="' + user + '" -AMIPass="' + pass + '"', {extraParam: 'NoCert'}).done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', data)[0];

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

	this.certLogin = function(settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo').done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', data)[0];

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

	this.logout = function(settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this.execute('GetSessionInfo -AMIUser="" -AMIPass=""').done(function(data) {

			var user = amiWebApp.jspath('..field{.@name==="AMIUser"}.$', data)[0];

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

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -attachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.detachCert = function(user, pass, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('GetSessionInfo -detachCert -amiLogin="' + user + '" -amiPassword="' + pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.addUser = function(firstName, lastName, email, user, pass, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('AddUser -firstName="' + firstName + '"-lastName="' + lastName + '" -email="' + email + '" -amiLogin="' + user + '" -amiPassword="' + pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changeInfo = function(firstName, lastName, email, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('SetUserInfo -firstName="' + firstName + '" -lastName="' + lastName + '" -email="' + email + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function(old_pass, new_pass, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('ChangePassword -amiPasswordOld="' + old_pass + '" -amiPasswordNew="' + new_pass + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.resetPass = function(user, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		return this.execute('ResetPassword -amiLogin="' + user + '"', {context: context});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.checkAuthorization = function(clazz, arguments, settings) {

		var command = 'CheckAuthorization -roleValidatorClass="' + clazz + '"';

		for(var argument in arguments) {
			command += '-' + argument + '="' + arguments[argument] + '"';
		}

		return amiCommand.execute(command, settings);
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommand = new AMICommand();

/*-------------------------------------------------------------------------*/
