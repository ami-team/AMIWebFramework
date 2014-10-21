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

	this.already_started = false;

	/*-----------------------------------------------------------------*/

	this.start = function(userdata) {

		if(!this.already_started) {

			amiWebApp.loadHTML('html/AMI/AMILogin.html').done(function(data1) {
				amiWebApp.loadHTML('html/AMI/Fragment/login_button.html').done(function(data2) {
					amiWebApp.loadHTML('html/AMI/Fragment/logout_button.html').done(function(data3) {
						/*-------------------------*/

						amiWebApp.appendHTML('ami_modal_content', data1);

						amiLogin.fragmentLoginButton = data2;
						amiLogin.fragmentLogoutButton = data3;

						/*-------------------------*/

						amiWebApp.loadHTML('html/AMI/AMILoginChangeInfo.html').done(function(data) {
							amiWebApp.appendHTML('ami_modal_content', data);
						});

						amiWebApp.loadHTML('html/AMI/AMILoginChangePass.html').done(function(data) {
							amiWebApp.appendHTML('ami_modal_content', data);
						});

						amiWebApp.loadHTML('html/AMI/AMILoginAccountStatus.html').done(function(data) {
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
							amiLogin.guest = amiWebApp.jspath('..field{.@name==="guest_user"}.$', data)[0];

							var result = amiWebApp.onReady(userdata);

							if(result && result.done) {
								result.done(function() {
									amiLogin._update(data, user);
								});
							} else {
								amiLogin._update(data, user);
							}

						}).fail(function(data) {
							amiLogin.guest = amiWebApp.jspath('..field{.@name==="guest_user"}.$', data)[0];

							var result = amiWebApp.onReady(userdata);

							if(result && result.done) {
								result.done(function() {
									amiLogin._update(data, amiLogin.guest);
								});
							} else {
								amiLogin._update(data, amiLogin.guest);
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
				});
			} else {
				amiWebApp.onLogin();
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
		$('#modal_login_message .alert').fadeOut(10000);
	};

	this._showErrorMessage1 = function(message) {
		amiWebApp.replaceHTML('modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(10000);
	};

	this._showErrorMessage2 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(10000);
	};

	/*-----------------------------------------------------------------*/

	this._showSuccessMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(10000);
	};

	this._showErrorMessage3 = function(message) {
		amiWebApp.replaceHTML('modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(10000);
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

		if(user !== amiLogin.guest) {
			/*-------------------------------------------------*/

			var valid = amiWebApp.jspath('..field{.@name==="valid"}.$', data)[0];

			var cert_enable = amiWebApp.jspath('..field{.@name==="cert_enable"}.$', data)[0];
			var voms_enable = amiWebApp.jspath('..field{.@name==="voms_enable"}.$', data)[0];

			/*-------------------------------------------------*/

			var first_name = amiWebApp.jspath('..field{.@name==="first_name"}.$', data)[0];
			var last_name = amiWebApp.jspath('..field{.@name==="last_name"}.$', data)[0];
			var email = amiWebApp.jspath('..field{.@name==="email"}.$', data)[0];

			/*-------------------------------------------------*/

			var dn_in_ami = amiWebApp.jspath('..field{.@name==="dn_in_ami"}.$', data)[0];
			var dn_in_session = amiWebApp.jspath('..field{.@name==="dn_in_session"}.$', data)[0];
			var issuer_in_ami = amiWebApp.jspath('..field{.@name==="issuer_in_ami"}.$', data)[0];
			var issuer_in_session = amiWebApp.jspath('..field{.@name==="issuer_in_session"}.$', data)[0];

			/*-------------------------------------------------*/

			$('#modal_login_account_status_first_name').val(first_name);
			$('#modal_login_account_status_last_name').val(last_name);
			$('#modal_login_account_status_email').val(email);

			$('#modal_login_account_status_dn_in_ami').val(dn_in_ami);
			$('#modal_login_account_status_dn_in_session').val(dn_in_session);

			/*-------------------------------------------------*/

			var icon;

			if(valid === '0') {
				var wrn_msg = '';

				if(cert_enable !== 'false' && dn_in_ami !== undefined && issuer_in_ami !== undefined) {

					if(dn_in_session === undefined
					   ||
					   issuer_in_session === undefined
					 ) {
						wrn_msg = 'You should provide a certificate to use this AMI web application.';
					} else {

						if(dn_in_ami !== dn_in_session
						   ||
						   issuer_in_ami !== issuer_in_session
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

				if(voms_enable !== 'false') {

					if(dn_in_ami === undefined
					   ||
					   issuer_in_ami === undefined
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

		} else {
			amiWebApp.replaceHTML('ami_login_content', amiLogin.fragmentLoginButton);
			amiWebApp.onLogout();
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
