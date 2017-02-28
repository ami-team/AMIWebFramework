#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import (division, print_function, unicode_literals)
#############################################################################

import os, sys, datetime
	
#############################################################################
# ENTRY POINT                                                               #
#############################################################################

def entry_point():
	#####################################################################

	x = raw_input('Enter the sub app name ([a-zA-Z][a-zA-Z0-9]*): ')

	name = x[0].lower() + x[1: ]
	NAME = x[0].upper() + x[1: ]

	#####################################################################

	path = os.path.dirname(os.path.realpath(__file__)) + os.sep + '..' + os.sep + '..' + os.sep + 'subapps' + os.sep + NAME

	#####################################################################

	os.mkdir(path)

	os.mkdir(path + os.sep + 'csc')
	os.mkdir(path + os.sep + 'js')
	os.mkdir(path + os.sep + 'twig')

	#####################################################################

	js = '''
/*!
 * AMI Web Framework
 *
 * Copyright (c) %s The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('%sApp', {
	/*-----------------------------------------------------------------*/

	$implements: [ami.ISubApp],

	/*-----------------------------------------------------------------*/

	onReady: function(userdata)
	{
		amiWebApp.loadSheets([
		]);

		amiWebApp.loadScripts([
		]);

		var result = $.Deferred();

		amiWebApp.loadHTMLs([
			'subapps/%s/twig/%sApp.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[0], {context: this, dict: {command: userdata}}).done(function() {

				result.resolve();
			});

		}).fail(function() {

			result.reject();
		});

		return result;
	},

	/*-----------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*-----------------------------------------------------------------*/

	onSessionExpired: function()
	{
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

%sApp = new %sApp();

amiRegisterSubApp('%s', %sApp, {});

/*-------------------------------------------------------------------------*/
''' % (datetime.datetime.now().year, NAME, NAME, NAME, name, NAME, name, name)

	#####################################################################

	twig = 'Hello World!'

	#####################################################################

	with open(path + os.sep + 'js' + os.sep + '%sApp.js' % NAME, 'w') as f:
		f.write(js)

	#####################################################################

	with open(path + os.sep + 'twig' + os.sep + '%sApp.twig' % NAME, 'w') as f:
		f.write(twig)

	#####################################################################

	print('Add this line in `index.html`:<script type="text/javascript" src="subapps/%s/js/%sApp.js"></script>' % (NAME, NAME))

	#####################################################################

	return 0

#############################################################################

if __name__ == '__main__':
	sys.exit(entry_point())

#############################################################################
