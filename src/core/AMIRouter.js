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

/**
 * The AMI url routing subsystem
 * @namespace amiRouter
 */

class AMIRouter
{
	/*----------------------------------------------------------------------------------------------------------------*/
	/* PRIVATE MEMBERS                                                                                                */
	/*----------------------------------------------------------------------------------------------------------------*/

	#scriptURL = '';
	#originURL = '';
	#webAppURL = '';

	#hash = '';
	#args = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	#routes = [];

	/*----------------------------------------------------------------------------------------------------------------*/

	constructor()
    {
        /*------------------------------------------------------------------------------------------------------------*/

        this.#args.length = 0;
        this.#routes.length = 0;

        /*------------------------------------------------------------------------------------------------------------*/

        const  href  = window.location. href .trim();
        const  hash  = window.location. hash .trim();
        const search = window.location.search.trim();

        /*------------------------------------------------------------------------------------------------------------*/

        const scripts = document.getElementsByTagName('script');

        /*------------------------------------------------------------------------------------------------------------*/
        /* SCRIPT_URL AND ORIGIN_URL                                                                                  */
        /*------------------------------------------------------------------------------------------------------------*/

        for(let idx, i = 0; i < scripts.length; i++)
        {
            idx = scripts[i].src.indexOf('js/ami.');

            if(idx > 0)
            {
                this.#scriptURL = scripts[i].src;

                this.#originURL = this._eatSlashes(
                    this.#scriptURL.substring(0, idx)
                );

				break;
            }
        }

        /*------------------------------------------------------------------------------------------------------------*/
        /* WEBAPP_URL                                                                                                 */
        /*------------------------------------------------------------------------------------------------------------*/

        this.#webAppURL = this._eatSlashes(
            href.replace(/(?:\#|\?).*$/, '')
        );

        /*------------------------------------------------------------------------------------------------------------*/
        /* HASH                                                                                                       */
        /*------------------------------------------------------------------------------------------------------------*/

        this.#hash = this._eatSlashes(
            hash.substring(1).replace(/\?.*$/, '')
        );

        /*------------------------------------------------------------------------------------------------------------*/
        /* ARGS                                                                                                       */
        /*------------------------------------------------------------------------------------------------------------*/

        if(search)
        {
            search.substring(1).split('&').forEach((param) => {

                const parts = param.split('=');

                /**/ if(parts.length === 1)
                {
                    this.#args[decodeURIComponent(parts[0])] = /*--------*/ '' /*--------*/;
                }
                else if(parts.length === 2)
                {
                    this.#args[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
            });
        }

        /*------------------------------------------------------------------------------------------------------------*/
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
     * Gets the AWF's script URL
     * @returns {string} The AWF's script URL
     */

    getScriptURL()
    {
        return this.#scriptURL;
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
     * Gets the webapp URL
     * @returns {string} The webapp URL
     */

    getWebAppURL()
    {
        return this.#webAppURL;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Gets the anchor part of the webapp URL
     * @returns {string} The anchor part of the webapp URL
     */

    getHash()
    {
        return this.#hash;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Gets the arguments extracted from the webapp URL
     * @returns {Object<string, string>} The arguments extracted from the webapp URL
     */

    getArgs()
    {
        return this.#args;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

	/* !!! A VERIFIER LE TYPE DE `handler` !!! */

    /**
     * Appends a routing rule
     * @param {string} regExp the regExp
     * @param {Object} handler the handler
     * @returns {AMIRouter} The amiRouter singleton
     */

    append(regExp, handler)
    {
        this.#routes.unshift({
            regExp: regExp,
            handler: handler,
        });

        return this;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Removes some routing rules
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
            m = this.#hash.match(this.#routes[i].regExp);

            if(m)
            {
                this.#routes[i].handler.apply(amiRouter, m);

                return true;
            }
        }

        return false;
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    /**
     * Append a new history entry
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
     * Replace the current history entry
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

const amiRouter = new AMIRouter();

if(typeof window !== 'undefined')
{
    window.amiRouter = amiRouter;
}

export default amiRouter;

/*--------------------------------------------------------------------------------------------------------------------*/
