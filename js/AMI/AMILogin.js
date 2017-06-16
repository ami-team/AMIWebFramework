/*!
 * AMI Web Framework - AMILogin
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global _ami_internal_always
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* amiLogin                                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

$AMINamespace('amiLogin', /** @lends amiLogin */ {
	/*-----------------------------------------------------------------*/
	/* PUBLIC MEMBERS                                                  */
	/*-----------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	clientDN: '',
	issuerDN: '',

	/*-----------------------------------------------------------------*/

	roleInfo: {},
	ssoInfo: {},

	/*-----------------------------------------------------------------*/
	/* PRIVATE METHODS                                                 */
	/*-----------------------------------------------------------------*/

	_init: function()
	{
		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			amiWebApp.originURL + '/twig/AMI/Fragment/login_button.twig',
			amiWebApp.originURL + '/twig/AMI/Fragment/logout_button.twig',
			amiWebApp.originURL + '/twig/AMI/Modal/login.twig',
		]).done(function(data) {

			amiLogin.fragmentLoginButton = data[0];
			amiLogin.fragmentLogoutButton = data[1];

			amiWebApp.appendHTML('body', data[2]);

			amiCommand.certLogin().always(function(data, userInfo, roleInfo, ssoInfo) {
				/*-----------------------------------------*/

				$('#B7894CC1_1DAA_4A7E_B7D1_DBDF6F06AC73').submit(function(e) {

					amiLogin.form_login(e);
				});

				$('#EE055CD4_E58F_4834_8020_986AE3F8D67D').submit(function(e) {

					amiLogin.form_addUser(e);
				});

				$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function(e) {

					amiLogin.form_remindPass(e);
				});

				$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').submit(function(e) {

					amiLogin.form_changeInfo(e);
				});

				$('#E92A1097_983B_4857_875F_07E4659B41B0').submit(function(e) {

					amiLogin.form_changePass(e);
				});

				/*-----------------------------------------*/

				$('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(function() {

					var pass1 = $('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val();
					var pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();

					$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				$('#D487FE72_8D95_4048_BEA3_252274862AF4,#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').change(function() {

					var pass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
					var pass2 = $('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val();

					$('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				/*-----------------------------------------*/

				amiLogin._update(userInfo, roleInfo, ssoInfo).done(function() {

					$(window).bind('message', function(e) {

						var user = e.originalEvent.data.user;
						var pass = e.originalEvent.data.pass;

						if(user && pass)
						{
							amiLogin.form_login2(user, pass);

							e.originalEvent.source.close();
						}
					});

					result.resolve();
				});

				/*-----------------------------------------*/
			});

			/*-------------------------------------------------*/
		}).fail(function() {

			alert('Service temporarily unavailable, please try reloading the page...');
		});

		return result.promise();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage1: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage1: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage2: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#C76F40DA_0480_4D3F_A74B_65735465EA25', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#C76F40DA_0480_4D3F_A74B_65735465EA25 .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage2: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#C76F40DA_0480_4D3F_A74B_65735465EA25', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#C76F40DA_0480_4D3F_A74B_65735465EA25 .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage3: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6 .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage3: function(message)
	{
		if(message instanceof Array)
		{
			message = message.join('. ');
		}

		amiWebApp.replaceHTML('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6 .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_flush: function()
	{
		$('#C0D13C0C_BA64_4A79_BF48_1A35F26D19AC').empty();
		$('#C76F40DA_0480_4D3F_A74B_65735465EA25').empty();
		$('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6').empty();
	},

	/*-----------------------------------------------------------------*/

	_clean: function()
	{
		$('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val('');
		$('#E6E30EEC_15EE_4FCF_9809_2B8EC2FEF388').val('');
		$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val('');
		$('#F238E6EE_44BD_486A_B85D_C927A4D045D3').val('');
		$('#D487FE72_8D95_4048_BEA3_252274862AF4').val('');
		$('#EE1DA58C_3761_4734_A9C2_E808CDD7EE77').val('');
	},

	/*-----------------------------------------------------------------*/

	_update: function(userInfo, roleInfo, ssoInfo)
	{
		var result = $.Deferred();

		/*---------------------------------------------------------*/

		var user = amiLogin.user = userInfo.AMIUser || '';
		var guest = amiLogin.guest = userInfo.guestUser || '';

		var clientDNInSession = amiLogin.clientDN = userInfo.clientDNInSession || '';
		var issuerDNInSession = amiLogin.issuerDN = userInfo.issuerDNInSession || '';

		$('#A09AE316_7068_4BC1_96A9_6B87D28863FE').prop('disabled', !clientDNInSession || !issuerDNInSession);

		/*---------------------------------------------------------*/

		amiLogin.roleInfo = roleInfo;

		amiLogin.ssoInfo = ssoInfo;

		/*---------------------------------------------------------*/

		var dict = {
			sso_name: ssoInfo.name || 'SSO',
			sso_url: ssoInfo.url || 'N/A',
		};

		if(user !== guest)
		{
			/*-------------------------------------------------*/
			/* GET INFO                                        */
			/*-------------------------------------------------*/

			var valid = userInfo.valid || 'false';
			var certEnabled = userInfo.certEnabled || 'false';
			var vomsEnabled = userInfo.vomsEnabled || 'false';

			/*-------------------------------------------------*/

			var firstName = userInfo.firstName || '';
			var lastName = userInfo.lastName || '';
			var email = userInfo.email || '';

			/*-------------------------------------------------*/

			var clientDNInAMI = userInfo.clientDNInAMI || '';
			var issuerDNInAMI = userInfo.issuerDNInAMI || '';

			/*-------------------------------------------------*/
			/* SET INFO                                        */
			/*-------------------------------------------------*/

			$('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
			$('#AFF0B5C0_BEEC_4842_916D_DCBA7F589195').val(lastName);
			$('#C587486B_62C0_4B6E_9288_D8F9F89D157B').val(email);

			/*-------------------------------------------------*/

			$('#ABEB0291_40B0_414A_A42B_E7EABB9B487E').val(firstName);
			$('#A5AFDB62_1034_4F66_A3E6_9341B31FA290').val(lastName);
			$('#D730A774_05EA_47AB_A0C8_D92753802E3E').val(email);

			/*-------------------------------------------------*/

			$('#D1BEE3BF_9161_41DC_BC53_C44FFE4D2522').val(clientDNInAMI);
			$('#C76805D7_1E86_4231_9071_1D04783423BB').val(clientDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#FE2F6232_C256_4B80_939C_EBEC90320308').val(issuerDNInSession);

			/*-------------------------------------------------*/

			$('#83B6FEE5_2BAF_4F47_BCB3_1F475A1A1117').prop('disabled', vomsEnabled !== 'false');

			/*-------------------------------------------------*/
			/* CHECK USER STATUS                               */
			/*-------------------------------------------------*/

			var color = '';
			var message = '';

			if(valid !== 'false')
			{
				/*-----------------------------------------*/
				/* VALID USER                              */
				/*-----------------------------------------*/

				if(certEnabled !== 'false' && clientDNInAMI && issuerDNInAMI)
				{
					if(!clientDNInSession
					   ||
					   !issuerDNInSession
					 ) {
						message = 'You should provide a certificate to use this AMI web application.';
					}
					else
					{
						if(clientDNInAMI !== clientDNInSession
						   ||
						   issuerDNInAMI !== issuerDNInSession
						 ) {
							message = 'The certificate in your session is not the one registered in AMI.';
						}
					}
				}

				$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message : ''
				);

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').html(
					'<span style="color: #006400;">valid</span>'
				);

				color = 'orange';

				/*-----------------------------------------*/
			}
			else
			{
				/*-----------------------------------------*/
				/* INVALID USER                            */
				/*-----------------------------------------*/

				if(vomsEnabled !== 'false')
				{
					if(!clientDNInAMI
					   ||
					   !issuerDNInAMI
					 ) {
						message = 'Register a valid GRID certificate.';
					}
					else
					{
						message = 'Check your VOMS roles.';
					}
				}
				else
				{
					message = 'Contact the AMI team.';
				}

				$('#D944B01D_2E8D_4EE9_9DCC_2691438BBA16').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message : ''
				);

				$('#F3FF9F43_DE72_40BB_B1BA_B7B3C9002671').html(
					'<span style="color: #8B0000;">invalid</span>'
				);

				color = 'red';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* UPDATE NOTIFICATION BAR                         */
			/*-------------------------------------------------*/

			var icon = message ? '<a href="javascript:amiLogin.accountStatus();" style="color: ' + color + ';">'
			                     +
			                     '<span class="fa fa-exclamation-triangle"></span>'
			                     +
			                     '</a>'
			                   : ''
			;

			/*-------------------------------------------------*/
			/* UPDATE MENU BAR                                 */
			/*-------------------------------------------------*/

			dict['user'] = user;
			dict['icon'] = icon;

			/*-------------------------------------------------*/

			_ami_internal_always(
				amiWebApp.onLogin(),
				function() {
					amiWebApp.replaceHTML('#ami_login_content', amiLogin.fragmentLogoutButton, {dict: dict});
					result.resolve();
				}
			);

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/

			_ami_internal_always(
				amiWebApp.onLogout(),
				function() {
					result.resolve();
					amiWebApp.replaceHTML('#ami_login_content', amiLogin.fragmentLoginButton, {dict: dict});
				}
			);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return result.promise();
	},

	/*-----------------------------------------------------------------*/
	/* PUBLIC METHODS                                                  */
	/*-----------------------------------------------------------------*/

	/**
	  * The current user
	  * @returns {String} The current user
	  */

	getUser: function()
	{
		return this.user;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The guest user
	  * @returns {String} The guest user
	  */

	getGuest: function()
	{
		return this.guest;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The client DN
	  * @returns {String} The client DN
	  */

	getClientDN: function()
	{
		return this.clientDN;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The issuer DN
	  * @returns {String} The issuer DN
	  */

	getIssuerDN: function()
	{
		return this.issuerDN;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.user !== this.guest;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'SSO' modal form
	  */

	sso: function()
	{
		this._flush();
		this._clean();

		window.open(this.ssoInfo.url + '?originURL=' + encodeURIComponent(amiWebApp.originURL), 'Single Sign-On', 'menubar=no, status=no, scrollbars=no, width=800, height=450');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'SignIn' modal form
	  */

	signIn: function()
	{
		this._flush();
		this._clean();

		$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Info' modal form
	  */

	changeInfo: function()
	{
		this._flush();
		this._clean();

		$('#D9EAF998_ED8E_44D2_A0BE_8C5CF5E438BD').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Password' modal form
	  */

	changePass: function()
	{
		this._flush();
		this._clean();

		$('#E92A1097_983B_4857_875F_07E4659B41B0').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Account Status' modal form
	  */

	accountStatus: function()
	{
		this._flush();
		this._clean();

		$('#AB1CB183_96EB_4116_8A9E_4409BE058F34').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Sign out
	  */

	signOut: function() {

		amiWebApp.lock();

		return amiCommand.logout().always(function(data, userInfo, roleInfo, ssoInfo) {

			amiLogin._update(userInfo, roleInfo, ssoInfo).done(function() {

				amiLogin._clean();
				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check if the user has the given role
	  * @param {String} role the role
	  * @returns {Boolean}
	  */

	hasRole: function(roleName)
	{
		return roleName in amiLogin.roleInfo;
	},

	/*-----------------------------------------------------------------*/

	_serializeForm: function(form)
	{
		var result = {};

		form.find('input')
		    .each(function() {

			var node = $(this);

			var name = node.attr('name');

			if(node.attr('type') !== 'checkbox')
			{
				if(name)
				{
					result[name] = node.val().trim();
				}
			}
			else
			{
				result[name] = node.prop('checked') ? 'on' : '';
			}
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	form_login: function(e)
	{
		e.preventDefault();

		var values = this._serializeForm($(e.target));

		return this.form_login2(values['user'], values['pass']);
	},

	/*-----------------------------------------------------------------*/

	form_login2: function(user, pass)
	{
		/*---------------------------------------------------------*/

		var deferred = (user && pass) ? amiCommand.passLogin(user, pass)
		                              : amiCommand.certLogin(/*------*/)
		;

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		deferred.done(function(data, userInfo, roleInfo, ssoInfo) {

			amiLogin._update(userInfo, roleInfo, ssoInfo).done(function() {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

					amiLogin._clean();
					amiWebApp.unlock();
				}
				else
				{
					var error = 'Authentication failed.';

					if(userInfo.clientDNInSession || userInfo.issuerDNInSession)
					{
						error += '<textarea style="height: 85px; width: 100%;">'
						         +
						         'Client DN in session: ' + amiWebApp.textToHtml(userInfo.clientDNInSession)
						         + '\n' +
						         'Issuer DN in session: ' + amiWebApp.textToHtml(userInfo.issuerDNInSession)
						         +
						         '</textarea>'
						;
					}

					amiLogin._showErrorMessage1(error);
				}
			});

		}).fail(function(data, userInfo, roleInfo, ssoInfo) {

			amiLogin._update(userInfo, roleInfo, ssoInfo).done(function() {

				amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_attachCert: function()
	{
		/*---------------------------------------------------------*/

		var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.attachCert(user, pass).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_detachCert: function()
	{
		/*---------------------------------------------------------*/

		var user = $('#E64F24B2_33E6_4DED_9B24_28BE04219613').val();
		var pass = $('#A4DFD039_034F_4D10_9668_385AEF4FBBB9').val();

		if(!user || !pass)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.detachCert(user, pass).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_addUser: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email'], values['attach'] === 'on').done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_remindPass: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPass(values['user']).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changeInfo: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(values['first_name'], values['last_name'], values['email']).done(function() {

			amiLogin._showSuccessMessage2('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage2(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changePass: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePass(values['old_pass'], values['new_pass']).done(function() {

			amiLogin._showSuccessMessage3('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
