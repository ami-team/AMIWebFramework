/*!
 * AMI Web Framework - AMIDoc.js
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

var amiDoc = {
    "namespaces": [
        {
            "name": "amiWebApp",
            "desc": "The AMI webapp subsystem",
            "variables": [
                {
                    "name": "originURL",
                    "type": "String",
                    "desc": "Origin URL"
                },
                {
                    "name": "webAppURL",
                    "type": "String",
                    "desc": "WebApp URL"
                },
                {
                    "name": "args",
                    "type": "Array.<String>",
                    "desc": "URL arguments"
                }
            ],
            "functions": [
                {
                    "name": "isEmbedded",
                    "desc": "Check whether the WebApp is executed in embedded mode",
                    "params": [],
                    "returns": [
                        {
                            "type": "Boolean",
                            "desc": ""
                        }
                    ]
                },
                {
                    "name": "isLocal",
                    "desc": "Check whether the WebApp is executed locally (file://, localhost or 127.0.0.1)",
                    "params": [],
                    "returns": [
                        {
                            "type": "Boolean",
                            "desc": ""
                        }
                    ]
                },
                {
                    "name": "textToHtml",
                    "desc": "Escapes the given string from text to HTML",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the unescaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The escaped string"
                        }
                    ]
                },
                {
                    "name": "htmlToText",
                    "desc": "Unescapes the given string from HTML to text",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the escaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The unescaped string"
                        }
                    ]
                },
                {
                    "name": "textToString",
                    "desc": "Escapes the given string from text to JavaScript string",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the unescaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The escaped string"
                        }
                    ]
                },
                {
                    "name": "stringToText",
                    "desc": "Unescapes the given string from JavaScript string to text",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the escaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The unescaped string"
                        }
                    ]
                },
                {
                    "name": "htmlToString",
                    "desc": "Escapes the given string from HTML to JavaScript string",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the unescaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The escaped string"
                        }
                    ]
                },
                {
                    "name": "stringToHtml",
                    "desc": "Unescapes the given string from JavaScript string to HTML",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the escaped string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The unescaped string"
                        }
                    ]
                },
                {
                    "name": "base64Encode",
                    "desc": "Encodes (RFC 4648) a string",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the decoded string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The encoded string"
                        }
                    ]
                },
                {
                    "name": "base64Decode",
                    "desc": "Decodes (RFC 4648) a string",
                    "params": [
                        {
                            "name": "string",
                            "type": "String",
                            "desc": "the encoded string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The decoded string"
                        }
                    ]
                },
                {
                    "name": "loadSheets",
                    "desc": "Loads CSS sheets asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadScripts",
                    "desc": "Loads JS scripts asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadJSONs",
                    "desc": "Loads JSON files asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadXMLs",
                    "desc": "Loads XML files asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadHTMLs",
                    "desc": "Loads HTML files asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadTWIGs",
                    "desc": "Loads TWIG files asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadTexts",
                    "desc": "Loads text files asynchronously",
                    "params": [
                        {
                            "name": "urls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of urls",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "replaceHTML",
                    "desc": "Put a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "prependHTML",
                    "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "appendHTML",
                    "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "formatHTML",
                    "desc": "Interpretes the given TWIG string, see {@link http://twig.sensiolabs.org/documentation}",
                    "params": [
                        {
                            "name": "html",
                            "type": "String",
                            "desc": "the TWIG string",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "dict",
                            "type": "Object",
                            "desc": "the dictionary",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The Interpreted TWIG string"
                        }
                    ]
                },
                {
                    "name": "jspath",
                    "desc": "Finds data within the given JSON, see {@link https://github.com/dfilatov/jspath}",
                    "params": [
                        {
                            "name": "path",
                            "type": "String",
                            "desc": "the path",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "json",
                            "type": "Object",
                            "desc": "the JSON",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "Array",
                            "desc": "The resulting array"
                        }
                    ]
                },
                {
                    "name": "lock",
                    "desc": "Locks the web application",
                    "params": []
                },
                {
                    "name": "unlock",
                    "desc": "Unlocks the web application",
                    "params": []
                },
                {
                    "name": "canLeave",
                    "desc": "Enable the message in a confirmation dialog box to inform that the user is about to leave the current page.",
                    "params": []
                },
                {
                    "name": "cannotLeave",
                    "desc": "Disable the message in a confirmation dialog box to inform that the user is about to leave the current page.",
                    "params": []
                },
                {
                    "name": "info",
                    "desc": "Show an 'info' message",
                    "params": [
                        {
                            "name": "message",
                            "type": "String",
                            "desc": "the message",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "fadeOut",
                            "type": "Boolean",
                            "desc": "if True, the message disappears after 60s",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        },
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the target id",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "success",
                    "desc": "Show a 'success' message",
                    "params": [
                        {
                            "name": "message",
                            "type": "String",
                            "desc": "the message",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "fadeOut",
                            "type": "Boolean",
                            "desc": "if True, the message disappears after 60s",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        },
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the target id",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "warning",
                    "desc": "Show a 'warning' message",
                    "params": [
                        {
                            "name": "message",
                            "type": "String",
                            "desc": "the message",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "fadeOut",
                            "type": "Boolean",
                            "desc": "if True, the message disappears after 60s",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        },
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the target id",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "error",
                    "desc": "Show an 'error' message",
                    "params": [
                        {
                            "name": "message",
                            "type": "String",
                            "desc": "the message",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "fadeOut",
                            "type": "Boolean",
                            "desc": "if True, the message disappears after 60s",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        },
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the target id",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "flush",
                    "desc": "Flush messages",
                    "params": []
                },
                {
                    "name": "start",
                    "desc": "Starts the web application",
                    "params": [
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (logo_url, home_url, contact_email, about_url, theme_url, locker_url)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "loadControls",
                    "desc": "Loads controls asynchronously",
                    "params": [
                        {
                            "name": "controls",
                            "type": [
                                "Array",
                                "String"
                            ],
                            "desc": "the array of control names",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "loadSubApp",
                    "desc": "Loads a sub-application",
                    "params": [
                        {
                            "name": "defaultSubApp",
                            "type": "String",
                            "desc": "the default sub-application name, if null, 'amiWebApp.args[\"subapp\"]'",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "defaultUserData",
                            "type": "?",
                            "desc": "the default user data, if null, 'amiWebApp.args[\"userdata\"]'",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ]
                }
            ],
            "events": [
                {
                    "name": "onReady",
                    "desc": "This method must be overloaded and is called when the web application starts",
                    "params": []
                },
                {
                    "name": "onRefresh",
                    "desc": "This method must be overloaded and is called when the toolbar needs to be updated",
                    "params": []
                }
            ]
        },
        {
            "name": "amiCommand",
            "desc": "The AMI command subsystem",
            "variables": [
                {
                    "name": "endpoint",
                    "type": "String",
                    "desc": "Default endpoint"
                },
                {
                    "name": "converter",
                    "type": "String",
                    "desc": "Default converter"
                }
            ],
            "functions": [
                {
                    "name": "execute",
                    "desc": "Execute an AMI command",
                    "params": [
                        {
                            "name": "command",
                            "type": "String",
                            "desc": "the command",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, endpoint, converter, extraParam, extraValue)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "passLogin",
                    "desc": "Login by login/password",
                    "params": [
                        {
                            "name": "user",
                            "type": "String",
                            "desc": "the user",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "pass",
                            "type": "String",
                            "desc": "the password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "certLogin",
                    "desc": "Login by certificate",
                    "params": [
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "logout",
                    "desc": "Logout",
                    "params": [
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "attachCert",
                    "desc": "Attach a certificate",
                    "params": [
                        {
                            "name": "user",
                            "type": "String",
                            "desc": "the user",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "pass",
                            "type": "String",
                            "desc": "the password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "detachCert",
                    "desc": "Detach a certificate",
                    "params": [
                        {
                            "name": "user",
                            "type": "String",
                            "desc": "the user",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "pass",
                            "type": "String",
                            "desc": "the password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "addUser",
                    "desc": "Add a new user",
                    "params": [
                        {
                            "name": "user",
                            "type": "String",
                            "desc": "the user",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "pass",
                            "type": "String",
                            "desc": "the password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "firstName",
                            "type": "String",
                            "desc": "the first name",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "lastName",
                            "type": "String",
                            "desc": "the last name",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "email",
                            "type": "String",
                            "desc": "the email",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "attach",
                            "type": "Boolean",
                            "desc": "attach the current certificate",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "changeInfo",
                    "desc": "Change the account information",
                    "params": [
                        {
                            "name": "firstName",
                            "type": "String",
                            "desc": "the first name",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "lastName",
                            "type": "String",
                            "desc": "the last name",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "email",
                            "type": "String",
                            "desc": "the email",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "changePass",
                    "desc": "Change the account password",
                    "params": [
                        {
                            "name": "oldPass",
                            "type": "String",
                            "desc": "the old password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "newPass",
                            "type": "String",
                            "desc": "the new password",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "resetPass",
                    "desc": "Reset the account password",
                    "params": [
                        {
                            "name": "user",
                            "type": "String",
                            "desc": "the user",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                }
            ]
        },
        {
            "name": "amiLogin",
            "desc": "The AMI authentication subsystem",
            "functions": [
                {
                    "name": "getUser",
                    "desc": "The current user",
                    "params": [],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The current user"
                        }
                    ]
                },
                {
                    "name": "getGuest",
                    "desc": "The guest user",
                    "params": [],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The guest user"
                        }
                    ]
                },
                {
                    "name": "getClientDN",
                    "desc": "The client DN",
                    "params": [],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The client DN"
                        }
                    ]
                },
                {
                    "name": "getIssuerDN",
                    "desc": "The issuer DN",
                    "params": [],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The issuer DN"
                        }
                    ]
                },
                {
                    "name": "isAuthenticated",
                    "desc": "Check whether the user is authenticated",
                    "params": [],
                    "returns": [
                        {
                            "type": "Boolean",
                            "desc": ""
                        }
                    ]
                },
                {
                    "name": "sso",
                    "desc": "Open the 'SSO' modal form",
                    "params": []
                },
                {
                    "name": "signIn",
                    "desc": "Open the 'SignIn' modal form",
                    "params": []
                },
                {
                    "name": "changeInfo",
                    "desc": "Open the 'Change Info' modal form",
                    "params": []
                },
                {
                    "name": "changePass",
                    "desc": "Open the 'Change Password' modal form",
                    "params": []
                },
                {
                    "name": "accountStatus",
                    "desc": "Open the 'Account Status' modal form",
                    "params": []
                },
                {
                    "name": "signOut",
                    "desc": "Sign out",
                    "params": []
                },
                {
                    "name": "hasRole",
                    "desc": "Check if the user has the given role",
                    "params": [
                        {
                            "name": "role",
                            "type": "String",
                            "desc": "the role",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "Boolean",
                            "desc": ""
                        }
                    ]
                }
            ]
        }
    ],
    "interfaces": [
        {
            "name": "ami.IControl",
            "desc": "The AMI control interface",
            "implements": [],
            "inherits": [],
            "functions": [
                {
                    "name": "patchId",
                    "desc": "Patch an HTML identifier",
                    "params": [
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the unpatched HTML identifier",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The patched HTML identifier"
                        }
                    ]
                },
                {
                    "name": "replaceHTML",
                    "desc": "Put a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "prependHTML",
                    "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "appendHTML",
                    "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "onReady",
                    "desc": "Called when the control is ready to run",
                    "params": []
                }
            ]
        },
        {
            "name": "ami.ISubApp",
            "desc": "The AMI sub-application interface",
            "implements": [],
            "inherits": [],
            "functions": [
                {
                    "name": "onReady",
                    "desc": "Called when the sub-application is ready to run",
                    "params": [
                        {
                            "name": "userdata",
                            "type": "?",
                            "desc": "userdata",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ]
                },
                {
                    "name": "onExit",
                    "desc": "Called when the sub-application is about to exit",
                    "params": []
                },
                {
                    "name": "onLogin",
                    "desc": "Called when logging in",
                    "params": []
                },
                {
                    "name": "onLogout",
                    "desc": "Called when logging out",
                    "params": []
                }
            ]
        }
    ],
    "classes": [
        {
            "name": "ami.Control",
            "desc": "The basic AMI control",
            "implements": [
                "ami.IControl"
            ],
            "inherits": [],
            "konstructor": {
                "name": "ami.Control",
                "params": []
            },
            "functions": [
                {
                    "name": "patchId",
                    "desc": "Patch an HTML identifier",
                    "params": [
                        {
                            "name": "id",
                            "type": "String",
                            "desc": "the unpatched HTML identifier",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "String",
                            "desc": "The patched HTML identifier"
                        }
                    ]
                },
                {
                    "name": "replaceHTML",
                    "desc": "Put a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "prependHTML",
                    "desc": "Prepends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                },
                {
                    "name": "appendHTML",
                    "desc": "Appends a HTML or TWIG fragment to the given target, see method [formatHTML]{@link #jsdoc_method_formatHTML}",
                    "params": [
                        {
                            "name": "selector",
                            "type": "String",
                            "desc": "the target selector",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "twig",
                            "type": "String",
                            "desc": "the TWIG fragment",
                            "default": "",
                            "optional": "",
                            "nullable": ""
                        },
                        {
                            "name": "settings",
                            "type": "Object",
                            "desc": "dictionary of settings (context, dict)",
                            "default": "",
                            "optional": true,
                            "nullable": ""
                        }
                    ],
                    "returns": [
                        {
                            "type": "$.Deferred",
                            "desc": "A JQuery deferred object"
                        }
                    ]
                }
            ]
        },
        {
            "name": "ami.SubApp",
            "desc": "The basic AMI sub-application",
            "implements": [
                "ami.ISubApp"
            ],
            "inherits": [],
            "konstructor": {
                "name": "ami.SubApp",
                "params": []
            },
            "functions": [
                {
                    "name": "onExit",
                    "desc": "Called when the sub-application is about to exit",
                    "params": []
                },
                {
                    "name": "onLogin",
                    "desc": "Called when logging in",
                    "params": []
                },
                {
                    "name": "onLogout",
                    "desc": "Called when logging out",
                    "params": []
                }
            ]
        }
    ]
};

/*-------------------------------------------------------------------------*/
