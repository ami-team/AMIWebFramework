#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import (division, print_function, unicode_literals)
#############################################################################
# Author  : Jerome ODIER
#
# Email   : jerome.odier@lpsc.in2p3.fr
#
# Version : 1.X (2014)
#
#############################################################################

import os, sys, shutil

#############################################################################

TMP_DIR = '__WebApp_repo'

#############################################################################
# ENTRY POINT                                                               #
#############################################################################

def entry_point():
	#####################################################################

	for file in os.listdir('.'):

		if os.path.isfile(file) and file.startswith('yuicompressor'):
			print('error: could execute here !')

			return 1

	#####################################################################

	try:
		shutil.rmtree(TMP_DIR)

	except OSError:
		pass

	#####################################################################

	try:
		os.system('git clone https://github.com/ami-lpsc/AMIWebApp.git %s' % TMP_DIR)

	except OSError:
		print('error: could not clone repository `https://github.com/ami-lpsc/AMIWebApp.git` !')

		return 1

	#####################################################################

	SHIFT = len(TMP_DIR) + 1

	for src, dirs, files in os.walk(TMP_DIR):

		if src != TMP_DIR and src.find('.git') < 0:
			dst = '.' + os.sep + src[SHIFT: ]

			if os.path.isdir(dst) == False:
				print('mkdir %s' % dst)

				os.mkdir(dst)

			for file in files:
				file_src = src + os.sep + file
				file_dst = dst + os.sep + file

				print('cp %s %s' % (file_src.replace(TMP_DIR, '<REPO>'), file_dst))

				shutil.copy(file_src, file_dst)

	#####################################################################

	try:
		shutil.rmtree(TMP_DIR)

	except OSError:
		pass

	#####################################################################

	return 1

#############################################################################

if __name__ == '__main__':
	sys.exit(entry_point())

#############################################################################
