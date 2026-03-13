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
import * as tools from './utilities/tools';
import * as controls from './utilities/controls';

import * as AMIObject from './AMIObject';

import amiCommand from './AMICommand';
import {$AMINamespace} from './AMIObject';

/*--------------------------------------------------------------------------------------------------------------------*/

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
					ctxOptions[key] = val;
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

export default function()
{
	$AMINamespace('ami.native', {});

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ami.IControl                                                                                                   */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The AMI control interface
	 * @interface ami.native.IControl
	 */

	window.ami.native.IControl = class IControl
	{
		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when the control is ready to run
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onReady() {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when the control is removed
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onRemove() {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Patches an HTML identifier
		 * @param {string} id the not patched HTML identifier
		 * @returns {string} The patched HTML identifier
		 */

		patchId(id) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Puts an HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
		 * @param {string} selector the target selector
		 * @param {string} [twig={}] the TWIG fragment
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
		 * @returns {$.Promise} A JQuery promise object
		 */

		replaceHTML(selector, twig, options) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Prepends an HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
		 * @param {string} selector the target selector
		 * @param {string} [twig={}] the TWIG fragment
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
		 * @returns {$.Promise} A JQuery promise object
		 */

		prependHTML(selector, twig, options) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Appends an HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}
		 * @param {string} selector the target selector
		 * @param {string} [twig={}] the TWIG fragment
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, dict, twigs)
		 * @returns {$.Promise} A JQuery promise object
		 */

		appendHTML(selector, twig, options) {}

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The AMI container interface
	 * @interface ami.IContainer
	 */

	window.ami.native.IContainer = class IContainer
	{
		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * @param {string} selector the selector
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (...)
		 * @return {$.Promise} A JQuery promise object
		 */

		render(selector, options) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Prepends an item
		 * @param {string} title the title
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (...)
		 * @return {$.Promise} A JQuery promise object returning the new item's identifier
		 */

		prependItem(title, options) {}

		/**
		 * Appends an item
		 * @param {string} title the title
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (...)
		 * @return {$.Promise} A JQuery promise object returning the new item's identifier
		 */

		appendItem(title, options) {}

		/**
		 * Removes an item
		 * @param {string} itemId the item identifier
		 */

		removeItem(itemId) {}

		/**
		 * Removes all items
		 */

		removeAllItems() {}

		/**
		 * Checks whether the container is empty or not
		 * @returns {boolean}
		 */

		isEmpty() {}

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ami.Control                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The basic AMI control
	 * @class ami.Control
	 * @implements {ami.IControl}
	 * @param {?*} parent the parent entity
	 * @param {?*} owner the owner entity
	 */

	console.log('🚀 [Control.js] DÉBUT DU CHARGEMENT DU FICHIER');

	window.ami = window.ami || {};
	window.ami.native = window.ami.native || {};

	console.log('✅ [Control.js] Namespace window.ami.native créé/vérifié');

	window.ami.native.Control = class Control
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* PROPRIÉTÉ STATIQUE */
		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Initialisation statique (remplace $())
		 */
		static _instanceScopeCnt = 1;

		/*------------------------------------------------------------------------------------------------------------*/
		/* CONSTRUCTEUR (remplace $init) */
		/*------------------------------------------------------------------------------------------------------------*/

		constructor(parent, owner)
		{
			console.log('🏗️ [Control] Construction d\'une nouvelle instance');
			console.log('   └─ parent:', parent);
			console.log('   └─ owner:', owner);

			this.ctxImmutables = {};
			this.ctxDefaults = {};
			this.ctxOptions = {};
			this.ctx = {};

			this._parent = parent || this;
			this._owner = owner || this;

			this._twigDict = {};

			this._instanceScope = Control._instanceScopeCnt++;

			console.log('   └─ _instanceScope:', this._instanceScope);
			console.log('✅ [Control] Instance créée avec succès');
		}

		/*------------------------------------------------------------------------------------------------------------*/

		onReady() {
			console.log('📢 [Control] onReady() appelé pour instance', this._instanceScope);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		onRemove() {
			console.log('🗑️ [Control] onRemove() appelé pour instance', this._instanceScope);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		setParent(parent)
		{
			console.log('👨‍👦 [Control] setParent:', parent);
			return this._parent = parent || this;
		}

		getParent()
		{
			return this._parent;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		setOwner(owner)
		{
			console.log('👤 [Control] setOwner:', owner);
			return this._owner = owner || this;
		}

		getOwner()
		{
			return this._owner;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		setSelector(selector)
		{
			console.log('🎯 [Control] setSelector:', selector);

			if(selector)
			{
				$(selector).off('remove').on('remove', () => {
					this.onRemove();
				});
			}

			return this._selector = selector || '';
		}

		getSelector()
		{
			return this._selector;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Sets up the control's context
		 * @param {Object<string, *>} immutables dictionary of immutable parameters in the control's context
		 * @param {Object<string, *>} defaults dictionary of default values for optional parameters
		 * @param {Object<string, *>} options dictionary of values for optional parameters
		 * @return {Object<string, *>} The resulting control's context
		 */

		setupCtx(immutables, defaults, options)
		{
			console.log('⚙️ [Control] setupCtx appelé');
			return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		patchId(id)
		{
			return `${id}_scope${this._instanceScope}`;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		replaceHTML(selector, twig, options)
		{
			console.log('🔄 [Control] replaceHTML:', selector);

			if(!tools.isMap(options))
			{
				options = {};
			}

			if(!tools.isMap(options['dict']))
			{
				options['dict'] = {};
			}

			Object.assign(options['dict'], this._twigDict);

			options.scope = this._instanceScope;

			return view.replaceHTML(selector, twig, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		prependHTML(selector, twig, options)
		{
			console.log('➕ [Control] prependHTML:', selector);

			if(!tools.isMap(options))
			{
				options = {};
			}

			if(!tools.isMap(options['dict']))
			{
				options['dict'] = {};
			}

			Object.assign(options['dict'], this._twigDict);

			options.scope = this._instanceScope;

			return view.prependHTML(selector, twig, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		appendHTML(selector, twig, options)
		{
			console.log('➕ [Control] appendHTML:', selector);

			if(!tools.isMap(options))
			{
				options = {};
			}

			if(!tools.isMap(options['dict']))
			{
				options['dict'] = {};
			}

			Object.assign(options['dict'], this._twigDict);

			options.scope = this._instanceScope;

			return view.appendHTML(selector, twig, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} params the control's parameters
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControl(parent, control, params, options)
		{
			console.log('🎨 [Control] createControl appelé:', control);
			return controls.createControl(parent, this, control, params, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in the body
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} controlParams the control's render method mandatory parameters
		 * @param {Object<string, *>} controlOptions the control's render method optional parameters
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlInBody(parent, control, controlParams, controlOptions, options)
		{
			console.log('🎨 [Control] createControlInBody appelé:', control);
			return controls.createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in a container
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} controlParams the control's render method mandatory parameters
		 * @param {Object<string, *>} controlOptions the control's render method optional parameters
		 * @param {string} icon the icon
		 * @param {string} title the title
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlInContainer(parent, control, controlParams, controlOptions, icon, title, options)
		{
			console.log('🎨 [Control] createControlInContainer appelé:', control);
			return controls.createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in a container from a WEB link
		 * @param {?*} parent the parent entity
		 * @param {Element} el the HTML element
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlFromWebLink(parent, el, options)
		{
			console.log('🔗 [Control] createControlFromWebLink appelé');
			return controls.createControlFromWebLink(parent, this, el, this.ctx, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/
	};

	console.log('✅ [Control.js] Classe Control définie');
	console.log('   └─ Type:', typeof window.ami.native.Control);
	console.log('   └─ Est une fonction?', typeof window.ami.native.Control === 'function');
	console.log('   └─ Prototype existe?', !!window.ami.native.Control.prototype);
	console.log('   └─ Compteur statique:', window.ami.native.Control._instanceScopeCnt);
	console.log('🏁 [Control.js] FIN DU CHARGEMENT DU FICHIER');

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ami.ISubApp                                                                                                    */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The AMI sub-application interface
	 * @interface ami.ISubApp
	 */

	window.ami.native.ISubApp = class ISubApp
	{
		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when the sub-application is ready to run
		 * @param {?*} userdata the user data
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onReady(userdata) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when the sub-application is about to exit
		 * @param {?*} userdata the user data
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onExit(userdata) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when logging in
		 * @param {?*} userdata the user data
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onLogin(userdata) {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Called when logging out
		 * @param {?*} userdata the user data
		 * @return {$.Promise|$.Deferred|undefined} A JQuery promise object, deferred object or nothing
		 */

		onLogout(userdata) {}

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ami.SubApp                                                                                                     */
	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * The basic AMI sub-application
	 * @class ami.SubApp
	 * @implements {ami.ISubApp}
	 */

	window.ami.native.SubApp = class SubApp
	{
		/*------------------------------------------------------------------------------------------------------------*/

		/*$implements: [ami.ISubApp],

		/*------------------------------------------------------------------------------------------------------------*/

		$init()
		{
			this.ctxImmutables = {};
			this.ctxDefaults = {};
			this.ctxOptions = {};
			this.ctx = {};
		}

		/*------------------------------------------------------------------------------------------------------------*/

		onReady() {}

		/*------------------------------------------------------------------------------------------------------------*/

		onExit() {}

		/*------------------------------------------------------------------------------------------------------------*/

		onLogin() {}

		/*------------------------------------------------------------------------------------------------------------*/

		onLogout() {}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Sets up the application's context
		 * @param {Object<string, *>} immutables dictionary of immutable parameters in the application's context
		 * @param {Object<string, *>} defaults dictionary of default values for optional parameters
		 * @param {Object<string, *>} options dictionary of values for optional parameters
		 * @return {Object<string, *>} The resulting application's context
		 */

		setupCtx(immutables, defaults, options)
		{
			return _setupCtx(this.ctxImmutables, this.ctxDefaults, this.ctxOptions, this.ctx, immutables, defaults, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} params the control's parameters
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControl(parent, control, params, options)
		{
			return controls.createControl(parent, this, control, params, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in the body
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} controlParams the control's render method mandatory parameters
		 * @param {Object<string, *>} controlOptions the control's render method optional parameters
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlInBody(parent, control, controlParams, controlOptions, options)
		{
			return controls.createControlInBody(parent, this, control, controlParams, controlOptions, this.ctx, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in a container
		 * @param {?*} parent the parent entity
		 * @param {string} control the control name
		 * @param {Array<*>} controlParams the control's render method mandatory parameters
		 * @param {Object<string, *>} controlOptions the control's render method optional parameters
		 * @param {string} icon the icon
		 * @param {string} title the title
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlInContainer(parent, control, controlParams, controlOptions, icon, title, options)
		{
			return controls.createControlInContainer(parent, this, control, controlParams, controlOptions, this.ctx, icon, title, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		/**
		 * Asynchronously creates a control in a container from a WEB link
		 * @param {?*} parent the parent entity
		 * @param {Element} el the HTML element
		 * @param {Object<string, *>} [options={}] dictionary of optional parameters (context, cache)
		 * @returns {$.Promise} A JQuery promise object
		 */

		createControlFromWebLink(parent, el, options)
		{
			return controls.createControlFromWebLink(parent, this, el, this.ctx, options);
		}

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
