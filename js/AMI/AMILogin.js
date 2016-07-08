/*!
 * AMI Web Framework - AMILogin
 *
 * Copyright (c) 2014-2016 The AMI Team
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
			amiWebApp.originURL + '/html/AMI/Fragment/login_button.html',
			amiWebApp.originURL + '/html/AMI/Fragment/logout_button.html',
			amiWebApp.originURL + '/html/AMI/Modal/login.html',
			amiWebApp.originURL + '/html/AMI/Modal/login_change_info.html',
			amiWebApp.originURL + '/html/AMI/Modal/login_change_pass.html',
			amiWebApp.originURL + '/html/AMI/Modal/login_account_status.html',
		]).done(function(data) {

			amiLogin.fragmentLoginButton = data[0];
			amiLogin.fragmentLogoutButton = data[1];

			amiWebApp.appendHTML('body', data[2]);
			amiWebApp.appendHTML('body', data[3]);
			amiWebApp.appendHTML('body', data[4]);
			amiWebApp.appendHTML('body', data[5]);

			amiCommand.certLogin().always(function(data, userInfo, roleInfo) {
				/*-----------------------------------------*/

				document.getElementById('modal_login_form1_user').addEventListener('keypress', function(e) {

					if(e.keyCode === 13)
					{
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('modal_login_form1_pass').addEventListener('keypress', function(e) {

					if(e.keyCode === 13)
					{
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('modal_login_form3_user').addEventListener('keypress', function(e) {

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
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#modal_login_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage1: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#modal_login_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage2: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#modal_login_change_info_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage2: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#modal_login_change_info_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage3: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});

		$('#modal_login_change_pass_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage3: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});

		$('#modal_login_change_pass_message .alert').fadeOut(45000);

		amiLogin._clean();
		amiWebApp.unlock();
	},

	/*-----------------------------------------------------------------*/

	_flush: function()
	{
		$('#modal_login_message').empty();

		$('#modal_login_change_info_message').empty();

		$('#modal_login_change_pass_message').empty();
	},

	/*-----------------------------------------------------------------*/

	_clean: function()
	{
		$('#modal_login_form1_pass').val('');

		$('#modal_login_form2_pass1').val('');
		$('#modal_login_form2_pass2').val('');

		$('#modal_login_change_pass_form_old_pass' ).val('');
		$('#modal_login_change_pass_form_new_pass1').val('');
		$('#modal_login_change_pass_form_new_pass2').val('');
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

			$('#modal_login_change_info_form_first_name').val(firstName);
			$('#modal_login_change_info_form_last_name').val(lastName);
			$('#modal_login_change_info_form_email').val(email);

			/*-------------------------------------------------*/

			$('#modal_login_change_info_form_email').prop('disabled', vomsEnabled !== 'false');

			/*-------------------------------------------------*/

			$('#modal_login_account_status_form2_first_name').val(firstName);
			$('#modal_login_account_status_form2_last_name').val(lastName);
			$('#modal_login_account_status_form2_email').val(email);

			/*-------------------------------------------------*/

			$('#modal_login_account_status_form2_client_dn_in_ami').val(clientDNInAMI);
			$('#modal_login_account_status_form2_client_dn_in_session').val(clientDNInSession);
			$('#modal_login_account_status_form2_issuer_dn_in_ami').val(issuerDNInAMI);
			$('#modal_login_account_status_form2_issuer_dn_in_session').val(issuerDNInSession);

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

				$('#modal_login_account_status_message').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message : ''
				);

				$('#modal_login_account_status_form1_status').html(
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

				$('#modal_login_account_status_message').html(
					message ? '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message : ''
				);

				$('#modal_login_account_status_form1_status').html(
					'<span style="color: #8B0000;">invalid</span>'
				);

				color = 'red';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* UPDATE NOTIFICATION BAR                         */
			/*-------------------------------------------------*/

			var icon = message ? '<a href="javascript:amiLogin.accountStatus();" class="faa-burst animated" style="color: ' + color + ';">'
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
	  * @returns {Boolean}
	  */

	hasRole: function(roleName)
	{
		return roleName in amiLogin.roleInfo;
	},

	/*-----------------------------------------------------------------*/

	form_passLogin: function()
	{
		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

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

				amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
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

				amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
			});
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_attachCert: function()
	{
		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

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

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_detachCert: function()
	{
		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

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

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_addUser: function()
	{
		var user = $('#modal_login_form2_user').val();
		var pass1 = $('#modal_login_form2_pass1').val();
		var pass2 = $('#modal_login_form2_pass2').val();
		var firstName = $('#modal_login_form2_first_name').val();
		var lastName = $('#modal_login_form2_last_name').val();
		var email = $('#modal_login_form2_email').val();

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

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changeInfo: function()
	{
		var firstName = $('#modal_login_change_info_form_first_name').val();
		var lastName = $('#modal_login_change_info_form_last_name').val();
		var email = $('#modal_login_change_info_form_email').val();

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

			amiLogin._showErrorMessage2(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_changePass: function()
	{
		var oldPass = $('#modal_login_change_pass_form_old_pass').val();
		var newPass1 = $('#modal_login_change_pass_form_new_pass1').val();
		var newPass2 = $('#modal_login_change_pass_form_new_pass2').val();

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

			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	form_resetPass: function()
	{
		var user = $('#modal_login_form3_user').val();

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

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
		});

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
