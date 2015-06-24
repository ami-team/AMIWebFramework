/*!
 * AMIConfigurationApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMIConfigurationApp                                               */
/*-------------------------------------------------------------------------*/

function AMIConfigurationApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		var result = $.Deferred();

		$('#ami_jumbotron_title').html('Configuration');
		$('#ami_jumbotron_content').html('Server configuration');
		$('#ami_breadcrumb_content').html('<li><a>Admin</a></li><li><a href="' + amiWebApp.webappURL + '?subapp=amiconfiguration">Configuration</a></li>');

		amiWebApp.loadHTML('subapps/Configuration/html/AMIConfigurationApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/Configuration/html/Fragment/parameter.html', {context: this}).done(function(data2) {

				amiWebApp.replaceHTML('ami_main_content', data1, {context: this}).done(function() {

					this.fragmentParameter = data2;

					$('#ami_configuration_left_div').hide();
					$('#ami_configuration_right_div').hide();

					result.resolve();
				});
			}).fail(function() {
				result.reject();
			});
		}).fail(function() {
			result.reject();
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {

		$('#ami_configuration_form4 .ami-custom').empty();

		amiCommand.execute('GetConfig', {context: this}).done(function(data) {

			var fields = amiWebApp.jspath('..rowset{.@type==="config"}.row.field', data);

			var dict = [];

			$.foreach(fields, function(index, field) {

				var name = field['@name'] || '';
				var value = field[(('$'))] || '';

				var input = $('#ami_configuration_forms_' + name);

				if(input.length === 0) {

					var id = 'ami_configuration_forms_' + name;

					dict.push({
						ID: id,
						NAME: name,
						VALUE: value,
					});

				} else {
					input.val(value);
				}
			});

			amiWebApp.appendHTML('ami_configuration_form4 .custom', this.fragmentParameter, {dict: dict});

			$('#ami_configuration_left_div').show();
			$('#ami_configuration_right_div').show();

		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	
		$('#ami_configuration_left_div').hide();
		$('#ami_configuration_right_div').hide();
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this.reset = function() {
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		this.onLogin();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this._apply = function() {

		var params = $('#ami_configuration_right_div').serializeArray();

		$.each(params, function(index, value) {


			console.debug(value);
		});
	};

	/*-----------------------------------------------------------------*/

	this._reboot = function() {



	};

	/*-----------------------------------------------------------------*/

	this.apply = function() {
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		this._apply();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.applyAndRestart = function() {
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		this._apply().done(function() {
		});

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.testEmail = function() {

		amiCommand.execute('TestEmail -from="ami@in2p3.fr" -to="' + $('#ami_configuration_forms_test_email').val() + '"').done(function(data) {
			amiWebApp.success(amiWebApp.jspath('..info.$', data)[0]);
		}).fail(function(data) {
			amiWebApp.error(amiWebApp.jspath('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.addParameter = function() {

		var name = prompt('Parameter name:') || '';

		name = name.trim();

		if(name !== '') {

			if($('input[id="ami_configuration_forms_' + name + '"]').length === 0) {

				var id = 'ami_configuration_forms_' + name;

				var dict = {
					ID: id,
					NAME: name,
					VALUE: '',
				};

				amiWebApp.prependHTML('ami_configuration_form4 .custom', this.fragmentParameter, {dict: dict});

			} else {
				amiWebApp.error('Duplicate field.');
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.delParameter = function(name) {
		/*---------------------------------------------------------*/

		if(confirm('Please confirm...') == false) {
			return;
		}

		/*---------------------------------------------------------*/

		var input = $('input[id="ami_configuration_forms_' + name + '"]');

		input.parent().parent().remove();

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiConfigurationApp = new AMIConfigurationApp();

amiWebApp.registerSubApp(amiConfigurationApp, 'amiconfiguration', {});

/*-------------------------------------------------------------------------*/
