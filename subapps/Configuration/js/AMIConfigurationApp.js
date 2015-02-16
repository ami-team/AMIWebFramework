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
		$('#ami_breadcrumb_content').html('<li><a href="">Tools</a></li><li><a href="">Configuration</a></li>');

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

		amiCommand.execute('ShowConfig', {context: this}).done(function(data) {

			var fields = amiWebApp.jspath('..rowset{.@type==="config"}.row.field', data);

			var dict = [];

			$.arrayFor(fields, function(index, field) {

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

			amiWebApp.prependHTML('ami_configuration_form4 .ami-callout', this.fragmentParameter, {dict: dict});

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

		if(confirm('Do you want to cancel modifications?')) {

			$('#ami_configuration_form4 .ami-callout').empty();

			this.onLogin();
		}
	};

	/*-----------------------------------------------------------------*/

	this.apply = function() {

		if(confirm('Do you want to apply modifications?')) {

		}
	};

	/*-----------------------------------------------------------------*/

	this.applyAndRestart = function() {

		if(confirm('Do you want to apply modifications?')) {

		}
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

				amiWebApp.prependHTML('ami_configuration_form4 .ami-callout', this.fragmentParameter, {dict: dict});

			} else {
				amiWebApp.error('Duplicate field.');
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.delParameter = function(name) {

		if(confirm('Do you want to delete parameter `' + name + '`?')) {

			var input = $('input[id="ami_configuration_forms_' + name + '"]');

			input.parent().parent().remove();
		}
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiConfigurationApp = new AMIConfigurationApp();

/*-------------------------------------------------------------------------*/
