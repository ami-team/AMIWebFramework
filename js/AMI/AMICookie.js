/*!
 * AMICookie class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMICookie                                                         */
/*-------------------------------------------------------------------------*/

function AMICookie() {
	/*-----------------------------------------------------------------*/

	this.local_cookies = {};

	/*-----------------------------------------------------------------*/

	this.isLocal = function() {

		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		;
	}

	/*-----------------------------------------------------------------*/
	/* SET A COOKIE                                                    */
	/*-----------------------------------------------------------------*/

	this.set = function(name, value, settings) {

		var path = undefined;
		var domain = undefined;
		var seconds = undefined;

		if(settings) {

			if('path' in settings) {
				pasth = settings['path'];
			}

			if('domain' in settings) {
				domain = settings['domain'];
			}

			if('seconds' in settings) {
				seconds = new Date(); seconds.setTime(seconds.getTime() + 1000 * settings['seconds']);
			}
		}

		/*---------------------------------------------------------*/

		if(this.isLocal()) {
			var expires = seconds ? seconds.getTime()
			                      : 99999999999999999
			;

			this.local_cookies[name] = {
				value: value,
				expires: expires,
			};

		} else {
			var cookie = name + '=' + value + ';';

			if(path) {
				cookie += 'path=' + path + ';';
			}

			if(domain) {
				cookie += 'domain=' + domain + ';';
			}

			if(seconds) {
				cookie += 'expires=' + seconds.toGMTString() + ';';
			}

			document.cookie = cookie;
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* GET A COOKIE                                                    */
	/*-----------------------------------------------------------------*/

	this.get = function(name) {

		if(this.isLocal()) {

			if(name in this.local_cookies) {
				var time = new Date().getTime();

				if(this.local_cookies[name]['expires'] > time) {
					return this.local_cookies[name]['value'];
				}
			}
		} else {
			var value = new RegExp(name + '=([^;]*);?').exec(document.cookie);

			if(value) {
				return decodeURIComponent(value[1]);
			}
		}

		return '';
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCookie = new AMICookie();

/*-------------------------------------------------------------------------*/
