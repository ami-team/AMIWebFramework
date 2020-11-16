/*
 * AMI Web Framework - AMIWebApp.js
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami                                                                                                                */
/*--------------------------------------------------------------------------------------------------------------------*/

$AMINamespace('ami', {

	version: '{{AMI_VERSION}}',
	commit_id: '{{AMI_COMMIT_ID}}',
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                                                                 */
/*--------------------------------------------------------------------------------------------------------------------*/

function _ami_internal_then(deferred, doneFunc, failFunc)
{
	if(deferred && deferred.then)
	{
		deferred.then(doneFunc, failFunc);
	}
	else
	{
		doneFunc();
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

function _ami_internal_always(deferred, alwaysFunc)
{
	if(deferred && deferred.always)
	{
		deferred.always(alwaysFunc);
	}
	else
	{
		alwaysFunc();
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiWebApp                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */

$AMINamespace('amiWebApp', /** @lends amiWebApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	_idRegExp: new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g'),

	_linkExp: new RegExp('\\[([^\\]]*)\\]\\(([^\\)]*)\\)', 'g'),

	/*----------------------------------------------------------------------------------------------------------------*/

	_embedded: false,
	_noBootstrap: false,
	_noDateTimePicker: false,
	_noSelect2: false,

	/*----------------------------------------------------------------------------------------------------------------*/

	_globalDeferred: $.Deferred(),

	/*----------------------------------------------------------------------------------------------------------------*/

	_sheets: [],
	_scripts: [],

	_controls: {},
	_subapps: {},

	_isReady: false,
	_canLeave: true,
	_lockCnt: 0x00,

	/*----------------------------------------------------------------------------------------------------------------*/

	_currentSubAppInstance: new function()
	{
		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * The origin URL
	  * @type {String}
	  */

	originURL: '/',

	/**
	  * The webapp URL
	  * @type {String}
	  */

	webAppURL: '/',

	/**
	  * The anchor part of the webapp URL
	  * @type {String}
	  */

	hash: '',

	/**
	  * The arguments extracted from the webapp URL
	  * @type {Array<String>}
	  */

	args: {},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STATIC CONSTRUCTOR                                                                                             */
	/*----------------------------------------------------------------------------------------------------------------*/

	$: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* GET FLAGS                                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		const url = amiRouter.getScriptURL();

		const idx = url.indexOf('?');

		if(idx > 0)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const flags = url.substring(idx).toLowerCase();

			/*--------------------------------------------------------------------------------------------------------*/

			this._embedded = (flags.indexOf('embedded') >= 0);

			this._noBootstrap = (flags.indexOf('nobootstrap') >= 0);

			this._noDateTimePicker = (flags.indexOf('nodatetimepicker') >= 0);

			this._noSelect2 = (flags.indexOf('noselect2') >= 0);

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* GET URLS, HASH AND ARGS                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		this.originURL = amiRouter.getOriginURL();
		this.webAppURL = amiRouter.getWebAppURL();

		this.hash = amiRouter.getHash();
		this.args = amiRouter.getArgs();

		/*------------------------------------------------------------------------------------------------------------*/
		/* LOAD SHEETS AND SCRIPTS                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		const resourcesCSS = [];
		const resourcesJS = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(!window.Popper)
		{
			resourcesJS.push(this.originURL + '/js/popper.min.js');
		}

		if(!window.moment)
		{
			resourcesJS.push(this.originURL + '/js/moment.min.js');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if((typeof jQuery.fn.qrcode) !== 'function')
		{
			resourcesJS.push(this.originURL + '/js/jquery-qrcode.min.js');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this._noBootstrap && (typeof jQuery.fn.modal) !== 'function')
		{
			resourcesCSS.push(this.originURL + '/css/bootstrap.min.css');
			resourcesJS.push(this.originURL + '/js/bootstrap.min.js');
		}

		if(!this._noDateTimePicker && (typeof jQuery.fn.datetimepicker) !== 'function')
		{
			resourcesCSS.push(this.originURL + '/css/bootstrap-datetimepicker.min.css');
			resourcesJS.push(this.originURL + '/js/bootstrap-datetimepicker.min.js');
		}

		if(!this._noSelect2 && (typeof jQuery.fn.select2) !== 'function')
		{
			resourcesCSS.push(this.originURL + '/css/select2.min.css');
			resourcesJS.push(this.originURL + '/js/select2.min.js');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.loadResources([
			...resourcesCSS,
			this.originURL + '/css/font-awesome.min.css',
			this.originURL + '/css/ami.min.css',
			...resourcesJS,
		]).done((/*---*/) => {

			this._globalDeferred.resolve(/*---*/);

		}).fail((message) => {

			this._globalDeferred.reject(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* MODE                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Checks whether the WebApp is executed in embedded mode
	  * @returns {Boolean}
	  */

	isEmbedded: function()
	{
		return this._embedded;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)
	  * @returns {Boolean}
	  */

	isLocal: function()
	{
		return document.location.protocol === (('file:'))
		       ||
		       document.location.hostname === 'localhost'
		       ||
		       document.location.hostname === '127.0.0.1'
		       ||
		       document.location.hostname === ((('::1')))
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TOOLS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	typeOf: function(x)
	{
		const name = Object.prototype.toString.call(x);

		return name.startsWith('[object ') ? name.substring(8, name.length - 1)
		                                   : /*-----------*/ '' /*-----------*/
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	asArray: function(x)
	{
		return this.typeOf(x) === 'Array' ? (x)
		                                  : [x]
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setup: function(optionNames, optionDefaults, settings)
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		const l = optionNames.length;
		const m = optionDefaults.length;

		if(l !== m)
		{
			throw 'internal error';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(settings) {
			for(let i = 0; i < l; i++) {
				result.push(optionNames[i] in settings ? settings[optionNames[i]] : optionDefaults[i]);
			}
		}
		else {
			for(let i = 0; i < l; i++) {
				result.push(/*---------------------------------------------------*/ optionDefaults[i]);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	replace: amiTwig.stdlib._replace,

	/*----------------------------------------------------------------------------------------------------------------*/

	_textToHtmlX: ['&'    , '"'     , '<'   , '>'   ],
	_textToHtmlY: ['&amp;', '&quot;', '&lt;', '&gt;'],

	/**
	  * Escapes the given string from text to HTML
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToHtml: function(s)
	{
		return this.replace(s || '', this._textToHtmlX, this._textToHtmlY);
	},

	/**
	  * Unescapes the given string from HTML to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	htmlToText: function(s)
	{
		return this.replace(s || '', this._textToHtmlY, this._textToHtmlX);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_textToStringX: ['\\'  , '\n' , '"'  , '\''  ],
	_textToStringY: ['\\\\', '\\n', '\\"', '\\\''],

	/**
	  * Escapes the given string from text to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToString: function(s)
	{
		return this.replace(s || '', this._textToStringX, this._textToStringY);
	},

	/**
	  * Unescapes the given string from JavaScript string to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToText: function(s)
	{
		return this.replace(s || '', this._textToStringY, this._textToStringX);

	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_htmlToStringX: ['\\'  , '\n' , '&quot;'  , '\''  ],
	_htmlToStringY: ['\\\\', '\\n', '\\&quot;', '\\\''],

	/**
	  * Escapes the given string from HTML to JavaScript string
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	htmlToString: function(s)
	{
		return this.replace(s || '', this._htmlToStringX, this._htmlToStringY);
	},

	/**
	  * Unescapes the given string from JavaScript string to HTML
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	stringToHtml: function(s)
	{
		return this.replace(s || '', this._htmlToStringY, this._htmlToStringX);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_textToSQLX: ['\''  ],
	_textToSQLY: ['\'\''],

	/**
	  * Escapes the given string from text to SQL
	  * @param {String} string the unescaped string
	  * @returns {String} The escaped string
	  */

	textToSQL: function(s)
	{
		return this.replace(s || '', this._textToSQLX, this._textToSQLY);
	},

	/**
	  * Unescapes the given string from SQL to text
	  * @param {String} string the escaped string
	  * @returns {String} The unescaped string
	  */

	sqlToText: function(s)
	{
		return this.replace(s || '', this._textToSQLY, this._textToSQLX);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BASE64                                                                                                         */
	/*----------------------------------------------------------------------------------------------------------------*/

	_base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Encodes (RFC 4648) a string
	  * @param {String} string the decoded string
	  * @returns {String} The encoded string
	  */

	base64Encode: function(s)
	{
		let w;

		const e = [];

		const l = s.length, m = l % 3;

		const this_base64 = this._base64;

		for(let i = 0; i < l;)
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

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Decodes (RFC 4648) a string
	  * @param {String} string the encoded string
	  * @returns {String} The decoded string
	  */

	base64Decode: function(s)
	{
		let w;

		const e = [];

		const l = s.length, m = l % 4;

		const this_base64 = this._base64;

		for(let i = 0; i < l;)
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

	/*----------------------------------------------------------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	_getExtension: function(url)
	{
		const idx = url.lastIndexOf('.');

		return idx > 0 ? url.substring(idx) : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_getDataType: function(url, dataType)
	{
		let result;

		if(dataType === 'auto')
		{
			/**/ if(url.indexOf('ctrl:') === 0)
			{
				result = 'control';
			}
			else if(url.indexOf('subapp:') === 0)
			{
				result = 'subapp';
			}
			else
			{
				switch(this._getExtension(url).toLowerCase())
				{
					case '.css':
						result = 'sheet';
						break;

					case '.js':
						result = 'script';
						break;

					case '.json':
						result = 'json';
						break;

					case '.xml':
						result = 'xml';
						break;

					default:
						result = 'text';
						break;
				}
			}
		}
		else
		{
			result = dataType;
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	__loadXXX: function(deferred, result, urls, dataType, context)
	{
		if(urls.length === 0)
		{
			return deferred.resolveWith(context, [result]);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		const url = urls.shift().trim();

		/*------------------------------------------------------------------------------------------------------------*/

		const dataTYPE = this._getDataType(url, dataType);

		/*------------------------------------------------------------------------------------------------------------*/

		switch(dataTYPE)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* CONTROL                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'control':

				this.loadControl(url).then((data) => {

					result.push(data);

					return this.__loadXXX(deferred, result, urls, dataType, context);

				}, (message) => {

					return deferred.rejectWith(context, [message]);
				});

				break;

			/*--------------------------------------------------------------------------------------------------------*/
			/* SUBAPP                                                                                                 */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'subapp':

				this.loadSubApp(url).then((data) => {

					result.push(data);

					return this.__loadXXX(deferred, result, urls, dataType, context);

				}, (message) => {

					return deferred.rejectWith(context, [message]);
				});

				break;

			/*--------------------------------------------------------------------------------------------------------*/
			/* SHEET                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'sheet':

				if(this._sheets.indexOf(url) >= 0)
				{
					result.push(false);

					return this.__loadXXX(deferred, result, urls, dataType, context);
				}
				else
				{
					$.ajax({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataTYPE,
					}).then(() => {

						result.push(true);

						this._sheets.push(url);

						return this.__loadXXX(deferred, result, urls, dataType, context);

					}, () => {

						return deferred.rejectWith(context, ['could not load `' + url + '`']);
					});
				}

				break;

			/*--------------------------------------------------------------------------------------------------------*/
			/* SCRIPT                                                                                                 */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'script':

				if(this._scripts.indexOf(url) >= 0)
				{
					result.push(false);

					return this.__loadXXX(deferred, result, urls, dataType, context);
				}
				else
				{
					$.ajax({
						url: url,
						async: false,
						cache: false,
						crossDomain: true,
						dataType: dataTYPE,
					}).then(() => {

						result.push(true);

						this._scripts.push(url);

						return this.__loadXXX(deferred, result, urls, dataType, context);

					}, () => {

						return deferred.rejectWith(context, ['could not load `' + url + '`']);
					});
				}

				break;

			/*--------------------------------------------------------------------------------------------------------*/
			/* OTHER                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			default:

				$.ajax({
					url: url,
					async: true,
					cache: false,
					crossDomain: true,
					dataType: dataTYPE,
				}).then((data) => {

					result.push(data);

					return this.__loadXXX(deferred, result, urls, dataType, context);

				}, () => {

					return deferred.rejectWith(context, ['could not load `' + url + '`']);
				});

				break;

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_loadXXX: function(urls, dataType, settings)
	{
		const deferred = $.Deferred();

		const [context] = this.setup(
			['context'],
			[deferred],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.__loadXXX(deferred, [], this.asArray(urls), dataType, context);

		/*------------------------------------------------------------------------------------------------------------*/

		return deferred.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads resources by extension
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadResources: function(urls, settings)
	{
		return this._loadXXX(urls, 'auto', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads CSS sheets
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSheets: function(urls, settings)
	{
		return this._loadXXX(urls, 'sheet', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads JS scripts
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadScripts: function(urls, settings)
	{
		return this._loadXXX(urls, 'script', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads JSON files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadJSONs: function(urls, settings)
	{
		return this._loadXXX(urls, 'json', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads XML files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadXMLs: function(urls, settings)
	{
		return this._loadXXX(urls, 'xml', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads HTML files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadHTMLs: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads TWIG files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTWIGs: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads text files
	  * @param {(Array|String)} urls the array of urls
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadTexts: function(urls, settings)
	{
		return this._loadXXX(urls, 'text', settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* HTML CONTENT                                                                                                   */
	/*----------------------------------------------------------------------------------------------------------------*/

	_xxxHTML: function(selector, twig, mode, settings)
	{
		const result = $.Deferred();

		const [context, suffix, dict, twigs] = this.setup(
			['context', 'suffix', 'dict', 'twigs'],
			[result, null, null, null],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if(suffix)
		{
			twig = twig.replace(this._idRegExp, function(id) {

				return id + '_instance' + suffix;
			});
		}

		const html = this.formatTWIG(twig, dict, twigs);

		/*------------------------------------------------------------------------------------------------------------*/

		let promise;

		let el = $(selector);

		switch(mode)
		{
			case 0:
				promise = el.html(html).promise();
				break;

			case 1:
				promise = el.prepend(html).promise();
				break;

			case 2:
				promise = el.append(html).promise();
				break;

			case 3:
				promise = el.replaceWith(el.is('[id]') ? html.replace(/^\s*(<[a-zA-Z_-]+)/, '$1 id="' + el.attr('id') + '"') : html).promise();
				break;

			default:
				throw 'internal error';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		promise.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			let el = $(selector);

			/*--------------------------------------------------------------------------------------------------------*/

			const _find = (mode === 3) ? (_selector) => el.findWithSelf(_selector)
			                           : (_selector) => el.    find    (_selector)
			;

			/*--------------------------------------------------------------------------------------------------------*/

			if(jQuery.fn.tooltip)
			{
				_find('[data-toggle="tooltip"]').tooltip({
					html: false,
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(jQuery.fn.popover)
			{
				_find('[data-toggle="popover"]').popover({
					html: true,
					delay: {
						show: 500,
						hide: 100,
					},
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(jQuery.fn.datetimepicker)
			{
				_find('.form-datetime').datetimepicker({
					format: 'YYYY-MM-DD HH:mm:ss.SSSSSS'
				});

				_find('.form-date').datetimepicker({
					format: 'YYYY-MM-DD'
				});

				_find('.form-time').datetimepicker({
					format: 'HH:mm:ss'
				});

				_find('.form-time-hm').datetimepicker({
					format: 'HH:mm'
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(window.ace)
			{
				_find('.form-editor:not(.form-editor-hidden)').each((indx, item) => {

					/*------------------------------------------------------------------------------------------------*/

					const textarea = $(item).addClass('form-editor-hidden');

					/*------------------------------------------------------------------------------------------------*/

					const div = $('<div>', {
						'class': textarea.attr('class')
						                 .replace('form-editor', '').replace('form-editor-hidden', ''),
						'style': textarea.attr('style'),
					}).insertBefore(textarea);

					/*------------------------------------------------------------------------------------------------*/

					div.promise().done(() => {

						/*--------------------------------------------------------------------------------------------*/

						const mode = textarea.attr('data-mode') || 'text';
						const theme = textarea.attr('data-theme') || 'chrome';

						const wrap = textarea.attr('data-wrap') || 'false';
						const readOnly = textarea.attr('data-read-only') || 'false';
						const showGutter = textarea.attr('data-show-gutter') || 'true';
						const highlightActiveLine = textarea.attr('data-highlight-active-line') || 'false';

						let minLines = parseInt(textarea.attr('data-minlines'));

						if(isNaN(minLines)) {
							minLines = 0x000001;
						}

						let maxLines = parseInt(textarea.attr('data-maxlines'));

						if(isNaN(maxLines)) {
							maxLines = Infinity;
						}

						/*--------------------------------------------------------------------------------------------*/

						ace.config.set('suffix', '.min.js');

						ace.config.set('basePath', this.originURL + '/js/3rd-party/ace');

						/*--------------------------------------------------------------------------------------------*/

						const editor = ace.edit(div[0], {
							mode: 'ace/mode/' + mode,
							theme: 'ace/theme/' + theme,
							/**/
							wrap: 'true' === wrap,
							readOnly: 'true' === readOnly,
							showGutter: 'true' === showGutter,
							highlightActiveLine: 'true' === highlightActiveLine,
							/**/
							minLines: minLines,
							maxLines: maxLines,
						});

						/*--------------------------------------------------------------------------------------------*/

						editor.renderer.setScrollMargin(0, 2);

						/*--------------------------------------------------------------------------------------------*/

						const session = editor.getSession();

						textarea.data('editor', editor);
						textarea.data('session', session);

						/*--------------------------------------------------------------------------------------------*/

						session.on('change', () => {

							item.value = session.getValue();
						});

						session.setValue(item.value);

						/*--------------------------------------------------------------------------------------------*/
					});

					/*------------------------------------------------------------------------------------------------*/
				});
			}

			/*--------------------------------------------------------------------------------------------------------*/

			result.resolveWith(context, [el]);

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, suffix, dict, twigs)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 0, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, suffix, dict, twigs)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 1, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, suffix, dict, twigs)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function(selector, twig, settings)
	{
		return this._xxxHTML(selector, twig, 2, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}
	  * @param {String} twig the TWIG string
	  * @param {Object|Array} [dict] the dictionary
	  * @param {Object} [twigs] dictionary of fragments
	  * @returns {String} The Interpreted TWIG string
	  */

	formatTWIG: function(twig, dict = {}, twigs = {})
	{
		const result = [];

		/*------------------------------------------------------------------------------------------------------------*/

		const render = (twig, dict) => {

			if(this.typeOf(dict) !== 'Object')
			{
				dict = {};
			}

			if(this.typeOf(twigs) !== 'Object')
			{
				twigs = {};
			}

			dict['ORIGIN_URL'] = this.originURL;
			dict['WEBAPP_URL'] = this.webAppURL;

			return amiTwig.engine.render(twig, dict, twigs);
		};

		/*------------------------------------------------------------------------------------------------------------*/

		try
		{
			if(this.typeOf(dict) === 'Array')
			{
				dict.forEach((DICT) => {

					result.push(render(twig, DICT, twigs));
				});
			}
			else
			{
				result.push(render(twig, dict, twigs));
			}
		}
		catch(error)
		{
			result.length = 0;

			this.error('TWIG parsing error: ' + error.message);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JSPATH                                                                                                         */
	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STACK                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	getStack: function()
	{
		try
		{
			throw Error();
		}
		catch(e1)
		{
			try
			{
				return e1.stack;
			}
			catch(e2)
			{
				return ((('')));
			}
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* LOCK                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Locks the Web application
	  */

	lock: function()
	{
		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('lock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}

		/**/

		if(this._lockCnt <= 0)
		{
			$('#ami_locker').css('display', 'flex');

			this._lockCnt = 1;
		}
		else
		{
			this._lockCnt++;
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Unlocks the Web application
	  */

	unlock: function()
	{
		if(this._lockCnt <= 1)
		{
			$('#ami_locker').css('display', 'none');

			this._lockCnt = 0;
		}
		else
		{
			this._lockCnt--;
		}

		/**/

		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('unlock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Leave the modal window
	  */

	modalLeave: function()
	{
		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('modalLock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}

		/**/

		this._lockCnt = this._tmpLockCnt;

		if(this._lockCnt > 0)
		{
			$('#ami_locker').css('display', 'flex');
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Enter the modal window
	  */

	modalEnter: function()
	{
		this._tmpLockCnt = this._lockCnt;

		if(this._lockCnt > 0)
		{
			$('#ami_locker').css('display', 'none');
		}

		/**/

		let lines = this.getStack().split('\n');

		if(lines.length > 2)
		{
			console.log('modalUnlock[' + this._lockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	canLeave: function()
	{
		this._canLeave = true;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.
	  */

	cannotLeave: function()
	{
		this._canLeave = false;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* MESSAGES                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	_publishAlert: function(clazz, title, message, fadeOut)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const hash = message.hashCode();

		const date = moment().format('DD MMM, HH:mm:ss');

		/*------------------------------------------------------------------------------------------------------------*/

		const toast = $('#ami_alert_content > .toast[data-hash="' + hash + '"]');

		/*------------------------------------------------------------------------------------------------------------*/

		if(toast.length === 0)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const html = [
				'<div class="toast" role="alert" ' + (fadeOut ? 'data-delay="60000"' : 'data-autohide="false"') + ' data-hash="' + hash + '" data-cnt="1">',
					'<div class="toast-header">',
						'<strong class="mr-auto text-' + clazz + '">' + this.textToHtml(title) + '</strong>',
						'<small>' + this.textToHtml(date) + '</small>',
						'<button class="ml-2 mb-1 close" type="button" data-dismiss="toast">',
							'&times;',
						'</button>',
					'</div>',
					'<div class="toast-body">',
						this.textToHtml(message),
					'</div>',
				'</div>',
			];

			/*--------------------------------------------------------------------------------------------------------*/

			$('#ami_alert_content').append(html.join('').replace(this._messageLinkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(() => {

				$('#ami_alert_content > .toast[data-hash="' + hash + '"]').toast('show');
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			toast.find('.toast-header > strong').html(this.textToHtml(title)
					+ ' <span class="badge badge-' + clazz + '">' + toast.attr('data-cnt', parseInt(toast.attr('data-cnt')) + 1).attr('data-cnt') + '</span>');
			toast.find('.toast-header > small').html(this.textToHtml(date));

			toast.toast('show');

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		console.log('AMI :: ' + title.toUpperCase() + ': ' + message + '\n' + this.getStack()); // eslint-disable-line no-console

		$(document).scrollTop(0);

		this.unlock();

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Shows an 'info' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	info: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('info', 'Info', message, fadeOut);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Shows a 'success' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	success: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('success', 'Success', message, fadeOut);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Shows a 'warning' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	warning: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('warning', 'Warning', message, fadeOut);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Shows an 'error' message
	  * @param {String|Array} message the message
	  * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	  */

	error: function(message, fadeOut)
	{
		if(this.typeOf(message) === 'Array')
		{
			message = message.join('. ');
		}

		this._publishAlert('danger', 'Error', message, fadeOut);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Flushes messages
	  */

	flush: function()
	{
		$('#ami_alert_content').empty();
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BREADCRUMB                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Fill the main breadcrumb
	  * @param {Array} items the array of items (HTML format)
	  */

	fillBreadcrumb: function(items)
	{
		let s = this.typeOf(items) === 'Array' ? items.map((item) => '<li class="breadcrumb-item">' + item.replace(/{{WEBAPP_URL}}/g, this.webAppURL) + '</li>').join('')
		                                       : ''
		;

		$('#ami_breadcrumb_content').html(s);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* WEB APPLICATION                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the Web application starts
	  * @event amiWebApp#onReady
	  * @param {String} userData
	  */

	onReady: function()
	{
		if(!this._embedded)
		{
			alert('error: `amiWebApp.onReady()` must be overloaded!'); // eslint-disable-line no-alert
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * This method must be overloaded and is called when the toolbar needs to be updated
	  * @event amiWebApp#onRefresh
	  * @param {Boolean} isAuth
	  */

	onRefresh: function()
	{
		if(!this._embedded)
		{
			alert('error: `amiWebApp.onRefresh()` must be overloaded!'); // eslint-disable-line no-alert
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Starts the Web application
	  * @param {Object} [settings] dictionary of settings (logo_url, home_url, webapp_url, contact_email, about_url, theme_url, locker_url, password_authentication_allowed, certificate_authentication_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, bookmarksAllowed)
	  */

	start: function(settings)
	{
		this._globalDeferred.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			const [
				logoURL, homeURL, webAppURL, contactEmail,
				aboutURL, themeURL, lockerURL, endpointURL,
				passwordAuthenticationAllowed, certificateAuthenticationAllowed,
				createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
				bookmarksAllowed,
			] = this.setup([
				'logo_url', 'home_url', 'webapp_url', 'contact_email',
				'about_url', 'theme_url', 'locker_url', 'endpoint_url',
				'password_authentication_allowed', 'certificate_authentication_allowed',
				'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed',
				'bookmarksAllowed',
			], [
				this.originURL
					+ '/images/logo.png',
				this.webAppURL,
				this.webAppURL,
				'ami@lpsc.in2p3.fr',
				'http://cern.ch/ami/',
				this.originURL + '/twig/AMI/Theme/blue.twig',
				this.originURL + '/twig/AMI/Fragment/locker.twig',
				this.originURL + '/AMI/FrontEnd',
				true, true,
				true, true, true, true,
				true,
			], settings);

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.webAppURL = webAppURL;

			amiCommand.endpoint = endpointURL;

			/*--------------------------------------------------------------------------------------------------------*/

			window.onbeforeunload = (e) => {

				if(!this._canLeave)
				{
					const f = e || window.event;

					if(f)
					{
						f.returnValue = 'Confirm that you want to leave this page?';
					}

					return 'Confirm that you want to leave this page?';
				}
			};

			/*--------------------------------------------------------------------------------------------------------*/

			const controlsURL = this.originURL + '/controls/CONTROLS.json';

			const subappsURL = this.originURL + '/subapps/SUBAPPS.json';

			/*--------------------------------------------------------------------------------------------------------*/

			$.ajax({url: controlsURL, cache: false, crossDomain: true, dataType: 'json'}).then((data1) => {

				$.ajax({url: subappsURL, cache: false, crossDomain: true, dataType: 'json'}).then((data2) => {

					for(const name in data1) {
						this._controls[name.toLowerCase()] = data1[name];
					}

					for(const name in data2) {
						this._subapps[name.toLowerCase()] = data2[name];
					}

					if(!this._embedded)
					{
						/*--------------------------------------------------------------------------------------------*/

						const dict = {
							LOGO_URL: logoURL,
							HOME_URL: homeURL,
							CONTACT_EMAIL: contactEmail,
							ABOUT_URL: aboutURL,
						};

						/*--------------------------------------------------------------------------------------------*/

						$.ajax({url: themeURL, cache: true, crossDomain: true, dataType: 'text'}).then((data3) => {

							$.ajax({url: lockerURL, cache: true, crossDomain: true, dataType: 'text'}).then((data4) => {

								$('body').append(this.formatTWIG(data3, dict) + data4).promise().done(() => {

									this.lock();

									amiLogin._start(
										passwordAuthenticationAllowed,
										certificateAuthenticationAllowed,
										createAccountAllowed,
										changeInfoAllowed,
										changePasswordAllowed,
										changeCertificateAllowed,
										bookmarksAllowed,
									).done(() => {

										this.unlock();

									}).fail((message) => {

										this.error(message);
									});
								});

							}, () => {

								alert('could not open `' + lockerURL + '`, please reload the page...'); // eslint-disable-line no-alert
							});

						}, () => {

							alert('could not open `' + themeURL + '`, please reload the page...'); // eslint-disable-line no-alert
						});

						/*--------------------------------------------------------------------------------------------*/
					}
					else
					{
						/*--------------------------------------------------------------------------------------------*/

						let data3 = '';

						if($('#ami_alert_content').length === 0) {
							data3 += '<div id="ami_alert_content"></div>';
						}

						if($('#ami_login_menu_content').length === 0) {
							data3 += '<div id="ami_login_menu_content"></div>';
						}

						/*--------------------------------------------------------------------------------------------*/

						$.ajax({url: lockerURL, cache: true, crossDomain: true, dataType: 'text'}).done((data4) => {

							$('body').prepend(data3 + data4).promise().done(() => {

								this.lock();

								amiLogin._start(
									passwordAuthenticationAllowed,
									certificateAuthenticationAllowed,
									createAccountAllowed,
									changeInfoAllowed,
									changePasswordAllowed,
									changeCertificateAllowed,
									bookmarksAllowed,
								).done(() => {

									this.unlock();

								}).fail((message) => {

									this.error(message);
								});
							});
						});

						/*--------------------------------------------------------------------------------------------*/
					}

				}, () => {

					alert('could not open `' + subappsURL + '`, please reload the page...'); // eslint-disable-line no-alert
				});

			}, () => {

				alert('could not open `' + controlsURL + '`, please reload the page...'); // eslint-disable-line no-alert
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((message) => {

			alert(message); // eslint-disable-line no-alert
		});

		return this;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONTROLS                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads a control
	  * @param {String} control the array of control name
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadControl: function(control, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		if(control.indexOf('ctrl:') === 0)
		{
			control = control.substring(5);
		}

		const descr = this._controls[control.toLowerCase()];

		/*------------------------------------------------------------------------------------------------------------*/

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					const clazz = window[
						descr.clazz
					];

					const promise = loaded[0] ? clazz.prototype.onReady.apply(clazz.prototype)
					                          : /*----------------*/ null /*----------------*/
					;

					_ami_internal_then(promise, () => {

						result.resolveWith(context, [/*--------------------*/ clazz /*--------------------*/]);

					}, (message) => {

						result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
					});
				}
				catch(message)
				{
					result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
				}

			}, (message) => {

				result.rejectWith(context, ['could not load control `' + control + '`: ' + message]);
			});
		}
		else
		{
			result.rejectWith(context, ['could not find control `' + control + '`']);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} params ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControl: function(parent, owner, control, params, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.loadControl(control, settings).done((constructor) => {

			let instance = new constructor(parent, owner);

			_ami_internal_then(constructor.prototype.render.apply(instance, params), function() {

				result.resolveWith(context, [instance].concat([...arguments]));

			}, (message) => {

				result.rejectWith(context, [message]);
			});

		}).fail((message) => {

			result.rejectWith(context, [message]);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in the body
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} paramsWithoutSettings ???
	  * @param {Object} controlSettings ???
	  * @param {Object} parentSettings ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlInBody: function(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		try
		{
			let PARAMS = [];
			let SETTINGS = {};

			/*--------------------------------------------------------------------------------------------------------*/

			for(let key in parentSettings) {
				SETTINGS[key] = parentSettings[key];
			}

			for(let key in controlSettings) {
				SETTINGS[key] = controlSettings[key];
			}

			/*--------------------------------------------------------------------------------------------------------*/

			//////.push(selector);

			Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);

			PARAMS.push(SETTINGS);

			/*--------------------------------------------------------------------------------------------------------*/

			this.createControl(parent, owner, control, PARAMS).done(function() {

				result.resolveWith(context, [...arguments]);

			}).fail((message) => {

				result.rejectWith(context, [message]);
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		catch(message)
		{
			result.rejectWith(context, [message]);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in a container
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} control ???
	  * @param {Array} paramsWithoutSettings ???
	  * @param {Object} controlSettings ???
	  * @param {Object} parentSettings ???
	  * @param {String} icon ???
	  * @param {String} title ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlInContainer: function(parent, owner, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		try
		{
			parent.appendItem('<i class="fa fa-' + this.textToHtml(icon) + '"></i> ' + this.textToHtml(title)).done((selector) => {

				let PARAMS = [];
				let SETTINGS = {};

				/*----------------------------------------------------------------------------------------------------*/

				for(let key in parentSettings) {
					SETTINGS[key] = parentSettings[key];
				}

				for(let key in controlSettings) {
					SETTINGS[key] = controlSettings[key];
				}

				/*----------------------------------------------------------------------------------------------------*/

				PARAMS.push(selector);

				Array.prototype.push.apply(PARAMS, controlParamsWithoutSettings);

				PARAMS.push(SETTINGS);

				/*----------------------------------------------------------------------------------------------------*/

				this.createControl(parent, owner, control, PARAMS).done(function() {

					result.resolveWith(context, [...arguments]);

				}).fail((message) => {

					result.rejectWith(context, [message]);
				});

				/*----------------------------------------------------------------------------------------------------*/
			});
		}
		catch(message)
		{
			result.rejectWith(context, [message]);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously create a control in a container from a WEB link
	  * @param {Object} [parent] ???
	  * @param {Object} [owner] ???
	  * @param {String} el ???
	  * @param {Object} parentSettings ???
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	createControlFromWebLink: function(parent, owner, el, parentSettings, settings)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let dataCtrl = el.hasAttribute('data-ctrl') ? el.getAttribute('data-ctrl')
		                                            : ''
		;

		let dataCtrlLocation = el.hasAttribute('data-ctrl-location') ? el.getAttribute('data-ctrl-location')
		                                                             : ''
		;

		/*------------------------------------------------------------------------------------------------------------*/

		let dataParams = el.hasAttribute('data-params') ? JSON.parse(el.getAttribute('data-params'))
		                                                : []
		;

		let dataSettings = el.hasAttribute('data-settings') ? JSON.parse(el.getAttribute('data-settings'))
		                                                    : {}
		;

		/*------------------------------------------------------------------------------------------------------------*/

		let dataIcon = el.hasAttribute('data-icon') ? el.getAttribute('data-icon')
		                                            : 'question'
		;

		let dataTitle = el.hasAttribute('data-title') ? el.getAttribute('data-title')
		                                              : 'Unknown'
		;

		/*------------------------------------------------------------------------------------------------------------*/

		this.lock();

		/**/ if(dataCtrlLocation === 'body')
		{
			return this.createControlInBody(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, settings).done(() => {

				this.unlock();

			}).fail((message) => {

				this.error(message);
			});
		}
		else
		{
			return this.createControlInContainer(parent, owner, dataCtrl, dataParams, dataSettings, parentSettings, dataIcon, dataTitle, settings).done(() => {

				this.unlock();

			}).fail((message) => {

				this.error(message);
			});
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* SUBAPPS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	triggerLogin: function()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		if(this._isReady)
		{
			_ami_internal_then(this._currentSubAppInstance.onLogin(this.args['userdata']), (message) => {

				_ami_internal_always(this.onRefresh(true), () => {

					result.resolve(message);
				});

			}, (message) => {

				_ami_internal_always(this.onRefresh(true), () => {

					result.reject(message);
				});
			});
		}
		else
		{
			result.resolve();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	triggerLogout: function()
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		if(this._isReady)
		{
			_ami_internal_then(this._currentSubAppInstance.onLogout(this.args['userdata']), (message) => {

				_ami_internal_always(this.onRefresh(false), () => {

					result.resolve(message);
				});

			}, (message) => {

				_ami_internal_always(this.onRefresh(false), () => {

					result.reject(message);
				});
			});
		}
		else
		{
			result.resolve();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Asynchronously loads a subapp
	  * @param {String} subapp the subapp
	  * @param {?} [userdata] the user data
	  * @param {Object} [settings] dictionary of settings (context)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSubApp: function(subapp, userdata, settings)
	{
		const result = $.Deferred();

		const [context] = this.setup(
			['context'],
			[result],
			settings
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.lock();

		result.always(() => {

			this.unlock();
		});

		/*------------------------------------------------------------------------------------------------------------*/

		if(subapp.indexOf('subapp:') === 0)
		{
			subapp = subapp.substring(7);
		}

		const descr = this._subapps[subapp.toLowerCase()];

		/*------------------------------------------------------------------------------------------------------------*/

		if(descr)
		{
			this.loadScripts(this.originURL + '/' + descr.file).then((loaded) => {

				try
				{
					this._currentSubAppInstance.onExit(userdata);

					const instance = window[descr.instance];

					this._currentSubAppInstance = instance;

					/**/

					this.fillBreadcrumb(descr.breadcrumb);

					const promise = loaded[0] ? instance.onReady(userdata)
					                          : /*------*/ null /*------*/
					;

					_ami_internal_then(promise, () => {

						const promise = amiLogin.isAuthenticated() ? this.triggerLogin()
						                                           : this.triggerLogout()
						;

						promise.then(() => {

							result.resolveWith(context, [/*------------------*/ instance /*------------------*/]);

						}, (message) => {

							result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
						});

					}, (message) => {

						result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
					});
				}
				catch(message)
				{
					result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
				}

			}, (message) => {

				result.rejectWith(context, ['could not load subapp `' + subapp + '`: ' + message]);
			});
		}
		else
		{
			result.rejectWith(context, ['could not find subapp `' + subapp + '`']);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Loads a subapp by URL
	  * @param {String} defaultSubApp if 'amiWebApp.args["subapp"]' is null, the default subapp
	  * @param {?} [defaultUserData] if 'amiWebApp.args["userdata"]' is null, the default user data
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	loadSubAppByURL: function(defaultSubApp, defaultUserData)
	{
		const result = $.Deferred();

		if(this.args['v'])
		{
			amiCommand.execute('GetHashInfo -hash="' + this.textToString(this.args['v']) + '"').fail((data, message) => {

				result.reject(message);

			}).done((data) => {

				let json;

				try
				{
					json = JSON.parse(this.jspath('..field{.@name==="json"}.$', data)[0] || '{}');
				}
				catch(message)
				{
					json = {/* EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON   EMPTY JSON */};
				}

				/*----------------------------------------------------------------------------------------------------*/

				const subapp = json['subapp'] || defaultSubApp;
				const userdata = json['userdata'] || defaultUserData;

				this.loadSubApp(subapp, userdata).then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});

				/*----------------------------------------------------------------------------------------------------*/
			});
		}
		else
		{
			if(!amiRouter.check())
			{
				/*----------------------------------------------------------------------------------------------------*/

				const subapp = this.args['subapp'] || defaultSubApp;
				const userdata = this.args['userdata'] || defaultUserData;

				this.loadSubApp(subapp, userdata).then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});

				/*----------------------------------------------------------------------------------------------------*/
			}
		}

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
