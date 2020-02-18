/*
 * AMI Web Framework - AMILogin.js
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
/* amiLogin                                                                                                           */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

$AMINamespace('amiLogin', /** @lends amiLogin */ {
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	createAccountAllowed: true,
	changeInfoAllowed: true,
	changePasswordAllowed: true,

	/*----------------------------------------------------------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	clientDN: '',
	issuerDN: '',

	notBefore: '',
	notAfter: '',

	/*----------------------------------------------------------------------------------------------------------------*/

	roleInfo: {},
	udpInfo: {},
	ssoInfo: {},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE METHODS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	_start: function(createAccountAllowed, changeInfoAllowed, changePasswordAllowed)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.loadTWIGs([
			amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig',
			amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig',
			amiWebApp.originURL + '/twig/AMI/Modal/login.twig',
		]).done((data) => {

			/*--------------------------------------------------------------------------------------------------------*/

			this.fragmentLoginButton = data[0];
			this.fragmentLogoutButton = data[1];

			/*--------------------------------------------------------------------------------------------------------*/

			const dict = {
				createAccountAllowed: this.createAccountAllowed = createAccountAllowed,
				changeInfoAllowed: this.changeInfoAllowed = changeInfoAllowed,
				changePasswordAllowed: this.changePasswordAllowed = changePasswordAllowed,
			};

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.appendHTML('body', data[2], {dict: dict}).done(() => {

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

			/*--------------------------------------------------------------------------------------------------------*/

			window.addEventListener('message', (e) => {

				if(this.ssoInfo.url.startsWith(e.origin))
				{
					const user = e.data.user;
					const pass = e.data.pass;

					if(user && pass)
					{
						this.form_login2(user, pass);
					}

					e.source.close();
				}

			}, false);

			/*--------------------------------------------------------------------------------------------------------*/

			const userdata = amiWebApp.args['userdata'] || '';

			/*--------------------------------------------------------------------------------------------------------*/

			setInterval(() => {

				if(amiWebApp._isReady)
				{
					amiCommand.certLogin().fail((data, message) => {

						amiWebApp.error(message, true);

					}).done((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

						if((userInfo.AMIUser || '') === (userInfo.guestUser || ''))
						{
							this._update(userInfo, roleInfo, udpInfo, ssoInfo);
						}
					});
				}

			}, 30 * 1000);

			/*--------------------------------------------------------------------------------------------------------*/

			amiCommand.certLogin().fail((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

				this._update(userInfo, roleInfo, udpInfo, ssoInfo).always((/*---*/) => {

					result.reject(message);
				});

			}).done((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

				_ami_internal_then(amiWebApp.onReady(userdata), () => {

					amiWebApp._isReady = true;

					this._update(userInfo, roleInfo, udpInfo, ssoInfo).then((message) => {

						result.resolve(message);

					}, (message) => {

						result.reject(message);
					});

				}, (message) => {

					amiWebApp._isReady = true;

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/

		}).fail((message) => {

			result.reject(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_success: function(message)
	{
		amiWebApp.success(message, true);
		this._clean();
	},

	_error: function(message)
	{
		amiWebApp.error(message, true);
		this._clean();
	},

	_unlock: function()
	{
		amiWebApp.unlock();
		this._clean();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_clean: function()
	{
		$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').trigger('reset');
		$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').trigger('reset');
		$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').trigger('reset');
		$('#E92A1097_983B_4857_875F_07E4659B41B0').trigger('reset');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_update: function(userInfo, roleInfo, udpInfo, ssoInfo)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const user = this.user = userInfo.AMIUser || '';
		const guest = this.guest = userInfo.guestUser || '';

		const notBefore = this.notBefore = userInfo.notBefore || '';
		const notAfter = this.notAfter = userInfo.notAfter || '';

		const clientDNInSession = this.clientDN = userInfo.clientDNInSession || '';
		const issuerDNInSession = this.issuerDN = userInfo.issuerDNInSession || '';

		/*------------------------------------------------------------------------------------------------------------*/

		$('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);

		$('#C3E94F6D_48E0_86C0_3534_691728E492F4').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');
		$('#E50FF8BD_B0F5_CD72_F9DC_FC2BFA5DBA27').attr('src', udpInfo.termsAndConditions || amiWebApp.originURL + '/docs/terms_and_conditions.html');

		/*------------------------------------------------------------------------------------------------------------*/

		this.roleInfo = roleInfo;
		this.udpInfo = udpInfo;
		this.ssoInfo = ssoInfo;

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {
			createAccountAllowed: this.createAccountAllowed,
			changeInfoAllowed: this.changeInfoAllowed,
			changePasswordAllowed: this.changePasswordAllowed,
			/**/
			sso_label: ssoInfo.label || 'SSO',
			sso_url: ssoInfo.url || '@NULL',
		};

		if(user !== guest)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* GET INFO                                                                                               */
			/*--------------------------------------------------------------------------------------------------------*/

			const valid = userInfo.valid || 'false';
			const certEnabled = userInfo.certEnabled || 'false';
			const vomsEnabled = userInfo.vomsEnabled || 'false';

			/*--------------------------------------------------------------------------------------------------------*/

			const firstName = userInfo.firstName || '';
			const lastName = userInfo.lastName || '';
			const email = userInfo.email || '';

			/*--------------------------------------------------------------------------------------------------------*/

			const clientDNInAMI = userInfo.clientDNInAMI || '';
			const issuerDNInAMI = userInfo.issuerDNInAMI || '';

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

			$('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
			$('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);

			/*--------------------------------------------------------------------------------------------------------*/

			let table = [];

			for(let role in roleInfo)
			{
				table.push('<tr>');
				table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].name || 'N/A') + '</td>');
				table.push('<td>' + amiWebApp.textToHtml(roleInfo[role].description || 'N/A') + '</td>');
				table.push('</tr>');
			}

			$('#BB07676B_EACA_9B42_ED51_477DB2976041').html(table.join(''));

			/*--------------------------------------------------------------------------------------------------------*/
			/* CHECK USER STATUS                                                                                      */
			/*--------------------------------------------------------------------------------------------------------*/

			let icon = '';
			let message = '';

			if(valid !== 'false')
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* VALID USER                                                                                         */
				/*----------------------------------------------------------------------------------------------------*/

				if(certEnabled !== 'false' && clientDNInAMI && issuerDNInAMI)
				{
					if(!clientDNInSession
					   ||
					   !issuerDNInSession
					 ) {
						message = 'It is recommended to authenticate with a X.509 certificate.';
					}
					else
					{
						if(clientDNInAMI !== clientDNInSession
						   ||
						   issuerDNInAMI !== issuerDNInSession
						 ) {
							message = 'The X.509 certificate in the session differs from the one in AMI.';
						}
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-warning"></i> ' + message);

					icon = '<a class="nav-link text-warning" href="javascript:amiLogin.accountStatus();">'
					       +
					       '<i class="fa fa-info-circle"></i>'
					       +
					       '</a>'
					;
				}

				/*----------------------------------------------------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#B8D49B url("' + amiWebApp.originURL + '/images/certificate-green.png") no-repeat center center')
				                                                   .css('background-size', 'cover')
				;

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#006400')
				                                          .html('<i class="fa fa-leaf"></i> valid <i class="fa fa-leaf"></i>')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);

				/*----------------------------------------------------------------------------------------------------*/
			}
			else
			{
				/*----------------------------------------------------------------------------------------------------*/
				/* INVALID USER                                                                                       */
				/*----------------------------------------------------------------------------------------------------*/

				if(vomsEnabled !== 'false')
				{
					if(!clientDNInAMI
					   ||
					   !issuerDNInAMI
					 ) {
						message = 'Register a valid X.509 certificate.';
					}
					else
					{
						message = 'Check your virtual organization roles.';
					}
				}
				else
				{
					message = 'Unexpected issue, contact the AMI team.';
				}

				/*----------------------------------------------------------------------------------------------------*/

				if(message)
				{
					$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html('<i class="fa fa-info-circle text-danger"></i> ' + message);

					icon = '<a class="nav-link text-danger" href="javascript:amiLogin.accountStatus();">'
					       +
					       '<i class="fa fa-info-circle"></i>'
					       +
					       '</a>'
					;
				}

				/*----------------------------------------------------------------------------------------------------*/

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').parent().css('background', '#E8C8CF url("' + amiWebApp.originURL + '/images/certificate-pink.png") no-repeat center center')
				                                                   .css('background-size', 'cover')
				;

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').css('color', '#8B0000')
				                                          .html('<i class="fa fa-leaf"></i> invalid <i class="fa fa-leaf"></i>')
				;

				$('#E91280F6_E7C6_3E53_A457_646995C99317').text(notBefore + ' - ' + notAfter);

				/*----------------------------------------------------------------------------------------------------*/
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* UPDATE MENU BAR                                                                                        */
			/*--------------------------------------------------------------------------------------------------------*/

			dict['user'] = user;
			dict['icon'] = icon;

			/*--------------------------------------------------------------------------------------------------------*/

			amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLogoutButton, {dict: dict}).done(() => {

				amiWebApp.triggerLogin().then(() => {

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

			amiWebApp.replaceHTML('#ami_login_menu_content', this.fragmentLoginButton, {dict: dict}).done(() => {

				amiWebApp.triggerLogout().then(() => {

					result.resolve();

				}, (message) => {

					result.reject(message);
				});
			});

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* PUBLIC METHODS                                                                                                 */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Gets the current user
	  * @returns {String} The current user
	  */

	getUser: function()
	{
		return this.user;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Gets the guest user
	  * @returns {String} The guest user
	  */

	getGuest: function()
	{
		return this.guest;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Gets the client DN
	  * @returns {String} The client DN
	  */

	getClientDN: function()
	{
		return this.clientDN;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Gets the issuer DN
	  * @returns {String} The issuer DN
	  */

	getIssuerDN: function()
	{
		return this.issuerDN;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Checks whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.user !== this.guest;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Checks whether the user has the given role
	  * @param {String} role the role
	  * @returns {Boolean}
	  */

	hasRole: function(roleName)
	{
		return roleName in this.roleInfo;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Opens the 'SSO' modal window
	  */

	sso: function()
	{
		this._clean();

		window.open(this.ssoInfo.url, 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Opens the 'SignIn' modal window
	  */

	signIn: function()
	{
		this._clean();

		$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Opens the 'Change Info' modal window
	  */

	changeInfo: function()
	{
		this._clean();

		$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Opens the 'Change Password' modal window
	  */

	changePass: function()
	{
		this._clean();

		$('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Opens the 'Account Status' modal window
	  */

	accountStatus: function()
	{
		this._clean();

		$('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	  * Signs out
	  */

	signOut: function()
	{
		amiWebApp.lock();

		return amiCommand.logout().always((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).then(() => {

				this._unlock();

			}, (message) => {

				this._error(message);
			});
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_login: function(e)
	{
		e.preventDefault();

		const values = $(e.target).serializeObject();

		return this.form_login2(values['user'], values['pass']);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_login2: function(user, pass)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const promise = (user && pass) ? amiCommand.passLogin(user.trim(), pass.trim())
		                               : amiCommand.certLogin(/*--------------------*/)
		;

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		promise.then((data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).then(() => {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					this._unlock();
				}

			}, (message) => {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					this._error(message);
				}
			});

			if(userInfo.AMIUser === userInfo.guestUser)
			{
				let message = 'Authentication failed.';

				if(userInfo.clientDNInSession || userInfo.issuerDNInSession)
				{
					message += ' Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession) + '.'
					           +
					           ' Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession) + '.'
					;
				}

				this._error(message);
			}

		}, (data, message, userInfo, roleInfo, udpInfo, ssoInfo) => {

			this._update(userInfo, roleInfo, udpInfo, ssoInfo).always(() => {

				this._error(message);
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_attachCert: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._error('Please, fill all fields with a red star.');

			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.attachCert(user, pass).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_detachCert: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		const pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			this._error('Please, fill all fields with a red star.');

			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.detachCert(user, pass).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_addUser: function(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], 'attach' in values, 'agree' in values).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_remindPass: function(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPass(values['user']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_changeInfo: function(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	form_changePass: function(e)
	{
		e.preventDefault();

		/*------------------------------------------------------------------------------------------------------------*/

		const values = $(e.target).serializeObject();

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePass(this.user, values['old_pass'], values['new_pass']).then((data, message) => {

			this._success(message);

		}, (data, message) => {

			this._error(message);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
