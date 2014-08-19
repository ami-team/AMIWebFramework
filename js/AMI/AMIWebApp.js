/*
 * AMIWebApp class
 */

function AMIWebApp() {
	/*-----------------------------------------------------------------*/
	/* CONSTRUCTOR                                                     */
	/*-----------------------------------------------------------------*/

	$.ajax({
		url: 'js/jspath.min.js',
		dataType: 'script',
		context: this,
		async: false,
	});
/*
	$.ajax({
		url: 'js/AMI/AMILogin.js',
		dataType: 'script',
		context: this,
		async: false,
	});
*/
	$.ajax({
		url: 'js/AMI/AMICommand.js',
		dataType: 'script',
		context: this,
		async: false,
	});

	/*-----------------------------------------------------------------*/

	$.ajax({
		url: 'html/AMI/Fragment/success.html',
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentSuccess = data;
	});

	$.ajax({
		url: 'html/AMI/Fragment/error.html',
		dataType: 'html',
		context: this,
		async: false,
	}).done(function(data) {
		this.fragmentError = data;
	});

	/*-----------------------------------------------------------------*/
	/* ALIAS FOR `JSPath.apply`                                        */
	/*-----------------------------------------------------------------*/

	this.jspath = JSPath.apply;

	/*-----------------------------------------------------------------*/
	/* DYNAMIC JAVASCRIPT LOADING                                      */
	/*-----------------------------------------------------------------*/

	this._loadScripts = function(deferred, context, scripts) {

		if(scripts.length > 0) {

			$.ajax({
				url: scripts[0],
				type: 'HEAD',
			}).done(function(data) {
				$('head').append('<script type="text/javascript" src="' + scripts[0] + '" />').promise().done(function() {
					scripts.splice(0, 1);
					amiWebApp._loadScripts(deferred, context, scripts);
				});
			}).fail(function() {
				if(context) {
					deferred.rejectWith(context, ['could not load script `' + scripts[0] + '`: ' + e]);
				} else {
					deferred.reject('could not load script `' + scripts[0] + '`: ' + e);
				}
			});
		} else {
			if(context) {
				deferred.resolveWith(context);
			} else {
				deferred.resolve();
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.loadScripts = function(scripts, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		var result = $.Deferred();
		this._loadScripts(result, context, scripts);
		return result;
	};

	/*-----------------------------------------------------------------*/
	/* DYNAMIC CSS LOADING                                             */
	/*-----------------------------------------------------------------*/

	this._loadStyles = function(deferred, context, sheets) {

		if(sheets.length > 0) {

			$.ajax({
				url: sheets[0],
				type: 'HEAD',
			}).done(function(data) {
				$('head').append('<link rel="stylesheet" type="text/css" href="' + sheets[0] + '" />').promise().done(function() {
					sheets.splice(0, 1);
					amiWebApp._loadStyles(deferred, context, sheets);
				});
			}).fail(function() {
				if(context) {
					deferred.rejectWith(context, ['could not load sheet `' + sheets[0] + '`']);
				} else {
					deferred.reject('could not load sheet `' + sheets[0] + '`');
				}
			});
		} else {
			if(context) {
				deferred.resolveWith(context);
			} else {
				deferred.resolve();
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.loadStyles = function(sheets, settings) {

		var context = undefined;

		if(settings) {

			if('context' in settings) {
				context = settings['context'];
			}
		}

		var result = $.Deferred();
		this._loadStyles(result, context, sheets);
		return result;
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

		return $.ajax({
			url: url,
			dataType: 'html',
			context: context,
		});
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

		var result = $.Deferred();

		$('#' + targetID).html(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		return result;
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

		var result = $.Deferred();

		$('#' + targetID).prepend(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		return result;
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

		var result = $.Deferred();

		$('#' + targetID).append(html).promise().done(function() {

			$('#' + targetID + ' .amitt').tooltip({delay: {show: 500, hide: 100}});
			$('#' + targetID + ' .amipo').popover({html: true});

			if(context) {
				result.resolveWith(context);
			} else {
				result.resolve();
			}
		});

		return result;
	};

	/*-----------------------------------------------------------------*/
	/* FORMAT HTML                                                     */
	/*-----------------------------------------------------------------*/

	this.formatHTML = function(html, settings) {

		if(settings) {

			if('dict' in settings) {
				var dict = settings['dict'];

				if(dict instanceof Array) {

					var _orig = html;

					html = '';

					$.each(dict, function(indx, DICT) {
						var _html = _orig;

						$.each(DICT, function(key, val) {
							var regexp = new RegExp('\%\%' + key + '\%\%', 'g');
							_html = _html.replace(regexp, val);
						});

						html += _html;
					});
				} else if(dict instanceof Object) {

					$.each(dict, function(key, val) {
						var regexp = new RegExp('\%\%' + key + '\%\%', 'g');
						html = html.replace(regexp, val);
					});
				} else {
					throw 'wrong parameter type for settings[\'dict\'] (expecting `Object` or `Array[Object]`)';
				}
			}
		}

		return html;
	};

	/*-----------------------------------------------------------------*/

	this.start = function()
	{
		alert('warning: function `amiWebApp.start()` must be overloaded !');
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiWebApp = new AMIWebApp();

/*-------------------------------------------------------------------------*/
