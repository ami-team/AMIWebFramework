/*!
 * amiWebApp
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

var _ami_internal_subAppDict = {};

/*-------------------------------------------------------------------------*/

var _ami_internal_scripts = [];
var _ami_internal_sheets = [];

/*-------------------------------------------------------------------------*/
/* GLOBAL FUNCTIONS                                                        */
/*-------------------------------------------------------------------------*/

/**
  * Register a sub-application
  * @param {string} subAppName the sub-application name
  * @param {string} subAppInstance the sub-application instance
  */

function amiRegisterSubApp(subAppName, subAppInstance) {

	_ami_internal_subAppDict[subAppName.toLowerCase()] = subAppInstance;
}

/*-------------------------------------------------------------------------*/
/* amiWebApp                                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */

var amiWebApp = {
	/*-----------------------------------------------------------------*/
	/* TOOLS                                                           */
	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1) or not
	  * @returns True or False
	  */

	isLocal: function() {

		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to HTML
	  * @param {string} s the unescaped string
	  * @returns The escaped string
	  */

	textToHtml: function(s) {
		return s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},

	/**
	  * Unescapes the given string from HTML to text
	  * @param {string} s the escaped string
	  * @returns The unescaped string
	  */

	htmlToText: function(s) {
		return s.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {string} s the unescaped string
	  * @returns The escaped string
	  */

	textToString: function(s) {
		return s.replace(/\\/g, '\\\\').replace(/"/g, '\\\"').replace(/'/g, '\\\'');
	},

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {string} s the escaped string
	  * @returns The unescaped string
	  */

	stringToText: function(s) {
		return s.replace(/\\'/g, '\'').replace(/\\"/g, '\"').replace(/\\\\/g, '\\');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {string} s the unescaped string
	  * @returns The escaped string
	  */

	htmlToString: function(s) {
		return s.replace(/\\/g, '\\\\').replace(/&quot;/g, '\\&quot;').replace(/'/g, '\\\'');
	},

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {string} s the escaped string
	  * @returns The unescaped string
	  */

	stringToHtml: function(s) {
		return s.replace(/\\'/g, '\'').replace(/\\&quot;/g, '&quot;').replace(/\\\\/g, '\\');
	},

	/*-----------------------------------------------------------------*/
	/* DYNAMIC SCRIPT LOADING                                          */
	/*-----------------------------------------------------------------*/

	/**
	  * Loads JavaScript scripts asynchronously
	  * @param {string|array} scripts the list of scripts
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	loadScripts: function(scripts, settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		if(!(scripts instanceof Array)) {
			scripts = [scripts];
		}

		/*---------------------------------------------------------*/

		var html = '';

		for(var i = 0; i < scripts.length; i++) {

			if($.inArray(scripts[i], _ami_internal_scripts) < 0) {

				_ami_internal_scripts.push(scripts[i]);

				html += '<script type="text/javascript" src="' + scripts[i] + '?_=' + _ami_internal_nonce++ + '"></script>';
			}
		}

		/*---------------------------------------------------------*/

		$('head').append(html).promise().done(function() {

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* DYNAMIC SHEET LOADING                                           */
	/*-----------------------------------------------------------------*/

	/**
	  * Loads CSS sheets asynchronously
	  * @param {string|array} sheets the list of sheets
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	loadSheets: function(sheets, settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		if(!(sheets instanceof Array)) {
			sheets = [sheets];
		}

		/*---------------------------------------------------------*/

		var html = '';

		for(var i = 0; i < sheets.length; i++) {

			if($.inArray(sheets[i], _ami_internal_sheets) < 0) {

				_ami_internal_sheets.push(sheets[i]);

				html += '<link rel="stylesheet" type="text/css" href="' + sheets[i] + '?_=' + _ami_internal_nonce++ + '"></link>';
			}
		}

		/*---------------------------------------------------------*/

		$('head').append(html).promise().done(function() {

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* DYNAMIC HTML LOADING                                            */
	/*-----------------------------------------------------------------*/

	_loadHTMLs: function(deferred, array, urls, context) {

		if(urls.length > 0) {

			var url = urls.shift();

			$.ajax({
				url: url,
				cache: false,
				dataType: 'html',

			}).done(function(data) {

				array.push(data);

				amiWebApp._loadHTMLs(deferred, array, urls, context);

			}).fail(function() {

				if(context) {
					deferred.rejectWith(context, ['could not load `' + url + '`']);
				} else {
					deferred.reject('could not load `' + url + '`');
				}
			});
		} else {

			if(context) {
				deferred.resolveWith(context, [array]);
			} else {
				deferred.resolve(array);
			}
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads HTML fragments asynchronously
	  * @param {string|array} fragments the list of fragments
	  * @param {object} [settings] dictionary of settings (context)
	  * @returns A JQuery deferred object
	  */

	loadHTMLs: function(fragments, settings) {

		var context = null;

		if(settings && 'context' in settings) {
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		if(!(fragments instanceof Array)) {
			fragments = [fragments];
		}

		/*---------------------------------------------------------*/

		amiWebApp._loadHTMLs(result, [], fragments, context);

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	originRegExp: /%%\s*ORIGIN_URL\s*%%/g,
	webappRegExp: /%%\s*WEBAPP_URL\s*%%/g,

	/*-----------------------------------------------------------------*/

	/**
	  * Replace the HTML content of the given target
	  * @param {string} path the target path
	  * @param {string} html the HTML fragment
	  * @param {object} [settings] dictionary of settings (context, dict)
	  * @returns A JQuery deferred object
	  */

	replaceHTML: function(selector, html, settings) {

		html = html.replace(amiWebApp.originRegExp, amiWebApp.originURL);
		html = html.replace(amiWebApp.webappRegExp, amiWebApp.webAppURL);

		var context = null;
		var dict = null;

		if(settings) {
		
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		html = amiWebApp.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var target = $(selector);

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
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Prepends a HTML fragment to the given target content
	  * @param {string} path the target path
	  * @param {string} html the HTML fragment
	  * @param {object} [settings] dictionary of settings (context, dict)
	  * @returns A JQuery deferred object
	  */

	prependHTML: function(selector, html, settings) {

		html = html.replace(amiWebApp.originRegExp, amiWebApp.originURL);
		html = html.replace(amiWebApp.webappRegExp, amiWebApp.webAppURL);

		var context = null;
		var dict = null;

		if(settings) {
		
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		html = amiWebApp.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var target = $(selector);

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
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Appends a HTML fragment to the given target content
	  * @param {string} path the target path
	  * @param {string} html the HTML fragment
	  * @param {object} [settings] dictionary of settings (context, dict)
	  * @returns A JQuery deferred object
	  */

	appendHTML: function(selector, html, settings) {

		html = html.replace(amiWebApp.originRegExp, amiWebApp.originURL);
		html = html.replace(amiWebApp.webappRegExp, amiWebApp.webAppURL);

		var context = null;
		var dict = null;

		if(settings) {
		
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		html = amiWebApp.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var target = $(selector);

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
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Format the given HTML fragment using TWIG, see: {@link http://twig.sensiolabs.org/documentation}
	  * @param {string} html the HTML fragment
	  * @param {object} [dict] the dictionary
	  * @returns The formated HTML fragment
	  */

	formatHTML: function(html, dict) {

		if(dict instanceof Array) {

			var result = '';

			$.each(dict, function(indx, DICT) {

				result += amiTwig.render(html, DICT);
			});

			return result;

		} else {
			return amiTwig.render(html, dict);
		}
	},

	/*-----------------------------------------------------------------*/
	/* JSPATH                                                          */
	/*-----------------------------------------------------------------*/

	/**
	  * Finds data within the given JSON, see: {@link https://github.com/dfilatov/jspath}
	  * @param {string} path the path
	  * @param {json} json the JSON
	  * @param {object} [substs] substitutions
	  * @returns The resulting array
	  */

	jspath: function(path, json, substs) {

		return JSPath.apply(path, json, substs);
	},

	/*-----------------------------------------------------------------*/
	/* LOCK                                                            */
	/*-----------------------------------------------------------------*/

	/**
	  * Locks the web application
	  */

	lock: function() {

		$('#ami_locker').css('display', 'block');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unlocks the web application
	  */

	unlock: function() {

		$('#ami_locker').css('display', 'none');
	},

	/*-----------------------------------------------------------------*/
	/* MESSAGES                                                        */
	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'success' message
	  * @param {string} message the message
	  * @param {bool} [fadeOut=false] if 'true', the message disappears after 60s
	  */

	success: function(message, fadeOut) {

		amiWebApp.replaceHTML('#ami_status_content', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		amiWebApp.unlock();

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'info' message
	  * @param {string} message the message
	  * @param {bool} [fadeOut=false] if 'true', the message disappears after 60s
	  */

	info: function(message, fadeOut) {

		amiWebApp.replaceHTML('#ami_status_content', amiWebApp.fragmentInfo, {dict: {MESSAGE: message}});
		amiWebApp.unlock();

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'warning' message
	  * @param {string} message the message
	  * @param {bool} [fadeOut=false] if 'true', the message disappears after 60s
	  */

	warning: function(message, fadeOut) {

		amiWebApp.replaceHTML('#ami_status_content', amiWebApp.fragmentWarning, {dict: {MESSAGE: message}});
		amiWebApp.unlock();

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'error' message
	  * @param {string} message the message
	  * @param {bool} [fadeOut=false] if 'true', the message disappears after 60s
	  */

	error: function(message, fadeOut) {

		amiWebApp.replaceHTML('#ami_status_content', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		amiWebApp.unlock();

		$(document).scrollTop(0);

		if(fadeOut) {
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Flush messages
	  */

	flush: function() {

		$('#ami_status_content').empty();
	},

	/*-----------------------------------------------------------------*/
	/* WEB APPLICATION                                                 */
	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the web application starts
	  * @event amiWebApp#onStart
	  */

	onStart: function() {
		alert('error: `amiWebApp.onStart()` must be overloaded!');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the toolbar needs to be updated
	  * @event amiWebApp#onToolbarUpdateNeeded
	  */

	onToolbarUpdateNeeded: function() {
		alert('error: `amiWebApp.onToolbarUpdateNeeded()` must be overloaded!');
 	},

	/*-----------------------------------------------------------------*/

	/**
	  * Starts the web application
	  * @param {object} [settings] dictionary of settings (logo_url, home_url, contact_email, template_filename, locker_filename)
	  */

	start: function(settings) {

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
				alert('Network lag, could not load `' + locker_filename + '`, please try reloading the page...');
			});
		}).fail(function() {
			alert('Network lag, could not load `' + template_filename + '`, please try reloading the page...');
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* SUB-APPLICATIONS                                                */
	/*-----------------------------------------------------------------*/

	_currentSubAppInstance: new function() {

		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	},

	/*-----------------------------------------------------------------*/

	onReady: function(userdata) {
		return amiWebApp._currentSubAppInstance.onReady(userdata);
	},

	onExit: function() {
		return amiWebApp._currentSubAppInstance.onExit();
	},

	onLogin: function() {
		var result = amiWebApp._currentSubAppInstance.onLogin();
		amiWebApp.onToolbarUpdateNeeded();
		return result;
	},

	onLogout: function() {
		var result = amiWebApp._currentSubAppInstance.onLogout();
		amiWebApp.onToolbarUpdateNeeded();
		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the current sub-application instance
	  * @return The current sub-application instance
	  */

	getCurrentSubAppInstance: function() {

		return amiWebApp._currentSubAppInstance;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Set the current sub-application instance
	  * @param {class} subAppInstance the application instance
	  * @param {variant} [userdata] userdata
	  */

	setCurrentSubAppInstance: function(subAppInstance, userdata) {
		/*---------------------------------------------------------*/
		/* CHECK SUB-APPLICATION                                   */
		/*---------------------------------------------------------*/

		if(!subAppInstance.onReady) {
			alert('error: `<sub application>.onReady()` must be implemented!');
			return;
		}

		if(!subAppInstance.onExit) {
			alert('error: `<sub application>.onExit()` must be implemented!');
			return;
		}

		if(!subAppInstance.onLogin) {
			alert('error: `<sub application>.onLogin()` must be implemented!');
			return;
		}

		if(!subAppInstance.onLogout) {
			alert('error: `<sub application>.onLogout()` must be implemented!');
			return;
		}

		/*---------------------------------------------------------*/
		/* SWITCH SUB-APPLICATION                                  */
		/*---------------------------------------------------------*/

		amiWebApp._currentSubAppInstance.onExit();

		amiWebApp._currentSubAppInstance = subAppInstance;

		amiLogin.runSubApp(userdata);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Runs the sub-application according to the URL (parameters 'subapp' and 'userdata')
	  * @param {string} home the name of the home sub-application
	  */

	autoRunSubApp: function(home) {

		var subapp = amiWebApp.args['subapp'] || home;
		var userdata = amiWebApp.args['userdata'] || null;

		if(subapp) {
			subapp = subapp.toLowerCase();

			if(subapp in _ami_internal_subAppDict) {

				amiWebApp.setCurrentSubAppInstance(_ami_internal_subAppDict[subapp], userdata);
			}
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* CONSTRUCTOR                                                             */
/*-------------------------------------------------------------------------*/

try {
	/*-------------------------------*/
	/* DEFAULT SHEETS                */
	/*-------------------------------*/

	amiWebApp.loadSheets([
		/* Third-party */
		'css/bootstrap.min.css',
		'css/bootstrap-editable.min.css',
		'css/bootstrap.vertical-tabs.min.css',
		'css/font-awesome.min.css',
		/* AMI */
		'css/AMI/AMIWebApp.min.css',
	]).fail(function(data) {
		throw data;
	});

	/*-------------------------------*/
	/* DEFAULT SCRIPTS               */
	/*-------------------------------*/

	amiWebApp.loadScripts([
		/* Third-party */
		'js/jspath.min.js',
		'js/bootstrap.min.js',
		'js/bootstrap-editable.min.js',
		/* AMI */
		'js/AMI/AMICommand.min.js',
		'js/AMI/AMILogin.min.js',
		'js/AMI/AMITokenizer.min.js',
		'js/AMI/AMITwigExprCompiler.min.js',
		'js/AMI/AMITwigExprInterpreter.min.js',
		'js/AMI/AMITwig.min.js',
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
		async: false,
	}).done(function(data) {
		amiWebApp.fragmentSuccess = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/success.html`';
	});

	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/alert_info.html',
		cache: false,
		dataType: 'html',
		async: false,
	}).done(function(data) {
		amiWebApp.fragmentInfo = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/info.html`';
	});

	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/alert_warning.html',
		cache: false,
		dataType: 'html',
		async: false,
	}).done(function(data) {
		amiWebApp.fragmentWarning = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/warning.html`';
	});

	/*-------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/alert_error.html',
		cache: false,
		dataType: 'html',
		async: false,
	}).done(function(data) {
		amiWebApp.fragmentError = data;
	}).fail(function() {
		throw 'could not load `html/AMI/Fragment/error.html`';
	});

	/*-------------------------------*/
	/* AVAILABILITY                  */
	/*-------------------------------*/

	setTimeout(function() {

		if(!$('#ami_main_content').html()) {
			$('#ami_main_content').html('Service temporarily unavailable, please try reloading the page...');
		}

	}, 8000);

	/*-------------------------------*/
} catch(e) {

	console.error(e);

	alert('Service temporarily unavailable, please try reloading the page...');
}

/*-------------------------------*/
/* URLs                          */
/*-------------------------------*/

var url = document.location.href;

var index1 = url./**/indexOf('?');
if(index1 >= 0) url = url.substring(0, index1);
var index2 = url.lastIndexOf('/');

/*-------------------------------*/

/**
  * Origin URL
  */

amiWebApp.originURL = url.substring(0, index2);

while(amiWebApp.originURL[amiWebApp.originURL.length - 1] === '/') {
	amiWebApp.originURL = amiWebApp.originURL.substring(0, amiWebApp.originURL.length - 1);
}

/*-------------------------------*/

/**
  * WebApp URL
  */

amiWebApp.webAppURL = url;

while(amiWebApp.webAppURL[amiWebApp.webAppURL.length - 1] === '/') {
	amiWebApp.webAppURL = amiWebApp.webAppURL.substring(0, amiWebApp.webAppURL.length - 1);
}

/*-------------------------------*/
/* ARGs                          */
/*-------------------------------*/

/**
  * The dictionary of URL arguments
  */

amiWebApp.args = {};

if(window.location.search) {

	var urlParams = window.location.search.substring(1).split('&');

	for(var i = 0; i < urlParams.length; i++) {

		var pair = urlParams[i].split('=');

		amiWebApp.args[pair[0]] = pair[1];
	}
}

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

}(jQuery));

/*-------------------------------------------------------------------------*/
