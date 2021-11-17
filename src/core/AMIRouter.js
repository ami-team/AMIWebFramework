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

/*--------------------------------------------------------------------------------------------------------------------*/

// noinspection JSUnusedGlobalSymbols
/**
 * The AMI url routing subsystem
 * @namespace amiRouter
 */

class AMIRouter
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	#webAppURL = '';
	#webAppArgs = {};
	#webAppHash = '';

	#scriptURL = '';
	#scriptArgs = {};
	#scriptHash = '';

	/*----------------------------------------------------------------------------------------------------------------*/

	#originURL = '';

	/*----------------------------------------------------------------------------------------------------------------*/

	#routes = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	constructor(prodJsFilename, devJsFilename)
    {
        /*------------------------------------------------------------------------------------------------------------*/

		const webappUrl = new URL(window.location);

		const scriptUrl = this._findThisJs(prodJsFilename, devJsFilename);

		if(!scriptUrl)
		{
			throw `cannot find neither '${prodJsFilename}' nor '${devJsFilename}'`;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.#webAppURL = webappUrl.protocol === 'file:' ? `file://${webappUrl.pathname}`
		                                                 : `${webappUrl.origin}${webappUrl.pathname}`
		;
		this.#webAppArgs = this._parseSearchString(webappUrl.search);
		this.#webAppHash = webappUrl.hash.substring(1);

		this.#scriptURL = scriptUrl.protocol === 'file:' ? `file://${scriptUrl.pathname}`
		                                                 : `${scriptUrl.origin}${scriptUrl.pathname}`
		;
		this.#scriptArgs = this._parseSearchString(scriptUrl.search);
		this.#scriptHash = scriptUrl.hash.substring(1);

		/*------------------------------------------------------------------------------------------------------------*/

		let idx;

		/**/ if((idx = this.#scriptURL.indexOf(prodJsFilename)) > 0) {
			this.#originURL = this._eatSlashes(this.#scriptURL.substring(0, idx));
		}
		else if((idx = this.#scriptURL.indexOf(devJsFilename)) > 0) {
			this.#originURL = this._eatSlashes(this.#scriptURL.substring(0, idx));
		}

		/*------------------------------------------------------------------------------------------------------------*/
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	_findThisJs(prodJsFilename, devJsFilename)
	{
		const scripts = document.getElementsByTagName('script');

		for(let i = 0; i < scripts.length; i++)
		{
			const url = new URL(scripts[i].src);

			if(url.pathname.endsWith(prodJsFilename) > 0
			   ||
			   url.pathname.endsWith(devJsFilename) > 0
			 ) {
				return url;
			}
		}

		return null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseSearchString(search)
	{
		const result = {};

		search.substring(1).split('&').forEach((param) => {

			const parts = param.split('=');

			/**/ if(parts.length === 1)
			{
				result[decodeURIComponent(parts[0]).toLowerCase()] = /*--------*/ '' /*--------*/;
			}
			else if(parts.length === 2)
			{
				result[decodeURIComponent(parts[0]).toLowerCase()] = decodeURIComponent(parts[1]);
			}
		});

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

    _eatSlashes(url)
    {
        url = url.trim();

        while(url[url.length - 1] === '/')
        {
            url = url.substring(0, url.length - 1);
        }

        return url;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Gets the webapp URL
     * @returns {string} The webapp URL
     */

    getWebAppURL()
    {
        return this.#webAppURL;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Gets the arguments of the webapp URL
     * @returns {Object<string, string>} The arguments of the webapp URL
     */

    getWebAppArgs()
    {
        return this.#webAppArgs;
    }

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the anchor part of the webapp URL
	 * @returns {string} The anchor part of the webapp URL
	 */

	getWebAppHash()
	{
		return this.#webAppHash;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the script URL
	 * @returns {string} The script URL
	 */

	getScriptURL()
	{
		return this.#scriptURL;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the arguments of the script URL
	 * @returns {Object<string, string>} The arguments of the the script URL
	 */

	getScriptArgs()
	{
		return this.#scriptArgs;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets anchor part of the script URL
	 * @returns {string} The anchor part of the script URL
	 */

	getWebappHash()
	{
		return this.#scriptHash;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Gets the origin URL
	 * @returns {string} The origin URL
	 */

	getOriginURL()
	{
		return this.#originURL;
	}

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Appends a routing rule
     * @param {string} regExp the regExp
     * @param {function} callback the callback
     * @returns {AMIRouter} The amiRouter singleton
     */

    append(regExp, callback)
    {
        this.#routes.unshift({
            regExp: regExp,
			callback: callback,
        });

        return this;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Removes a routing rule
     * @param {string} regExp the regExp
     * @returns {AMIRouter} The amiRouter singleton
     */

    remove(regExp)
    {
        this.#routes = this.#routes.filter((route) => {

            return route.regExp.toString() !== regExp.toString();
        });

        return this;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Checks whether the URL matches with a routing rule
     * @returns {boolean}
     */

    check()
    {
        let m;

        for(let i = 0; i < this.#routes.length; i++)
        {
            m = this.#webAppHash.match(this.#routes[i].regExp);

            if(m)
            {
                this.#routes[i].callback.apply(this, m);

                return true;
            }
        }

        return false;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Appends a new history entry
     * @param {string} path the new path
     * @param {Object<string, *>} [context=null] the new context
     * @returns {boolean}
     */

    appendHistoryEntry(path, context = null)
    {
        if(history.pushState)
        {
            history.pushState(context, null, this.#webAppURL + this._eatSlashes(path));

            return true;
        }

        return false;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Replaces the current history entry
     * @param {string} path the new path
     * @param {Object<string, *>} [context=null] the new context
     * @returns {boolean}
     */

    replaceHistoryEntry(path, context = null)
    {
        if(history.replaceState)
        {
            history.replaceState(context, null, this.#webAppURL + this._eatSlashes(path));

            return true;
        }

        return false;
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default new AMIRouter('js/ami.min.js', 'js/ami.js');

/*--------------------------------------------------------------------------------------------------------------------*/
