/*!
 * AMIWebApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var _internal_nonce = jQuery.now();

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _internal_loadScripts(deferred, context, scripts) {

	var html = '';

	for(var i = 0; i < scripts.length; i++) {
		html += '<script type="text/javascript" src="' + scripts[i] + '?_=' + _internal_nonce++ + '"></script>';
	}

	$('head').append(html).promise().done(function() {

		if(context) {
			deferred.resolveWith(context);
		} else {
			deferred.resolve();
		}
	});
}

/*-------------------------------------------------------------------------*/

function _internal_loadSheets(deferred, context, sheets) {

	var html = '';

	for(var i = 0; i < sheets.length; i++) {
		html += '<link rel="stylesheet" type="text/css" href="' + sheets[i] + '?_=' + _internal_nonce++ + '"></link>';
	}

	$('head').append(html).promise().done(function() {

		if(context) {
			deferred.resolveWith(context);
		} else {
			deferred.resolve();
		}
	});
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

		if(settings && 'context' in settings) {
			context = settings['context'];
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

		if(settings && 'context' in settings) {
			context = settings['context'];
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

		if(settings && 'context' in settings) {
			context = settings['context'];
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
			$("#" + targetID + ' .amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			$("#" + targetID + ' .amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

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
			$("#" + targetID + ' .amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			$("#" + targetID + ' .amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

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
			$("#" + targetID + ' .amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			$("#" + targetID + ' .amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

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

		if(settings && 'dict' in settings) {

			var dict = settings['dict'];

			if(dict) {
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
	};

	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {
		return this.currentSubApp.onReady(userdata);
	};

	this.onLogin = function() {
		return this.currentSubApp.onLogin();
	};

	this.onLogout = function() {
		return this.currentSubApp.onLogout();
	};

	/*-----------------------------------------------------------------*/
	/* APPLICATION ENTRY POINT                                         */
	/*-----------------------------------------------------------------*/

	this.start = function(settings) {

		var logo_url = 'img/logo.png';
		var home_url = 'http://ami.in2p3.fr';
		var contact_email = 'ami@lpsc.in2p3.fr';
		var template_filename = 'html/AMI/AMIWebApp_default.html';
		var locker_filename = 'html/AMI/Fragment/locker.html';

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

			if('locker_filename' in settingd) {
				locker_filename = settings['locker_filename'];
			}
		}

		/*---------------------------------------------------------*/

		var dict = {
			LOGO_URL: logo_url,
			HOME_URL: home_url,
			CONTACT_EMAIL: contact_email,
		};

		/*---------------------------------------------------------*/

		$.ajax({url: template_filename, cache: false, dataType: 'html'}).done(function(data1) {
			$.ajax({url: locker_filename, cache: false, dataType: 'html'}).done(function(data2) {

				var content = amiWebApp.formatHTML(data1, {dict: dict}) + data2;

				$('body').append(content).promise().done(function() {

					amiWebApp.onStart();
				});

			}).fail(function() {
				throw 'could not load `' + locker_filename + '`';
			});
		}).fail(function() {
			throw 'could not load `' + template_filename + '`';
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.lock = function() {
		$('#ami_locker').css('display', 'block');
	};

	/*-----------------------------------------------------------------*/

	this.unlock = function() {
		$('#ami_locker').css('display', 'none');
	};

	/*-----------------------------------------------------------------*/

	this.success = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#ami_status_content .alert').fadeOut(60000);
		$(document).scrollTop(0);
	};

	/*-----------------------------------------------------------------*/

	this.info = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentInfo, {dict: {MESSAGE: message}});
		$('#ami_status_content .alert').fadeOut(60000);
		$(document).scrollTop(0);
	};

	/*-----------------------------------------------------------------*/

	this.warning = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentWarning, {dict: {MESSAGE: message}});
		$('#ami_status_content .alert').fadeOut(60000);
		$(document).scrollTop(0);
	};

	/*-----------------------------------------------------------------*/

	this.error = function(message) {
		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentError, {dict: {MESSAGE: message}});
		$('#ami_status_content .alert').fadeOut(60000);
		$(document).scrollTop(0);
	};

	/*-----------------------------------------------------------------*/

	this.flush = function() {
		$('#ami_status_content').empty();
	};

	/*-----------------------------------------------------------------*/
	/* SUB APPLICATION LOADER                                          */
	/*-----------------------------------------------------------------*/

	this.loadSubApp = function(subApp, userdata) {
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

		/*---------------------------------------------------------*/

		this.currentSubApp = subApp;

		amiLogin.start(userdata);

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
		this.fragmentWarning = data;
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
