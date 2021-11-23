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
 * @ignore
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
	 * @return {$.Deferred|undefined} A JQuery deferred object or nothing
	 */

	onReady: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is about to exit
	 * @param {?*} userdata the user data
	 * @return {$.Deferred|undefined} A JQuery deferred object or nothing
	 */

	onExit: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging in
	 * @param {?*} userdata the user data
	 * @return {$.Deferred|undefined} A JQuery deferred object or nothing
	 */

	onLogin: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging out
	 * @param {?*} userdata the user data
	 * @return {$.Deferred|undefined} A JQuery deferred object or nothing
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

	ctxImmutables: {},
	ctxDefaults: {},
	ctxOptions: {},
	ctx: {},

	/**
	 * Sets up the application's context
	 * @param {Object<string, *>} immutables
	 * @param {Object<string, *>} defaults
	 * @param {Object<string, *>} options
	 * @return {Object<string, *>} The resulting application's context
	 */

	setupCtx: function(immutables, defaults, options)
	{
		return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
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
