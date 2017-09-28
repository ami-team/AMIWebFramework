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
 * @interface ami.IControl
 */

$AMIInterface('ami.IControl', /** @lends ami.IControl */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Patches an HTML identifier
	  * @param {String} id the unpatched HTML identifier
	  * @returns {String} The patched HTML identifier
	  */

	patchId: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the control is ready to run
	  */

	onReady: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.ISubApp                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  * @param {?} userdata userdata
	  */

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging in
	  * @param {?} userdata userdata
	  */

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	/**
	  * Called when logging out
	  * @param {?} userdata userdata
	  */

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.Control                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI control
 * @class ami.Control
 * @implements {ami.IControl}
 */

$AMIClass('ami.Control', /** @lends ami.Control */ {
	/*-----------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*-----------------------------------------------------------------*/

	$: function()
	{
		ami.Control.instanceCnt = 1;
	},

	/*-----------------------------------------------------------------*/

	$init: function(parent)
	{
		this._parent = parent || null;

		this.instanceSuffix = ami.Control.instanceCnt++;
	},

	/*-----------------------------------------------------------------*/

	getParent: function()
	{
		return this._parent;
	},

	/*-----------------------------------------------------------------*/

	patchId: function(identifier)
	{
		return identifier + '_instance' + this.instanceSuffix;
	},

	/*-----------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.SubApp                                                              */
/*-------------------------------------------------------------------------*/

/**
 * The basic AMI sub-application
 * @class ami.SubApp
 * @implements {ami.ISubApp}
 */

$AMIClass('ami.SubApp', /** @lends ami.SubApp */ {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onExit: function() {},

	/*-----------------------------------------------------------------*/

	onLogin: function() {},

	/*-----------------------------------------------------------------*/

	onLogout: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
