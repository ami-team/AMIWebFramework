#!/usr/bin/env python3
# -*- coding:utf-8 -*-
########################################################################################################################
# Author : Jerome ODIER
# Email : jerome.odier@lpsc.in2p3.fr
#
# AMI Web Framework
#
# Copyright (c) 2014-2025 The AMI Team, CNRS/LPSC
#
# This file must be used under the terms of the CeCILL-C:
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
########################################################################################################################

AWF_SRC_GIT_URL = 'https://gitlab.in2p3.fr/ami-team/AMIWebFramework.git'

AWF_DIST_GIT_URL = 'https://github.com/ami-team/awf-dist.git'

########################################################################################################################

import os, re, sys, glob, json, zlib, base64, random, shutil, hashlib, argparse, datetime, subprocess, platform

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

	if not ignore_errors \
		or \
		not os.path.isdir(path):

		os.makedirs(path)

########################################################################################################################

def gitClone(tempPath, url, commit_id, retry = True):

	####################################################################################################################
	# CLONE REPOSITORY                                                                                                 #
	####################################################################################################################

	if not os.path.isdir(tempPath):

		################################################################################################################

		L = []

		if 'AWF_GIT_USERNAME' in os.environ:

			L.append(os.environ['AWF_GIT_USERNAME'])

			if 'AWF_GIT_PASSWORD' in os.environ:

				L.append(os.environ['AWF_GIT_PASSWORD'])

		if len(L) > 0:

			url = url.replace('https://', 'https://{}@'.format(':'.join(L)))

		################################################################################################################

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

		return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'], cwd = tempPath).decode('utf-8').strip()

	################################################################################################################

	except Exception as e:

		################################################################################################################

		if retry:

			print('Trying re-cloning...')

			shutil.rmtree(tempPath, ignore_errors = True)

			return gitClone(tempPath, url, commit_id, retry = False)

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

	with open(fileName, mode = 'rt', encoding = 'utf-8') as f:
		txt = f.read()

	txt = txt.replace(oldStr, newStr, 1)

	with open(fileName, mode = 'wt', encoding = 'utf-8') as f:
		f.write(txt)

########################################################################################################################

def loadJSON(fileName):

	print('Loading `%s`...' % fileName)

	try:

		with open(fileName, mode = 'rt', encoding = 'utf-8') as f:

			return json.load(f)

	except:

		return {}

########################################################################################################################

def saveJSON(fileName, data):

	print('Saving `%s`...' % fileName)

	with open(fileName, mode = 'wt', encoding = 'utf-8') as f:

		f.write(json.dumps(data, indent = 4, sort_keys = True))

########################################################################################################################

def loadText(fileName):

	print('Loading `%s`...' % fileName)

	try:

		with open(fileName, mode = 'rt', encoding = 'utf-8') as f:

			return f.read()

	except:

		return ''

########################################################################################################################

def saveText(fileName, data):

	print('Saving `%s`...' % fileName)

	with open(fileName, mode = 'wt', encoding = 'utf-8') as f:

		f.write(data)

########################################################################################################################

def updateWebpack(configFile):
	"""
	Automatically generates webpack.config.js by detecting:
	- Standard controls (*.es6.js)
	- Vue.js controls (index.js with .vue files)
	- Standard subapps (*.es6.js)
	- Vue.js subapps (index.js with .vue files)
	"""


	entries = []
	vue_controls = []

	####################################################################################################################
	# CONTROLS - AUTOMATIC TYPE DETECTION
	#####################################################################################################################

	for control_dir in sorted(glob.glob('controls/*/', recursive=False)):
		if platform.system() == 'Windows':
			control_dir = control_dir.replace('\\', '/')

		control_name = os.path.basename(os.path.normpath(control_dir))

		# Checks if it is a Vue.js control (presence of index.js AND .vue files)
		index_js = os.path.join(control_dir, 'index.js')
		has_vue_files = len(glob.glob(os.path.join(control_dir, '**/*.vue'), recursive=True)) > 0

		if os.path.exists(index_js) and has_vue_files:
			# CONTROL VUE.JS
			entries.append('\t\t\'controls/%s/%sCtrl\': path.resolve(__dirname, \'%s\')' % (
				control_name,
				control_name,
				index_js.replace('\\', '/')
			))
			vue_controls.append(control_name)
		else:
			# CONTROL CLASSIC (.es6.js)
			for path in sorted(glob.glob(os.path.join(control_dir, '*.es6.js'))):
				if platform.system() == 'Windows':
					path = path.replace('\\', '/')
				entries.append('\t\t\'%s\': path.resolve(__dirname, \'%s\')' % (
					path.replace('.es6.js', ''),
					path
				))

	####################################################################################################################
	# SUBAPPS - AUTOMATIC TYPE DETECTION
	####################################################################################################################

	for subapp_dir in sorted(glob.glob('subapps/*/', recursive=False)):
		if platform.system() == 'Windows':
			subapp_dir = subapp_dir.replace('\\', '/')

		subapp_name = os.path.basename(os.path.normpath(subapp_dir))

		# Checks if it is a Vue.js subapp (presence of index.js AND .vue files)
		index_js = os.path.join(subapp_dir, 'index.js')
		has_vue_files = len(glob.glob(os.path.join(subapp_dir, '**/*.vue'), recursive=True)) > 0

		if os.path.exists(index_js) and has_vue_files:
			# SUBAPP VUE.JS
			entries.append('\t\t\'subapps/%s/%sApp\': path.resolve(__dirname, \'%s\')' % (
				subapp_name,
				subapp_name,
				index_js.replace('\\', '/')
			))
		else:
			# SUBAPP CLASSIC (.es6.js)
			for path in sorted(glob.glob(os.path.join(subapp_dir, '*.es6.js'))):
				if platform.system() == 'Windows':
					path = path.replace('\\', '/')
				entries.append('\t\t\'%s\': path.resolve(__dirname, \'%s\')' % (
					path.replace('.es6.js', ''),
					path
				))

	####################################################################################################################
	# WEBPACK CONFIG GENERATION
	####################################################################################################################

	ami_plugins = []

	# Uses the updated template
	config_content = AWF_WEBPACK_CONFIG_TEMPLATE % (
		',\n'.join(entries),  # Entries
		',\n'.join(ami_plugins) if ami_plugins else '\t\t// No specific plugins needed'
	)

	saveText(configFile, config_content)

	# Display a summary
	if vue_controls:
		print('Vue.js controls detected:', ', '.join(vue_controls))

########################################################################################################################

def updateAWF(awfGITCommitId, inDebugMode, buildDist, verbose, configFile = './webpack.config.js'):

	####################################################################################################################

	baseTempPath = os.path.join(os.path.expanduser('~'), '.awf-cache', hashlib.md5(os.path.realpath(__file__).encode()).hexdigest()[0: 8])

	####################################################################################################################

	currentYear = datetime.datetime.today().strftime('%Y')

	####################################################################################################################

	ignore = [
		'*~', '.DS_Store', '.DS_Store?',
		'/webpack.config.js', '/node_modules', '/package-lock.json',
		'/.settings', '/.idea', '/*.iml',
	]

	if not buildDist:

		ignore.extend(['/docs/api.html', '/docs/info.html', '/js', '/twig'])

	####################################################################################################################

	try:

		################################################################################################################
		################################################################################################################
		################################################################################################################

		print('##############################################################################')
		print('# DOWNLOADING AWF...                                                         #')
		print('##############################################################################')

		################################################################################################################

		print('Package `%s`:' % 'AWF')

		if buildDist:

			awfTempPath = os.path.join(baseTempPath, 'awf-src')
			awfGITCommitId = gitClone(awfTempPath, AWF_SRC_GIT_URL, awfGITCommitId)

		else:

			awfTempPath = os.path.join(baseTempPath, 'awf-dist')
			awfGITCommitId = gitClone(awfTempPath, AWF_DIST_GIT_URL, awfGITCommitId)

		print('-> using git release id: %s' % awfGITCommitId)

		################################################################################################################

		if buildDist:

			print('##############################################################################')
			print('# COMPILING AWF CORE...                                                      #')
			print('##############################################################################')

			build(inDebugMode, verbose, './webpack-core.config.js', awfTempPath)

			print('##############################################################################')
			print('# COMPILING AWF CONTROLS AND SUBAPPS...                                      #')
			print('##############################################################################')

			build(inDebugMode, verbose, './webpack-nocore.config.js', awfTempPath)

		################################################################################################################

		print('##############################################################################')
		print('# LOADING RESOURCES...                                                       #')
		print('##############################################################################')

		################################################################################################################

		PACKAGES = [{
			'name': 'AWF',
			'path': awfTempPath,
			'controls_json': loadJSON(os.path.join(awfTempPath,'controls', 'CONTROLS.json')),
			'subapps_json': loadJSON(os.path.join(awfTempPath, 'subapps', 'SUBAPPS.json')),
			'package_json': loadJSON(os.path.join(awfTempPath, 'package.json')),
		}]

		################################################################################################################
		################################################################################################################
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
						'package_json': loadJSON(os.path.join(packageTempPath, 'package.json')),
					})

		################################################################################################################
		################################################################################################################
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

		nb += copyFiles(awfTempPath, '.', None, '.', 'README.md', verbose, True)
		nb += copyFiles(awfTempPath, '.', None, '.', 'favicon.ico', verbose, False)
		nb += copyFiles(awfTempPath, '.', None, '.', '.editorconfig', verbose, True)
		nb += copyFiles(awfTempPath, '.', None, '.', '.eslintrc.json', verbose, True)

		nb += copyFiles(awfTempPath, '.', 'awf.py', 'tools', 'awf_stub.py', verbose, True)

		if buildDist:

			nb += copyFiles(awfTempPath, 'tools', None, 'tools', 'awf_stub.py', verbose, True)

			replaceStrInFile(os.path.join('tools', 'awf_stub.py'), '{{CURRENT_YEAR}}', currentYear)

			saveText(os.path.join('tools', 'awf.img'), base64.b64encode(zlib.compress(loadText(os.path.join(awfTempPath, 'tools', 'awf_tool.py')).encode('utf-8'))).decode('utf-8'))

		print('-> %d files copied.' % nb)

		################################################################################################################

		if not buildDist:

			if inDebugMode:

				shutil.move(os.path.join('js', 'ami.js'), os.path.join('js', 'ami.min.js'))

			else:

				os.remove(os.path.join('js', 'ami.js'))

		################################################################################################################

		replaceStrInFile(os.path.join('.', 'awf.py'), '{{CURRENT_YEAR}}', currentYear)

		replaceStrInFile(os.path.join('js', 'ami.min.js'), '{{AMI_COMMIT_ID}}', awfGITCommitId)

		################################################################################################################
		################################################################################################################
		################################################################################################################

		print('##############################################################################')
		print('# INSTALLING AWF CONTROLS...                                                 #')
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

				m = re.search('controls/([a-zA-Z0-9_.]+)/([a-zA-Z0-9_.]+.js)$', JS)

				if m is not None:

					nb += copyFiles(package['path'], os.path.join('controls', m.group(1), 'assets', 'wasm'), None, os.path.join('controls', m.group(1), 'assets', 'wasm'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('controls', m.group(1), 'assets', 'fonts'), None, os.path.join('controls', m.group(1), 'assets', 'fonts'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('controls', m.group(1), 'assets', 'images'), None, os.path.join('controls', m.group(1), 'assets', 'images'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('controls', m.group(1), 'assets', 'js', 'chunks'), None, os.path.join('controls', m.group(1), 'assets', 'js', 'chunks'), '*', verbose)

					nb += copyFiles(package['path'], os.path.join('controls', m.group(1)), None, os.path.join('controls', m.group(1)), m.group(2), verbose)

					if not buildDist:

						ignore.append('/controls/' + m.group(1))

			########################################################################################################

			print('-> %d files copied.' % nb)

		################################################################################################################

		saveJSON(os.path.join('controls', 'CONTROLS.json'), USER_CONTROLS_JSON)

		################################################################################################################
		################################################################################################################
		################################################################################################################

		print('##############################################################################')
		print('# INSTALLING AWF SUBAPPS...                                                  #')
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

				m = re.search('subapps/([a-zA-Z0-9_.]+)/([a-zA-Z0-9_.]+.js)$', JS)

				if m is not None:

					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1), 'assets', 'ext'), None, os.path.join('subapps', m.group(1), 'assets', 'ext'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1), 'assets', 'wasm'), None, os.path.join('subapps', m.group(1), 'assets', 'wasm'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1), 'assets', 'fonts'), None, os.path.join('subapps', m.group(1), 'assets', 'fonts'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1), 'assets', 'images'), None, os.path.join('subapps', m.group(1), 'assets', 'images'), '*', verbose)
					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1), 'assets', 'js', 'chunks'), None, os.path.join('subapps', m.group(1), 'assets', 'js', 'chunks'), '*', verbose)

					nb += copyFiles(package['path'], os.path.join('subapps', m.group(1)), None, os.path.join('subapps', m.group(1)), m.group(2), verbose)

					if not buildDist:

						ignore.append('/subapps/' + m.group(1))

			########################################################################################################

			print('-> %d files copied.' % nb)

		################################################################################################################

		saveJSON(os.path.join('subapps', 'SUBAPPS.json'), USER_SUBAPPS_JSON)

		################################################################################################################
		################################################################################################################
		################################################################################################################

		print('##############################################################################')
		print('# GENERATING `package.json`...                                               #')
		print('##############################################################################')

		################################################################################################################

		USER_PACKAGE_JSON = loadJSON('package.json') if not buildDist and os.path.isfile('package.json') else {
			"name": "awf_project",
			"version": "1.0.0",
			"description": "AWF project",
			"author": "",
			"license": "CeCILL",
			"scripts": {
				"build-dev": "npx webpack serve --mode=development",
				"build-prod": "npx webpack --mode=production"
			},
			"dependencies": {
			},
			"devDependencies": {
			}
		}

		################################################################################################################

		for index, package in enumerate(PACKAGES):

			json = package['package_json']

			if index > 0:
				if 'dependencies' in json:
					USER_PACKAGE_JSON['dependencies'].update(json['dependencies'])

			else:
				if 'devDependencies' in json:
					USER_PACKAGE_JSON['devDependencies'] = dict(json['devDependencies'])

		################################################################################################################

		saveJSON('package.json', USER_PACKAGE_JSON)

		################################################################################################################
		################################################################################################################
		################################################################################################################

		if not buildDist:

			############################################################################################################

			print('##############################################################################')
			print('# GENERATING `webpack.config.js`...                                          #')
			print('##############################################################################')

			############################################################################################################

			updateWebpack(configFile)

		################################################################################################################
		################################################################################################################
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

def createHomePage(verbose, bootstrapVersion, title = None, endpoint = None):

	try:

		################################################################################################################

		if title is None:

			print('Page title:')

			TITLE = input()

		else:

			TITLE = title

		################################################################################################################

		if endpoint is None:

			print('Service URL:')

			ENDPOINT = input()

		else:

			ENDPOINT = endpoint

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

def createControl(verbose, sourceCodeFlavour, configFile = './webpack.config.js'):

	try:
		print('Control name ([a-zA-Z][a-zA-Z0-9]*):')
		X = input()

		z = re.match('^\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*$', X)
		if not z:
			raise Exception('invalid name')

		X = z.group(1)
		name = X[0].lower() + X[1:]
		NAME = X[0].upper() + X[1:]

		if os.path.exists(os.path.join('controls', NAME)):
			raise Exception('control already exists')

		################################################################################################################
		# CONTROL VUE.JS
		################################################################################################################

		if sourceCodeFlavour == 'vue3':
			shutil_makedirs(os.path.join('controls', NAME, 'assets', 'css'), ignore_errors=False)

			# index.js (entry webpack)
			saveText(
				os.path.join('controls', NAME, 'index.js'),
				AWF_CONTROL_VUE_INDEX_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# Main file .es6.js (control's logic)
			saveText(
				os.path.join('controls', NAME, NAME + 'Ctrl.es6.js'),
				AWF_CONTROL_JS_VUE_JS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# Vue Component
			saveText(
				os.path.join('controls', NAME, NAME + 'View.vue'),
				AWF_CONTROL_VUE_COMPONENT_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# CSS
			saveText(
				os.path.join('controls', NAME, 'assets', 'css', NAME + 'Ctrl.css'),
				AWF_CONTROL_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

		################################################################################################################
		# CONTROLS CLASSICS
		################################################################################################################

		else:
			if sourceCodeFlavour == 'legacy':
				XXX_CONTROL_JS_TEMPLATE = AWF_CONTROL_JS_ES5_TEMPLATE
			elif sourceCodeFlavour == 'module':
				XXX_CONTROL_JS_TEMPLATE = AWF_CONTROL_JS_MODULE_TEMPLATE
			else:
				raise Exception('internal error')

			shutil_makedirs(os.path.join('controls', NAME, 'assets', 'css'), ignore_errors=False)
			shutil_makedirs(os.path.join('controls', NAME, 'assets', 'twig'), ignore_errors=False)

			saveText(
				os.path.join('controls', NAME, NAME + 'Ctrl.es6.js'),
				XXX_CONTROL_JS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			saveText(
				os.path.join('controls', NAME, 'assets', 'css', NAME + 'Ctrl.css'),
				AWF_CONTROL_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			saveText(
				os.path.join('controls', NAME, 'assets', 'twig', NAME + 'Ctrl.twig'),
				AWF_CONTROL_TWIG_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

		################################################################################################################
		# UPDATE FILE CONTROLS.json
		################################################################################################################

		USER_CONTROLS_JSON = loadJSON(os.path.join('controls', 'CONTROLS.json'))

		USER_CONTROLS_JSON[name] = {
			'clazz': NAME + 'Ctrl',
			'file': 'controls/' + NAME + '/' + NAME + 'Ctrl.min.js',
		}

		saveJSON(os.path.join('controls', 'CONTROLS.json'), USER_CONTROLS_JSON)

		################################################################################################################
		# UPDATE WEBPACK
		################################################################################################################

		updateWebpack(configFile)

		return 0

	except Exception as e:

		print('error: %s' % e)
		return 1

########################################################################################################################

def createSubapp(verbose, sourceCodeFlavour, configFile = './webpack.config.js'):
	try:
		print('Subapp name ([a-zA-Z][a-zA-Z0-9]*):')
		X = input()

		z = re.match('^\\s*([a-zA-Z][a-zA-Z0-9]*)\\s*$', X)
		if not z:
			raise Exception('invalid name')

		X = z.group(1)
		name = X[0].lower() + X[1:]
		NAME = X[0].upper() + X[1:]

		if os.path.exists(os.path.join('subapps', NAME)):
			raise Exception('subapp already exists')

		################################################################################################################
		# SUBAPP VUE.JS
		################################################################################################################

		if sourceCodeFlavour == 'vue3':
			shutil_makedirs(os.path.join('subapps', NAME, 'assets', 'css'), ignore_errors=False)

			# index.js
			saveText(
				os.path.join('subapps', NAME, 'index.js'),
				AWF_SUBAPP_VUE_INDEX_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# Main File
			saveText(
				os.path.join('subapps', NAME, NAME+'App.js'),
				AWF_SUBAPP_VUE_PLUGIN_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# Vue component
			saveText(
				os.path.join('subapps', NAME, NAME + 'View.vue'),
				AWF_SUBAPP_VUE_COMPONENT_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			# CSS
			saveText(
				os.path.join('subapps', NAME, 'assets', 'css', NAME + 'App.css'),
				AWF_SUBAPP_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

		################################################################################################################
		# SUBAPPS CLASSIQUES (legacy ou module)
		################################################################################################################

		else:
			if sourceCodeFlavour == 'legacy':
				XXX_SUBAPP_JS_TEMPLATE = AWF_SUBAPP_JS_ES5_TEMPLATE
			elif sourceCodeFlavour == 'module':
				XXX_SUBAPP_JS_TEMPLATE = AWF_SUBAPP_JS_MODULE_TEMPLATE
			else:
				raise Exception('internal error')

			shutil_makedirs(os.path.join('subapps', NAME, 'assets', 'css'), ignore_errors=False)
			shutil_makedirs(os.path.join('subapps', NAME, 'assets', 'twig'), ignore_errors=False)

			saveText(
				os.path.join('subapps', NAME, NAME + 'App.es6.js'),
				XXX_SUBAPP_JS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			saveText(
				os.path.join('subapps', NAME, 'assets', 'css', NAME + 'App.css'),
				AWF_SUBAPP_CSS_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

			saveText(
				os.path.join('subapps', NAME, 'assets', 'twig', NAME + 'App.twig'),
				AWF_SUBAPP_TWIG_TEMPLATE.replace('{{name}}', name).replace('{{NAME}}', NAME)
			)

		################################################################################################################
		# Update SUBAPPS.json
		################################################################################################################

		USER_SUBAPPS_JSON = loadJSON(os.path.join('subapps', 'SUBAPPS.json'))

		js_filename = NAME + 'App.min.js'

		USER_SUBAPPS_JSON[name] = {
			'breadcrumb': [],
			'instance': name + 'App',
			'file': 'subapps/' + NAME + '/' + js_filename,
		}

		saveJSON(os.path.join('subapps', 'SUBAPPS.json'), USER_SUBAPPS_JSON)

		################################################################################################################
		# Update WEBPACK
		################################################################################################################

		updateWebpack(configFile)

		return 0

	except Exception as e:
		print('error: %s' % e)
		return 1

########################################################################################################################

def build(inDebugMode, verbose, configFile = './webpack.config.js', cwd = None):

	####################################################################################################################

	result = 0

	####################################################################################################################

	try:

		subprocess.check_call('npm install --update', shell = True, cwd = cwd)

	except Exception as e:

		print('error: %s' % e)
		result = 1

	####################################################################################################################

	try:

		subprocess.check_call(['node', './node_modules/webpack/bin/webpack.js', '--config', configFile, '--mode', 'development' if inDebugMode else 'production'], cwd = cwd)

	except Exception as e:

		print('error: %s' % e)
		result = 1

	####################################################################################################################

	return result

########################################################################################################################

def run(verbose, port = 8000):

	####################################################################################################################

	import webbrowser

	from http.server import HTTPServer

	from http.server import SimpleHTTPRequestHandler

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

	return 0

########################################################################################################################

def clean(verbose):

	path = os.path.join(os.path.expanduser('~'), '.awf-cache')

	if verbose:

		print('Removing AWF cache `%s`...' % path)

	shutil.rmtree(path, ignore_errors = True)

	return 0

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

	if sys.version_info < (3, 0):

		print('Python 2.X no longer supported')

		return 1

	####################################################################################################################

	print_logo()

	####################################################################################################################

	parser = argparse.ArgumentParser(formatter_class = argparse.RawTextHelpFormatter, epilog = 'Authors:\n  Jerome ODIER (jerome.odier@lpsc.in2p3.fr)\n  Fabian LAMBERT (fabian.lambert@lpsc.in2p3.fr)\n  Jerome FULACHIER (jerome.fulachier@lpsc.in2p3.fr')

	parser.add_argument('--create-home-page', help = 'create a new home page', action = 'store_true')

	parser.add_argument('-t', '--home-page-title', help = 'home page title (default: None)', type = str, default = None)
	parser.add_argument('-p', '--home-page-endpoint', help = 'home page endpoint (default: None)', type = str, default = None)

	parser.add_argument('--create-control', help = 'create a new control', action = 'store_true')
	parser.add_argument('--create-subapp', help = 'create a new subapp', action = 'store_true')

	parser.add_argument('-v', '--bootstrap-version', help = 'bootstrap version (default: 5)', type = int, choices = [4, 5], default = 5)
	parser.add_argument('-f', '--source-code-flavour', help = 'source code flavour (default module)', type = str, choices = ['legacy', 'module', 'vue3'], default = 'module')

	parser.add_argument('-r', '--run', help = 'run a web server', action = 'store_true')

	parser.add_argument('-b', '--build-prod', help = 'build JS bundles (prod mode)', action = 'store_true')
	parser.add_argument('-d', '--build-debug', help = 'build JS bundles (debug mode)', action = 'store_true')

	parser.add_argument('-u', '--update-prod', help = 'update AWF (prod mode)', action = 'store_true')
	parser.add_argument('-D', '--update-debug', help = 'update AWF (debug mode)', action = 'store_true')

	parser.add_argument('--git-commit-id', help = 'git commit id (default: HEAD)', type = str, default = 'HEAD')

	parser.add_argument('--build-dist', help = 'build an AWF distribution', action = 'store_true')

	parser.add_argument('--clean-cache', help = 'clean the AWF cache', action = 'store_true')

	parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

	args = parser.parse_args()

	####################################################################################################################

	if   args.create_home_page:
		return createHomePage(args.verbose, args.bootstrap_version, title = args.home_page_title, endpoint = args.home_page_endpoint)

	elif args.create_control:
		return createControl(args.verbose, args.source_code_flavour)

	elif args.create_subapp:
		return createSubapp(args.verbose, args.source_code_flavour)

	elif args.run:
		return run(args.verbose)

	elif args.clean_cache:
		return clean(args.verbose)

	elif args.build_prod:
		return build(False, args.verbose)

	elif args.build_debug:
		return build(True, args.verbose)

	elif args.update_prod:
		return updateAWF(args.git_commit_id, False, args.build_dist, args.verbose)

	elif args.update_debug:
		return updateAWF(args.git_commit_id, True, args.build_dist, args.verbose)

	####################################################################################################################

	return createId()

########################################################################################################################
# NEW WEBPACK CONFIG TEMPLATE (with Vue support)
########################################################################################################################

AWF_WEBPACK_CONFIG_TEMPLATE = '''
/*!
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
	'defaults',
	'not ie 11',
	'not ie_mob 11'
];

/*--------------------------------------------------------------------------------------------------------------------*/

console.log(`Building for: ${BROWSER_LIST.join(', ')}`);

/*--------------------------------------------------------------------------------------------------------------------*/

const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const AMIWebpackPlugin = require('./AMIWebpackPlugin.js');

/*--------------------------------------------------------------------------------------------------------------------*/

function getResourceDirectory(filename)
{
	switch(path.extname(filename))
	{
		case '.gif':
		case '.png':
		case '.jpg':
		case '.jpeg':
		case '.svg':
			return 'images';

		case '.wasm':
			return 'wasm';

		default:
			return 'others';
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

const config = {
	'entry': {
%s
	},
	'output': {
		'filename': '[name].min.js',
		'path': path.resolve(__dirname),
		'chunkFilename': (pathData) => path.join(path.dirname(pathData.runtime || pathData.chunk.runtime), 'assets', 'js', 'chunks', '[id].min.js'),
		'assetModuleFilename': (pathData) => path.join(path.dirname(pathData.runtime), 'assets', getResourceDirectory(pathData.filename), '[hash][ext][query]'),
	},
	'devServer': {
		'static': {
			'directory': path.join(__dirname, './'),
		}
	},
	'module': {
		'rules': [
			/*--------------------------------------------------------------------------------------------------------*/

			{
				'test': /\\.js$/,
				'use': {
					'loader': 'babel-loader',
					'options': {
						'shouldPrintComment': () => false,
						'plugins': [
							['@babel/plugin-transform-for-of', {
								'loose': true
							}]
						],
						'presets': [
							['@babel/preset-env', {
								'loose': true,
								'targets': BROWSER_LIST
							}]
						]
					}
				}
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\\.twig$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/source',
				'test': /\\.(json|yml|xml)$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/resource',
				'test': /\\.wasm$/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				'type': 'asset/resource',
				'test': /\\.(gif|png|jpg|jpeg|svg)$/,
				'exclude': /node_modules/
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\\.css$/,
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
			},

			/*--------------------------------------------------------------------------------------------------------*/

			{
				test: /\\.vue$/,
				loader: 'vue-loader'
			}

			/*--------------------------------------------------------------------------------------------------------*/
		]
	},
	'externals': {
		'jquery': 'jQuery',
		'moment': 'moment',
		'select2': 'select2'
	},
	'plugins': [
		new ESLintPlugin({
			'failOnWarning': true
		}),
		new VueLoaderPlugin(),
%s
	],
	'optimization': {
		'minimizer': [
			new TerserPlugin({
				'test': /\\.min\\.js$/,
				'parallel': true,
				'extractComments': () => false,
				'terserOptions': {
					'mangle': true
				}
			})
		]
	},
	'performance' : {
		'hints': false
	},
	resolve: {
		extensions: ['.js', '.vue']
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = config;

/*--------------------------------------------------------------------------------------------------------------------*/
'''[1: ]

########################################################################################################################
# TEMPLATES FOR VUE SUBAPPS & CONTROLS
########################################################################################################################

AWF_SUBAPP_VUE_INDEX_TEMPLATE = '''
/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

import {{NAME}}App from './{{NAME}}App.js';

window.{{name}}App = new {{NAME}}App();

/*--------------------------------------------------------------------------------------------------------------------*/
'''[1: ]

########################################################################################################################

AWF_SUBAPP_VUE_PLUGIN_TEMPLATE = '''
/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

import {createApp, nextTick} from 'vue';

import {{NAME}}View from './{{NAME}}View.vue';

import AMIVueWrapperCtrl from '../../controls/AMIVueWrapper/index.js';

/*--------------------------------------------------------------------------------------------------------------------*/

export default class {{NAME}}App extends ami.SubApp
{
	/*----------------------------------------------------------------------------------------------------------------*/

	$init()
	{
		super.$init();

		this.vueApp = null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady(userdata)
	{
		const result = $.Deferred();

		this.vueApp = createApp({{NAME}}View);

		this.vueApp.component('AMIVueWrapper', AMIVueWrapperCtrl);

		this.vueApp.mount('#ami_main_content');

		nextTick(() => {

			result.resolveWith(result);
		})

		/* Use either nextTick OR create control, not both of them at the same time
			And replace 'ControlName' by the actual name of your control 2x
		this.createControl(null, 'ControlName', []).done((ctrl) => {

			this.ctrl = ctrl;

			this.ctrl.render('#ControlNameSlot', {
				initialTitle: 'Affiché depuis subapp'
			}).done(() => {
				result.resolve();
			});
		}).fail(result.reject);
		*/

		return result;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onExit()
	{
		this.vueApp?.unmount();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogin()
	{
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onLogout()
	{
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
'''[1: ]

########################################################################################################################

AWF_SUBAPP_VUE_COMPONENT_TEMPLATE = '''
<!--!
* AMI Web Framework
*
* Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
*
* This file must be used under the terms of the CeCILL-C:
* http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
* http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
*
-->
<script>
/*--------------------------------------------------------------------------------------------------------------------*/

import { onMounted, ref } from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/

export default {
	name: '{{NAME}}',
	setup() {
		const title = ref('{{NAME}}');

		return {
			title
		};

		onMounted(() => {

		});
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------------------*/
</script>

/*--------------------------------------------------------------------------------------------------------------------*/

<template>
	<!-- *********************************************************************************************************** -->

	<div class="container mt-5">
		<h1>{{ title }}</h1>

		<!-- To add a control, remove comment and replace 'ControlName' by the actual name of the control
		<div id="ControlerNameSlot" class="mt-5"></div>
		-->
	</div>

	<!-- *********************************************************************************************************** -->
</template>

<style scoped>
/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/

</style>
'''[1: ]

########################################################################################################################

AWF_CONTROL_VUE_INDEX_TEMPLATE = '''
/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

import {{NAME}}Ctrl from './{{NAME}}Ctrl.es6.js';

window.{{NAME}}Ctrl = {{NAME}}Ctrl;

export default {{NAME}}Ctrl;

/*--------------------------------------------------------------------------------------------------------------------*/
'''[1: ]

########################################################################################################################

AWF_CONTROL_JS_VUE_JS_TEMPLATE = '''
/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

import {createApp, nextTick} from 'vue';

import './assets/css/{{NAME}}Ctrl.css';

import {{NAME}}Component from './{{NAME}}View.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

export default class {{NAME}}Ctrl extends ami.Control
{

	/*----------------------------------------------------------------------------------------------------------------*/

	$init(parent, owner)
	{
		super.$init(parent, owner);
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady()
	{
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	render(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{}, {
				context: result,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.vueApp = createApp({{NAME}}Component, this.ctx	);

		this.vueApp.mount(selector);

		nextTick(()=>{
			result.resolveWith(result);
		})

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	destroy()
	{
		if(this.vueApp) {
			this.vueApp.unmount();
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
'''[1: ]

########################################################################################################################

AWF_CONTROL_VUE_COMPONENT_TEMPLATE = '''
<!--!
* AMI Web Framework
*
* Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team / LPSC / CNRS
*
* This file must be used under the terms of the CeCILL-C:
* http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
* http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
*
-->
<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, onMounted } from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const title = ref('{{NAME}} Control');

/*--------------------------------------------------------------------------------------------------------------------*/

onMounted(() => {
	console.log('{{NAME}} Control mounted');
});

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<!-- *********************************************************************************************************** -->

<template>
	<!-- *********************************************************************************************************** -->

	<div class="{{name}}-control">
		<h3>{{ title }}</h3>
		<p>This is the {{NAME}} control</p>
	</div>

	<!-- *********************************************************************************************************** -->
</template>

<!-- *********************************************************************************************************** -->

<style scoped>
.{{name}}-control {
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 4px;
}
</style>
'''[1: ]

########################################################################################################################
# Legacy / existing templates
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
						'    <i class="bi bi-key"></i> Admin' +
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

AWF_CONTROL_JS_ES5_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2025 The AMI Team / LPSC / CNRS
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
			amiWebApp.originURL + '/controls/{{NAME}}/assets/css/{{NAME}}Ctrl.css',
			amiWebApp.originURL + '/controls/{{NAME}}/assets/twig/{{NAME}}Ctrl.twig',
		]).done((data) => {

			/* TODO */
		});
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{}, {
				context: result,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(this.setSelector(selector), twig{{NAME}}Ctrl, {dict: this.ctx}).done(() => {

			result.resolveWith(this.ctx.context);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

AWF_CONTROL_JS_MODULE_TEMPLATE = '''/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2025 The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

import './assets/css/{{NAME}}Ctrl.css';

import twig{{NAME}}Ctrl from './assets/twig/{{NAME}}Ctrl.twig';

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

	render: function(selector, options)
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{}, {
				context: result,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.replaceHTML(this.setSelector(selector), twig{{NAME}}Ctrl, {dict: this.ctx}).done(() => {

			result.resolveWith(this.ctx.context);
		});

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	},

	/*----------------------------------------------------------------------------------------------------------------*/
});

/*--------------------------------------------------------------------------------------------------------------------*/
'''

AWF_CONTROL_CSS_TEMPLATE = '''/* {{NAME}}Ctrl.css */
'''

AWF_CONTROL_TWIG_TEMPLATE = '''<div>{{NAME}}</div>
'''

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

	$init: function()
	{
		this.$super.$init();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		const result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/{{NAME}}/assets/css/{{NAME}}App.css',
			'subapps/{{NAME}}/assets/twig/{{NAME}}App.twig',
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

import './assets/css/{{NAME}}App.css';

import twig{{NAME}}App from './assets/twig/{{NAME}}App.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

$AMIClass('{{NAME}}App', {
	/*----------------------------------------------------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function()
	{
		this.$super.$init();
	},

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

AWF_SUBAPP_CSS_TEMPLATE = '''/* {{NAME}}App.css */
'''

AWF_SUBAPP_TWIG_TEMPLATE = '''<div class="m-3">{{NAME}}</div>
'''

########################################################################################################################
# MAIN
########################################################################################################################

if __name__ == '__main__':

	sys.exit(main())

########################################################################################################################
