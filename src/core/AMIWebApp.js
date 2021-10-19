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

import amiRouter from './AMIRouter';
import moment from 'moment';
import {  } from 'bootstrap';

class AMIWebApp
{

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	_idRegExp = new RegExp('[a-zA-Z][a-zA-Z0-9]{7}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{4}_[a-zA-Z0-9]{12}', 'g');

	_linkExp = new RegExp('\\[([^\\]]*)\\]\\(([^\\)]*)\\)', 'g');

	/*----------------------------------------------------------------------------------------------------------------*/

	_embedded = false;
	_noBootstrap = false;
	_noDateTimePicker = false;
	_noSelect2 = false;

	/*----------------------------------------------------------------------------------------------------------------*/

	_globalDeferred = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	_sheets = [];
	_scripts = [];

	_controls = {};
	_subapps = {};

	_isReady = false;
	_canLeave = true;
	_lockCnt = 0x00;

	/*----------------------------------------------------------------------------------------------------------------*/

	_currentSubAppInstance = new function()
	{
		this.onReady = function() {};
		this.onExit = function() {};
		this.onLogin = function() {};
		this.onLogout = function() {};
	};

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The origin URL
	 * @type {String}
	 */

	originURL = '/';

	/**
	 * The webapp URL
	 * @type {String}
	 */

	webAppURL = '/';

	/**
	 * The anchor part of the webapp URL
	 * @type {String}
	 */

	hash = '';

	/**
	 * The arguments extracted from the webapp URL
	 * @type {Object<String, String>}
	 */

	args = {};

	constructor() {
		/*------------------------------------------------------------------------------------------------------------*/
		/* GET URLS, HASH AND ARGS                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		this.originURL = amiRouter.getOriginURL();
		this.webAppURL = amiRouter.getWebAppURL();

		console.log(this.originURL)

		this.hash = amiRouter.getHash();
		this.args = amiRouter.getArgs();
	}


	setup(optionNames, optionDefaults, options)
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

		if(options) {
			for(let i = 0; i < l; i++) {
				result.push(optionNames[i] in options ? options[optionNames[i]] : optionDefaults[i]);
			}
		}
		else {
			for(let i = 0; i < l; i++) {
				result.push(/*---------------------------------------------------*/ optionDefaults[i]);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STACK                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	getStack()
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
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* LOCK                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Locks the Web application
	 */

	lock()
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
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Unlocks the Web application
	 */

	unlock()
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
	}

	formatTWIG(twig, dict = {}, twigs = {})
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
	}

	textToHtml(s)
	{
		return s;
	}

	start(options)
	{
			/*--------------------------------------------------------------------------------------------------------*/

			const [
				logoURL, homeURL, webAppURL, contactEmail,
				aboutURL, themeURL, lockerURL, endpointURL,
				ssoAutoAuthentication,
				ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
				createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
				captchaAllowed,
				bookmarksAllowed,
			] = this.setup([
				'logo_url', 'home_url', 'webapp_url', 'contact_email',
				'about_url', 'theme_url', 'locker_url', 'endpoint_url',
				'sso_auto_authentication',
				'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'logout_allowed',
				'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed',
				'captcha_allowed',
				'bookmarks_allowed',
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
				false,
				false, true, true, true,
				true, true, true, true,
				true,
				true,
			], options);

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

									// this.lock();

									// amiLogin._start(
									// 	ssoAutoAuthentication,
									// 	ssoAuthenticationAllowed,
									// 	passwordAuthenticationAllowed,
									// 	certificateAuthenticationAllowed,
									// 	logoutAllowed,
									// 	createAccountAllowed,
									// 	changeInfoAllowed,
									// 	changePasswordAllowed,
									// 	changeCertificateAllowed,
									// 	captchaAllowed,
									// 	bookmarksAllowed
									// ).done(() => {
									//
									// 	this.unlock();
									//
									// }).fail((message) => {
									//
									// 	this.error(message);
									// });
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

								// this.lock();

								// amiLogin._start(
								// 	ssoAutoAuthentication,
								// 	ssoAuthenticationAllowed,
								// 	passwordAuthenticationAllowed,
								// 	certificateAuthenticationAllowed,
								// 	logoutAllowed,
								// 	createAccountAllowed,
								// 	changeInfoAllowed,
								// 	changePasswordAllowed,
								// 	changeCertificateAllowed,
								// 	captchaAllowed,
								// 	bookmarksAllowed
								// ).done(() => {
								//
								// 	this.unlock();
								//
								// }).fail((message) => {
								//
								// 	this.error(message);
								// });
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

		return this;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* MESSAGES                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	_publishAlert(clazz, title, message, fadeOut)
{
	/*------------------------------------------------------------------------------------------------------------*/

	if(this.typeOf(message) === 'Array')
	{
		message = message.join('. ');
	}
	else
	{
		if(message)
		{
			message = message.toString();
		}
		else
		{
			message = '';
		}
	}

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

		$('#ami_alert_content').append(html.join('').replace(this._linkExp, '<a href="$1" target="_blank">$2</a>')).promise().done(() => {

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
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Shows an 'info' message
	 * @param {String|Array} message the message
	 * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	 */

	info(message, fadeOut)
	{
		this._publishAlert('info', 'Info', message, fadeOut);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Shows a 'success' message
	 * @param {String|Array} message the message
	 * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	 */

	success(message, fadeOut)
	{
		this._publishAlert('success', 'Success', message, fadeOut);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Shows a 'warning' message
	 * @param {String|Array} message the message
	 * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	 */

	warning(message, fadeOut)
	{
		this._publishAlert('warning', 'Warning', message, fadeOut);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Shows an 'error' message
	 * @param {String|Array} message the message
	 * @param {Boolean} [fadeOut=false] if True, the message disappears after 60s
	 */

	error(message, fadeOut)
	{
		this._publishAlert('danger', 'Error', message, fadeOut);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Flushes messages
	 */

	flush()
	{
		$('#ami_alert_content').empty();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TOOLS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	typeOf(x)
	{
		const name = Object.prototype.toString.call(x);

		return name.startsWith('[object ') ? name.substring(8, name.length - 1)
			: /*-----------*/ '' /*-----------*/
			;
		}
	}

const amiWebApp = new AMIWebApp();
export default amiWebApp;

if(typeof window !== 'undefined') {
	window.amiWebApp = amiWebApp;
}