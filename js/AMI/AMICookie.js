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
		var expires = undefined;

		if(settings) {

			if('path' in settings) {
				pasth = settings['path'];
			}

			if('domain' in settings) {
				domain = settings['domain'];
			}

			if('seconds' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * settings['seconds']);
			}

			if('minutes' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * 60 * settings['minutes']);
			}

			if('hours' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * 60 * 60 *settings['hours']);
			}

			if('days' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * settings['days']);
			}

			if('months' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 30 * settings['months']);
			}

			if('years' in settings) {
				expires = new Date(); expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * settings['years']);
			}
		}

		/*---------------------------------------------------------*/

		if(this.isLocal()) {
			var EXPIRES = expires ? expires.getTime()
			                      : 99999999999999999
			;

			this.local_cookies[name] = {
				value: value,
				expires: EXPIRES,
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
			name += '=';

			var item, L = document.cookie.split(';');

			for(var index = 0; index < L.length; index++) {

				for(item = L[index]; item.charAt(0) == ' ';) {
					item = item.substring(1);
				}

				if(item.indexOf(name) == 0) {
					return decodeURIComponent(item.substring(
						name.length
						,
						item.length
					));
				}
			}
		}

		return '';
	};

	/*-----------------------------------------------------------------*/

	this.del = function(name) {

		if(this.isLocal()) {

			if(name in this.local_cookies) {
				delete this.local_cookies[name];
			}
		} else {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		}
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCookie = new AMICookie();

/*-------------------------------------------------------------------------*/
