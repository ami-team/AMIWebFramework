/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import twigAdminDashboardApp from './assets/twig/AdminDashboardApp.twig';

import * as home from './home';
import * as config from './config';
import * as pages from './pages';
import * as roles from './roles';
import * as commands from './commands';
import * as users from './users';
import * as catalogs from './catalogs';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('AdminDashboardApp', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		const dict = {};

		/**/ if(userdata === 'config') {
			this.subsubapp = config;
			dict.mode = 'config';
		}
		else if(userdata === 'pages') {
			this.subsubapp = pages;
			dict.mode = 'pages';
		}
		else if(userdata === 'roles') {
			this.subsubapp = roles;
			dict.mode = 'roles';
		}
		else if(userdata === 'commands') {
			this.subsubapp = commands;
			dict.mode = 'commands';
		}
		else if(userdata === 'users') {
			this.subsubapp = users;
			dict.mode = 'users';
		}
		else if(userdata === 'catalogs') {
			this.subsubapp = catalogs;
			dict.mode = 'catalogs';
		}
		else {
			this.subsubapp = home;
			dict.mode = 'home';
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.replaceHTML('#ami_main_content', twigAdminDashboardApp, {dict: dict}).done(() => {

			this.subsubapp.init().done(() => {

				result.resolve();

			}).fail((message) => {

				result.reject(message);
			});
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
		if(this.subsubapp.onExit)
		{
			return this.subsubapp.onExit();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		if(amiAuth.hasRole('AMI_ADMIN'))
		{
			amiWebApp.flush();

			$('#B8DD5CD8_7D69_2D12_033A_A7BB834F88D0 .nav-link').prop('disabled', false);
			$('#BCCE2136_3695_AB6F_4F08_3BD3C9035287').show();

			if(this.subsubapp.onLogin)
			{
				return this.subsubapp.onLogin();
			}
		}
		else
		{
			return this.onLogout();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		$('#B8DD5CD8_7D69_2D12_033A_A7BB834F88D0 .nav-link').prop('disabled', true);
		$('#BCCE2136_3695_AB6F_4F08_3BD3C9035287').hide();

		if(this.subsubapp.onLogout)
		{
			return this.subsubapp.onLogout();
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	findNewCommands: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Are you sure?'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FindNewCommands').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushCommandCache: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Are you sure?'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushCommandCache').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushServerCachesSlow: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Are you sure?'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushServerCaches -full').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	flushServerCachesFast: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(!confirm('Are you sure?'))
		{
			return;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		amiWebApp.lock();

		amiCommand.execute('FlushServerCaches').done((data, message) => {

			amiWebApp.success(message, true);

		}).fail((data, message) => {

			amiWebApp.error(message, true);
		});

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.adminDashboardApp = new AdminDashboardApp();

/*--------------------------------------------------------------------------------------------------------------------*/
