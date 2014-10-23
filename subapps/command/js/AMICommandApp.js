/*!
 * AMICommandApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* INTERNAL FUNCTIONS                                                      */
/*-------------------------------------------------------------------------*/

function _safe_for_html(s) {
	return s.replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/*-------------------------------------------------------------------------*/
/* CLASS AMICommandApp                                                     */
/*-------------------------------------------------------------------------*/

function AMICommandApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		amiWebApp.loadSheets([
			'subapps/command/css/AMICommandApp.css',
		]);

		$('#ami_jumbotron_title').html('Command Line');
		$('#ami_jumbotron_content').html('Execute AMI commands');
		$('#ami_breadcrumb_content').html('<li><a href="">Tools</a></li><li><a href="">Command Line</a></li>');

		var result = $.Deferred();

		amiWebApp.loadHTML('subapps/command/html/AMICommandApp.html', {context: this}).done(function(data1) {
			amiWebApp.loadHTML('subapps/command/html/Fragment/command.html', {context: this}).done(function(data2) {
				amiWebApp.loadHTML('subapps/command/html/Fragment/result.html', {context: this}).done(function(data3) {

					amiWebApp.replaceHTML('ami_main_content', data1);

					this.fragmentCommand = data2;
					this.fragmentResult = data3;

					result.resolve();
				});
			});
		});

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.onLogin = function() {

		amiCommand.execute('ListCommands', {context: this}).done(function(data) {

			var rows = amiWebApp.jspath('..row', data);

			var dict = [];

			$.each(rows, function(index, row) {

				var command = amiWebApp.jspath('..field{.@name==="command"}.$', row)[0];
				var shortHelp = amiWebApp.jspath('..field{.@name==="shortHelp"}.$', row)[0];
				var prototype = amiWebApp.jspath('..field{.@name==="prototype"}.$', row)[0];

				if(command.length > 3)
				{
					command = command.substring(3);
				}

				shortHelp = shortHelp.replace(new RegExp(command, 'g'), '<kbd>' + command + '</kbd>');

				shortHelp = shortHelp !== 'TO DO' ? _safe_for_html(shortHelp) : '?????';
				prototype = prototype !== 'TO DO' ? _safe_for_html(prototype) : command;

				dict.push({
					COMMAND: command,
					SHORTHELP: shortHelp,
					PROTOTYPE: prototype,
				});
			});

			amiWebApp.replaceHTML('ami_command_list', this.fragmentCommand, {dict: dict});

		}).fail(function(data) {
			amiWebApp.error(JSPath.apply('..error.$', data)[0]);
		});
	};

	/*-----------------------------------------------------------------*/

	this.onLogout = function() {
	};

	/*-----------------------------------------------------------------*/

	this.onSessionExpired = function() {
	};

	/*-----------------------------------------------------------------*/

	this._insertResult = function(code) {

		var tmp = [];
	
		for(var i = 0; i < code.split('\n').length; i++) {
			tmp.push(i);
		}
	
		var nums = tmp.join('\n');
	
		var dict = {
			DATA: '<code class="left">' + nums + '</code>'
			      +
			      '<code class="right">' + code + '</code>'
		};

		amiWebApp.prependHTML('ami_command_content', this.fragmentResult, {dict: dict});
	};

	/*-----------------------------------------------------------------*/

	this.formExecute = function() {

		amiWebApp.lock();

		var command = $('#modal_command_command').val();
		var converter = $('#modal_command_converter').val();

		amiCommand.execute(command, {context: this, converter: converter}).done(function(data) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : _safe_for_html(data));
			amiWebApp.unlock();

		}).fail(function(data) {

			this._insertResult(converter === 'AMIXmlToJson.xsl' ? JSON.stringify(data, undefined, 2) : _safe_for_html(data));
			amiWebApp.unlock();
		});
	};

	/*-----------------------------------------------------------------*/

	this.select = function(command) {

		$('#modal_command_command').val(command)
	};

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiCommandApp = new AMICommandApp();

/*-------------------------------------------------------------------------*/
