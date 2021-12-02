/*--------------------------------------------------------------------------------------------------------------------*/

import * as AMIObject from './src/core/AMIObject';

import amiCommand from './src/core/AMICommand';
import amiWebApp from './src/core/AMIWebApp';
import amiAuth from './src/core/AMIAuth';
import amiDoc from './src/core/AMIDoc';

/*--------------------------------------------------------------------------------------------------------------------*/

window.$AMIClass     = AMIObject.$AMIClass    ;
window.$AMINamespace = AMIObject.$AMINamespace;
window.$AMIInterface = AMIObject.$AMIInterface;

window.amiCommand = amiCommand;
window.amiWebApp = amiWebApp;
window.amiLogin = amiAuth;
window.amiAuth = amiAuth;
window.amiDoc = amiDoc;

/*--------------------------------------------------------------------------------------------------------------------*/
