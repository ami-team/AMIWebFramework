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

				$('#8008BBBC_FF0D_481C_8AF0_3DCF7D6A1676').submit(function(e) {

					amiLogin.form_login(e);
				});

				$('#2D609FA7_9BA6_4B0B_A0F2_094403F81E7D').submit(function(e) {

					amiLogin.form_addUser(e);
				});

				$('#DA2047A2_9E5D_420D_B6E7_FA261D2EF10F').submit(function(e) {

					amiLogin.form_remindPass(e);
				});

				$('#46A4D44F_BCE4_4407_AB70_194347BFC12C').submit(function(e) {

					amiLogin.form_changeInfo(e);
				});

				$('#0CD4F500_5EEA_49AF_8853_225572FDC2E7').submit(function(e) {

					amiLogin.form_changePass(e);
				});

				/*-----------------------------------------*/

				$('#56CE3A89_05AC_46F2_811B_D0D8DBAECEB3,#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').change(function() {

					var pass1 = $('#56CE3A89_05AC_46F2_811B_D0D8DBAECEB3').val();
					var pass2 = $('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').val();

					$('#CCD8E6F1_6DF8_4BDD_A0EC_C3C380830187').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				$('#D487FE72_8D95_4048_BEA3_252274862AF4,#9A355DC8_88EF_4438_BAB3_BB7BAD798A77').change(function() {

					var pass1 = $('#D487FE72_8D95_4048_BEA3_252274862AF4').val();
					var pass2 = $('#9A355DC8_88EF_4438_BAB3_BB7BAD798A77').val();

					$('#9A355DC8_88EF_4438_BAB3_BB7BAD798A77').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
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
	  * Check whether the user is authenticated
	  * @returns {Boolean}
	  */

	isAuthenticated: function()
	{
		return this.user !== this.guest;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Login' modal form
	  */

	login: function()
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

		$('#46A4D44F_BCE4_4407_AB70_194347BFC12C').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Password' modal form
	  */

	changePass: function()
	{
		this._flush();
		this._clean();

		$('#0CD4F500_5EEA_49AF_8853_225572FDC2E7').modal('show');
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

	_serializeForm: function(form)
	{
		var result = {};

		form.find('input').each(function() {

			var name = this.getAttribute('name');

			if(name)
			{
				result[name] = this.value.trim();
			}
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	form_login: function(e)
	{

		/*---------------------------------------------------------*/

		var deferred;

		if(e)
		{
			e.preventDefault();

			var values = this._serializeForm($(e.target));

			deferred = amiCommand.passLogin(values['user'], values['pass']);
		}
		else
		{
			deferred = amiCommand.certLogin(/*-*/null/*-*/, /*-*/null/*-*/);
		}

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		deferred.done(function(data, userInfo, roleInfo) {

			amiLogin._update(userInfo, roleInfo).done(function() {

				if(userInfo.AMIUser !== userInfo.guestUser)
				{
					$('#D2B5FADE_97A3_4B8C_8561_7A9AEACDBE5B').modal('hide');

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

	form_attachCert: function()
	{
		/*---------------------------------------------------------*/

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
		/*---------------------------------------------------------*/

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

	form_addUser: function(e)
	{
		e.preventDefault();

		/*---------------------------------------------------------*/

		var values = this._serializeForm($(e.target));

		/*---------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.addUser(values['login'], values['pass'], values['first_name'], values['last_name'], values['email']).done(function() {

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
