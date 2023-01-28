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

import ssl, sys, zlib, base64, random

########################################################################################################################

if sys.version_info < (3, 0):

	print('Python 2.X no longer supported')

	sys.exit(1)

########################################################################################################################

import urllib.request as urllib_request

########################################################################################################################

AWF_IMAGE_URL = 'https://raw.githubusercontent.com/ami-team/AMIWebFramework/master/tools/awf.img?_=%d' % random.uniform(0, 1000000000)

########################################################################################################################
# MAIN                                                                                                                 #
########################################################################################################################

if __name__ == '__main__':

    ####################################################################################################################

    try:

        f = urllib_request.urlopen(AWF_IMAGE_URL, context = hasattr(ssl, '_create_unverified_context') and ssl._create_unverified_context() or None)

        try:

            code = zlib.decompress(base64.b64decode(f.read()))

        finally:

            f.close()

    except Exception as e:

        print(e)

        sys.exit(1)

    ####################################################################################################################

    exec(code)

########################################################################################################################
