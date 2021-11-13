/*--------------------------------------------------------------------------------------------------------------------*/

import {$AMIClass, $AMINamespace, $AMIInterface} from './src/core/AMIObject';
import amiInterface from './src/core/AMIInterface';
import amiCommand from './src/core/AMICommand';
import amiWebApp from './src/core/AMIWebApp';
import amiAuth from './src/core/AMIAuth';
import amiDoc from './src/core/AMIDoc';

/*--------------------------------------------------------------------------------------------------------------------*/

window.$AMIClass = $AMIClass;
window.$AMINamespace = $AMINamespace;
window.$AMIInterface = $AMIInterface;

window.amiInterface = amiInterface;
window.amiCommand = amiCommand;
window.amiWebApp = amiWebApp;
window.amiAuth = amiAuth;
window.amiDoc = amiDoc;

/*--------------------------------------------------------------------------------------------------------------------*/
