/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('ResetPasswordApp', {
	/*-----------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/ResetPassword/twig/ResetPasswordApp.twig'
		], {context: this}).done(function(data) {

			var dict;

			try
			{
				dict = JSON.parse(amiWebApp.base64Decode(userdata));
			}
			catch(e)
			{
				dict = /*-----------------*/{}/*-----------------*/;
			}

			amiWebApp.replaceHTML('#ami_main_content', data[0], {dict: dict, context: this}).done(function() {

			$('#F956453E_2AB6_9397_4976_A11EE21B8FAB,#EB5C35F7_F6E0_9B1E_E356_9FB235003814').change(() => {

					const pass1 = $('#F956453E_2AB6_9397_4976_A11EE21B8FAB').val();
					const pass2 = $('#EB5C35F7_F6E0_9B1E_E356_9FB235003814').val();

					$('#EB5C35F7_F6E0_9B1E_E356_9FB235003814').get(0).setCustomValidity(
						pass1.length > 0 && pass2.length > 0 && pass1 !== pass2 ? 'Passwords don\'t match.' : ''
					);
				});

				$('#C12ED50C_4BF7_DAD3_C698_DE0DCBB3228C').submit(function(e) {

						e.preventDefault();
	
						resetPasswordApp.change(
							$('#A5A54104_A082_094F_F88C_10333C985981').val(),
							$('#F6520017_DBEB_C555_6D06_0E50AA50C43C').val(),
							$('#F956453E_2AB6_9397_4976_A11EE21B8FAB').val()
						);
				});

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	change: function(user, oldPass, newPass)
	{
		amiWebApp.lock();

		amiCommand.changePass(user, oldPass, newPass).then((data, message) => {

			amiWebApp.success(message);

		}, (data, message) => {

			amiWebApp.error(message);
		});
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var resetPasswordApp = new ResetPasswordApp();

/*-------------------------------------------------------------------------*/
