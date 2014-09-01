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

		amiWebApp.loadHTML('html/AMI/AMILogin.html').done(function(data1) {
			amiWebApp.loadHTML('html/AMI/Fragment/login_button.html').done(function(data2) {
				amiWebApp.loadHTML('html/AMI/Fragment/logout_button.html').done(function(data3) {

					amiWebApp.appendHTML('modal', data1);

					amiLogin.fragmentLoginButton = data2;
					amiLogin.fragmentLogoutButton = data3;

					amiCommand.session().done(function(data, login) {
						amiLogin.user = login;
						amiLogin._showMenu();
						amiWebApp.userReload();
					}).fail(function(data) {
						amiLogin.user = 'guest';
						amiLogin._showMenu();
						amiWebApp.userReload();
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

	this.passLogin = function() {

		var user = $('#loginForm input[name=user]').val();
		var pass = $('#loginForm input[name=pass]').val();

		if(user === '' || pass === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.passLogin(user, pass).done(function(data, login) {
			$('#modal_login').modal('hide');

			amiLogin.user = login;
			amiLogin._showMenu();
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);

			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this.certLogin = function() {

		amiCommand.certLogin().done(function(data, login) {
			$('#modal_login').modal('hide');

			amiLogin.user = login;
			amiLogin._showMenu();
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);

			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this.logout = function() {

		return amiCommand.logout().done(function(data, login) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();

		}).fail(function(data) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this.createAccount = function() {

		var firstName = $('#createLoginForm input[name=firstName]').val();
		var lastName  = $('#createLoginForm input[name=lastName]' ).val();
		var user      = $('#createLoginForm input[name=user]'     ).val();
		var mail      = $('#createLoginForm input[name=mail]'     ).val();
		var pass1     = $('#createLoginForm input[name=pass1]'    ).val();
		var pass2     = $('#createLoginForm input[name=pass2]'    ).val();

		if(firstName === '' || lastName === '' || user === '' || mail === '' || pass1 === '' || pass2 === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2) {
			this._showErrorMessage('Password1 and Password2 have to be identical.');

			return;
		}

		amiCommand.addUser(firstName, lastName, user, mail, pass1, pass2).done(function(data, login) {
			amiLogin._showSuccessMessage('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);
		});
	};

	/*-----------------------------------------------------------------*/

	this.remindPass = function() {

		var user = $('#remindPasswordForm input[name=user]').val();

		if(user === '') {
			this._showErrorMessage('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.remindPassword(user).done(function(data, login) {
			amiLogin._showSuccessMessage('Done with success.');
		}).fail(function(data) {
			amiLogin._showErrorMessage(JSPath.apply('..error', data)[0].$);
		});
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
	}

	/*-----------------------------------------------------------------*/

	this._showErrorMessage = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
	}

	/*-----------------------------------------------------------------*/

	this._showMenu = function() {

		var dict = {
			USER: amiLogin.user
		};

		if(amiLogin.user === 'guest') {
			amiWebApp.replaceHTML('login', amiLogin.fragmentLoginButton, {dict: dict});
		}
		else {
			amiWebApp.replaceHTML('login', amiLogin.fragmentLogoutButton, {dict: dict});
		}
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiLogin = new AMILogin();

/*-------------------------------------------------------------------------*/
