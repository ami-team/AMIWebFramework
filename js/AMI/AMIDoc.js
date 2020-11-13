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

const amiDoc = {"functions":[{"name":"$AMINamespace","desc":"Create a new namespace","params":[{"name":"$name","type":"String","desc":"the namespace name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the namespace body","default":"","optional":true,"nullable":""}]},{"name":"$AMIInterface","desc":"Create a new interface","params":[{"name":"$name","type":"String","desc":"the interface name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the interface body","default":"","optional":true,"nullable":""}]},{"name":"$AMIClass","desc":"Create a new class","params":[{"name":"$name","type":"String","desc":"the class name","default":"","optional":"","nullable":""},{"name":"$descr","type":"Object","desc":"the class body","default":"","optional":true,"nullable":""}]}],"namespaces":[{"name":"amiRouter","desc":"The AMI url routing subsystem","functions":[{"name":"getScriptURL","desc":"Gets the AWF's script URL","params":[],"returns":[{"type":"String","desc":"The AWF's script URL"}]},{"name":"getOriginURL","desc":"Gets the origin URL","params":[],"returns":[{"type":"String","desc":"The origin URL"}]},{"name":"getWebAppURL","desc":"Gets the webapp URL","params":[],"returns":[{"type":"String","desc":"The webapp URL"}]},{"name":"getHash","desc":"Gets the anchor part of the webapp URL","params":[],"returns":[{"type":"String","desc":"The anchor part of the webapp URL"}]},{"name":"getArgs","desc":"Gets the arguments extracted from the webapp URL","params":[],"returns":[{"type":"Array.<String>","desc":"The arguments extracted from the webapp URL"}]},{"name":"append","desc":"Appends a routing rule","params":[{"name":"regExp","type":"String","desc":"the regExp","default":"","optional":"","nullable":""},{"name":"handler","type":"Object","desc":"the handler","default":"","optional":"","nullable":""}],"returns":[{"type":"Namespace","desc":"The amiRouter singleton"}]},{"name":"remove","desc":"Removes some routing rules","params":[{"name":"regExp","type":"String","desc":"the regExp","default":"","optional":"","nullable":""}],"returns":[{"type":"Namespace","desc":"The amiRouter singleton"}]},{"name":"check","desc":"Checks whether the URL matches with a routing rule","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"appendHistoryEntry","desc":"Append a new history entry","params":[{"name":"path","type":"String","desc":"the new path","default":"","optional":"","nullable":""},{"name":"context","type":"Object","desc":"the new context","default":"","optional":true,"nullable":""}],"returns":[{"type":"Boolean","desc":""}]},{"name":"replaceHistoryEntry","desc":"Replace the current history entry","params":[{"name":"path","type":"String","desc":"the new path","default":"","optional":"","nullable":""},{"name":"context","type":"Object","desc":"the new context","default":"","optional":true,"nullable":""}],"returns":[{"type":"Boolean","desc":""}]}]},{"name":"amiWebApp","desc":"The AMI webapp subsystem","variables":[{"name":"originURL","type":"String","desc":"The origin URL"},{"name":"webAppURL","type":"String","desc":"The webapp URL"},{"name":"hash","type":"String","desc":"The anchor part of the webapp URL"},{"name":"args","type":"Array.<String>","desc":"The arguments extracted from the webapp URL"}],"functions":[{"name":"isEmbedded","desc":"Checks whether the WebApp is executed in embedded mode","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"isLocal","desc":"Checks whether the WebApp is executed locally (file://, localhost, 127.0.0.1 or ::1)","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"textToHtml","desc":"Escapes the given string from text to HTML","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"htmlToText","desc":"Unescapes the given string from HTML to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"textToString","desc":"Escapes the given string from text to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToText","desc":"Unescapes the given string from JavaScript string to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"htmlToString","desc":"Escapes the given string from HTML to JavaScript string","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"stringToHtml","desc":"Unescapes the given string from JavaScript string to HTML","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"textToSQL","desc":"Escapes the given string from text to SQL","params":[{"name":"string","type":"String","desc":"the unescaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The escaped string"}]},{"name":"sqlToText","desc":"Unescapes the given string from SQL to text","params":[{"name":"string","type":"String","desc":"the escaped string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The unescaped string"}]},{"name":"base64Encode","desc":"Encodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the decoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The encoded string"}]},{"name":"base64Decode","desc":"Decodes (RFC 4648) a string","params":[{"name":"string","type":"String","desc":"the encoded string","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The decoded string"}]},{"name":"loadResources","desc":"Asynchronously loads resources by extension","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSheets","desc":"Asynchronously loads CSS sheets","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadScripts","desc":"Asynchronously loads JS scripts","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadJSONs","desc":"Asynchronously loads JSON files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadXMLs","desc":"Asynchronously loads XML files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadHTMLs","desc":"Asynchronously loads HTML files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTWIGs","desc":"Asynchronously loads TWIG files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadTexts","desc":"Asynchronously loads text files","params":[{"name":"urls","type":["Array","String"],"desc":"the array of urls","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, suffix, dict, twigs)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, suffix, dict, twigs)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, suffix, dict, twigs)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"formatTWIG","desc":"Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}","params":[{"name":"twig","type":"String","desc":"the TWIG string","default":"","optional":"","nullable":""},{"name":"dict","type":["Object","Array"],"desc":"the dictionary","default":"","optional":true,"nullable":""},{"name":"twigs","type":"Object","desc":"dictionary of fragments","default":"","optional":true,"nullable":""}],"returns":[{"type":"String","desc":"The Interpreted TWIG string"}]},{"name":"jspath","desc":"Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}","params":[{"name":"path","type":"String","desc":"the path","default":"","optional":"","nullable":""},{"name":"json","type":"Object","desc":"the JSON","default":"","optional":"","nullable":""}],"returns":[{"type":"Array","desc":"The resulting array"}]},{"name":"lock","desc":"Locks the Web application","params":[]},{"name":"unlock","desc":"Unlocks the Web application","params":[]},{"name":"modalLeave","desc":"Leave the modal window","params":[]},{"name":"modalEnter","desc":"Enter the modal window","params":[]},{"name":"canLeave","desc":"Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"cannotLeave","desc":"Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.","params":[]},{"name":"info","desc":"Shows an 'info' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"success","desc":"Shows a 'success' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"warning","desc":"Shows a 'warning' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"error","desc":"Shows an 'error' message","params":[{"name":"message","type":["String","Array"],"desc":"the message","default":"","optional":"","nullable":""},{"name":"fadeOut","type":"Boolean","desc":"if True, the message disappears after 60s","default":"","optional":true,"nullable":""}]},{"name":"flush","desc":"Flushes messages","params":[]},{"name":"fillBreadcrumb","desc":"Fill the main breadcrumb","params":[{"name":"items","type":"Array","desc":"the array of items (HTML format)","default":"","optional":"","nullable":""}]},{"name":"start","desc":"Starts the Web application","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url, password_authentication_allowed, certificate_authentication_allowed, create_account_allowed, change_info_allowed, change_password_allowed, change_certificate_allowed, bookmarksAllowed)","default":"","optional":true,"nullable":""}]},{"name":"loadControl","desc":"Asynchronously loads a control","params":[{"name":"control","type":"String","desc":"the array of control name","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControl","desc":"Asynchronously create a control","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"params","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlInBody","desc":"Asynchronously create a control in the body","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"paramsWithoutSettings","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"controlSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlInContainer","desc":"Asynchronously create a control in a container","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"control","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"paramsWithoutSettings","type":"Array","desc":"???","default":"","optional":"","nullable":""},{"name":"controlSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"icon","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"title","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"createControlFromWebLink","desc":"Asynchronously create a control in a container from a WEB link","params":[{"name":"parent","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"owner","type":"Object","desc":"???","default":"","optional":true,"nullable":""},{"name":"el","type":"String","desc":"???","default":"","optional":"","nullable":""},{"name":"parentSettings","type":"Object","desc":"???","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSubApp","desc":"Asynchronously loads a subapp","params":[{"name":"subapp","type":"String","desc":"the subapp","default":"","optional":"","nullable":""},{"name":"userdata","type":"?","desc":"the user data","default":"","optional":true,"nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"loadSubAppByURL","desc":"Loads a subapp by URL","params":[{"name":"defaultSubApp","type":"String","desc":"if 'amiWebApp.args[\"subapp\"]' is null, the default subapp","default":"","optional":"","nullable":""},{"name":"defaultUserData","type":"?","desc":"if 'amiWebApp.args[\"userdata\"]' is null, the default user data","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}],"events":[{"name":"onReady","desc":"This method must be overloaded and is called when the Web application starts","params":[{"name":"userData","type":"String","desc":"","default":"","optional":"","nullable":""}]},{"name":"onRefresh","desc":"This method must be overloaded and is called when the toolbar needs to be updated","params":[{"name":"isAuth","type":"Boolean","desc":"","default":"","optional":"","nullable":""}]}]},{"name":"amiCommand","desc":"The AMI command subsystem","variables":[{"name":"endpoint","type":"String","desc":"Default endpoint"},{"name":"converter","type":"String","desc":"Default converter"}],"functions":[{"name":"execute","desc":"Executes an AMI command","params":[{"name":"command","type":"String","desc":"the command","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, endpoint, converter, timeout, extraParam, extraValue)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"passLogin","desc":"Logs in by login/password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"certLogin","desc":"Logs in by certificate","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"logout","desc":"Logs out","params":[{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"attachCert","desc":"Attaches a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"detachCert","desc":"Detaches a certificate","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"addUser","desc":"Adds a new user","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"pass","type":"String","desc":"the password","default":"","optional":"","nullable":""},{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"attach","type":"Boolean","desc":"attach the current certificate","default":"","optional":"","nullable":""},{"name":"agree","type":"Boolean","desc":"agree with the terms and conditions","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changeInfo","desc":"Changes the account information","params":[{"name":"firstName","type":"String","desc":"the first name","default":"","optional":"","nullable":""},{"name":"lastName","type":"String","desc":"the last name","default":"","optional":"","nullable":""},{"name":"email","type":"String","desc":"the email","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"changePass","desc":"Changes the account password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"oldPass","type":"String","desc":"the old password","default":"","optional":"","nullable":""},{"name":"newPass","type":"String","desc":"the new password","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"resetPass","desc":"Resets the account password","params":[{"name":"user","type":"String","desc":"the user","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]}]},{"name":"amiLogin","desc":"The AMI authentication subsystem","functions":[{"name":"getUserInfo","desc":"Gets the user information","params":[],"returns":[{"type":"String","desc":"The current user information"}]},{"name":"getRoleInfo","desc":"Gets the user role information","params":[],"returns":[{"type":"String","desc":"The current role information"}]},{"name":"getBookmarkInfo","desc":"Gets the user bookmark information","params":[],"returns":[{"type":"String","desc":"The current user data protection information"}]},{"name":"getUPDInfo","desc":"Gets the user data protection information","params":[],"returns":[{"type":"String","desc":"The current user data protection information"}]},{"name":"getSSOInfo","desc":"Gets the single sign on information","params":[],"returns":[{"type":"String","desc":"The current single sign on information"}]},{"name":"getUser","desc":"Gets the current user","params":[],"returns":[{"type":"String","desc":"The current user"}]},{"name":"getGuest","desc":"Gets the guest user","params":[],"returns":[{"type":"String","desc":"The guest user"}]},{"name":"getClientDN","desc":"Gets the client DN","params":[],"returns":[{"type":"String","desc":"The client DN"}]},{"name":"getIssuerDN","desc":"Gets the issuer DN","params":[],"returns":[{"type":"String","desc":"The issuer DN"}]},{"name":"isAuthenticated","desc":"Checks whether the user is authenticated","params":[],"returns":[{"type":"Boolean","desc":""}]},{"name":"hasRole","desc":"Checks whether the user has the given role","params":[{"name":"role","type":"String","desc":"the role","default":"","optional":"","nullable":""}],"returns":[{"type":"Boolean","desc":""}]},{"name":"update","desc":"Update the user information","params":[],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"sso","desc":"Opens the 'SSO' modal window","params":[]},{"name":"signIn","desc":"Opens the 'SignIn' modal window","params":[]},{"name":"changeInfo","desc":"Opens the 'Change Info' modal window","params":[]},{"name":"changePass","desc":"Opens the 'Change Password' modal window","params":[]},{"name":"accountStatus","desc":"Opens the 'Account Status' modal window","params":[]},{"name":"signOut","desc":"Signs out","params":[]}]}],"interfaces":[{"name":"ami.IControl","desc":"The AMI control interface","implements":[],"inherits":[],"functions":[{"name":"patchId","desc":"Patches an HTML identifier","params":[{"name":"id","type":"String","desc":"the unpatched HTML identifier","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The patched HTML identifier"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"onReady","desc":"Called when the control is ready to run","params":[]},{"name":"onRemove","desc":"Called when the control is removed","params":[]}]},{"name":"ami.ISubApp","desc":"The AMI sub-application interface","implements":[],"inherits":[],"functions":[{"name":"onReady","desc":"Called when the sub-application is ready to run","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onExit","desc":"Called when the sub-application is about to exit","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogin","desc":"Called when logging in","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogout","desc":"Called when logging out","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]}]}],"classes":[{"name":"ami.Control","desc":"The basic AMI control","implements":["ami.IControl"],"inherits":[],"konstructor":{"name":"Control","params":[]},"functions":[{"name":"patchId","desc":"Patches an HTML identifier","params":[{"name":"id","type":"String","desc":"the unpatched HTML identifier","default":"","optional":"","nullable":""}],"returns":[{"type":"String","desc":"The patched HTML identifier"}]},{"name":"replaceHTML","desc":"Puts a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"prependHTML","desc":"Prepends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"appendHTML","desc":"Appends a HTML or TWIG fragment to the given target, see method [formatTWIG]{@link #jsdoc_method_formatTWIG}","params":[{"name":"selector","type":"String","desc":"the target selector","default":"","optional":"","nullable":""},{"name":"twig","type":"String","desc":"the TWIG fragment","default":"","optional":"","nullable":""},{"name":"settings","type":"Object","desc":"dictionary of settings (context, dict)","default":"","optional":true,"nullable":""}],"returns":[{"type":"$.Deferred","desc":"A JQuery deferred object"}]},{"name":"onReady","desc":"Called when the control is ready to run","params":[]},{"name":"onRemove","desc":"Called when the control is removed","params":[]}]},{"name":"ami.SubApp","desc":"The basic AMI sub-application","implements":["ami.ISubApp"],"inherits":[],"konstructor":{"name":"SubApp","params":[]},"functions":[{"name":"onReady","desc":"Called when the sub-application is ready to run","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onExit","desc":"Called when the sub-application is about to exit","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogin","desc":"Called when logging in","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]},{"name":"onLogout","desc":"Called when logging out","params":[{"name":"userdata","type":"?","desc":"userdata","default":"","optional":"","nullable":""}]}]}]};

/* eslint-enable */

/*--------------------------------------------------------------------------------------------------------------------*/
