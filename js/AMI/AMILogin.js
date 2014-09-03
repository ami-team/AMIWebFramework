/*!
 * AMILogin class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMILogin                                                          */
/*-------------------------------------------------------------------------*/

function AMILogin() {
	/*-----------------------------------------------------------------*/

	this.start = function(settings) {

		var project = '???';

		if(settings) {

			if('project' in settings) {
				project = settings['project'];
			}
		}

		/*---------------------------------------------------------*/

		amiWebApp.loadHTML('html/AMI/AMILogin.html').done(function(data1) {
			amiWebApp.loadHTML('html/AMI/Fragment/login_button.html').done(function(data2) {
				amiWebApp.loadHTML('html/AMI/Fragment/logout_button.html').done(function(data3) {

					amiWebApp.appendHTML('modal', data1);

					amiLogin.fragmentLoginButton = data2;
					amiLogin.fragmentLogoutButton = data3;

					amiCommand.certLogin().done(function(data, user) {
						amiLogin.user = user;
						amiLogin._showMenu();
					}).fail(function(data) {
						amiLogin.user = 'guest';
						amiLogin._showMenu();
					});

					var dict = {
						PROJECT: project,
					};

					amiWebApp.loadHTML('html/AMI/AMILoginChangePass.html').done(function(data) {
						amiWebApp.appendHTML('modal', data);
						});

					amiWebApp.loadHTML('html/AMI/AMILoginValidateAccount.html').done(function(data) {
						amiWebApp.appendHTML('modal', data, {dict: dict});
					});
				});
			});
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.login = function() {
		$('#modal_login_message').empty();

		$('#modal_login').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function() {
		$('#modal_login_change_pass_message').empty();

		$('#modal_login_change_pass').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.validateAccount = function() {
		$('#modal_login_validate_account_message').empty();

		$('#modal_login_validate_account').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.logout = function() {

		return amiCommand.logout().done(function(data) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();

		}).fail(function(data) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this._passLogin = function() {

		var user = $('#loginForm input[name=user]').val();
		var pass = $('#loginForm input[name=pass]').val();

		if(user === '' || pass === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.passLogin(user, pass).done(function(data, user) {
			$('#modal_login').modal('hide');

			amiLogin.user = user;
			amiLogin._showMenu();
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);

			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this._certLogin = function() {

		amiCommand.certLogin().done(function(data, user) {
			$('#modal_login').modal('hide');

			amiLogin.user = user;
			amiLogin._showMenu();
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);

			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this._createAccount = function() {

		var firstName = $('#createLoginForm input[name=firstName]').val();
		var lastName  = $('#createLoginForm input[name=lastName]' ).val();
		var email      = $('#createLoginForm input[name=email]'   ).val();
		var user      = $('#createLoginForm input[name=user]'     ).val();
		var pass1     = $('#createLoginForm input[name=pass1]'    ).val();
		var pass2     = $('#createLoginForm input[name=pass2]'    ).val();

		if(firstName === '' || lastName === '' || email === '' || user === '' || pass1 === '' || pass2 === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2) {
			this._showErrorMessage('Password1 and Password2 have to be identical.');

			return;
		}

		amiCommand.addUser(firstName, lastName, email, user, pass1).done(function(data) {
			amiLogin._showSuccessMessage('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);
		});
	};

	/*-----------------------------------------------------------------*/

	this._changePass = function() {

		var old_pass  = $('#changePassForm input[name=old_pass]' ).val();
		var new_pass1 = $('#changePassForm input[name=new_pass1]').val();
		var new_pass2 = $('#changePassForm input[name=new_pass2]').val();

		if(old_pass === '' || new_pass1 === '' || new_pass2 === '') {
			this._showErrorMessage2('Please, fill all fields with a red star.');

			return;
		}

		if(new_pass1 !== new_pass2) {
			this._showErrorMessage2('Password1 and Password2 have to be identical.');

			return;
		}

		amiCommand.changePass(old_pass, new_pass1).done(function(data) {
			amiLogin._showSuccessMessage2('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage2(JSPath.apply('..error', data)[0].$);
		});
	};

	/*-----------------------------------------------------------------*/

	this._resetPass = function() {

		var user = $('#remindPasswordForm input[name=user]').val();

		if(user === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.resetPass(user).done(function(data) {
			amiLogin._showSuccessMessage('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);
		});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_validate_account_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	};

	this._showErrorMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_validate_account_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	};

	/*-----------------------------------------------------------------*/

	this._showMenu = function() {

		var dict = {
			USER: amiLogin.user
		};

		if(amiLogin.user === 'guest') {
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
