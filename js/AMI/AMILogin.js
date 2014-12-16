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

	this.user = 'guest';
	this.guest = 'guest';

	this.is_connected = false;
	this.already_started = false;

	/*-----------------------------------------------------------------*/

	this.roles = {};

	/*-----------------------------------------------------------------*/

	this.start = function(userdata) {

		amiWebApp.lock();

		if(!this.already_started) {

			amiLogin.already_started = true;

			amiWebApp.loadHTML('html/AMI/Modal/login.html').done(function(data1) {
				amiWebApp.loadHTML('html/AMI/Fragment/login_button.html').done(function(data2) {
					amiWebApp.loadHTML('html/AMI/Fragment/logout_button.html').done(function(data3) {
						/*-------------------------*/

						amiWebApp.appendHTML('ami_modal_content', data1);

						amiLogin.fragmentLoginButton = data2;
						amiLogin.fragmentLogoutButton = data3;

						/*-------------------------*/

						amiWebApp.loadHTML('html/AMI/Modal/login_change_info.html').done(function(data) {
							amiWebApp.appendHTML('ami_modal_content', data);
						});

						amiWebApp.loadHTML('html/AMI/Modal/login_change_pass.html').done(function(data) {
							amiWebApp.appendHTML('ami_modal_content', data);
						});

						amiWebApp.loadHTML('html/AMI/Modal/login_account_status.html').done(function(data) {
							amiWebApp.appendHTML('ami_modal_content', data);
						});

						/*-------------------------*/

						document.getElementById('modal_login1_user').addEventListener('keypress', function(e) {

							if(e.keyCode == 13) {
								amiLogin.form_passLogin();
							}
						});

						document.getElementById('modal_login1_pass').addEventListener('keypress', function(e) {

							if(e.keyCode == 13) {
								amiLogin.form_passLogin();
							}
						});

						document.getElementById('modal_login3_user').addEventListener('keypress', function(e) {

							if(e.keyCode == 13) {
								amiLogin.form_resetPass();
							}
						});

						/*-------------------------*/

						amiCommand.certLogin().done(function(data, user) {
							amiLogin.guest = amiWebApp.jspath('..field{.@name==="guestUser"}.$', data)[0];

							var result = amiWebApp.onReady(userdata);

							if(result && result.done) {
								result.done(function() {
									amiLogin._update(data, user);
								});
							} else {
								amiLogin._update(data, user);
							}

							amiWebApp.unlock();

						}).fail(function(data) {
							amiLogin.guest = amiWebApp.jspath('..field{.@name==="guestUser"}.$', data)[0];

							var result = amiWebApp.onReady(userdata);

							if(result && result.done) {
								result.done(function() {
									amiLogin._update(data, amiLogin.guest);
									amiWebApp.unlock();
								}).fail(function() {
									amiWebApp.unlock();
								});
							} else {
								amiLogin._update(data, amiLogin.guest);
								amiWebApp.unlock();
							}
						});

						/*-------------------------*/
					});
				});
			});
		} else {
			var result = amiWebApp.onReady(userdata);

			if(result && result.done) {
				result.done(function() {
					amiWebApp.onLogin();
					amiWebApp.unlock();
				}).fail(function() {
					amiWebApp.unlock();
				});
			} else {
				amiWebApp.onLogin();
				amiWebApp.unlock();
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.login = function() {

		amiLogin._clean();

		$('#modal_login_message').empty();

		$('#modal_login').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.changeInfo = function() {

		amiLogin._clean();

		$('#modal_login_change_info_message').empty();

		$('#modal_login_change_info').modal('show');
	};

	/*-----------------------------------------------------------------*/

	this.changePass = function() {

		amiLogin._clean();

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
			amiLogin._update(data, amiLogin.guest);

		}).fail(function(data) {
			amiLogin._update(data, amiLogin.guest);
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_passLogin = function() {

		var user = $('#form_login1 input[name=user]').val();
		var pass = $('#form_login1 input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.passLogin(user, pass).done(function(data, user) {

			if(user === amiLogin.guest) {
				amiLogin._showErrorMessage1('You could not sign in as `' + amiLogin.guest + '`.');
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user);

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

			amiLogin._update(data, amiLogin.guest);
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_certLogin = function() {

		amiCommand.certLogin().done(function(data, user) {

			if(user === amiLogin.guest) {
				amiLogin._showErrorMessage1('You have to provide your certificate registered in AMI.');
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user);

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

			amiLogin._update(data, amiLogin.guest);
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_attachCert = function() {

		var user = $('#form_login1 input[name=user]').val();
		var pass = $('#form_login1 input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.attachCert(user, pass).done(function() {
			amiLogin._showSuccessMessage1('Done with success.');
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_detachCert = function() {

		var user = $('#form_login1 input[name=user]').val();
		var pass = $('#form_login1 input[name=pass]').val();

		if(user === '' || pass === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.detachCert(user, pass).done(function() {
			amiLogin._showSuccessMessage1('Done with success.');
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_addUser = function() {

		var firstName = $('#form_login2 input[name=firstName]').val();
		var lastName  = $('#form_login2 input[name=lastName]' ).val();
		var email     = $('#form_login2 input[name=email]'    ).val();
		var user      = $('#form_login2 input[name=user]'     ).val();
		var pass1     = $('#form_login2 input[name=pass1]'    ).val();
		var pass2     = $('#form_login2 input[name=pass2]'    ).val();

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
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_changeInfo = function() {

		var firstName = $('#form_login_change_info input[name=firstName]').val();
		var lastName  = $('#form_login_change_info input[name=lastName]' ).val();
		var email     = $('#form_login_change_info input[name=email]'    ).val();

		if(firstName === '' || lastName === '' || email === '') {
			amiLogin._showErrorMessage2('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.changeInfo(firstName, lastName, email).done(function(data) {
			amiLogin._showSuccessMessage2('Done with success.');
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage2(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_changePass = function() {

		var old_pass  = $('#form_login_change_pass input[name=old_pass]' ).val();
		var new_pass1 = $('#form_login_change_pass input[name=new_pass1]').val();
		var new_pass2 = $('#form_login_change_pass input[name=new_pass2]').val();

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
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.form_resetPass = function() {

		var user = $('#form_login3 input[name=user]').val();

		if(user === '') {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiCommand.resetPass(user).done(function(data) {
			amiLogin._showSuccessMessage1('Done with success.');
			amiLogin._clean();

		}).fail(function(data) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);
			amiLogin._clean();
		});
	};

	/*-----------------------------------------------------------------*/

	this.hasRole = function(role) {

		return role in amiLogin.roles;
	};

	/*-----------------------------------------------------------------*/

	this.getRoleInfo = function(role) {

		return (role in amiLogin.roles) ? amiLogin.roles[role] : null;
	};

	/*-----------------------------------------------------------------*/

	this._clean = function(message) {
		$('#form_login1 input[name=pass]').val('');

		$('#form_login2 input[name=pass1]').val('');
		$('#form_login2 input[name=pass2]').val('');

		$('#form_login_change_pass input[name=old_pass]' ).val('');
		$('#form_login_change_pass input[name=new_pass1]').val('');
		$('#form_login_change_pass input[name=new_pass2]').val('');
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage1 = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(30000);
	};

	this._showErrorMessage1 = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(30000);
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(30000);
	};

	this._showErrorMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(30000);
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(30000);
	};

	this._showErrorMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(30000);
	};

	/*-----------------------------------------------------------------*/

	this._showInfoMessage4 = function(message) {

		if(message !== '') {
			message = '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message;
		}

		amiWebApp.replaceHTML('modal_login_account_status_message', message);
	};

	this._showErrorMessage4 = function(message) {

		if(message !== '') {
			message = '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message;
		}

		amiWebApp.replaceHTML('modal_login_account_status_message', message);
	};

	/*-----------------------------------------------------------------*/

	this._update = function(data, user) {
		/*---------------------------------------------------------*/

		amiLogin._clean();

		/*---------------------------------------------------------*/

		amiLogin.user = user;

		/*---------------------------------------------------------*/

		var user_rows = amiWebApp.jspath('..rowset{.@type==="user"}..row', data);
		var role_rows = amiWebApp.jspath('..rowset{.@type==="role"}..row', data);

		/*---------------------------------------------------------*/

		amiLogin.roles = {};

		for(var i = 0; i < role_rows.length; i++) {

			var name = amiWebApp.jspath('..field{.@name==="name"}.$', role_rows[i])[0];
			var project = amiWebApp.jspath('..field{.@name==="project"}.$', role_rows[i])[0];
			var process = amiWebApp.jspath('..field{.@name==="process"}.$', role_rows[i])[0];
			var entity = amiWebApp.jspath('..field{.@name==="entity"}.$', role_rows[i])[0];

			amiLogin.roles[name] = {
				project: project,
				process: process,
				entity: entity,
			};
		}

		/*---------------------------------------------------------*/

		if(user !== amiLogin.guest) {
			/*-------------------------------------------------*/

			var valid = amiWebApp.jspath('..field{.@name==="valid"}.$', user_rows)[0];

			var cert_enable = amiWebApp.jspath('..field{.@name==="certEnable"}.$', user_rows)[0];
			var voms_enable = amiWebApp.jspath('..field{.@name==="vomsEnable"}.$', user_rows)[0];

			/*-------------------------------------------------*/

			var first_name = amiWebApp.jspath('..field{.@name==="firstName"}.$', user_rows)[0];
			var last_name = amiWebApp.jspath('..field{.@name==="lastName"}.$', user_rows)[0];
			var email = amiWebApp.jspath('..field{.@name==="email"}.$', user_rows)[0];

			/*-------------------------------------------------*/

			var client_dn_in_ami = amiWebApp.jspath('..field{.@name==="clientDNInAMI"}.$', user_rows)[0];
			var client_dn_in_session = amiWebApp.jspath('..field{.@name==="clientDNInSession"}.$', user_rows)[0];
			var issuer_dn_in_ami = amiWebApp.jspath('..field{.@name==="issuerDNInAMI"}.$', user_rows)[0];
			var issuer_dn_in_session = amiWebApp.jspath('..field{.@name==="issuerDNInSession"}.$', user_rows)[0];

			/*-------------------------------------------------*/

			$('#modal_login_account_status_first_name').val(first_name);
			$('#modal_login_account_status_last_name').val(last_name);
			$('#modal_login_account_status_email').val(email);

			$('#modal_login_account_status_client_dn_in_ami').val(client_dn_in_ami);
			$('#modal_login_account_status_client_dn_in_session').val(client_dn_in_session);

			/*-------------------------------------------------*/

			var icon;

			if(valid === '0') {
				var wrn_msg = '';

				if(cert_enable && client_dn_in_ami && issuer_dn_in_ami) {

					if(!client_dn_in_session
					   ||
					   !issuer_dn_in_session
					 ) {
						wrn_msg = 'You should provide a certificate to use this AMI web application.';
					} else {

						if(client_dn_in_ami !== client_dn_in_session
						   ||
						   issuer_dn_in_ami !== issuer_dn_in_session
						 ) {
							wrn_msg = 'The certificate in your session is not the one registered in AMI.';
						}
					}
				}

				icon = '';

				$('#modal_login_account_status_status').html(
					'<span style="color: #006400;">valid</span>'
				);

				amiLogin._showInfoMessage4(wrn_msg);

			} else {
				var err_msg = '';

				if(voms_enable) {

					if(!client_dn_in_ami
					   ||
					   !issuer_dn_in_ami
					 ) {
						err_msg = 'Register a valid GRID certificate.';
					}
					else {
						err_msg = 'Check your VOMS roles.';
					}
				} else {
					err_msg = 'Contact the AMI team.';
				}

				icon = '<a href="javascript:amiLogin.accountStatus();" class="faa-burst animated" style="color: red;">'
				       +
				       '<span class="fa fa-exclamation-triangle"></span>'
				       +
				       '</a>'
				;

				$('#modal_login_account_status_status').html(
					'<span style="color: #8B0000;">invalid</span>'
				);

				amiLogin._showErrorMessage4(err_msg);
			}

			/*-------------------------------------------------*/

			$('#form_login_change_info input[name=firstName]').val(first_name);
			$('#form_login_change_info input[name=lastName]').val(last_name);
			$('#form_login_change_info input[name=email]').val(email);

			/*-------------------------------------------------*/

			$('#form_login_change_info input[name=email]').prop(
				'disabled', valid === '0' && voms_enable !== 'false'
			);

			/*-------------------------------------------------*/

			var dict = {
				USER: user,
				ICON: icon,
			};

			/*-------------------------------------------------*/

			amiWebApp.replaceHTML('ami_login_content', amiLogin.fragmentLogoutButton, {dict: dict});
			amiWebApp.onLogin();
			self.is_connected = true;

		} else {
			self.is_connected = false;
			amiWebApp.onLogout();
			amiWebApp.replaceHTML('ami_login_content', amiLogin.fragmentLoginButton, {dict: null});
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiLogin = new AMILogin();

/*-------------------------------------------------------------------------*/
