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

$AMINamespace('amiRouter', {
	/*-----------------------------------------------------------------*/

	_mode: '',
	_routes: [],

	/*-----------------------------------------------------------------*/

	_scriptURL: '',
	_originURL: '',
	_webAppURL: '',

	_hash: '',
	_args: [],

	/*-----------------------------------------------------------------*/

	$: function()
	{
		/*---------------------------------------------------------*/

		const  href  = window.location. href .trim();
		const  hash  = window.location. hash .trim();
		const search = window.location.search.trim();

		/*---------------------------------------------------------*/
		/* ORIGIN_URL                                              */
		/*---------------------------------------------------------*/

		const scripts = document.getElementsByTagName('script');

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

	getScriptURL: function()
	{
		return this._scriptURL;
	},

	/*-----------------------------------------------------------------*/

	getOriginURL: function()
	{
		return this._originURL;
	},

	/*-----------------------------------------------------------------*/

	getWebAppURL: function()
	{
		return this._webAppURL;
	},

	/*-----------------------------------------------------------------*/

	getHash: function()
	{
		return this._hash;
	},

	/*-----------------------------------------------------------------*/

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
				m.shift();

				this._routes[i].handler.apply(amiRouter, m);

				break;
			}
		}

		return this;
	},

	/*-----------------------------------------------------------------*/

	navigate: function(path)
	{
		history.pushState(null, null, this._webAppURL + this._eatSlashes(path));

		return this;
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
