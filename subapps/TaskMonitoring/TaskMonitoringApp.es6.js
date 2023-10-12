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

//import './assets/css/app.min.css';

//import './assets/js/app.min.js';
import twigTaskMonitoringApp from './assets/twig/TaskMonitoringApp.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('TaskMonitoringApp', {
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
		return $.Deferred().resolve();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
		this.mount();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
		this.mount();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	mount: function()
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'https://ami-ecosystem.in2p3.fr/task-monitoring/assets/css/app.min.css',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', twigTaskMonitoringApp).done(() => {

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

window.taskMonitoringApp = new TaskMonitoringApp();

/*--------------------------------------------------------------------------------------------------------------------*/
