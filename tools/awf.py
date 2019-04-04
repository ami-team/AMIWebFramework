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

import sys, zlib, base64

#############################################################################
# MAIN                                                                      #
#############################################################################

if __name__ == '__main__':

	with open('awf.b64', 'r') as f:

		exec(zlib.decompress(base64.b64decode(f.read())))

#############################################################################
