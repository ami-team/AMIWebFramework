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
 *
 * @param {Object<string, *>} ctxDefaults
 * @param {Object<string, *>} ctxOptionals
 * @param {Object<string, *>} ctxOptions
 * @param {Object<string, *>} ctx
 * @param {Object<string, *>} defaults
 * @param {Object<string, *>} optionals
 * @param {Object<string, *>} options
 * @returns {Object<string, *>}
 * @private
 */

function _setupCtx(ctxDefaults, ctxOptionals, ctxOptions, ctx, defaults, optionals, options)
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

	if(optionals)
	{
		for(let [key, val] of Object.entries(optionals))
		{
			if(!(key in ctx))
			{
				if(key !== 'context')
				{
					ctxOptionals[key] = val;
				}

				ctx[key] = val;
			}
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	if(defaults)
	{
		for(let [key, val] of Object.entries(defaults))
		{
			ctxDefaults[key] = val;
			ctx[key] = val;
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	ctx.httpEndpoint = amiCommand.getHTTPEndpoint();

	ctx.mqttEndpoint = amiCommand.getMQTTEndpoint();

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

$AMIInterface('ami.ISubApp', /** @lends ami.ISubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is ready to run
	 * @param {?} userdata userdata
	 */

	onReady: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when the sub-application is about to exit
	 * @param {?} userdata userdata
	 */

	onExit: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging in
	 * @param {?} userdata userdata
	 */

	onLogin: function(userdata) {},

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Called when logging out
	 * @param {?} userdata userdata
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

$AMIClass('ami.SubApp', /** @lends ami.SubApp */ {
	/*----------------------------------------------------------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*----------------------------------------------------------------------------------------------------------------*/

	ctxDefaults: {},
	ctxOptionals: {},
	ctxOptions: {},
	ctx: {},

	setupCtx: function(defaults, optionals, settings)
	{
		return _setupCtx(this.ctxDefaults, this.ctxOptionals, this.ctxOptions, this.ctx, defaults, optionals, settings);
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
