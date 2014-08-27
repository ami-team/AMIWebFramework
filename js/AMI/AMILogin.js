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

		amiWebApp.loadHTML('html/AMI/AMILogin.html').done(function(data) {
			amiWebApp.appendHTML('modal', data);

			amiLogin._getUser();
		});
	};

	/*-----------------------------------------------------------------*/

	this.login = function() {
		$('#modal_login_message').empty();

		$('#modal_login').modal('show');
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

	this.passConnect = function() {

		var user = $('#loginForm input[name=user]').val()
		var pass = $('#loginForm input[name=pass]').val()

		this._setUser(user, pass).done(function(data) {
			$('#modal_login').modal('hide');
		}).fail(function(data) {

			var error = JSPath.apply('..error', data)

			var dict = {
				MESSAGE: error[0].$
			};

			amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: dict});
		});
	};

	/*-----------------------------------------------------------------*/

	this.certConnect = function() {

		/* TODO */
		alert('TODO');
		/* TODO */
	};

	/*-----------------------------------------------------------------*/

	this._getUser = function() {

		return amiCommand.session().done(function(data, login) {
			amiLogin.user = login;
			amiLogin._showMenu();

		}).fail(function(data) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this._setUser = function(user, pass) {

		return amiCommand.login(user, pass).done(function(data, login) {
			amiLogin.user = login;
			amiLogin._showMenu();

		}).fail(function(data) {
			amiLogin.user = 'guest';
			amiLogin._showMenu();
		});
	};

	/*-----------------------------------------------------------------*/

	this._showMenu = function() {
		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		if(amiLogin.user === 'guest') {
			$('#login').html(
				'<li>' +
				'  <button class="btn btn-default navbar-btn" style="margin-right: 15px;" onclick="amiLogin.login()">' +
				'    <span class="glyphicon glyphicon-share-alt"></span> Log In' +
				'  </button>' +
				'</li>'
			);
		}
		else {
			$('#login').html(
				'<li class="dropdown">' +
				'  <a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
				'    <span class="glyphicon glyphicon-user"></span> Logged as ' + amiLogin.user + ' <span class="caret"></span>' +
				'  </a>' +
				'  <ul class="dropdown-menu">' +
				'    <li><a href="javascript:alert(\'TODO\')">Account Validation</a></li>' +
				'    <li><a href="javascript:alert(\'TODO\')">Edit Password</a></li>' +
				'  </ul>' +
				'</li>' +

				'<li>' +
				'  <button class="btn btn-default navbar-btn" style="margin-right: 15px;" onClick="amiLogin.logout()">' +
				'    <span class="glyphicon glyphicon-off"></span> Log Out' +
				'  </button>' +
				'</li>'
			);
		}

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		amiWebApp.userReload();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiLogin = new AMILogin();

/*-------------------------------------------------------------------------*/
