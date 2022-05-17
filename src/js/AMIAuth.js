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
import * as tools from './utilities/tools';
import * as strings from './utilities/strings';
import * as subapps from './utilities/subapps';

import amiRouter from './AMIRouter';
import amiWebApp from './AMIWebApp';
import amiCommand from './AMICommand';

import signInButtonTwig from '../twigs/sign_in_button.twig';
import signOutButtonTwig from '../twigs/sign_out_button.twig';
import signInModalTwig from '../twigs/Modals/sign_in_modal.twig';
import changeInfoModalTwig from '../twigs/Modals/change_info_modal.twig';
import changePassModalTwig from '../twigs/Modals/change_pass_modal.twig';
import changeCertModalTwig from '../twigs/Modals/change_cert_modal.twig';
import accountStatusModalTwig from '../twigs/Modals/account_status_modal.twig';

import greenCertificateImage from '../images/certificate-green.png';
import pinkCertificateImage from '../images/certificate-pink.png';

import QRCode from 'qrcode';

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiAuth
 * @alias amiLogin
 */

class AMIAuth
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {Object<string,*>}
	 */

	#flags = {};

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @type {Object<string,*>}
	 */

	#userInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#roleInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#bookmarkInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#dashboardInfo = {};

	/**
	 * @type {Object<string,*>}
	 */

	#awfInfo = {};

	/*----------------------------------------------------------------------------------------------------------------*/

	static #setupAWF(awfInfo)
	{
		try
		{
			const result = JSON.parse(strings.base64Decode(awfInfo.config));

			view.setDateTimeFormats(
				result['datetimePrecision'],
				result['datetimeFormat'],
				result['dateFormat'],
				result['timePrecision'],
				result['timeHMSFormat'],
				result['timeHMFormat']
			);

			return result;
		}
		catch(e)
		{
			return {};
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	init(
		signInImageURL, signInText,
		ssoAutoAuthentication,
		ssoAuthenticationAllowed, passwordAuthenticationAllowed, certificateAuthenticationAllowed, signOutAllowed,
		createAccountAllowed, changeInfoAllowed, changePasswordAllowed, changeCertificateAllowed,
		captchaAllowed,
		bookmarksAllowed, dashboardsAllowed
	 ) {
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.#flags = {
			signInImageURL: signInImageURL,
			signInText: signInText,
			ssoAutoAuthentication: ssoAutoAuthentication,
			ssoAuthenticationAllowed: ssoAuthenticationAllowed,
			passwordAuthenticationAllowed: passwordAuthenticationAllowed,
			certificateAuthenticationAllowed: certificateAuthenticationAllowed,
			signOutAllowed: signOutAllowed,
			createAccountAllowed: createAccountAllowed,
			changeInfoAllowed: changeInfoAllowed,
			changePasswordAllowed: changePasswordAllowed,
			changeCertificateAllowed: changeCertificateAllowed,
			captchaAllowed: captchaAllowed,
			bookmarksAllowed: bookmarksAllowed,
			dashboardsAllowed: dashboardsAllowed,
		};

		/*------------------------------------------------------------------------------------------------------------*/
		/* MODAL INITIALIZATION                                                                                       */
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.appendHTML('body', signInModalTwig + changeInfoModalTwig + changePassModalTwig + changeCertModalTwig + accountStatusModalTwig, {dict: this.#flags}).done(() => {

			/*----------------------------------------------------------------------------------------------------*/

			$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit((e) => {

				this.form_login(e);
			});

			$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit((e) => {

				this.form_addUser(e);
			});

			$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit((e) => {

				this.form_remindPass(e);
			});

			$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit((e) => {

				this.form_changeInfo(e);
			});

			$('#E92A1097_983B_4857_875F_07E4659B41B0').submit((e) => {

				this.form_changePass(e);
			});

			/*----------------------------------------------------------------------------------------------------*/

			$('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(() => {

				const pass1 = $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val();
				const pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();

				$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').get(0).setCustomValidity(
					pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
				);
			});

			$('#D487FE72_8D95_4048_BEA3_252274862AF4,#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').change(() => {

				const pass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
				const pass2 = $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val();

				$('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').get(0).setCustomValidity(
					pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
				);
			});

			/*----------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/
		/* SSO AUTHENTICATION                                                                                         */
		/*------------------------------------------------------------------------------------------------------------*/

		window.onmessage = (e) => {

			if(amiRouter.getOriginURL().startsWith(e.origin))
			{
				/**/ if(e.data.token)
				{
					amiWebApp.lock();

					amiCommand.signInByToken(e.data.token).fail((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

						this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always((/*---*/) => {

							amiWebApp.error(message, true);
						});

					}).done((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

						this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).fail((message) => {

							amiWebApp.error(message, true);

						}).done((/*---*/) => {

							if((userInfo.AMIUser || 'guest') === (userInfo.guestUser || 'guest'))
							{
								amiWebApp.error('Authentification failed', true);
							}
							else
							{
								$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

								AMIAuth.#clean();

								amiWebApp.unlock();
							}
						});
					});
				}
				else if(e.data.error)
				{
					amiWebApp.error(e.data.error, true);
				}
			}
		};

		/*------------------------------------------------------------------------------------------------------------*/
		/*  APP INITIALIZATION                                                                                        */
		/*------------------------------------------------------------------------------------------------------------*/

		const userdata = amiRouter.getWebAppArgs()['userdata'] || '';

		/*------------------------------------------------------------------------------------------------------------*/

		amiCommand.signInByCertificate().fail((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			/*--------------------------------------------------------------------------------------------------------*/

			this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always((/*---*/) => {

				result.reject(message);
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).done((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			/*--------------------------------------------------------------------------------------------------------*/

			tools._internal_then(amiWebApp.onReady(userdata), () => {

				amiWebApp._isReady = true;

				this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then((message) => {

					result.resolve(message);

				}, (message) => {

					result.reject(message);
				});

			}, (message) => {

				amiWebApp._isReady = true;

				this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then((/*---*/) => {

					result.reject(message);

				}, (/*---*/) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	static #clean()
	{
		$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
		$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
		$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
		$('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * @param userInfo {Object<string, *>}
	 * @param roleInfo {Object<string, *>}
	 * @param bookmarkInfo {Object<string, *>}
	 * @param dashboardInfo {Object<string, *>}
	 * @param awfInfo {Object<string, *>}
	 * @return {$.Promise}
	 */

	#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		awfInfo = AMIAuth.#setupAWF(awfInfo);

		/*------------------------------------------------------------------------------------------------------------*/

		$('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !userInfo.clientDNInSession || !userInfo.issuerDNInSession);

		$('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', awfInfo.privacyPolicy || `${amiWebApp.originURL}/docs/privacy_policy.html`);
		$('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', awfInfo.privacyPolicy || `${amiWebApp.originURL}/docs/privacy_policy.html`);

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			...this.#flags,
			/**/
			userInfo     : (this.#userInfo      = userInfo     ),
			roleInfo     : (this.#roleInfo      = roleInfo     ),
			bookmarkInfo : (this.#bookmarkInfo  = bookmarkInfo ),
			dashboardInfo: (this.#dashboardInfo = dashboardInfo),
			awfInfo      : (this.#awfInfo       = awfInfo      ),
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const user = userInfo.AMIUser || 'guest';
		const guest = userInfo.guestUser || 'guest';

		/*------------------------------------------------------------------------------------------------------------*/

		if(user !== guest)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* GET INFO                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			const firstName = userInfo.firstName || '';
			const lastName = userInfo.lastName || '';

			const email = userInfo.email || '';

			const notBefore = userInfo.notBefore || '';
			const notAfter = userInfo.notAfter || '';

			const clientDNInSession = userInfo.clientDNInSession || '';
			const issuerDNInSession = userInfo.issuerDNInSession || '';

			const clientDNInAMI = userInfo.clientDNInAMI || '';
			const issuerDNInAMI = userInfo.issuerDNInAMI || '';

			const valid = userInfo.valid || 'false';

			/*--------------------------------------------------------------------------------------------------------*/
			/* SET INFO                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			$('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
			$('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);

			/*--------------------------------------------------------------------------------------------------------*/

			$('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
			$('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
			$('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);

			/*--------------------------------------------------------------------------------------------------------*/

			$('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
			$('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);

			/*--------------------------------------------------------------------------------------------------------*/

			if(issuerDNInSession && clientDNInSession)
			{
				$('#C8B8F968_CCAA_26DF_8665_2B518189E3DE').val(issuerDNInSession);
				$('#A962ED59_DB71_C10C_6173_3615C6F48028').val(clientDNInSession);
				$('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', issuerDNInSession === issuerDNInAMI && clientDNInSession === clientDNInAMI);
			}
			else
			{
				$('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val('N/A');
				$('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val('N/A');
				$('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', true);
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(issuerDNInAMI && clientDNInAMI)
			{
				$('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(issuerDNInAMI);
				$('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(clientDNInAMI);
				$('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', /*-----------------------------*/ false /*-----------------------------*/);
			}
			else
			{
				$('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val('N/A');
				$('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val('N/A');
				$('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', true);
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const table = [];

			for(const role in roleInfo)
			{
				table.push('<tr>');
				table.push(`<td>${amiWebApp.textToHtml(roleInfo[role].name        || 'N/A')}</td>`);
				table.push(`<td>${amiWebApp.textToHtml(roleInfo[role].description || 'N/A')}</td>`);
				table.push('</tr>');
			}

			$('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));

			/*--------------------------------------------------------------------------------------------------------*/
			/* CHECK USER STATUS                                                                                      */
			/*--------------------------------------------------------------------------------------------------------*/

			let icon = '';
			let message = '';

			let bgColor;
			let fgColor;

			if(valid !== 'false')
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* VALID USER                                                                                         */
				/*----------------------------------------------------------------------------------------------------*/

				if(!this.#flags.ssoAutoAuthentication)
				{
					if((clientDNInSession && clientDNInAMI && issuerDNInSession && issuerDNInAMI)
					   &&
					   (clientDNInSession !== clientDNInAMI || issuerDNInSession !== issuerDNInAMI)
					 ) {
						message = 'The X.509 certificate in the session differs from the one in AMI.';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(`<i class="bi bi-info-circle text-warning"></i> ${message}`);

					icon = `
<a class="nav-link text-warning" href="javascript:amiLogin.accountStatus();">
	<i class="bi bi-info-circle"></i>
</a>`;
				}

				/*----------------------------------------------------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400')
				                                          .html('<i class="bi bi-asterisk"></i> valid <i class="bi bi-asterisk"></i>')
  				                                          .closest('.rounded').css('background', `#B8D49B url("${greenCertificateImage}") no-repeat center center`).css('background-size', 'cover')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(`${notBefore} - ${notAfter}`);

				/*----------------------------------------------------------------------------------------------------*/

				bgColor = '#B8D49B';
				fgColor = '#006400';

				/*----------------------------------------------------------------------------------------------------*/
			}
			else
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* INVALID USER                                                                                       */
				/*----------------------------------------------------------------------------------------------------*/

				if(!this.#flags.ssoAutoAuthentication)
				{
					message = 'Check your membership.';
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(`<i class="bi bi-info-circle text-danger"></i> ${message}`);

					icon = `
<a class="nav-link text-danger" href="javascript:amiAuth.accountStatus();">
	<i class="bi bi-info-circle"></i>
</a>`;
				}

				/*----------------------------------------------------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#DC3545')
				                                          .html('<i class="bi bi-asterisk"></i> invalid <i class="bi bi-asterisk"></i>')
				                                          .closest('.rounded').css('background', `#E8C8CF url("${pinkCertificateImage}") no-repeat center center`).css('background-size', 'cover')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(`${notBefore} - ${notAfter}`);

				/*----------------------------------------------------------------------------------------------------*/

				bgColor = '#E8C8CF';
				fgColor = '#DC3545';

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* UPDATE QRCODE                                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

			QRCode.toCanvas(document.getElementById('EC948084_8C0A_CEBF_58C9_086046AB2456'), `${user}|${firstName} ${lastName}|${email}|${clientDNInAMI}|${issuerDNInAMI}`, {
				color: {
					dark: fgColor,
					light: bgColor,
				},
				margin: 0,
				width: 150,
			});

			/*--------------------------------------------------------------------------------------------------------*/
			/* UPDATE MENU BAR                                                                                        */
			/*--------------------------------------------------------------------------------------------------------*/

			dict['user'] = user;
			dict['icon'] = icon;

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', signOutButtonTwig, {dict: dict}).done(() => {

				subapps.triggerLogin().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}
		else
		{
			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', signInButtonTwig, {dict: dict}).done(() => {

				subapps.triggerLogout().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current MQTT endpoint
	 * @return {string} The current MQTT endpoint
	 */

	getMqttEndpoint()
	{
		return this.#awfInfo.mqttEndpoint || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current MQTT token
	 * @return {string} The current MQTT token
	 */

	getMqttToken()
	{
		return this.#awfInfo.mqttToken || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user information
	 * @returns {Object<string,*>} The current user information
	 */

	getUserInfo()
	{
		return this.#userInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current role information
	 * @returns {Object<string,*>} The current role information
	 */

	getRoleInfo()
	{
		return this.#roleInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current bookmark information
	 * @returns {Object<string,*>} The current bookmark information
	 */

	getBookmarkInfo()
	{
		return this.#bookmarkInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current dashboard information
	 * @returns {Object<string,*>} The current dashboard information
	 */

	getDashboardInfo()
	{
		return this.#dashboardInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current AMI Web Framework information
	 * @returns {Object<string,*>} The current AMI Web Framework information
	 */

	getAWFInfo()
	{
		return this.#awfInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user
	 * @returns {string} The current user
	 */

	getUser()
	{
		return this.#userInfo.AMIUser || 'guest';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current guest user
	 * @returns {string} The current guest user
	 */

	getGuest()
	{
		return this.#userInfo.guestUser || 'guest';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user `not before` date
	 * @returns {string} The current user `not before` date
	 */

	getNotBeforeDate()
	{
		return this.#userInfo.notBefore || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current user `not after` date
	 * @returns {string} The current user `not after` date
	 */

	getNotAfterDate()
	{
		return this.#userInfo.notAfter || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current client DN
	 * @returns {string} The current client DN
	 */

	getClientDN()
	{
		return this.#userInfo.clientDNInSession || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the current issuer DN
	 * @returns {string} The current issuer DN
	 */

	getIssuerDN()
	{
		return this.#userInfo.issuerDNInSession || '';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user is valid or not
	 * @returns {boolean}
	 */

	isValid()
	{
		return (this.#userInfo.valid || 'false') !== 'false';
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user is authenticated or not
	 * @returns {boolean}
	 */

	isAuthenticated()
	{
		return this.getUser() !== this.getGuest();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Checks whether the user has the given role or not
	 * @param {string} roleName the role
	 * @returns {boolean}
	 */

	hasRole(roleName)
	{
		return roleName in this.#roleInfo;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Update the user information
	 * @returns {$.Promise} A JQuery promise object
	 */

	update()
	{
		amiWebApp.lock();

		return amiCommand.signInByCertificate().done((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).always(() => {

				amiWebApp.unlock();
			});
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Opens the SSO popup window
	 */

	sso()
	{
		AMIAuth.#clean();

		window.open(`${amiRouter.getOriginURL()}/docs/sso.html?url=${encodeURIComponent(this.#awfInfo.ssoAuthURL || '')}&realm=${encodeURIComponent(this.#awfInfo.ssoRealm || '')}&clientId=${encodeURIComponent(this.#awfInfo.ssoClientId || '')}`, 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs in
	 */

	signIn()
	{
		AMIAuth.#clean();

		if(this.#flags.captchaAllowed)
		{
			amiCommand.execute('GenerateCaptcha').then((data) => {

				const image = amiWebApp.jspath('..field{.@name==="image"}.$', data)[0] || '';
				const hash = amiWebApp.jspath('..field{.@name==="hash"}.$', data)[0] || '';

				$('#AC9836E6_2A20_8711_39D5_0E8340561078').css('background-image', `url('${image}')`);
				$('#EA79605C_6EFF_4C77_9D70_88254B00FD52').css('background-image', `url('${image}')`);

				$('#FD95B3FA_C808_0E08_2D1E_0FE0E3871101').val(/**/hash/**/);
				$('#A63C0110_E591_6FCE_6D7A_02EEBC094199').val(/**/hash/**/);

				$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');

			}, (data, message) => {

				amiWebApp.error(message);
			});
		}
		else
		{
			$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Signs out
	 */

	signOut()
	{
		amiWebApp.lock();

		return amiCommand.signOut().always((data, message, userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo) => {

			this.#update(userInfo, roleInfo, bookmarkInfo, dashboardInfo, awfInfo).then(() => {

				amiWebApp.unlock();

			}, (message) => {

				amiWebApp.error(message, true);
			});
		});
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Opens the 'Change Info' modal window
	 */

	changeInfo()
	{
		AMIAuth.#clean();

		$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Opens the 'Change Password' modal window
	 */

	changePass()
	{
		AMIAuth.#clean();

		$('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Opens the 'Change Certificate' modal window
	 */

	changeCertificate()
	{
		AMIAuth.#clean();

		$('#ECB92A89_A706_7C76_E248_E57D14C8B205').modal('show');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Opens the 'Account Status' modal window
	 */

	accountStatus()
	{
		AMIAuth.#clean();

		$('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_login(e)
	{
		e.preventDefault();

		const values = $(e.target).serializeObject();

		return this.form_login2(values['username'], values['password']);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_login2(username, password)
	{
		const promise = (username && password) ? amiCommand.signInByPassword(username.trim(), password.trim())
		                                       : amiCommand.signInByCertificate(/*----------------------------*/)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		promise.then((data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) => {

			this.#update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).then(() => {

				if((userInfo.AMIUser || 'guest') !== (userInfo.guestUser || 'guest'))
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					AMIAuth.#clean();

					amiWebApp.unlock();
				}

			}, (message) => {

				if((userInfo.AMIUser || 'guest') !== (userInfo.guestUser || 'guest'))
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					amiWebApp.error(message, true);
				}
			});

			if((userInfo.AMIUser || 'guest') === (userInfo.guestUser || 'guest'))
			{
				let message = 'Authentication failed.';

				if(userInfo.clientDNInSession || userInfo.issuerDNInSession)
				{
					message += `Client DN in session: ${amiWebApp.textToHtml(userInfo.clientDNInSession)}.`
					           +
					           `Issuer DN in session: ${amiWebApp.textToHtml(userInfo.issuerDNInSession)}.`
					;
				}

				amiWebApp.error(message, true);
			}

		}, (data, message, userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo) => {

			this.#update(userInfo, roleInfo, bookmarkInfo, udpInfo, ssoInfo).always(() => {

				amiWebApp.error(message, true);
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return promise;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_addUser(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['usernme'], values['password'], values['first_name'], values['last_name'], values['email'], values['captcha_hash'], values['captcha_text'], 'attachCert' in values, 'agree' in values).then((data, message) => {

			amiWebApp.success(message, true);

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_remindPass(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPassword(values['username'], values['captcha_hash'], values['captcha_text']).then((data, message) => {

			amiWebApp.success(message, true);

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_changeInfo(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then((data, message) => {

			amiWebApp.success(message, true);

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_changePass(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePassword(this.#userInfo.AMIUser || 'guest', values['old_password'], values['new_password']).then((data, message) => {

			amiWebApp.success(message, true);

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_attachCert()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		return amiCommand.attachCertificate().then((data, message) => {

			$('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(this.#userInfo.issuerDNInAMI = this.#userInfo.issuerDNInSession);
			$('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(this.#userInfo.clientDNInAMI = this.#userInfo.clientDNInSession);

			$('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', /*----------------------------*/ true /*----------------------------*/);
			$('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', false);

			this.#update(this.#userInfo, this.#roleInfo, this.#bookmarkInfo, this.#dashboardInfo, this.#awfInfo).then((/*---*/) => {

				amiWebApp.success(message, true);

			}, (message) => {

				amiWebApp.error(message, true);
			});

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	form_detachCert()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		return amiCommand.detachCertificate().then((data, message) => {

			$('#C9297C00_920D_4AE6_8A20_B0DDB383CC6A').val(this.#userInfo.issuerDNInAMI = '');
			$('#D4B29AC0_4867_815B_8657_5A1D623C29CF').val(this.#userInfo.clientDNInAMI = '');

			$('#DB0223B3_D721_7EEB_50B8_032A04C7D218').prop('disabled', !this.#userInfo.clientDNInSession || !this.#userInfo.issuerDNInSession);
			$('#B39BA3DE_4BA7_CE2F_BB80_BB6F4A5CB2A2').prop('disabled', true);

			this.#update(this.#userInfo, this.#roleInfo, this.#bookmarkInfo, this.#dashboardInfo, this.#awfInfo).then((/*---*/) => {

				amiWebApp.success(message, true);

			}, (message) => {

				amiWebApp.error(message, true);
			});

		}, (data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMIAuth();

/*--------------------------------------------------------------------------------------------------------------------*/
