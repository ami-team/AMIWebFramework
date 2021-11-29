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

import * as view from './utilities/view';
import * as controls from './utilities/controls';

import * as AMIObject from './AMIObject';

import amiCommand from './AMICommand';

/*--------------------------------------------------------------------------------------------------------------------*/

const ami = {};

if(typeof window !== 'undefined')
{
	window.ami = ami;
}

export default ami;

/*----------------------------------------------------------------------------------------------------------------*/

/**
 * @param {Object<string, *>} ctxImmutables
 * @param {Object<string, *>} ctxDefaults
 * @param {Object<string, *>} ctxOptions
 * @param {Object<string, *>} ctx
 * @param {Object<string, *>} immutables
 * @param {Object<string, *>} defaults
 * @param {Object<string, *>} options
 * @returns {Object<string, *>}
 * @private
 */

function _setupCtx(ctxImmutables, ctxDefaults, ctxOptions, ctx, immutables, defaults, options)
{
	/*----------------------------------------------------------------------------------------------------------------*/

	if(options)
	{
		for(let [key, val] of Object.entries(options))
		{
			ctxOptions[key] = val;
			ctx[key] = val;
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(defaults)
	{
		for(let [key, val] of Object.entries(defaults))
		{
			if(!(key in ctx))
			{
				if(key !== 'context')
				{
					ctxDefaults[key] = val;
				}

				ctx[key] = val;
			}
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(immutables)
	{
		for(let [key, val] of Object.entries(immutables))
		{
			ctxImmutables[key] = val;
			ctx[key] = val;
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	ctx.httpEndpoint = amiCommand.getHttpEndpoint();

	ctx.mqttEndpoint = amiCommand.getMqttEndpoint();

	/*----------------------------------------------------------------------------------------------------------------*/

	return ctx;
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami.IControl                                                                                                       */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami.IControl
 */

AMIObject.$AMIInterface('ami.IControl', /** @lends ami.IControl */ {

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the control is ready to run
 	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onReady: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the control is removed
	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onRemove: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Patches an HTML identifier
	 * @param {string} id the not patched HTML identifier
	 * @returns {string} The patched HTML identifier
	 */

	patchId: function(id) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	 * @param {string} selector the target selector
	 * @param {string} [twig={}] the TWIG fragment
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
	 * @returns {$.Promise} A JQuery promise object
	 */

	replaceHTML: function(selector, twig, options) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	 * @param {string} selector the target selector
	 * @param {string} [twig={}] the TWIG fragment
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
	 * @returns {$.Promise} A JQuery promise object
	 */

	prependHTML: function(selector, twig, options) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
	 * @param {string} selector the target selector
	 * @param {string} [twig={}] the TWIG fragment
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
	 * @returns {$.Promise} A JQuery promise object
	 */

	appendHTML: function(selector, twig, options) {},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami.Control                                                                                                        */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The basic AMI control
 * @class ami.Control
 * @implements {ami.IControl}
 * @param {?*} parent the parent entity
 * @param {?*} owner the owner entity
 */

AMIObject.$AMIClass('ami.Control', /** @lends ami.Control */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	$implements: [ami.IControl],

	/*----------------------------------------------------------------------------------------------------------------*/

	$: function()
	{
		ami.Control._instanceScopeCnt = 1;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this._parent = parent || this;
		this._owner = owner || this;

		this._instanceScope = ami.Control._instanceScopeCnt++;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onRemove: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	setParent: function(parent)
	{
		return this._parent = parent || this;
	},

	getParent: function()
	{
		return this._parent;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setOwner: function(owner)
	{
		return this._owner = owner || this;
	},

	getOwner: function()
	{
		return this._owner;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	setSelector: function(selector)
	{
		if(selector)
		{
			$(selector).off('remove').on('remove', () => {

				this.onRemove();
			});
		}

		return this._selector = selector || '';
	},

	getSelector: function()
	{
		return this._selector;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	ctxImmutables: {},
	ctxDefaults: {},
	ctxOptions: {},
	ctx: {},

	/**
	 * Sets up the control's context
	 * @param {Object<string, *>} immutables dictionary of immutable parameters in the control's context
	 * @param {Object<string, *>} defaults dictionary of default values for optional parameters
	 * @param {Object<string, *>} options dictionary of values for optional parameters
	 * @return {Object<string, *>} The resulting control's context
	 */

	setupCtx: function(immutables, defaults, options)
	{
		return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	patchId: function(id)
	{
		return `${id}_scope${this._instanceScope}`;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	replaceHTML: function(selector, twig, options)
	{
		options = options || {};

		options.scope = this._instanceScope;

		return view.replaceHTML(selector, twig, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	prependHTML: function(selector, twig, options)
	{
		options = options || {};

		options.scope = this._instanceScope;

		return view.prependHTML(selector, twig, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	appendHTML: function(selector, twig, options)
	{
		options = options || {};

		options.scope = this._instanceScope;

		return view.appendHTML(selector, twig, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} params the control's parameters
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControl: function(parent, control, params, options)
	{
		return controls.createControl(parent, this, control, params, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in the body
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} controlParams the control's render method mandatory parameters
	 * @param {Object<string, *>} controlOptions the control's render method optional parameters
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlInBody: function(parent, control, controlParams, controlOptions, options)
	{
		return controls.createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in a container
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} controlParams the control's render method mandatory parameters
	 * @param {Object<string, *>} controlOptions the control's render method optional parameters
	 * @param {string} icon the icon
	 * @param {string} title the title
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlInContainer: function(parent, control, controlParams, controlOptions, icon, title, options)
	{
		return controls.createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in a container from a WEB link
	 * @param {?*} parent the parent entity
	 * @param {Element} el the HTML element
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlFromWebLink: function(parent, el, options)
	{
		return controls.createControlFromWebLink(parent, this, el, this.ctx, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* ami.ISubApp                                                                                                        */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * The AMI sub-application interface
 * @interface ami.ISubApp
 */

AMIObject.$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is ready to run
	 * @param {?*} userdata the user data
	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onReady: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is about to exit
	 * @param {?*} userdata the user data
	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onExit: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging in
	 * @param {?*} userdata the user data
	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onLogin: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging out
	 * @param {?*} userdata the user data
	 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
	 */

	onLogout: function(userdata) {},

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

AMIObject.$AMIClass('ami.SubApp', /** @lends ami.SubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function() {},

	/*----------------------------------------------------------------------------------------------------------------*/

	ctxImmutables: {},
	ctxDefaults: {},
	ctxOptions: {},
	ctx: {},

	/**
	 * Sets up the application's context
	 * @param {Object<string, *>} immutables dictionary of immutable parameters in the application's context
	 * @param {Object<string, *>} defaults dictionary of default values for optional parameters
	 * @param {Object<string, *>} options dictionary of values for optional parameters
	 * @return {Object<string, *>} The resulting application's context
	 */

	setupCtx: function(immutables, defaults, options)
	{
		return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} params the control's parameters
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControl: function(parent, control, params, options)
	{
		return controls.createControl(parent, this, control, params, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in the body
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} controlParams the control's render method mandatory parameters
	 * @param {Object<string, *>} controlOptions the control's render method optional parameters
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlInBody: function(parent, control, controlParams, controlOptions, options)
	{
		return controls.createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in a container
	 * @param {?*} parent the parent entity
	 * @param {string} control the control name
	 * @param {Array<*>} controlParams the control's render method mandatory parameters
	 * @param {Object<string, *>} controlOptions the control's render method optional parameters
	 * @param {string} icon the icon
	 * @param {string} title the title
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlInContainer: function(parent, control, controlParams, controlOptions, icon, title, options)
	{
		return controls.createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Asynchronously creates a control in a container from a WEB link
	 * @param {?*} parent the parent entity
	 * @param {Element} el the HTML element
	 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context)
	 * @returns {$.Promise} A JQuery promise object
	 */

	createControlFromWebLink: function(parent, el, options)
	{
		return controls.createControlFromWebLink(parent, this, el, this.ctx, options);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
