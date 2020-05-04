#!/usr/bin/env python3
# -*- coding:utf-8 -*-
########################################################################################################################
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
########################################################################################################################

AWF_GIT_URL = 'https://github.com/ami-team/AMIWebFramework.git'

########################################################################################################################

import os, re, sys, glob, json, random, shutil, hashlib, argparse, tempfile, subprocess

########################################################################################################################

def print_logo():

    print('''
 █████╗ ███╗   ███╗██╗    ██╗    ██╗███████╗██████╗                           
██╔══██╗████╗ ████║██║    ██║    ██║██╔════╝██╔══██╗                          
███████║██╔████╔██║██║    ██║ █╗ ██║█████╗  ██████╔╝                          
██╔══██║██║╚██╔╝██║██║    ██║███╗██║██╔══╝  ██╔══██╗                          
██║  ██║██║ ╚═╝ ██║██║    ╚███╔███╔╝███████╗██████╔╝                          
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚══╝╚══╝ ╚══════╝╚═════╝                           
███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
█████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝'''[1: ])

########################################################################################################################

def shutil_makedirs(path, ignore_errors = True):

    if not ignore_errors    \
       or                    \
       not os.path.isdir(path):

        os.makedirs(path)

########################################################################################################################

def gitClone(tempPath, url, commit_id, retry = True):

    ####################################################################################################################
    # CLONE REPOSITORY                                                                                                 #
    ####################################################################################################################

    print('Working directory: `%s`' % tempPath)

    if not os.path.isdir(tempPath):

        subprocess.check_call(['git', 'clone', url, tempPath])

    ####################################################################################################################
    # UPDATE REPOSITORY                                                                                                #
    ####################################################################################################################

    try:

        ################################################################################################################

        if commit_id == 'HEAD':

            subprocess.check_call(['git', 'pull'], cwd = tempPath)

        else:

            subprocess.check_call(['git', 'reset', '--hard', commit_id], cwd = tempPath)

        ################################################################################################################

        if sys.version_info < (3, 0):

            return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'], cwd = tempPath).strip()

        else:

            return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'], cwd = tempPath).decode('utf-8').strip()

        ################################################################################################################

    except Exception as e:

        ################################################################################################################

        if retry:

            print('Trying re-cloning...')

            shutil.rmtree(tempPath, ignore_errors = True)

            gitClone(tempPath, url, commit_id, retry = False)

        else:

            raise

########################################################################################################################

def copyFiles(tempPath, dstDir, dstName, srcDir, srcName, verbose = True, replace = True):

    result = 0

    idx = len(tempPath) + 1 + len(srcDir) + 1

    for SRC in glob.glob(tempPath + os.sep + srcDir + os.sep + srcName):

        ################################################################################################################

        DST = dstDir + os.sep + SRC[idx: ]

        DSTDir = os.path.dirname(DST)

        ################################################################################################################

        if dstName is not None:

            DST = DSTDir + os.sep + dstName

        ################################################################################################################

        if replace or not os.path.exists(DST):

            ############################################################################################################

            if verbose:

                print('  %s <- %s' % (DST, SRC))

            ############################################################################################################

            if not os.path.isdir(SRC):

                shutil_makedirs(DSTDir, ignore_errors = True)

                shutil.copy(SRC, DST)

            else:

                shutil.rmtree(DST, ignore_errors = True)

                shutil.copytree(SRC, DST)

            ############################################################################################################

            result += 1

        ################################################################################################################

    return result

########################################################################################################################

def replaceStrInFile(fileName, oldStr, newStr):

    print('Patching `%s`...' % fileName)

    with open(fileName, 'rt') as f:
        txt = f.read()

    txt = txt.replace(oldStr, newStr, 1)

    with open(fileName, 'wt') as f:
        f.write(txt)

########################################################################################################################

def loadJSON(fileName):

    print('Loading `%s`...' % fileName)

    try:

        with open(fileName, 'rt') as f:

            return json.load(f)

    except:

        return {}

########################################################################################################################

def saveJSON(fileName, data):

    print('Saving `%s`...' % fileName)

    with open(fileName, 'wt') as f:

        f.write(json.dumps(data, indent = 4, sort_keys = True))

########################################################################################################################

def loadText(fileName):

    print('Loading `%s`...' % fileName)

    try:

        with open(fileName, 'rt') as f:

            return f.read()

    except:

        return ''

########################################################################################################################

def saveText(fileName, data):

    print('Saving `%s`...' % fileName)

    with open(fileName, 'wt') as f:

        f.write(data)

########################################################################################################################

def updateAWF(inDebugMode, awfGITCommitId, verbose):

    ignore = [
        '*~', '.DS_Store', '.DS_Store?',
        '/css', '/docs/api.html', '/docs/info.html', '/fonts', '/images', '/js', '/twig',
        '/.eslintrc.json', '/.settings'
    ]

    baseTempPath = tempfile.gettempdir() + os.sep + hashlib.md5(os.path.realpath(__file__).encode()).hexdigest()

    try:

        ################################################################################################################

        print('##############################################################################')
        print('# DOWNLOADING AWF...                                                         #')
        print('##############################################################################')

        ################################################################################################################

        print('Package `%s`:' % 'AWF')

        awfTempPath = baseTempPath + '_' + 'awf'

        awfGITCommitId = gitClone(awfTempPath, AWF_GIT_URL, awfGITCommitId)

        print('-> using git release id: %s' % awfGITCommitId)

        ################################################################################################################

        PACKAGES = [{
            'name': 'AWF',
            'path': awfTempPath,
            'controls_json': loadJSON(awfTempPath + os.sep + 'controls' + os.sep + 'CONTROLS.json'),
            'subapps_json': loadJSON(awfTempPath + os.sep + 'subapps' + os.sep + 'SUBAPPS.json'),
        }]

        ################################################################################################################

        print('##############################################################################')
        print('# DOWNLOADING ADDITIONAL PACKAGES...                                         #')
        print('##############################################################################')

        ################################################################################################################

        if os.path.exists('ext.json'):

            ############################################################################################################

            EXT_JSON = loadJSON('ext.json')

            ############################################################################################################

            if 'packages' in EXT_JSON:

                for package in EXT_JSON['packages']:

                    ####################################################################################################

                    print('Package `%s`:' % package['name'])

                    packageTempPath = baseTempPath + '_' + package['name'].lower()

                    packageGITCommitId = gitClone(packageTempPath, package['url'], package['commit_id'] if 'commit_id' in package else 'HEAD')

                    print('-> using git release id: %s' % packageGITCommitId)

                    ####################################################################################################

                    PACKAGES.append({
                        'name': package['name'],
                        'path': packageTempPath,
                        'controls_json': loadJSON(packageTempPath + os.sep + 'controls' + os.sep + 'CONTROLS.json'),
                        'subapps_json': loadJSON(packageTempPath + os.sep + 'subapps' + os.sep + 'SUBAPPS.json'),
                    })

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING AWF CORE FILES...                                               #')
        print('##############################################################################')

        ################################################################################################################

        nb = 0

        print('Copying files...')

        nb += copyFiles(awfTempPath, 'css', None, 'css', '*.css', verbose, True)
        nb += copyFiles(awfTempPath, 'css', None, 'css', '*.css.map', verbose, True)
        nb += copyFiles(awfTempPath, 'css', None, 'css', '3rd-party' + os.sep + '*', verbose, True)

        nb += copyFiles(awfTempPath, 'js', None, 'js', '*.js', verbose, True)
        nb += copyFiles(awfTempPath, 'js', None, 'js', '*.js.map', verbose, True)
        nb += copyFiles(awfTempPath, 'js', None, 'js', '3rd-party' + os.sep + '*', verbose, True)

        nb += copyFiles(awfTempPath, 'docs', None, 'docs', '*', verbose, False)
        nb += copyFiles(awfTempPath, 'fonts', None, 'fonts', '*', verbose, True)
        nb += copyFiles(awfTempPath, 'images', None, 'images', '*', verbose, True)
        nb += copyFiles(awfTempPath, 'twig', None, 'twig', '*', verbose, True)

        nb += copyFiles(awfTempPath, '.', None, '.', 'favicon.ico', verbose, False)
        nb += copyFiles(awfTempPath, '.', None, '.', '.eslintrc.json', verbose, True)

        nb += copyFiles(awfTempPath, '.', 'awf.py', 'tools', 'awf_stub.py', verbose, True)

        nb += copyFiles(awfTempPath, '.', 'Gruntfile.js', 'tools', 'Gruntfile.js', verbose, True)

        print('-> %d files copied.' % nb)

        ################################################################################################################

        if inDebugMode:

            shutil.move('css' + os.sep + 'ami.css', 'css' + os.sep + 'ami.min.css')
            shutil.move('js' + os.sep + 'ami.js', 'js' + os.sep + 'ami.min.js')
            shutil.move('js' + os.sep + 'ami.es6.js', 'js' + os.sep + 'ami.es6.min.js')

        else:

            os.remove('css' + os.sep + 'ami.css')
            os.remove('js' + os.sep + 'ami.js')
            os.remove('js' + os.sep + 'ami.es6.js')

        ################################################################################################################

        replaceStrInFile('js' + os.sep + 'ami.min.js', '{{AMI_COMMIT_ID}}', awfGITCommitId)
        replaceStrInFile('js' + os.sep + 'ami.es6.min.js', '{{AMI_COMMIT_ID}}', awfGITCommitId)

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING CONTROLS...                                                     #')
        print('##############################################################################')

        ################################################################################################################

        USER_CONTROLS_JSON = loadJSON('controls' + os.sep + 'CONTROLS.json')

        ################################################################################################################

        print('Copying files...')

        for package in PACKAGES:

            nb = 0

            print('Package `%s`:' % package['name'])

            for control in package['controls_json']:

                ########################################################################################################

                USER_CONTROLS_JSON[control] = package['controls_json'][control]

                ########################################################################################################

                JS = package['controls_json'][control]['file']

                idx = JS.find('/js/')

                if idx > 0:

                    nb += copyFiles(package['path'], 'controls', None, 'controls', JS[9: idx], verbose)

                    ignore.append('/controls/' + JS[9: idx])

                ########################################################################################################

            print('-> %d files copied.' % nb)

        ################################################################################################################

        saveJSON('controls' + os.sep + 'CONTROLS.json', USER_CONTROLS_JSON)

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING SUBAPPS...                                                      #')
        print('##############################################################################')

        ################################################################################################################

        USER_SUBAPPS_JSON = loadJSON('subapps' + os.sep + 'SUBAPPS.json')

        ################################################################################################################

        print('Copying files...')

        for package in PACKAGES:

            nb = 0

            print('Package `%s`:' % package['name'])

            for subapp in package['subapps_json']:

                ########################################################################################################

                USER_SUBAPPS_JSON[subapp] = package['subapps_json'][subapp]

                ########################################################################################################

                JS = package['subapps_json'][subapp]['file']

                idx = JS.find('/js/')

                if idx > 0:

                    nb += copyFiles(package['path'], 'subapps', None, 'subapps', JS[8: idx], verbose)

                    ignore.append('/subapps/' + JS[8: idx])

                ########################################################################################################

            print('-> %d files copied.' % nb)

        ################################################################################################################

        saveJSON('subapps' + os.sep + 'SUBAPPS.json', USER_SUBAPPS_JSON)

        ################################################################################################################

        print('##############################################################################')
        print('# GENERATING `.gitignore`...                                                 #')
        print('##############################################################################')

        ################################################################################################################

        saveText('.gitignore', '\n'.join(ignore))

        ################################################################################################################

        print('##############################################################################')
        print('# GENERATING `package.json`...                                               #')
        print('##############################################################################')

        ################################################################################################################

        USER_PACKAGE_JSON = {
            'name': 'project',
            'version': '1.0.0',
            'devDependencies': loadJSON(awfTempPath + os.sep + 'package.json')['devDependencies'],
        }

        ################################################################################################################

        saveJSON('package.json', USER_PACKAGE_JSON)

        ################################################################################################################

        print('##############################################################################')

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createHomePage(verbose):

    try:

        ################################################################################################################

        print('Page title:')

        try:

            TITLE = raw_input()

        except NameError as e:

            TITLE = input()

        ################################################################################################################

        print('Service URL:')

        try:

            ENDPOINT = raw_input()

        except NameError as e:

            ENDPOINT = input()

        ################################################################################################################

        TITLE    = TITLE   .strip()
        ENDPOINT = ENDPOINT.strip()

        ################################################################################################################

        saveText('index.html', AWF_HOME_PAGE_TEMPLATE.replace("{{TITLE}}", TITLE).replace("{{ENDPOINT}}", ENDPOINT if ENDPOINT else 'https://localhost:8443/AMI/FrontEnd'))

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createControl(verbose):

    try:

        ################################################################################################################

        print('Control name ([a-zA-Z][a-zA-Z0-9]*):')

        try:

            X = raw_input()

        except NameError as e:

            X = input()

        ################################################################################################################

        z = re.match('^\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*$', X)

        if not z:

            raise Exception('invalid name')

        X = z.group(1)

        name = X[0].lower() + X[1: ]
        NAME = X[0].upper() + X[1: ]

        ################################################################################################################

        if os.path.exists('controls' + os.sep + NAME):

            raise Exception('control already exists')

        ################################################################################################################

        shutil_makedirs('controls' + os.sep + NAME + os.sep + 'js', ignore_errors = False)
        saveText('controls' + os.sep + NAME + os.sep + 'js' + os.sep + NAME + 'Ctrl.js', AWF_CONTROL_JS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        shutil_makedirs('controls' + os.sep + NAME + os.sep + 'css', ignore_errors = False)
        saveText('controls' + os.sep + NAME + os.sep + 'css' + os.sep + NAME + 'Ctrl.css', AWF_CONTROL_CSS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        shutil_makedirs('controls' + os.sep + NAME + os.sep + 'twig', ignore_errors = False)
        saveText('controls' + os.sep + NAME + os.sep + 'twig' + os.sep + NAME + 'Ctrl.twig', AWF_CONTROL_TWIG_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        ################################################################################################################

        USER_CONTROLS_JSON = loadJSON('controls' + os.sep + 'CONTROLS.json')

        USER_CONTROLS_JSON[name] = {
            'clazz': NAME + 'Ctrl',
            'file': 'controls/' + NAME + '/js/' + NAME + 'Ctrl.js',
        }

        saveJSON('controls' + os.sep + 'CONTROLS.json', USER_CONTROLS_JSON)

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createSubapp(verbose):

    try:

        ################################################################################################################

        print('Subapp name ([a-zA-Z][a-zA-Z0-9]*):')

        try:

            X = raw_input()

        except NameError as e:

            X = input()

        ################################################################################################################

        z = re.match('^\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*$', X)

        if not z:

            raise Exception('invalid name')

        X = z.group(1)

        name = X[0].lower() + X[1: ]
        NAME = X[0].upper() + X[1: ]

        ################################################################################################################

        if os.path.exists('subapps' + os.sep + NAME):

            raise Exception('subapp already exists')

        ################################################################################################################

        shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'js', ignore_errors = False)
        saveText('subapps' + os.sep + NAME + os.sep + 'js' + os.sep + NAME + 'App.js', AWF_SUBAPP_JS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'css', ignore_errors = False)
        saveText('subapps' + os.sep + NAME + os.sep + 'css' + os.sep + NAME + 'App.css', AWF_SUBAPP_CSS_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        shutil_makedirs('subapps' + os.sep + NAME + os.sep + 'twig', ignore_errors = False)
        saveText('subapps' + os.sep + NAME + os.sep + 'twig' + os.sep + NAME + 'App.twig', AWF_SUBAPP_TWIG_TEMPLATE.replace("{{name}}", name).replace("{{NAME}}", NAME))

        ################################################################################################################

        USER_SUBAPPS_JSON = loadJSON('subapps' + os.sep + 'SUBAPPS.json')

        USER_SUBAPPS_JSON[name] = {
            'breadcrumb': [],
            'instance': name + 'App',
            'file': 'subapps/' + NAME + '/js/' + NAME + 'App.js',
        }

        saveJSON('subapps' + os.sep + 'SUBAPPS.json', USER_SUBAPPS_JSON)

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def lintControls(verbose):

    try:

        ################################################################################################################

        subprocess.check_call(['eslint', 'controls/**/js/*.js'])

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def lintSubapps(verbose):

    try:

        ################################################################################################################

        subprocess.check_call(['eslint', 'subapps/**/js/*.js'])

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createId():

    A =     'ABCDEF'
    B = '0123456789ABCDEF'

    print(''.join([
        random.choice(A), random.choice(B), random.choice(B), random.choice(B),
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        '_',
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        '_',
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        '_',
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        '_',
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
        random.choice(B), random.choice(B), random.choice(B), random.choice(B),
    ]))

    return 0

########################################################################################################################

def main():

    ####################################################################################################################

    print_logo()

    ####################################################################################################################

    parser = argparse.ArgumentParser(formatter_class = argparse.RawTextHelpFormatter, epilog = 'Authors:\n  Jerome ODIER (jerome.odier@lpsc.in2p3.fr)\n  Fabian LAMBERT (fabian.lambert@lpsc.in2p3.fr)\n  Jerome FULACHIER (jerome.fulachier@lpsc.in2p3.fr')

    parser.add_argument('--create-home-page', help = 'create a new home page', action = 'store_true')
    parser.add_argument('--create-control', help = 'create a new control', action = 'store_true')
    parser.add_argument('--create-subapp', help = 'create a new subapp', action = 'store_true')
    parser.add_argument('--lint-controls', help = 'lint controls', action = 'store_true')
    parser.add_argument('--lint-subapps', help = 'lint subapps', action = 'store_true')
    parser.add_argument('--create-id', help = 'create a new id', action = 'store_true')

    parser.add_argument('--update-prod', help = 'update AWF (prod mode)', action = 'store_true')
    parser.add_argument('--update-debug', help = 'update AWF (debud mode)', action = 'store_true')

    parser.add_argument('--git-commit-id', help = 'git commit id (default: HEAD)', type = str, default = 'HEAD')

    parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

    args = parser.parse_args()

    ####################################################################################################################

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
        return updateAWF(False, args.git_commit_id, args.verbose)

    elif args.update_debug:
        return updateAWF(True, args.git_commit_id, args.verbose)

    ####################################################################################################################

    return createId()

########################################################################################################################
# TEMPLATES                                                                                                            #
########################################################################################################################

AWF_HOME_PAGE_TEMPLATE = '''<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

		<title>{{TITLE}}</title>

		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"></link>
		<link rel="stylesheet" type="text/css" href="css/ami.min.css"></link>

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="js/ami.min.js"></script>

		<script type="text/javascript">

			amiWebApp.onRefresh = function(isAuth)
			{
				var menu =
					'<li class="nav-item">' +
					'  <a href="' + amiWebApp.webAppURL + '?subapp=userDashboard" class="nav-link">' +
					'    Dashboard' +
					'  </a>' +
					'</li>' +
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'    Search' +
					'  </a>' +
					'  <div class="dropdown-menu">' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=search">Search</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=simpleSearch">Simple Search</a>' +
					'  </div>' +
					'</li>' +
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
					'    Tools' +
					'  </a>' +
					'  <div class="dropdown-menu">' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=command">Command</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=emergency">Emergency</a>' +
					'    <div class="dropdown-divider"></div>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=schemaViewer">Schema Viewer</a>' +
					'    <div class="dropdown-divider"></div>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=api.html">AMI Web Framework API</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=document&userdata=info.html">AMI Web Framework Info</a>' +
					'  </div>' +
					'</li>'
				;

				if(amiLogin.hasRole('AMI_ADMIN'))
				{
					menu +=
						'<li class="nav-item dropdown">' +
						'  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">' +
						'    <i class="fa fa-key"></i> Admin' +
						'  </a>' +
						'  <div class="dropdown-menu">' +
						'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=adminDashboard">Admin Dashboard</a>' +
						'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=searchModeler">Search Modeler</a>' +
						'  </div>' +
						'</li>'
					;
				}

				$('#ami_main_menu_content').html(menu);
			};

			amiWebApp.onReady = function()
			{
				return amiWebApp.loadSubAppByURL('document');
			};

		</script>
	</head>
	<body>

		<script type="text/javascript">

			var subapp = amiWebApp.args['subapp'];

			var theme_url = !subapp || subapp.toLowerCase() !== 'userdashboard' ? 'twig/AMI/Theme/blue.twig'
					                                                            : 'twig/AMI/Theme/cloud.twig'
			;

			amiWebApp.start({
				theme_url: theme_url,
				endpoint_url: '{{ENDPOINT}}',
			});

		</script>

	</body>
</html>
'''

########################################################################################################################

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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}Ctrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/{{NAME}}/css/{{NAME}}Ctrl.css',
			amiWebApp.originURL + '/controls/{{NAME}}/twig/{{NAME}}Ctrl.twig',
		], {context: this}).done(function(data) {

			/* TODO */
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

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

########################################################################################################################

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

<div>{{NAME}}</div>'''

########################################################################################################################

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

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

var {{name}}App = new {{NAME}}App();

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

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

########################################################################################################################

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

<div>{{NAME}}</div>'''

########################################################################################################################
# MAIN                                                                                                                 #
########################################################################################################################

if __name__ == '__main__':

    sys.exit(main())

########################################################################################################################
