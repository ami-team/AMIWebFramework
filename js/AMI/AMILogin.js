/*!
 * AMI Web Framework - AMILogin
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
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

	/*-----------------------------------------------------------------*/

	roleInfo: {},

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

			amiCommand.certLogin().always(function(data, userInfo, roleInfo) {
				/*-----------------------------------------*/

				document.getElementById('87D39A00_39D9_453B_8D8C_12B403F9268F').addEventListener('keypress', function(e) {

					if(e.keyCode === 13)
					{
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('6E06F758_BF71_4DBA_AF8A_2F137F1ABD1D').addEventListener('keypress', function(e) {

					if(e.keyCode === 13)
					{
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('13AEF361_DF3E_461F_A989_2BFDA00BCD05').addEventListener('keypress', function(e) {

					if(e.keyCode === 13)
					{
						amiLogin.form_resetPass();
					}
				});

				/*-----------------------------------------*/

				amiLogin._update(userInfo, roleInfo).done(function() {

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

		amiWebApp.replaceHTML('#4A634334_ED84_4565_A2B3_618ADFDF1E9B', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#4A634334_ED84_4565_A2B3_618ADFDF1E9B .alert').fadeOut(45000);

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

		amiWebApp.replaceHTML('#4A634334_ED84_4565_A2B3_618ADFDF1E9B', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#4A634334_ED84_4565_A2B3_618ADFDF1E9B .alert').fadeOut(45000);

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
		$('#4A634334_ED84_4565_A2B3_618ADFDF1E9B').empty();
		$('#C76F40DA_0480_4D3F_A74B_65735465EA25').empty();
		$('#F14D98EC_5751_4C15_B4A1_927BA76AFCA6').empty();
	},

	/*-----------------------------------------------------------------*/

	_clean: function()
	{
		$('#6E06F758_BF71_4DBA_AF8A_2F137F1ABD1D').val('');
		$('#56CE3A89_05AC_46F2_811B_D0D8DBAECEB3').val('');
		$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val('');
		$('#F238E6EE_44BD_486A_B85D_C927A4D045D3').val('');
		$('#D487FE72_8D95_4048_BEA3_252274862AF4').val('');
		$('#9A355DC8_88EF_4438_BAB3_BB7BAD798A77').val('');
	},

	/*-----------------------------------------------------------------*/

	_update: function(userInfo, roleInfo)
	{
		/*---------------------------------------------------------*/

		var user = amiLogin.user = userInfo.AMIUser;
		var guest = amiLogin.guest = userInfo.guestUser;

		amiLogin.roleInfo = roleInfo;

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

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
			var clientDNInSession = userInfo.clientDNInSession || '';
			var issuerDNInAMI = userInfo.issuerDNInAMI || '';
			var issuerDNInSession = userInfo.issuerDNInSession || '';

			/*-------------------------------------------------*/
			/* SET INFO                                        */
			/*-------------------------------------------------*/

			$('#E513F27D_5521_4B08_BF61_52AFB81356F7').val(firstName);
			$('#113C64A6_3B10_4671_B941_17C2281A43B6').val(lastName);
			$('#83B6FEE5_2BAF_4F47_BCB3_1F475A1A1117').val(email);

			/*-------------------------------------------------*/

			$('#83B6FEE5_2BAF_4F47_BCB3_1F475A1A1117').prop('disabled', vomsEnabled !== 'false');

			/*-------------------------------------------------*/

			$('#215C261E_5DFB_4AC5_85C5_3D3D8C210B82').val(firstName);
			$('#2DC4C04B_8701_4C50_9D0F_F135D91DA9CE').val(lastName);
			$('#431ABB43_415D_4564_9F7E_BC8048602120').val(email);

			/*-------------------------------------------------*/

			$('#0902CF2E_7A3B_476E_A03B_875FD8928996').val(clientDNInAMI);
			$('#50CDFAB2_A81D_4772_871A_70F40AEC1C77').val(clientDNInSession);
			$('#F42FAF6B_2C8D_4142_8BD9_E5BCDCAA05AA').val(issuerDNInAMI);
			$('#15FA5B80_8528_4FA1_894F_516FD00D1E8D').val(issuerDNInSession);

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

				$('#02C7F515_F604_4CDF_868A_D8FFE57F9C01').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message : ''
				);

				$('#07D7B8B9_2A2E_4C1A_9DE8_A7970956798D').html(
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

				$('#02C7F515_F604_4CDF_868A_D8FFE57F9C01').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message : ''
				);

				$('#07D7B8B9_2A2E_4C1A_9DE8_A7970956798D').html(
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

			var dict = {
				USER: user,
				ICON: icon,
			};

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
					amiWebApp.replaceHTML('#ami_login_content', amiLogin.fragmentLoginButton, {dict: null});
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
	  * The the current user
	  * @returns {String} The current user
	  */

	getUser: function()
	{
		return this.AMIUser;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The the guest user
	  * @returns {String} The guest user
	  */

	getGuest: function()
	{
		return this.guestUser;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Check whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.AMIUser !== this.guestUser;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Login' modal form
	  */

	login: function()
	{
		this._flush();
		this._clean();

		$('#modal_login').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Info' modal form
	  */

	changeInfo: function()
	{
		this._flush();
		this._clean();

		$('#modal_login_change_info').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Password' modal form
	  */

	changePass: function()
	{
		this._flush();
		this._clean();

		$('#modal_login_change_pass').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Account Status' modal form
	  */

	accountStatus: function()
	{
		this._flush();
		this._clean();

		$('#modal_login_account_status').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Log out
	  */

	logout: function() {

		amiWebApp.lock();

		return amiCommand.logout().always(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

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

	form_passLogin: function()
	{
		var user = $('#87D39A00_39D9_453B_8D8C_12B403F9268F').val();
		var pass = $('#6E06F758_BF71_4DBA_AF8A_2F137F1ABD1D').val();

		if(!user || !pass)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.passLogin(user, pass).done(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#modal_login').modal('hide');

					amiLogin._clean();
					amiWebApp.unlock();
				}
				else
				{
					var error = 'Invalid identifiers.';

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

		}).fail(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

				amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_certLogin: function()
	{
		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.certLogin().done(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#modal_login').modal('hide');

					amiLogin._clean();
					amiWebApp.unlock();
				}
				else
				{
					var error = 'Certificate not registered in AMI.';

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

		}).fail(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

				amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_attachCert: function()
	{
		var user = $('#87D39A00_39D9_453B_8D8C_12B403F9268F').val();
		var pass = $('#6E06F758_BF71_4DBA_AF8A_2F137F1ABD1D').val();

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
		var user = $('#87D39A00_39D9_453B_8D8C_12B403F9268F').val();
		var pass = $('#6E06F758_BF71_4DBA_AF8A_2F137F1ABD1D').val();

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

	form_addUser: function()
	{
		var user = $('#A9A08864_6A32_45A4_8898_C167564DB8BB').val();
		var pass1 = $('#56CE3A89_05AC_46F2_811B_D0D8DBAECEB3').val();
		var pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();
		var firstName = $('#646E34FE_DFB3_4BE1_A860_168BD595F97E').val();
		var lastName = $('#39287067_75F8_419D_9B20_409E1B141D38').val();
		var email = $('#12DA94D6_8B52_4FCC_AEED_937BAAE0BF9C').val();

		if(!user || !pass1 || !pass2 || !firstName || !lastName || !email)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2)
		{
			amiLogin._showErrorMessage1('Password 1 and password 2 are different.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(user, pass1, firstName, lastName, email).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changeInfo: function()
	{
		var firstName = $('#E513F27D_5521_4B08_BF61_52AFB81356F7').val();
		var lastName = $('#113C64A6_3B10_4671_B941_17C2281A43B6').val();
		var email = $('#83B6FEE5_2BAF_4F47_BCB3_1F475A1A1117').val();

		if(!firstName || !lastName || !email)
		{
			amiLogin._showErrorMessage2('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changeInfo(firstName, lastName, email).done(function() {

			amiLogin._showSuccessMessage2('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage2(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changePass: function()
	{
		var oldPass = $('#F238E6EE_44BD_486A_B85D_C927A4D045D3').val();
		var newPass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
		var newPass2 = $('#9A355DC8_88EF_4438_BAB3_BB7BAD798A77').val();

		if(!oldPass || !newPass1 || !newPass2)
		{
			amiLogin._showErrorMessage3('Please, fill all fields with a red star.');

			return;
		}

		if(newPass1 !== newPass2)
		{
			amiLogin._showErrorMessage3('Password 1 and password 2 are different.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.changePass(oldPass, newPass1).done(function() {

			amiLogin._showSuccessMessage3('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_resetPass: function()
	{
		var user = $('#13AEF361_DF3E_461F_A989_2BFDA00BCD05').val();

		if(!user)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.resetPass(user).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data));
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
