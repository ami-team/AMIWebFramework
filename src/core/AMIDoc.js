/*!
 * AMI Web Framework - AMIDoc.js
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

/* eslint-disable */

export default amiDoc = {"classes":[{"name":"AMICommand","desc":"","implements":[],"inherits":[],"konstructor":{"name":"AMICommand","params":[]},"functions":[{"name":"execute","desc":"Executes an AMI command","params":[{"name":"command","type":"String","desc":"the command","default":"","optional":"","nullable":""},{"name":"options","type":"Object","desc":"dictionary of optional parameters (mqtt, endpoint, serverName, converter, extras, params, context, timeout)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"signInByToken","desc":"Sign in by JWT token","params":[{"name":"token","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"serverName","type":"String","desc":"the server name","default":"","optional":"","nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"passLogin","desc":"Logs in by login/password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"detachCert","desc":"Detaches a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}],"variables":[{"name":"certLogin","type":"","desc":"Logs in by certificate"},{"name":"signOut","type":"","desc":"Logs out"},{"name":"attachCert","type":"","desc":"Attaches a certificate"},{"name":"addUser","type":"","desc":"Adds a new user"},{"name":"changeInfo","type":"","desc":"Changes the account information"},{"name":"changePass","type":"","desc":"Changes the account password"},{"name":"resetPass","type":"","desc":"Resets the account password"}]}],"functions":[{"name":"$AMINamespace","desc":"Create a new namespace","params":[{"name":"$name","type":"String","desc":"the namespace name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the namespace body","default":"","optional":true,"nullable":""}]},{"name":"$AMIInterface","desc":"Create a new interface","params":[{"name":"$name","type":"String","desc":"the interface name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the interface body","default":"","optional":true,"nullable":""}]},{"name":"$AMIClass","desc":"Create a new class","params":[{"name":"$name","type":"String","desc":"the class name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the class body","default":"","optional":true,"nullable":""}]}],"namespaces":[{"name":"amiRouter","desc":"The AMI url routing subsystem"}]};

/* eslint-enable */

/*--------------------------------------------------------------------------------------------------------------------*/
