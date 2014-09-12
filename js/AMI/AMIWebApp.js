/*!
 * AMIWebApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _internal_loadScripts(deferred, context, scripts) {

	if(scripts.length > 0) {

		$.ajax({
			url: scripts[0],
			dataType: "script",
			async: false,
			success: function() {
				scripts.splice(0, 1);
				_internal_loadScripts(deferred, context, scripts);
			},
			error: function() {
				if(context) {
					deferred.rejectWith(context, ['could not load script `' + scripts[0] + '`']);
				} else {
					deferred.reject('could not load script `' + scripts[0] + '`');
				}
			},
		});
	} else {
		if(context) {
			deferred.resolveWith(context);
		} else {
			deferred.resolve();
		}
	}
}

/*-------------------------------------------------------------------------*/

function _internal_loadSheets(deferred, context, sheets) {

	if(sheets.length > 0) {

		$.ajax({
			url: sheets[0],
			type: 'HEAD',
			async: false,
			success: function() {
				$('head').append('<link rel="stylesheet" type="text/css" href="' + sheets[0] + '" />').promise().done(function() {
					sheets.splice(0, 1);
					_internal_loadSheets(deferred, context, sheets);
				});
			},
			error: function() {
				if(context) {
					deferred.rejectWith(context, ['could not load sheet `' + sheets[0] + '`']);
				} else {
					deferred.reject('could not load sheet `' + sheets[0] + '`');
				}
			},
		});
	} else {
		if(context) {
			deferred.resolveWith(context);
		} else {
			deferred.resolve();
		}
	}
}

/*-------------------------------------------------------------------------*/

function _internal_getExpires(seconds) {

	var result = new Date();

	result.setTime(result.getTime() + 1000 * seconds);

	return result;
}

/*-------------------------------------------------------------------------*/
/* CLASS AMIWebApp                                                         */
/*-------------------------------------------------------------------------*/

function AMIWebApp() {
	/*-----------------------------------------------------------------*/
	/* DYNAMIC JAVASCRIPT LOADING                                      */
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
	/* DYNAMIC JAVASCRIPT LOADING                                      */
	/*-----------------------------------------------------------------*/

	this.loadScripts = function(scripts, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		if(!(scripts instanceof Array)) {
			scripts = [scripts];
		}

		var result = $.Deferred();
		_internal_loadScripts(result, context, scripts);
		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* DYNAMIC CSS LOADING                                             */
	/*-----------------------------------------------------------------*/

	this.loadSheets = function(sheets, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		if(!(sheets instanceof Array)) {
			sheets = [sheets];
		}

		var result = $.Deferred();
		_internal_loadSheets(result, context, sheets);
		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* DYNAMIC HTML LOADING                                            */
	/*-----------------------------------------------------------------*/

	this.loadHTML = function(url, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		return $.ajax({
			url: url,
			cache: false,
			dataType: 'html',
			context: context,
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* REPLACE HTML CONTENT                                            */
	/*-----------------------------------------------------------------*/

	this.replaceHTML = function(targetID, html, settings) {

		var context = undefined;

		if(settings) {
			html = this.formatHTML(html, settings);

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		$('#' + targetID).html(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* APPEND HTML CONTENT                                             */
	/*-----------------------------------------------------------------*/

	this.prependHTML = function(targetID, html, settings) {

		var context = undefined;

		if(settings) {
			html = this.formatHTML(html, settings);

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		$('#' + targetID).prepend(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* APPEND HTML CONTENT                                             */
	/*-----------------------------------------------------------------*/

	this.appendHTML = function(targetID, html, settings) {

		var context = undefined;

		if(settings) {
			html = this.formatHTML(html, settings);

			if('context' in settings) {
				context = settings['context'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		$('#' + targetID).append(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* FORMAT HTML                                                     */
	/*-----------------------------------------------------------------*/

	this.formatHTML = function(html, settings) {

		if(settings) {

			if('dict' in settings) {
				var dict = settings['dict'];

				if(!(dict instanceof Array)) {
					dict = [dict];
				}

				/*-----------------------------------------*/
				/* FORMAT HTML                             */
				/*-----------------------------------------*/

				var result = '';

				$.each(dict, function(indx, DICT) {
					var frag = html;

					$.each(DICT, function(key, val) {
						frag = frag.replace(
							new RegExp('\%\%' + key + '\%\%', 'g'), val
						);
					});

					result += frag;
				});

				return result;

				/*-----------------------------------------*/
			}
		}

		return html;
	};

	/*-----------------------------------------------------------------*/

	this._internal_cookies = {};

	/*-----------------------------------------------------------------*/

	this.setCookie = function(name, value, settings) {

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
				seconds = settings['seconds'];
			}
		}

		/*---------------------------------------------------------*/

		if(this.isLocal()) {

			var expires = seconds ? _internal_getExpires(seconds).getTime() : Number.POSITIVE_INFINITY;

			this._internal_cookies[name] = {
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
				cookie += 'expires=' + _internal_getExpires(seconds).toGMTString() + ';';
			}

			document.cookie = cookie;
		}

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/

	this.getCookie = function(name) {

		if(this.isLocal()) {

			if(name in this._internal_cookies) {

				var data = this._internal_cookies[name];

				if(data['expires'] > new Date().getTime()) {
					return data['value'];
				}
			}
		} else {
			var value = new RegExp('(^| )' + name + '=([^;]*)(;|$)').exec(document.cookie);

			if(value) {
				return decodeURIComponent(value[1]);
			}
		}

		return '';
	}

	/*-----------------------------------------------------------------*/

	this.onStart = function() {
		alert('warning: method `amiWebApp.onStart()` must be overloaded !');
	};

	this.onReady = function() {
		alert('warning: method `amiWebApp.onReady()` must be overloaded !');
	};

	this.onLogin = function() {
		alert('warning: method `amiWebApp.onLogin()` must be overloaded !');
	};

	this.onLogout = function() {
		alert('warning: method `amiWebApp.onLogout()` must be overloaded !');
	};

	this.onSessionExpired  = function() {
		alert('warning: method `amiWebApp.onSessionExpired()` must be overloaded !');
	};

	/*-----------------------------------------------------------------*/

	this.start = function() {

		$('body').prepend('<div id="modal"></div>');
		$('body').prepend('<div id="main"></div>');

		$(document).ready(function() {
			amiWebApp.onStart();
		});
	}

	/*-----------------------------------------------------------------*/
	/* CONSTRUCTOR                                                     */
	/*-----------------------------------------------------------------*/

	/*-------------------------------*/
	/* DEFAULT SHEETS                */
	/*-------------------------------*/

	this.loadSheets([
		'css/bootstrap.min.css',
		'css/font-awesome.min.css',
		'css/AMI/AMIWebApp.css',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT SCRIPTS               */
	/*-------------------------------*/

	this.loadScripts([
		'js/jspath.min.js',
		'js/bootstrap.min.js',
		'js/AMI/AMILogin.min.js',
		'js/AMI/AMICommand.min.js',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT FRAGMENTS             */
	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/success.html',
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentSuccess = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/success.html`';
	});

	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/error.html',
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentError = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/error.html`';
	});

	/*-------------------------------*/
	/* ALIAS FOR `JSPath.apply`      */
	/*-------------------------------*/

	this.jspath = JSPath.apply;

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiWebApp = new AMIWebApp();

/*-------------------------------------------------------------------------*/
