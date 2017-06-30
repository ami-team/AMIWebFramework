/*!
 * AMI Web Framework - AMIInterface.js
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami.IControl                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami/IControl
 */

$AMIInterface('ami.IControl', /** @lends ami/IControl# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Patch an HTML identifier
	  * @param {String} id the unpatched HTML identifier
	  * @returns {String} The patched HTML identifier
	  */

	patchId: function(id) {},

	/*-----------------------------------------------------------------*/

	/**
	  * Put a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function(selector, twig, settings) {},

	/*-----------------------------------------------------------------*/
});

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

	onReady: function() {},

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
