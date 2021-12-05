/*--------------------------------------------------------------------------------------------------------------------*/

import * as AMIObject from './src/js/AMIObject';

import amiCommand from './src/js/AMICommand';
import amiWebApp from './src/js/AMIWebApp';
import amiAuth from './src/js/AMIAuth';
import amiDoc from './src/js/AMIDoc';

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
