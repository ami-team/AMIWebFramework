#!/usr/bin/env python3
# -*- coding:utf-8 -*-
#############################################################################
# Author : Jerome ODIER
# Email : jerome.odier@lpsc.in2p3.fr
#
# AMI Web Framework
#
# Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
#
# This file must be used under the terms of the CeCILL-C:
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
#############################################################################

AWF_GIT_URL = 'https://github.com/ami-team/AMIWebFramework.git'

#############################################################################

import os, sys, glob, json, random, shutil, os.path, hashlib, argparse, tempfile, subprocess

#############################################################################

def shutil_makedirs(path, ignore_errors = True):

	if not ignore_errors    \
	   or                    \
	   not os.path.isdir(path):

		os.makedirs(path)

#############################################################################

def gitClone(tempPath, ignore_errors = True):

	if os.path.isdir(tempPath):

		subprocess.check_call(['git', 'pull'], cwd = tempPath)

	else:

		subprocess.check_call(['git', 'clone', AWF_GIT_URL, tempPath])

#############################################################################

def copyFiles(tempPath, dst, src, _filter, verbose = True, replace = True):

	result = 0

	idx = len(tempPath) + len(src) + 2

	for SRC in glob.glob(tempPath + os.sep + src + os.sep + _filter):

		#####################################################################

		DST = dst + os.sep + SRC[idx: ]

		#####################################################################

		if replace or not os.path.exists(DST):

			#################################################################

			if verbose:

				print('  %s <- %s' % (DST, SRC))

			#################################################################

			if not os.path.isdir(SRC):

				shutil_makedirs(os.path.dirname(DST), ignore_errors = True)

				shutil.copy(SRC, DST)

			else:

				shutil.rmtree(DST, ignore_errors = True)

				shutil.copytree(SRC, DST)

			#################################################################

			result += 1

		#####################################################################

	return result

#############################################################################

def loadJSON(fileName):

	print('Loading `%s`...' % fileName)

	try:

		with open(fileName, 'r') as f:  

			return json.load(f)

	except:

		return {}

#############################################################################

def saveJSON(fileName, data):

	print('Saving `%s`...' % fileName)

	with open(fileName, 'w') as f:  

		f.write(json.dumps(data, indent = 4, sort_keys = True))

#############################################################################

def loadText(fileName):

	print('Loading `%s`...' % fileName)

	try:

		with open(fileName, 'r') as f:  

			return f.read()

	except:

		return ''

#############################################################################

def saveText(fileName, data):

	print('Saving `%s`...' % fileName)

	with open(fileName, 'w') as f:  

		f.write(data)

#############################################################################

def updateAWF(inDebugMode, verbose):

	ignore = [
		'.DS_Store', '.DS_Store?',
		'/css', '/docs/api.html', '/docs/info.html', '/fonts', '/images', '/js', '/twig',
		'/.eslintrc.json', '/.settings'
	]

	tempPath = tempfile.gettempdir() + os.sep + hashlib.md5(os.path.realpath(__file__).encode()).hexdigest()

	try:

		#####################################################################

		print('#############################################################################')
		print('# DOWNLOADING AWF...                                                        #')
		print('#############################################################################')

		gitClone(tempPath)

		#####################################################################

		print('#############################################################################')
		print('# INSTALLING CORE FILES...                                                  #')
		print('#############################################################################')

		nb = 0

		nb += copyFiles(tempPath, 'css', 'css', '*.css', verbose, True)
		nb += copyFiles(tempPath, 'css', 'css', '3rd-party' + os.sep + '*', verbose, True)

		nb += copyFiles(tempPath, 'js', 'js', '*.js', verbose, True)
		nb += copyFiles(tempPath, 'js', 'js', '3rd-party' + os.sep + '*', verbose, True)

		nb += copyFiles(tempPath, 'docs', 'docs', '*', verbose, False)
		nb += copyFiles(tempPath, 'fonts', 'fonts', '*', verbose, True)
		nb += copyFiles(tempPath, 'images', 'images', '*', verbose, True)
		nb += copyFiles(tempPath, 'twig', 'twig', '*', verbose, True)

		copyFiles(tempPath, '.', '.', 'favicon.ico', verbose, False)
		copyFiles(tempPath, '.', '.', '.eslintrc.json', verbose, True)

		copyFiles(tempPath, '.', 'tools', 'awf.py', verbose, True)

		print('-> %d files were copied.' % nb)

		#####################################################################

		if inDebugMode:

			shutil.move('css' + os.sep + 'ami.css', 'css' + os.sep + 'ami.min.css')
			shutil.move('js' + os.sep + 'ami.js', 'js' + os.sep + 'ami.min.js')
			shutil.move('js' + os.sep + 'ami.es6.js', 'js' + os.sep + 'ami.es6.min.js')

		else:

			os.remove('css' + os.sep + 'ami.css')
			os.remove('js' + os.sep + 'ami.js')
			os.remove('js' + os.sep + 'ami.es6.js')

		#####################################################################

		print('#############################################################################')
		print('# INSTALLING DEFAULT CONTROLS...                                            #')
		print('#############################################################################')

		DEFAULT_CONTROLS_JSON = loadJSON(tempPath + os.sep + 'controls' + os.sep + 'CONTROLS.json')
		USER_CONTROLS_JSON = loadJSON('controls' + os.sep + 'CONTROLS.json')

		#####################################################################

		for control in DEFAULT_CONTROLS_JSON:

			#################################################################

			USER_CONTROLS_JSON[control] = DEFAULT_CONTROLS_JSON[control]

			#################################################################

			JS = DEFAULT_CONTROLS_JSON[control]['file']

			idx = JS.find('/js/')

			if idx > 0:

				copyFiles(tempPath, 'controls', 'controls', JS[9: idx], verbose)

				ignore.append('/controls/' + JS[9: idx])

		#####################################################################

		saveJSON('controls' + os.sep + 'CONTROLS.json', USER_CONTROLS_JSON)

		#####################################################################

		print('#############################################################################')
		print('# INSTALLING DEFAULT SUBAPPS...                                             #')
		print('#############################################################################')

		DEFAULT_SUBAPPS_JSON = loadJSON(tempPath + os.sep + 'subapps' + os.sep + 'SUBAPPS.json')
		USER_SUBAPPS_JSON = loadJSON('subapps' + os.sep + 'SUBAPPS.json')

		#####################################################################

		for subapp in DEFAULT_SUBAPPS_JSON:

			#################################################################

			USER_SUBAPPS_JSON[subapp] = DEFAULT_SUBAPPS_JSON[subapp]

			#################################################################

			JS = DEFAULT_SUBAPPS_JSON[subapp]['file']

			idx = JS.find('/js/')

			if idx > 0:

				copyFiles(tempPath, 'subapps', 'subapps', JS[8: idx], verbose)

				ignore.append('/subapps/' + JS[8: idx])

		#####################################################################

		saveJSON('subapps' + os.sep + 'SUBAPPS.json', USER_SUBAPPS_JSON)

		#####################################################################

		print('#############################################################################')
		print('# CREATING .GITIGNORE FILE...                                               #')
		print('#############################################################################')

		saveText('.gitignore', '\n'.join(ignore))

		#####################################################################

		print('#############################################################################')

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def updateTool(verbose):

	tempPath = tempfile.gettempdir() + os.sep + hashlib.md5(os.path.realpath(__file__).encode()).hexdigest()

	try:

		#####################################################################

		print('#############################################################################')
		print('# DOWNLOADING AWF...                                                        #')
		print('#############################################################################')

		gitClone(tempPath)

		#####################################################################

		print('#############################################################################')
		print('# UPDATING AWF.PY...                                                        #')
		print('#############################################################################')

		copyFiles(tempPath, '.', 'tools', 'awf.py', verbose, True)

		print('-> done.')

		#####################################################################

		print('#############################################################################')

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def createHomePage(verbose):

	try:

		#####################################################################

		print('Page title:')

		try:
			TITLE = raw_input()
		except:
			TITLE = input()

		#####################################################################

		print('Service URL:')

		try:
			ENDPOINT = raw_input()
		except:
			ENDPOINT = input()

		#####################################################################

		saveText('index.html', AWF_HOME_PAGE_TEMPLATE.replace("{{TITLE}}", TITLE).replace("{{ENDPOINT}}", ENDPOINT if ENDPOINT else 'https://localhost:8443/AMI/FrontEnd'))

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def createControl(verbose):

	try:

		#####################################################################

		print('Control name ([a-zA-Z][a-zA-Z0-9]*):')

		try:
			X = raw_input()
		except:
			X = input()

		X = X.strip()

		name = X[0].lower() + X[1: ]
		NAME = X[0].upper() + X[1: ]

		#####################################################################

		if os.path.exists('controls' + os.sep + NAME):

			raise Exception('control already exists')

		#####################################################################

		shutil_makedirs('controls' + os.sep + NAME + os.sep + 'js', ignore_errors = False)
		saveText('controls' + os.sep + NAME + os.sep + 'js' + os.sep + NAME + 'Ctrl.js', AWF_CONTROL_JS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		shutil_makedirs('controls' + os.sep + NAME + os.sep + 'css', ignore_errors = False)
		saveText('controls' + os.sep + NAME + os.sep + 'css' + os.sep + NAME + 'Ctrl.css', AWF_CONTROL_CSS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		shutil_makedirs('controls' + os.sep + NAME + os.sep + 'twig', ignore_errors = False)
		saveText('controls' + os.sep + NAME + os.sep + 'twig' + os.sep + NAME + 'Ctrl.twig', AWF_CONTROL_TWIG_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		#####################################################################

		USER_CONTROLS_JSON = loadJSON('controls' + os.sep + 'CONTROLS.json')

		USER_CONTROLS_JSON[name] = {
			'clazz': NAME + 'Ctrl',
			'file': 'controls/' + NAME + '/js/' + NAME + 'Ctrl.js',
		}

		saveJSON('controls' + os.sep + 'CONTROLS.json', USER_CONTROLS_JSON)

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def createSubapp(verbose):

	try:

		#####################################################################

		print('Subapp name ([a-zA-Z][a-zA-Z0-9]*):')

		try:
			X = raw_input()
		except:
			X = input()

		X = X.strip()

		name = X[0].lower() + X[1: ]
		NAME = X[0].upper() + X[1: ]

		#####################################################################

		if os.path.exists('subapps' + os.sep + NAME):

			raise Exception('subapp already exists')

		#####################################################################

		shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'js', ignore_errors = False)
		saveText('subapps' + os.sep + NAME + os.sep + 'js' + os.sep + NAME + 'App.js', AWF_SUBAPP_JS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'css', ignore_errors = False)
		saveText('subapps' + os.sep + NAME + os.sep + 'css' + os.sep + NAME + 'App.css', AWF_SUBAPP_CSS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'twig', ignore_errors = False)
		saveText('subapps' + os.sep + NAME + os.sep + 'twig' + os.sep + NAME + 'App.twig', AWF_SUBAPP_TWIG_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

		#####################################################################

		USER_SUBAPPS_JSON = loadJSON('subapps' + os.sep + 'SUBAPPS.json')

		USER_SUBAPPS_JSON[name] = {
			'breadcrumb': [],
			'instance': name + 'App',
			'file': 'subapps/' + NAME + '/js/' + NAME + 'App.js',
		}

		saveJSON('subapps' + os.sep + 'SUBAPPS.json', USER_SUBAPPS_JSON)

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def lintControls(verbose):

	try:

		#####################################################################

		subprocess.check_call(['eslint', 'controls/**/js/*.js'])

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def lintSubapps(verbose):

	try:

		#####################################################################

		subprocess.check_call(['eslint', 'subapps/**/js/*.js'])

		#####################################################################

		return 0

	except Exception as e:

		print('error: %s' % e)

		return 1

#############################################################################

def createId():

	A =     'ABCDEF'
	B = '0123456789ABCDEF'

	print(''.join([
		random.choice(A), random.choice(B), random.choice(B), random.choice(B),
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		'-',
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		'-',
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		'-',
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		'-',
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
		random.choice(B), random.choice(B), random.choice(B), random.choice(B),
	]))

	return 0

#############################################################################

def main():

	#########################################################################

	print('''
           __  __ _____  __          __  _       ______                                           _    
     /\   |  \/  |_   _| \ \        / / | |     |  ____|                                         | |   
    /  \  | \  / | | |    \ \  /\  / /__| |__   | |__ _ __ __ _ _ __ ___   _____      _____  _ __| | __
   / /\ \ | |\/| | | |     \ \/  \/ / _ \ '_ \  |  __| '__/ _` | '_ ` _ \ / _ \ \ /\ / / _ \| '__| |/ /
  / ____ \| |  | |_| |_     \  /\  /  __/ |_) | | |  | | | (_| | | | | | |  __/\ V  V / (_) | |  |   < 
 /_/    \_\_|  |_|_____|     \/  \/ \___|_.__/  |_|  |_|  \__,_|_| |_| |_|\___| \_/\_/ \___/|_|  |_|\_\
''')

	#########################################################################

	parser = argparse.ArgumentParser()

	parser.add_argument('--create-home-page', help = 'create a new home page', action = 'store_true')
	parser.add_argument('--create-control', help = 'create a new control', action = 'store_true')
	parser.add_argument('--create-subapp', help = 'create a new subapp', action = 'store_true')
	parser.add_argument('--lint-controls', help = 'lint controls', action = 'store_true')
	parser.add_argument('--lint-subapps', help = 'lint subapps', action = 'store_true')
	parser.add_argument('--create-id', help = 'create a new id', action = 'store_true')

	parser.add_argument('--update-prod', help = 'update AWF (prod mode)', action = 'store_true')
	parser.add_argument('--update-debug', help = 'update AWF (debud mode)', action = 'store_true')
	parser.add_argument('--update-this-tool', help = 'update this tool (awf.py)', action = 'store_true')

	parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

	args = parser.parse_args()

	#########################################################################

	if   args.create_home_page:
		return createHomePage(args.verbose)

	elif args.create_control:
		return createControl(args.verbose)

	elif args.create_subapp:
		return createSubapp(args.verbose)

	elif args.lint_controls:
		return lintControls(args.verbose)

	elif args.lint_subapps:
		return lintSubapps(args.verbose)

	elif args.update_prod:
		return updateAWF(False, args.verbose)

	elif args.update_debug:
		return updateAWF(True, args.verbose)

	elif args.update_this_tool:
		return updateTool(args.verbose)

	#########################################################################

	return createId()

#############################################################################
# TEMPLATES                                                                 #
#############################################################################

AWF_HOME_PAGE_TEMPLATE = '''<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<title>{{TITLE}}</title>

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/ami.min.js"></script>

		<script type="text/javascript">

			amiWebApp.onRefresh = function(isAuth)
			{
				var menu =
					'<li class="nav-item dropdown">' +
					'	<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'		Search' +
					'	</a>' +
					'	<div class="dropdown-menu">' +
					'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=search">Search</a>' +
					'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=simpleSearch">Simple Search</a>' +
					'		<div class="dropdown-divider"></div>' +
					'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=schemaViewer">Schema Viewer</a>' +
					'	</div>' +
					'</li>' +
					'<li class="nav-item dropdown">' +
					'	<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'		Tools' +
					'	</a>' +
					'	<div class="dropdown-menu">' +
					'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=command">Command</a>' +
					'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=emergency">Emergency</a>' +
					'	</div>' +
					'</li>'
				;

				if(amiLogin.hasRole('AMI_ADMIN'))
				{
					menu +=
						'<li class="nav-item dropdown">' +
						'	<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
						'		<i class="fa fa-key"></i> Admin' +
						'	</a>' +
						'	<div class="dropdown-menu">' +
						'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=adminDashboard">Admin Dashboard</a>' +
						'		<div class="dropdown-divider"></div>' +
						'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=api.html">AMI Web Framework API</a>' +
						'		<a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=info.html">AMI Web Framework Info</a>' +
						'	</div>' +
						'</li>'
					;
				}

				$('#ami_menu_content').html(menu);
			};

			amiWebApp.onReady = function()
			{
				return amiWebApp.loadSubAppByURL('document');
			};

		</script>
	</head>
	<body>

		<script type="text/javascript">

			amiWebApp.start({
				logo_url: 'images/logo.png',
				theme_url: 'twig/AMI/Theme/blue.twig',
				endpoint_url: '{{ENDPOINT}}',
			});

		</script>

	</body>
</html>
'''

#############################################################################

AWF_CONTROL_JS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('{{NAME}}Ctrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/{{NAME}}/css/{{NAME}}Ctrl.css',
			amiWebApp.originURL + '/controls/{{NAME}}/twig/{{NAME}}Ctrl.twig',
		], {context: this}).done(function(data) {

			/* TODO */
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
'''

#############################################################################

AWF_CONTROL_CSS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */
'''

#############################################################################

AWF_CONTROL_TWIG_TEMPLATE = '''<!--
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
-->

<div></div>'''

#############################################################################

AWF_SUBAPP_JS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/{{NAME}}/css/{{NAME}}App.css',
			'subapps/{{NAME}}/twig/{{NAME}}App.twig',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[1], {context: this}).done(function() {

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var {{name}}App = new {{NAME}}App();

/*-------------------------------------------------------------------------*/
'''

#############################################################################

AWF_SUBAPP_CSS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */
'''

#############################################################################

AWF_SUBAPP_TWIG_TEMPLATE = '''<!--
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
-->

<div></div>'''

#############################################################################
# MAIN                                                                      #
#############################################################################

if __name__ == '__main__':

	sys.exit(main())

#############################################################################
