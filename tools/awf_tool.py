#!/usr/bin/env python3
# -*- coding:utf-8 -*-
########################################################################################################################
# Author : Jerome ODIER
# Email : jerome.odier@lpsc.in2p3.fr
#
# AMI Web Framework
#
# Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
#
# This file must be used under the terms of the CeCILL-C:
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
########################################################################################################################

AWF_GIT_URL = 'https://github.com/ami-team/awfwebpack.git'

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

    for SRC in glob.glob(os.path.join(tempPath, srcDir, srcName)):

        ################################################################################################################

        DST = os.path.join(dstDir, SRC[idx: ])

        DSTDir = os.path.dirname(DST)

        ################################################################################################################

        if dstName is not None:

            DST = os.path.join(DSTDir, dstName)

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

def updateWebpack():

    ####################################################################################################################

    entries = []

    ####################################################################################################################

    for path in glob.glob('controls/**/*.es6.js', recursive = True):

        entries.append('\t\t\'%s\': path.resolve(__dirname, \'%s\')' % (path.replace('.es6.js', ''), path))

    ####################################################################################################################

    for path in glob.glob('subapps/**/*.es6.js', recursive = True):

        entries.append('\t\t\'%s\': path.resolve(__dirname, \'%s\')' % (path.replace('.es6.js', ''), path))

    ####################################################################################################################

    saveText('webpack.config.js', AWT_WEBPACK_CONFIG_TEMPLATE % ',\n'.join(entries))

########################################################################################################################

def updateAWF(inDebugMode, awfGITCommitId, verbose):

    ignore = [
        '*~', '.DS_Store', '.DS_Store?',
        '/docs/api.html', '/docs/info.html', '/js', '/twig',
        '/Gruntfile.js', '/node_modules', '/package-lock.json', '/package.json',
        '/.eslintrc.json', '/.settings', '/.idea', '/*.iml',
    ]

    baseTempPath = os.path.join(os.path.expanduser('~'), '.awf-cache')

    try:

        ################################################################################################################

        print('##############################################################################')
        print('# DOWNLOADING AWF...                                                         #')
        print('##############################################################################')

        ################################################################################################################

        print('Package `%s`:' % 'AWF')

        awfTempPath = os.path.join(baseTempPath, 'awf')

        awfGITCommitId = gitClone(awfTempPath, AWF_GIT_URL, awfGITCommitId)

        print('-> using git release id: %s' % awfGITCommitId)

        ################################################################################################################

        PACKAGES = [{
            'name': 'AWF',
            'path': awfTempPath,
            'controls_json': loadJSON(os.path.join(awfTempPath,'controls', 'CONTROLS.json')),
            'subapps_json': loadJSON(os.path.join(awfTempPath, 'subapps', 'SUBAPPS.json')),
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

                    packageTempPath = os.path.join(baseTempPath, package['name'].lower())

                    packageGITCommitId = gitClone(packageTempPath, package['url'], package['commit_id'] if 'commit_id' in package else 'HEAD')

                    print('-> using git release id: %s' % packageGITCommitId)

                    ####################################################################################################

                    PACKAGES.append({
                        'name': package['name'],
                        'path': packageTempPath,
                        'controls_json': loadJSON(os.path.join(packageTempPath, 'controls', 'CONTROLS.json')),
                        'subapps_json': loadJSON(os.path.join(packageTempPath, 'subapps', 'SUBAPPS.json')),
                    })

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING AWF CORE FILES...                                               #')
        print('##############################################################################')

        ################################################################################################################

        nb = 0

        print('Copying files...')

        nb += copyFiles(awfTempPath, 'js', None, 'js', '*', verbose, True)
        nb += copyFiles(awfTempPath, 'docs', None, 'docs', '*', verbose, False)
        nb += copyFiles(awfTempPath, 'twig', None, 'twig', '*', verbose, True)

        nb += copyFiles(awfTempPath, '.', None, '.', 'favicon.ico', verbose, False)
        nb += copyFiles(awfTempPath, '.', None, '.', '.eslintrc.json', verbose, True)

        #nb += copyFiles(awfTempPath, '.', 'awf.py', 'tools', 'awf_stub.py', verbose, True)

        nb += copyFiles(awfTempPath, '.', 'package.json', 'tools', 'package.json', verbose, True)

        print('-> %d files copied.' % nb)

        ################################################################################################################

        if inDebugMode:

            shutil.move(os.path.join('js', 'ami.js'), os.path.join('js', 'ami.min.js'))

        else:

            os.remove(os.path.join('js', 'ami.js'))

        ################################################################################################################

        replaceStrInFile(os.path.join('js', 'ami.min.js'), '{{AMI_COMMIT_ID}}', awfGITCommitId)

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING CONTROLS...                                                     #')
        print('##############################################################################')

        ################################################################################################################

        USER_CONTROLS_JSON = loadJSON(os.path.join('controls', 'CONTROLS.json'))

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

        saveJSON(os.path.join('controls', 'CONTROLS.json'), USER_CONTROLS_JSON)

        ################################################################################################################

        print('##############################################################################')
        print('# INSTALLING SUBAPPS...                                                      #')
        print('##############################################################################')

        ################################################################################################################

        USER_SUBAPPS_JSON = loadJSON(os.path.join('subapps', 'SUBAPPS.json'))

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

        saveJSON(os.path.join('subapps', 'SUBAPPS.json'), USER_SUBAPPS_JSON)

        ################################################################################################################

        print('##############################################################################')
        print('# GENERATING `webpack.config.js`...                                          #')
        print('##############################################################################')

        ################################################################################################################

        updateWebpack()

        ################################################################################################################

        print('##############################################################################')
        print('# GENERATING `.gitignore`...                                                 #')
        print('##############################################################################')

        ################################################################################################################

        saveText('.gitignore', '\n'.join(ignore))

        ################################################################################################################

        print('##############################################################################')

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createHomePage(verbose, bootstrapVersion):

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

        saveText('index.html', AWF_HOME_PAGE_TEMPLATE.replace('{{BOOTSTRAP_VERSION}}', '%d' % bootstrapVersion).replace('{{TITLE}}', TITLE).replace('{{DATA}}', 'data-bs' if bootstrapVersion > 4 else 'data').replace('{{ENDPOINT}}', ENDPOINT if ENDPOINT else 'https://localhost:8443/AMI/FrontEnd'))

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createControl(verbose, sourceCodeFlavour):
    print(sourceCodeFlavour)
    return
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

        if os.path.exists(os.path.join('controls', NAME)):

            raise Exception('control already exists')

        ################################################################################################################

        if   sourceCodeFlavour == 'es5':
            XXX_CONTROL_JS_TEMPLATE = AWF_CONTROL_JS_ES5_TEMPLATE

        elif sourceCodeFlavour == 'modern':
            XXX_CONTROL_JS_TEMPLATE = AWF_CONTROL_JS_MODULE_TEMPLATE

        elif sourceCodeFlavour == 'vue-js':
            XXX_CONTROL_JS_TEMPLATE = AWF_CONTROL_JS_VUE_JS_TEMPLATE

        ################################################################################################################

        shutil_makedirs(os.path.join('controls', NAME, 'assets', 'css'), ignore_errors = False)
        shutil_makedirs(os.path.join('controls', NAME, 'assets', 'twig'), ignore_errors = False)

        saveText(os.path.join('controls', NAME, NAME + 'Ctrl.es6.js'), XXX_CONTROL_JS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        saveText(os.path.join('controls', NAME, 'assets', 'css', NAME + 'Ctrl.css'), AWF_CONTROL_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        saveText(os.path.join('controls', NAME, 'assets', 'twig', NAME + 'Ctrl.twig'), AWF_CONTROL_TWIG_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        ################################################################################################################

        USER_CONTROLS_JSON = loadJSON(os.path.join('controls', 'CONTROLS.json'))

        USER_CONTROLS_JSON[name] = {
            'clazz': NAME + 'Ctrl',
            'file': 'controls/' + NAME + '/js/' + NAME + 'Ctrl.min.js',
        }

        saveJSON(os.path.join('controls', 'CONTROLS.json'), USER_CONTROLS_JSON)

        ################################################################################################################

        updateWebpack()

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def createSubapp(verbose, sourceCodeFlavour):
    print(sourceCodeFlavour)
    return
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

        if os.path.exists(os.path.join('subapps', NAME)):

            raise Exception('subapp already exists')

        ################################################################################################################

        if   sourceCodeFlavour == 'es5':
            XXX_SUBAPP_JS_TEMPLATE = AWF_SUBAPP_JS_ES5_TEMPLATE

        elif sourceCodeFlavour == 'modern':
            XXX_SUBAPP_JS_TEMPLATE = AWF_SUBAPP_JS_MODULE_TEMPLATE

        elif sourceCodeFlavour == 'vue-js':
            XXX_SUBAPP_JS_TEMPLATE = AWF_SUBAPP_JS_VUE_JS_TEMPLATE

        ################################################################################################################

        shutil_makedirs(os.path.join('subapps', NAME, 'assets', 'css'), ignore_errors = False)
        shutil_makedirs(os.path.join('subapps', NAME, 'assets', 'twig'), ignore_errors = False)

        saveText(os.path.join('subapps', NAME, NAME + 'App.es6.js'), XXX_SUBAPP_JS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        saveText(os.path.join('subapps', NAME, 'assets', 'css', NAME + 'App.css'), AWF_SUBAPP_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        saveText(os.path.join('subapps', NAME, 'assets', 'twig', NAME + 'App.twig'), AWF_SUBAPP_TWIG_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME))

        ################################################################################################################

        USER_SUBAPPS_JSON = loadJSON(os.path.join('subapps', 'SUBAPPS.json'))

        USER_SUBAPPS_JSON[name] = {
            'breadcrumb': [],
            'instance': name + 'App',
            'file': 'subapps/' + NAME + '/js/' + NAME + 'App.min.js',
        }

        saveJSON(os.path.join('subapps', 'SUBAPPS.json'), USER_SUBAPPS_JSON)

        ################################################################################################################

        updateWebpack()

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

########################################################################################################################

def run(verbose, port = 8000):

    ####################################################################################################################

    import webbrowser

    ####################################################################################################################

    try:

        from http.server import HTTPServer
        from http.server import SimpleHTTPRequestHandler

    except ImportError:

        from BaseHTTPServer import HTTPServer
        from SimpleHTTPServer import SimpleHTTPRequestHandler

    ####################################################################################################################

    url = 'http://localhost:%d/' % port

    ####################################################################################################################

    server = HTTPServer(('0.0.0.0', port), SimpleHTTPRequestHandler)

    print('%s\nUse Ctrl-C to stop this server.\n' % url)

    webbrowser.open_new_tab(url)

    try:

        server.serve_forever()

    except KeyboardInterrupt:

        print('bye.')

########################################################################################################################

def build(verbose):

    try:

        ################################################################################################################

        subprocess.check_call(['node', './node_modules/webpack/bin/webpack.js', '--mode production'])

        ################################################################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        print('Try executing `npm install`')

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

    parser.add_argument('-v', '--bootstrap-version', help = 'bootstrap version (default: 5)', type = int, default = 0x0005)
    parser.add_argument('-f', '--source-code-flavour', help = 'source code flavour (default es5)', type = str, choices = ['es5', 'modern', 'vue-js'], default = 'es5')

    parser.add_argument('-r', '--run', help = 'run a web server', action = 'store_true')
    parser.add_argument('-b', '--build', help = 'build JS bundles', action = 'store_true')

    parser.add_argument('--update-prod', help = 'update AWF (prod mode)', action = 'store_true')
    parser.add_argument('--update-debug', help = 'update AWF (debud mode)', action = 'store_true')

    parser.add_argument('--git-commit-id', help = 'git commit id (default: HEAD)', type = str, default = 'HEAD')

    parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

    args = parser.parse_args()

    ####################################################################################################################

    if   args.create_home_page:
        return createHomePage(args.verbose, args.bootstrap_version)

    elif args.create_control:
        return createControl(args.verbose, args.source_code_flavour)

    elif args.create_subapp:
        return createSubapp(args.verbose, args.source_code_flavour)

    elif args.run:
        return run(args.verbose)

    elif args.build:
        return build(args.verbose)

    elif args.update_prod:
        return updateAWF(False, args.git_commit_id, args.verbose)

    elif args.update_debug:
        return updateAWF(True, args.git_commit_id, args.verbose)

    ####################################################################################################################

    return createId()

########################################################################################################################
# WEBPACK_CONFIG                                                                                                       #
########################################################################################################################

AWT_WEBPACK_CONFIG_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

const BROWSER_LIST = [
	'>= 1%%',
	'last 1 major version',
	'not dead',
	'Chrome >= 45',
	'Firefox >= 38',
	'Edge >= 12',
	'Explorer >= 10',
	'iOS >= 9',
	'Safari >= 9',
	'Android >= 4.4',
	'Opera >= 30'
];

/*--------------------------------------------------------------------------------------------------------------------*/

console.log('Building: ' + BROWSER_LIST.join(', '));

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');
const webpack = require('webpack');

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/*--------------------------------------------------------------------------------------------------------------------*/

const config = {
	'entry': {
%s
	},
	'output': {
		'filename': '[name].min.js',
		'path': path.resolve(__dirname)
	},
	'module': {
		'rules': [
			/*--------------------------------------------------------------------------------------------------------*/

			{
				'test': /\.js$/,
				'exclude': /node_modules/,
				'use': {
					'loader': 'babel-loader',
					'options': {
						'presets': [
							['@babel/preset-env', {
								'targets': BROWSER_LIST
							}]
						]
					}
				}
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\.twig$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						'loader': 'postcss-loader',
						'options': {
							'postcssOptions': {
								'plugins': [
									['autoprefixer', {}]
								]
							}
						}
					}
				]
			}

			/*--------------------------------------------------------------------------------------------------------*/
		]
	},
	'externals': {
		'$': 'jQuery',
		'moment': 'moment',
		'select2': 'select2'
	},
	'plugins': [
		new ESLintPlugin({
			'failOnWarning': true
		})
	],
	'optimization': {
		'minimizer': [
			new TerserPlugin({
				'test': /\.min\.js$/,
				'parallel': true,
				'extractComments': () => false,
				'terserOptions': {
					'mangle': true
				}
			})
		]
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = config;

/*--------------------------------------------------------------------------------------------------------------------*/
'''

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

		<script type="text/javascript" src="js/jquery.min.js"></script>

		<script type="text/javascript" src="js/ami.min.js?bootstrap={{BOOTSTRAP_VERSION}}"></script>

		<script type="text/javascript">

			amiWebApp.onRefresh = function(isAuth)
			{
				var menu =
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" {{DATA}}-toggle="dropdown">' +
					'    Search' +
					'  </a>' +
					'  <div class="dropdown-menu">' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=search">Search</a>' +
					'    <a class="dropdown-item" href="' + amiWebApp.webAppURL + '?subapp=simpleSearch">Simple Search</a>' +
					'  </div>' +
					'</li>' +
					'<li class="nav-item dropdown">' +
					'  <a href="#" class="nav-link dropdown-toggle" {{DATA}}-toggle="dropdown">' +
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
						'  <a href="#" class="nav-link dropdown-toggle" {{DATA}}-toggle="dropdown">' +
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

			amiWebApp.start({
				endpoint_url: '{{ENDPOINT}}',
			});

		</script>

	</body>
</html>
'''

########################################################################################################################

AWF_CONTROL_JS_ES5_TEMPLATE = '''/*!
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
		]).done((data) => {

			/* TODO */
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_CONTROL_JS_MODULE_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import 'assets/css/{{NAME}}Ctrl.css';

import twig{{NAME}}Ctrl from 'assets/twig/{{NAME}}Ctrl.twig';

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

	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_CONTROL_JS_VUE_JS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import 'assets/css/{{NAME}}Ctrl.css';

import twig{{NAME}}Ctrl from 'assets/twig/{{NAME}}Ctrl.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}Ctrl', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.Control,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);

		# TODO #
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function()
	{
		# TODO #
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_CONTROL_CSS_TEMPLATE = ''''''

########################################################################################################################

AWF_CONTROL_TWIG_TEMPLATE = '''<div>{{NAME}}</div>'''

########################################################################################################################

AWF_SUBAPP_JS_ES5_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
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
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/{{NAME}}/css/{{NAME}}App.css',
			'subapps/{{NAME}}/twig/{{NAME}}App.twig',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[1]).done(() => {

				result.resolve();
			});

		}).fail((data) => {

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

window.{{name}}App = new {{NAME}}App();

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_SUBAPP_JS_MODULE_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import 'assets/css/{{NAME}}App.css';

import twig{{NAME}}App from 'assets/twig/{{NAME}}App.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.replaceHTML('#ami_main_content', twig{{NAME}}App).done(() => {

			result.resolve();
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

window.{{name}}App = new {{NAME}}App();

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_SUBAPP_JS_VUE_JS_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import 'assets/css/{{NAME}}App.css';

import twig{{NAME}}App from 'assets/twig/{{NAME}}App.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		# TODO #
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

window.{{name}}App = new {{NAME}}App();

/*--------------------------------------------------------------------------------------------------------------------*/
'''

########################################################################################################################

AWF_SUBAPP_CSS_TEMPLATE = ''''''

########################################################################################################################

AWF_SUBAPP_TWIG_TEMPLATE = '''<div class="m-3">{{NAME}}</div>'''

########################################################################################################################
# MAIN                                                                                                                 #
########################################################################################################################

if __name__ == '__main__':

    sys.exit(main())

########################################################################################################################
