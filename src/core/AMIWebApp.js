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

import amiAuth from './AMIAuth';

import amiRouter from './AMIRouter';

import amiExtensions from './AMIExtension';

/*--------------------------------------------------------------------------------------------------------------------*/

import { typeOf, asArray, setup } from './utilities/tools';

import {_subapps, loadSubApp, loadSubAppByURL} from './utilities/subapps';

import { error, flush, info, success, warning } from './utilities/messages';

import { fillBreadcrumb, replaceHTML, appendHTML, prependHTML, formatTWIG } from './utilities/view';

import { getStack, lock, unlock, modalEnter, modalLeave, _canLeave, canLeave } from './utilities/locks';

import { loadResources, loadSheets, loadScripts, loadJSONs, loadXMLs, loadHTMLs, loadTWIGs, loadTexts } from './utilities/ressources';

import { textToHtml, htmlToText, textToString, stringToText, htmlToString, stringToHtml, textToSQL, sqlToText } from './utilities/text';

import { _controls, loadControl, createControl, createControlInBody, createControlInContainer, createControlFromWebLink } from './utilities/controls';

/*--------------------------------------------------------------------------------------------------------------------*/

import defaultLogoURL from '../images/logo.png';

import defaultBackgroundURL from '../images/background.jpg';

/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 */

class AMIWebApp
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	#embedded = false;
	#noBootstrap = false;
	#noDateTimePicker = false;
	#noSelect2 = false;

	/*----------------------------------------------------------------------------------------------------------------*/

	#globalDeferred = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	_isReady = false;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The webapp URL
	 * @type {String}
	 */

	webAppURL = '';

	/**
	 * The script URL
	 * @type {String}
	 */

	scriptURL = '';

	/**
	 * The origin URL
	 * @type {String}
	 */

	originURL = '';

	/**
	 * The arguments extracted from the webapp URL
	 * @type {Object<String, String>}
	 */

	args = {};

	/**
	 * The anchor part of the webapp URL
	 * @type {String}
	 */

	hash = '';

	/**
	 * The Twitter Bootstrap's version (default, 'v4')
	 * @type {String}
	 */

	bootstrapVersion = 'v4';

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONSTRUCTOR                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

	constructor()
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* AMI EXTENSIONS                                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		amiExtensions();

		/*------------------------------------------------------------------------------------------------------------*/
		/* GET SCRIPT FLAGS                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

		const scriptArgs = amiRouter.getScriptArgs();

		/*------------------------------------------------------------------------------------------------------------*/

		this.#embedded = 'embedded' in scriptArgs;

		this.#noBootstrap = 'nobootstrap' in scriptArgs;

		/*------------------------------------------------------------------------------------------------------------*/
		/* GET URLS, ARGS AND HASH                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		this.webAppURL = amiRouter.getWebAppURL();
		this.scriptURL = amiRouter.getScriptURL();
		this.originURL = amiRouter.getOriginURL();

		this.args = amiRouter.getWebAppArgs();
		this.hash = amiRouter.getWebAppHash();

		/*------------------------------------------------------------------------------------------------------------*/

		this.bootstrapVersion = scriptArgs.bootstrap || 'v4';

		/*------------------------------------------------------------------------------------------------------------*/
		/* LOAD SHEETS AND SCRIPTS                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		const resourcesCSS = [];
		const resourcesJS = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(!window.Popper) {
			resourcesJS.push(`${this.originURL}/js/assets/js/popper.min.js`);
		}

		if(!window.moment) {
			resourcesJS.push(`${this.originURL}/js/assets/js/moment.min.js`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this.#noBootstrap && (typeof jQuery.fn.modal) !== 'function')
		{
			if(this.bootstrapVersion === 'v5')
			{
				resourcesJS.push(`${this.originURL}/js/assets/css/bootstrap5.min.css`);
				resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap5.min.js`);
			}
			else
			{
				resourcesJS.push(`${this.originURL}/js/assets/css/bootstrap4.min.css`);
				resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap4.min.js`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.loadResources([
			...resourcesCSS,
			...resourcesJS,
		]).done((resources) => {

			this.#globalDeferred.resolve(resources);

		}).fail((message) => {

			this.#globalDeferred.reject(message);

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
	/* LOCKS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	lock = lock;
	unlock = unlock;

	modalEnter = modalEnter;
	modalLeave = modalLeave;

	canLeave = canLeave;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* MESSAGES                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	error = error;
	info = info;
	success = success;
	warning = warning;

	flush = flush;

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
	/* BREADCRUMB                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	fillBreadcrumb = fillBreadcrumb;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* HTML                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	replaceHTML = replaceHTML;
	prependHTML = prependHTML;
	appendHTML = appendHTML;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TWIG                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	formatTWIG = formatTWIG;

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

	/*----------------------------------------------------------------------------------------------------------------*/
	/* SUBAPPS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	loadSubApp = loadSubApp;

	loadSubAppByURL = loadSubAppByURL;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONTROLS                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	loadControl = loadControl;

	createControl = createControl;
	createControlInBody = createControlInBody;
	createControlInContainer = createControlInContainer;
	createControlFromWebLink = createControlFromWebLink;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* WEB APPLICATION                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * This method must be overloaded and is called when the Web application starts
	 * @event amiWebApp#onReady
	 * @param {string} userdata
	 */

	onReady(userdata)
	{
		if(!this.#embedded)
		{
			alert('error: \'amiWebApp.onReady()\' must be overloaded!'); // eslint-disable-line no-alert
		}

		return null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * This method must be overloaded and is called when the toolbar needs to be updated
	 * @event amiWebApp#onRefresh
	 * @param {boolean} isAuth
	 */

	onRefresh(isAuth)
	{
		if(!this.#embedded)
		{
			alert('error: \'amiWebApp.onRefresh()\' must be overloaded!'); // eslint-disable-line no-alert
		}

		return null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Starts the Web application
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (logoURL, backgroundURL, homeURL, contactEmail, aboutURL, themeURL, lockerURL, httpEndpointURL, mqttEndpointURL, sso_auto_authentication, sso_authentication_allowed, password_authentication_allowed, certificate_authentication_allowed, logout_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, captcha_allowed, bookmarks_allowed)
	 * @returns {AMIWebApp}
	 */

	start(options)
	{
		this.#globalDeferred.done(() => {

			/*--------------------------------------------------------------------------------------------------------*/

			const [
				logoURL, backgroundURL, homeURL, contactEmail, aboutURL,
				themeURL, lockerURL, httpEndpointURL, mqttEndpointURL,
				ssoAutoAuthentication,
				ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
				createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
				captchaAllowed,
				bookmarksAllowed,
			] = setup([
				'logo_url', 'background_url', 'home_url', 'contact_email', 'about_url',
				'theme_url', 'locker_url', 'http_endpoint_url', 'mqtt_endpoint_url',
				'sso_auto_authentication',
				'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'logout_allowed',
				'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed',
				'captcha_allowed',
				'bookmarks_allowed',
			], [
				defaultLogoURL, defaultBackgroundURL, this.webAppURL, 'ami@lpsc.in2p3.fr', 'https://cern.ch/ami/',
				this.originURL + `/twig/${this.bootstrapVersion}/Themes/blue.twig`,
				this.originURL + `/twig/${this.bootstrapVersion}/Lockers/default.twig`,
				this.originURL + '/AMI/FrontEnd', this.originURL + '/MQTT',
				false,
				false, true, true, true,
				true, true, true, true,
				true,
				true,
			], options);

			/*--------------------------------------------------------------------------------------------------------*/

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

					if(!this.#embedded)
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

									lock();

									amiAuth.init(
										ssoAutoAuthentication,
										ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
										createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
										captchaAllowed,
										bookmarksAllowed
									).done(() => {

										unlock();

									}).fail((message) => {

										error(message);
									});
								});

							}, () => {

								alert(`could not open '${lockerURL}', please reload the page...`); // eslint-disable-line no-alert
							});

						}, () => {

							alert(`could not open '${themeURL}', please reload the page...`); // eslint-disable-line no-alert
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

								lock();

								amiAuth.init(
									ssoAutoAuthentication,
									ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
									createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
									captchaAllowed,
									bookmarksAllowed
								).done(() => {

									unlock();

								}).fail((message) => {

									error(message);
								});
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

export default new AMIWebApp();

/*--------------------------------------------------------------------------------------------------------------------*/
