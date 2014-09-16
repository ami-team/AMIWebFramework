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
/* CLASS AMIWebApp                                                         */
/*-------------------------------------------------------------------------*/

function AMIWebApp() {
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

				/*-----------------------------------------*/

				if(!(dict instanceof Array)) {
					dict = [dict];
				}

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
	/* APPLICATION ENTRY POINT                                         */
	/*-----------------------------------------------------------------*/

	this.start = function(settings) {

		var logo_url = 'img/logo.png';
		var home_url = 'http://ami.in2p3.fr';
		var contact_email = 'ami@lpsc.in2p3.fr';
		var template_filename = 'html/AMI/AMIWebApp_default.html';

		if(settings) {

			if('logo_url' in settings) {
				logo_url = settings['logo_url'];
			}

			if('home_url' in settings) {
				home_url = settings['home_url'];
			}

			if('contact_email' in settings) {
				contact_email = settings['contact_email'];
			}

			if('template_filename' in settings) {
				template_filename = settings['template_filename'];
			}
		}

		/*---------------------------------------------------------*/

		var dict = {
			LOGO_URL: logo_url,
			HOME_URL: home_url,
			CONTACT_EMAIL: contact_email,
		};

		/*---------------------------------------------------------*/

		$.ajax({url: template_filename, cache: false, dataType: 'html'}).done(function(data) {

			data = amiWebApp.formatHTML(data, {dict: dict});

			$('body').append(data).promise().done(amiWebApp.onStart);

		}).fail(function() {
			throw 'could not load `' + fragment + '`';
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* SUB APPLICATION LOADER                                          */
	/*-----------------------------------------------------------------*/

	this.loadSubApp = function(app) {
		/*---------------------------------------------------------*/

		if(app.onReady == undefined) {
			alert('error: `<app>.onReady()` must be implemented !');
			return;
		}

		if(app.onLogin == undefined) {
			alert('error: `<app>.onLogin()` must be implemented !');
			return;
		}

		if(app.onLogout == undefined) {
			alert('error: `<app>.onLogout()` must be implemented !');
			return;
		}

		if(app.onSessionExpired == undefined) {
			alert('error: `<app>.onSessionExpired()` must be implemented !');
			return;
		}

		/*---------------------------------------------------------*/

		this.onReady = app.onReady;
		this.onLogin = app.onReady;
		this.onLogout = app.onReady;
		this.onSessionExpired = app.onReady;

		/*---------------------------------------------------------*/

		amiLogin.start();

		/*---------------------------------------------------------*/
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
		'css/AMI/AMIWebApp.min.css',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT SCRIPTS               */
	/*-------------------------------*/

	this.loadScripts([
		'js/jspath.min.js',
		'js/bootstrap.min.js',
		'js/AMI/AMICookie.min.js',
		'js/AMI/AMICommand.min.js',
		'js/AMI/AMILogin.min.js',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT FRAGMENTS             */
	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/success.html',
		cache: false,
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
		cache: false,
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentError = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/error.html`';
	});

	/*-------------------------------*/
	/* ALIAS FOR `amiCookie.isLocal` */
	/*-------------------------------*/

	this.isLocal = amiCookie.isLocal;

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
