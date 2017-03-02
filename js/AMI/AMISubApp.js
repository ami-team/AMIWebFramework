/*!
 * AMI Web Framework - AMISubApp
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami.ISubApp                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami/ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami/ISubApp# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function(/* userdata */) {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  */

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging in
	  */

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging out
	  */

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
