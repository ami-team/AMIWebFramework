/*!
 * AMILogin class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL VARIABLES                                                      */
/*-------------------------------------------------------------------------*/

var amiGuest = 'guest';

/*-------------------------------------------------------------------------*/
/* CLASS AMILogin                                                          */
/*-------------------------------------------------------------------------*/

function AMILogin() {
	/*-----------------------------------------------------------------*/

	this.start = function(settings) {

		amiWebApp.loadHTML('html/AMI/AMILogin.html').done(function(data1) {
			amiWebApp.loadHTML('html/AMI/Fragment/login_button.html').done(function(data2) {
				amiWebApp.loadHTML('html/AMI/Fragment/logout_button.html').done(function(data3) {

					amiWebApp.appendHTML('modal', data1);

					amiLogin.fragmentLoginButton = data2;
					amiLogin.fragmentLogoutButton = data3;

					amiCommand.certLogin().done(function(data, user) {
						amiLogin._update(data, user);
					}).fail(function(data) {
						amiLogin._update(data, amiGuest);
					});

					amiWebApp.loadHTML('html/AMI/AMILoginChangeInfo.html').done(function(data) {
						amiWebApp.appendHTML('modal', data);
					});

					amiWebApp.loadHTML('html/AMI/AMILoginChangePass.html').done(function(data) {
						amiWebApp.appendHTML('modal', data);
					});

					amiWebApp.loadHTML('html/AMI/AMILoginAccountStatus.html').done(function(data) {
						amiWebApp.appendHTML('modal', data);
					});
				});
			});
		});
	};

	/*-----------------------------------------------------------------*/

	this.login = function() {
		$('#modal_login_message').empty();

		$('#modal_login').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.changeInfo = function() {
		$('#modal_login_change_info_message').empty();

		$('#modal_login_change_info').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function() {
		$('#modal_login_change_pass_message').empty();

		$('#modal_login_change_pass').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.accountStatus = function() {

		$('#modal_login_account_status').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.logout = function() {

		return amiCommand.logout().done(function(data) {
			amiLogin._update(data, amiGuest);

		}).fail(function(data) {
			amiLogin._update(data, amiGuest);
		});
	};

	/*-----------------------------------------------------------------*/

	this._passLogin = function() {

		var user = $('#loginForm input[name=user]').val();
		var pass = $('#loginForm input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.passLogin(user, pass).done(function(data, user) {

			if(user === amiGuest) {
				amiLogin._showErrorMessage1('Could not log in as `guest`.');
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user);
		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);

			amiLogin._update(data, amiGuest);
		});
	};

	/*-----------------------------------------------------------------*/

	this._certLogin = function() {

		amiCommand.certLogin().done(function(data, user) {

			if(user === amiGuest) {
				amiLogin._showErrorMessage1('You have to provide a certificate.');
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user);
		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);

			amiLogin._update(data, amiGuest);
		});
	};

	/*-----------------------------------------------------------------*/

	this._attachCert = function() {

		var user = $('#loginForm input[name=user]').val();
		var pass = $('#loginForm input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.attachCert(user, pass).done(function() {
			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._detachCert = function() {

		var user = $('#loginForm input[name=user]').val();
		var pass = $('#loginForm input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.detachCert(user, pass).done(function() {
			amiLogin._showSuccessMessage1('Done with success.');

		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._addUser = function() {

		var firstName = $('#createLoginForm input[name=firstName]').val();
		var lastName  = $('#createLoginForm input[name=lastName]' ).val();
		var email     = $('#createLoginForm input[name=email]'    ).val();
		var user      = $('#createLoginForm input[name=user]'     ).val();
		var pass1     = $('#createLoginForm input[name=pass1]'    ).val();
		var pass2     = $('#createLoginForm input[name=pass2]'    ).val();

		if(firstName === '' || lastName === '' || email === '' || user === '' || pass1 === '' || pass2 === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2) {
			amiLogin._showErrorMessage1('Password1 and Password2 have to be identical.');

			return;
		}

		amiCommand.addUser(firstName, lastName, email, user, pass1).done(function(data) {
			amiLogin._showSuccessMessage1('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._changeInfo = function() {

		var firstName = $('#changeInfoForm input[name=firstName]').val();
		var lastName  = $('#changeInfoForm input[name=lastName]' ).val();
		var email     = $('#changeInfoForm input[name=email]'    ).val();

		if(firstName === '' || lastName === '' || email === '') {
			amiLogin._showErrorMessage2('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.changeInfo(firstName, lastName, email).done(function(data) {
			amiLogin._showSuccessMessage2('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage2(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._changePass = function() {

		var old_pass  = $('#changePassForm input[name=old_pass]' ).val();
		var new_pass1 = $('#changePassForm input[name=new_pass1]').val();
		var new_pass2 = $('#changePassForm input[name=new_pass2]').val();

		if(old_pass === '' || new_pass1 === '' || new_pass2 === '') {
			amiLogin._showErrorMessage3('Please, fill all fields with a red star.');

			return;
		}

		if(new_pass1 !== new_pass2) {
			amiLogin._showErrorMessage3('Password1 and Password2 have to be identical.');

			return;
		}

		amiCommand.changePass(old_pass, new_pass1).done(function(data) {
			amiLogin._showSuccessMessage3('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage3(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._resetPass = function() {

		var user = $('#remindPasswordForm input[name=user]').val();

		if(user === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.resetPass(user).done(function(data) {
			amiLogin._showSuccessMessage1('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage1(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage1 = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage1 = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage4 = function(message) {
		amiWebApp.replaceHTML('modal_login_account_status_message', '<span style="color: green;">' + message + '</span>');
	};

	this._showErrorMessage4 = function(message) {
		amiWebApp.replaceHTML('modal_login_account_status_message', '<span style="color: red;">' + message + '</span>');
	};

	/*-----------------------------------------------------------------*/

	this._update = function(data, user) {

		var isValid;

		var archived = amiWebApp.jspath('..field{.@name==="archived"}.$', data)[0];

		var cert_enable = amiWebApp.jspath('..field{.@name==="cert_enable"}.$', data)[0];
		var voms_enable = amiWebApp.jspath('..field{.@name==="voms_enable"}.$', data)[0];

		var cert_in_ami = amiWebApp.jspath('..field{.@name==="cert_in_ami"}.$', data)[0];
		var cert_in_session = amiWebApp.jspath('..field{.@name==="cert_in_session"}.$', data)[0];
		var issuer_in_ami = amiWebApp.jspath('..field{.@name==="issuer_in_ami"}.$', data)[0];
		var issuer_in_session = amiWebApp.jspath('..field{.@name==="issuer_in_session"}.$', data)[0];

		var first_name = amiWebApp.jspath('..field{.@name==="first_name"}.$', data)[0];
		var last_name = amiWebApp.jspath('..field{.@name==="last_name"}.$', data)[0];
		var email = amiWebApp.jspath('..field{.@name==="email"}.$', data)[0];

		if(archived !== '0') {
			isValid = false;

			var err_msg;

			if(voms_enable !== 'false') {
				if(cert_in_ami === undefined) {
					err_msg = 'you have to register a valid GRID certificate.';
				}
				else {
					err_msg = 'you have to obtain VOMS role for you certificate.';
				}
			} else {
				err_msg = 'contact the AMI team.';
			}

			amiLogin._showErrorMessage4('Error: your account has been deactivated: ' + err_msg);

		} else {
			isValid = true;

			if(cert_enable !== 'false' && cert_in_ami !== undefined && issuer_in_ami !== undefined) {

				if(cert_in_session === undefined
				   ||
				   issuer_in_session === undefined
				 ) {
					amiLogin._showErrorMessage4('Warning: you should provide your certificate.');
				} else {

					if(cert_in_ami !== cert_in_session
					   ||
					   issuer_in_ami !== issuer_in_session
					 ) {
						amiLogin._showErrorMessage4('Warning: the certificate in your session is not the one registered in AMI.');
					}
				}
			}
		}

		$('#changeInfoForm input[name=firstName]').val(first_name);
		$('#changeInfoForm input[name=lastName]' ).val(last_name );
		$('#changeInfoForm input[name=email]'    ).val(email     );

		$('#modal_login_account_status_status').html(isValid ? 'valid' : 'invalid');

		$('#changeInfoForm input[name=email]').prop('disabled', archived === '0' && voms_enable !== 'false');

		var dict = {
			USER: user
		};

		amiLogin.user = user;

		if(amiLogin.user === amiGuest) {
			amiWebApp.replaceHTML('login', amiLogin.fragmentLoginButton, {dict: dict});
			amiWebApp.onLogout();
		}
		else {
			amiWebApp.replaceHTML('login', amiLogin.fragmentLogoutButton, {dict: dict});
			amiWebApp.onLogin();
		}
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiLogin = new AMILogin();

/*-------------------------------------------------------------------------*/
