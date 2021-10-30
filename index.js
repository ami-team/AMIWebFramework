/*--------------------------------------------------------------------------------------------------------------------*/

import { $this, $AMIClass, $AMINamespace, $AMIInterface } from './src/core/AMIObject';
import amiInterface from './src/core/AMIInterface';
import amiCommand from './src/core/AMICommand';
import amiWebApp from './src/core/AMIWebApp';
import amiAuth from './src/core/AMIAuth';
import amiDoc from './src/core/AMIDoc';

/*--------------------------------------------------------------------------------------------------------------------*/

$this.$AMIClass = $AMIClass;
$this.$AMINamespace = $AMINamespace;
$this.$AMIInterface = $AMIInterface;

$this.amiInterface = amiInterface;
$this.amiCommand = amiCommand;
$this.amiWebApp = amiWebApp;
$this.amiAuth = amiAuth;
$this.amiDoc = amiDoc;

/*--------------------------------------------------------------------------------------------------------------------*/
