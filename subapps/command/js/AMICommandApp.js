/*!
 * AMICommandApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMICommandApp                                                     */
/*-------------------------------------------------------------------------*/

function AMICommandApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function() {

		$('#ami_jumbotron_title').html('Command Line');
		$('#ami_jumbotron_content').html('Execute AMI commandes');
		$('#ami_breadcrumb_content').html('<li><a href="">Tools</a></li><li><a href="">Command Line</a></li>');

		amiWebApp.loadHTML('subapps/command/html/AMICommandApp.html').done(function(data1) {
			amiWebApp.loadHTML('subapps/command/html/Fragment/result.html').done(function(data2) {

				amiWebApp.replaceHTML('ami_main_content', data1);

				amiWebApp.fragmentResult = data2;
			});
		});
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this._insertResult = function(data) {

		var dict = {
			DATA: data
		};

		amiWebApp.prependHTML('ami_command_content', amiWebApp.fragmentResult, {dict: dict});
	};

	/*-----------------------------------------------------------------*/

	this.form_execute = function() {

		var command = $('#modal_command_command').val();
		var converter = $('#modal_command_converter').val();

		amiCommand.execute(command, {context: this, converter: converter}).done(function(data) {

			this._insertResult(JSON.stringify(data));

		}).fail(function(data) {

			this._insertResult(JSON.stringify(data));
		});
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommandApp = new AMICommandApp();

/*-------------------------------------------------------------------------*/

