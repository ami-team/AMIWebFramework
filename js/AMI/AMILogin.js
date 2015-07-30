/*!
 * amiLogin
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiLogin                                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI authentication subsystem
 * @namespace amiLogin
 */

var amiLogin = {
	/*-----------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	/*-----------------------------------------------------------------*/

	roles: {},

	/*-----------------------------------------------------------------*/

	init: function()
	{
		amiWebApp.loadHTMLs([
			'html/AMI/Fragment/login_button.html',
			'html/AMI/Fragment/logout_button.html',
			'html/AMI/Modal/login.html',
			'html/AMI/Modal/login_change_info.html',
			'html/AMI/Modal/login_change_pass.html',
			'html/AMI/Modal/login_account_status.html',
		]).done(function(data) {

			amiLogin.fragmentLoginButton = data[0];
			amiLogin.fragmentLogoutButton = data[1];

			amiWebApp.appendHTML('#ami_modal_content', data[2]);
			amiWebApp.appendHTML('#ami_modal_content', data[3]);
			amiWebApp.appendHTML('#ami_modal_content', data[4]);
			amiWebApp.appendHTML('#ami_modal_content', data[5]);

			amiCommand.certLogin().always(function(data, user, guest) {
				/*-----------------------------------------*/

				document.getElementById('modal_login_form1_user').addEventListener('keypress', function(e) {

					if(e.keyCode === 13) {
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('modal_login_form1_pass').addEventListener('keypress', function(e) {

					if(e.keyCode === 13) {
						amiLogin.form_passLogin();
					}
				});

				document.getElementById('modal_login_form3_user').addEventListener('keypress', function(e) {

					if(e.keyCode === 13) {
						amiLogin.form_resetPass();
					}
				});

				/*-----------------------------------------*/

				amiLogin._update(data, user, guest);

				/*-----------------------------------------*/
			});

			/*-------------------------------------------------*/
		}).fail(function(data) {

			alert(data);
		});
	},

	/*-----------------------------------------------------------------*/

	/**
	  * The the current user
	  * @returns The current user
	  */

	getUser: function()
	{
		return amiLogin.user;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Login' modal form
	  */

	login: function()
	{
		amiLogin._flush();
		amiLogin._clean();

		$('#modal_login').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Info' modal form
	  */

	changeInfo: function()
	{
		amiLogin._flush();
		amiLogin._clean();

		$('#modal_login_change_info').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Change Password' modal form
	  */

	changePass: function()
	{
		amiLogin._flush();
		amiLogin._clean();

		$('#modal_login_change_pass').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Open the 'Account Status' modal form
	  */

	accountStatus: function()
	{
		amiLogin._flush();
		amiLogin._clean();

		$('#modal_login_account_status').modal('show');
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Log out
	  */

	logout: function() {

		amiWebApp.lock();

		return amiCommand.logout().always(function(data, user, guest) {

			amiLogin._update(data, user, guest).always(function() {

				amiWebApp.unlock();
			});
		});
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

		amiWebApp.lock();

		amiCommand.passLogin(user, pass).done(function(data, user, guest, clientDNInSession, issuerDNInSession) {

			if(user === guest)
			{
				var extra;

				if(clientDNInSession || issuerDNInSession)
				{
					extra = '<textarea style="height: 85px; width: 100%;">'
					        +
					        'Client DN in session: ' + amiWebApp.textToHtml(clientDNInSession)
					        + '\n' +
					        'Issuer DN in session: ' + amiWebApp.textToHtml(issuerDNInSession)
					        +
					        '</textarea>'
					;
				}
				else
				{
					extra = '';
				}

				amiLogin._showErrorMessage1('Invalid identifiers.' + extra);
			}
			else
			{
				$('#modal_login').modal('hide');
			}

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function(data, user, guest) {

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	form_certLogin: function()
	{
		amiWebApp.lock();

		amiCommand.certLogin().done(function(data, user, guest, clientDNInSession, issuerDNInSession) {

			if(user === guest)
			{
				var extra;

				if(clientDNInSession || issuerDNInSession)
				{
					extra = '<textarea style="height: 85px; width: 100%;">'
					        +
					        'Client DN in session: ' + amiWebApp.textToHtml(clientDNInSession)
					        + '\n' +
					        'Issuer DN in session: ' + amiWebApp.textToHtml(issuerDNInSession)
					        +
					        '</textarea>'
					;
				}
				else
				{
					extra = '';
				}

				amiLogin._showErrorMessage1('You have to provide your certificate registered in AMI.' + extra);
			}
			else
			{
				$('#modal_login').modal('hide');
			}

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function(data, user, guest) {

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});
		});
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

		amiWebApp.lock();

		amiCommand.attachCert(user, pass).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
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

		amiWebApp.lock();

		amiCommand.detachCert(user, pass).done(function() {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	form_addUser: function()
	{
		var firstName = $('#modal_login_form2_first_name').val();
		var lastName = $('#modal_login_form2_last_name').val();
		var email = $('#modal_login_form2_email').val();
		var user = $('#modal_login_form2_user').val();
		var pass1 = $('#modal_login_form2_pass1').val();
		var pass2 = $('#modal_login_form2_pass2').val();

		if(!firstName || !lastName || !email || !user || !pass1 || !pass2)
		{
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2)
		{
			amiLogin._showErrorMessage1('Password1 and Password2 have to be identical.');

			return;
		}

		amiWebApp.lock();

		amiCommand.addUser(user, pass1, firstName, lastName, email).done(function(data) {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
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

		amiWebApp.lock();

		amiCommand.changeInfo(firstName, lastName, email).done(function(data) {

			amiLogin._showSuccessMessage2('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage2(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
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
			amiLogin._showErrorMessage3('Password1 and Password2 have to be identical.');

			return;
		}

		amiWebApp.lock();

		amiCommand.changePass(oldPass, newPass1).done(function(data) {

			amiLogin._showSuccessMessage3('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
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

		amiWebApp.lock();

		amiCommand.resetPass(user).done(function(data) {

			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {

			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {

			amiLogin._clean();
			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	hasRole: function(roleName)
	{
		return roleName in amiLogin.roles;
	},

	/*-----------------------------------------------------------------*/

	hasRoleForEntity: function(roleName, catalog, entity)
	{
		if(roleName in amiLogin.roles)
		{
			for(var role in amiLogin.roles[roleName])
			{
				if(role['catalog'] === catalog
				   &&
				   role['entity'] === entity
				   &&
				   role['row'] === '0'
				 ) {
					return true;
				}
			}
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	hasRoleForRow: function(roleName, catalog, entity, row)
	{
		if(roleName in amiLogin.roles)
		{
			for(var role in amiLogin.roles[roleName])
			{
				if(role['catalog'] === catalog
				   &&
				   role['entity'] === entity
				   &&
				   role['row'] === row
				 ) {
					return true;
				}
			}
		}

		return false;
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

	_showSuccessMessage1: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage1: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage2: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage2: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage3: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage3: function(message)
	{
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showInfoMessage4: function(message)
	{
		if(message)
		{
			message = '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message;
		}

		amiWebApp.replaceHTML('#modal_login_account_status_message', message);
	},

	/*-----------------------------------------------------------------*/

	_showErrorMessage4: function(message)
	{
		if(message)
		{
			message = '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message;
		}

		amiWebApp.replaceHTML('#modal_login_account_status_message', message);
	},

	/*-----------------------------------------------------------------*/

	_update: function(data, user, guest)
	{
		/*---------------------------------------------------------*/

		amiLogin._clean();

		/*---------------------------------------------------------*/

		amiLogin.user = user;
		amiLogin.guest = guest;

		/*---------------------------------------------------------*/

		var userRows = amiWebApp.jspath('..rowset{.@type==="user"}..row', data);
		var roleRows = amiWebApp.jspath('..rowset{.@type==="role"}..row', data);

		/*---------------------------------------------------------*/

		amiLogin.roles = {};

		if(roleRows)
		{
			for(var i = 0; i < roleRows.length; i++)
			{
				var name = amiWebApp.jspath('..field{.@name==="name"}.$', roleRows[i])[0];
				var catalog = amiWebApp.jspath('..field{.@name==="catalog"}.$', roleRows[i])[0];
				var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', roleRows[i])[0];
				var row = amiWebApp.jspath('..field{.@name==="row"}.$', roleRows[i])[0];

				if(!(name in amiLogin.roles))
				{
					amiLogin.roles[name] = [];
				}

				amiLogin.roles[name].push({
					catalog: catalog,
					entity: entity,
					row: row,
				});
			}
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		if(user !== guest)
		{
			/*-------------------------------------------------*/

			var valid = amiWebApp.jspath('..field{.@name==="valid"}.$', userRows)[0] || 'false';
			var certEnabled = amiWebApp.jspath('..field{.@name==="certEnabled"}.$', userRows)[0] || 'false';
			var vomsEnabled = amiWebApp.jspath('..field{.@name==="vomsEnabled"}.$', userRows)[0] || 'false';

			/*-------------------------------------------------*/

			var firstName = amiWebApp.jspath('..field{.@name==="firstName"}.$', userRows)[0] || '';
			var lastName = amiWebApp.jspath('..field{.@name==="lastName"}.$', userRows)[0] || '';
			var email = amiWebApp.jspath('..field{.@name==="email"}.$', userRows)[0] || '';

			/*-------------------------------------------------*/

			var clientDNInAMI = amiWebApp.jspath('..field{.@name==="clientDNInAMI"}.$', userRows)[0] || '';
			var issuerDNInAMI = amiWebApp.jspath('..field{.@name==="issuerDNInAMI"}.$', userRows)[0] || '';
			var clientDNInSession = amiWebApp.jspath('..field{.@name==="clientDNInSession"}.$', userRows)[0] || '';
			var issuerDNInSession = amiWebApp.jspath('..field{.@name==="issuerDNInSession"}.$', userRows)[0] || '';

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
			$('#modal_login_account_status_form2_issuer_dn_in_ami').val(issuerDNInAMI);
			$('#modal_login_account_status_form2_client_dn_in_session').val(clientDNInSession);
			$('#modal_login_account_status_form2_issuer_dn_in_session').val(issuerDNInSession);

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

				$('#modal_login_account_status_form1_status').html(
					'<span style="color: #006400;">valid</span>'
				);

				amiLogin._showInfoMessage4(message);

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

				$('#modal_login_account_status_form1_status').html(
					'<span style="color: #8B0000;">invalid</span>'
				);

				amiLogin._showErrorMessage4(message);

				color = 'red';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/

			var icon = message ? '<a href="javascript:amiLogin.accountStatus();" class="faa-burst animated" style="color: ' + color + ';">'
			                     +
			                     '<span class="fa fa-exclamation-triangle"></span>'
			                     +
			                     '</a>'
			                   : ''
			;

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
		}
		else
		{
			_ami_internal_always(
				amiWebApp.onLogout(),
				function() {
					result.resolve();
					amiWebApp.replaceHTML('#ami_login_content', amiLogin.fragmentLoginButton, {dict: null});
				}
			);
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
