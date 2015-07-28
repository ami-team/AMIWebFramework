/*!
 * amiLogin
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _ami_internal_always(deferred, func) {

	if(deferred && deferred.always) {
		deferred.always(function() {
			func();
		});
	} else {
		func();
	}
}

/*-------------------------------------------------------------------------*/
/* amiLogin                                                                */
/*-------------------------------------------------------------------------*/

var amiLogin = {
	/*-----------------------------------------------------------------*/

	user: 'guest',
	guest: 'guest',

	isConnected: false,

	/*-----------------------------------------------------------------*/

	roles: {},

	/*-----------------------------------------------------------------*/

	runSubApp: function(userdata) {

		amiWebApp.lock();

		if($('#modal_login').length === 0) {

			amiWebApp.loadHTMLs([
				'html/AMI/Fragment/login_button.html',
				'html/AMI/Fragment/logout_button.html',
				'html/AMI/Modal/login.html',
				'html/AMI/Modal/login_change_info.html',
				'html/AMI/Modal/login_change_pass.html',
				'html/AMI/Modal/login_account_status.html',
			]).done(function(data) {
				/*-----------------------------------------*/

				amiLogin.fragmentLoginButton = data[0];
				amiLogin.fragmentLogoutButton = data[1];

				amiWebApp.appendHTML('#ami_modal_content', data[2]);
				amiWebApp.appendHTML('#ami_modal_content', data[3]);
				amiWebApp.appendHTML('#ami_modal_content', data[4]);
				amiWebApp.appendHTML('#ami_modal_content', data[5]);

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

				amiCommand.certLogin().always(function(data, user, guest) {

					_ami_internal_always(
						amiWebApp.onReady(userdata),
						function() {
							amiLogin._update(data, user, guest).always(function() {
								amiWebApp.unlock();
							});
						}
					);
				});

				/*-----------------------------------------*/
			}).fail(function(data) {
				amiWebApp.error(data);
			});

		} else {

			_ami_internal_always(
				amiWebApp.onReady(userdata),
				function() {
					_ami_internal_always(
						amiWebApp.onLogin(),
						function() {
							amiWebApp.unlock();
						}
					);
				}
			);
		}
	},

	/*-----------------------------------------------------------------*/

	login: function() {

		amiLogin._clean();

		$('#modal_login_message').empty();

		$('#modal_login').modal('show');
	},

	/*-----------------------------------------------------------------*/

	changeInfo: function() {

		amiLogin._clean();

		$('#modal_login_change_info_message').empty();

		$('#modal_login_change_info').modal('show');
	},

	/*-----------------------------------------------------------------*/

	changePass: function() {

		amiLogin._clean();

		$('#modal_login_change_pass_message').empty();

		$('#modal_login_change_pass').modal('show');
	},

	/*-----------------------------------------------------------------*/

	accountStatus: function() {

		$('#modal_login_account_status').modal('show');
	},

	/*-----------------------------------------------------------------*/

	logout: function() {

		amiWebApp.lock();

		return amiCommand.logout().always(function(data, user, guest) {

			amiLogin._update(data, user, guest).always(function() {

				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	form_passLogin: function() {

		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

		if(user === ''
		   ||
		   pass === ''
		 ) {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		amiWebApp.lock();

		amiCommand.passLogin(user, pass).done(function(data, user, guest) {

			if(user === guest) {
				amiLogin._showErrorMessage1('Invalid identifiers.');
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});

		}).fail(function(data, user, guest) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	form_certLogin: function() {

		amiWebApp.lock();

		amiCommand.certLogin().done(function(data, user, guest) {

			if(user === guest) {

				var client_dn_in_session = amiWebApp.jspath('..field{.@name==="clientDNInSession"}.$', data)[0];
				var issuer_dn_in_session = amiWebApp.jspath('..field{.@name==="issuerDNInSession"}.$', data)[0];

				if(client_dn_in_session) {
					client_dn_in_session = '<br />Presented client DN: ' + client_dn_in_session;
				}

				if(issuer_dn_in_session) {
					issuer_dn_in_session = '<br />Presented issuer DN: ' + issuer_dn_in_session;
				}

				amiLogin._showErrorMessage1('You have to provide your certificate registered in AMI.' + client_dn_in_session + issuer_dn_in_session);
			} else {
				$('#modal_login').modal('hide');
			}

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});

		}).fail(function(data, user, guest) {
			amiLogin._showErrorMessage1(amiWebApp.jspath('..error.$', data)[0]);

			amiLogin._update(data, user, guest).always(function() {
				amiWebApp.unlock();
			});
		});
	},

	/*-----------------------------------------------------------------*/

	form_attachCert: function() {

		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

		if(user === ''
		   ||
		   pass === ''
		 ) {
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

	form_detachCert: function() {

		var user = $('#modal_login_form1_user').val();
		var pass = $('#modal_login_form1_pass').val();

		if(user === ''
		   ||
		   pass === ''
		 ) {
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

	form_addUser: function() {

		var firstName = $('#modal_login_form2_first_name').val();
		var lastName = $('#modal_login_form2_last_name').val();
		var email = $('#modal_login_form2_email').val();
		var user = $('#modal_login_form2_user').val();
		var pass1 = $('#modal_login_form2_pass1').val();
		var pass2 = $('#modal_login_form2_pass2').val();

		if(firstName === ''
		   ||
		   lastName === ''
		   ||
		   email === ''
		   ||
		   user === ''
		   ||
		   pass1 === ''
		   ||
		   pass2 === ''
		 ) {
			amiLogin._showErrorMessage1('Please, fill all fields with a red star.');

			return;
		}

		if(pass1 !== pass2) {
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

	form_changeInfo: function() {

		var firstName = $('#modal_login_change_info_form_first_name').val();
		var lastName = $('#modal_login_change_info_form_last_name').val();
		var email = $('#modal_login_change_info_form_email').val();

		if(firstName === ''
		   ||
		   lastName === ''
		   ||
		   email === ''
		 ) {
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

	form_changePass: function() {

		var old_pass = $('#modal_login_change_pass_form_old_pass').val();
		var new_pass1 = $('#modal_login_change_pass_form_new_pass1').val();
		var new_pass2 = $('#modal_login_change_pass_form_new_pass2').val();

		if(old_pass === ''
		   ||
		   new_pass1 === ''
		   ||
		   new_pass2 === ''
		 ) {
			amiLogin._showErrorMessage3('Please, fill all fields with a red star.');

			return;
		}

		if(new_pass1 !== new_pass2) {
			amiLogin._showErrorMessage3('Password1 and Password2 have to be identical.');

			return;
		}

		amiWebApp.lock();

		amiCommand.changePass(old_pass, new_pass1).done(function(data) {
			amiLogin._showSuccessMessage3('Done with success.');

		}).fail(function(data) {
			amiLogin._showErrorMessage3(amiWebApp.jspath('..error.$', data)[0]);

		}).always(function() {
			amiLogin._clean();
			amiWebApp.unlock();
		});
	},

	/*-----------------------------------------------------------------*/

	form_resetPass: function() {

		var user = $('#modal_login_form3_user').val();

		if(user === '') {
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

	hasRole: function(roleName) {

		return roleName in amiLogin.roles;
	},

	/*-----------------------------------------------------------------*/

	hasRoleForEntity: function(roleName, project, process, entity) {

		if(roleName in amiLogin.roles) {

			for(var role in amiLogin.roles[roleName]) {

				if(role['project'] === project
				   &&
				   role['process'] === process
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

	hasRoleForRow: function(roleName, project, process, entity, row) {

		if(roleName in amiLogin.roles) {

			for(var role in amiLogin.roles[roleName]) {

				if(role['project'] === project
				   &&
				   role['process'] === process
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

	_clean: function(message) {

		$('#modal_login_form1_pass').val('');

		$('#modal_login_form2_pass1').val('');
		$('#modal_login_form2_pass2').val('');

		$('#modal_login_change_pass_form_old_pass' ).val('');
		$('#modal_login_change_pass_form_new_pass1').val('');
		$('#modal_login_change_pass_form_new_pass2').val('');
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage1: function(message) {
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(45000);
	},

	_showErrorMessage1: function(message) {
		amiWebApp.replaceHTML('#modal_login_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage2: function(message) {
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(45000);
	},

	_showErrorMessage2: function(message) {
		amiWebApp.replaceHTML('#modal_login_change_info_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_info_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showSuccessMessage3: function(message) {
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentSuccess, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(45000);
	},

	_showErrorMessage3: function(message) {
		amiWebApp.replaceHTML('#modal_login_change_pass_message', amiWebApp.fragmentError, {dict: {MESSAGE: message}});
		$('#modal_login_change_pass_message .alert').fadeOut(45000);
	},

	/*-----------------------------------------------------------------*/

	_showInfoMessage4: function(message) {

		if(message) {
			message = '<span class="fa fa-exclamation-triangle" style="color: orange;"></span> ' + message;
		}

		amiWebApp.replaceHTML('#modal_login_account_status_message', message);
	},

	_showErrorMessage4: function(message) {

		if(message) {
			message = '<span class="fa fa-exclamation-triangle" style="color: red;"></span> ' + message;
		}

		amiWebApp.replaceHTML('#modal_login_account_status_message', message);
	},

	/*-----------------------------------------------------------------*/

	_update: function(data, user, guest) {
		/*---------------------------------------------------------*/

		amiLogin._clean();

		/*---------------------------------------------------------*/

		amiLogin.user = user;
		amiLogin.guest = guest;

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
			var row = amiWebApp.jspath('..field{.@name==="row"}.$', role_rows[i])[0];

			if(!(name in amiLogin.roles)) {
				amiLogin.roles[name] = [];
			}

			amiLogin.roles[name].push({
				project: project,
				process: process,
				entity: entity,
				row: row,
			});
		}

		/*---------------------------------------------------------*/

		var result = $.Deferred();

		/*---------------------------------------------------------*/

		if(user !== guest) {
			/*-------------------------------------------------*/

			var valid = amiWebApp.jspath('..field{.@name==="valid"}.$', user_rows)[0];

			var cert_enabled = amiWebApp.jspath('..field{.@name==="certEnabled"}.$', user_rows)[0];
			var voms_enabled = amiWebApp.jspath('..field{.@name==="vomsEnabled"}.$', user_rows)[0];

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

			$('#modal_login_account_status_form2_first_name').val(first_name);
			$('#modal_login_account_status_form2_last_name').val(last_name);
			$('#modal_login_account_status_form2_email').val(email);

			$('#modal_login_account_status_form2_client_dn_in_ami').val(client_dn_in_ami);
			$('#modal_login_account_status_form2_client_dn_in_session').val(client_dn_in_session);

			/*-------------------------------------------------*/

			var color = '';
			var message = '';

			if(valid !== 'false') {

				if(cert_enabled !== 'false' && client_dn_in_ami && issuer_dn_in_ami) {

					if(!client_dn_in_session
					   ||
					   !issuer_dn_in_session
					 ) {
						message = 'You should provide a certificate to use this AMI web application.';
					} else {

						if(client_dn_in_ami !== client_dn_in_session
						   ||
						   issuer_dn_in_ami !== issuer_dn_in_session
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

			} else {

				if(voms_enabled !== 'false') {

					if(!client_dn_in_ami
					   ||
					   !issuer_dn_in_ami
					 ) {
						message = 'Register a valid GRID certificate.';
					}
					else {
						message = 'Check your VOMS roles.';
					}
				} else {
					message = 'Contact the AMI team.';
				}

				$('#modal_login_account_status_form1_status').html(
					'<span style="color: #8B0000;">invalid</span>'
				);

				amiLogin._showErrorMessage4(message);

				color = 'red';
			}

			/*-------------------------------------------------*/

			var icon;

			if(message) {
				icon = '<a href="javascript:amiLogin.accountStatus();" class="faa-burst animated" style="color: ' + color + ';">'
				       +
				       '<span class="fa fa-exclamation-triangle"></span>'
				       +
				       '</a>'
				;
			} else {
				icon = '';
			}

			/*-------------------------------------------------*/

			$('#modal_login_change_info_form_first_name').val(first_name);
			$('#modal_login_change_info_form_last_name').val(last_name);
			$('#modal_login_change_info_form_email').val(email);

			/*-------------------------------------------------*/

			$('#modal_login_change_info_form_email').prop('disabled', voms_enabled !== 'false');

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
					amiLogin.isConnected = true;
					result.resolve();
				}
			);

		} else {

			_ami_internal_always(
				amiWebApp.onLogout(),
				function() {
					result.resolve();
					amiLogin.isConnected = false;
					amiWebApp.replaceHTML('#ami_login_content', amiLogin.fragmentLoginButton, {dict: null});
				}
			);
		}

		/*---------------------------------------------------------*/

		return result;

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
