/*!
 * AMIDocumentApp class
 *
 * Copyright (c) 2014 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* CLASS AMIDocumentApp                                                     */
/*-------------------------------------------------------------------------*/

function AMIDocumentApp() {
	/*-----------------------------------------------------------------*/

	this.onReady = function(userdata) {

		if(!userdata) {
			userdata = 'home';
		}

		amiWebApp.loadHTML('subapps/Document/html/AMIDocumentApp.html', {context: this}).done(function(data) {

			amiWebApp.replaceHTML('ami_main_content', data, {context: this}).done(function() {

				$('.jumbotron').hide();

				this.load(userdata);
			});
		});
	};

	/*-----------------------------------------------------------------*/

	this.onExit = function() {
		$('.jumbotron').show();
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

	this.load = function(page) {

		var url = window.location.pathname.split('/')[0] + '/pages/' + page + '.html';

		$.ajax({
			url: url,
			cache: false,
			dataType: 'html',
			context: this,
		}).done(function(data) {

			$('#ami_jumbotron_title').html('');
			$('#ami_jumbotron_content').html('');
			$('#ami_breadcrumb_content').html('<li><a href="">Documents</a></li><li><a href="">' + page + '</a></li>');

			$('#ami_document_content').html(data);

		}).fail(function() {

			if(page !== '404') {
				this.load('404');
			}
		});
	};

	/*-----------------------------------------------------------------*/

};

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

amiDocumentApp = new AMIDocumentApp();

/*-------------------------------------------------------------------------*/
