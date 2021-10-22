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

'use strict';

import { $AMIInterface, $AMIClass } from './AMIObject';

/*--------------------------------------------------------------------------------------------------------------------*/

const ami = {};

if(typeof window !== 'undefined')
{
	window.ami = ami;
}

export default ami;

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami.ISubApp                                                                                                        */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is ready to run
	 * @param {?} userdata userdata
	 */

	onReady: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is about to exit
	 * @param {?} userdata userdata
	 */

	onExit: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging in
	 * @param {?} userdata userdata
	 */

	onLogin: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging out
	 * @param {?} userdata userdata
	 */

	onLogout: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami.SubApp                                                                                                         */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The basic AMI sub-application
 * @class ami.SubApp
 * @implements {ami.ISubApp}
 */

$AMIClass('ami.SubApp', /** @lends ami.SubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*----------------------------------------------------------------------------------------------------------------*/

	ctxDefaults: {},
	ctxOptionals: {},
	ctxSettings: {},
	ctx: {},

	setupCtx: function(defaults, optionals, settings)
	{
		return amiWebApp.setupCtx(this.ctxDefaults, this.ctxOptionals, this.ctxSettings, this.ctx, defaults, optionals, settings);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
