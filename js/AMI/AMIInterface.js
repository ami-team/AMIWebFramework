/*!
 * AMI Web Framework - AMIInterface.js
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3
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
	/*---------------------------------------------------------------------*/

	/**
	  * Patches an HTML identifier
	  * @param {String} id the unpatched HTML identifier
	  * @returns {String} The patched HTML identifier
	  */

	patchId: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	replaceHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	prependHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	  * @param {String} selector the target selector
	  * @param {String} twig the TWIG fragment
	  * @param {Object} [settings] dictionary of settings (context, dict)
	  * @returns {$.Deferred} A JQuery deferred object
	  */

	appendHTML: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when the control is ready to run
	  */

	onReady: function() {},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* ami.ISubApp                                                             */
/*-------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*---------------------------------------------------------------------*/

	/**
	  * Called when the sub-application is ready to run
	  * @param {?} userdata userdata
	  */

	onReady: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when the sub-application is about to exit
	  * @param {?} userdata userdata
	  */

	onExit: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when logging in
	  * @param {?} userdata userdata
	  */

	onLogin: function() {},

	/*---------------------------------------------------------------------*/

	/**
	  * Called when logging out
	  * @param {?} userdata userdata
	  */

	onLogout: function() {},

	/*---------------------------------------------------------------------*/
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
	/*---------------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*---------------------------------------------------------------------*/

	$: function()
	{
		ami.Control.instanceCnt = 1;
	},

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this._parent = parent || this;
		this._owner = owner || this;

		this.instanceSuffix = ami.Control.instanceCnt++;
	},

	/*---------------------------------------------------------------------*/

	setParent: function(parent)
	{
		return this._parent = (parent || this);
	},

	getParent: function()
	{
		return this._parent;
	},

	/*---------------------------------------------------------------------*/

	setOwner: function(owner)
	{
		return this._owner = (owner || this);
	},

	getOwner: function()
	{
		return this._owner;
	},

	/*---------------------------------------------------------------------*/

	patchId: function(identifier)
	{
		return identifier + '_instance' + this.instanceSuffix;
	},

	/*---------------------------------------------------------------------*/

	replaceHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.replaceHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	prependHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.prependHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	appendHTML: function(selector, twig, settings)
	{
		if(!settings)
		{
			settings = {};
		}

		settings.suffix = this.instanceSuffix;

		return amiWebApp.appendHTML(selector, twig, settings);
	},

	/*---------------------------------------------------------------------*/

	createControl: function(parent, control, params, settings)
	{
		return amiWebApp.createControl(parent, this, control, params, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlInBody: function(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings)
	{
		return amiWebApp.createControlInBody(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlInContainer: function(parent, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings)
	{
		return amiWebApp.createControlInContainer(parent, this, control, controlParamsWithoutSettings, controlSettings, parentSettings, icon, title, settings);
	},

	/*---------------------------------------------------------------------*/

	createControlFromWebLink: function(parent, el, parentSettings, settings)
	{
		return amiWebApp.createControlFromWebLink(parent, this, el, parentSettings, settings);
	},

	/*---------------------------------------------------------------------*/
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
	/*---------------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*---------------------------------------------------------------------*/

	onExit: function() {},

	/*---------------------------------------------------------------------*/

	onLogin: function() {},

	/*---------------------------------------------------------------------*/

	onLogout: function() {},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
