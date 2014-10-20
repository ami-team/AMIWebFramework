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
			cache: false,
			success: function() {
				scripts.splice(0, 1);
				_internal_loadScripts(deferred, context, scripts);
			},
			error: function(data, info) {

				if(context) {
					deferred.rejectWith(context, ['could not load script `' + scripts[0] + '`: ' + info]);
				} else {
					deferred.reject('could not load script `' + scripts[0] + '`: ' + info);
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
			cache: false,
			success: function() {
				$('head').append('<link rel="stylesheet" type="text/css" href="' + sheets[0] + '" />').promise().done(function() {
					sheets.splice(0, 1);
					_internal_loadSheets(deferred, context, sheets);
				});
			},
			error: function(data, info) {

				if(context) {
					deferred.rejectWith(context, ['could not load sheet `' + sheets[0] + '`: ' + info]);
				} else {
					deferred.reject('could not load sheet `' + sheets[0] + '`: ' + info);
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
		alert('error: `<app>.onReady()` must be implemented !');
	};

	/*-----------------------------------------------------------------*/

	this.currentSubApp = function() {

		this.onReady = function() {
			alert('error: `<sub application>.onReady()` must be implemented !');
		};

		this.onLogin = function() {
			alert('error: `<sub application>.onLogin()` must be implemented !');
		};

		this.onLogout = function() {
			alert('error: `<sub application>.onLogout()` must be implemented !');
		};

		this.onSessionExpired = function() {
			alert('error: `<sub application>.onSessionExpired()` must be implemented !');
		};
	};

	/*-----------------------------------------------------------------*/

	this.onReady = function() {
		return this.currentSubApp.onReady();
	};

	this.onLogin = function() {
		return this.currentSubApp.onLogin();
	};

	this.onLogout = function() {
		return this.currentSubApp.onLogout();
	};

	this.onSessionExpired = function() {
		return this.currentSubApp.onSessionExpired()
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

			$('body').append(amiWebApp.formatHTML(data, {dict: dict})).promise().done(function() {

				amiWebApp.appendHTML('ami_modal_content', '<div id="modal_lock"></div>');

				amiWebApp.onStart();
			});

		}).fail(function() {
			throw 'could not load `' + fragment + '`';
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.lock = function() {
		$('#modal_lock').css('display', 'block');
	};

	/*-----------------------------------------------------------------*/

	this.unlock = function() {
		$('#modal_lock').css('display', 'none');
	};

	/*-----------------------------------------------------------------*/

	this.success = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#ami_error_content .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/

	this.info = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', amiWebApp.fragmentInfo, {dict: {MESSAGE: message}});
		$('#ami_error_content .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/

	this.warning = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', amiWebApp.fragmentWarning, {dict: {MESSAGE: message}});
		$('#ami_error_content .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/

	this.error = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#ami_error_content .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/
	/* SUB APPLICATION LOADER                                          */
	/*-----------------------------------------------------------------*/

	this.loadSubApp = function(subApp) {
		/*---------------------------------------------------------*/

		if(!subApp.onReady) {
			alert('error: `<sub application>.onReady()` must be implemented !');
			return;
		}

		if(!subApp.onLogin) {
			alert('error: `<sub application>.onLogin()` must be implemented !');
			return;
		}

		if(!subApp.onLogout) {
			alert('error: `<sub application>.onLogout()` must be implemented !');
			return;
		}

		if(!subApp.onSessionExpired) {
			alert('error: `<sub application>.onSessionExpired()` must be implemented !');
			return;
		}

		/*---------------------------------------------------------*/

		this.currentSubApp = subApp;

		amiLogin.start();

		/*---------------------------------------------------------*/
	};

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
		url: 'html/AMI/Fragment/info.html',
		cache: false,
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentInfo = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/info.html`';
	});

	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/warning.html',
		cache: false,
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentError = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/warning.html`';
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
