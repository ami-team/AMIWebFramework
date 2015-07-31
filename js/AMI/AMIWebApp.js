/*!
 * AMI Web Framework
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
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_always(deferred, func)
{
	if(deferred && deferred.always)
	{
		deferred.always(function() {
			func();
		});
	}
	else
	{
		func();
	}
}

/*-------------------------------------------------------------------------*/
/* GLOBAL FUNCTIONS                                                        */
/*-------------------------------------------------------------------------*/

/**
  * Register a sub-application
  * @param {String} subAppName the sub-application name
  * @param {?} subAppInstance the sub-application instance
  */

function amiRegisterSubApp(subAppName, subAppInstance)
{
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
	/* CONSTRUCTOR                                                     */
	/*-----------------------------------------------------------------*/

	init: function()
	{
		/*---------------------------------------------------------*/
		/* DEFAULT SHEETS                                          */
		/*---------------------------------------------------------*/

		this.loadSheets([
			/* Third-party */
			'css/bootstrap.min.css',
			'css/bootstrap.vertical-tabs.min.css',
			'css/font-awesome.min.css',
			/* AMI */
			'css/AMI/AMIWebApp.min.css',
		]).fail(function(data) {
			alert('Service temporarily unavailable, please try reloading the page...');

			console.error(data);
		});

		/*---------------------------------------------------------*/
		/* DEFAULT SCRIPTS                                         */
		/*---------------------------------------------------------*/

		this.loadScripts([
			/* Third-party */
			'js/jspath.min.js',
			'js/bootstrap.min.js',
			/* AMI */
			'js/AMI/AMIObjects.min.js',
			'js/AMI/AMICommand.min.js',
			'js/AMI/AMILogin.min.js',
			'js/AMI/AMITokenizer.min.js',
			'js/AMI/AMITwigExprCompiler.min.js',
			'js/AMI/AMITwigExprInterpreter.min.js',
			'js/AMI/AMITwig.min.js',
		]).fail(function(data) {
			alert('Service temporarily unavailable, please try reloading the page...');

			console.error(data);
		});

		/*---------------------------------------------------------*/
		/* DEFAULT FRAGMENTS                                       */
		/*---------------------------------------------------------*/

		this.loadHTMLs([
			'html/AMI/Fragment/alert_success.html',
			'html/AMI/Fragment/alert_info.html',
			'html/AMI/Fragment/alert_warning.html',
			'html/AMI/Fragment/alert_error.html',
		]).done(function(data) {
			this.fragmentSuccess = data[0];
			this.fragmentInfo = data[1];
			this.fragmentWarning = data[2];
			this.fragmentError = data[3];
		}).fail(function(data) {
			alert('Service temporarily unavailable, please try reloading the page...');

			console.error(data);
		});

		/*---------------------------------------------------------*/
		/* AVAILABILITY                                            */
		/*---------------------------------------------------------*/

		setTimeout(function() {

			if($('#ami_main_content').is(':empty'))
			{
				$('#ami_main_content').html('Service temporarily unavailable, please try reloading the page...');
			}

		}, 8000);

		/*---------------------------------------------------------*/
		/* URLs                                                    */
		/*---------------------------------------------------------*/

		var url = document.location.href;

		var index1 = url./**/indexOf('?');
		if(index1 >= 0) url = url.substring(0, index1);
		var index2 = url.lastIndexOf('/');

		/*---------------------------------------------------------*/

		/**
		  * {String} WebApp URL
		  * @type {String}
		  */

		this.webAppURL = url;

		while(this.webAppURL[this.webAppURL.length - 1] === '/')
		{
			this.webAppURL = this.webAppURL.substring(0, this.webAppURL.length - 1);
		}

		/*---------------------------------------------------------*/

		/**
		  * Origin URL
		  * @type {String}
		  */

		this.originURL = url.substring(0, index2);

		while(this.originURL[this.originURL.length - 1] === '/')
		{
			this.originURL = this.originURL.substring(0, this.originURL.length - 1);
		}

		/*---------------------------------------------------------*/
		/* ARGs                                                    */
		/*---------------------------------------------------------*/

		/**
		  * URL arguments
		  * @type {Array<String>}
		  */

		this.args = {};

		if(window.location.search)
		{
			var urlParams = window.location.search.substring(1).split('&');

			for(var i = 0; i < urlParams.length; i++)
			{
				var pair = urlParams[i].split('=');

				this.args[pair[0]] = decodeURIComponent(pair[1]);
			}
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* TOOLS                                                           */
	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1) or not
	  * @returns {Boolean} True or False
	  */

	isLocal: function()
	{
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
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToHtml: function(s)
	{
		return s.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},

	/**
	  * Unescapes the given string from HTML to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	htmlToText: function(s)
	{
		return s.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToString: function(s)
	{
		return s.replace(/\\/g, '\\\\').replace(/"/g, '\\\"').replace(/'/g, '\\\'');
	},

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToText: function(s)
	{
		return s.replace(/\\'/g, '\'').replace(/\\"/g, '\"').replace(/\\\\/g, '\\');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	htmlToString: function(s)
	{
		return s.replace(/\\/g, '\\\\').replace(/&quot;/g, '\\&quot;').replace(/'/g, '\\\'');
	},

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToHtml: function(s)
	{
		return s.replace(/\\'/g, '\'').replace(/\\&quot;/g, '&quot;').replace(/\\\\/g, '\\');
	},

	/*-----------------------------------------------------------------*/
	/* DYNAMIC SHEET LOADING                                           */
	/*-----------------------------------------------------------------*/

	/**
	  * Loads CSS sheets asynchronously
	  * @param {(Array|String)} sheets the array of sheets
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSheets: function(sheets, settings)
	{
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(!(sheets instanceof Array))
		{
			sheets = [sheets];
		}

		/*---------------------------------------------------------*/

		var html = '';

		for(var i = 0; i < sheets.length; i++)
		{
			if(_ami_internal_sheets.indexOf(sheets[i]) < 0)
			{
				_ami_internal_sheets.push(sheets[i]);

				html += '<link rel="stylesheet" type="text/css" href="' + sheets[i] + '?_=' + _ami_internal_nonce++ + '"></link>';
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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
	/* DYNAMIC SCRIPT LOADING                                          */
	/*-----------------------------------------------------------------*/

	/**
	  * Loads JavaScript scripts asynchronously
	  * @param {(Array|String)} scripts the array of scripts
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadScripts: function(scripts, settings)
	{
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(!(scripts instanceof Array))
		{
			scripts = [scripts];
		}

		/*---------------------------------------------------------*/

		var html = '';

		for(var i = 0; i < scripts.length; i++)
		{
			if(_ami_internal_scripts.indexOf(scripts[i]) < 0)
			{
				_ami_internal_scripts.push(scripts[i]);

				html += '<script type="text/javascript" src="' + scripts[i] + '?_=' + _ami_internal_nonce++ + '"></script>';
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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

	_loadHTMLs: function(deferred, array, fragments, context)
	{
		if(fragments.length > 0)
		{
			var url = fragments.shift();

			$.ajax({
				url: url,
				cache: false,
				dataType: 'html',
				context: this,
			}).done(function(data) {

				array.push(data);

				this._loadHTMLs(deferred, array, fragments, context);

			}).fail(function() {

				if(context) {
					deferred.rejectWith(context, ['could not load `' + url + '`']);
				} else {
					deferred.reject('could not load `' + url + '`');
				}
			});
		}
		else
		{
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
	  * @param {(Array|String)} fragments the array of fragments
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadHTMLs: function(fragments, settings) {

		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(!(fragments instanceof Array))
		{
			fragments = [fragments];
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		this._loadHTMLs(result, [], fragments, context);

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	webappRegExp: /%%\s*WEBAPP_URL\s*%%/g,
	originRegExp: /%%\s*ORIGIN_URL\s*%%/g,

	/*-----------------------------------------------------------------*/

	/**
	  * Replace the HTML content of the given target
	  * @param {String} path the target path
	  * @param {String} html the HTML fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, html, settings)
	{
		html = html.replace(this.webappRegExp, this.webAppURL);
		html = html.replace(this.originRegExp, this.originURL);

		var context = null;
		var dict = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		html = this.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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
	  * @param {String} path the target path
	  * @param {String} html the HTML fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function(selector, html, settings)
	{
		html = html.replace(this.webappRegExp, this.webAppURL);
		html = html.replace(this.originRegExp, this.originURL);

		var context = null;
		var dict = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		html = this.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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
	  * @param {String} path the target path
	  * @param {String} html the HTML fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function(selector, html, settings)
	{
		html = html.replace(this.webappRegExp, this.webAppURL);
		html = html.replace(this.originRegExp, this.originURL);

		var context = null;
		var dict = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		html = this.formatHTML(html, dict);

		/*---------------------------------------------------------*/

		var result = $.Deferred();

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
	  * @param {String} html the HTML fragment
	  * @param {Object} [dict] the dictionary
	  * @returns {String} The formated HTML fragment
	  */

	formatHTML: function(html, dict)
	{
		if(dict instanceof Array)
		{
			var result = '';

			for(var i = 0; i < dict.length; i++)
			{
				result += amiTwig.render(html, dict[i]);
			}

			return result;
		}
		else
		{
			return amiTwig.render(html, dict);
		}
	},

	/*-----------------------------------------------------------------*/
	/* JSPATH                                                          */
	/*-----------------------------------------------------------------*/

	/**
	  * Finds data within the given JSON, see: {@link https://github.com/dfilatov/jspath}
	  * @param {String} path the path
	  * @param {Object} json the JSON
	  * @returns {Array} The resulting array
	  */

	jspath: function(path, json)
	{
		return JSPath.apply(path, json);
	},

	/*-----------------------------------------------------------------*/
	/* LOCK                                                            */
	/*-----------------------------------------------------------------*/

	/**
	  * Locks the web application
	  */

	lock: function()
	{
		$('#ami_locker').css('display', 'block');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unlocks the web application
	  */

	unlock: function()
	{
		$('#ami_locker').css('display', 'none');
	},

	/*-----------------------------------------------------------------*/
	/* MESSAGES                                                        */
	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'success' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	success: function(message, fadeOut)
	{
		this.replaceHTML('#ami_status_content', this.fragmentSuccess, {dict: {MESSAGE: message}});
		this.unlock();

		$(document).scrollTop(0);

		if(fadeOut)
		{
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'info' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	info: function(message, fadeOut)
	{
		this.replaceHTML('#ami_status_content', this.fragmentInfo, {dict: {MESSAGE: message}});
		this.unlock();

		$(document).scrollTop(0);

		if(fadeOut)
		{
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'warning' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	warning: function(message, fadeOut)
	{
		this.replaceHTML('#ami_status_content', this.fragmentWarning, {dict: {MESSAGE: message}});
		this.unlock();

		$(document).scrollTop(0);

		if(fadeOut)
		{
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'error' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	error: function(message, fadeOut)
	{
		this.replaceHTML('#ami_status_content', this.fragmentError, {dict: {MESSAGE: message}});
		this.unlock();

		$(document).scrollTop(0);

		if(fadeOut)
		{
			$('#ami_status_content .alert').fadeOut(60000);
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Flush messages
	  */

	flush: function()
	{
		$('#ami_status_content').empty();
	},

	/*-----------------------------------------------------------------*/
	/* WEB APPLICATION                                                 */
	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the web application starts
	  * @event amiWebApp#onStart
	  */

	onStart: function()
	{
		alert('error: `this.onStart()` must be overloaded!');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the toolbar needs to be updated
	  * @event amiWebApp#onToolbarUpdateNeeded
	  */

	onToolbarUpdateNeeded: function()
	{
		alert('error: `this.onToolbarUpdateNeeded()` must be overloaded!');
 	},

	/*-----------------------------------------------------------------*/

	/**
	  * Starts the web application
	  * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, template_filename, locker_filename)
	  */

	start: function(settings)
	{
		var logo_url = 'images/logo.png';
		var home_url = 'http://ami.in2p3.fr';
		var contact_email = 'ami@lpsc.in2p3.fr';
		var template_filename = 'html/AMI/AMIWebApp_default.html';
		var locker_filename = 'html/AMI/Fragment/locker.html';

		if(settings)
		{
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

				$('body').append(amiWebApp.formatHTML(data1, dict) + data2).promise().done(function() {

					amiWebApp.onStart();

					amiLogin._init();
				});

			}).fail(function() {
				alert('Service temporarily unavailable, please try reloading the page...');

				console.error('could not load `' + locker_filename + '`');
			});
		}).fail(function() {
			alert('Service temporarily unavailable, please try reloading the page...');

			console.error('could not load `' + template_filename + '`');
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* SUB-APPLICATIONS                                                */
	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		return this._currentSubAppInstance.onReady(userdata);
	},

	onExit: function(userdata)
	{
		return this._currentSubAppInstance.onExit(userdata);
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		var result = this._currentSubAppInstance.onLogin();
		this.onToolbarUpdateNeeded();
		return result;
	},

	onLogout: function()
	{
		var result = this._currentSubAppInstance.onLogout();
		this.onToolbarUpdateNeeded();
		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the current sub-application instance
	  * @return {?} The current sub-application instance
	  */

	getCurrentSubAppInstance: function()
	{
		return this._currentSubAppInstance;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Set the current sub-application instance
	  * @param {?} subAppInstance the application instance
	  * @param {?} [userdata] userdata
	  */

	setCurrentSubAppInstance: function(subAppInstance, userdata)
	{
		/*---------------------------------------------------------*/
		/* CHECK SUB-APPLICATION                                   */
		/*---------------------------------------------------------*/

		if(!subAppInstance.onReady) {
			alert('error: `<subapp>.onReady()` must be implemented!');
			return;
		}

		if(!subAppInstance.onExit) {
			alert('error: `<subapp>.onExit()` must be implemented!');
			return;
		}

		if(!subAppInstance.onLogin) {
			alert('error: `<subapp>.onLogin()` must be implemented!');
			return;
		}

		if(!subAppInstance.onLogout) {
			alert('error: `<subapp>.onLogout()` must be implemented!');
			return;
		}

		/*---------------------------------------------------------*/
		/* SWITCH SUB-APPLICATION                                  */
		/*---------------------------------------------------------*/

		if(this._currentSubAppInstance && this._currentSubAppInstance.onExit() === false)
		{
			return;
		}

		/*---------------------------------------------------------*/

		this._currentSubAppInstance = subAppInstance;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		_ami_internal_always(
			amiWebApp.onReady(userdata),
			function() {
				_ami_internal_always(
					amiWebApp.onLogin(),
					function() {
						amiWebApp.unlock();
					}
				);
			}
		);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Runs a sub-application according to the URL (parameters 'subapp' and 'userdata')
	  * @param {String} home the name of the home sub-application
	  */

	autoRunSubApp: function(home)
	{
		var subapp = this.args['subapp'] || home;
		var userdata = this.args['userdata'] || null;

		if(subapp)
		{
			subapp = subapp.toLowerCase();

			if(subapp in _ami_internal_subAppDict)
			{
				this.setCurrentSubAppInstance(_ami_internal_subAppDict[subapp], userdata);
			}
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* CONSTRUCTOR                                                             */
/*-------------------------------------------------------------------------*/

amiWebApp.init();

/*-------------------------------------------------------------------------*/
/* AMISubApp                                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface AMISubApp
 */

$AMIInterface('AMISubApp', /** @lends AMISubApp# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function(userdata) {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  */

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when log in
	  */

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when log out
	  */

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/

$AMIClass('HH', {
	$implements: [AMISubApp],
	onReady: function() {},
	onExit: function() {},
	onLogin: function() {},
	onLogout: function() {},
});

amiWebApp._currentSubAppInstance = new HH();

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

jQuery.foreach = function(elements, callback, context)
{
	if(context)
	{
		jQuery.each(elements, function(index, element) {

			callback.apply(context, [index, element]);
		});
	}
	else
	{
		jQuery.each(elements, function(index, element) {

			callback.apply(element, [index, element]);
		});
	}

	return elements;
};

/*-------------------------------------------------------------------------*/
