/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

import amiRouter from './AMIRouter';

import amiExtension from './AMIExtension';

/*--------------------------------------------------------------------------------------------------------------------*/

import { _subapps } from './utilities/subapps';

import { _controls } from './utilities/controls';

import { typeOf, asArray, setup } from './utilities/tools';

import { error, flush, info, success, warning } from './utilities/messages';

import { getStack, lock, unlock, modalEnter, modalLeave, _canLeave, canLeave } from './utilities/locks';

import { loadResources, loadSheets, loadScripts, loadJSONs, loadXMLs, loadHTMLs, loadTWIGs, loadTexts } from './utilities/ressources';

import { textToHtml, htmlToText, textToString, stringToText, htmlToString, stringToHtml, textToSQL, sqlToText } from './utilities/text';

import { fillBreadcrumb, formatTWIG } from './utilities/twig';

/*--------------------------------------------------------------------------------------------------------------------*/

import logo from '../images/logo.png';
import background from '../images/background.jpg';

/*--------------------------------------------------------------------------------------------------------------------*/

class AMIWebApp
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	_embedded = false;
	_noBootstrap = false;
	_noDateTimePicker = false;
	_noSelect2 = false;

	/*----------------------------------------------------------------------------------------------------------------*/

	_globalDeferred = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	_isReady = false;

	/*----------------------------------------------------------------------------------------------------------------*/

	_currentSubAppInstance = new function() {
		this.onReady = function() {
		};
		this.onExit = function() {
		};
		this.onLogin = function() {
		};
		this.onLogout = function() {
		};
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

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONSTRUCTOR                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

	constructor()
	{
		amiExtension();

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
			resourcesJS.push(`${this.originURL}/js/assets/js/popper.min.js`);
		}

		if(!window.moment)
		{
			resourcesJS.push(`${this.originURL}/js/assets/js/moment.min.js`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this._noBootstrap && (typeof jQuery.fn.modal) !== 'function')
		{
			resourcesJS.push(`${this.originURL}/js/assets/css/bootstrap.min.css`);
			resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap.min.js`);
		}
/*
		if(!this._noDateTimePicker && (typeof jQuery.fn.datetimepicker) !== 'function')
		{
			resourcesCSS.push(`${this.originURL}/js/assets/css/bootstrap-datetimepicker.min.css`);
			resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap-datetimepicker.min.js');
		}
*/
		if(!this._noSelect2 && (typeof jQuery.fn.select2) !== 'function')
		{
			resourcesCSS.push(`${this.originURL}/js/assets/css/select2.min.css`);
			resourcesJS.push(`${this.originURL}/js/assets/js/select2.min.js`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.loadResources([
			...resourcesCSS,
			...resourcesJS,
		]).done((resources) => {

			this._globalDeferred.resolve(resources);

		}).fail((message) => {

			this._globalDeferred.reject(message);

		}).always(() => {

			require('../styles/ami/ami.scss');
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TOOLS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	typeOf = typeOf;

	asArray = asArray;

	setup = setup;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STACK                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	getStack = getStack;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* LOCK                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	lock = lock;
	unlock = unlock;

	modalEnter = modalEnter;
	modalLeave = modalLeave;

	canLeave = canLeave;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TEXT                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	textToHtml = textToHtml;
	htmlToText = htmlToText;

	textToString = textToString;
	stringToText = stringToText;

	htmlToString = htmlToString;
	stringToHtml = stringToHtml;

	textToSQL = textToSQL;
	sqlToText = sqlToText;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	loadResources = loadResources;
	loadSheets = loadSheets;
	loadScripts = loadScripts;
	loadJSONs = loadJSONs;
	loadXMLs = loadXMLs;
	loadHTMLs = loadHTMLs;
	loadTWIGs = loadTWIGs;
	loadTexts = loadTexts;

	error = error;
	info = info;
	success = success;
	warning = warning;
	flush = flush;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BREADCRUMB                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	fillBreadcrumb = fillBreadcrumb;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BREADCRUMB                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	formatTWIG = formatTWIG;

	/*----------------------------------------------------------------------------------------------------------------*/

	start(options)
	{
		this._globalDeferred.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			const [
				logoURL, backgroundURL, homeURL, webAppURL, contactEmail,
				aboutURL, themeURL, lockerURL, httpEndpointURL, mqttEndpointURL,
				ssoAutoAuthentication,
				ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
				createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
				captchaAllowed,
				bookmarksAllowed,
			] = this.setup([
				'logo_url', 'background_url', 'home_url', 'webapp_url', 'contact_email',
				'about_url', 'theme_url', 'locker_url', 'http_endpoint_url', 'mqtt_endpoint_url',
				'sso_auto_authentication',
				'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'logout_allowed',
				'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed',
				'captcha_allowed',
				'bookmarks_allowed',
			], [
				logo,
				background,
				this.webAppURL,
				this.webAppURL,
				'ami@lpsc.in2p3.fr',
				'https://cern.ch/ami/',
				this.originURL + '/twig/Themes/blue.twig',
				this.originURL + '/twig/Lockers/default.twig',
				this.originURL + '/AMI/FrontEnd',
				this.originURL + '/MQTT',
				false,
				false, true, true, true,
				true, true, true, true,
				true,
				true,
			], options);

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.webAppURL = webAppURL;

			amiCommand.init(httpEndpointURL, mqttEndpointURL);

			/*--------------------------------------------------------------------------------------------------------*/

			window.onbeforeunload = (e) => {

				if(!_canLeave)
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

			const controlsURL = `${this.originURL}/controls/CONTROLS.json`;

			const subappsURL = `${this.originURL}/subapps/SUBAPPS.json`;

			/*--------------------------------------------------------------------------------------------------------*/

			$.ajax({url: controlsURL, cache: false, crossDomain: true, dataType: 'json'}).then((data1) => {

				$.ajax({url: subappsURL, cache: false, crossDomain: true, dataType: 'json'}).then((data2) => {

					for(const name in data1)
					{
						_controls[name.toLowerCase()] = data1[name];
					}

					for(const name in data2)
					{
						_subapps[name.toLowerCase()] = data2[name];
					}

					if(!this._embedded)
					{
						/*--------------------------------------------------------------------------------------------*/

						const dict = {
							LOGO_URL: logoURL,
							BACKGROUND_URL: backgroundURL,
							HOME_URL: homeURL,
							CONTACT_EMAIL: contactEmail,
							ABOUT_URL: aboutURL,
						};

						/*--------------------------------------------------------------------------------------------*/

						$.ajax({url: themeURL, cache: true, crossDomain: true, dataType: 'text'}).then((data3) => {

							$.ajax({url: lockerURL, cache: true, crossDomain: true, dataType: 'text'}).then((data4) => {

								$('body').append(formatTWIG(data3, dict) + data4).promise().done(() => {

									this.unlock();

									success('Yes');
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

						if($('#ami_alert_content').length === 0)
						{
							data3 += '<div id="ami_alert_content"></div>';
						}

						if($('#ami_login_menu_content').length === 0)
						{
							data3 += '<div id="ami_login_menu_content"></div>';
						}

						/*--------------------------------------------------------------------------------------------*/

						$.ajax({url: lockerURL, cache: true, crossDomain: true, dataType: 'text'}).done((data4) => {

							$('body').prepend(data3 + data4).promise().done(() => {

								this.unlock();

								success('Yes');
							});
						});

						/*--------------------------------------------------------------------------------------------*/
					}

				}, () => {

					alert(`cannot open '${subappsURL}', please reload the page...`); // eslint-disable-line no-alert
				});

			}, () => {

				alert(`cannot open '${controlsURL}', please reload the page...`); // eslint-disable-line no-alert
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((message) => {

			alert(message); // eslint-disable-line no-alert
		});

		return this;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

const amiWebApp = new AMIWebApp();

if(typeof window !== 'undefined')
{
	window.amiWebApp = amiWebApp;
}

export default amiWebApp;

/*--------------------------------------------------------------------------------------------------------------------*/
