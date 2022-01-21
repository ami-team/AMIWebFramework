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

import * as view from './utilities/view';
import * as jsdoc from './utilities/jsdoc';
import * as locks from './utilities/locks';
import * as tools from './utilities/tools';
import * as strings from './utilities/strings';
import * as subapps from './utilities/subapps';
import * as controls from './utilities/controls';
import * as messages from './utilities/messages';
import * as resources from './utilities/resources';

import * as AMIObject from './AMIObject';

import amiAuth from './AMIAuth';
import amiRouter from './AMIRouter';
import amiCommand from './AMICommand';
import amiExtensions from './AMIExtension';
import amiInterfaces from './AMIInterface';

import JSPath from 'jspath';

import '../images/lpsc.png';
import '../images/cloud.png';
import '../images/glass.png';
import '../images/padlock.png';

import defaultLogoURL from '../images/logo.png';
import defaultBackgroundURL from '../images/background.jpg';

/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI webapp subsystem
 * @namespace amiWebApp
 * @borrows typeOf
 * @borrows asArray
 * @borrows isString
 * @borrows isArray
 * @borrows isObject
 * @borrows isSet
 * @borrows isMap
 * @borrows setup
 * @borrows getStack
 * @borrows lock
 * @borrows unlock
 * @borrows modalEnter
 * @borrows modalLeave
 * @borrows canLeave
 * @borrows error
 * @borrows info
 * @borrows success
 * @borrows warning
 * @borrows flush
 * @borrows base64Encode
 * @borrows base64Decode
 * @borrows textToHtml
 * @borrows htmlToText
 * @borrows textToString
 * @borrows stringToText
 * @borrows htmlToString
 * @borrows stringToHtml
 * @borrows textToSQL
 * @borrows sqlToText
 * @borrows fillBreadcrumb
 * @borrows replaceHTML
 * @borrows prependHTML
 * @borrows appendHTML
 * @borrows formatTWIG
 * @borrows renderJSDoc
 * @borrows jspath
 * @borrows loadResources
 * @borrows loadSheets
 * @borrows loadScripts
 * @borrows loadJSONs
 * @borrows loadXMLs
 * @borrows loadHTMLs
 * @borrows loadTWIGs
 * @borrows loadTexts
 * @borrows _subapps
 * @borrows loadSubApp
 * @borrows loadSubAppByURL
 * @borrows _controls
 * @borrows loadControl
 * @borrows createControl
 * @borrows createControlInBody
 * @borrows createControlInContainer
 * @borrows createControlFromWebLink
 */

class AMIWebApp
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {boolean}
	 */

	#embedded = false;

	/**
	 * @type {boolean}
	 */

	#noBootstrap = false;

	/**
	 * @type {boolean}
	 */

	#noMoment = false;

	/**
	 * @type {boolean}
	 */

	#noSelect2 = false;

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {$.Deferred}
	 */

	#globalDeferred = $.Deferred();

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Indicates whether the framework is ready
	 * @type {boolean}
	 * @private
	 */

	_isReady = false;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The webapp URL
	 * @type {string}
	 */

	webAppURL = '';

	/**
	 * The script URL
	 * @type {string}
	 */

	scriptURL = '';

	/**
	 * The origin URL
	 * @type {string}
	 */

	originURL = '';

	/**
	 * The arguments of the webapp URL
	 * @type {Object<string, string>}
	 */

	args = {};

	/**
	 * The anchor part of the webapp URL
	 * @type {string}
	 */

	hash = '';

	/**
	 * The Twitter Bootstrap's version (default, 4)
	 * @type {number}
	 */

	bootstrapVersion = 4;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONSTRUCTOR                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

	constructor()
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* AMI NAMESPACE                                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		AMIObject.$AMINamespace('ami', {
			awf: {
				buildVersion: '{{AMI_VERSION}}',
				commitIdAbbrev: '{{AMI_COMMIT_ID}}',
				/**/
				command: amiCommand,
				router: amiRouter,
				webapp: ((this)),
				auth: amiAuth,
			},
			vue: require('vue'),
		});

		/*------------------------------------------------------------------------------------------------------------*/
		/* AMI EXTENSIONS                                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		amiExtensions();

		/*------------------------------------------------------------------------------------------------------------*/
		/* AMI INTERFACES                                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		amiInterfaces();

		/*------------------------------------------------------------------------------------------------------------*/
		/* GET SCRIPT FLAGS                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

		const scriptArgs = amiRouter.getScriptArgs();

		/*------------------------------------------------------------------------------------------------------------*/

		this.#embedded = 'embedded' in scriptArgs;

		this.#noBootstrap = 'nobootstrap' in scriptArgs;
		this.#noSelect2 = 'noselect2' in scriptArgs;
		this.#noMoment = 'nomoment' in scriptArgs;

		/*------------------------------------------------------------------------------------------------------------*/
		/* GET URLS, ARGS AND HASH                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		this.webAppURL = amiRouter.getWebAppURL();
		this.scriptURL = amiRouter.getScriptURL();
		this.originURL = amiRouter.getOriginURL();

		this.args = amiRouter.getWebAppArgs();
		this.hash = amiRouter.getWebAppHash();

		/*------------------------------------------------------------------------------------------------------------*/

		this.bootstrapVersion = parseInt(scriptArgs.bootstrap);

		if(Number.isNaN(this.bootstrapVersion))
		{
			this.bootstrapVersion = 4;
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* LOAD SHEETS AND SCRIPTS                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		const resourcesCSS = [];
		const resourcesJS = [];

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this.#noBootstrap && (typeof jQuery.fn.modal) !== 'function')
		{
			if(this.bootstrapVersion === 4)
			{
				resourcesJS.push(`${this.originURL}/js/assets/css/bootstrap4.min.css`);
				resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap4.bundle.min.js`);
			}
			else
			{
				resourcesJS.push(`${this.originURL}/js/assets/css/bootstrap5.min.css`);
				resourcesJS.push(`${this.originURL}/js/assets/js/bootstrap5.bundle.min.js`);
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this.#noSelect2 && (typeof jQuery.fn.select2) !== 'function')
		{
			resourcesCSS.push(`${this.originURL}/js/assets/css/select2.min.css`);
			resourcesJS.push(`${this.originURL}/js/assets/js/select2.min.js`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!this.#noMoment && (typeof window.moment) !== 'function')
		{
			resourcesJS.push(`${this.originURL}/js/assets/js/moment.min.js`);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		resources.loadResources([
			...resourcesCSS,
			...resourcesJS,
		]).done((resources) => {

			/*--------------------------------------------------------------------------------------------------------*/

			require('../styles/ami.scss');

			/*--------------------------------------------------------------------------------------------------------*/

			require('moment-jdateformatparser')(window.moment);

			/*--------------------------------------------------------------------------------------------------------*/

			this.#globalDeferred.resolve(resources);

		}).fail((message) => {

			this.#globalDeferred.reject(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TOOLS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	typeOf = tools.typeOf;

	asArray = tools.asArray;

	isString = tools.isString;
	isArray = tools.isArray;
	isObject = tools.isObject;
	isSet = tools.isSet;
	isMap = tools.isMap;

	setup = tools.setup;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STACK                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	getStack = locks.getStack;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* LOCKS                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	lock = locks.lock;
	unlock = locks.unlock;

	modalEnter = locks.modalEnter;
	modalLeave = locks.modalLeave;

	canLeave = locks.canLeave;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* MESSAGES                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	error = messages.error;
	info = messages.info;
	success = messages.success;
	warning = messages.warning;

	flush = messages.flush;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BASE64 STRINGS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	base64Encode = strings.base64Encode;
	base64Decode = strings.base64Decode;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PLAIN STRINGS                                                                                                  */
	/*----------------------------------------------------------------------------------------------------------------*/

	textToHtml = strings.textToHtml;
	htmlToText = strings.htmlToText;

	textToString = strings.textToString;
	stringToText = strings.stringToText;

	htmlToString = strings.htmlToString;
	stringToHtml = strings.stringToHtml;

	textToSQL = strings.textToSQL;
	sqlToText = strings.sqlToText;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* BREADCRUMB                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	fillBreadcrumb = view.fillBreadcrumb;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* HTML                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	replaceHTML = view.replaceHTML;
	prependHTML = view.prependHTML;
	appendHTML = view.appendHTML;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TWIG                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	formatTWIG = view.formatTWIG;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JSDOC                                                                                                          */
	/*----------------------------------------------------------------------------------------------------------------*/

	renderJSDoc = jsdoc.renderJSDoc;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JSPATH                                                                                                         */
	/*----------------------------------------------------------------------------------------------------------------*/

	jspath = JSPath.apply;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* DYNAMIC RESOURCE LOADING                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	loadResources = resources.loadResources;
	loadSheets = resources.loadSheets;
	loadScripts = resources.loadScripts;
	loadJSONs = resources.loadJSONs;
	loadXMLs = resources.loadXMLs;
	loadHTMLs = resources.loadHTMLs;
	loadTWIGs = resources.loadTWIGs;
	loadTexts = resources.loadTexts;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* SUBAPPS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	_subapps = subapps._subapps;

	loadSubApp = subapps.loadSubApp;

	loadSubAppByURL = subapps.loadSubAppByURL;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* CONTROLS                                                                                                       */
	/*----------------------------------------------------------------------------------------------------------------*/

	_controls = controls._controls;

	loadControl = controls.loadControl;

	createControl = controls.createControl;

	createControlInBody = controls.createControlInBody;
	createControlInContainer = controls.createControlInContainer;

	createControlFromWebLink = controls.createControlFromWebLink;

	/*----------------------------------------------------------------------------------------------------------------*/
	/* WEB APPLICATION                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * This method must be overloaded and is called when the Web application starts
	 * @event amiWebApp#onReady
	 * @param {?*} userdata the user data
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
	 * @param {boolean} isAuth is the user authenticated
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
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (logo_url, background_url, home_url, contact_email, about_url, default_theme_url, dashboard_theme_url, locker_url, endpoint_url, sso_auto_authentication, sso_authentication_allowed, password_authentication_allowed, certificate_authentication_allowed, logout_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, captcha_allowed, bookmarks_allowed)
	 * @returns {AMIWebApp}
	 */

	start(options)
	{
		this.#globalDeferred.done(() => {
			/*--------------------------------------------------------------------------------------------------------*/

			const [
				logoURL, backgroundURL, homeURL, contactEmail, aboutURL,
				defaultThemeURL, dashboardThemeURL, lockerURL, endpointURL,
				ssoAutoAuthentication,
				ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
				createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
				captchaAllowed,
				bookmarksAllowed, dashboardsAllowed
			] = tools.setup([
				'logo_url', 'background_url', 'home_url', 'contact_email', 'about_url',
				'default_theme_url', 'dashboard_theme_url', 'locker_url', 'endpoint_url',
				'sso_auto_authentication',
				'sso_authentication_allowed', 'password_authentication_allowed', 'certificate_authentication_allowed', 'logout_allowed',
				'create_account_allowed', 'change_info_allowed', 'change_password_allowed', 'change_certificate_allowed',
				'captcha_allowed',
				'bookmarks_allowed', 'dashboardsAllowed'
			], [
				defaultLogoURL, defaultBackgroundURL, this.webAppURL, 'ami@lpsc.in2p3.fr', 'https://cern.ch/ami/',
				`${this.originURL}/twig/v${this.bootstrapVersion}/Themes/blue.twig`,
				`${this.originURL}/twig/v${this.bootstrapVersion}/Themes/cloud.twig`,
				`${this.originURL}/twig/v${this.bootstrapVersion}/Lockers/default.twig`,
				`${this.originURL}/AMI/FrontEnd`,
				false,
				false, true, true, true,
				true, true, true, true,
				true,
				true, true,
			], options);

			/*--------------------------------------------------------------------------------------------------------*/

			amiCommand.initHttpClient(endpointURL);

			/*--------------------------------------------------------------------------------------------------------*/

			window.onbeforeunload = (e) => {

				if(!locks._canLeave)
				{
					// noinspection JSDeprecatedSymbols
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
						controls._controls[name.toLowerCase()] = data1[name];
					}

					for(const name in data2)
					{
						subapps._subapps[name.toLowerCase()] = data2[name];
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

						/*--------------------------------------------------------------------------------------------------------*/

						const themeURL = (amiRouter.getWebAppArgs()['subapp'] || '').toLowerCase() === 'userdashboard' ? dashboardThemeURL
						                                                                                               : defaultThemeURL
						;

						/*--------------------------------------------------------------------------------------------*/

						$.ajax({url: themeURL, cache: true, crossDomain: true, dataType: 'text'}).then((data3) => {

							$.ajax({url: lockerURL, cache: true, crossDomain: true, dataType: 'text'}).then((data4) => {

								$('body').append(view.formatTWIG(data3, dict) + data4).promise().done(() => {

									locks.lock();

									amiAuth.init(
										ssoAutoAuthentication,
										ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
										createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
										captchaAllowed,
										bookmarksAllowed, dashboardsAllowed
									).done(() => {

										locks.unlock();

									}).fail((message) => {

										messages.error(message);
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

								locks.lock();

								amiAuth.init(
									ssoAutoAuthentication,
									ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, logoutAllowed,
									createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
									captchaAllowed,
									bookmarksAllowed, dashboardsAllowed
								).done(() => {

									locks.unlock();

								}).fail((message) => {

									messages.error(message);
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
