/*!
 * AMI Web Framework - AMIRouter.js
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

/**
 * The AMI url routing subsystem
 * @namespace amiRouter
 */

$AMINamespace('amiRouter', /** @lends amiRouter */ {
	/*-----------------------------------------------------------------*/

	_scriptURL: '',
	_originURL: '',
	_webAppURL: '',

	_hash: '',
	_args: [],
	_routes: [],

	/*-----------------------------------------------------------------*/

	$: function()
	{
		/*---------------------------------------------------------*/

		const  href  = window.location. href .trim();
		const  hash  = window.location. hash .trim();
		const search = window.location.search.trim();

		/*---------------------------------------------------------*/

		const scripts = document.getElementsByTagName('script');

		alert(typeof scripts);

		/*---------------------------------------------------------*/
		/* SCRIPT_URL AND ORIGIN_URL                               */
		/*---------------------------------------------------------*/

		for(let idx, i = 0; i < scripts.length; i++)
		{
			idx = scripts[i].src.indexOf('js/ami.');

			if(idx > 0)
			{
				this._scriptURL = scripts[i].src;

				this._originURL = this._eatSlashes(
					this._scriptURL.substring(0, idx)
				);

				break;
			}
		}

		/*---------------------------------------------------------*/
		/* WEBAPP_URL                                              */
		/*---------------------------------------------------------*/

		this._webAppURL = this._eatSlashes(
			href.replace(/(?:\#|\?).*$/, '')
		);

		/*---------------------------------------------------------*/
		/* HASH                                                    */
		/*---------------------------------------------------------*/

		this._hash = this._eatSlashes(
			hash.substring(1).replace(/\?.*$/, '')
		);

		/*---------------------------------------------------------*/
		/* ARGS                                                    */
		/*---------------------------------------------------------*/

		this._args.length = 0;
		this._routes.length = 0;

		if(search)
		{
			search.substring(1).split('&').forEach((param) => {

				const parts = param.split('=');

				/**/ if(parts.length === 1)
				{
					this._args[decodeURIComponent(parts[0])] = /*---------*/''/*---------*/;
				}
				else if(parts.length === 2)
				{
					this._args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
			});
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	_eatSlashes: function(url)
	{
		url = url.trim();

		while(url[url.length - 1] === '/')
		{
			url = url.substring(0, url.length - 1);
		}

		return url;
	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	/**
	  * Get the AWF's script URL
	  * @returns {String} The AWF's script URL
	  */

	getScriptURL: function()
	{
		return this._scriptURL;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the origin URL
	  * @returns {String} The origin URL
	  */

	getOriginURL: function()
	{
		return this._originURL;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the webapp URL
	  * @returns {String} The webapp URL
	  */

	getWebAppURL: function()
	{
		return this._webAppURL;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the anchor part of the webapp URL
	  * @returns {String} The anchor part of the webapp URL
	  */

	getHash: function()
	{
		return this._hash;
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Get the arguments extracted from the webapp URL
	  * @returns {Array<String>} The arguments extracted from the webapp URL
	  */

	getArgs: function()
	{
		return this._args;
	},

	/*-----------------------------------------------------------------*/
	/*-----------------------------------------------------------------*/

	add: function(regExp, handler)
	{
		this._routes.push({
			regExp: regExp,
			handler: handler,
		});

		return this;
	},

	/*-----------------------------------------------------------------*/

	remove: function(regExp)
	{
		for(let i = 0; i < this._routes.length; i++)
		{
			if(this._routes[i].regExp.toString() === regExp.toString())
			{
				this._routes.splice(i, 1);

				break;
			}
		}

		return this;
	},

	/*-----------------------------------------------------------------*/

	check: function()
	{
		let m;

		for(let i = 0; i < this._routes.length; i++)
		{
			m = this._hash.match(this._routes[i].regExp);

			if(m)
			{
				this._routes[i].handler.apply(amiRouter, m);

				return true;
			}
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	navigate: function(path)
	{
		if(history.pushState)
		{
			history.pushState(null, null, this._webAppURL + this._eatSlashes(path));

			return true;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
