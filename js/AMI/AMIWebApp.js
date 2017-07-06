/*!
 * AMI Web Framework - AMIWebApp.js
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami                                                                     */
/*-------------------------------------------------------------------------*/

$AMINamespace('ami');

/*-------------------------------------------------------------------------*/
/* ES6 EXTENSIONS                                                          */
/*-------------------------------------------------------------------------*/

if(!String.prototype.startsWith)
{
	String.prototype.startsWith = function(s)
	{
		var base = 0x00000000000000000000;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/

if(!String.prototype.endsWith)
{
	String.prototype.endsWith = function(s)
	{
		var base = this.length - s.length;

		return this.indexOf(s, base) === base;
	};
}

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSIONS                                                       */
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

jQuery.getSheet = function(settings)
{
	var url = '';
	var context = null;

	if(settings)
	{
		if('url' in settings) {
			url = settings['url'];
		}

		if('context' in settings) {
			context = settings['context'];
		}
	}

	/*-----------------------------------------------------------------*/

	var deferred = $.Deferred();

	$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '"></link>').promise().done(function() {

		if(context) {
			deferred.resolveWith(context);
		} else {
			deferred.resolve();
		}
	});

	/*-----------------------------------------------------------------*/

	return deferred.promise();

	/*-----------------------------------------------------------------*/
};

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
/* amiWebApp                                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */

$AMINamespace('amiWebApp', /** @lends amiWebApp */ {
	/*-----------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                 */
	/*-----------------------------------------------------------------*/

	_idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),

	/*-----------------------------------------------------------------*/

	_embedded: false,
	_noBootstrap: false,

	/*-----------------------------------------------------------------*/

	_sheets: [],
	_scripts: [],

	_controls: {},
	_subapps: {},

	_canLeave: true,

	/*-----------------------------------------------------------------*/

	_now: jQuery.now(),

	/*-----------------------------------------------------------------*/

	_currentSubAppInstance: new function()
	{
		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * Origin URL
	  * @type {String}
	  */

	originURL: '/',

	/**
	  * WebApp URL
	  * @type {String}
	  */

	webAppURL: '/',

	/**
	  * URL arguments
	  * @type {Array<String>}
	  */

	args: {},

	/*-----------------------------------------------------------------*/
	/* CONSTRUCTOR                                                     */
	/*-----------------------------------------------------------------*/

	$init: function()
	{
		/*---------------------------------------------------------*/

		function _eatSlashes(url)
		{
			url = url.trim();

			while(url[url.length - 1] === '/')
			{
				url = url.substring(0, url.length - 1);
			}

			return url;
		}

		/*---------------------------------------------------------*/

		var href = window.location.href.trim();
		var search = window.location.search.trim();

		/**/

		var scripts = document.getElementsByTagName('script');

		var src = scripts[scripts.length - 1].src.trim();

		/*---------------------------------------------------------*/
		/* ORIGIN_URL                                              */
		/*---------------------------------------------------------*/

		var idx1 = src.indexOf('js/AMI/framework.');

		this.originURL = _eatSlashes(idx1 > 0 ? src.substring(0, idx1) : null);

		/*---------------------------------------------------------*/
		/* WEBAPP_URL                                              */
		/*---------------------------------------------------------*/

		var idx2 = href.indexOf((((((((('?')))))))));

		this.webAppURL = _eatSlashes(idx2 > 0 ? href.substring(0, idx2) : href);

		/*---------------------------------------------------------*/
		/* FLAGS                                                   */
		/*---------------------------------------------------------*/

		if(idx1 > 0)
		{
			var flags = src.substring(idx1).toLowerCase();

			this._embedded = flags.indexOf('embedded') >= 0;

			this._noBootstrap = flags.indexOf('nobootstrap') >= 0;
		}

		/*---------------------------------------------------------*/
		/* ARGS                                                    */
		/*---------------------------------------------------------*/

		if(search)
		{
			var params = search.substring(1).split('&');

			for(var i in params)
			{
				var parts = params[i].split('=');

				/**/ if(parts.length === 1)
				{
					this.args[decodeURIComponent(parts[0])] = /*---------*/''/*---------*/;
				}
				else if(parts.length === 2)
				{
					this.args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
			}
		}

		/*---------------------------------------------------------*/
		/* DEFAULT SHEETS AND SCRIPTS                              */
		/*---------------------------------------------------------*/

		if(this._noBootstrap === false
		   &&
		   (typeof $().modal) !== 'function'
		 ) {
			this.loadSheets([
				this.originURL + '/css/bootstrap.min.css',
				this.originURL + '/css/bootstrap-toggle.min.css',
				this.originURL + '/css/bootstrap-vertical-tabs.min.css',
			]);

			this.loadScripts([
				this.originURL + '/js/bootstrap.min.js',
				this.originURL + '/js/bootstrap-toggle.min.js',
				this.originURL + '/js/bootstrap-typeahead.min.js',
			]);
		}

		/*---------------------------------------------------------*/

		this.loadSheets([
			this.originURL + '/css/font-awesome.min.css',
			this.originURL + '/css/AMI/framework.min.css',
		]);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* MODE                                                            */
	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed in embedded mode
	  * @returns {Boolean}
	  */

	isEmbedded: function()
	{
		return this._embedded;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1)
	  * @returns {Boolean}
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
	/* TOOLS                                                           */
	/*-----------------------------------------------------------------*/

	_replace: function(s, x, y)
	{
		var result = [];

		var l = s.length, i, j;

__l0:		for(i = 0; i < l;)
		{
			for(j in x)
			{
				if(s.substring(i).indexOf(x[j]) === 0)
				{
					result.push(y[j]);

					i+= x[j].length;

					continue __l0;
				}
			}

			result.push(s.charAt(i++));
		}

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	_textToHtmlX: ['&'    , '"'     , '<'   , '>'   ],
	_textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to HTML
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToHtml: function(s)
	{
		return this._replace(s, this._textToHtmlX, this._textToHtmlY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from HTML to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	htmlToText: function(s)
	{
		return this._replace(s, this._textToHtmlY, this._textToHtmlX);
	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	_textToStringX: ['\\'  , '\n' , '"'  , '\''  ],
	_textToStringY: ['\\\\', '\\n', '\\"', '\\\''],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToString: function(s)
	{
		return this._replace(s, this._textToStringX, this._textToStringY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToText: function(s)
	{
		return this._replace(s, this._textToStringY, this._textToStringX);

	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	_htmlToStringX: ['\\'  , '\n' , '&quot;'  , '\''  ],
	_htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],

	/*-----------------------------------------------------------------*/

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	htmlToString: function(s)
	{
		return this._replace(s, this._htmlToStringX, this._htmlToStringY);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToHtml: function(s)
	{
		return this._replace(s, this._htmlToStringY, this._htmlToStringX);
	},

	/*-----------------------------------------------------------------*/
	/* BASE64                                                          */
	/*-----------------------------------------------------------------*/

	_base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

	/*-----------------------------------------------------------------*/

	/**
	  * Encodes (RFC 4648) a string
	  * @param {String} string the decoded string
	  * @returns {String} The encoded string
	  */

	base64Encode: function(s)
	{
		var e = [], w;

		var l = s.length, m = l % 3;

		var this_base64 = this._base64;

		for(var i = 0; i < l;)
		{
			w = s.charCodeAt(i++) << 16
			    |
			    s.charCodeAt(i++) << 8
			    |
			    s.charCodeAt(i++) << 0
			;
			
			e.push(this_base64.charAt((w >> 18) & 0x3F));
			e.push(this_base64.charAt((w >> 12) & 0x3F));
			e.push(this_base64.charAt((w >> 6) & 0x3F));
			e.push(this_base64.charAt((w >> 0) & 0x3F));
		}

		/**/ if(m === 1) {
			e.splice(-2, 2);
		}
		else if(m === 2) {
			e.splice(-1, 1);
		}

		return e.join('');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Decodes (RFC 4648) a string
	  * @param {String} string the encoded string
	  * @returns {String} The decoded string
	  */

	base64Decode: function(s)
	{
		var e = [], w;

		var l = s.length, m = l % 4;

		var this_base64 = this._base64;

		for(var i = 0; i < l;)
		{
			w = this_base64.indexOf(s.charAt(i++)) << 18
			    |
			    this_base64.indexOf(s.charAt(i++)) << 12
			    |
			    this_base64.indexOf(s.charAt(i++)) << 6
			    |
			    this_base64.indexOf(s.charAt(i++)) << 0
			;

			e.push(String.fromCharCode((w >>> 16) & 0xFF));
			e.push(String.fromCharCode((w >>> 8) & 0xFF));
			e.push(String.fromCharCode((w >>> 0) & 0xFF));
		}

		/**/ if(m === 2) {
			e.splice(-2, 2);
		}
		else if(m === 3) {
			e.splice(-1, 1);
		}

		return e.join('');
	},

	/*-----------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                        */
	/*-----------------------------------------------------------------*/

	_loadFiles: function(deferred, result, urls, dataType, context)
	{
		if(urls.length > 0)
		{
			var url = urls.shift();

			/*-------------------------------------------------*/
			/* SHEET                                          */
			/*-------------------------------------------------*/

			/**/ if(dataType === 'sheet')
			{
				if(this._sheets.indexOf(url) >= 0)
				{
					result.push(false);

					this._loadFiles(deferred, result, urls, dataType, context);
				}
				else
				{
					$.getSheet({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataType,
						context: this,
					}).done(function() {

						result.push(true);

						this._loadFiles(deferred, result, urls, dataType, context);

					}).fail(function() {

						if(context) {
							deferred.rejectWith(context, ['could not load `' + url + '`']);
						} else {
							deferred.reject('could not load `' + url + '`');
						}
					});
				}
			}

			/*-------------------------------------------------*/
			/* SCRIPT                                          */
			/*-------------------------------------------------*/

			else if(dataType === 'script')
			{
				if(this._scripts.indexOf(url) >= 0)
				{
					result.push(false);

					this._loadFiles(deferred, result, urls, dataType, context);
				}
				else
				{
					$.ajax({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataType,
						context: this,
					}).done(function() {

						result.push(true);

						this._loadFiles(deferred, result, urls, dataType, context);

					}).fail(function() {

						if(context) {
							deferred.rejectWith(context, ['could not load `' + url + '`']);
						} else {
							deferred.reject('could not load `' + url + '`');
						}
					});
				}
			}

			/*-------------------------------------------------*/
			/* OTHER                                           */
			/*-------------------------------------------------*/

			else
			{
				$.ajax({
					url: url,
					async: true,
					cache: false,
					crossDomain: true,
					dataType: dataType,
					context: this,
				}).done(function(data) {

					result.push(data);

					this._loadFiles(deferred, result, urls, dataType, context);

				}).fail(function() {

					if(context) {
						deferred.rejectWith(context, ['could not load `' + url + '`']);
					} else {
						deferred.reject('could not load `' + url + '`');
					}
				});
			}

			/*-------------------------------------------------*/
		}
		else
		{
			if(context) {
				deferred.resolveWith(context, [result]);
			} else {
				deferred.resolve(result);
			}
		}

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	loadFiles: function(urls, dataType, settings)
	{
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(!(urls instanceof Array))
		{
			urls = [urls];
		}

		/*---------------------------------------------------------*/

		return this._loadFiles($.Deferred(), [], urls, dataType, context).promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads CSS sheets asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSheets: function(urls, settings)
	{
		return this.loadFiles(urls, 'sheet', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads JS scripts asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadScripts: function(urls, settings)
	{
		return this.loadFiles(urls, 'script', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads JSON files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadJSONs: function(urls, settings)
	{
		return this.loadFiles(urls, 'json', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads XML files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadXMLs: function(urls, settings)
	{
		return this.loadFiles(urls, 'xml', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads HTML files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadHTMLs: function(urls, settings)
	{
		return this.loadFiles(urls, 'html', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads TWIG files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTWIGs: function(urls, settings)
	{
		return this.loadFiles(urls, 'html', settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads text files asynchronously
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTexts: function(urls, settings)
	{
		return this.loadFiles(urls, 'text', settings);
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	_xxxHTML: function(selector, twig, mode, settings)
	{
		var context = null;
		var suffix = null;
		var dict = null;

		if(settings)
		{
			if('context' in settings) {
				context = settings['context'];
			}

			if('suffix' in settings) {
				suffix = settings['suffix'];
			}

			if('dict' in settings) {
				dict = settings['dict'];
			}
		}

		/*---------------------------------------------------------*/

		var html = this.formatHTML(twig, dict);

		if(suffix)
		{
			html = html.replace(this._idRegExp, function(id) {

				return id + '__' + suffix;
			});
		}

		/*---------------------------------------------------------*/

		var target = $(selector);

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var promise;

		switch(mode)
		{
			case 0:
				promise = target.html(html).promise();
				break;

			case 1:
				promise = target.prepend(html).promise();
				break;

			case 2:
				promise = target.append(html).promise();
				break;

			default:
				throw 'internal error';
		}

		/*---------------------------------------------------------*/

		promise.done(function() {
			/*-------------------------------------------------*/

			if(jQuery().tooltip)
			{
				target.find('[data-toggle="tooltip"]').tooltip({
					container: 'body',
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*-------------------------------------------------*/

			if(jQuery().popover)
			{
				target.find('[data-toggle="popover"][tabindex="0"]').popover({
					container: 'body',
					html: true,
					trigger: 'focus',
				});

				target.find('[data-toggle="popover"][tabindex!="0"]').popover({
					container: 'body',
					html: true,
					trigger: 'click',
				});
			}

			/*-------------------------------------------------*/

			if(jQuery().bootstrapToggle)
			{
				target.find('input[type="checkbox"][data-toggle="toggle"]').bootstrapToggle();
			}

			/*-------------------------------------------------*/

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		/*---------------------------------------------------------*/

		return result.promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* HTML CONTENT                                                    */
	/*-----------------------------------------------------------------*/

	/**
	  * Put a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 0, settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 1, settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 2, settings);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Format the given HTML fragment using TWIG, see {@link http://twig.sensiolabs.org/documentation}
	  * @param {String} html the HTML fragment
	  * @param {Object} [dict] the dictionary
	  * @returns {String} The formated HTML fragment
	  */

	formatHTML: function(html, dict)
	{
		var result;

		/**/ if(dict instanceof Array)
		{
			result = '';

			for(var i in dict)
			{
				if(!(dict[i] instanceof Object))
				{
					dict[i] = {};
				}

				dict[i]['ORIGIN_URL'] = this.originURL;
				dict[i]['WEBAPP_URL'] = this.webAppURL;

				result += amiTwig.engine.render(html, dict[i]);
			}
		}
		else
		{
			if(!(dict instanceof Object))
			{
				dict = {};
			}

			dict['ORIGIN_URL'] = this.originURL;
			dict['WEBAPP_URL'] = this.webAppURL;

			result = amiTwig.engine.render(html, dict);
		}

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* JSPATH                                                          */
	/*-----------------------------------------------------------------*/

	/**
	  * Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}
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

	/**
	  * Enable the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	canLeave: function()
	{
		this._canLeave = true;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Disable the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	cannotLeave: function()
	{
		this._canLeave = false;
	},

	/*-----------------------------------------------------------------*/
	/* MESSAGES                                                        */
	/*-----------------------------------------------------------------*/

	_publishAlert: function(html, fadeOut, target)
	{
		if(!target)
		{
			target = '#ami_alert_content';
		}

		$(target).html(html).promise().done(function() {

			amiWebApp.unlock();

			$(document).scrollTop(0);

			if(fadeOut)
			{
				$(target + ' .alert').fadeOut(60000);
			}
		});
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'info' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	info: function(message, fadeOut, target)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Info!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'success' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	success: function(message, fadeOut, target)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Success!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show a 'warning' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	warning: function(message, fadeOut, target)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Warning!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Show an 'error' message
	  * @param {String} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  * @param {String} [id=null] the target id
	  */

	error: function(message, fadeOut, target)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		this._publishAlert('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span><span class="sr-only">Close</span></button><strong>Error!</strong> ' + this.textToHtml(message) + '</div>', fadeOut, target);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Flush messages
	  */

	flush: function()
	{
		$('#ami_alert_content').empty();
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
		if(!this._embedded)
		{
			alert('error: `this.onStart()` must be overloaded!');
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the toolbar needs to be updated
	  * @event amiWebApp#onUpdateNeeded
	  */

	onUpdateNeeded: function()
	{
		if(!this._embedded)
		{
			alert('error: `this.onUpdateNeeded()` must be overloaded!');
		}
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Starts the web application
	  * @param {Object} [settings] dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)
	  */

	start: function(settings)
	{
		/*---------------------------------------------------------*/

		var logo_url = this.originURL
					+ '/images/logo.png';
		var home_url = this.webAppURL;

		var contact_email = 'ami@lpsc.in2p3.fr';
		var about_url = 'http://cern.ch/ami/';

		var theme_url = this.originURL + '/twig/AMI/Theme/blue.twig';
		var locker_url = this.originURL + '/twig/AMI/Fragment/locker.twig';

		var endpoint_url = this.originURL + '/AMI/FrontEnd';

		/*---------------------------------------------------------*/

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

			if('about_url' in settings) {
				about_url = settings['about_url'];
			}

			if('theme_url' in settings) {
				theme_url = settings['theme_url'];
			}

			if('locker_url' in settings) {
				locker_url = settings['locker_url'];
			}

			if('endpoint_url' in settings) {
				endpoint_url = settings['endpoint_url'];
			}
		}

		/*---------------------------------------------------------*/

		amiCommand.endpoint = endpoint_url;

		/*---------------------------------------------------------*/

		window.onbeforeunload = function(e) {

			if(!amiWebApp._canLeave)
			{
				var f = e || window.event;

				if(f)
				{
					f.returnValue = 'Confirm that you want to leave this page?';
				}

				return 'Confirm that you want to leave this page?';
			}
		};

		/*---------------------------------------------------------*/

		var controls_url = this.originURL + '/controls/CONTROLS.json';

		var subapps_url = this.originURL + '/subapps/SUBAPPS.json';

		/*---------------------------------------------------------*/

		$.ajax({url: controls_url, cache: false, crossDomain: true, dataType: 'json'}).done(function(data1) {

			$.ajax({url: subapps_url, cache: false, crossDomain: true, dataType: 'json'}).done(function(data2) {

				var name;

				for(name in data1) {
				 	amiWebApp._controls[name.toLowerCase()] = data1[name];
				}

				for(name in data2) {
				 	amiWebApp._subapps[name.toLowerCase()] = data2[name];
				}

				if(!amiWebApp._embedded)
				{
					/*---------------------------------*/

					var dict = {
						LOGO_URL: logo_url,
						HOME_URL: home_url,
						CONTACT_EMAIL: contact_email,
						ABOUT_URL: about_url,
					};

					/*---------------------------------*/

					$.ajax({url: theme_url, cache: true, crossDomain: true, dataType: 'html'}).done(function(data3) {

						$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'html'}).done(function(data4) {

							$('body').append(amiWebApp.formatHTML(data3, dict) + data4).promise().done(function() {

								amiLogin._init().done(function() {

									amiWebApp.onStart();
								});
							});

						}).fail(function() {

							alert('could not open `' + locker_url + '`, please reload the page...');
						});

					}).fail(function() {

						alert('could not open `' + theme_url + '`, please reload the page...');
					});

					/*---------------------------------*/
				}
				else
				{
					/*---------------------------------*/

					$.ajax({url: locker_url, cache: true, crossDomain: true, dataType: 'html'}).done(function(data) {

						$('body').append(data).promise().done(function() {

							amiLogin._init().done(function() {

								amiWebApp.onStart();
							});
						});
					});

					/*---------------------------------*/
				}

			}).fail(function() {

				alert('could not open `' + subapps_url + '`, please reload the page...');
			});

		}).fail(function() {

			alert('could not open `' + controls_url + '`, please reload the page...');
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* CONTROLS                                                        */
	/*-----------------------------------------------------------------*/

	_loadControls: function(deferred, result, controls, context)
	{
		if(controls.length > 0)
		{
			var name = controls.shift();

			var descr = this._controls[name.toLowerCase()];

			if(descr)
			{
				this.loadScripts(this.originURL + '/' + descr.file, {context: this}).done(function(loaded) {

					try
					{
						var clazz = window[
							descr.clazz
						];

						var promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
						                        : /*-----------------*/null/*-----------------*/
						;

						if(!promise
						   ||
						   !promise.done
						   ||
						   !promise.fail
						 ) {
							result.push(clazz);

							amiWebApp._loadControls(deferred, result, controls, context);
						}
						else
						{
							promise.done(function() {

								result.push(clazz);

								amiWebApp._loadControls(deferred, result, controls, context);

							}).fail(function() {

								if(context) {
									deferred.rejectWith(context, ['could not load control `' + name + '`']);
								} else {
									deferred.reject('could not load control `' + name + '`');
								}
							});
						}
					}
					catch(e)
					{
						if(context) {
							deferred.rejectWith(context, ['could not load control `' + name + '`']);
						} else {
							deferred.reject('could not load control `' + name + '`');
						}
					}

				}).fail(function() {

					if(context) {
						deferred.rejectWith(context, ['could not load control `' + name + '`']);
					} else {
						deferred.reject('could not load control `' + name + '`');
					}
				});
			}
			else
			{
				if(context) {
					deferred.rejectWith(context, ['could not load control `' + name + '`']);
				} else {
					deferred.reject('could not load control `' + name + '`');
				}
			}
		}
		else
		{
			if(context) {
				deferred.resolveWith(context, [result]);
			} else {
				deferred.resolve(result);
			}
		}

		return deferred;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads controls asynchronously
	  * @param {(Array|String)} controls the array of control names
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadControls: function(controls, settings)
	{
		var context = null;

		if(settings && 'context' in settings)
		{
			context = settings['context'];
		}

		/*---------------------------------------------------------*/

		if(!(controls instanceof Array))
		{
			controls = [controls];
		}

		/*---------------------------------------------------------*/

		return this._loadControls($.Deferred(), [], controls, context).promise();

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* SUBAPPS                                                         */
	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
		var result = this._currentSubAppInstance.onLogin();

		this.onUpdateNeeded(true);

		return result;
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
		var result = this._currentSubAppInstance.onLogout();

		this.onUpdateNeeded(false);

		return result;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Loads a sub-application
	  * @param {String} defaultSubApp the default sub-application name, if null, 'amiWebApp.args["subapp"]'
	  * @param {?} [defaultUserData] the default user data, if null, 'amiWebApp.args["userdata"]'
	  */

	loadSubApp: function(defaultSubApp, defaultUserData)
	{
		var subapp = this.args['subapp'] || defaultSubApp;
		var userdata = this.args['userdata'] || defaultUserData;

		var descr = this._subapps[subapp.toLowerCase()];

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file, {context: this}).done(function(loaded) {

				try
				{
					var instance = window[
						descr.instance
					];

					/**/

					this._currentSubAppInstance.onExit();

					/**/

					this._currentSubAppInstance = instance;

					/**/

					setTimeout(function() {

						if($('#ami_main_content').is(':empty'))
						{
							amiWebApp.error('service temporarily unreachable, please reload the page...');
						}

					}, 10000);

					/**/

					this.lock();

					var promise = loaded[0] ? instance.onReady(userdata)
					                        : /*-------*/null/*-------*/
					;

					if(!promise
					   ||
					   !promise.done
					   ||
					   !promise.fail
					 ) {
						_ami_internal_always(
							amiLogin.isAuthenticated() ? amiWebApp.onLogin()
							                           : amiWebApp.onLogout()
							,
							function() {
								amiWebApp.unlock();
							}
						);
					}
					else
					{
						promise.done(function() {

							_ami_internal_always(
								amiLogin.isAuthenticated() ? amiWebApp.onLogin()
								                           : amiWebApp.onLogout()
								,
								function() {
									amiWebApp.unlock();
								}
							);

						}).fail(function() {

							this.error('could not load sub-application `' + subapp + '`');
						});
					}
				}
				catch(e)
				{
					this.error('could not load sub-application `' + subapp + '`');
				}

			}).fail(function() {

				this.error('could not load sub-application `' + subapp + '`');
			});
		}
		else
		{
			this.error('could not load sub-application `' + subapp + '`');
		}
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
