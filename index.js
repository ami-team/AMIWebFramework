/*--------------------------------------------------------------------------------------------------------------------*/

import {$AMIClass, $AMINamespace, $AMIInterface} from './src/core/AMIObject';

/**/

import amiCommand from './src/core/AMICommand';
import amiWebApp from './src/core/AMIWebApp';
import amiAuth from './src/core/AMIAuth';
import amiDoc from './src/core/AMIDoc';

/**/

import './src/core/AMIInterface';

/*--------------------------------------------------------------------------------------------------------------------*/

window.$AMIClass = $AMIClass;
window.$AMINamespace = $AMINamespace;
window.$AMIInterface = $AMIInterface;

/**/

window.amiCommand = amiCommand;
window.amiWebApp = amiWebApp;
window.amiLogin = amiAuth;
window.amiAuth = amiAuth;
window.amiDoc = amiDoc;

/*--------------------------------------------------------------------------------------------------------------------*/
