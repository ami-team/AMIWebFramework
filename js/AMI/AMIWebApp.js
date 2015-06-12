/*!
 * AMIWebApp class
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var _ami_internal_nonce = jQuery.now();

/*-------------------------------------------------------------------------*/

var _ami_internal_scripts = [];
var _ami_internal_sheets = [];

/*-------------------------------------------------------------------------*/
/* CLASS AMIWebApp                                                         */
/*-------------------------------------------------------------------------*/

function AMIWebApp() {
	/*-----------------------------------------------------------------*/
	/* TOOLS                                                           */
	/*-----------------------------------------------------------------*/

	this.isLocal = function() {

		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		;
	};

	/*-----------------------------------------------------------------*/

	this.textToHtml = function(s) {
		return s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	};

	this.htmlToText = function(s) {
		return s.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
	};

	/*-----------------------------------------------------------------*/

	this.textToString = function(s) {
		return s.replace(/\\/g, '\\\\').replace(/"/g, '\\\"').replace(/'/g, '\\\'');
	};

	this.stringToText = function(s) {
		return s.replace(/\\'/g, '\'').replace(/\\"/g, '\"').replace(/\\\\/g, '\\');
	};

	/*-----------------------------------------------------------------*/

	this.htmlToString = function(s) {
		return s.replace(/\\/g, '\\\\').replace(/&quot;/g, '\\\&quot;').replace(/'/g, '\\\'');
	};

	this.stringToHtml = function(s) {
		return s.replace(/\\'/g, '\'').replace(/\\&quot;/g, '\&quot;').replace(/\\\\/g, '\\');
	};

	/*-----------------------------------------------------------------*/
	/* DYNAMIC SCRIPT LOADING                                          */
	/*-----------------------------------------------------------------*/

	this.loadScripts = function(scripts, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var html = '';

		if(!(scripts instanceof Array)) {
			scripts = [scripts];
		}

		for(var i = 0; i < scripts.length; i++) {

			if($.inArray(scripts[i], _ami_internal_scripts) < 0) {
				_ami_internal_scripts.push(scripts[i]);
				html += '<script type="text/javascript" src="' + scripts[i] + '?_=' + _ami_internal_nonce++ + '"></script>';
			}
		}

		$('head').append(html).promise().done(function() {

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		return result.promise();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
	/* DYNAMIC SHEET LOADING                                           */
	/*-----------------------------------------------------------------*/

	this.loadSheets = function(sheets, settings) {

		var context = undefined;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var html = '';

		if(!(sheets instanceof Array)) {
			sheets = [sheets];
		}

		for(var i = 0; i < sheets.length; i++) {

			if($.inArray(sheets[i], _ami_internal_sheets) < 0) {
				_ami_internal_sheets.push(sheets[i]);
				html += '<link rel="stylesheet" type="text/css" href="' + sheets[i] + '?_=' + _ami_internal_nonce++ + '"></link>';
			}
		}

		$('head').append(html).promise().done(function() {

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

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

		var target = $('#' + targetID);

		target.html(html).promise().done(function() {

			target.find('.amitt').tooltip({delay: {show: 500, hide: 100}});
			target.find('.amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			target.find('.amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

			target.find('.ami-select').each(function() {
				$(this).wrap('<div class="ami-select-wrapper"></div>');
			});

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

		var target = $('#' + targetID);

		target.prepend(html).promise().done(function() {

			target.find('.amitt').tooltip({delay: {show: 500, hide: 100}});
			target.find('.amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			target.find('.amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

			target.find('.ami-select').each(function() {
				$(this).wrap('<div class="ami-select-wrapper"></div>');
			});

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

		var target = $('#' + targetID);

		target.append(html).promise().done(function() {

			target.find('.amitt').tooltip({delay: {show: 500, hide: 100}});
			target.find('.amipo[tabindex="0"]').popover({html: true, trigger: 'focus'});
			target.find('.amipo[tabindex!="0"]').popover({html: true, trigger: 'click'});

			target.find('.ami-select').each(function() {
				$(this).wrap('<div class="ami-select-wrapper"></div>');
			});

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

		html = html.replace('%%ORIGIN_URL%%', this.originURL);
		html = html.replace('%%WEBAPP_URL%%', this.webappURL);

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

	this.onToolbarUpdateNeeded = function() {
		alert('error: `<app>.onToolBarUpdateNeeded()` must be implemented !');
 	};

	/*-----------------------------------------------------------------*/

	this._currentSubAppInstance = new function() {

		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	};

	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {
		return this._currentSubAppInstance.onReady(userdata);
	};

	this.onExit = function() {
		return this._currentSubAppInstance.onExit();
	};

	this.onLogin = function() {
		var result = this._currentSubAppInstance.onLogin();
		this.onToolbarUpdateNeeded();
		return result;
	};

	this.onLogout = function() {
		var result = this._currentSubAppInstance.onLogout();
		this.onToolbarUpdateNeeded();
		return result;
	};

	/*-----------------------------------------------------------------*/
	/* APPLICATION ENTRY POINT                                         */
	/*-----------------------------------------------------------------*/

	this.start = function(settings) {

		var logo_url = 'images/logo.png';
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

			if('locker_filename' in settings) {
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

	this.success = function(message, fadeOut) {

		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentSuccess, {dict: {MESSAGE: message}});

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	};

	/*-----------------------------------------------------------------*/

	this.info = function(message, fadeOut) {

		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentInfo, {dict: {MESSAGE: message}});

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	};

	/*-----------------------------------------------------------------*/

	this.warning = function(message, fadeOut) {

		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentWarning, {dict: {MESSAGE: message}});

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	};

	/*-----------------------------------------------------------------*/

	this.error = function(message, fadeOut) {

		this.unlock();
		this.replaceHTML('ami_status_content', this.fragmentError, {dict: {MESSAGE: message}});

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	};

	/*-----------------------------------------------------------------*/

	this.flush = function() {

		$('#ami_status_content').empty();
	};

	/*-----------------------------------------------------------------*/
	/* SUB APPLICATIONS                                                */
	/*-----------------------------------------------------------------*/

	this._subAppDict = {};

	/*-----------------------------------------------------------------*/

	this.registerSubApp = function(subAppName, subAppInstance, subAppMethods) {

		this._subAppDict[subAppName] = {
			instance: subAppInstance,
			methods: subAppMethods,
		};
	};

	/*-----------------------------------------------------------------*/

	this.runSubApp = function(subAppInstance, userdata) {
		/*---------------------------------------------------------*/

		if(!subAppInstance.onReady) {
			alert('error: `<sub application>.onReady()` must be implemented !');
			return;
		}

		if(!subAppInstance.onExit) {
			alert('error: `<sub application>.onExit()` must be implemented !');
			return;
		}

		if(!subAppInstance.onLogin) {
			alert('error: `<sub application>.onLogin()` must be implemented !');
			return;
		}

		if(!subAppInstance.onLogout) {
			alert('error: `<sub application>.onLogout()` must be implemented !');
			return;
		}

		/*---------------------------------------------------------*/

		this._currentSubAppInstance.onExit();

		this._currentSubAppInstance = subAppInstance;

		amiLogin.runSubApp(userdata);

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
		'css/bootstrap.vertical-tabs.min.css',
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
		'js/AMI/AMICommand.min.js',
		'js/AMI/AMILogin.min.js',
		'js/AMI/AMITokenizer.min.js',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT FRAGMENTS             */
	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/alert_success.html',
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
		url: 'html/AMI/Fragment/alert_info.html',
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
		url: 'html/AMI/Fragment/alert_warning.html',
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
		url: 'html/AMI/Fragment/alert_error.html',
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
	/* ALIAS FOR `JSPath.apply`      */
	/*-------------------------------*/

	this.jspath = JSPath.apply;

	/*-------------------------------*/
	/* BASE URL                      */
	/*-------------------------------*/

	this.originURL = window.location.origin
	;

	this.webappURL = window.location.origin
	                 +
	                 window.location.pathname
	;

	/*-------------------------------*/

	while(this.originURL.charAt(this.originURL.length - 1) === '/') {

		this.originURL = this.originURL.substring(0, this.originURL.length - 1);
	}

	while(this.webappURL.charAt(this.webappURL.length - 1) === '/') {

		this.webappURL = this.webappURL.substring(0, this.webappURL.length - 1);
	}

	/*-------------------------------*/
	/* ARGS                          */
	/*-------------------------------*/

	this.args = {};

	if(window.location.search.length !== '') {

		var urlParams = window.location.search.substring(1).split('&');

 		for(var i = 0; i < urlParams.length; i++) {

 			var pair = urlParams[i].split('=');

 			this.args[pair[0]] = pair[1];
 		}
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiWebApp = new AMIWebApp();

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

(function($) {
	/*-----------------------------------------------------------------*/

	$.foreach = function(elements, func, context) {

		$.each(elements, function(index, element) {

			func.apply(context || element, [index, element]);
		});
	};

	/*-----------------------------------------------------------------*/
} (jQuery));

/*-------------------------------------------------------------------------*/
